import { createMcpHandler } from "@vercel/mcp-adapter";
import { getAllIcons, getIconSvg } from "sample-icon-api";
import { z } from "zod";
const handler = createMcpHandler(
  (server) => {
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
    basePath: "/api",
    verboseLogs: true, // 受信リクエストやツール名などがターミナルにログ表示される
    maxDuration: 60, // 長めのタイムアウト（Edge制限回避）
  }
);

export { handler as GET, handler as POST };
