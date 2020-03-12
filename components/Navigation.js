import Link from "next/link";
import htmlSerializer from "../config/htmlSerializer";
import { Client, linkResolver, hrefResolver } from "../config/prismic";
import { RichText } from "prismic-reactjs";

export default function Navigation({ doc }) {
  const { links } = doc.data;

  return (
    <nav>
      {links.map(group => (
        <React.Fragment key={group.link.id}>
          <Link as={linkResolver(group.link)} href={hrefResolver(group.link)}>
            <a>{RichText.asText(group.text)}</a>
          </Link>{" "}
        </React.Fragment>
      ))}
    </nav>
  );
}
