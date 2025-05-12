import fs from "fs/promises";
import path from "path";
import { z } from "zod";

// アイコンディレクトリのパスを解決
async function resolveIconsPath() {
  // 開発環境では相対パスで解決
  let basePath = path.resolve(__dirname, "../../../packages/icons");

  try {
    // パスが存在するかチェック
    await fs.access(basePath);
    console.log("Using path:", basePath);
    return basePath;
  } catch (e) {
    console.log("Path not found, trying alternatives:", basePath);

    // プロセスのカレントディレクトリからの相対パスを試す
    basePath = path.resolve(process.cwd(), "../../packages/icons");
    try {
      await fs.access(basePath);
      console.log("Using path:", basePath);
      return basePath;
    } catch (e) {
      // それでも見つからない場合は、現在のディレクトリ内の packages/icons を試す
      basePath = path.resolve(process.cwd(), "packages/icons");
      try {
        await fs.access(basePath);
        console.log("Using path:", basePath);
        return basePath;
      } catch (e) {
        console.error("Could not find icons directory");
        throw new Error("Could not find icons directory");
      }
    }
  }
}

// すべてのアイコン名を返す（拡張子なし）
export async function getAllIcons(): Promise<string[]> {
  try {
    const iconsDir = await resolveIconsPath();
    console.log("Reading icons from:", iconsDir);
    const files = await fs.readdir(iconsDir);
    return files
      .filter(f => f.endsWith(".svg"))
      .map(f => f.replace(/\.svg$/, ""));
  } catch (error) {
    console.error("Error reading icons directory:", error);
    throw error;
  }
}

// 指定アイコンの SVG を返す
export async function getIconSvg(name: string): Promise<string> {
  const iconsDir = await resolveIconsPath();
  const filePath = path.join(iconsDir, `${name}.svg`);
  return await fs.readFile(filePath, "utf-8");
}

// schema例（使う場合用）
export const iconNameSchema = z.string().min(1);
