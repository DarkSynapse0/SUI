"use client";

import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      {session ? (
        <>
          <button className="cursor-pointer" onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}
