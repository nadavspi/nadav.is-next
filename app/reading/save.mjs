import slugify from "slugify";
import { writeFile } from "node:fs/promises";

const filename = process.cwd() + "/app/reading/data.json";
export const saveData = async (updatedAfter = null) => {
  if (!process.env.READWISE_TOKEN) {
    throw new Error("Missing READWISE_TOKEN");
  }

  console.log("Downloading Readwise export");

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
        next: { revalidate: 3600 },
      },
    );
    const responseJson = await response.json();
    fullData.push(...responseJson["results"]);
    nextPageCursor = responseJson["nextPageCursor"];
    if (!nextPageCursor) {
      break;
    }
  }
  const contentString = JSON.stringify(
    fullData
      .filter((book) => book.title && book.highlights.length)
      .map((book) => ({
        ...book,
        id: book.user_book_id,
        slug: slugify(book.title, { lower: true, strict: true }),
      })),
  );

  writeFile(filename, contentString, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Saved ${filename}`);
    }
  });
};

saveData();
