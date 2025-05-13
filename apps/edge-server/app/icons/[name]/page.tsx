import { getIconSvg } from "sample-icon-api";
import Link from "next/link";

export default async function IconDetailPage({
  params
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params;

  try {
    // アイコンのSVGを取得
    const svg = await getIconSvg(name);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">{name}</h1>
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors inline-flex items-center group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            アイコン一覧に戻る
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-700/20 border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 bg-slate-100 dark:bg-slate-700 rounded-xl p-8 flex justify-center items-center">
              <div className="w-40 h-40 text-slate-900 dark:text-white" dangerouslySetInnerHTML={{ __html: svg }} />
            </div>

            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">使用方法</h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  API経由で取得
                </h3>
                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md mb-2 border border-slate-200 dark:border-slate-700">
                  <code className="font-mono text-sm text-slate-800 dark:text-slate-200">GET /api/icons/{name}</code>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  SVGデータをREST API経由で直接取得できます。image/svg+xmlとして返されます。
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  MCP経由で取得
                </h3>
                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md mb-2 border border-slate-200 dark:border-slate-700">
                  <code className="font-mono text-sm text-slate-800 dark:text-slate-200">get_icon_svg(iconName: &quot;{name}&quot;)</code>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  MCPを使用して、AIモデルからアイコンのSVGデータを取得できます。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  SVGコード
                </h3>
                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md overflow-x-auto border border-slate-200 dark:border-slate-700">
                  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">{svg}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">エラー</h1>
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors inline-flex items-center group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            アイコン一覧に戻る
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-red-200 dark:border-red-900/30 p-8">
          <div className="flex items-center text-red-500 dark:text-red-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold">アイコンが見つかりません</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            指定された &quot;{name}&quot; アイコンは存在しないか、読み込みに失敗しました。
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            エラー詳細: {errorMessage}
          </p>
        </div>
      </div>
    );
  }
}
