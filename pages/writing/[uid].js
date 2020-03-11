import Head from "next/head";
import Prismic from "prismic-javascript";
import { Client, linkResolver } from "../../config/prismic";
import { Date, RichText } from "prismic-reactjs";

export default function Post({ doc }) {
  return (
    <main>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <RichText render={doc.data.heading} linkResolver={linkResolver} />
      <time>{Date(doc.data.date).toString()}</time>
      <RichText render={doc.data.content} linkResolver={linkResolver} />
    </main>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("post", params.uid);
  return {
    props: {
      doc
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
