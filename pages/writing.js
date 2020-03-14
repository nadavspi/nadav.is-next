import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import Prismic from "prismic-javascript";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";

export default function Writing({ doc, navigation, posts }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>

      <Navigation doc={navigation} />
      <main>
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        {posts.map(post => (
          <div key={post.id}>
            <Link as={linkResolver(post)} href={hrefResolver(post)}>
              <a>{RichText.asText(post.data.heading)}</a>
            </Link>
            <time>{post.data.date}</time>
          </div>
        ))}
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getSingle("posts");
  const navigation = await Client(req).getSingle("navigation");
  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );
  return {
    props: {
      doc,
      navigation,
      posts: posts.results
    }
  };
}
