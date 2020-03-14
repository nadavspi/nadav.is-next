import Head from "next/head";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { Client, linkResolver } from "../../config/prismic";
import { Date, RichText } from "prismic-reactjs";
import { format } from "date-fns";

export const PostMain = styled.main`
  max-width: 38em;
  margin: 0 auto;
`;

const PostHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.fontSizes[8]};
`;

const PostHeading = styled.div`
  h1 {
    margin-bottom: 0;
  }
`;

export const PostDate = styled.time`
  font-size: ${({ theme }) => theme.fontSizes[3]};
  font-style: italic;
`;

export default function Post({ doc, navigation }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <Navigation doc={navigation} />
      <PostMain>
        <PostHeader>
          <PostHeading>
            <RichText render={doc.data.heading} linkResolver={linkResolver} />
          </PostHeading>
          <PostDate>{format(Date(doc.data.date), "MMMM d, yyyy")}</PostDate>
        </PostHeader>
        <RichText render={doc.data.content} linkResolver={linkResolver} />
      </PostMain>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("post", params.uid);
  const navigation = await Client(req).getSingle("navigation");
  return {
    props: {
      doc,
      navigation
    }
  };
}

export async function getStaticPaths() {
  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );

  return {
    paths: posts.results.map(post => ({
      params: { uid: post.uid }
    })),
    fallback: false
  };
}
