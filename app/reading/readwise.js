import data from "./data.json";
import { formatISO, parseISO } from "date-fns";

const excludedBooks = (book) => {
  if (book.readable_title === "Instapaper") {
    return false;
  }

  const tagNames = book.book_tags.map((tag) => tag.name);
  if (tagNames.includes("website-exclude")) {
    return false;
  }

  if (!book.slug) {
    return false;
  }
  return true;
};

export const getBooks = () => {
  return data
    .filter(excludedBooks)
    .map(({ author, category, id, slug, readable_title }) => ({
      author,
      category,
      id,
      slug,
      readable_title,
    }));
};

export const getBook = (slug) => {
  if (!slug) {
    console.error("Need a slug");
    return;
  }
  const book = data.find((book) => book.slug === slug);
  const { highlights: h } = book;
  const lastHighlight = h[h.length - 1];
  const date = lastHighlight.highlighted_at || lastHighlight.created_at;
  if (!date) {
    console.warn(book.title, "No last highlight date");
    return book;
  }
  return {
    ...book,
    lastHighlightDate: formatISO(parseISO(date), {
      representation: "date",
    }),
  };
};
