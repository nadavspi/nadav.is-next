import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../config/prismic";
import { useRouter } from "next/router";

const SectionLink = styled.div`
  display: inline-block;
  margin-right: ${({ theme }) => theme.fontSizes[2]};

  a {
    color: ${(props) => (props.active ? props.theme.colors.cyan : "")};

    &:hover,
    &:active {
      color: ${(props) => (props.active ? props.theme.colors.mutedorange : "")};
    }
  }
`;

const SectionNav = ({ items }) => {
  const router = useRouter();
  const { section } = router.query;

  if (!items.length) {
    return null;
  }

  return items.map((item) => {
    return (
      <SectionLink
        active={section && section[0] === item.section_id}
        key={item.section_id}
      >
        <Link href={`/photography/${item.section_id}`} shallow={true}>
          <a>{RichText.asText(item.section_name)}</a>
        </Link>
      </SectionLink>
    );
  });
};

export default SectionNav;
