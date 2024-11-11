"use client";

import { motion } from "framer-motion";
import { 
  Camera,
  Youtube as YoutubeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Music2,
  MessageCircle,
  Heart,
  Flame
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";
import FloatingCat from "@/components/FloatingCat";

const links = [
  {
    name: "Discord",
    url: "https://discord.gg/EY9EywrD?ref=discord",
    color: "bg-[#5865F2]",
    hoverColor: "hover:bg-[#4752c4]",
    icon: MessageCircle,
    trollText: "Join the chaos! >:3"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/omg.crazykitty?ref=instagram",
    color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    hoverColor: "hover:opacity-90",
    icon: Camera,
    trollText: "Witness the mayhem! 📸"
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@OMG.CrazyKitty/featured?ref=youtube",
    color: "bg-[#FF0000]",
    hoverColor: "hover:bg-[#cc0000]",
    icon: YoutubeIcon,
    trollText: "Watch me break stuff! 🎮"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61567312928664&ref=facebook",
    color: "bg-[#1877F2]",
    hoverColor: "hover:bg-[#1464ce]",
    icon: FacebookIcon,
    trollText: "Boomer territory! jk 😹"
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@omg.crazykitty?ref=tiktok",
    color: "bg-black",
    hoverColor: "hover:bg-[#111]",
    icon: Music2,
    trollText: "Warning: Pure chaos ahead!"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/omgcrazykitty?ref=twitter",
    color: "bg-[#1DA1F2]",
    hoverColor: "hover:bg-[#1a8cd8]",
    icon: TwitterIcon,
    trollText: "Bird app shenanigans 🐦"
  }
];

const gradients = [
  "bg-gradient-to-r from-purple-500 to-pink-500",
  "bg-gradient-to-r from-cyan-500 to-blue-500",
  "bg-gradient-to-r from-green-400 to-cyan-500",
  "bg-gradient-to-r from-yellow-400 to-orange-500",
  "bg-gradient-to-r from-red-500 to-purple-500",
  "bg-gradient-to-r from-pink-500 to-rose-500"
];

export default function Home() {
  const [currentGradient, setCurrentGradient] = useState(0);

  const handleCatClick = () => {
    setCurrentGradient((prev) => (prev + 1) % gradients.length);
  };

  return (
    <main className={`min-h-screen ${gradients[currentGradient]} transition-all duration-500`}>
      <FloatingCat />
      <div className="max-w-3xl mx-auto pt-16 px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-block cursor-pointer relative w-48 h-48"
            onClick={handleCatClick}
          >
            <Image
              src="/crazy-kitty.png"
              alt="Crazy Kitty"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold text-white mt-4 drop-shadow-lg">
            Crazy kitty OMG
          </h1>
          <p className="text-white/80 mt-2 text-lg">Click the cat for chaos! 🐱</p>
        </motion.div>

        <div className="space-y-4">
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className={`${link.color} ${link.hoverColor} transform transition-all duration-200 hover:scale-105 hover:-rotate-1`}>
                  <div className="p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <link.icon className="w-6 h-6" />
                      <span className="font-semibold">{link.name}</span>
                    </div>
                    <span className="text-sm opacity-90">{link.trollText}</span>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-8 text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="flex items-center justify-center gap-2 text-lg font-bold">
            Made with <Heart className="w-5 h-5 text-red-400" /> and 
            <Flame className="w-5 h-5 text-orange-400" /> by a 😺
          </p>
        </motion.div>
      </div>
    </main>
  );
}