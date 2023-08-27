import fs from "fs";
import html from "remark-html";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";

const dir = path.join(process.cwd(), "pages/watching");

async function prepFile(file) {
  const slug = file.replace(/\.md$/, "");
  const fullPath = path.join(dir, file);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    contentHtml,
    ...data,
  };
}

export async function getItems() {
  const files = fs.readdirSync(dir);
  const items = files
    .filter((file) => path.extname(file) == ".md")
    .map(async (file) => {
      return await prepFile(file);
    });
  return Promise.all(items);
}
