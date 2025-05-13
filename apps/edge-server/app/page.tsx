import { getAllIcons } from "sample-icon-api";
import Link from "next/link";

export default async function Home() {
  // 利用可能なすべてのアイコンを取得
  const icons = await getAllIcons();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-slate-800 dark:text-white">アイコンライブラリ</h1>
        <p className="text-center text-slate-600 dark:text-slate-300 mt-3">社内で使用できるSVGアイコンコレクション</p>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-700/20 p-6 mb-10 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start">
          <div className="mr-4 mt-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">MCP対応</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300">このアイコンライブラリはMCP (Model Context Protocol) に対応しています。お好みのAIモデルとすぐに連携できます。</p>
            <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-sm flex items-center space-x-3">
              <span className="text-indigo-500 dark:text-indigo-400">$</span>
              <code className="text-slate-800 dark:text-slate-200">npx @modelcontextprotocol/inspector</code>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">利用可能なアイコン</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {icons.map((icon) => (
          <Link
            key={icon}
            href={`/icons/${icon}`}
            className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="p-6 flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center mb-4 bg-slate-100 dark:bg-slate-700 rounded-lg p-3 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                <img
                  src={`/api/icons/${icon}`}
                  alt={`${icon} icon`}
                  className="w-full h-full text-slate-700 dark:text-white"
                />
              </div>
              <h3 className="text-lg font-medium text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {icon}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
