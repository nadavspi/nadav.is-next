import Head from "next/head";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import styled from "styled-components";
import { Client, linkResolver } from "../../config/prismic";
import { getBook, getBooks, getHighlights } from "../../lib/readwise";
import { useRouter } from "next/router";
import { formatISO, parseISO } from "date-fns";
import Highlights from "../../components/Highlights";

const BookInfo = styled.section`
  margin-bottom: 2rem;
`;

const Metadata = styled.dl``;

const CoverImage = styled.img`
  max-width: 300px;
`;

const StyledDt = styled.dt`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  letter-spacing: 0.5px;
  font-weight: bold;
  line-height: 1;
`;

const StyledDd = styled.dd`
  margin-left: 0;
  margin-bottom: ${({ theme }) => theme.fontSizes[5]};
  font-size: ${({ theme }) => theme.fontSizes[5]};
  font-style: italic;

  p {
    margin: 0;
  }
`;

export default function Book({ book, navigation, highlights }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <PageContainer>
        <main>
          <h3>Loading...</h3>
        </main>
      </PageContainer>
    );
  }

  if (book.error) {
    return (
      <PageContainer>
        <main>
          <h3>Oops, something bad happened.</h3>
        </main>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Head>
        <title>{book.title}</title>
      </Head>
      <Navigation doc={navigation} />
      <main>
        <h1>{book.title}</h1>
        <BookInfo>
          <Metadata>
            <StyledDt>Author</StyledDt>
            <StyledDd>{book.author}</StyledDd>
            <StyledDt>My last highlight</StyledDt>
            <StyledDd>
              {formatISO(parseISO(book.last_highlight_at), {
                representation: "date",
              })}
            </StyledDd>
            <StyledDt>Number of highlights</StyledDt>
            <StyledDd>{book.num_highlights || "0"}</StyledDd>
          </Metadata>
          {!book.cover_image_url.includes("default-book") && (
            <CoverImage src={book.cover_image_url} alt="" />
          )}
        </BookInfo>
        <Highlights book={book} />
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const navigation = await Client(req).getSingle("navigation");
  const book = await getBook(params.uid);

  return {
    props: {
      book,
      navigation,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const books = await getBooks(5);

  return {
    paths: books.results.map((book) => ({
      params: { uid: `${book.id}` },
    })),
    fallback: true,
  };
}
