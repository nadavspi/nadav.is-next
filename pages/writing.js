import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";
import { PostDate as SinglePostDate, PostMain } from "./writing/[uid]";
import { format } from "date-fns";

const Posts = styled.ol`
  list-style: none;
  padding-left: 0;
`;

const Post = styled.li`
  margin-top: 2rem;
  font-size: ${({ theme }) => theme.fontSizes[5]};
`;

const PostDate = styled(SinglePostDate)`
  display: block;
`;

export default function Writing({ doc, navigation, posts }) {
  return (
    <PageContainer>
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>

      <Navigation doc={navigation} />
      <PostMain>
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <Posts>
          {posts.map(post => (
            <Post key={post.id}>
              <Link as={linkResolver(post)} href={hrefResolver(post)}>
                <a>{RichText.asText(post.data.heading)}</a>
              </Link>
              <PostDate>
                {format(Date(post.data.date), "MMMM d, yyyy")}
              </PostDate>
            </Post>
          ))}
        </Posts>
      </PostMain>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getSingle("posts");
  const navigation = await Client(req).getSingle("navigation");
  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );
  return {
    props: {
      doc,
      navigation,
      posts: posts.results
    }
  };
}
