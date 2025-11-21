import {NextRequest, NextResponse} from "next/server";
import {getAccessToken} from "@/auth";

export async function GET(request: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  return proxyRequest(request, (await params).slug);
}

export async function HEAD(request: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  return proxyRequest(request, (await params).slug);
}

export async function POST(request: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  return proxyRequest(request, (await params).slug);
}

export async function PUT(request: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  return proxyRequest(request, (await params).slug);
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  return proxyRequest(request, (await params).slug);
}

export async function PATCH(request: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  return proxyRequest(request, (await params).slug);
}

export async function OPTIONS(request: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  return proxyRequest(request, (await params).slug);
}

async function proxyRequest(request: NextRequest, slug: string[]) {
  const {token} = await getAccessToken();

  if (!token) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 403});
  }

  const requestUrl = new URL(request.url);
  const url = new URL(process.env.API_PROXY_URL!);

  url.pathname = `${url.pathname && url.pathname != "/" ? url.pathname + "/" : ""}${[...slug].join("/")}`;
  url.search = requestUrl.search;
  url.hash = requestUrl.hash;

  try {
    const body =
      request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined;

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (!["host", "connection", "content-length", "cookie"].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    // Todo: include your authentication here if needed
    const response = await fetch(url, {
      method: request.method,
      headers,
      body,
    });

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (!["connection", "transfer-encoding", "content-encoding"].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    const responseBody = response.body;

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({error: "Failed to proxy request"}, {status: 500});
  }
}
