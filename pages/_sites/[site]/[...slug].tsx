import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import styles from "../../../styles/Home.module.css";
import timeout from "../../../lib/timeout";
import Layout from "../../../components/Layout";

export interface RequestParams extends NextParsedUrlQuery {
  site: string;
  slug: string | string[]; // the slug param is an array when the path contains multiple segments
}

type Props = {
  currentTime: string;
  slug: string;
};

const Page: NextPage<Props> = ({ currentTime, slug }) => {
  return (
    <Layout>
      <p className={styles.description}>
        Current Time <code className={styles.code}>{currentTime}</code>
        <br />
        <a
          href={`/api/revalidate?path=/${slug}`}
          rel="noreferrer"
          style={{ display: "inline-block", marginTop: 20, color: "red" }}
          target="_blank"
        >
          Revalidate page
        </a>
      </p>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, RequestParams> = async ({
  params,
}) => {
  const slug = ([] as string[]).concat(params?.slug ?? []).join("/");
  await timeout(3000);

  return {
    props: {
      currentTime: new Date().toLocaleString("en-US"),
      slug,
    },
    revalidate: 86400, // 24 hours
  };
};

export default Page;
