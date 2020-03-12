import Head from "next/head";
import Prismic from "prismic-javascript";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";
import Link from "next/link";

export default function Writing({ doc, posts }) {
  return (
    <div className="container">
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>

      <main>
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        {posts.map(post => (
          <div>
            <Link as={linkResolver(post)} href={hrefResolver(post)}>
              <a>{RichText.asText(post.data.heading)}</a>
            </Link>
            <time>{post.data.date}</time>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getSingle("posts");
  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );
  return {
    props: {
      doc,
      posts: posts.results
    }
  };
}
