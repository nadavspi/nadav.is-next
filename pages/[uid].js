import Head from "next/head";
import Prismic from "prismic-javascript";
import { Client, linkResolver } from "../config/prismic";
import { Date, RichText } from "prismic-reactjs";

export default function Page({ doc }) {
  return (
    <div className="container">
      <Head>
        <title>{RichText.asText(doc.data.heading)}</title>
      </Head>
      <main>
        <RichText render={doc.data.heading} linkResolver={linkResolver} />
        <RichText render={doc.data.content} linkResolver={linkResolver} />
      </main>

      <footer>Yay</footer>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ params, req }) {
  const doc = await Client(req).getByUID("page", params.uid);
  return {
    props: {
      doc
    }
  };
}

export async function getStaticPaths() {
  const pages = await Client().query(
    Prismic.Predicates.at("document.type", "page"),
    { orderings: "[my.page.date desc]" }
  );

  return {
    paths: pages.results.map(page => ({
      params: { uid: page.uid }
    })),
    fallback: false
  };
}
