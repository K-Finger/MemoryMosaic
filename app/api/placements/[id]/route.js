import { supabase } from "@/lib/supabase/server";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const adminKey = request.headers.get("x-admin-key");

  if (adminKey !== process.env.ADMIN_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: placement, error: selectErr } = await supabase
      .from("placements")
      .select("url")
      .eq("id", id)
      .single();

    if (selectErr || !placement) {
      return Response.json({ error: "Placement not found" }, { status: 404 });
    }

    const fileName = placement.url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("images").remove([fileName]);
    }

    const { error: deleteErr } = await supabase
      .from("placements")
      .delete()
      .eq("id", id);

    if (deleteErr) throw deleteErr;

    return Response.json({ deleted: id });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
