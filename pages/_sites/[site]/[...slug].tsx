import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../components/Layout";
import dynamic from "next/dynamic";
import RevalidateLink from "../../../components/RevalidateLink";
import getPageByUri, {
  PageBlock,
  WordPressPage,
} from "../../../lib/get-page-by-uri";

export interface RequestParams extends NextParsedUrlQuery {
  site: string;
  slug: string | string[]; // the slug param is an array when the path contains multiple segments
}

type Props = {
  page: WordPressPage;
  currentTime: string;
  slug: string;
};

const Paragraph = dynamic(() => import("../../../components/Paragraph"));

const Block = ({ block }: { block: PageBlock }) => {
  switch (block.blockName) {
    case "core/paragraph":
      return <Paragraph {...block} />;
    default:
      return <p>Block &quot;{block.blockName}&quot; is not supported.</p>;
  }
};

const Page: NextPage<Props> = ({ page, currentTime, slug }) => {
  return (
    <Layout>
      <p className={styles.description}>
        Current Time <code className={styles.code}>{currentTime}</code>
        <br />
        <RevalidateLink path={`/${slug}`} />
      </p>
      {page.blocks.map((b) => (
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
  const slug = ([] as string[]).concat(params?.slug ?? []).join("/");
  const page = await getPageByUri(slug);

  if (!page) {
    return { notFound: true, revalidate: 10 };
  }

  return {
    props: {
      page,
      currentTime: new Date().toLocaleString("en-US"),
      slug,
    },
    revalidate: 86400, // 24 hours
  };
};

export default Page;
