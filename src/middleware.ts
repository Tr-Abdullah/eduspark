import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // التحقق من صفحات Admin
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    const session = request.cookies.get("admin-session");
    
    if (!session) {
      // إعادة توجيه لصفحة تسجيل الدخول
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
