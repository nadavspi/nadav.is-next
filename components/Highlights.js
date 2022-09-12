import styled from "styled-components";
import useSWR from "swr";
import { fetcher } from "../lib/readwise";
import { mq } from "../config/theme";

const Quote = styled.blockquote`
  position: relative;
  margin-top: 3rem;
  margin-left: 0;
  padding-bottom: 3rem;
  border-bottom: ${({ theme }) => theme.border} solid
    ${({ theme }) => theme.colors.purple};

  @media (min-width: ${(props) => mq(props)}) {
    margin-left: 3rem;
  }

  &:before {
    position: absolute;
    top: -0.25em;
    left: -0.6em;
    content: "“";
    font-size: ${({ theme }) => theme.fontSizes[8]};
    color: ${({ theme }) => theme.colors.mutedorange};
  }

  p {
    margin: 0;
  }
`;

const HighlightsSection = styled.section`
  font-size: ${({ theme }) => theme.fontSizes[4]};
  max-width: 36em;
`;

const Highlights = ({ book }) => {
  if (book.num_highlights == 0) {
    return;
  }

  const { data: highlights, error } = useSWR(
    `/api/books/highlights/${book.id}`,
    fetcher
  );

  if (error) return nulll;

  if (!highlights) {
    return (
      <HighlightsSection>
        <h2>My Highlights</h2>
        Loading...
      </HighlightsSection>
    );
  }

  return (
    <HighlightsSection>
      <h2>My Highlights</h2>
      {highlights.results.map((highlight) => (
        <Quote key={highlight.id}>{highlight.text}</Quote>
      ))}
    </HighlightsSection>
  );
};

export default Highlights;
