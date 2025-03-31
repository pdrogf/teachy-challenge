import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { schoolId } = req.body;
  const backendUrl = process.env.BACKEND_URL;

  try {
    const response = await axios.post(`${backendUrl}/api/select-school`, 
      { schoolId },
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error selecting school' });
  }
}