import { NextRequest, NextResponse } from "next/server";
import { validatePassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (validatePassword(password)) {
      const response = NextResponse.json({ success: true });
      
      // تعيين cookie للجلسة
      response.cookies.set("admin-session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 ساعة
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
