import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const validUsername = "admin";
  const validPassword = "1234";

  if (username === validUsername && password === validPassword) {
    const token = "fake-jwt-token";
    return NextResponse.json({ token }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Invalid username or password" },
    { status: 401 }
  );
}
