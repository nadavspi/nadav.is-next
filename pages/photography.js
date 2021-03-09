import { Client } from "../config/prismic";

export default function Page() {
  return null;
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("page", "photography");
  const sectionNav = doc.data.body.find(
    (item) => item.slice_type === "navigation"
  );

  return {
    redirect: {
      destination: `/photography/${sectionNav.items[0].section_id}`,
      permanent: false,
    },
  };
}
