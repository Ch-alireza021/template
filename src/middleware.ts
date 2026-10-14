import createMiddleware from "next-intl/middleware";
import {NextRequest,NextResponse} from "next/server";
import {jwtVerify} from "jose";
import {routing} from "@/i18n/routing";
const intlMiddleware=createMiddleware(routing);
const secret=()=>new TextEncoder().encode(process.env.SESSION_SECRET||"development-only-secret-change-this-please");
export default async function middleware(request:NextRequest){
 const match=request.nextUrl.pathname.match(/^\/(fa|en)\/admin(?:\/|$)/);
 if(match){
  const token=request.cookies.get("student_portal_session")?.value;
  let valid=false;
  if(token){try{const {payload}=await jwtVerify(token,secret());valid=payload.role==="admin"&&typeof payload.sub==="string";}catch{valid=false;}}
  if(!valid){const url=request.nextUrl.clone();url.pathname=`/${match[1]}/login`;url.searchParams.set("callbackUrl",request.nextUrl.pathname);return NextResponse.redirect(url);}
 }
 return intlMiddleware(request);
}
export const config={matcher:["/((?!api|_next|_vercel|.*\..*).*)"]};

