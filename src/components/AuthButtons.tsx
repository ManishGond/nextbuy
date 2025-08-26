"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
        )}
        <span>{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 px-3 py-1 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition duration-200 bg-white text-gray-800 font-medium"
    >
      <FcGoogle className="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>
  );
}
