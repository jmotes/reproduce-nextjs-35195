// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { path } = req.query;

  try {
		await res.unstable_revalidate(path as string);
	} catch (err) {
		return res.status(500).json({ status: err as string });
	}

  res.status(200).json({ status: `path '${path}' revalidated` })
}
