import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { photoLinks } from "../config/photoLinks";

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

const PhotoNav = () => {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return photoLinks.map((link) => {
    return (
      <SectionLink active={isActive(link.href)} key={link.href}>
        <Link href={link.href}>{link.text}</Link>
      </SectionLink>
    );
  });
};

export default PhotoNav;
