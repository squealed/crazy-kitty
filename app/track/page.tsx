"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Camera,
  Youtube as YoutubeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Music2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

type TrafficStats = {
  [key: string]: number;
};

const icons = {
  discord: MessageCircle,
  instagram: Camera,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  tiktok: Music2,
  twitter: TwitterIcon,
  other: ExternalLink,
};

const DEFAULT_STATS = {
  discord: 0,
  instagram: 0,
  youtube: 0,
  facebook: 0,
  tiktok: 0,
  twitter: 0,
  other: 0,
};

export default function TrackPage() {
  const [stats, setStats] = useState<TrafficStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function updateTrafficStats() {
      // Get referrer information
      const referrer = document.referrer.toLowerCase();
      let source = "other";

      // Determine traffic source
      if (referrer.includes("discord")) source = "discord";
      else if (referrer.includes("instagram")) source = "instagram";
      else if (referrer.includes("youtube")) source = "youtube";
      else if (referrer.includes("facebook")) source = "facebook";
      else if (referrer.includes("tiktok")) source = "tiktok";
      else if (referrer.includes("twitter")) source = "twitter";

      // Increment and fetch updated stats from the API
      const response = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source }),
      });
      const updatedStats = await response.json();
      setStats(updatedStats);
      setLoading(false);
    }

    updateTrafficStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const maxVisits = Math.max(...Object.values(stats));
  const totalVisits = Object.values(stats).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Traffic Statistics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            See where our visitors are coming from! 📊
          </p>
        </motion.div>

        <div className="grid gap-6">
          {Object.entries(stats).map(([source, visits], index) => {
            const Icon = icons[source as keyof typeof icons];
            const percentage = (visits / maxVisits) * 100;
            const visitPercentage = totalVisits
              ? ((visits / totalVisits) * 100).toFixed(1)
              : "0";

            return (
              <motion.div
                key={source}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold capitalize">
                          {source}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {visits} visits
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{visitPercentage}%</div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
