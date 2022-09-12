import { getBook } from "../../../lib/readwise";

export default async function handler(req, res) {
  const { slug } = req.query;
  const data = await getBook(slug);

  res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
  return res.status(200).json(data);
}
