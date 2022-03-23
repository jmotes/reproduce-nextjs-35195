import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import timeout from "../../../lib/timeout";
import Layout from "../../../components/Layout";

type Props = {
  currentTime: string;
};

const Home: NextPage<Props> = ({ currentTime }) => {
  return (
    <Layout>
      <p className={styles.description}>
        Current Time <code className={styles.code}>{currentTime}</code>
        <br />
        <a
          href="/api/revalidate?path=/"
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  await timeout(3000);

  return {
    props: {
      currentTime: new Date().toLocaleString("en-US"),
    },
    revalidate: 86400, // 24 hours
  };
};

export default Home;
