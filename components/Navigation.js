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
    border-bottom: ${theme.border} solid ${theme.colors.purple};
`}
`;

const Name = styled.h1`
  margin: 0;
  margin-bottom: 0.2rem;
  font-size: ${props => props.theme.fontSizes[5]};
`;

const Nav = styled.nav`
  margin-bottom: 0.2rem;
`;

const Item = styled.span`
  display: inline-block;
  margin: ${props =>
    props.home
      ? props.theme.fontSizes[2]
      : `0 ${props.theme.fontSizes[2]} 0 0`};
`;

export default function Navigation({ doc, home }) {
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
      <Nav>
        {links.map(group => (
          <Item key={group.link.id} home={home}>
            <Link as={linkResolver(group.link)} href={hrefResolver(group.link)}>
              <a>{RichText.asText(group.text)}</a>
            </Link>{" "}
          </Item>
        ))}
      </Nav>
    </Container>
  );
}
