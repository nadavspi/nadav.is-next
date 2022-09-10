import Head from "next/head";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { Client, linkResolver } from "../../config/prismic";
import { Link, RichText } from "prismic-reactjs";
import { mq } from "../../config/theme";
import { getBook, getBooks, getHighlights } from "../../lib/readwise";
import { useRouter } from "next/router";
import { formatISO, parseISO } from "date-fns";

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

const Quote = styled.blockquote`
  position: relative;
  margin-top: 3rem;
  margin-left: 0;
  padding-bottom: 3rem;
  border-bottom: ${({ theme }) => theme.border} solid
    ${({ theme }) => theme.colors.purple};

  @media (min-width: ${(props) => mq(props)}) {
    margin-left: 3rem;
  }

  &:before {
    position: absolute;
    top: -0.25em;
    left: -0.6em;
    content: "“";
    font-size: ${({ theme }) => theme.fontSizes[8]};
    color: ${({ theme }) => theme.colors.mutedorange};
  }

  p {
    margin: 0;
  }
`;

const HighlightsSection = styled.section`
  font-size: ${({ theme }) => theme.fontSizes[4]};
  max-width: 36em;
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
        {book.num_highlights > 0 && (
          <HighlightsSection>
            <h2>My Highlights</h2>
            {highlights.map((highlight) => (
              <Quote key={highlight.id}>{highlight.text}</Quote>
            ))}
          </HighlightsSection>
        )}
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const navigation = await Client(req).getSingle("navigation");
  const book = await getBook(params.uid);
  const highlights = await getHighlights(params.uid);
  return {
    props: {
      book,
      navigation,
      highlights: highlights.results,
    },
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
