"use client"

import Link from "next/link";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import styled from "styled-components";
import { getBooks } from "./readwise";

const BookList = styled.ul`
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
`;

const Book = styled.li`
  margin-bottom: 1.5rem;
`;

const BookLink = styled.div`
  display: inline-flex;
  flex-direction: column;
  cursor: pointer;
`;

const Title = styled.div``;
const Author = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes[2]};
  font-style: normal;
`;

// export const metadata = {
//   title: "My Bookshelf",
// };

export default async function Reading({ navigation }) {
  const books = await getBooks();
  return (
    <PageContainer>
      <Navigation />
      <main>
        <h1>My Bookshelf</h1>
        <BookList>
          {books.map((book) => (
            <Book key={book.id}>
              <BookLink>
                <Link href={`/reading/${book.slug}`}>
                  <Title>{book.title}</Title>
                  <Author>by {book.author}</Author>
                </Link>
              </BookLink>
            </Book>
          ))}
        </BookList>
      </main>
    </PageContainer>
  );
}
