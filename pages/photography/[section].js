import EricGoldberg from "./eric-goldberg";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import Prismic from "prismic-javascript";
import React from "react";
import SliceRender from "../../components/SliceRenderer";
import { Client, linkResolver } from "../../config/prismic";
import { Date, RichText } from "prismic-reactjs";
import { useRouter } from "next/router";

export default function Page({ doc, navigation }) {
  const router = useRouter();
  const { section } = router.query;

  if (section == "eric-goldberg") {
    return <EricGoldberg />;
  }

  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <main>
        <Navigation />
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <RichText render={doc.data.content} linkResolver={linkResolver} />
        <SliceRender doc={doc} className="" />
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("page", "photography");
  return {
    props: {
      doc,
    },
  };
}

export async function getStaticPaths() {
  const doc = await Client().getByUID("page", "photography");
  const sectionNav = doc.data.body.find(
    (item) => item.slice_type === "navigation",
  );

  return {
    paths: sectionNav.items.map((section) => ({
      params: { section: section.section_id },
    })),
    fallback: false,
  };
}
