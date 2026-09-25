import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin/api-client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const response = await adminApiRequest(`/applications/${id}/cv`);

  if (!response.ok) {
    return NextResponse.json(
      { success: false, message: "Fichier introuvable." },
      { status: response.status },
    );
  }

  return new NextResponse(response.body, {
    status: 200,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/pdf",
      "Content-Disposition": `inline; filename="cv-${id}.pdf"`,
    },
  });
}
