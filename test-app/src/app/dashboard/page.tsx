// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "../../../components/NavBar";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <>
      <NavBar />
      <div>Welcome, {session.user?.email}</div>
    </>
  );
}
