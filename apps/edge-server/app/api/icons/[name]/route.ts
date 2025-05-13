import { getIconSvg } from "sample-icon-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = params.name;

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
