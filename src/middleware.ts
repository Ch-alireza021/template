import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = intlMiddleware(request);

  const isAdminPath = routing.locales.some((loc) =>
    pathname.startsWith(`/${loc}/admin`),
  );

  if (isAdminPath) {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) {
      // پیدا کردن لوکال جاری از URL برای ریدایرکت تمیز
      const currentLocale =
        routing.locales.find((loc) => pathname.startsWith(`/${loc}`)) ||
        routing.defaultLocale;
      return NextResponse.redirect(
        new URL(`/${currentLocale}/login`, request.url),
      );
    }
  }

  return response;
}

export const config = {
  // این matcher فایل‌های استاتیک، تصاویر، آیکون‌ها و api را رد می‌کند
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
