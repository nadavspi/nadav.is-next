import Head from "next/head";
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import Prismic from "prismic-javascript";
import SliceRender from "../components/SliceRenderer";
import { Client, linkResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";

export default function Page({ doc, navigation }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <main>
        <Navigation doc={navigation} />
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <RichText render={doc.data.content} linkResolver={linkResolver} />
        <SliceRender doc={doc} className="" />
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("page", params.uid);
  const navigation = await Client(req).getSingle("navigation");
  return {
    props: {
      doc,
      navigation
    }
  };
}

export async function getStaticPaths() {
  const pages = await Client().query(
    Prismic.Predicates.at("document.type", "page"),
    { orderings: "[my.page.date desc]" }
  );

  return {
    paths: pages.results.map(page => ({
      params: { uid: page.uid }
    })),
    fallback: false
  };
}
