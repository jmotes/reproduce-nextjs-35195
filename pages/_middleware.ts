import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const pathname = req.nextUrl.pathname;
    const hostname = req.headers.get("host") ?? "";

    // don't proxy requests to static files or api endpoints
    if (!pathname.includes(".") && !pathname.startsWith("/api")) {
        url.pathname = `/_sites/${encodeURIComponent(hostname)}${pathname}`;
        return NextResponse.rewrite(url);
    }
}