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

export async function getBooks(pageSize = "1000") {
  await avoidRateLimit();

  const res = await fetch(
    `https://readwise.io/api/v2/books/?category=books&page_size=${pageSize}`,
    {
      headers,
    }
  );
  const data = await res.json();
  return data;
}
export async function getBook(id) {
  await avoidRateLimit();
  const res = await fetch(`https://readwise.io/api/v2/books/${id}`, {
    headers,
  });
  const data = await res.json();

  return data;
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
