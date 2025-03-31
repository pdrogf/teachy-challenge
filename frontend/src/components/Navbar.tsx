import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold">
          Home
        </Link>
        <div>
          {session ? (
            <>
              <Link href="/dashboard" className="text-white mr-4">
                Dashboard
              </Link>
              <button onClick={() => signOut()} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;