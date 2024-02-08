"use client";

import Highlights from "../../../components/Highlights";
import styled from "styled-components";
import { getBooks, getBook } from "../readwise";

const BookInfo = styled.section`
  margin-bottom: 2rem;
`;

const Metadata = styled.dl``;

const CoverImage = styled.img`
  max-width: 300px;
`;

const StyledDt = styled.dt`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  letter-spacing: 0.5px;
  font-weight: bold;
  line-height: 1;
`;

const StyledDd = styled.dd`
  margin-left: 0;
  margin-bottom: ${({ theme }) => theme.fontSizes[5]};
  font-size: ${({ theme }) => theme.fontSizes[5]};
  font-style: italic;

  p {
    margin: 0;
  }
`;

export default function Book({ book }) {
  return (
    <main>
      <h1>{book.readable_title}</h1>
      <BookInfo>
        <Metadata>
          <StyledDt>Author</StyledDt>
          <StyledDd>{book.author}</StyledDd>
          <StyledDt>My last highlight</StyledDt>
          <StyledDd>{book.lastHighlightDate}</StyledDd>
          <StyledDt>Number of highlights</StyledDt>
          <StyledDd>{book.highlights.length}</StyledDd>
        </Metadata>
        {!book.cover_image_url.includes("default-book") && (
          <CoverImage src={book.cover_image_url} alt="" />
        )}
      </BookInfo>
      <Highlights highlights={book.highlights} />
    </main>
  );
}

