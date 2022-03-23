import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Links() {
  return (
    <div className={styles.grid}>
      <Link href="/">
        <a className={styles.card}>
          <h2>Home &rarr;</h2>
          <p>Return to the Next.js homepage.</p>
        </a>
      </Link>

      <Link href="/learn">
        <a className={styles.card}>
          <h2>Learn &rarr;</h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>
      </Link>

      <Link href="/examples">
        <a className={styles.card}>
          <h2>Examples &rarr;</h2>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>
      </Link>

      <Link href="/news">
        <a className={styles.card}>
          <h2>Deploy &rarr;</h2>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </Link>
    </div>
  );
}
