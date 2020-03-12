import Head from "next/head";
import Navigation from "../../components/Navigation";
import Prismic from "prismic-javascript";
import { Client, linkResolver } from "../../config/prismic";
import { Date, Link, RichText } from "prismic-reactjs";

export default function Book({ doc, navigation }) {
  return (
    <div className="container">
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <main>
        <Navigation doc={navigation} />
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <dl>
          <dt>Author</dt>
          <dd>{RichText.asText(doc.data.author)}</dd>
          <dt>Year of publication</dt>
          <dd>{doc.data.publication_date}</dd>
          <dt>When I read it</dt>
          <dd>{Date(doc.data.read_date).toString()}</dd>
          <dt>What I thought</dt>
          <dd>
            <RichText render={doc.data.rating} />
          </dd>
          <dt>Buy the book</dt>
          <dd>
            <a href={Link.url(doc.data.link)}>Amazon</a>
          </dd>
        </dl>
        <section>
          <h2>Choice Highlights</h2>
          {doc.data.highlights.map(highlight => (
            <blockquote key={highlight.id}>
              <RichText render={highlight.text} />
            </blockquote>
          ))}
        </section>
        <img src={doc.data.cover.url} alt="" />
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
