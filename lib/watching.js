import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const dir = path.join(process.cwd(), "pages/watching");

async function prepFile(file) {
  const slug = file.replace(/\.md$/, "");
  const fullPath = path.join(dir, file);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    contentHtml,
    ...matterResult.data,
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
