import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // إعدادات Cloudflare Pages
  output: 'export', // تصدير ثابت للصفحات
  images: {
    unoptimized: true, // تعطيل تحسين الصور لـ Cloudflare
  },
};

export default nextConfig;
