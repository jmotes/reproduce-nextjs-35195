import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import styles from "../../../styles/Home.module.css";
import timeout from "../../../lib/timeout";
import Layout from "../../../components/Layout";
import dynamic from "next/dynamic";
import RevalidateLink from "../../../components/RevalidateLink";

export interface RequestParams extends NextParsedUrlQuery {
  site: string;
  slug: string | string[]; // the slug param is an array when the path contains multiple segments
}

type Block = {
  id: string;
  name: string;
  props: {
    innerHTML: string;
  };
};

type Props = {
  blocks: Block[];
  currentTime: string;
  slug: string;
};

const Paragraph = dynamic(() => import("../../../components/Paragraph"));

const Block = ({ block }: { block: Block }) => {
  switch (block.name) {
    case "core/paragraph":
      return <Paragraph {...block.props} />;
    default:
      return <p>Block not supported.</p>;
  }
};

const Page: NextPage<Props> = ({ blocks, currentTime, slug }) => {
  return (
    <Layout>
      <p className={styles.description}>
        Current Time <code className={styles.code}>{currentTime}</code>
        <br />
        <RevalidateLink path={`/${slug}`} />
      </p>
      {blocks.map((b) => (
        <Block key={b.id} block={b} />
      ))}
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
  await timeout(3000);

  const slug = ([] as string[]).concat(params?.slug ?? []).join("/");
  const currentTime = new Date().toLocaleString("en-US");
  const blocks = [
    {
      id: "6a6f9977-d059-4141-8c4f-fee35818fd0d",
      name: "core/paragraph",
      props: {
        innerHTML: `\n<p>Paragraph 1 at ${currentTime}.</p>\n`,
      },
    },
    {
      id: "6cb6adec-6abd-49e4-b5cf-36ab82240787",
      name: "core/paragraph",
      props: {
        innerHTML: `\n<p>Paragraph 2 at ${currentTime}.</p>\n`,
      },
    },
  ];

  return {
    props: {
      blocks,
      currentTime: new Date().toLocaleString("en-US"),
      slug,
    },
    revalidate: 86400, // 24 hours
  };
};

export default Page;
