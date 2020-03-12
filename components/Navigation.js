import Link from "next/link";
import htmlSerializer from "../config/htmlSerializer";
import styled from "styled-components";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { RichText } from "prismic-reactjs";

const Item = styled.span`
  display: inline-block;
  margin: 0.5rem;
`;

export default function Navigation({ className, doc }) {
  const { links } = doc.data;

  return (
    <nav className={className}>
      {links.map(group => (
        <Item key={group.link.id}>
          <Link as={linkResolver(group.link)} href={hrefResolver(group.link)}>
            <a>{RichText.asText(group.text)}</a>
          </Link>{" "}
        </Item>
      ))}
    </nav>
  );
}
