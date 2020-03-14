import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";

const BookList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
`;

const Book = styled.li`
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  width: calc(50% - 1rem);

  @media (min-width: 40rem) {
    width: calc(25% - 1rem);
  }

  @media (min-width: 70rem) {
    width: calc(20% - 1rem);
  }
`;

export default function Reading({ doc, navigation, books }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>

      <main>
        <Navigation doc={navigation} />
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <RichText render={doc.data.content} linkResolver={linkResolver} />
        <BookList>
          {books.map(book => (
            <Book key={book.id}>
              <Link as={linkResolver(book)} href={hrefResolver(book)}>
                <a>
                  <img
                    src={book.data.cover.url}
                    alt={RichText.asText(book.data.heading)}
                  />
                </a>
              </Link>
            </Book>
          ))}
        </BookList>
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getSingle("books");
  const navigation = await Client(req).getSingle("navigation");
  const books = await Client().query(
    Prismic.Predicates.at("document.type", "book"),
    { orderings: "[my.book.read_date desc]" }
  );
  return {
    props: {
      doc,
      navigation,
      books: books.results
    }
  };
}
