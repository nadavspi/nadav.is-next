import Head from "next/head";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { Client, linkResolver } from "../../config/prismic";
import { Date, Link, RichText } from "prismic-reactjs";
import { mq } from "../../config/theme";

const BookInfo = styled.section`
  margin-bottom: 2rem;

  @media (min-width: ${props => mq(props)}) {
    display: flex;
    justify-content: space-between;
  }
`;

const Metadata = styled.dl`
  flex: 3;
`;

const CoverImage = styled.img`
  flex: 1;
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
  border-bottom: 0.5rem solid ${({ theme }) => theme.colors.purple};

  @media (min-width: ${props => mq(props)}) {
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

export default function Book({ doc, navigation }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <Navigation doc={navigation} />
      <main>
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <BookInfo>
          <Metadata>
            <StyledDt>Author</StyledDt>
            <StyledDd>{RichText.asText(doc.data.author)}</StyledDd>
            <StyledDt>Year of publication</StyledDt>
            <StyledDd>{doc.data.publication_date}</StyledDd>
            <StyledDt>When I read it</StyledDt>
            <StyledDd>{Date(doc.data.read_date).toString()}</StyledDd>
            <StyledDt>What I thought</StyledDt>
            <StyledDd>
              <RichText render={doc.data.rating} />
            </StyledDd>
          </Metadata>
          <CoverImage src={doc.data.cover.url} alt="" />
        </BookInfo>
        <HighlightsSection>
          <h2>Choice Highlights</h2>
          {doc.data.highlights.map(highlight => (
            <Quote>
              <RichText render={highlight.text} />
            </Quote>
          ))}
        </HighlightsSection>
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
