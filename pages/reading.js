import Head from "next/head";
import LazyLoad from "react-lazyload";
import Link from "next/link";
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";
import { mq } from "../config/theme";
import { getBooks } from "../lib/readwise";

const BookList = styled.ul`
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
`;

const Book = styled.li`
  margin-bottom: 1.5rem;
`;

const BookLink = styled.a`
  display: inline-flex;
  flex-direction: column;
  cursor: pointer;
`;

const Title = styled.span``;
const Author = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes[2]};
  font-style: normal;
`;

const excludedBooks = (book) => {
  if (book.title === "Instapaper") {
    return false;
  }

  return true;
};

export default function Reading({ doc, navigation, books }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>

      <Navigation doc={navigation} />
      <main>
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <RichText render={doc.data.content} linkResolver={linkResolver} />
        <BookList>
          {books.filter(excludedBooks).map((book) => (
            <Book key={book.id}>
              <Link
                as={linkResolver({ type: "book", uid: book.id })}
                href={hrefResolver({ type: "book" })}
                prefetch={false}
              >
                <BookLink>
                  <Title>{book.title}</Title>
                  <Author>by {book.author}</Author>
                </BookLink>
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
  const books = await getBooks();
  return {
    props: {
      doc,
      navigation,
      books: books.results,
    },
  };
}
