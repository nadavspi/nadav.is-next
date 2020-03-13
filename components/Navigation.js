import Link from "next/link";
import htmlSerializer from "../config/htmlSerializer";
import styled from "styled-components";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { RichText } from "prismic-reactjs";

const Container = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.5rem solid ${props => props.theme.colors.purple};

  a {
    color: ${props => props.theme.colors.primary};

    &:hover,
    &:active {
      color: ${props => props.theme.colors.mutedorange};
    }
  }
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
    <Container>
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
