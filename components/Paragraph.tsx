type Props = {
  innerHTML: string;
};

export default function Paragraph({ innerHTML }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: innerHTML }}></div>;
}
