import Head from "next/head";
import Navigation from "../../components/Navigation";
import Prismic from "prismic-javascript";
import { Client, linkResolver } from "../../config/prismic";
import { Date, RichText } from "prismic-reactjs";

export default function Post({ doc, navigation }) {
  return (
    <div className="container">
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <main>
        <Navigation doc={navigation} />
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <time>{Date(doc.data.date).toString()}</time>
        <RichText render={doc.data.content} linkResolver={linkResolver} />
      </main>
    </div>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("post", params.uid);
  const navigation = await Client(req).getSingle("navigation");
  return {
    props: {
      doc,
      navigation
    }
  };
}

export async function getStaticPaths() {
  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );

  return {
    paths: posts.results.map(post => ({
      params: { uid: post.uid }
    })),
    fallback: false
  };
}
