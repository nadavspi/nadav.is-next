import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Prismic from "prismic-javascript";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";

export default function Reading({ doc, navigation, books }) {
  return (
    <div className="container">
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>

      <main>
        <Navigation doc={navigation} />
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <RichText render={doc.data.content} linkResolver={linkResolver} />
        {books.map(book => (
          <div key={book.id}>
            <Link as={linkResolver(book)} href={hrefResolver(book)}>
              <a>
                <img
                  src={book.data.cover.url}
                  alt={RichText.asText(book.data.heading)}
                />
              </a>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getSingle("books");
  const navigation = await Client(req).getSingle("navigation");
  const books = await Client().query(
    Prismic.Predicates.at("document.type", "book"),
    { orderings: "[my.post.date desc]" }
  );
  return {
    props: {
      doc,
      navigation,
      books: books.results
    }
  };
}
