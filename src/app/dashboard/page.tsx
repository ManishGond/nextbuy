import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-8">
        <h1 className="text-3xl font-bold">Welcome, {session.user?.name}</h1>
      </div>

      {/* Dashboard interactive components */}
      <DashboardContent />
    </div>
  );
}
