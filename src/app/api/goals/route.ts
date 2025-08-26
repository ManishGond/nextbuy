import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json([], { status: 200 });

  const goals = await prisma.goal.findMany({
    where: { userId: session.user.id },
    include: { links: true },
  });

  return NextResponse.json(goals);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, targetAmount, deadline } = body;

  if (!title || !targetAmount || !deadline) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const goal = await prisma.goal.create({
    data: {
      userId: session.user.id,
      title,
      targetAmount,
      deadline: new Date(deadline),
    },
  });

  return NextResponse.json(goal);
}
