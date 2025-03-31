import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const backendUrl = process.env.BACKEND_URL;

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${backendUrl}/api/sessions`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching sessions' });
    }
  } else if (req.method === 'DELETE') {
    const { sessionId } = req.query;
    try {
      await axios.delete(`${backendUrl}/api/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      res.status(200).json({ message: 'Session revoked successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error revoking session' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}