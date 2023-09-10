import Link from "next/link";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const Container = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: ${(props) => props.theme.border} solid ${(props) =>
    props.theme.colors.purple};
}

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
  margin: ${(props) => `0 ${props.theme.fontSizes[2]} 0 0`};
`;

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (href) => {
    return pathname.split("/")[1] == href.split("/")[1];
  };

  const links = [
    { text: "About", href: "/about" },
    { text: "Photography", href: "/photography" },
    { text: "Reading", href: "/reading" },
    { text: "Watching", href: "/watching" },
  ];

  return (
    <Container>
      <Name>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Nadav Spiegelman
        </Link>
      </Name>
      <Nav>
        {links.map((link) => {
          const className = isActive(link.href) ? "active" : "";
          return (
            <Item key={link.href}>
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
