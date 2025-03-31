import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl font-bold text-center mt-10">Dashboard</h1>
        <p className="text-center mt-4">Welcome to {session?.user.selectedSchool?.name}</p>
      </Layout>
    </ProtectedRoute>
  );
}