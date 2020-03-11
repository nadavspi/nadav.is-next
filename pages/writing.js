import Head from "next/head";
import Prismic from "prismic-javascript";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";
import Link from "next/link";

export default function Writing({ posts }) {
  return (
    <main>
      <Head>
        <title>Posts</title>
      </Head>
      {posts.map(post => (
        <div>
          <Link as={linkResolver(post)} href={hrefResolver(post)}>
            <a>{RichText.asText(post.data.heading)}</a>
          </Link>
          <time>{post.data.date}</time>
        </div>
      ))}
    </main>
  );
}

export async function getStaticProps({ params, req }) {
  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );
  return {
    props: {
      posts: posts.results
    }
  };
}
