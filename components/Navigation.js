import Link from "next/link";
import htmlSerializer from "../config/htmlSerializer";
import styled from "styled-components";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { RichText } from "prismic-reactjs";

const Container = styled.div`
  ${({ home, theme }) =>
    !home &&
    `
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.5rem solid ${theme.colors.purple};
`}
`;

const Name = styled.h1`
  margin: 0;
  font-size: ${props => props.theme.fontSizes[5]};
`;

const Item = styled.span`
  display: inline-block;
  margin: ${props => (props.home ? "0.5rem" : "0 0.5rem 0 0")};
`;

export default function Navigation({ className, doc, home }) {
  const { links } = doc.data;

  return (
    <Container home={home}>
      {!home && (
        <Name>
          <Link href="/">
            <a>Nadav Spiegelman</a>
          </Link>
        </Name>
      )}
      <nav className={className}>
        {links.map(group => (
          <Item key={group.link.id} home={home}>
            <Link as={linkResolver(group.link)} href={hrefResolver(group.link)}>
              <a>{RichText.asText(group.text)}</a>
            </Link>{" "}
          </Item>
        ))}
      </nav>
    </Container>
  );
}
