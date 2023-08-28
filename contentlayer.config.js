import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Media = defineDocumentType(() => ({
  name: "Media",
  filePathPattern: `**/*.md`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    titleZh: { type: "string" },
    date: { type: "number", required: true },
    category: { type: "enum", options: ["Movie", "TV"], required: true },
    year: { type: "number", required: true },
  },
}));

export default makeSource({
  contentDirPath: "pages/watching",
  documentTypes: [Media],
});
