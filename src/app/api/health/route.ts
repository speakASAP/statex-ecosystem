import { NextResponse } from "next/server";

/** Liveness for reverse proxies and orchestrators */
export function GET() {
  return NextResponse.json({ status: "ok", service: "statex-ecosystem" });
}
