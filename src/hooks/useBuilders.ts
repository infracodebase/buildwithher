import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sampleBuilders, ExtendedBuilderProfile } from "@/data/communityData";

// Convert a DB row to the ExtendedBuilderProfile format used by components
function dbRowToProfile(row: {
  id: string;
  name: string;
  photo_url: string | null;
  country: string;
  role: string;
  company: string | null;
  cloud_focus: string[] | null;
  skills: string[] | null;
  what_building: string | null;
  statement: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  slug: string | null;
  created_at: string;
}): ExtendedBuilderProfile {
  const roleDisplay = row.role + (row.company ? ` at ${row.company}` : "");
  const tags = [...(row.cloud_focus || []), ...(row.skills || [])];
  return {
    id: row.id,
    name: row.name,
    role: roleDisplay,
    country: row.country,
    photo: row.photo_url || undefined,
    statement: row.statement || row.what_building || "",
    tags,
    linkedin: row.linkedin || undefined,
    slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    github: row.github || undefined,
    website: row.portfolio || undefined,
    building: row.what_building ? [row.what_building] : undefined,
    cloudPlatforms: row.cloud_focus || undefined,
  };
}

export function useBuilders() {
  const queryClient = useQueryClient();

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("builders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "builders" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["builders"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["builders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const dbProfiles = (data || []).map(dbRowToProfile);

      // Merge: static builders + DB submissions (deduplicate by slug)
      const slugSet = new Set(dbProfiles.map((p) => p.slug));
      const staticOnly = sampleBuilders.filter((b) => !slugSet.has(b.slug));

      return [...dbProfiles, ...staticOnly];
    },
  });
}

export async function submitBuilder(args: {
  name: string;
  country: string;
  role: string;
  company?: string;
  cloud_focus: string[];
  what_building?: string;
  statement?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  photoFile?: File | null;
}) {
  let photo_url: string | null = null;

  // Upload photo if provided
  if (args.photoFile) {
    const ext = args.photoFile.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("builder-photos")
      .upload(path, args.photoFile);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("builder-photos")
      .getPublicUrl(path);
    photo_url = urlData.publicUrl;
  }

  const slug = args.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("builders").insert({
    name: args.name,
    country: args.country,
    role: args.role,
    company: args.company || null,
    cloud_focus: args.cloud_focus,
    skills: args.cloud_focus,
    what_building: args.what_building || null,
    statement: args.statement || null,
    linkedin: args.linkedin || null,
    github: args.github || null,
    portfolio: args.portfolio || null,
    photo_url,
    slug,
  });

  if (error) throw error;
}
