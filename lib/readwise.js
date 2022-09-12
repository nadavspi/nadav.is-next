import slugify from "slugify";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const headers = {
  Authorization: `Token ${process.env.READWISE_TOKEN}`,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let lastFetch = new Date();
// API rate limit is 3 per second
async function avoidRateLimit(interval = 350) {
  let sinceLastFetch = new Date().getTime() - lastFetch.getTime();
  if (sinceLastFetch < interval) {
    await delay(interval);
  }
  lastFetch = new Date();
}

const excludedBooks = (book) => {
  if (book.title === "Instapaper") {
    return false;
  }

  const tagNames = book.tags.map((tag) => tag.name);
  if (tagNames.includes("website-exclude")) {
    return false;
  }

  return true;
};

export async function getBooks(pageSize = "1000") {
  await avoidRateLimit();

  const res = await fetch(
    `https://readwise.io/api/v2/books/?category=books&page_size=${pageSize}`,
    {
      headers,
    }
  );
  const books = await res.json();

  const withSlugs = {
    ...books,
    results: books.results.filter(excludedBooks).map((book) => ({
      ...book,
      slug: slugify(book.title, { lower: true, strict: true }),
    })),
  };
  return withSlugs;
}
export async function getBook(slug) {
  const books = await getBooks();

  if (!books.results) {
    return { error: "Upstream error" };
  }

  if (!slug) {
    return { error: "Slug required" };
  }

  const book = books.results.find((book) => book.slug === slug);
  if (!book) {
    return { error: "Book not found" };
  }

  return book;
}
export async function getHighlights(bookId) {
  await avoidRateLimit();
  const res = await fetch(
    `https://readwise.io/api/v2/highlights/?book_id=${bookId}`,
    {
      headers,
    }
  );
  const data = await res.json();

  return data;
}
