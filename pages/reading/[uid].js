import Head from "next/head";
import Navigation from "../../components/Navigation";
import Prismic from "prismic-javascript";
import { Client, linkResolver } from "../../config/prismic";
import { Date, RichText } from "prismic-reactjs";

export default function Book({ doc, navigation }) {
  return (
    <div className="container">
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <main>
        <Navigation doc={navigation} />
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
      </main>
    </div>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("book", params.uid);
  const navigation = await Client(req).getSingle("navigation");
  return {
    props: {
      doc,
      navigation
    }
  };
}

export async function getStaticPaths() {
  const books = await Client().query(
    Prismic.Predicates.at("document.type", "book"),
    { orderings: "[my.book.date desc]" }
  );

  return {
    paths: books.results.map(book => ({
      params: { uid: book.uid }
    })),
    fallback: false
  };
}
