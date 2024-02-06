import slugify from "slugify";

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
    .map(({ author, category, title, user_book_id: id }) => ({
      author,
      category,
      id,
      slug: slugify(title, { lower: true, strict: true }),
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
  return fullData;
};
