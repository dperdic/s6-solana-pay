import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return await handleGet();
}

export async function POST(req: NextRequest) {
  return await handleGet();
}

async function handleGet() {
  return new NextResponse(JSON.stringify({ message: "hello" }), {
    status: 200,
  });
}
