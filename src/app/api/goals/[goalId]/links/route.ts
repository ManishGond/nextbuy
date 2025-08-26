import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { goalId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { url, description } = body;

  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  const link = await prisma.goalLink.create({
    data: {
      goalId: params.goalId,
      url,
      description,
    },
  });

  return NextResponse.json(link);
}
