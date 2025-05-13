import { getIconSvg } from "sample-icon-api";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    name: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: Params
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
