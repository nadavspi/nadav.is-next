import slugify from "slugify";
import { formatISO, parseISO } from "date-fns";

const excludedBooks = (book) => {
  if (book.readable_title === "Instapaper") {
    return false;
  }

  const tagNames = book.book_tags.map((tag) => tag.name);
  if (tagNames.includes("website-exclude")) {
    return false;
  }

  return true;
};

export const getBooks = async () => {
  const all = await fetchAll();
  return all
    .filter(excludedBooks)
    .map(({ author, category, id, slug, title }) => ({
      author,
      category,
      id,
      slug,
      title,
    }));
};

export const getBook = async (slug) => {
  const all = await fetchAll();
  return all
    .find((book) => book.slug === slug)
    .map((book) => {
      const { highlights: h } = book;
      const lastHighlight = h[h.length - 1].highlighted_at;
      return {
        ...book,
        lastHighlightDate: formatISO(parseISO(lastHighlight), {
          representation: "date",
        }),
      };
    });
};

export const getHighlights = async (user_book_id) => {
  const all = await fetchAll();
  return all
    .find((book) => book.user_book_id === user_book_id)
    .map(({ author, category, highlights, id, title }) => ({
      author,
      category,
      highlights,
      id,
      title,
    }));
};

const fetchAll = async (updatedAfter = null) => {
  let fullData = [];
  let nextPageCursor = null;

  while (true) {
    const queryParams = new URLSearchParams();
    if (nextPageCursor) {
      queryParams.append("pageCursor", nextPageCursor);
    }
    if (updatedAfter) {
      queryParams.append("updatedAfter", updatedAfter);
    }
    console.log(
      "Making export api request with params " + queryParams.toString(),
    );
    const response = await fetch(
      "https://readwise.io/api/v2/export/?" + queryParams.toString(),
      {
        method: "GET",
        headers: {
          Authorization: `Token ${process.env.READWISE_TOKEN}`,
        },
      },
    );
    const responseJson = await response.json();
    fullData.push(...responseJson["results"]);
    nextPageCursor = responseJson["nextPageCursor"];
    if (!nextPageCursor) {
      break;
    }
  }
  return fullData.map((book) => ({
    ...book,
    id: book.user_book_id,
    slug: slugify(book.title, { lower: true, strict: true }),
  }));
};
