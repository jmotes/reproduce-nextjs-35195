import getClient from "./apollo-client";
import { gql } from "@apollo/client";
import { randomUUID } from "crypto";

export const NODE_BY_URI_QUERY = gql`
  query NodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        blocksJSON
        databaseId
        date
        id
        slug
        title
      }
    }
  }
`;

export type PageBlock = {
  id: string;
  blockName: string;
  innerHTML: string;
};

export type WordPressPage = {
  __typename: string;
  id: string;
  databaseId: number;
  title: string;
  date: string;
  slug: string;
  blocksJSON: string;
  blocks: PageBlock[]; // set after query results are retrieved
  content: string;
};

export default async function getPostByUri(
  slug: string
): Promise<WordPressPage | null> {
  let page: WordPressPage | null = null;

  // get page
  try {
    const client = getClient();
    const {
      data: { nodeByUri },
    } = await client.query<{ nodeByUri: WordPressPage }>({
      query: NODE_BY_URI_QUERY,
      variables: { uri: slug },
    });

    if (!nodeByUri) {
      throw new Error(`No item found at ${slug}`);
    }

    page = { ...nodeByUri };

    // parse blocks on page
    if (page.blocksJSON) {
      try {
        page.blocks = (JSON.parse(page.blocksJSON) as PageBlock[])
          .filter((block) => block.blockName)
          .map((block) => ({ ...block, id: randomUUID() }));
      } catch {
        console.error(`Could not parse blocks on page ${slug}`);
        page.blocks = [];
      }
    }
  } catch (e) {
    console.error(e);
    return null;
  }

  return page;
}
