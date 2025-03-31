import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Session {
  id: string;
  userId: string;
  userEmail: string;
  device: string;
  createdAt: string;
  lastActiveAt: string;
}

const SessionManagement: React.FC = () => {
  const { data: sessionData } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/sessions', {
        headers: {
          Authorization: `Bearer ${sessionData?.accessToken}`,
        },
      });
      setSessions(response.data);
    } catch (err) {
      setError('Failed to fetch sessions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      await axios.delete(`/api/admin/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${sessionData?.accessToken}`,
        },
      });
      setSessions(sessions.filter(session => session.id !== sessionId));
    } catch (err) {
      setError('Failed to revoke session');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Session Management</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Device</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Last Active</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="py-2 px-4 border-b">{session.userEmail}</td>
                  <td className="py-2 px-4 border-b">{session.device}</td>
                  <td className="py-2 px-4 border-b">{new Date(session.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{new Date(session.lastActiveAt).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => revokeSession(session.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default SessionManagement;