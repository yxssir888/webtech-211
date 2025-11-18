import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: any) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getUser();

 
  return res;
}
