import { kv } from "@vercel/kv";

// Disable static rendering for this API route
export const dynamic = "force-dynamic";

type TrafficStats = {
  discord: number;
  instagram: number;
  youtube: number;
  facebook: number;
  tiktok: number;
  twitter: number;
  other: number;
};

const DEFAULT_STATS: TrafficStats = {
  discord: 0,
  instagram: 0,
  youtube: 0,
  facebook: 0,
  tiktok: 0,
  twitter: 0,
  other: 0,
};

type TrafficSource = keyof TrafficStats;

export async function POST(req: Request): Promise<Response> {
  try {
    const { source } = await req.json();
    if (!source) {
      console.error("Error: 'source' not provided in request body.");
      return new Response(JSON.stringify({ error: "'source' is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!["discord", "instagram", "youtube", "facebook", "tiktok", "twitter", "other"].includes(source)) {
      console.error(`Error: Invalid source '${source}'`);
      return new Response(JSON.stringify({ error: "Invalid source" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const currentStats = (await kv.get("trafficStats")) as TrafficStats | null;
    const updatedStats = { ...(currentStats || DEFAULT_STATS) };
    const trafficSource = source as TrafficSource;

    updatedStats[trafficSource] = (updatedStats[trafficSource] || 0) + 1;
    await kv.set("trafficStats", updatedStats);

    return new Response(JSON.stringify(updatedStats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to update stats:", error);
    return new Response(JSON.stringify({ error: "Failed to update stats" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
