import { getIconSvg } from "sample-icon-api";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  if (!name) {
    return NextResponse.json({ error: "Icon name is required" }, { status: 400 });
  }

  try {
    const svg = await getIconSvg(name);
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml"
      }
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Icon "${name}" not found`, detail: String(err) },
      { status: 404 }
    );
  }
}
