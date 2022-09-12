import Head from "next/head";
import Highlights from "../../components/Highlights";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import styled from "styled-components";
import useSWR from "swr";
import { Client } from "../../config/prismic";
import { fetcher } from "../../lib/readwise";
import { formatISO, parseISO } from "date-fns";
import { getBooks } from "../../lib/readwise";
import { useRouter } from "next/router";

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

const Loading = ({ navigation }) => (
  <PageContainer>
    {navigation && <Navigation doc={navigation} />}
    <main>
      <h3>Loading...</h3>
    </main>
  </PageContainer>
);

export default function Book({ navigation }) {
  const router = useRouter();
  const { slug } = router.query;

  const { data: book, error } = useSWR(`/api/books/${slug}`, fetcher);

  if (!slug || router.isFallback) {
    return <Loading navigation={navigation} />;
  }

  if (error || (book && book.error)) {
    return (
      <PageContainer>
        <main>
          <h3>Oops, something bad happened.</h3>
        </main>
      </PageContainer>
    );
  }

  if (!book) {
    return <Loading navigation={navigation} />;
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

  return {
    props: {
      navigation,
    },
  };
}

export async function getStaticPaths() {
  const books = await getBooks(5);

  return {
    paths: books.results.map((book) => ({
      params: { slug: `${book.id}` },
    })),
    fallback: true,
  };
}
