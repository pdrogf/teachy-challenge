import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const backendUrl = process.env.BACKEND_URL;

  try {
    const response = await axios.get(`${backendUrl}/api/schools`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools' });
  }
}