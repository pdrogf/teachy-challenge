import { signIn } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Login() {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={() => signIn('google')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </Layout>
  );
}