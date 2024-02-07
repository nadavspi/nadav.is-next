import { getBooks } from "./readwise";
import Renderer from "./renderer.js";

export const metadata = {
  title: 'My Bookshelf',
}

export default function GetBooks() {
  const books = getBooks();
  return <Renderer books={books} />;
}
