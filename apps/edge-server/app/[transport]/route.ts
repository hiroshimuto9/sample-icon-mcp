import { createMcpHandler } from "@vercel/mcp-adapter";
import { NextRequest, NextResponse } from "next/server";
import { getAllIcons, getIconSvg } from "sample-icon-api";
import { z } from "zod";

const mcpServer = createMcpHandler(
  (server) => {
    console.log("▶️ MCP REDIS_URL:", process.env.REDIS_URL);

    server.tool(
      "get_available_icons",
      "Return all icon names",
      {},
      async () => {
        const icons = await getAllIcons();
        return {
          content: [{ type: "text", text: icons.join("\n") }]
        };
      }
    );

    server.tool(
      "get_icon_svg",
      "Return the SVG source of an icon",
      {
        iconName: z.string()
      },
      async ({ iconName }) => {
        const svg = await getIconSvg(iconName);
        return {
          content: [{ type: "text", text: svg }]
        };
      }
    );
  },
  {}, // ← server.options（今回は未使用なので空オブジェクトでOK）
  {
    basePath: "",
    verboseLogs: true, // 受信リクエストやツール名などがターミナルにログ表示される
    maxDuration: 60, // 長めのタイムアウト（Edge制限回避）
    redisUrl: (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview')
                ? process.env.REDIS_URL
                : process.env.NODE_ENV === 'development'
                    ? process.env.REDIS_URL
                    : undefined,
  }
);

// 認証チェック関数
function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') || ''
  return auth === `Bearer ${process.env.API_KEY}` || auth === `${process.env.API_KEY}`
}

// GET ハンドラー
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  return mcpServer(req)  // createMcpHandler が返す handler を呼び出し
}

// POST ハンドラー
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  return mcpServer(req)
}
