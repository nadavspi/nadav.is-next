import Head from "next/head";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import Prismic from "prismic-javascript";
import { Client, linkResolver } from "../../config/prismic";
import { Date, Link, RichText } from "prismic-reactjs";

export default function Book({ doc, navigation }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <Navigation doc={navigation} />
      <main>
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <section>
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
          </dl>
          <img src={doc.data.cover.url} alt="" />
        </section>
        <section>
          <h2>Choice Highlights</h2>
          {doc.data.highlights.map(highlight => (
            <blockquote key={highlight.id}>
              <RichText render={highlight.text} />
            </blockquote>
          ))}
        </section>
      </main>
    </PageContainer>
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
