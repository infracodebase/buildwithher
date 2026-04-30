import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sampleBuilders, ExtendedBuilderProfile } from "@/data/communityData";

// Extended profile with DB-specific fields
export interface BuilderProfileWithMeta extends ExtendedBuilderProfile {
  dbId?: string;
  userId?: string;
  bannerImageUrl?: string;
  email?: string | null;
  claimStatus?: string;
}

// Convert a DB row to the profile format used by components
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
  builder_story: string | null;
  motivation: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  slug: string | null;
  created_at: string;
  user_id: string | null;
  banner_image_url: string | null;
  updated_at: string | null;
  email: string | null;
  claim_status: string;
}): BuilderProfileWithMeta {
  const roleDisplay = row.role + (row.company ? ` at ${row.company}` : "");
  const tags = [...(row.cloud_focus || []), ...(row.skills || [])];
  const uniqueTags = [...new Set(tags)];
  return {
    id: row.id,
    dbId: row.id,
    name: row.name,
    role: roleDisplay,
    country: row.country,
    photo: row.photo_url || undefined,
    statement: row.statement || row.what_building || "",
    bio: row.builder_story || undefined,
    tags: uniqueTags,
    linkedin: row.linkedin || undefined,
    slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    github: row.github || undefined,
    website: row.portfolio || undefined,
    building: row.what_building ? row.what_building.split("\n").filter(line => line.trim()) : undefined,
    cloudPlatforms: row.cloud_focus || undefined,
    createdAt: row.created_at,
    userId: row.user_id || undefined,
    bannerImageUrl: row.banner_image_url || undefined,
    motivation: row.motivation || undefined,
    email: row.email,
    claimStatus: row.claim_status,
  };
}

export function useBuilders() {
  const queryClient = useQueryClient();

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
    queryFn: async (): Promise<BuilderProfileWithMeta[]> => {
      // Use public_builders view to avoid exposing email to all users.
      // The view isn't in the generated supabase types, so we cast through
      // unknown to the row type used by dbRowToProfile.
      type PublicBuilderRow = Parameters<typeof dbRowToProfile>[0];
      const { data, error } = await (supabase as unknown as {
        from: (table: string) => {
          select: (cols: string) => {
            order: (col: string, opts: { ascending: boolean }) => Promise<{
              data: PublicBuilderRow[] | null;
              error: { message: string } | null;
            }>;
          };
        };
      })
        .from("public_builders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const dbProfiles = (data || []).map(dbRowToProfile);

      const slugSet = new Set(dbProfiles.map((p) => p.slug));
      const staticOnly = sampleBuilders.filter((b) => !slugSet.has(b.slug));

      return [...dbProfiles, ...staticOnly];
    },
  });
}

/**
 * Submit a new builder profile, linking it to the Clerk user ID.
 */
export async function submitBuilder(args: {
  name: string;
  email: string;
  country: string;
  role: string;
  company?: string;
  cloud_focus: string[];
  what_building?: string;
  statement?: string;
  builder_story?: string;
  motivation?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  photoFile?: File | null;
  clerkUserId: string;
}) {
  let photo_url: string | null = null;

  if (args.photoFile) {
    const ext = args.photoFile.name.split(".").pop() || "jpg";
    const path = `${args.clerkUserId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
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
    email: args.email,
    country: args.country,
    role: args.role,
    company: args.company || null,
    cloud_focus: args.cloud_focus,
    skills: args.cloud_focus,
    what_building: args.what_building || null,
    statement: args.statement || null,
    builder_story: args.builder_story || null,
    motivation: args.motivation || null,
    linkedin: args.linkedin || null,
    github: args.github || null,
    portfolio: args.portfolio || null,
    photo_url,
    slug,
    user_id: args.clerkUserId,
    claim_status: "claimed",
  });

  if (error) throw error;

  return { slug, photo_url };
}
