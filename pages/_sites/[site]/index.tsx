import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Links from "../../../components/Links";
import styles from "../../../styles/Home.module.css";
import timeout from "../../../lib/timeout";

type Props = {
  currentTime: string;
};

const Home: NextPage<Props> = ({ currentTime }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

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

        <Links />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
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
