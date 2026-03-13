import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CommunityMetrics {
  builderCount: number;
  countryCount: number;
  newThisWeek: number;
}

export function useCommunityMetrics() {
  return useQuery({
    queryKey: ["community-metrics"],
    queryFn: async (): Promise<CommunityMetrics> => {
      // Fetch all builders' country and created_at to compute metrics client-side
      const { data, error } = await supabase
        .from("builders")
        .select("country, created_at");

      if (error) throw error;

      const rows = data || [];
      const builderCount = rows.length;
      const countryCount = new Set(rows.map((r) => r.country)).size;

      // Start of current week (Monday)
      const now = new Date();
      const dayOfWeek = now.getDay();
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - diff);
      weekStart.setHours(0, 0, 0, 0);

      const newThisWeek = rows.filter(
        (r) => new Date(r.created_at) >= weekStart
      ).length;

      return { builderCount, countryCount, newThisWeek };
    },
    staleTime: 60_000,
  });
}
