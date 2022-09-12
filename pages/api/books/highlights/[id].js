import { getHighlights } from "../../../../lib/readwise";

export default async function handler(req, res) {
  const { id } = req.query;
  const highlights = await getHighlights(id);

  res.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=86400, stale-while-revalidate"
  );
  return res.status(200).json(highlights);
}
