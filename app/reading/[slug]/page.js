import { getBooks, getBook } from "../readwise";
import Renderer from "./renderer.js";

// set title

export default async function Page({ params }) {
  const book = await getBook(params.slug);
  return <Renderer book={book} />;
}

export async function generateMetadata({ params }) {
  const book = await getBook(params.slug);
  return {
    title: book.title,
  };
}
export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ slug: book.slug }));
}

