"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md p-6 bg-black rounded-lg shadow-lg shadow-green-500/50 border border-green-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Shopping List App</h1>
        
        {user ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-center">
              Welcome, {user.displayName} ({user.email})
              <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full mx-auto my-4" />
            </p>
            
            <Link href="/week-10/shopping-list" className="w-full">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors">
                Go to Shopping List
              </button>
            </Link>
            
            <button 
              onClick={handleSignOut}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-center">Please sign in to access your shopping list</p>
            <button 
              onClick={handleSignIn}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
            >
              Sign In with GitHub
            </button>
          </div>
        )}
      </div>
    </main>
  );
}