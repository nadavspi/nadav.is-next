import Head from "next/head";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import Prismic from "prismic-javascript";
import React, { useEffect } from "react";
import SliceRender from "../../components/SliceRenderer";
import { Client, linkResolver } from "../../config/prismic";
import { Date, RichText } from "prismic-reactjs";
import { useRouter } from "next/router";

export default function Page({ doc, navigation }) {
  const router = useRouter();
  const { section } = router.query;

  useEffect(() => {
    if (!section) {
      const sectionNav = doc.data.body.find(
        (item) => item.slice_type === "navigation"
      );
      router.replace({
        pathname: `/photography/${sectionNav.items[0].section_id}`,
      });
    }
  }, []);
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
  const doc = await Client(req).getByUID("page", "photography");
  const navigation = await Client(req).getSingle("navigation");
  return {
    props: {
      doc,
      navigation,
    },
  };
}

export async function getStaticPaths() {
  const doc = await Client().getByUID("page", "photography");
  const sectionNav = doc.data.body.find(
    (item) => item.slice_type === "navigation"
  );

  return {
    paths: sectionNav.items.map((section) => ({
      params: { section: section.section_id },
    })),
    fallback: false,
  };
}
