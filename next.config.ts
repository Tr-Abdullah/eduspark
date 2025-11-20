import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // إعدادات الصور
  images: {
    unoptimized: true, // لتوافق أفضل مع منصات النشر
  },
};

export default nextConfig;
