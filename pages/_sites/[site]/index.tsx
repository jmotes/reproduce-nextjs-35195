import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../components/Layout";
import RevalidateLink from "../../../components/RevalidateLink";

type Props = {
  currentTime: string;
};

const Home: NextPage<Props> = ({ currentTime }) => {
  return (
    <Layout>
      <p className={styles.description}>
        Current Time <code className={styles.code}>{currentTime}</code>
        <br />
        <RevalidateLink path="/" />
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
  return {
    props: {
      currentTime: new Date().toLocaleString("en-US"),
    },
    revalidate: 86400, // 24 hours
  };
};

export default Home;
