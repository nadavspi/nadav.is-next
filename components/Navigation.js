import Link from "next/link";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const Container = styled.div`
  ${({ home, theme }) =>
    !home &&
    `
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: ${theme.border} solid ${theme.colors.purple};
`}

  .active {
    color: ${(props) => props.theme.colors.cyan};
  }
`;

const Name = styled.h1`
  margin: 0;
  margin-bottom: 0.2rem;
  font-size: ${(props) => props.theme.fontSizes[5]};
`;

const Nav = styled.nav`
  margin-bottom: 0.2rem;
`;

const Item = styled.span`
  display: inline-block;
  margin: ${(props) =>
    props.home
      ? props.theme.fontSizes[2]
      : `0 ${props.theme.fontSizes[2]} 0 0`};
`;

export default function Navigation({ doc, home }) {
  const isActive = (href) => {
    const pathname = usePathname();
    return pathname.split("/")[1] == href.split("/")[1];
  };

  const links = [
    { text: "Photography", href: "/photography/artists" },
    { text: "Reading", href: "/reading" },
    { text: "Watching", href: "/watching" },
  ];

  return (
    <Container home={home}>
      {!home && (
        <Name>
          <Link href="/">Nadav Spiegelman</Link>
        </Name>
      )}
      <Nav>
        {links.map((link) => {
          const className = isActive(link.href) ? "active" : "";
          return (
            <Item key={link.href} home={home}>
              <Link href={link.href} className={className}>
                {link.text}
              </Link>
            </Item>
          );
        })}
      </Nav>
    </Container>
  );
}
