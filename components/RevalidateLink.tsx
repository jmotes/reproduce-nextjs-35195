export type Props = {
  path: string;
};

export default function RevalidateLink({ path }: Props) {
  return (
    <a
      href={`/api/revalidate?path=${path}`}
      rel="noreferrer"
      style={{ display: "inline-block", marginTop: 20, color: "red" }}
      target="_blank"
    >
      Revalidate page
    </a>
  );
}
