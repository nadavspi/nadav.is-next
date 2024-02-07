import { getBooks } from "./readwise";
import Renderer from "./renderer.js";

export const metadata = {
  title: 'My Bookshelf',
}

export default async function GetBooks() {
  const books = await getBooks();
  return <Renderer books={books} />;
}
