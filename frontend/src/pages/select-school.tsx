import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';

interface School {
  id: string;
  name: string;
}

const SelectSchool: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/schools', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      setSchools(response.data);
    } catch (err) {
      setError('Failed to fetch schools');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolSelect = async (schoolId: string) => {
    try {
      await axios.post('/api/select-school', { schoolId }, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to select school');
      console.error(err);
    }
  };

  if (loading) return <div>Loading schools...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Select a School</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => (
              <button
                key={school.id}
                onClick={() => handleSchoolSelect(school.id)}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold">{school.name}</h2>
              </button>
            ))}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default SelectSchool;