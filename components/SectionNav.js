import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../config/prismic";

const SectionLink = styled.div`
  display: inline-block;
  margin-right: ${({ theme }) => theme.fontSizes[2]};
`;

const SectionNav = ({ items }) => {
  if (!items.length) {
    return null;
  }

  return items.map((item) => {
    return (
      <SectionLink>
        <Link
          href={{
            query: { section: item.section_id },
          }}
          key={item.section_id}
          shallow={true}
        >
          <a>{RichText.asText(item.section_name)}</a>
        </Link>
      </SectionLink>
    );
  });
};

export default SectionNav;
