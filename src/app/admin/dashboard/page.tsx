"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from 'next/dynamic';

// تحميل مكون PDF فقط في المتصفح
const PDFPreview = dynamic(() => import('@/components/PDFPreview'), { ssr: false });

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const criteriaId = searchParams.get('criteria');
  // قراءة التبويب من باراميتر الرابط
  const initialTab = (searchParams.get('tab') as "reports" | "tools" | "log" | "performance" | "general" | "evidence") || "reports";
  const [activeTab, setActiveTab] = useState<"reports" | "tools" | "log" | "performance" | "general" | "evidence">(initialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <style jsx global>{`
        /* حل احترافي للطباعة - يعمل مع أو بدون معاينة */
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          /* إخفاء عناصر التنقل والقوائم */
          header,
          aside,
          nav,
          .no-print,
          button:not(.sheet button) {
            display: none !important;
          }

          /* إظهار المحتوى القابل للطباعة */
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* الحاوية الرئيسية */
          main,
          .max-w-4xl,
          .max-w-5xl,
          .max-w-7xl {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* إذا كان هناك .sheet (معاينة)، اطبعه */
          .sheet {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 100% !important;
            height: auto !important;
            padding: 10mm !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            position: relative !important;
            overflow: visible !important;
            background: white !important;
            color: black !important;
            page-break-inside: avoid !important;
            direction: rtl !important;
            text-align: right !important;
          }

          /* فرض طباعة الألوان */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* إظهار جميع عناصر التقرير */
          #report-header,
          #report-content,
          #report-footer,
          .print-content {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          /* منع تقسيم الصفحات داخل العناصر المهمة */
          .sheet *,
          .print-content * {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* إصلاح الخلفيات والحدود */
          .bg-gradient-to-r,
          .bg-blue-600,
          .bg-teal-500,
          [class*="bg-"] {
            background-color: inherit !important;
          }

          /* تحويل العناصر الثابتة إلى static */
          .sticky,
          .fixed {
            position: static !important;
          }

          /* إصلاح Grid والجداول */
          .grid {
            display: grid !important;
            width: 100% !important;
          }

          /* إصلاح الصور */
          img {
            max-width: 100% !important;
            height: auto !important;
          }

          /* إزالة الظلال والتأثيرات */
          .shadow,
          .shadow-xl,
          .shadow-2xl {
            box-shadow: none !important;
          }

          /* إصلاح الحاويات */
          .container,
          .mx-auto {
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                E
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Eduspark
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">لوحة التحكم</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">متصل</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - Desktop & Mobile */}
        <aside className={`
          sticky top-[73px] h-[calc(100vh-73px)] bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto transition-all duration-300
          ${sidebarCollapsed ? "w-16" : "w-64"}
          lg:block
          ${mobileMenuOpen ? "fixed right-0 z-50 shadow-2xl" : "hidden"}
        `}>
          <nav className="p-4 space-y-2">
            {/* زر الإغلاق للهاتف */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden w-full flex items-center justify-center px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-all mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="mr-3 font-medium">إغلاق</span>
            </button>
            
            {/* زر الطي/الفتح - Desktop فقط */}
            {/* زر الطي/الفتح - Desktop فقط */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`hidden lg:flex w-full items-center ${sidebarCollapsed ? "justify-center px-2" : "justify-center px-4"} py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-all mb-4`}
              title={sidebarCollapsed ? "فتح القائمة" : "طي القائمة"}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
              </svg>
              {!sidebarCollapsed && <span className="mr-3 font-medium">طي القائمة</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab("reports");
                setMobileMenuOpen(false);
                const params = new URLSearchParams(window.location.search);
                params.set('tab', 'reports');
                router.replace(`?${params.toString()}`);
              }}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all ${
                activeTab === "reports"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              title={sidebarCollapsed ? "مولد التقارير" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">مولد التقارير</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab("performance");
                setMobileMenuOpen(false);
                const params = new URLSearchParams(window.location.search);
                params.set('tab', 'performance');
                router.replace(`?${params.toString()}`);
              }}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all ${
                activeTab === "performance"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              title={sidebarCollapsed ? "أداء وظيفي" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">تقارير الأداء الوظيفي</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab("general");
                setMobileMenuOpen(false);
                const params = new URLSearchParams(window.location.search);
                params.set('tab', 'general');
                router.replace(`?${params.toString()}`);
              }}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all ${
                activeTab === "general"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              title={sidebarCollapsed ? "التقارير العامة" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">التقارير العامة</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab("evidence");
                setMobileMenuOpen(false);
                const params = new URLSearchParams(window.location.search);
                params.set('tab', 'evidence');
                router.replace(`?${params.toString()}`);
              }}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all ${
                activeTab === "evidence"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              title={sidebarCollapsed ? "شواهد الأداء" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">شواهد الأداء</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab("tools");
                setMobileMenuOpen(false);
                const params = new URLSearchParams(window.location.search);
                params.set('tab', 'tools');
                router.replace(`?${params.toString()}`);
              }}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all ${
                activeTab === "tools"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              title={sidebarCollapsed ? "أدوات أخرى" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">أدوات أخرى</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab("log");
                setMobileMenuOpen(false);
                setSidebarCollapsed(true); // طي القائمة تلقائياً عند فتح سجل المتابعة
                const params = new URLSearchParams(window.location.search);
                params.set('tab', 'log');
                router.replace(`?${params.toString()}`);
              }}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all ${
                activeTab === "log"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              title={sidebarCollapsed ? "سجل المتابعة" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">سجل المتابعة</span>}
            </button>

            <Link
              href="/admin/portfolio"
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-all`}
              title={sidebarCollapsed ? "ملف الإنجاز" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">ملف الإنجاز</span>}
            </Link>

            <Link
              href="/admin/dashboard?tab=performance"
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-all`}
              title={sidebarCollapsed ? "تقارير الأداء الوظيفي" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">تقارير الأداء الوظيفي</span>}
            </Link>

            <Link
              href="/admin/portfolio/manage"
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-all`}
              title={sidebarCollapsed ? "إضافة شاهد" : ""}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">إدارة الملف</span>}
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="mb-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">مرحباً بك! 👋</h2>
                  <p className="text-teal-100">
                    {activeTab === "reports" && "إدارة وتوليد التقارير الرسمية"}
                    {activeTab === "performance" && "تقارير الأداء الوظيفي وشواهدها"}
                    {activeTab === "general" && "التقارير العامة والأنشطة التربوية"}
                    {activeTab === "evidence" && "شواهد الأداء التربوية الإحترافية"}
                    {activeTab === "tools" && "الأدوات والإعدادات الإضافية"}
                    {activeTab === "log" && "سجل المتابعة الإلكتروني"}
                  </p>
                </div>
                <div className="hidden md:block text-6xl opacity-20">
                  {activeTab === "reports" && "📊"}
                  {activeTab === "performance" && "📑"}
                  {activeTab === "general" && "🏆"}
                  {activeTab === "evidence" && "📋"}
                  {activeTab === "tools" && "🛠️"}
                  {activeTab === "log" && "🗒️"}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              {activeTab === "reports" && <MOEReportGenerator />}
              {activeTab === "performance" && <PerformanceReportGenerator />}
              {activeTab === "general" && <GeneralReportsGenerator />}
              {activeTab === "evidence" && <EvidenceReportsGenerator />}
              {activeTab === "tools" && <OtherTools />}
              {activeTab === "log" && <StudentFollowUpLog />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Evidence Reports Generator Component
function EvidenceReportsGenerator() {
  const [selectedType, setSelectedType] = useState<
    | "strategies" 
    | "visits" 
    | "programs" 
    | "communities" 
    | "remedial" 
    | "achievement" 
    | "general" 
    | "barcode" 
    | "certificate" 
    | "cover"
    | "dividers"
    | null
  >(null);

  // Import the forms dynamically
  const StrategiesForm = dynamic(() => import('@/components/evidence/StrategiesForm'), { ssr: false });
  const ExchangeVisitForm = dynamic(() => import('@/components/evidence/ExchangeVisitForm'), { ssr: false });
  const GeneralEvidenceForm = dynamic(() => import('@/components/evidence/GeneralEvidenceForm'), { ssr: false });
  const ProgramExecutionForm = dynamic(() => import('@/components/evidence/ProgramExecutionForm'), { ssr: false });
  const AchievementForm = dynamic(() => import('@/components/evidence/AchievementForm'), { ssr: false });
  const ProfessionalCommunitiesForm = dynamic(() => import('@/components/evidence/ProfessionalCommunitiesForm'), { ssr: false });
  const RemedialPlanForm = dynamic(() => import('@/components/evidence/RemedialPlanForm'), { ssr: false });
  const QRCodeForm = dynamic(() => import('@/components/evidence/QRCodeForm'), { ssr: false });
  const CertificateForm = dynamic(() => import('@/components/evidence/CertificateForm'), { ssr: false });
  const CoverForm = dynamic(() => import('@/components/evidence/CoverForm'), { ssr: false });
  const DividersForm = dynamic(() => import('@/components/evidence/DividersForm'), { ssr: false });

  const evidenceTypes = [
    {
      id: "strategies",
      title: "استخدام الاستراتيجيات والوسائل",
      description: "شواهد استخدام الاستراتيجيات التعليمية والوسائل المساعدة",
      icon: "🎯",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "visits",
      title: "الزيارات التبادلية",
      description: "تقارير وشواهد الزيارات التبادلية بين المعلمين",
      icon: "👥",
      color: "from-green-500 to-green-600"
    },
    {
      id: "programs",
      title: "تنفيذ البرامج والمبادرات",
      description: "تقارير تنفيذ البرامج التعليمية والمبادرات التربوية",
      icon: "📚",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "communities",
      title: "نموذج المجتمعات المهنية",
      description: "تقارير اجتماعات المجتمعات المهنية التعلمية",
      icon: "🤝",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: "remedial",
      title: "خطة علاجية",
      description: "خطط علاجية للطلاب ذوي التحصيل المنخفض",
      icon: "📈",
      color: "from-red-500 to-red-600"
    },
    {
      id: "achievement",
      title: "تقرير الإنجاز اليومي/الاسبوعي",
      description: "تقارير الإنجاز اليومي والأسبوعي للمعلم",
      icon: "✅",
      color: "from-teal-500 to-teal-600"
    },
    {
      id: "general",
      title: "النموذج العام",
      description: "نموذج عام قابل للتخصيص لأي نوع من الشواهد",
      icon: "📄",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: "barcode",
      title: "تحويل الملف الي باركود",
      description: "إنشاء باركود QR للملفات والوثائق",
      icon: "📱",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "certificate",
      title: "شهادة",
      description: "إصدار شهادات التقدير والتكريم",
      icon: "🏆",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: "cover",
      title: "غلاف السجل",
      description: "تصميم أغلفة السجلات والملفات",
      icon: "📔",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: "dividers",
      title: "الفواصل",
      description: "فواصل ملونة لتنظيم السجلات",
      icon: "📑",
      color: "from-lime-500 to-lime-600"
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
            شواهد الأداء التربوية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            اختر نوع الشاهد أو النموذج المطلوب لإنشاء تقرير احترافي
          </p>
        </div>

        {/* Back Button */}
        {selectedType && (
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>العودة للقائمة</span>
          </button>
        )}

        {/* Grid of Evidence Types */}
        {!selectedType && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evidenceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as any)}
                className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 text-right"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                {/* Icon */}
                <div className="text-5xl mb-4">{type.icon}</div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {type.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {type.description}
                </p>

                {/* Arrow Icon */}
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Form Content */}
        {selectedType === "strategies" && (
          <StrategiesForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "visits" && (
          <ExchangeVisitForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "general" && (
          <GeneralEvidenceForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "programs" && (
          <ProgramExecutionForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "achievement" && (
          <AchievementForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "communities" && (
          <ProfessionalCommunitiesForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "remedial" && (
          <RemedialPlanForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "barcode" && (
          <QRCodeForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "certificate" && (
          <CertificateForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "cover" && (
          <CoverForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType === "dividers" && (
          <DividersForm onBack={() => setSelectedType(null)} />
        )}
        
        {selectedType && !["strategies", "visits", "general", "programs", "achievement", "communities", "remedial", "barcode", "certificate", "cover", "dividers"].includes(selectedType) && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center py-20">
              <div className="text-6xl mb-4">
                {evidenceTypes.find(t => t.id === selectedType)?.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                {evidenceTypes.find(t => t.id === selectedType)?.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                جاري العمل على هذا النموذج...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MOEReportGenerator() {
  const searchParams = useSearchParams();
  const criteriaId = searchParams.get('criteria');
  
  const [formData, setFormData] = useState({
    criteriaId: criteriaId || "",
    region: "إدارة التعليم جازان",
    schoolName: "مدرسة ابن سيناء المتوسطة وبرنامجي العوق الفكري والتوحد",
    day: "12",
    month: "12",
  year: "1447",
    subject: "Super Goal 3 - لغة انجليزية",
    strategy: "التعلم المبني على حل المشكلات",
    students: "30",
    stage: "الأول متوسط",
    semester: "أ",
    performanceItem: "",
    performanceElement: "",
    unit: "",
    lesson: "",
    tools: [] as string[],
    objectives: [] as string[],
    teacherName: "عبدالله حسن الفيفي",
    principalName: "احمد علي كريري",
    uploadedFiles: [] as Array<{name: string, url: string}>
  });

  const [logoImage, setLogoImage] = useState<string>("");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedReports, setSavedReports] = useState<Array<any>>([]);

  // تحميل التقارير المحفوظة
  useEffect(() => {
    try {
      const stored = localStorage.getItem("moe-reports");
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // تحديث criteriaId عند تغيير الـ URL
  useEffect(() => {
    if (criteriaId) {
      setFormData(prev => ({ ...prev, criteriaId }));
    }
  }, [criteriaId]);

  // دالة الطباعة الاحترافية - حل جذري
  const handlePrint = () => {
    // إذا كانت المعاينة مفتوحة، اطبع مباشرة
    if (showPreview) {
      window.print();
      return;
    }
    
    // إذا لم تكن المعاينة مفتوحة، افتحها أولاً
    setShowPreview(true);
    
    // انتظر حتى يتم رسم المعاينة ثم اطبع
    setTimeout(() => {
      window.print();
    }, 1000); // وقت كافٍ لتحميل كل شيء
  };

  // تغيير عنوان الصفحة عند المعاينة
  useEffect(() => {
    if (showPreview && formData.strategy) {
      const originalTitle = document.title;
      document.title = `تقرير ${formData.strategy} - ${formData.schoolName}`;
      return () => {
        document.title = originalTitle;
      };
    }
  }, [showPreview, formData.strategy, formData.schoolName]);

  // حفظ التقرير
  const saveReport = () => {
    const report = {
      id: Date.now(),
      ...formData,
      savedAt: new Date().toISOString()
    };
    const newReports = [...savedReports, report];
    setSavedReports(newReports);
    localStorage.setItem("moe-reports", JSON.stringify(newReports));
    
    // حفظ كـ portfolio item أيضاً
    try {
      const portfolioItems = JSON.parse(localStorage.getItem("portfolio-items") || "[]");
      portfolioItems.push({
        id: Date.now(),
        criteriaId: parseInt(criteriaId || "1"),
        title: `تقرير: ${formData.strategy}`,
        description: `المادة: ${formData.subject} | المرحلة: ${formData.stage} | التاريخ: ${formData.day}/${formData.month}/${formData.year}`,
        files: formData.uploadedFiles.map(f => f.name),
        date: new Date().toLocaleDateString("ar-SA"),
        reportData: formData
      });
      localStorage.setItem("portfolio-items", JSON.stringify(portfolioItems));
    } catch {
      // ignore
    }
    
    alert("✅ تم حفظ التقرير بنجاح!");
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBarcodeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBarcodeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // الأيام الهجرية
  const hijriDays = Array.from({ length: 30 }, (_, i) => String(i + 1));
  
  // الأشهر الهجرية
  const hijriMonths = [
    { value: "1", label: "محرم" },
    { value: "2", label: "صفر" },
    { value: "3", label: "ربيع الأول" },
    { value: "4", label: "ربيع الآخر" },
    { value: "5", label: "جمادى الأولى" },
    { value: "6", label: "جمادى الآخرة" },
    { value: "7", label: "رجب" },
    { value: "8", label: "شعبان" },
    { value: "9", label: "رمضان" },
    { value: "10", label: "شوال" },
    { value: "11", label: "ذو القعدة" },
    { value: "12", label: "ذو الحجة" }
  ];
  
  // السنوات الهجرية
  const hijriYears = Array.from({ length: 10 }, (_, i) => String(1445 + i));
  
  // عدد الطلاب
  const studentCounts = Array.from({ length: 50 }, (_, i) => String(i + 1));

  // معايير الأداء الوظيفي مع المؤشرات - من الصورة
  const performanceItems = {
    "المعيار الأول: أداء الواجبات الوظيفية": [
      "المؤشر الأول: الالتزام بالنظام الرسمي",
      "المؤشر الثاني: كتابة التحضير وفق الجدول الدراسي",
      "المؤشر الثالث: المشاركة في الإشراف والمناوبة وحصص الانتظار",
      "المؤشر الرابع: متابعة الواجبات والدروس والاختبارات",
      "المؤشر الخامس: المشاركة في الأنشطة اللاصفية في بيئة العمل",
      "المؤشر السادس: المشاركة في برامج النشاط المدرسي"
    ],
    "المعيار الثاني: التفاعل مع المجتمع المدرسي": [
      "المؤشر الأول: المشاركة الفاعلة في مجتمعات التعلم المهنية",
      "المؤشر الثاني: الدروس التطبيقية وتبادل الزيارات مع المدرسة (تدريس/كتدرب)",
      "المؤشر الثالث: التفاعل في الدورات والورش مع المشرف/مدير/زملاء",
      "المؤشر الرابع: بمادج الإنتاج المعرفي في التخصص"
    ],
    "المعيار الثالث: التفاعل مع الأمور": [
      "المؤشر الأول: التواصل الإيجابي مع الأباء الأمور بالتنسيق مع المرشد الطلابي",
      "المؤشر الثاني: توظيف وسائل وتطبيقات التقنية الحديثة للطلاب بشكل منتظم",
      "المؤشر الثالث: إرسال الخطة الأسبوعية في وقت مبكر",
      "المؤشر الرابع: استخدام أنماط اتصالية متنوعة"
    ],
    "المعيار الرابع: التنوع في أساليب التدريس": [
      "المؤشر الأول: استخدام استراتيجيات وطرائق التدريس",
      "المؤشر الثاني: يستخدم أساير التوجيهات لتدريس إيداعية وجاذبة للطلاب"
    ],
    "المعيار الخامس: تحسين نواتج التعلم": [
      "المؤشر الأول: تشخيص مستوى إتقان الطلبة في المادة",
      "المؤشر الثاني: معالجة الفاقد التعليمي",
      "المؤشر الثالث: وضع الخطط العلاجية لطلاب الضعاف",
      "المؤشر الرابع: وضع الخطط الإثرائية للطلاب المتميزين",
      "المؤشر الخامس: تكريم الطلاب المتميزين والذين تحسن مستواهم"
    ],
    "المعيار السادس: إعداد وتنفيذ خطة التعلم": [
      "المؤشر الأول: اكتمال الواجبات والاختبارات والإجراءات",
      "المؤشر الثاني: تنفيذ الدروس وفق الجداول"
    ],
    "المعيار السابع: توظيف تقنيات ووسائل التعلم المناسبة": [
      "المؤشر الأول: التنويع في الوسائل التعليمية",
      "المؤشر الثاني: توظيف وسائل وتطبيقات تقنية ومعلوماتية وشبكة الانترنت وصفحات الويب",
      "المؤشر الثالث: يفعل التعلم بمصادر التعلم المختلفة في المدرسة"
    ],
    "المعيار الثامن: تهيئة بيئة تعليمية": [
      "المؤشر الأول: يراعي الفروق الفردية وحاجيات الطلاب المختلفة",
      "المؤشر الثاني: يحفز الطلاب مادياً ومعنوياً",
      "المؤشر الثالث: يفعل أدوات متنوعة في الدرس (سبورة - عالية:لوحية - كتيب - دفتر - ....)"
    ],
    "المعيار التاسع: الإدارة الصفية": [
      "المؤشر الأول: يسمح لو أين بضبط سلوك الطلاب في الحصة",
      "المؤشر الثاني: أداء الطلاب في الأنشطة بشكل متعاون أو فردي",
      "المؤشر الثالث: يعطي فرص متنوعة تناسب جميع الطلاب",
      "المؤشر الرابع: يوائم بين الوقت والنشاط والخطوات الفائزي"
    ],
    "المعيار العاشر: تحليل نتائج المتعلمين وتحسين مستوياتهم": [
      "المؤشر الأول: تحليل نتائج المتعلمين بصفة مستمرة",
      "المؤشر الثاني: تصنيف الطلاب وفق تحقيقهم ومتابعة تحسينهم",
      "المؤشر الثالث: تقديم تحليل دقيق يقدم تشخيصاً لمواطن القوة والضعف",
      "المؤشر الرابع: تنويع أساليب التقويم الورقية والإلكترونية والشفوية"
    ],
    "المعيار الحادي عشر: تنويع أساليب التقويم": [
      "المؤشر الأول: تنفيذ المشروع الفردية والعمام الأدائية",
      "المؤشر الثاني: توزيع درجات المقرر وفق الدليل الإجرائي",
      "المؤشر الثالث: يفعل ملفات انجاز الطلاب",
      "المؤشر الرابع: يلتزم بتعليمات ولوائح الاختبارات والتقويم"
    ]
  };

  // الوحدات مع الدروس - Super Goal 3
  const units: {[key: string]: string[]} = {
    "Unit 1 – Lifestyles": [
      "Listen and Discuss",
      "Grammar (Simple Present / Adverbs of Frequency)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading: Do College Students Have a Healthy Lifestyle?",
      "Writing: Report about habits and pastimes",
      "Form, Meaning and Function: All / Both / Neither / None"
    ],
    "Unit 2 – Life Stories": [
      "Listen and Discuss (People in the News)",
      "Grammar (Simple Past / Used to / Be + Born / Passive Expressions)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (The Falcons)",
      "Reading: The King of Saudi Arabia",
      "Writing: Write Your Life Story",
      "Form, Meaning and Function: Used to / Passive / When Clauses"
    ],
    "Unit 3 – When Are You Traveling?": [
      "Listen and Discuss (At the Airport)",
      "Grammar (Present Progressive / Going to / Will / Infinitives of Purpose / Time Clauses)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Travel Plans)",
      "Reading: Study Arabic in Saudi Arabia",
      "Writing: Email about studying abroad",
      "Form, Meaning and Function: Time Clauses / Prepositions of Movement"
    ],
    "Unit 4 – What Do I Need to Buy?": [
      "Listen and Discuss (Food and Shopping)",
      "Grammar (Expressions of Quantity / Something – Anything – Nothing / Sequence Words / Conjunctions: so, because)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Shopping Dialogue)",
      "Reading: Foods from the Americas",
      "Writing: Favorite Recipe",
      "Form, Meaning and Function: Sequence Words / So – Because"
    ],
    "Unit 5 – Since When?": [
      "Listen and Discuss (Inventions and Technology)",
      "Grammar (Present Perfect vs. Simple Past / For and Since / How Long / Passive Forms)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Talking about inventions)",
      "Reading: A History of Special Effects",
      "Writing: Most Important Invention or Possession",
      "Form, Meaning and Function: For / Since / Present Perfect Practice"
    ],
    "Unit 6 – Do You Know Where It Is?": [
      "Listen and Discuss (Cities and Quality of Life)",
      "Grammar (Comparatives / Superlatives / as...as / Indirect Questions)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Asking for Directions)",
      "Reading: The Bride of the Red Sea",
      "Writing: Describe Your City or Neighborhood",
      "Form, Meaning and Function: Comparisons / Indirect Questions"
    ],
    "Unit 7 – It's a Good Deal, Isn't It?": [
      "Listen and Discuss (Garage Sale)",
      "Grammar (Tag Questions / Be Able To / Suggestions – Should, Can, Could, Let's)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Making a Deal)",
      "Reading: You Look Just Like Me!",
      "Writing: Advertisement for a Garage Sale",
      "Form, Meaning and Function: Tag Questions / Suggestions"
    ],
    "Unit 8 – Drive Slowly!": [
      "Listen and Discuss (Traffic and Driving Rules)",
      "Grammar (Modal Verbs: Must / Mustn't / Should / Shouldn't / Adverbs of Manner)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Giving Advice about Driving)",
      "Reading: Is Right, Right?",
      "Writing: Essay about Driving Age or Safety Rules",
      "Form, Meaning and Function: Adverbs of Manner / Modals"
    ],
    "Unit 9 – All Kinds of People": [
      "Listen and Discuss (Personalities and Traits)",
      "Grammar (Relative Pronouns: who / that / which / Past Progressive / When and While)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Describing People)",
      "Reading: Simple Ideas, Big Results",
      "Writing: Essay about a Person Who Made a Difference",
      "Form, Meaning and Function: Relative Clauses / Past Progressive"
    ],
    "Unit 10 – Who Used My Toothpaste?": [
      "Listen and Discuss (Everyday Problems and Complaints)",
      "Grammar (Present Perfect with already / yet / just / Verb + Gerund / Two-Word Verbs)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Complaints and Apologies)",
      "Reading: Complaints",
      "Writing: Impolite Behavior and Its Effects",
      "Form, Meaning and Function: Gerunds / Two-Word Verbs"
    ],
    "Unit 11 – Making Choices": [
      "Listen and Discuss (Choices and Consequences)",
      "Grammar (Conditionals / I'd Rather / Wish / So...that / Such...that)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Decision Making)",
      "Reading: The Right Choice",
      "Writing: Essay about Choices and Consequences",
      "Form, Meaning and Function: Conditionals / Expressing Preferences"
    ],
    "Unit 12 – Culture Shock": [
      "Listen and Discuss (Customs and Cultures)",
      "Grammar (Infinitives / Gerunds / It's + infinitive / Expressions of Advice / Past Perfect)",
      "Language in Context + Listening + Pronunciation",
      "Conversation (Cultural Differences)",
      "Reading: A Fish Out of Water",
      "Writing: Advice to Travelers / Fitting into a New Culture",
      "Form, Meaning and Function: Infinitives and Gerunds / Giving Advice"
    ]
  };

  const [selectedUnit, setSelectedUnit] = useState("");

  // خيارات القوائم المنسدلة
  const regions = [
    "إدارة التعليم جازان",
    "الإدارة العامة للتعليم بالمنطقة الشمالية",
    "إدارة التعليم بالرياض",
    "إدارة التعليم بمكة المكرمة",
    "إدارة التعليم بالمدينة المنورة"
  ];

  const subjects = [
    "Super Goal 1 - لغة انجليزية",
    "Super Goal 2 - لغة انجليزية",
    "Super Goal 3 - لغة انجليزية",
    "Super Goal 4 - لغة انجليزية",
    "Super Goal 5 - لغة انجليزية",
    "Super Goal 6 - لغة انجليزية"
  ];

  const stages = [
    "الأول متوسط",
    "الثاني متوسط",
    "الثالث متوسط"
  ];

  const semesters = ["أ", "ب", "ج", "د"];

  const strategies = [
    // 1. أداء الواجبات الوظيفية
    "توظيف نظام دقيق لتوثيق الجداول الزمنية للحصص والأنشطة المنفذة أسبوعيًا",
    "إعداد تقارير دورية عن تقدم تنفيذ الخطة الدراسية وربطها بالأداء التحصيلي",
    "الالتزام بتنفيذ المهام الإشرافية (مناوبة، انتظار) ضمن خطة تشغيلية موثقة",
    "استخدام سجل متابعة إلكتروني للواجبات والأنشطة الصفية واللاصفية",
    "تطبيق آلية تقييم ذاتي مستمر لأداء المعلم والطلاب داخل الفصل",
    
    // 2. إعداد وتنفيذ خطة التعلم
    "تصميم خطط تعليمية قائمة على نواتج التعلم القابلة للقياس ومراعية للفروق الفردية",
    "دمج ممارسات التعلم القائم على المشاريع (PBL) في وحدات محددة",
    "بناء خبرات تعلم تفاعلية تنطلق من واقع المتعلم وتربط المحتوى بالسياق الحياتي",
    "مراجعة الخطة بشكل دوري وتحديثها استنادًا لنتائج التقويم البنائي",
    "تقديم خطط تفصيلية توضح الربط بين الأهداف والأنشطة وأدوات التقويم",
    
    // 3. الإدارة الصفية
    "بناء منظومة سلوك إيجابي باستخدام تقنيات التعزيز المتدرج",
    "تطبيق استراتيجيات إدارة الوقت التعليمي بكفاءة (تقسيم الحصة إلى مراحل تعلم)",
    "تخصيص أدوار قيادية للطلاب لتنمية الشعور بالمسؤولية داخل الصف",
    "تفعيل النمذجة السلوكية كأسلوب تربوي لتوجيه سلوك الطلاب",
    "استخدام أدوات التتبع السلوكي ومخططات السلوك لتحليل أنماط الطلاب",
    
    // 4. التفاعل مع أولياء الأمور
    "تصميم تقارير وصفية شهرية توضح تقدم الطالب في المهارات الأكاديمية والسلوكية",
    "تفعيل قنوات الاتصال الرسمية والمنصات الرقمية لتحديث أولياء الأمور بمستجدات الطالب",
    "إشراك أولياء الأمور في وضع خطط دعم فردي للطلاب ذوي الاحتياج",
    "تقديم نشرات تربوية دورية لأولياء الأمور حول طرق دعم تعلم الأبناء منزليًا",
    "تنفيذ لقاءات استشارية مجدولة تركز على حل المشكلات التعليمية والسلوكية",
    
    // 5. التفاعل مع المجتمع المهني
    "الإسهام في تفعيل مجتمعات التعلم المهنية من خلال تقديم ورش متخصصة",
    "نشر تجارب تعليمية مميزة عبر المجلات التربوية أو المنصات المهنية",
    "إعداد دراسات حالة قصيرة حول ممارسات تدريسية ناجحة",
    "تقديم برامج تطوير مهني مصغرة للزملاء داخل المدرسة",
    "بناء شراكات مهنية مع مدارس أخرى لتبادل الزيارات الصفية والخبرات",
    
    // 6. التنويع في استراتيجيات التدريس
    "تطبيق استراتيجيات تدريس متقدمة (التعلم التكيفي، التعلم القائم على حل المشكلات)",
    "استخدام أدوات تقنية متقدمة (Nearpod، Edpuzzle، Padlet) لتعزيز التفاعل",
    "الدمج بين الاستراتيجيات البنائية والسلوكية بحسب طبيعة المحتوى",
    "تقديم محتوى متمايز وفق أنماط التعلم المتعددة (Visual, Auditory, Kinesthetic)",
    "تفعيل أركان تعلم مخصصة لتطبيق مهارات اللغة في سياقات مختلفة",
    
    // 7. تحسين نتائج المتعلمين
    "إعداد تقارير تحليلية لنتائج الطلاب وربطها بمؤشرات الأداء",
    "تنفيذ تدخلات علاجية وإثرائية تستند إلى بيانات حقيقية",
    "تفعيل برامج تعليم فردي (IEP) لطلاب الفاقد أو ذوي التحصيل المتدني",
    "تحفيز الطلاب من خلال مسارات تحدي ذات أهداف مرحلية قابلة للتحقيق",
    "استخدام جداول متابعة دقيقة تقيس التحسن النسبي لكل طالب",
    
    // 8. تحليل نتائج المتعلمين وتشخيص مستوياتهم
    "تصميم أدوات تشخيص مقننة لقياس المهارات الأساسية",
    "تحليل البيانات باستخدام الجداول البيانية ومقارنة الفترات الزمنية",
    "عقد اجتماعات تحليل نتائج تشاركية مع معلمي المواد الأخرى",
    "إعداد تقارير فردية توضح نقاط القوة والضعف لكل طالب",
    "ربط التحليل بقرارات تعليمية وتربوية قابلة للتنفيذ",
    
    // 9. تنوع أساليب التقويم
    "إعداد بنك أسئلة متنوع يراعي مستويات بلوم المعرفية",
    "تنفيذ تقويمات أدائية في مهارات اللغة (مشاريع، عروض، محادثة)",
    "استخدام تقويم رقمي تفاعلي مدعوم بمنصات (Google Forms، Socrative)",
    "توظيف استراتيجيات التقويم من أجل التعلم (Assessment for Learning)",
    "تفعيل تقييم الأقران والتقييم الذاتي بآليات موجهة",
    
    // 10. تهيئة البيئة التعليمية
    "تصميم بيئة صفية مرنة ومحفزة تضم أركان تعلم متنوعة",
    "استخدام العناصر البصرية الداعمة للتعلم (خرائط، ملصقات، نماذج)",
    "تهيئة بيئة تعلم قائمة على التعاون والحوار المفتوح",
    "دمج الوسائل الحسية والمجسمات لتيسير الفهم",
    "مراعاة العوامل النفسية والاجتماعية في تنظيم الصف",
    
    // 11. توظيف تقنيات ووسائل التعلم المناسبة
    "استخدام تقنيات الواقع المعزز والافتراضي لتوضيح المفاهيم المجردة",
    "إنتاج محتوى تعليمي رقمي مخصص (فيديوهات، شرائح تفاعلية)",
    "توظيف التطبيقات التعليمية في الواجبات والمشاريع التعاونية",
    "ربط المحتوى بالمصادر الرقمية المعتمدة (مكتبات، قنوات تعليمية)",
    "تدريب الطلاب على مهارات استخدام الأدوات الرقمية في البحث والعرض"
  ];

  const objectiveSuggestions = [
    "أن يتعرف الطالب على المفردات الجديدة في الدرس",
    "أن يستخدم الطالب القواعد اللغوية بشكل صحيح",
    "أن يطبق الطالب الاستراتيجيات المتعلمة في مواقف جديدة",
    "أن يحل الطالب المشكلات بطريقة إبداعية",
    "أن يعمل الطالب بشكل تعاوني مع زملائه",
    "أن يطور الطالب مهارات التفكير الناقد",
    "أن يتمكن الطالب من التواصل الفعال باللغة الإنجليزية",
    "أن يحلل الطالب النصوص ويفهم المعاني الضمنية",
    "أن يعبر الطالب عن أفكاره بوضوح",
    "أن يقيم الطالب عمله ذاتياً"
  ];

  const tools = [
    // 1. الأدوات التقنية
    { id: "smartBoard", label: "السبورة الذكية" },
    { id: "dataShow", label: "جهاز العرض (Data Show)" },
    { id: "laptop", label: "الحاسب الآلي المحمول" },
    { id: "tablet", label: "أجهزة لوحية تعليمية (Tablet)" },
    { id: "googleClassroom", label: "منصة Google Classroom" },
    { id: "microsoftTeams", label: "منصة Microsoft Teams" },
    { id: "googleForms", label: "Google Forms" },
    { id: "quizizz", label: "Quizizz" },
    { id: "kahoot", label: "Kahoot" },
    { id: "socrative", label: "Socrative" },
    { id: "wordwall", label: "Wordwall" },
    { id: "nearpod", label: "Nearpod" },
    { id: "edpuzzle", label: "Edpuzzle" },
    { id: "padlet", label: "Padlet" },
    
    // 2. الوسائل التعليمية التقليدية
    { id: "whiteBoard", label: "السبورة البيضاء التقليدية" },
    { id: "textbook", label: "الكتاب المدرسي" },
    { id: "teacherGuide", label: "دليل المعلم" },
    { id: "flashCards", label: "بطاقات تعليمية للأنشطة الصفية" },
    { id: "worksheets", label: "أوراق عمل متنوعة (علاجية، إثرائية، تقويمية)" },
    { id: "visualMaterials", label: "مواد توضيحية (صور، رسوم توضيحية، خرائط ذهنية)" },
    { id: "models3d", label: "مجسمات تعليمية (للمفردات، الأزمنة، القواعد)" },
    { id: "motivationalPosters", label: "لوحات إرشادية وتحفيزية داخل الفصل" },
    
    // 3. وسائل داعمة لاستراتيجيات التعلم النشط
    { id: "iceSticks", label: "أعواد المثلجات للسحب العشوائي" },
    { id: "spinnerWheel", label: "عجلة الأسماء أو الأسئلة" },
    { id: "kwlChart", label: "جداول تنظيم التفكير (KWL – Frayer Model – Venn Diagram)" },
    { id: "taskCards", label: "بطاقات المهام (Task Cards)" },
    { id: "learningCorners", label: "أركان تعليمية (ركن القراءة، ركن التقنية، ركن الكتابة)" },
    { id: "languageGames", label: "ألعاب تربوية لغوية محفزة (Word Puzzles – Sentence Builder – Flash Cards)" },
    
    // 4. وسائل العرض والتقديم
    { id: "powerpoint", label: "عروض PowerPoint احترافية" },
    { id: "educationalVideos", label: "فيديوهات تعليمية مصممة أو مختارة بعناية" },
    { id: "audioClips", label: "مقاطع صوتية لدروس الاستماع" },
    { id: "infographics", label: "استخدام الرموز التوضيحية والرسومات الذهنية" },
    { id: "digitalStories", label: "قصص رقمية أو رسوم متحركة تعليمية" },
    
    // 5. بيئة الصف
    { id: "flexibleSeating", label: "ترتيب مرن للمقاعد حسب نوع النشاط (مجموعات، دوائر، نصف دائرة)" },
    { id: "classLibrary", label: "مكتبة صفية مصغّرة" },
    { id: "interactiveWalls", label: "لوحات حائط تفاعلية" },
    { id: "visualSupports", label: "وسائل دعم بصرية لتعزيز المفردات والقواعد" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }));
      setFormData({
        ...formData,
        uploadedFiles: [...formData.uploadedFiles, ...newFiles]
      });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    setFormData({ ...formData, uploadedFiles: newFiles });
  };

  const handleCheckboxChange = (field: 'tools' | 'objectives', value: string) => {
    const current = formData[field];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(item => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const toggleObjective = (objective: string) => {
    if (formData.objectives.includes(objective)) {
      setFormData({
        ...formData,
        objectives: formData.objectives.filter(obj => obj !== objective)
      });
    } else {
      setFormData({
        ...formData,
        objectives: [...formData.objectives, objective]
      });
    }
  };

  const Report = () => (
    <div id="report-content" className="sheet bg-white border-4 border-gray-300" style={{ fontFamily: "'Helvetica Neue W23', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div className="text-white px-4 sm:px-8 py-4 sm:py-6 print-header" style={{ backgroundColor: '#15445A' }}>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="bg-[#1a4d5e] rounded-lg flex items-center justify-center p-2" style={{ minWidth: '64px', minHeight: '64px' }}>
            {logoImage ? (
              <img src={logoImage} alt="وزارة التعليم" className="object-contain" style={{ maxWidth: '120px', maxHeight: '100px' }} />
            ) : (
              <div className="text-white text-xs text-center">ضع الشعار</div>
            )}
          </div>
          <div className="text-center leading-tight">
            <div className="text-sm sm:text-base font-bold">المملكة العربية السعودية</div>
            <div className="text-sm sm:text-base font-bold mt-1">وزارة التعليم</div>
            <div className="text-sm sm:text-base font-bold">الإدارة العامة للتعليم بمنطقة جازان</div>
          </div>
        </div>
      </div>

      {/* اسم المدرسة - ملاصق للهيدر */}
      <div className="text-center text-white py-2 px-4 sm:px-6" style={{ backgroundColor: '#15445A' }}>
        <h1 className="text-xl sm:text-2xl font-bold">{formData.schoolName}</h1>
      </div>

      {/* محتوى التقرير */}
      <div className="p-8">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border-2 border-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-700 font-semibold mb-1">الاستراتيجية:</div>
          <div className="text-gray-900">{formData.strategy}</div>
        </div>
        <div className="border-2 border-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-700 font-semibold mb-1">المادة:</div>
          <div className="text-gray-900">{formData.subject}</div>
        </div>
        <div className="border-2 border-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-700 font-semibold mb-1">تاريخ التنفيذ:</div>
          <div className="text-gray-900">{formData.year}/{formData.month}/{formData.day}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border-2 border-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-700 font-semibold mb-1">عدد الطلاب:</div>
          <div className="text-gray-900">{formData.students} طالب</div>
        </div>
        <div className="border-2 border-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-700 font-semibold mb-1">المرحلة الدراسية:</div>
          <div className="text-gray-900">{formData.stage}</div>
        </div>
        <div className="border-2 border-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-700 font-semibold mb-1">الفصل:</div>
          <div className="text-gray-900">{formData.semester}</div>
        </div>
      </div>
      {formData.performanceItem && formData.performanceElement && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-gray-800 rounded-lg p-3">
            <div className="text-sm text-gray-700 font-semibold mb-1">البند:</div>
            <div className="text-gray-900 text-sm">{formData.performanceItem}</div>
          </div>
          <div className="border-2 border-gray-800 rounded-lg p-3">
            <div className="text-sm text-gray-700 font-semibold mb-1">العنصر:</div>
            <div className="text-gray-900 text-sm">{formData.performanceElement}</div>
          </div>
        </div>
      )}
      {formData.unit && (
        <div className="border-2 border-gray-800 rounded-lg p-3 mb-6">
          <div className="text-sm text-gray-700 font-semibold mb-1">الوحدة:</div>
          <div className="text-gray-900">{formData.unit}</div>
        </div>
      )}
      {formData.lesson && (
        <div className="border-2 border-gray-800 rounded-lg p-3 mb-6">
          <div className="text-sm text-gray-700 font-semibold mb-1">الدرس:</div>
          <div className="text-gray-900">{formData.lesson}</div>
        </div>
      )}
      {(formData.tools.length > 0 || formData.objectives.length > 0) && (
        <div className="grid grid-cols-2 gap-6 mb-6">
          {formData.tools.length > 0 && (
            <div className="border-2 border-gray-800 rounded-lg p-4">
              <h3 className="text-gray-700 font-bold mb-3 pb-2 border-b-2 border-gray-300">الأدوات والوسائل التعليمية:</h3>
              <div className="space-y-2">
                {formData.tools.map((toolId, index) => {
                  const tool = tools.find(t => t.id === toolId);
                  return tool ? (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-4 h-4 mt-0.5 border-2 bg-gray-800 border-gray-800 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{tool.label}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
          {formData.objectives.length > 0 && (
            <div className="border-2 border-gray-800 rounded-lg p-4">
              <h3 className="text-gray-700 font-bold mb-3 pb-2 border-b-2 border-gray-300">الأهداف:</h3>
              <div className="space-y-2">
                {formData.objectives.map((obj, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-4 h-4 mt-0.5 border-2 bg-gray-800 border-gray-800 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {formData.uploadedFiles.length > 0 && (
        <div className="border-2 border-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-gray-700 font-bold mb-3 pb-2 border-b-2 border-gray-300">الشواهد:</h3>
          <div className="grid grid-cols-2 gap-3">
            {formData.uploadedFiles.map((file, index) => (
              <div key={index} className="border-2 border-black rounded-lg overflow-hidden">
                {file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <div className="relative">
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-2 py-1">
                      <p className="text-xs truncate">{file.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50">
                    <svg className="w-8 h-8 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">ملف مرفق</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer - Signatures */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 mt-4 sm:mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-200">
          <div className="text-right">
            <p className="text-gray-600 font-semibold mb-0.5 text-sm">المعلم</p>
            <p className="text-sm sm:text-base font-bold text-gray-800">{formData.teacherName}</p>
            {signatureImage && (
              <img 
                src={signatureImage} 
                alt="توقيع"
                className="h-20 object-contain ml-0 mt-1"
              />
            )}
          </div>
          
          {/* الباركود في المنتصف */}
          <div className="flex items-center justify-center">
            {barcodeImage && (
              <button
                onClick={() => setShowBarcodeModal(true)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                title="اضغط لتكبير الباركود"
              >
                <img src={barcodeImage} alt="باركود" className="w-32 h-32 object-contain" />
              </button>
            )}
          </div>
          
          <div className="text-left">
            <p className="text-gray-600 font-semibold mb-0.5 text-sm">مدير المدرسة</p>
            <p className="text-sm sm:text-base font-bold text-gray-800">{formData.principalName}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );

  const criteria = [
    { id: 1, title: "أداء الواجبات الوظيفية", icon: "📋" },
    { id: 2, title: "التفاعل مع المجتمع المهني", icon: "👥" },
    { id: 3, title: "التفاعل مع أولياء الأمور", icon: "👨‍👩‍👧‍👦" },
    { id: 4, title: "التنويع في استراتيجيات التدريس", icon: "🎓" },
    { id: 5, title: "تحسين نتائج المتعلمين", icon: "📈" },
    { id: 6, title: "إعداد وتنفيذ خطة التعلم", icon: "📅" },
    { id: 7, title: "توظيف تقنيات ووسائل التعلم", icon: "💻" },
    { id: 8, title: "تهيئة البيئة التعليمية", icon: "🏫" },
    { id: 9, title: "الإدارة الصفية", icon: "🎯" },
    { id: 10, title: "تحليل نتائج المتعلمين", icon: "📊" },
    { id: 11, title: "تنوع أساليب التقويم", icon: "✍️" }
  ];

  const currentCriteria = criteriaId ? criteria.find(c => c.id === parseInt(criteriaId)) : null;

  return (
    <div className="p-6 sm:p-8">
      {!showPreview ? (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">مولد التقارير الرسمية</h2>
            <p className="text-gray-600 dark:text-gray-400">إنشاء تقارير بتصميم وزارة التعليم الرسمي</p>
          </div>

          {/* عرض البند الحالي */}
          {currentCriteria && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{currentCriteria.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm opacity-90">البند {currentCriteria.id}</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                        تقرير جديد
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold">{currentCriteria.title}</h2>
                    <p className="text-sm text-purple-100 mt-1">
                      إنشاء تقرير رسمي لإضافته إلى ملف الإنجاز
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/portfolio/manage"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm border border-white/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  رجوع لملف الإنجاز
                </Link>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* معلومات المدرسة */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">معلومات المدرسة والمنطقة</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الإدارة / المنطقة:</label>
                  <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم المدرسة:</label>
                  <input type="text" value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">تاريخ التنفيذ (هجري):</label>
                  <div className="grid grid-cols-3 gap-3">
                    <select value={formData.day} onChange={(e) => setFormData({ ...formData, day: e.target.value })} className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">اليوم</option>
                      {hijriDays.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">الشهر</option>
                      {hijriMonths.map((month) => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                    <select value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">السنة</option>
                      {hijriYears.map((year) => (
                        <option key={year} value={year}>{year} هـ</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* تفاصيل التقرير */}
            <div className="bg-white dark:bg-slate-700/50 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">تفاصيل التقرير</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المادة:</label>
                  <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المرحلة الدراسية:</label>
                  <select value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الفصل:</label>
                  <select value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {semesters.map((semester) => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المعيار:</label>
                  <select 
                    value={formData.performanceItem} 
                    onChange={(e) => setFormData({ ...formData, performanceItem: e.target.value, performanceElement: '' })} 
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر المعيار...</option>
                    {Object.keys(performanceItems).map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المؤشر:</label>
                  <select 
                    value={formData.performanceElement} 
                    onChange={(e) => setFormData({ ...formData, performanceElement: e.target.value })} 
                    disabled={!formData.performanceItem}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">اختر المؤشر...</option>
                    {formData.performanceItem && performanceItems[formData.performanceItem as keyof typeof performanceItems]?.map((element) => (
                      <option key={element} value={element}>{element}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">عدد الطلاب:</label>
                  <select value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {studentCounts.map((count) => (
                      <option key={count} value={count}>{count} طالب</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الاستراتيجية:</label>
                  <select value={formData.strategy} onChange={(e) => setFormData({ ...formData, strategy: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {strategies.map((strategy) => (
                      <option key={strategy} value={strategy}>{strategy}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الوحدة:</label>
                  <select 
                    value={formData.unit} 
                    onChange={(e) => {
                      setFormData({ ...formData, unit: e.target.value, lesson: '' });
                      setSelectedUnit(e.target.value);
                    }} 
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر الوحدة...</option>
                    {Object.keys(units).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الدرس:</label>
                  <select 
                    value={formData.lesson} 
                    onChange={(e) => setFormData({ ...formData, lesson: e.target.value })}
                    disabled={!formData.unit}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">اختر الدرس...</option>
                    {formData.unit && units[formData.unit]?.map((lesson) => (
                      <option key={lesson} value={lesson}>{lesson}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* الأدوات والأهداف */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-700/50 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                  <span>الأدوات والوسائل التعليمية</span>
                  <span className="text-xs text-gray-500 font-normal">({formData.tools.length} محدد)</span>
                </h3>
                <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-2">
                  {tools.map(tool => (
                    <label key={tool.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
                      <input type="checkbox" checked={formData.tools.includes(tool.id)} onChange={() => handleCheckboxChange('tools', tool.id)} className="w-4 h-4 text-teal-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 flex-shrink-0"/>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{tool.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700/50 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                  <span>الأهداف</span>
                  <span className="text-xs text-gray-500 font-normal">({formData.objectives.length} محدد)</span>
                </h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {objectiveSuggestions.map((objective, index) => (
                    <label key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                      <input type="checkbox" checked={formData.objectives.includes(objective)} onChange={() => toggleObjective(objective)} className="w-5 h-5 mt-0.5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"/>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{objective}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* الشواهد - الصور فقط */}
            <div className="bg-white dark:bg-slate-700/50 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">الشواهد (الصور والملفات)</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">رفع الصور والملفات:</label>
                <input type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"/>
                
                {formData.uploadedFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        {file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                            <img 
                              src={file.url} 
                              alt={file.name}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white px-2 py-2">
                              <p className="text-xs truncate">{file.name}</p>
                            </div>
                            <button 
                              onClick={() => removeFile(index)} 
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div className="relative bg-gray-100 dark:bg-slate-700 rounded-lg p-3 flex items-center gap-2 border-2 border-gray-200 dark:border-gray-600">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-gray-700 dark:text-gray-300 truncate flex-1">{file.name}</span>
                            <button 
                              onClick={() => removeFile(index)} 
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* معلومات المعلم والمدير */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">معلومات التوقيع</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم المعلم:</label>
                  <input type="text" value={formData.teacherName} onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">مدير المدرسة:</label>
                  <input type="text" value={formData.principalName} onChange={(e) => setFormData({ ...formData, principalName: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
                </div>
              </div>
            </div>

            {/* رفع الشعار والتوقيع */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">الشعار والتوقيع</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">شعار وزارة التعليم:</label>
                  <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center">
                    {logoImage ? (
                      <div className="relative">
                        <img src={logoImage} alt="الشعار" className="max-w-full h-auto object-contain mx-auto" style={{maxHeight: '200px'}} />
                        <button
                          onClick={() => setLogoImage("")}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          حذف الصورة
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <div className="text-blue-600 dark:text-blue-400">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="font-semibold">انقر لرفع صورة الشعار</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">توقيع المعلم:</label>
                  <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center">
                    {signatureImage ? (
                      <div className="relative">
                        <img src={signatureImage} alt="التوقيع" className="max-h-24 mx-auto object-contain" />
                        <button
                          onClick={() => setSignatureImage("")}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          حذف الصورة
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureUpload}
                          className="hidden"
                        />
                        <div className="text-blue-600 dark:text-blue-400">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          <p className="font-semibold">انقر لرفع صورة التوقيع</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
              
              {/* مربع رفع الباركود */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">باركود التقرير (اختياري):</label>
                <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center max-w-xs mx-auto">
                  {barcodeImage ? (
                    <div className="relative">
                      <img src={barcodeImage} alt="الباركود" className="w-32 h-32 mx-auto object-contain" />
                      <button
                        onClick={() => setBarcodeImage("")}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        حذف الباركود
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBarcodeUpload}
                        className="hidden"
                      />
                      <div className="text-blue-600 dark:text-blue-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <p className="font-semibold">انقر لرفع صورة الباركود</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button onClick={saveReport} className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              حفظ التقرير
            </button>
            <button onClick={() => setShowPreview(true)} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              معاينة التقرير
            </button>
            <button 
              onClick={handlePrint}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              طباعة مباشرة
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Modal للباركود */}
          {showBarcodeModal && barcodeImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={() => setShowBarcodeModal(false)}
            >
              <div className="bg-white rounded-2xl p-6 max-w-2xl w-full relative">
                <button
                  onClick={() => setShowBarcodeModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">الباركود</h3>
                <div className="flex justify-center">
                  <img src={barcodeImage} alt="باركود" className="max-w-full max-h-96 object-contain" />
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">يمكنك مسح الباركود ضوئياً للوصول للمعلومات</p>
              </div>
            </div>
          )}
          
          <style jsx global>{`
            @media print {
              /* إخفاء كل شيء ماعدا التقرير */
              body * {
                visibility: hidden;
              }
              
              /* إظهار التقرير وجميع محتوياته */
              #report-content,
              #report-content * {
                visibility: visible !important;
              }
              
              /* تنسيق الصفحة - ملء كامل بدون هوامش */
              @page {
                size: A4 portrait;
                margin: 0;
              }
              
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
              }
              
              /* التقرير يملأ الصفحة بالكامل */
              #report-content {
                position: absolute !important;
                left: 0 !important;
                right: 0 !important;
                top: 0 !important;
                bottom: 0 !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                box-shadow: none !important;
                border-width: 0 !important;
                border-radius: 0 !important;
              }
              
              #report-content.sheet {
                border: none !important;
              }
              
              /* إخفاء عناصر التحكم */
              .no-print {
                display: none !important;
                visibility: hidden !important;
              }
              
              /* ضمان طباعة الألوان */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              /* تنسيق الهيدر - مطابق للمعاينة */
              .print-header {
                background-color: #15445A !important;
                border-radius: 0 !important;
                page-break-after: avoid !important;
                padding: 1rem 1.5rem !important;
              }
              
              /* تنسيق قسم اسم المدرسة - مطابق للمعاينة */
              #report-content > div:nth-child(2) {
                background-color: #15445A !important;
                padding: 0.5rem 1.5rem !important;
              }
              
              /* تنسيق محتوى التقرير - مع هوامش داخلية مناسبة */
              #report-content > div:nth-child(3) {
                padding: 1.5rem !important;
              }
              
              /* تنسيق الشبكات (Grid) - مطابق للمعاينة */
              .grid {
                display: grid !important;
                gap: 1rem !important;
              }
              
              .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
              
              .grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              }
              
              /* تنسيق الحدود والصناديق */
              .border-2 {
                border-width: 2px !important;
              }
              
              .border-gray-800 {
                border-color: #1f2937 !important;
              }
              
              .border-black {
                border-color: #000000 !important;
              }
              
              .rounded-lg {
                border-radius: 8px !important;
              }
              
              /* تنسيق النصوص */
              .text-sm {
                font-size: 12px !important;
                line-height: 1.4 !important;
              }
              
              /* تنسيق النصوص - مطابق للمعاينة */
              .text-sm {
                font-size: 0.875rem !important;
                line-height: 1.25rem !important;
              }
              
              .text-base {
                font-size: 1rem !important;
                line-height: 1.5rem !important;
              }
              
              .text-xl {
                font-size: 1.25rem !important;
                line-height: 1.75rem !important;
              }
              
              .text-2xl {
                font-size: 1.5rem !important;
                line-height: 2rem !important;
              }
              
              .text-gray-700 {
                color: #374151 !important;
              }
              
              .text-gray-900 {
                color: #111827 !important;
              }
              
              .text-white {
                color: #ffffff !important;
              }
              
              /* تنسيق الصور - مطابق للمعاينة */
              img {
                max-width: 100% !important;
                height: auto !important;
                page-break-inside: avoid !important;
              }
              
              /* تنسيق صور الشواهد - مطابق للمعاينة */
              .h-48 {
                height: 12rem !important;
              }
              
              /* تنسيق الأيقونات - مطابق للمعاينة */
              .w-32 {
                width: 8rem !important;
              }
              
              .h-32 {
                height: 8rem !important;
              }
              
              .h-20 {
                height: 5rem !important;
              }
              
              /* المسافات - مطابقة للمعاينة */
              .gap-3 {
                gap: 0.75rem !important;
              }
              
              .gap-4 {
                gap: 1rem !important;
              }
              
              .gap-6 {
                gap: 1.5rem !important;
              }
              
              .mb-6 {
                margin-bottom: 1.5rem !important;
              }
              
              .p-3 {
                padding: 0.75rem !important;
              }
              
              .p-4 {
                padding: 1rem !important;
              }
              
              .p-8 {
                padding: 2rem !important;
              }
              
              /* منع تقطيع العناصر */
              .border-2, 
              .rounded-lg,
              .grid > div {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
              
              /* تنسيق Footer */
              .grid-cols-1.sm\\:grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              }
              
              /* إزالة الظلال والتأثيرات */
              * {
                box-shadow: none !important;
                text-shadow: none !important;
              }
              
              /* طباعة الخلفيات */
              div[style*="backgroundColor"] {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
            
            /* طباعة من الهاتف - بدون هوامش */
            @media print and (max-width: 600px) {
              @page {
                margin: 0;
              }
              
              html, body {
                margin: 0 !important;
                padding: 0 !important;
              }
              
              #report-content {
                position: absolute !important;
                left: 0 !important;
                right: 0 !important;
                top: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              
              .print-header {
                padding: 0.75rem 1rem !important;
              }
              
              #report-content > div:nth-child(2) {
                padding: 0.5rem 1rem !important;
              }
              
              #report-content > div:nth-child(3) {
                padding: 1rem !important;
              }
              
              .text-sm {
                font-size: 0.75rem !important;
              }
              
              .gap-4 {
                gap: 0.625rem !important;
              }
              
              .p-3 {
                padding: 0.625rem !important;
              }
              
              .p-4 {
                padding: 0.75rem !important;
              }
            }
          `}</style>
          <div className="flex items-center justify-between mb-6 no-print">
            <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              العودة للتعديل
            </button>
            <button onClick={() => window.print()} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              طباعة / حفظ PDF
            </button>
          </div>
          <Report />
        </div>
      )}
    </div>
  );
}

type PerformanceImageKey = "img1" | "img2" | "img3" | "img4";

function PerformanceReportGenerator() {
  const [selectedReport, setSelectedReport] = useState<number>(1);
  const [showPreview, setShowPreview] = useState(false);
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    teacherName: "عبدالله حسن الفيفي",
    principalName: "احمد علي كريري",
    schoolName: "مدرسة ابن سيناء المتوسطة وبرنامجي العوق الفكري والتوحد",
    academicYear: "1447",
    reportItem: "",
    performanceElement: "",
    programName: "",
    implementationDate: "",
    programObjectives: "",
    targetAudience: ""
  });
  const [images, setImages] = useState<Record<PerformanceImageKey, string>>({
    img1: "",
    img2: "",
    img3: "",
    img4: ""
  });
  const [logoImage, setLogoImage] = useState<string>("");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  useEffect(() => {
    if (showPreview) {
      reportContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showPreview]);

  // تغيير عنوان الصفحة عند المعاينة
  useEffect(() => {
    if (showPreview && selectedReport) {
      const originalTitle = document.title;
      const reportName = reports.find(r => r.id === selectedReport)?.name || "تقرير الأداء الوظيفي";
      document.title = `${reportName} - ${formData.schoolName}`;
      return () => {
        document.title = originalTitle;
      };
    }
  }, [showPreview, selectedReport]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, key: PerformanceImageKey) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({ ...prev, [key]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBarcodeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBarcodeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const reports = [
    { id: 1, name: "أداء الواجبات الوظيفية", icon: "📋" },
    { id: 2, name: "التفاعل مع المجتمع المهني", icon: "�" },
    { id: 3, name: "التفاعل مع أولياء الأمور", icon: "�‍👩‍👧‍👦" },
    { id: 4, name: "التنويع في استراتيجيات التدريس", icon: "🎓" },
    { id: 5, name: "تحسين نتائج المتعلمين", icon: "�" },
    { id: 6, name: "إعداد وتنفيذ خطة التعلم", icon: "�" },
    { id: 7, name: "توظيف تقنيات ووسائل التعلم", icon: "�" },
    { id: 8, name: "تهيئة البيئة التعليمية", icon: "🏫" },
    { id: 9, name: "الإدارة الصفية", icon: "🎯" },
    { id: 10, name: "تحليل نتائج المتعلمين", icon: "�" },
    { id: 11, name: "تنوع أساليب التقويم", icon: "✍️" }
  ];

  const clearImage = (key: PerformanceImageKey) => {
    setImages(prev => ({ ...prev, [key]: "" }));
  };

  // تعريف البيانات لكل تقرير
  const reportConfigs: Record<number, {
    title: string;
    witnesses: Array<{
      id: number;
      title: string;
      wrapperClass: string;
      badgeClass: string;
      borderAccent: string;
      placeholder: string;
      imageKey: PerformanceImageKey;
    }>;
    imageFields: Array<{
      key: PerformanceImageKey;
      label: string;
      hint: string;
    }>;
  }> = {
    1: {
      title: "شواهد أداء الواجبات الوظيفية",
      witnesses: [
        {
          id: 1,
          title: "التقيد بالدوام الرسمي",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من سجل الدوام",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "تأدية الحصص الدراسية وفق الجدول",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من المناوبة والإشراف",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "المشاركة في الإشراف والمناوبة",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من سجل الانتظار",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "إعداد ومتابعة الدروس والواجبات",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من خطة توزيع المنهج",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. صورة من سجل الدوام", hint: "صورة من سجل الدوام" },
        { key: "img2", label: "2. صورة من المناوبة والإشراف", hint: "صورة من المناوبة والإشراف" },
        { key: "img3", label: "3. صورة من سجل الانتظار", hint: "صورة من سجل الانتظار" },
        { key: "img4", label: "4. صورة من خطة توزيع المنهج", hint: "صورة من خطة توزيع المنهج" }
      ]
    },
    2: {
      title: "التفاعل مع المجتمع المهني",
      witnesses: [
        {
          id: 1,
          title: "المشاركة الفاعلة في مجتمعات التعلم المهنية",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من سجل مجتمعات التعلم المهنية",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "تبادل الزيارات والدروس التطبيقية",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "سجل تبادل الزيارات",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "بحث الدرس",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "تقرير تنفيذ درس تطبيقي",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "حضور الدورات والورش التدريبية",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "شهادات حضور الدورات والورش",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. صورة من سجل مجتمعات التعلم", hint: "صورة من سجل مجتمعات التعلم المهنية" },
        { key: "img2", label: "2. سجل تبادل الزيارات", hint: "سجل تبادل الزيارات" },
        { key: "img3", label: "3. تقرير تنفيذ درس تطبيقي", hint: "تقرير تنفيذ درس تطبيقي" },
        { key: "img4", label: "4. شهادات حضور الدورات", hint: "شهادات حضور الدورات والورش التدريبية" }
      ]
    },
    3: {
      title: "التفاعل مع أولياء الأمور",
      witnesses: [
        {
          id: 1,
          title: "التواصل الفعال والجمعية العمومية",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صور من الجمعية العمومية",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "اجتماعات أولياء الأمور",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "تقرير اجتماع ولي الأمر مع المعلم",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "الخطة الأسبوعية للمدرسة",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نسخة من الخطة الأسبوعية",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "تزويد أولياء الأمور بمستويات الطلاب",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نسخة من الخطة الأسبوعية",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. صور من الجمعية العمومية", hint: "صور من الجمعية العمومية لأولياء الأمور" },
        { key: "img2", label: "2. تقرير اجتماع ولي الأمر", hint: "تقرير اجتماع ولي الأمر مع المعلم" },
        { key: "img3", label: "3. الخطة الأسبوعية", hint: "نسخة من الخطة الأسبوعية للمدرسة" },
        { key: "img4", label: "4. الخطة الأسبوعية", hint: "نسخة من الخطة الأسبوعية للمدرسة" }
      ]
    },
    4: {
      title: "التنويع في استراتيجيات التدريس",
      witnesses: [
        {
          id: 1,
          title: "استخدام استراتيجيات متنوعة",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "تقرير عن تطبيق استراتيجية",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "مراعاة الفروق الفردية",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من ملف إنجاز المعلم",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "ملف إنجاز المعلم",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من ملف إنجاز المعلم",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "توثيق الممارسات التدريسية",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من ملف إنجاز المعلم",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. تقرير تطبيق استراتيجية", hint: "تقرير عن تطبيق استراتيجية" },
        { key: "img2", label: "2. ملف إنجاز المعلم", hint: "صورة من ملف إنجاز المعلم" },
        { key: "img3", label: "3. ملف إنجاز المعلم", hint: "صورة من ملف إنجاز المعلم" },
        { key: "img4", label: "4. ملف إنجاز المعلم", hint: "صورة من ملف إنجاز المعلم" }
      ]
    },
    5: {
      title: "تحسين نتائج المتعلمين",
      witnesses: [
        {
          id: 1,
          title: "معالجة الفاقد التعليمي",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من نتائج الاختبار القبلي",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "وضع الخطط العلاجية والإثرائية",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من نتائج الاختبار البعدي",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "تكريم الطلاب المتميزين",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من كشف متابعة الطلاب",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "متابعة تحسن مستوى الطلاب",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من كشف متابعة الطلاب",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. نتائج الاختبار القبلي", hint: "صورة من نتائج الاختبار القبلي" },
        { key: "img2", label: "2. نتائج الاختبار البعدي", hint: "صورة من نتائج الاختبار البعدي" },
        { key: "img3", label: "3. كشف متابعة الطلاب", hint: "صورة من كشف متابعة الطلاب" },
        { key: "img4", label: "4. كشف متابعة الطلاب", hint: "صورة من كشف متابعة الطلاب" }
      ]
    },
    6: {
      title: "إعداد وتنفيذ خطة التعلم",
      witnesses: [
        {
          id: 1,
          title: "توزيع المنهج وإعداد الدروس",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من خطة توزيع المنهج",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "إعداد الدروس",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نموذج من إعداد الدروس",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "إعداد الواجبات",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من الواجبات",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "إعداد الاختبارات",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من الاختبارات",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. خطة توزيع المنهج", hint: "صورة من خطة توزيع المنهج" },
        { key: "img2", label: "2. نموذج إعداد الدروس", hint: "نموذج من إعداد الدروس" },
        { key: "img3", label: "3. نماذج الواجبات", hint: "نماذج من الواجبات" },
        { key: "img4", label: "4. نماذج الاختبارات", hint: "نماذج من الاختبارات" }
      ]
    },
    7: {
      title: "توظيف تقنيات ووسائل التعلم المناسبة",
      witnesses: [
        {
          id: 1,
          title: "دمج التقنية في التعليم",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صور من الوسائل التعليمية",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "التنويع في الوسائل التعليمية",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صور من الوسائل التعليمية",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "استخدام البرامج التقنية",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة عن برنامج تقني",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "توظيف التطبيقات التعليمية",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة عن برنامج تقني",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. الوسائل التعليمية", hint: "صور من الوسائل التعليمية المستخدمة" },
        { key: "img2", label: "2. الوسائل التعليمية", hint: "صور من الوسائل التعليمية المستخدمة" },
        { key: "img3", label: "3. برنامج تقني", hint: "صورة عن برنامج تقني تم استخدامه" },
        { key: "img4", label: "4. برنامج تقني", hint: "صورة عن برنامج تقني تم استخدامه" }
      ]
    },
    8: {
      title: "تهيئة البيئة التعليمية",
      witnesses: [
        {
          id: 1,
          title: "مراعاة حاجات الطلاب",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "تقرير تصنيف الطلاب وفق أنماط التعلم",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "التهيئة النفسية للطلاب",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "تقرير تصنيف الطلاب وفق أنماط التعلم",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "التحفيز المادي",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من التحفيز المادي",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "التحفيز المعنوي",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من التحفيز المعنوي",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. تصنيف أنماط التعلم", hint: "تقرير تصنيف الطلاب وفق أنماط التعلم" },
        { key: "img2", label: "2. تصنيف أنماط التعلم", hint: "تقرير تصنيف الطلاب وفق أنماط التعلم" },
        { key: "img3", label: "3. التحفيز المادي", hint: "نماذج من التحفيز المادي" },
        { key: "img4", label: "4. التحفيز المعنوي", hint: "نماذج من التحفيز المعنوي" }
      ]
    },
    9: {
      title: "الإدارة الصفية",
      witnesses: [
        {
          id: 1,
          title: "ضبط سلوك الطلاب",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من كشف المتابعة",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "متابعة الحضور والغياب",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من كشف المتابعة",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "تطبيق إدارة الصف",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من تطبيق إدارة الصف",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "مراعاة الفروق الفردية",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من تطبيق إدارة الصف",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. كشف المتابعة", hint: "صورة من كشف المتابعة" },
        { key: "img2", label: "2. كشف المتابعة", hint: "صورة من كشف المتابعة" },
        { key: "img3", label: "3. تطبيق إدارة الصف", hint: "صورة من تطبيق إدارة الصف" },
        { key: "img4", label: "4. تطبيق إدارة الصف", hint: "صورة من تطبيق إدارة الصف" }
      ]
    },
    10: {
      title: "تحليل نتائج المتعلمين وتشخيص مستوياتهم",
      witnesses: [
        {
          id: 1,
          title: "تحليل نتائج الاختبارات",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من تقرير تحليل النتائج",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "تصنيف الطلاب وفق نتائجهم",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من تقرير تحليل النتائج",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "معالجة الفاقد التعليمي",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من سجل معالجة الفاقد",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "تحديد نقاط القوة والضعف",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "صورة من سجل معالجة الفاقد",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. تقرير تحليل النتائج", hint: "صورة من تقرير تحليل نتائج الطلاب" },
        { key: "img2", label: "2. تقرير تحليل النتائج", hint: "صورة من تقرير تحليل نتائج الطلاب" },
        { key: "img3", label: "3. سجل معالجة الفاقد", hint: "صورة من سجل معالجة الفاقد التعليمي" },
        { key: "img4", label: "4. سجل معالجة الفاقد", hint: "صورة من سجل معالجة الفاقد التعليمي" }
      ]
    },
    11: {
      title: "تنوع أساليب التقويم",
      witnesses: [
        {
          id: 1,
          title: "الاختبارات الورقية والإلكترونية",
          wrapperClass: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من الاختبارات",
          imageKey: "img1"
        },
        {
          id: 2,
          title: "ملفات إنجاز الطلاب",
          wrapperClass: "border-2 border-green-200 rounded-xl p-6 bg-green-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من ملفات إنجاز الطلاب",
          imageKey: "img2"
        },
        {
          id: 3,
          title: "المهام الأدائية",
          wrapperClass: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من المهام الأدائية",
          imageKey: "img3"
        },
        {
          id: 4,
          title: "المشاريع الطلابية",
          wrapperClass: "border-2 border-purple-200 rounded-xl p-6 bg-purple-50/50",
          badgeClass: "w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0",
          borderAccent: "border-black",
          placeholder: "نماذج من مشاريع الطلاب",
          imageKey: "img4"
        }
      ],
      imageFields: [
        { key: "img1", label: "1. نماذج الاختبارات", hint: "نماذج من الاختبارات" },
        { key: "img2", label: "2. ملفات إنجاز الطلاب", hint: "نماذج من ملفات إنجاز الطلاب" },
        { key: "img3", label: "3. المهام الأدائية", hint: "نماذج من المهام الأدائية" },
        { key: "img4", label: "4. مشاريع الطلاب", hint: "نماذج من مشاريع الطلاب" }
      ]
    }
  };

  const currentConfig = reportConfigs[selectedReport];
  const imageFields = currentConfig?.imageFields || [];

  const PerformanceReport = () => {
    const config = reportConfigs[selectedReport];
    if (!config) return null;

    const witnessCards = config.witnesses.map(w => ({
      ...w,
      image: images[w.imageKey]
    }));

    return (
      <div id="report-content" className="sheet bg-white border-4 border-gray-300" style={{ fontFamily: "'Helvetica Neue W23', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        <div className="text-white px-8 py-6 print-header" style={{ backgroundColor: '#15445A' }}>
          <div className="flex items-center justify-center gap-4">
            {/* الشعار في المنتصف يمين */}
            <div className="bg-[#1a4d5e] rounded-lg flex items-center justify-center p-2" style={{ minWidth: '64px', minHeight: '64px' }}>
              {logoImage ? (
                <img src={logoImage} alt="وزارة التعليم" className="object-contain" style={{ maxWidth: '120px', maxHeight: '100px' }} />
              ) : (
                <div className="text-white text-xs text-center">ضع الشعار</div>
              )}
            </div>
            
            {/* النص في المنتصف يسار */}
            <div className="text-center leading-tight">
              <div className="text-base font-bold">المملكة العربية السعودية</div>
              <div className="text-base font-bold">وزارة التعليم</div>
              <div className="text-xs opacity-90">إدارة تعليم جازان</div>
            </div>
          </div>
        </div>

        {/* اسم المدرسة - ملاصق للهيدر */}
        <div className="text-center text-white py-2 px-6" style={{ backgroundColor: '#15445A' }}>
          <h1 className="text-2xl font-bold">{formData.schoolName}</h1>
        </div>

        <div className="p-8 space-y-10">

          {/* Program Information Section */}
          {(formData.reportItem || formData.programName || formData.implementationDate || formData.targetAudience || formData.programObjectives) && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>بيانات البرنامج</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {formData.reportItem && (
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">البند</p>
                    <p className="text-gray-800 font-bold">{formData.reportItem}</p>
                  </div>
                )}
                {formData.performanceElement && (
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">العنصر</p>
                    <p className="text-gray-800 font-bold">{formData.performanceElement}</p>
                  </div>
                )}
                {formData.programName && (
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">اسم البرنامج</p>
                    <p className="text-gray-800 font-bold">{formData.programName}</p>
                  </div>
                )}
                {formData.implementationDate && (
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">تاريخ التنفيذ</p>
                    <p className="text-gray-800 font-bold">{formData.implementationDate}</p>
                  </div>
                )}
                {formData.targetAudience && (
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">المستهدفون</p>
                    <p className="text-gray-800 font-bold">{formData.targetAudience}</p>
                  </div>
                )}
              </div>
              {formData.programObjectives && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 font-semibold mb-2">أهداف البرنامج</p>
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{formData.programObjectives}</p>
                </div>
              )}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 performance-witness-grid">
            {witnessCards.map(card => (
              <div key={card.id} className={card.wrapperClass}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={card.badgeClass}>{card.id}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{card.title}</h3>
                  </div>
                </div>
                <div className={`bg-white rounded-lg p-4 border-2 border-dashed ${card.borderAccent} h-[240px] flex items-center justify-center overflow-hidden`}>
                  {card.image ? (
                    <img src={card.image} alt={card.placeholder} className="w-full h-full object-contain rounded-lg" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <span className="text-5xl mb-2 block">📸</span>
                      <p className="font-semibold">ضع صورة الشاهد هنا</p>
                      <p className="text-sm">{card.placeholder}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="signatures-grid grid grid-cols-3 gap-8 pt-6 border-t-2 border-gray-200">
            <div className="text-right">
              <p className="text-gray-600 font-semibold mb-2">معلم المادة</p>
              <p className="text-xl font-bold text-gray-800">{formData.teacherName}</p>
              {signatureImage && (
                <img 
                  src={signatureImage} 
                  alt="توقيع"
                  className="h-24 object-contain ml-0 mt-2"
                />
              )}
            </div>
            
            {/* الباركود في المنتصف */}
            <div className="flex items-center justify-center">
              {barcodeImage && (
                <button
                  onClick={() => setShowBarcodeModal(true)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  title="اضغط لتكبير الباركود"
                >
                  <img src={barcodeImage} alt="باركود" className="w-32 h-32 object-contain" />
                </button>
              )}
            </div>
            
            <div className="text-left">
              <p className="text-gray-600 font-semibold mb-2">مدير المدرسة</p>
              <p className="text-xl font-bold text-gray-800">{formData.principalName}</p>
            </div>
          </div>
        </div>

        <div className="text-white p-4 text-center bg-gradient-to-r from-[#3D7EB9] via-[#0DA9A6] to-[#07A869]">
          <p className="text-lg font-bold">العام الدراسي {formData.academicYear} هـ</p>
        </div>
      </div>
    );
  };

  const canGenerateReport = selectedReport >= 1 && selectedReport <= 11;

  return (
    <div className="p-6 sm:p-8">
      {/* Modal للباركود */}
      {showBarcodeModal && barcodeImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setShowBarcodeModal(false)}
        >
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowBarcodeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">الباركود</h3>
            <div className="flex justify-center">
              <img src={barcodeImage} alt="باركود" className="max-w-full max-h-96 object-contain" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">يمكنك مسح الباركود ضوئياً للوصول للمعلومات</p>
          </div>
        </div>
      )}
      
      {!showPreview ? (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">مولد تقرير الأداء الوظيفي</h2>
            <p className="text-gray-600 dark:text-gray-400">إعداد شواهد الأداء الوظيفي بتصميم مطابق لهوية وزارة التعليم</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-sm p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">قوالب التقارير</h3>
              <div className="space-y-2">
                {reports.map(report => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      selectedReport === report.id
                        ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xl">{report.icon}</span>
                    <span className="text-sm font-medium text-right flex-1">{report.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {canGenerateReport ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">بيانات التقرير</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم المعلم</label>
                      <input
                        type="text"
                        value={formData.teacherName}
                        onChange={(e) => handleInputChange("teacherName", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم مدير المدرسة</label>
                      <input
                        type="text"
                        value={formData.principalName}
                        onChange={(e) => handleInputChange("principalName", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم المدرسة</label>
                      <input
                        type="text"
                        value={formData.schoolName}
                        onChange={(e) => handleInputChange("schoolName", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">العام الدراسي</label>
                      <input
                        type="text"
                        value={formData.academicYear}
                        onChange={(e) => handleInputChange("academicYear", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">البند</label>
                      <input
                        type="text"
                        value={formData.reportItem}
                        onChange={(e) => handleInputChange("reportItem", e.target.value)}
                        placeholder="مثال: أداء الواجبات الوظيفية"
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">العنصر</label>
                      <input
                        type="text"
                        value={formData.performanceElement}
                        onChange={(e) => handleInputChange("performanceElement", e.target.value)}
                        placeholder="مثال: الالتزام بالنظام الرسمي"
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم البرنامج</label>
                      <input
                        type="text"
                        value={formData.programName}
                        onChange={(e) => handleInputChange("programName", e.target.value)}
                        placeholder="مثال: برنامج تحسين مهارات القراءة"
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">تاريخ التنفيذ</label>
                      <input
                        type="text"
                        value={formData.implementationDate}
                        onChange={(e) => handleInputChange("implementationDate", e.target.value)}
                        placeholder="مثال: 15/3/1447 هـ"
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المستهدفون</label>
                      <input
                        type="text"
                        value={formData.targetAudience}
                        onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                        placeholder="مثال: طلاب الصف الأول المتوسط"
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">أهداف البرنامج</label>
                      <textarea
                        value={formData.programObjectives}
                        onChange={(e) => handleInputChange("programObjectives", e.target.value)}
                        rows={3}
                        placeholder="أدخل أهداف البرنامج هنا..."
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo and Signature Upload Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    الشعار والتوقيع
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">شعار وزارة التعليم:</label>
                      <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center bg-white dark:bg-slate-800">
                        {logoImage ? (
                          <div className="relative">
                            <img 
                              src={logoImage} 
                              alt="شعار وزارة التعليم" 
                              className="max-w-full h-auto object-contain mx-auto mb-3" 
                              style={{maxHeight: '200px'}}
                            />
                            <button
                              onClick={() => setLogoImage("")}
                              className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                            >
                              حذف الصورة
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                            <svg className="w-12 h-12 mx-auto text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">انقر لرفع صورة الشعار</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG أو SVG</p>
                          </label>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">توقيع المعلم:</label>
                      <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center bg-white dark:bg-slate-800">
                        {signatureImage ? (
                          <div className="relative">
                            <img 
                              src={signatureImage} 
                              alt="توقيع المعلم" 
                              className="max-h-24 mx-auto object-contain mb-3"
                            />
                            <button
                              onClick={() => setSignatureImage("")}
                              className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                            >
                              حذف الصورة
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSignatureUpload}
                              className="hidden"
                            />
                            <svg className="w-12 h-12 mx-auto text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">انقر لرفع صورة التوقيع</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG أو SVG</p>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* مربع رفع الباركود */}
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">باركود التقرير (اختياري):</label>
                    <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center max-w-xs mx-auto bg-white dark:bg-slate-800">
                      {barcodeImage ? (
                        <div className="relative">
                          <img src={barcodeImage} alt="الباركود" className="w-32 h-32 mx-auto object-contain" />
                          <button
                            onClick={() => setBarcodeImage("")}
                            className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                          >
                            حذف الباركود
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBarcodeUpload}
                            className="hidden"
                          />
                          <div className="text-blue-600 dark:text-blue-400">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            <p className="font-semibold">انقر لرفع صورة الباركود</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG</p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">شواهد الأداء</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {imageFields.map(field => (
                      <div key={field.key} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{field.label}</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, field.key)}
                          className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:cursor-pointer"
                        />
                        {images[field.key] && (
                          <div className="mt-3 relative">
                            <img src={images[field.key]} alt={field.hint} className="w-full h-36 object-cover rounded-lg" />
                            <button
                              onClick={() => clearImage(field.key)}
                              className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[320px] flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center p-8">
                <div>
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {reports.find(report => report.id === selectedReport)?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">سيتم إضافة هذا القالب قريباً</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => canGenerateReport && setShowPreview(true)}
              disabled={!canGenerateReport}
              className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
                canGenerateReport
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-2xl hover:-translate-y-1"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              معاينة التقرير
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto" ref={reportContainerRef}>
          <style jsx global>{`
            @media print {
              /* إخفاء كل شيء ماعدا التقرير */
              body * {
                visibility: hidden;
              }
              
              /* إظهار التقرير وجميع محتوياته */
              #report-content,
              #report-content * {
                visibility: visible !important;
              }
              
              /* تنسيق الصفحة - ملء كامل بدون هوامش */
              @page {
                size: A4 portrait;
                margin: 0;
              }
              
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
              }
              
              /* التقرير يملأ الصفحة بالكامل */
              #report-content {
                position: absolute !important;
                left: 0 !important;
                right: 0 !important;
                top: 0 !important;
                bottom: 0 !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                box-shadow: none !important;
                border-width: 0 !important;
                border-radius: 0 !important;
              }
              
              #report-content.sheet {
                border: none !important;
              }
              
              /* إخفاء عناصر التحكم */
              .no-print {
                display: none !important;
                visibility: hidden !important;
              }
              
              /* ضمان طباعة الألوان */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              /* تنسيق الهيدر - تقليل المسافات للطباعة */
              .print-header {
                background-color: #15445A !important;
                border-radius: 0 !important;
                page-break-after: avoid !important;
                padding: 0.5rem 1rem !important;
              }
              
              /* تنسيق قسم اسم المدرسة - تقليل المسافات */
              #report-content > div:nth-child(2) {
                background-color: #15445A !important;
                padding: 0.25rem 1rem !important;
              }
              
              /* تنسيق محتوى التقرير - تقليل المسافات الداخلية */
              #report-content > div:nth-child(3) {
                padding: 0.75rem !important;
              }
              
              /* تنسيق الشبكات (Grid) - تقليل الفجوات */
              .grid {
                display: grid !important;
                gap: 0.5rem !important;
              }
              
              .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
              
              .grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              }
              
              /* تنسيق الحدود والصناديق */
              .border-2 {
                border-width: 2px !important;
              }
              
              .border-gray-800 {
                border-color: #1f2937 !important;
              }
              
              .border-black {
                border-color: #000000 !important;
              }
              
              .rounded-lg {
                border-radius: 8px !important;
              }
              
              /* تنسيق النصوص - تقليل الأحجام قليلاً */
              .text-sm {
                font-size: 0.75rem !important;
                line-height: 1rem !important;
              }
              
              .text-base {
                font-size: 0.875rem !important;
                line-height: 1.25rem !important;
              }
              
              .text-xl {
                font-size: 1rem !important;
                line-height: 1.5rem !important;
              }
              
              .text-2xl {
                font-size: 1.25rem !important;
                line-height: 1.75rem !important;
              }
              
              .text-3xl {
                font-size: 1.5rem !important;
                line-height: 2rem !important;
              }
              
              .text-lg {
                font-size: 0.9rem !important;
                line-height: 1.4rem !important;
              }
              
              .text-gray-700 {
                color: #374151 !important;
              }
              
              .text-gray-900 {
                color: #111827 !important;
              }
              
              .text-white {
                color: #ffffff !important;
              }
              
              /* تنسيق الصور - تقليل الأحجام */
              img {
                max-width: 100% !important;
                height: auto !important;
                page-break-inside: avoid !important;
              }
              
              /* تنسيق صور الشواهد - تقليل الارتفاع */
              .h-48 {
                height: 8rem !important;
              }
              
              /* تنسيق الأيقونات - تقليل الأحجام */
              .w-32 {
                width: 5rem !important;
              }
              
              .h-32 {
                height: 5rem !important;
              }
              
              .h-20 {
                height: 3rem !important;
              }
              
              .h-24 {
                height: 3.5rem !important;
              }
              
              /* المسافات - تقليل للطباعة */
              .gap-3 {
                gap: 0.4rem !important;
              }
              
              .gap-4 {
                gap: 0.5rem !important;
              }
              
              .gap-6 {
                gap: 0.75rem !important;
              }
              
              .gap-8 {
                gap: 1rem !important;
              }
              
              .mb-6 {
                margin-bottom: 0.5rem !important;
              }
              
              .mb-4 {
                margin-bottom: 0.4rem !important;
              }
              
              .mb-2 {
                margin-bottom: 0.25rem !important;
              }
              
              .mt-2 {
                margin-top: 0.25rem !important;
              }
              
              .p-3 {
                padding: 0.5rem !important;
              }
              
              .p-4 {
                padding: 0.6rem !important;
              }
              
              .p-6 {
                padding: 0.75rem !important;
              }
              
              .p-8 {
                padding: 0.75rem !important;
              }
              
              .py-4 {
                padding-top: 0.5rem !important;
                padding-bottom: 0.5rem !important;
              }
              
              .py-6 {
                padding-top: 0.5rem !important;
                padding-bottom: 0.5rem !important;
              }
              
              .py-2 {
                padding-top: 0.25rem !important;
                padding-bottom: 0.25rem !important;
              }
              
              .px-8 {
                padding-left: 1rem !important;
                padding-right: 1rem !important;
              }
              
              .px-6 {
                padding-left: 0.75rem !important;
                padding-right: 0.75rem !important;
              }
              
              .space-y-10 > * + * {
                margin-top: 0.75rem !important;
              }
              
              .space-y-4 > * + * {
                margin-top: 0.4rem !important;
              }
              
              .pt-6 {
                padding-top: 0.5rem !important;
              }
              
              /* منع تقطيع العناصر */
              .border-2, 
              .rounded-lg,
              .grid > div {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
              
              /* تنسيق شبكات الشواهد - تقليل الفجوات */
              .performance-witness-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                gap: 0.5rem !important;
              }
              
              /* صور الشواهد - تقليل الارتفاع */
              .performance-witness-grid .h-\\[240px\\] {
                height: 160px !important;
              }

              /* تنسيق التوقيعات - 3 أعمدة مع المدير على اليسار */
              .signatures-grid {
                display: grid !important;
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                gap: 0.5rem !important;
              }
              
              .signatures-grid .text-left {
                text-align: left !important;
              }
              
              .signatures-grid .text-right {
                text-align: right !important;
              }
              
              .signatures-grid .mt-4 {
                margin-top: 0.25rem !important;
              }

              .signatures-grid .p-6 {
                padding: 0.5rem !important;
              }
              
              /* تنسيق Footer - تقليل الـ padding */
              #report-content > div:last-child {
                padding: 0.5rem !important;
              }
              
              .grid-cols-1.sm\\:grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              }
              
              /* إزالة الظلال والتأثيرات */
              * {
                box-shadow: none !important;
                text-shadow: none !important;
              }
              
              /* طباعة الخلفيات */
              div[style*="backgroundColor"] {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
            
            /* طباعة من الهاتف - بدون هوامش */
            @media print and (max-width: 600px) {
              @page {
                margin: 0;
              }
              
              html, body {
                margin: 0 !important;
                padding: 0 !important;
              }
              
              #report-content {
                position: absolute !important;
                left: 0 !important;
                right: 0 !important;
                top: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
              }
            }
          `}</style>
          <div className="flex items-center justify-between mb-6 no-print">
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              العودة للتعديل
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة / حفظ PDF
            </button>
          </div>
          <PerformanceReport />
        </div>
      )}
    </div>
  );
}

function OtherTools() {
  const tools = [
    { icon: "📁", title: "ملف الإنجاز", description: "توثيق الإنجازات والأداء الوظيفي للمعلم", color: "from-blue-500 to-cyan-500", link: "/admin/portfolio" },
    { icon: "📝", title: "محرر الملاحظات", description: "إنشاء وتحرير الملاحظات الشخصية", color: "from-green-500 to-emerald-500" },
    { icon: "📅", title: "تقويم المهام", description: "إدارة المهام والمواعيد الهامة", color: "from-purple-500 to-pink-500" },
    { icon: "📊", title: "إحصائيات", description: "عرض الإحصائيات والبيانات التحليلية", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
          <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">أدوات إضافية</h2>
          <p className="text-gray-600 dark:text-gray-400">مجموعة من الأدوات المساعدة</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool, index) => {
          const ToolWrapper = tool.link ? Link : 'div';
          return (
            <ToolWrapper key={index} href={tool.link || '#'} className="group relative overflow-hidden p-6 bg-white dark:bg-slate-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500`}></div>
              <div className="relative">
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tool.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                <span className={`text-transparent bg-gradient-to-r ${tool.color} bg-clip-text font-semibold group-hover:underline flex items-center gap-2`}>
                  {tool.link ? 'فتح الملف' : 'فتح الأداة'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                </span>
              </div>
            </ToolWrapper>
          );
        })}
      </div>
    </div>
  );
}

// سجل المتابعة الإلكتروني
function StudentFollowUpLog() {
  // بيانات الطلاب لكل فصل - مرتبة أبجدياً
  const classes: Record<string, { label: string; students: string[] }> = {
    A: {
      label: "أ",
      students: [
        "فيصل احمد سود", "أحمد عبدالله قصير", "زيد عبدالله عوض", "عبدالعزيز سعود غيش",
        "اسامه يحي آل مييش", "وسام عثمان عبده", "سامي جمعان الغامدي", "ثامر احمد مغفوري",
        "شادي سامي شاذلي", "تركي يحي ضعافي", "مناف صبري عثمان", "محمد عبدالكريم احمد",
        "محمد صبري بريك", "مازن ابراهيم قب", "زياد حسن عباس", "رامي ايمن الجهني",
        "حسن بندر الجهني", "بندر سامي عبده", "ايهم عبدالله باعشن", "احمد هيثم زيلعي",
        "عبدالرحمن هادي الزهراوي", "حافظ امجد علاقي"
      ]
    },
    B: {
      label: "ب",
      students: [
        "مصطفى محمد حسين", "يامن علي مجربي", "انيس يحي شامي", "يوسف علي آل سالم",
        "احمد مجدي بكري", "راكان محمد السبيعي", "أسامه علي صنجاء", "أبكر حسن مصري",
        "ظافر علي آل سالم", "مراد ماجد شراحيلي", "زياد ماجد شراحيلي", "يزن احمد الغرة",
        "هتان محمد عمر", "مهند ابراهيم هاشم", "عبدالعزيز رمزي ابوراسين", "احمد محمد سليمان",
        "عبدالله علي علي", "مياد عمر حوباني", "محمد عابد عواجي", "ابراهيم يحي دهل",
        "عبدالرحيم حسن الطقيقى", "صالح حسين مكين", "بندر عبده مصري", "أحمد سامي بحيص"
      ]
    },
    C: {
      label: "ج",
      students: [
        "مشعل أحمد بامسدوس", "أحمد محمد العمري", "فؤاد محمد جغادي", "الزاكي محمد شعيب",
        "احمد مصطفى القربي", "عبدالاله ماجد زيلع", "محمد احمد عواجي", "خالد عبدالعزيز القطيبي",
        "عبدالكريم محمد حمادي", "مازن محرم الشعراوي", "عبدالعزيز ابراهيم بحيص", "البدر توفيق خواجي",
        "نواف بندر زيلعي", "عبدالرحمن علوان عقيل", "عبدالرحمن احمد احمد", "عبدالرحمن احمد ابوطالب",
        "راكان حسن جري", "اياد رمزي ايوب", "ابراهيم شاكر حوباني", "نواف محمد حكمي",
        "محمد خليل قحطاني", "فارس طلال يماني", "سلطان يحي عبيري", "بسام علي مقري"
      ]
    },
    D: {
      label: "د",
      students: [
        "معاذ محمد محمد", "حسام بلال القاضي", "مالك بلال قاسم", "برهان نبيل الصديق",
        "يزن سعيد سعيده", "رياض محمد دوس", "ناصر علي الاخرش", "وائل عبدالحكيم علي",
        "مصطفى محمد الذيب", "مدني محسن خردلي", "فهد حافظ غالب", "عمر وسيم بيطار",
        "معاذ سالم غالب", "معتصم علي شراحيلي", "فوزي اديب الراجحي", "ماهر محمد محمود",
        "مهاب حمد احمد", "مهند علي نابوش", "مروان محمد بريك", "عبدالعزيز محمد ونس",
        "مهند عمر كلفوت", "محمد ابكر زعقان", "سعود عمرو كوكو"
      ]
    }
  };

  // ترتيب أبجدي عربي
  const sortArabic = (arr: string[]) => [...arr].sort((a, b) => a.localeCompare(b, "ar"));
  Object.keys(classes).forEach((k) => {
    classes[k].students = sortArabic(classes[k].students);
  });

  type AttendanceStatus = "حاضر" | "غائب" | "متأخر";
  type StudentGrades = {
    // الحضور
    attendance: AttendanceStatus;
    // الأعمال اليومية (40 درجة)
    homework: number; // 10 درجات
    projects: number; // 5 درجات
    classActivities: number; // 10 درجات
    participation: number; // 15 درجة
    // اختبارات الفترات
    firstPeriod: number; // 20 درجة
    secondPeriod: number; // 20 درجة
    // الاختبار النهائي (40 درجة)
    listeningAndSpeaking: number; // 10 درجات
    finalExam: number; // 30 درجة
    // الملاحظات السلوكية
    behaviorNotes: string[];
    // ملاحظات عامة
    notes: string;
  };

  type FollowData = Record<string, Record<string, Record<string, StudentGrades>>>; // date -> classKey -> student -> grades

  const defaultGrades = (): StudentGrades => ({
    attendance: "حاضر",
    homework: 0,
    projects: 0,
    classActivities: 0,
    participation: 0,
    firstPeriod: 0,
    secondPeriod: 0,
    listeningAndSpeaking: 0,
    finalExam: 0,
    behaviorNotes: [],
    notes: ""
  });

  // قائمة الملاحظات السلوكية
  const behaviorOptions = [
    { id: "positive", label: "سلوكيات إيجابية", items: [
      "متعاون مع زملائه",
      "يحترم المعلم والزملاء",
      "منظم ومرتب",
      "مبادر في المشاركة",
      "يساعد الآخرين",
      "ملتزم بالحصة",
      "يكمل واجباته",
      "قيادي ومؤثر إيجابياً",
      "مبدع ومبتكر",
      "صادق وأمين"
    ]},
    { id: "negative", label: "سلوكيات تحتاج تحسين", items: [
      "يتحدث أثناء الشرح",
      "لا يكمل الواجبات",
      "يتأخر عن الحصة",
      "يشتت انتباه الآخرين",
      "غير منظم",
      "يحتاج متابعة سلوكية",
      "قليل المشاركة",
      "يستخدم الجوال",
      "لا يحضر الأدوات",
      "يحتاج تواصل مع ولي الأمر"
    ]},
    { id: "neutral", label: "ملاحظات عامة", items: [
      "يحتاج دعم إضافي",
      "موهوب ومتميز",
      "يحتاج خطة علاجية",
      "مرشح للتكريم",
      "تحسن ملحوظ",
      "يحتاج تشجيع",
      "غياب متكرر",
      "ظروف خاصة"
    ]}
  ];

  const today = new Date().toISOString().slice(0, 10);
  const [currentClass, setCurrentClass] = useState<keyof typeof classes>("A");
  const [date, setDate] = useState<string>("2025-11-04"); // تاريخ البيانات الأولية
  const [filter, setFilter] = useState("");
  const [followData, setFollowData] = useState<FollowData>({});
  const [showBehaviorModal, setShowBehaviorModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [showAttendanceReport, setShowAttendanceReport] = useState(false);
  const [showBehaviorReport, setShowBehaviorReport] = useState(false);

  // تحميل البيانات الأولية
  useEffect(() => {
    try {
      const stored = localStorage.getItem("followup-log");
      const initialData: FollowData = {
        "2025-11-04": {
          "A": {
            "أحمد عبدالله قصير": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "احمد هيثم زيلعي": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "اسامه يحي آل مييش": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 8, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "ايهم عبدالله باعشن": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 8, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "بندر سامي عبده": { attendance: "حاضر" as AttendanceStatus, homework: 4, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "تركي يحي ضعافي": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 7, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "ثامر احمد مغفوري": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 8, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "حافظ امجد علاقي": { attendance: "حاضر" as AttendanceStatus, homework: 9, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "حسن بندر الجهني": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "رامي ايمن الجهني": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "زياد حسن عباس": { attendance: "حاضر" as AttendanceStatus, homework: 9, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "زيد عبدالله عوض": { attendance: "حاضر" as AttendanceStatus, homework: 3, projects: 5, classActivities: 10, participation: 11, firstPeriod: 9, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "سامي جمعان الغامدي": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 7, firstPeriod: 8, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "شادي سامي شاذلي": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 13, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالرحمن هادي الزهراوي": { attendance: "حاضر" as AttendanceStatus, homework: 6, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالعزيز سعود غيش": { attendance: "حاضر" as AttendanceStatus, homework: 3, projects: 5, classActivities: 10, participation: 9, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "فيصل احمد سود": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 5, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مازن ابراهيم قب": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 9, firstPeriod: 8, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "محمد صبري بريك": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 8, firstPeriod: 10, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "محمد عبدالكريم احمد": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 8, firstPeriod: 7, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مناف صبري عثمان": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 7, firstPeriod: 9, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "وسام عثمان عبده": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" }
          },
          "B": {
            "أبكر حسن مصري": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 7, firstPeriod: 14, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "أحمد سامي بحيص": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "أسامه علي صنجاء": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 7, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "ابراهيم يحي دهل": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "احمد مجدي بكري": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 13, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "احمد محمد سليمان": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "انيس يحي شامي": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "بندر عبده مصري": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 7, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "راكان محمد السبيعي": { attendance: "حاضر" as AttendanceStatus, homework: 3, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "زياد ماجد شراحيلي": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 9, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "صالح حسين مكين": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "ظافر علي آل سالم": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 8, firstPeriod: 14, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالرحيم حسن الطقيقى": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 9, firstPeriod: 14, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالعزيز رمزي ابوراسين": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالله علي علي": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 9, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "محمد عابد عواجي": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مراد ماجد شراحيلي": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 10, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مصطفى محمد حسين": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 13, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مهند ابراهيم هاشم": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 9, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مياد عمر حوباني": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 7, firstPeriod: 11, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "هتان محمد عمر": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 8, firstPeriod: 8, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "يامن علي مجربي": { attendance: "حاضر" as AttendanceStatus, homework: 3, projects: 5, classActivities: 10, participation: 15, firstPeriod: 19, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "يوسف علي آل سالم": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 8, firstPeriod: 13, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "يزن احمد الغرة": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 8, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" }
          },
          "C": {
            "أحمد محمد العمري": { attendance: "حاضر" as AttendanceStatus, homework: 9, projects: 5, classActivities: 10, participation: 7, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "احمد مصطفى القربي": { attendance: "حاضر" as AttendanceStatus, homework: 6, projects: 5, classActivities: 10, participation: 9, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "البدر توفيق خواجي": { attendance: "حاضر" as AttendanceStatus, homework: 9, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "الزاكي محمد شعيب": { attendance: "حاضر" as AttendanceStatus, homework: 9, projects: 5, classActivities: 10, participation: 15, firstPeriod: 7, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "اياد رمزي ايوب": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 14, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "بسام علي مقري": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 13, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "خالد عبدالعزيز القطيبي": { attendance: "حاضر" as AttendanceStatus, homework: 9, projects: 5, classActivities: 10, participation: 8, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "راكان حسن جري": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "سلطان يحي عبيري": { attendance: "حاضر" as AttendanceStatus, homework: 6, projects: 5, classActivities: 10, participation: 15, firstPeriod: 10, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالاله ماجد زيلع": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 9, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالرحمن احمد ابوطالب": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 14, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالرحمن احمد احمد": { attendance: "حاضر" as AttendanceStatus, homework: 9, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالرحمن علوان عقيل": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 6, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالعزيز ابراهيم بحيص": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 6, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالكريم محمد حمادي": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 11, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "فؤاد محمد جغادي": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 8, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "فارس طلال يماني": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مازن محرم الشعراوي": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "محمد احمد عواجي": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 6, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "محمد خليل قحطاني": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مشعل أحمد بامسدوس": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 12, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "نواف بندر زيلعي": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "نواف محمد حكمي": { attendance: "حاضر" as AttendanceStatus, homework: 10, projects: 5, classActivities: 10, participation: 15, firstPeriod: 12, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "ابراهيم شاكر حوباني": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 6, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" }
          },
          "D": {
            "برهان نبيل الصديق": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "حسام بلال القاضي": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "رياض محمد دوس": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "سعود عمرو كوكو": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 7, firstPeriod: 0, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عبدالعزيز محمد ونس": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 13, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "عمر وسيم بيطار": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 14, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "فهد حافظ غالب": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 6, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "فوزي اديب الراجحي": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 6, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "ماهر محمد محمود": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 14, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مالك بلال قاسم": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 6, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "محمد ابكر زعقان": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 6, firstPeriod: 19, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مدني محسن خردلي": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 15, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مروان محمد بريك": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 9, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مصطفى محمد الذيب": { attendance: "حاضر" as AttendanceStatus, homework: 6, projects: 5, classActivities: 10, participation: 6, firstPeriod: 12, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "معاذ سالم غالب": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 5, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "معاذ محمد محمد": { attendance: "حاضر" as AttendanceStatus, homework: 7, projects: 5, classActivities: 10, participation: 14, firstPeriod: 16, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "معتصم علي شراحيلي": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 6, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مهاب حمد احمد": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مهند علي نابوش": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 6, firstPeriod: 18, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "مهند عمر كلفوت": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 15, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "ناصر علي الاخرش": { attendance: "حاضر" as AttendanceStatus, homework: 2, projects: 5, classActivities: 10, participation: 6, firstPeriod: 0, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "وائل عبدالحكيم علي": { attendance: "حاضر" as AttendanceStatus, homework: 5, projects: 5, classActivities: 10, participation: 6, firstPeriod: 19, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" },
            "يزن سعيد سعيده": { attendance: "حاضر" as AttendanceStatus, homework: 8, projects: 5, classActivities: 10, participation: 6, firstPeriod: 17, secondPeriod: 0, listeningAndSpeaking: 0, finalExam: 0, behaviorNotes: [], notes: "" }
          }
        }
      };
      
      if (stored) {
        // دمج البيانات المخزنة مع البيانات الأولية
        const storedData = JSON.parse(stored);
        const mergedData = { ...initialData, ...storedData };
        setFollowData(mergedData);
      } else {
        // استخدام البيانات الأولية فقط
        setFollowData(initialData);
        localStorage.setItem("followup-log", JSON.stringify(initialData));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("followup-log", JSON.stringify(followData));
    } catch {}
  }, [followData]);

  const updateGrade = (student: string, field: keyof StudentGrades, value: any) => {
    setFollowData((prev) => {
      const day = prev[date] || {};
      const cls = day[String(currentClass)] || {};
      const st = cls[student] || defaultGrades();
      const updated: StudentGrades = { ...st, [field]: value };
      return {
        ...prev,
        [date]: {
          ...day,
          [String(currentClass)]: {
            ...cls,
            [student]: updated
          }
        }
      };
    });
  };

  const toggleBehaviorNote = (student: string, note: string) => {
    const current = followData?.[date]?.[String(currentClass)]?.[student]?.behaviorNotes || [];
    const newNotes = current.includes(note) 
      ? current.filter(n => n !== note)
      : [...current, note];
    updateGrade(student, "behaviorNotes", newNotes);
  };

  const openBehaviorModal = (student: string) => {
    setSelectedStudent(student);
    setShowBehaviorModal(true);
  };

  // حساب إحصائيات الحضور لطالب معين
  const getAttendanceStats = (student: string) => {
    const dates = Object.keys(followData);
    let present = 0, absent = 0, late = 0, total = 0;
    
    dates.forEach(d => {
      const classData = followData[d]?.[String(currentClass)];
      if (classData?.[student]) {
        total++;
        const status = classData[student].attendance;
        if (status === "حاضر") present++;
        else if (status === "غائب") absent++;
        else if (status === "متأخر") late++;
      }
    });
    
    return { present, absent, late, total };
  };

  // الحصول على جميع التواريخ المسجلة للفصل الحالي
  const getRecordedDates = () => {
    const dates = Object.keys(followData).filter(d => followData[d]?.[String(currentClass)]);
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  // حساب إحصائيات الملاحظات السلوكية لطالب معين
  const getBehaviorStats = (student: string) => {
    const dates = Object.keys(followData);
    const allNotes: string[] = [];
    
    dates.forEach(d => {
      const classData = followData[d]?.[String(currentClass)];
      if (classData?.[student]?.behaviorNotes) {
        allNotes.push(...classData[student].behaviorNotes);
      }
    });
    
    // تصنيف الملاحظات
    const positive = allNotes.filter(note => 
      ["متعاون مع زملائه", "يحترم المعلم والزملاء", "منظم ومرتب", "مبادر في المشاركة", 
       "يساعد الآخرين", "ملتزم بالحصة", "يكمل واجباته", "قيادي ومؤثر إيجابياً", 
       "مبدع ومبتكر", "صادق وأمين"].includes(note)
    );
    
    const negative = allNotes.filter(note => 
      ["يتحدث أثناء الشرح", "لا يكمل الواجبات", "يتأخر عن الحصة", "يشتت انتباه الآخرين",
       "غير منظم", "يحتاج متابعة سلوكية", "قليل المشاركة", "يستخدم الجوال",
       "لا يحضر الأدوات", "يحتاج تواصل مع ولي الأمر"].includes(note)
    );
    
    const neutral = allNotes.filter(note => 
      ["يحتاج دعم إضافي", "موهوب ومتميز", "يحتاج خطة علاجية", "مرشح للتكريم",
       "تحسن ملحوظ", "يحتاج تشجيع", "غياب متكرر", "ظروف خاصة"].includes(note)
    );
    
    return { 
      positive: positive.length, 
      negative: negative.length, 
      neutral: neutral.length,
      total: allNotes.length,
      uniqueNotes: [...new Set(allNotes)]
    };
  };

  const calculateTotal = (grades: StudentGrades): number => {
    const dailyWork = grades.homework + grades.projects + grades.classActivities + grades.participation;
    
    // حساب متوسط الفترات: إذا كانت الفترة الثانية = 0، نستخدم الفترة الأولى فقط
    // وإلا نحسب المتوسط العادي
    const periodsAvg = grades.secondPeriod === 0 
      ? grades.firstPeriod 
      : (grades.firstPeriod + grades.secondPeriod) / 2;
    
    const finalTotal = grades.listeningAndSpeaking + grades.finalExam;
    return dailyWork + periodsAvg + finalTotal;
  };

  const list = classes[currentClass].students.filter((s) => s.includes(filter.trim()) || filter.trim() === "");

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {Object.keys(classes).map((key) => (
            <button
              key={key}
              onClick={() => setCurrentClass(key as any)}
              className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                currentClass === key
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-transparent shadow-lg"
                  : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600"
              }`}
            >
              فصل {classes[key as keyof typeof classes].label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAttendanceReport(!showAttendanceReport)}
            className="px-4 py-2 rounded-lg border-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            {showAttendanceReport ? "إخفاء تقرير الحضور" : "تقرير الحضور"}
          </button>
          <button
            onClick={() => setShowBehaviorReport(!showBehaviorReport)}
            className="px-4 py-2 rounded-lg border-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {showBehaviorReport ? "إخفاء الملاحظات السلوكية" : "الملاحظات السلوكية"}
          </button>
          <input
            type="date"
            className="px-3 py-2 rounded-lg border-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            placeholder="بحث عن طالب..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      {/* تقرير الحضور والغياب */}
      {showAttendanceReport && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-700 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              تقرير الحضور والغياب - فصل {classes[currentClass].label}
            </h3>
            <p className="text-blue-100 text-sm mt-1">عدد التواريخ المسجلة: {getRecordedDates().length} يوم</p>
          </div>
          
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-right border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-slate-700">
                <tr className="text-xs font-bold text-gray-700 dark:text-gray-200">
                  <th className="p-3 border-l border-gray-300 dark:border-gray-600">#</th>
                  <th className="p-3 border-l border-gray-300 dark:border-gray-600">اسم الطالب</th>
                  <th className="p-3 border-l border-gray-300 dark:border-gray-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">حضور</th>
                  <th className="p-3 border-l border-gray-300 dark:border-gray-600 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">غياب</th>
                  <th className="p-3 border-l border-gray-300 dark:border-gray-600 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">تأخر</th>
                  <th className="p-3 border-l border-gray-300 dark:border-gray-600">المجموع</th>
                  <th className="p-3 border-l border-gray-300 dark:border-gray-600">نسبة الحضور</th>
                  <th className="p-3">التفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {list.map((name, idx) => {
                  const stats = getAttendanceStats(name);
                  const attendanceRate = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : "0.0";
                  
                  return (
                    <tr key={name} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="p-3 text-sm text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-700">{idx + 1}</td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            setSelectedStudent(name);
                          }}
                          className="font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:underline transition-all text-right"
                        >
                          {name}
                        </button>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
                          {stats.present}
                        </span>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-bold">
                          {stats.absent}
                        </span>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-bold">
                          {stats.late}
                        </span>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center font-bold text-gray-900 dark:text-white">
                        {stats.total}
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                parseFloat(attendanceRate) >= 90 ? "bg-green-500" :
                                parseFloat(attendanceRate) >= 75 ? "bg-blue-500" :
                                parseFloat(attendanceRate) >= 60 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${attendanceRate}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-bold ${
                            parseFloat(attendanceRate) >= 90 ? "text-green-600 dark:text-green-400" :
                            parseFloat(attendanceRate) >= 75 ? "text-blue-600 dark:text-blue-400" :
                            parseFloat(attendanceRate) >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
                          }`}>
                            {attendanceRate}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setSelectedStudent(name);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                        >
                          عرض السجل
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* سجل الحضور حسب التاريخ */}
            {selectedStudent && !showBehaviorModal && (
              <div className="mt-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    سجل الحضور: {selectedStudent}
                  </h4>
                  <button
                    onClick={() => setSelectedStudent("")}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {getRecordedDates().map(d => {
                    const studentData = followData[d]?.[String(currentClass)]?.[selectedStudent];
                    if (!studentData) return null;
                    
                    return (
                      <div
                        key={d}
                        className={`p-3 rounded-lg border-2 ${
                          studentData.attendance === "حاضر"
                            ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                            : studentData.attendance === "غائب"
                            ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
                            : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700"
                        }`}
                      >
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {new Date(d).toLocaleDateString('ar-SA')}
                        </div>
                        <div className={`text-sm font-bold ${
                          studentData.attendance === "حاضر"
                            ? "text-green-700 dark:text-green-400"
                            : studentData.attendance === "غائب"
                            ? "text-red-700 dark:text-red-400"
                            : "text-yellow-700 dark:text-yellow-400"
                        }`}>
                          {studentData.attendance === "حاضر" && "✓ حاضر"}
                          {studentData.attendance === "غائب" && "✗ غائب"}
                          {studentData.attendance === "متأخر" && "⏱ متأخر"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* تقرير الملاحظات السلوكية */}
      {showBehaviorReport && (
        <div className="mb-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-700">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-2xl">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              تقرير الملاحظات السلوكية - فصل {classes[currentClass].label}
            </h3>
            <p className="text-sm text-blue-100 mt-1">ملخص الملاحظات السلوكية لجميع الطلاب</p>
          </div>

          <div className="p-4">
            <table className="min-w-full text-right">
              <thead>
                <tr className="bg-gray-100 dark:bg-slate-700">
                  <th className="p-3 text-sm font-bold text-gray-900 dark:text-white border-l border-gray-300 dark:border-gray-600">#</th>
                  <th className="p-3 text-sm font-bold text-gray-900 dark:text-white border-l border-gray-300 dark:border-gray-600">اسم الطالب</th>
                  <th className="p-3 text-sm font-bold text-green-700 dark:text-green-400 border-l border-gray-300 dark:border-gray-600 bg-green-50 dark:bg-green-900/20">إيجابية</th>
                  <th className="p-3 text-sm font-bold text-red-700 dark:text-red-400 border-l border-gray-300 dark:border-gray-600 bg-red-50 dark:bg-red-900/20">سلبية</th>
                  <th className="p-3 text-sm font-bold text-blue-700 dark:text-blue-400 border-l border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/20">محايدة</th>
                  <th className="p-3 text-sm font-bold text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600">الإجمالي</th>
                  <th className="p-3 text-sm font-bold text-gray-900 dark:text-white">التفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {list.map((name, idx) => {
                  const stats = getBehaviorStats(name);
                  
                  return (
                    <tr key={name} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="p-3 text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-700">{idx + 1}</td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedStudent(name);
                          }}
                          className="font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:underline transition-all text-right"
                        >
                          {name}
                        </button>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
                          {stats.positive}
                        </span>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-bold">
                          {stats.negative}
                        </span>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-bold">
                          {stats.neutral}
                        </span>
                      </td>
                      <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 rounded-full text-sm font-bold">
                          {stats.total}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setSelectedStudent(name);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                        >
                          عرض الملاحظات
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* عرض الملاحظات التفصيلية للطالب المحدد */}
            {selectedStudent && !showBehaviorModal && (
              <div className="mt-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    الملاحظات السلوكية: {selectedStudent}
                  </h4>
                  <button
                    onClick={() => setSelectedStudent("")}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {getBehaviorStats(selectedStudent).uniqueNotes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-3 text-blue-300 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">لا توجد ملاحظات سلوكية مسجلة</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {getBehaviorStats(selectedStudent).uniqueNotes.map((note, i) => {
                      const positiveNotes = [
                        "متعاون مع زملائه",
                        "منظم في أدواته",
                        "حريص على النظافة",
                        "محترم للآخرين",
                        "نشيط ومشارك",
                        "يحافظ على الوقت",
                        "قيادي",
                        "مبادر",
                        "مهذب",
                        "متميز في السلوك"
                      ];
                      const negativeNotes = [
                        "يتحدث بدون إذن",
                        "يتأخر عن الحصة",
                        "لا يحضر أدواته",
                        "غير منظم",
                        "يشتت زملاءه",
                        "لا يلتزم بالزي",
                        "يستخدم الجوال",
                        "عدواني",
                        "يهمل واجباته",
                        "غير ملتزم"
                      ];
                      
                      const isPositive = positiveNotes.includes(note);
                      const isNegative = negativeNotes.includes(note);
                      
                      return (
                        <div
                          key={i}
                          className={`p-3 rounded-lg border-2 ${
                            isPositive
                              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                              : isNegative
                              ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
                              : "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-lg ${
                              isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-blue-600"
                            }`}>
                              {isPositive ? "✓" : isNegative ? "✗" : "•"}
                            </span>
                            <span className={`text-sm font-bold ${
                              isPositive
                                ? "text-green-700 dark:text-green-400"
                                : isNegative
                                ? "text-red-700 dark:text-red-400"
                                : "text-blue-700 dark:text-blue-400"
                            }`}>
                              {note}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-right border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
          <thead className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            <tr className="text-xs font-bold">
              <th className="p-2 border-l border-teal-400" rowSpan={2}>#</th>
              <th className="p-2 border-l border-teal-400" rowSpan={2}>اسم الطالب</th>
              <th className="p-2 border-l border-teal-400" rowSpan={2}>الحضور</th>
              <th className="p-2 border-l border-teal-400" colSpan={4}>الأعمال اليومية (40)</th>
              <th className="p-2 border-l border-teal-400" colSpan={2}>الفترات</th>
              <th className="p-2 border-l border-teal-400" rowSpan={2}>متوسط الفترتين<br/>(20)</th>
              <th className="p-2 border-l border-teal-400" colSpan={2}>الاختبار النهائي (40)</th>
              <th className="p-2 border-l border-teal-400" rowSpan={2}>المجموع<br/>(100)</th>
              <th className="p-2 border-l border-teal-400" rowSpan={2}>ملاحظات<br/>سلوكية</th>
              <th className="p-2" rowSpan={2}>ملاحظات</th>
            </tr>
            <tr className="text-xs">
              <th className="p-2 border-l border-teal-400">واجبات<br/>(10)</th>
              <th className="p-2 border-l border-teal-400">مشاريع<br/>(5)</th>
              <th className="p-2 border-l border-teal-400">أنشطة<br/>(10)</th>
              <th className="p-2 border-l border-teal-400">مشاركة<br/>(15)</th>
              <th className="p-2 border-l border-teal-400">ف1<br/>(20)</th>
              <th className="p-2 border-l border-teal-400">ف2<br/>(20)</th>
              <th className="p-2 border-l border-teal-400">استماع<br/>(10)</th>
              <th className="p-2 border-l border-teal-400">نهائي<br/>(30)</th>
            </tr>
          </thead>
          <tbody>
            {list.map((name, idx) => {
              const st: StudentGrades = followData?.[date]?.[String(currentClass)]?.[name] || defaultGrades();
              const total = calculateTotal(st);
              const periodsAvg = (st.firstPeriod + st.secondPeriod) / 2;

              return (
                <tr key={name} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 text-xs">
                  <td className="p-2 text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-700">{idx + 1}</td>
                  <td className="p-2 font-semibold text-gray-900 dark:text-white border-l border-gray-200 dark:border-gray-700 whitespace-nowrap">{name}</td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <select
                      value={st.attendance}
                      onChange={(e) => updateGrade(name, "attendance", e.target.value as AttendanceStatus)}
                      className={`w-full px-1 py-1 rounded text-xs font-bold border-2 ${
                        st.attendance === "حاضر"
                          ? "bg-green-50 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400"
                          : st.attendance === "غائب"
                          ? "bg-red-50 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      <option value="حاضر">✓ حاضر</option>
                      <option value="غائب">✗ غائب</option>
                      <option value="متأخر">⏱ متأخر</option>
                    </select>
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={st.homework}
                      onChange={(e) => updateGrade(name, "homework", Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={st.projects}
                      onChange={(e) => updateGrade(name, "projects", Math.min(5, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={st.classActivities}
                      onChange={(e) => updateGrade(name, "classActivities", Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={st.participation}
                      onChange={(e) => updateGrade(name, "participation", Math.min(15, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={st.firstPeriod}
                      onChange={(e) => updateGrade(name, "firstPeriod", Math.min(20, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={st.secondPeriod}
                      onChange={(e) => updateGrade(name, "secondPeriod", Math.min(20, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 font-bold text-blue-700 dark:text-blue-400 text-center">
                    {periodsAvg.toFixed(1)}
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={st.listeningAndSpeaking}
                      onChange={(e) => updateGrade(name, "listeningAndSpeaking", Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={st.finalExam}
                      onChange={(e) => updateGrade(name, "finalExam", Math.min(30, Math.max(0, parseFloat(e.target.value) || 0)))}
                      className="w-16 px-1 py-1 rounded border-2 bg-white dark:bg-slate-700 text-center text-xs"
                    />
                  </td>
                  <td className={`p-2 border-l border-gray-200 dark:border-gray-700 font-bold text-center text-sm ${
                    total >= 90 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    total >= 75 ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                    total >= 60 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}>
                    {total.toFixed(1)}
                  </td>
                  <td className="p-2 border-l border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => openBehaviorModal(name)}
                      className={`w-full px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                        st.behaviorNotes.length > 0
                          ? "bg-purple-500 text-white hover:bg-purple-600"
                          : "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                      }`}
                    >
                      {st.behaviorNotes.length > 0 ? `${st.behaviorNotes.length} ملاحظة` : "إضافة"}
                    </button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 rounded border-2 bg-white dark:bg-slate-700 text-xs"
                      value={st.notes}
                      onChange={(e) => updateGrade(name, "notes", e.target.value)}
                      placeholder="ملاحظة..."
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* مودال الملاحظات السلوكية */}
      {showBehaviorModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">الملاحظات السلوكية</h3>
                  <p className="text-purple-100 mt-1">{selectedStudent} - فصل {classes[currentClass].label}</p>
                </div>
                <button 
                  onClick={() => setShowBehaviorModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              {behaviorOptions.map((category) => (
                <div key={category.id} className="mb-6">
                  <h4 className={`text-lg font-bold mb-3 pb-2 border-b-2 ${
                    category.id === "positive" ? "text-green-700 dark:text-green-400 border-green-300" :
                    category.id === "negative" ? "text-red-700 dark:text-red-400 border-red-300" :
                    "text-blue-700 dark:text-blue-400 border-blue-300"
                  }`}>
                    {category.label}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.items.map((item) => {
                      const isSelected = followData?.[date]?.[String(currentClass)]?.[selectedStudent]?.behaviorNotes?.includes(item) || false;
                      return (
                        <button
                          key={item}
                          onClick={() => toggleBehaviorNote(selectedStudent, item)}
                          className={`text-right p-3 rounded-lg border-2 transition-all text-sm ${
                            isSelected 
                              ? category.id === "positive"
                                ? "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-900 dark:text-green-300 font-bold"
                                : category.id === "negative"
                                ? "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-900 dark:text-red-300 font-bold"
                                : "bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-300 font-bold"
                              : "bg-white dark:bg-slate-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected 
                                ? category.id === "positive"
                                  ? "bg-green-500 border-green-500"
                                  : category.id === "negative"
                                  ? "bg-red-500 border-red-500"
                                  : "bg-blue-500 border-blue-500"
                                : "border-gray-400"
                            }`}>
                              {isSelected && <span className="text-white text-xs">✓</span>}
                            </div>
                            <span>{item}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 dark:bg-slate-700/50 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {followData?.[date]?.[String(currentClass)]?.[selectedStudent]?.behaviorNotes?.length || 0} ملاحظة محددة
              </div>
              <button
                onClick={() => setShowBehaviorModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                حفظ وإغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <span className="font-bold text-gray-700 dark:text-gray-300">نظام التقييم:</span> الأعمال (40) + متوسط الفترتين (20) + النهائي (40) = 100 درجة
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>يتم الحفظ تلقائياً</span>
        </div>
      </div>
    </div>
  );
}

// مولد التقارير العامة - نسخة مطابقة لمولد تقارير الأداء الوظيفي
function GeneralReportsGenerator() {
  // بنود الأداء الوظيفي الـ 11 مع العناصر
  const performanceItemsWithElements = {
    "أداء الواجبات الوظيفية": [
      "الالتزام بالنظام الرسمي",
      "كتابة التحضير وفق الجدول الدراسي",
      "المشاركة في الإشراف والمناوبة وحصص الانتظار",
      "متابعة الواجبات والدروس والاختبارات",
      "المشاركة في الأنشطة اللاصفية في بيئة العمل",
      "المشاركة في برامج النشاط المدرسي"
    ],
    "التفاعل مع المجتمع المهني": [
      "المشاركة الفاعلة في مجتمعات التعلم المهنية",
      "الدروس التطبيقية وتبادل الزيارات",
      "التفاعل في الدورات والورش",
      "برامج الإنتاج المعرفي في التخصص"
    ],
    "التفاعل مع أولياء الأمور": [
      "التواصل الإيجابي مع أولياء الأمور",
      "توظيف وسائل وتطبيقات التقنية الحديثة",
      "إرسال الخطة الأسبوعية في وقت مبكر",
      "استخدام أنماط اتصالية متنوعة"
    ],
    "التنويع في استراتيجيات التدريس": [
      "استخدام استراتيجيات وطرائق التدريس",
      "استخدام أساليب تدريسية إبداعية وجاذبة"
    ],
    "تحسين نتائج المتعلمين": [
      "تشخيص مستوى إتقان الطلبة في المادة",
      "معالجة الفاقد التعليمي",
      "وضع الخطط العلاجية للطلاب الضعاف",
      "وضع الخطط الإثرائية للطلاب المتميزين",
      "تكريم الطلاب المتميزين"
    ],
    "إعداد وتنفيذ خطة التعلم": [
      "اكتمال الواجبات والاختبارات",
      "تنفيذ الدروس وفق الجداول"
    ],
    "توظيف تقنيات ووسائل التعلم": [
      "التنويع في الوسائل التعليمية",
      "توظيف وسائل وتطبيقات تقنية ومعلوماتية",
      "تفعيل التعلم بمصادر التعلم المختلفة"
    ],
    "تهيئة البيئة التعليمية": [
      "مراعاة الفروق الفردية وحاجات الطلاب",
      "تحفيز الطلاب مادياً ومعنوياً",
      "تفعيل أدوات متنوعة في الدرس"
    ],
    "الإدارة الصفية": [
      "ضبط سلوك الطلاب في الحصة",
      "أداء الطلاب في الأنشطة بشكل متعاون أو فردي",
      "إشراك الطلاب في ضبط القواعد الصفية"
    ],
    "تحليل نتائج المتعلمين": [
      "استخدام نتائج التقويم في التخطيط",
      "تحليل نتائج الطلاب وتشخيص مستوياتهم",
      "تقديم التغذية الراجعة"
    ],
    "تنوع أساليب التقويم": [
      "التنويع في أساليب التقويم",
      "استخدام التقويم التكويني والختامي",
      "توظيف التقويم الإلكتروني",
      "الالتزام بتعليمات ولوائح الاختبارات"
    ]
  };

  const [formData, setFormData] = useState({
    teacherName: "عبدالله حسن الفيفي",
    schoolName: "مدرسة ابن سيناء المتوسطة وبرنامجي العوق الفكري والتوحد",
    principalName: "احمد علي كريري",
    academicYear: "1447",
    performanceItem: "", // المعيار من معايير الأداء الوظيفي
    performanceElement: "", // المؤشر من مؤشرات المعيار
    programName: "", // اسم البرنامج
    programGoals: [] as string[], // أهداف البرنامج (مصفوفة)
    executionDay: "", // يوم التنفيذ
    executionMonth: "", // شهر التنفيذ
    executionYear: "", // سنة التنفيذ
    targetAudience: "" // المستهدفون
  });

  const [images, setImages] = useState<{
    img1: string | null;
    img2: string | null;
    img3: string | null;
    img4: string | null;
  }>({
    img1: null,
    img2: null,
    img3: null,
    img4: null
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const reportPreviewRef = useRef<HTMLDivElement | null>(null);
  const [logoImage, setLogoImage] = useState<string>("");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBarcodeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBarcodeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (imageKey: 'img1' | 'img2' | 'img3' | 'img4', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({
          ...prev,
          [imageKey]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // تغيير عنوان الصفحة عند المعاينة
  useEffect(() => {
    if (showPreview && formData.programName) {
      const originalTitle = document.title;
      document.title = `تقرير ${formData.programName} - ${formData.schoolName}`;
      return () => {
        document.title = originalTitle;
      };
    }
  }, [showPreview, formData.programName, formData.schoolName]);

  // نموذج المعاينة
  if (showPreview) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <style>{`
          @media print {
            /* إخفاء كل شيء ماعدا التقرير */
            body * {
              visibility: hidden;
            }
            
            /* إظهار التقرير وجميع محتوياته */
            #general-report-preview,
            #general-report-preview * {
              visibility: visible !important;
            }
            
            /* تنسيق الصفحة - ملء كامل بدون هوامش */
            @page {
              size: A4 portrait;
              margin: 0;
            }
            
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              height: 100% !important;
            }
            
            /* التقرير يملأ الصفحة بالكامل */
            #general-report-preview {
              position: absolute !important;
              left: 0 !important;
              right: 0 !important;
              top: 0 !important;
              bottom: 0 !important;
              transform: none !important;
              width: 100% !important;
              max-width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              box-shadow: none !important;
              border-width: 0 !important;
              border-radius: 0 !important;
            }
            
            #general-report-preview.sheet {
              border: none !important;
            }
            
            /* إخفاء عناصر التحكم */
            .no-print {
              display: none !important;
              visibility: hidden !important;
            }
            
            /* ضمان طباعة الألوان */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            /* تنسيق الهيدر - تقليل إلى الحد الأدنى */
            .print-header {
              background-color: #15445A !important;
              border-radius: 0 !important;
              page-break-after: avoid !important;
              padding: 0.3rem 0.75rem !important;
            }
            
            /* تنسيق قسم اسم المدرسة - تقليل إلى الحد الأدنى */
            #general-report-preview > div:nth-child(2) {
              background-color: #15445A !important;
              padding: 0.2rem 0.75rem !important;
            }
            
            /* تنسيق محتوى التقرير - تقليل إلى الحد الأدنى */
            #general-report-preview > div:nth-child(3) {
              padding: 0.5rem !important;
            }
            
            /* تنسيق الشبكات (Grid) - تقليل الفجوات إلى الحد الأدنى */
            .grid {
              display: grid !important;
              gap: 0.25rem !important;
            }
            
            .grid-cols-2,
            .md\\:grid-cols-2,
            .sm\\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
            
            .grid-cols-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
            
            /* تنسيق الحدود والصناديق */
            .border-2 {
              border-width: 2px !important;
            }
            
            .border-gray-800 {
              border-color: #1f2937 !important;
            }
            
            .border-black {
              border-color: #000000 !important;
            }
            
            .rounded-lg {
              border-radius: 8px !important;
            }
            
            /* تنسيق النصوص - تقليل أكثر للطباعة */
            #general-report-preview .text-sm {
              font-size: 0.7rem !important;
              line-height: 0.9rem !important;
            }
            
            #general-report-preview .text-base {
              font-size: 0.8rem !important;
              line-height: 1.1rem !important;
            }
            
            #general-report-preview .text-xl {
              font-size: 0.95rem !important;
              line-height: 1.3rem !important;
            }
            
            #general-report-preview .text-2xl {
              font-size: 1.1rem !important;
              line-height: 1.5rem !important;
            }
            
            #general-report-preview .text-3xl {
              font-size: 1.3rem !important;
              line-height: 1.7rem !important;
            }
            
            #general-report-preview .text-lg {
              font-size: 0.85rem !important;
              line-height: 1.2rem !important;
            }
            
            .text-gray-700 {
              color: #374151 !important;
            }
            
            .text-gray-900 {
              color: #111827 !important;
            }
            
            .text-white {
              color: #ffffff !important;
            }
            
            /* تنسيق الصور - مطابق للمعاينة */
            img {
              max-width: 100% !important;
              height: auto !important;
              page-break-inside: avoid !important;
            }
            
            #general-report-preview .aspect-square img {
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
            }
            
            /* تنسيق الأيقونات - تقليل الحجم */
            #general-report-preview .w-6 {
              width: 0.85rem !important;
              height: 0.85rem !important;
            }
            
            #general-report-preview .max-w-2xl {
              max-width: 42rem !important;
            }
            
            /* المسافات - تقليل إلى الحد الأدنى */
            #general-report-preview .gap-3 {
              gap: 0.25rem !important;
            }
            
            #general-report-preview .gap-2 {
              gap: 0.2rem !important;
            }
            
            #general-report-preview .gap-1\\.5 {
              gap: 0.15rem !important;
            }
            
            #general-report-preview .gap-4 {
              gap: 0.3rem !important;
            }
            
            #general-report-preview .mb-6 {
              margin-bottom: 0.3rem !important;
            }
            
            #general-report-preview .mb-4 {
              margin-bottom: 0.25rem !important;
            }
            
            #general-report-preview .mb-2 {
              margin-bottom: 0.15rem !important;
            }
            
            #general-report-preview .mb-1\\.5 {
              margin-bottom: 0.1rem !important;
            }
            
            #general-report-preview .mb-1 {
              margin-bottom: 0.1rem !important;
            }
            
            #general-report-preview .mb-0\\.5 {
              margin-bottom: 0.05rem !important;
            }
            
            #general-report-preview .mt-1 {
              margin-top: 0.1rem !important;
            }
            
            #general-report-preview .mt-0\\.5 {
              margin-top: 0.05rem !important;
            }
            
            #general-report-preview .mt-4 {
              margin-top: 0.2rem !important;
            }
            
            #general-report-preview .mt-2 {
              margin-top: 0.15rem !important;
            }
            
            #general-report-preview .p-3 {
              padding: 0.3rem !important;
            }
            
            #general-report-preview .p-2 {
              padding: 0.2rem !important;
            }
            
            #general-report-preview .p-1\\.5 {
              padding: 0.15rem !important;
            }
            
            #general-report-preview .p-1 {
              padding: 0.1rem !important;
            }
            
            #general-report-preview .p-4 {
              padding: 0.35rem !important;
            }
            
            #general-report-preview .p-6 {
              padding: 0.4rem !important;
            }
            
            #general-report-preview .pt-2 {
              padding-top: 0.15rem !important;
            }
            
            #general-report-preview .pb-2 {
              padding-bottom: 0.15rem !important;
            }
            
            #general-report-preview .py-2 {
              padding-top: 0.15rem !important;
              padding-bottom: 0.15rem !important;
            }
            
            #general-report-preview .px-4 {
              padding-left: 0.35rem !important;
              padding-right: 0.35rem !important;
            }
            
            #general-report-preview .px-6 {
              padding-left: 0.4rem !important;
              padding-right: 0.4rem !important;
            }
            
            #general-report-preview .space-y-2 > * + * {
              margin-top: 0.15rem !important;
            }
            
            #general-report-preview .space-y-4 > * + * {
              margin-top: 0.2rem !important;
            }
            
            #general-report-preview .space-y-6 > * + * {
              margin-top: 0.25rem !important;
            }
            
            /* تقليل ارتفاع صور الشواهد بشكل أكبر */
            #general-report-preview .aspect-square {
              height: 90px !important;
            }
            
            /* تقليل المسافة حول الصور */
            #general-report-preview .border-dashed {
              padding: 0.2rem !important;
            }
            
            /* تقليل مسافة الشبكة بين الصور */
            #general-report-preview .md\\:grid-cols-2 {
              gap: 0.2rem !important;
            }
            
            #general-report-preview .sm\\:grid-cols-2 {
              gap: 0.2rem !important;
            }
            
            /* تقليل الحدود */
            #general-report-preview .border-2 {
              border-width: 1px !important;
            }
            
            /* منع تقطيع العناصر */
            .border-2, 
            .rounded-lg,
            .grid > div {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            /* تنسيق Footer - تقليل الـ padding */
            #general-report-preview > div:last-child {
              padding: 0.3rem !important;
            }
            
            .grid-cols-1.sm\\:grid-cols-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
            
            /* إزالة الظلال والتأثيرات */
            * {
              box-shadow: none !important;
              text-shadow: none !important;
            }
            
            /* طباعة الخلفيات */
            div[style*="backgroundColor"] {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
          
          /* طباعة من الهاتف - بدون هوامش */
          @media print and (max-width: 600px) {
            @page {
              margin: 0;
            }
            
            html, body {
              margin: 0 !important;
              padding: 0 !important;
            }
            
            #general-report-preview {
              position: absolute !important;
              left: 0 !important;
              right: 0 !important;
              top: 0 !important;
              bottom: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        `}</style>

        <div className="no-print mb-6 flex gap-4">
          <button
            onClick={() => setShowPreview(false)}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            العودة للتعديل
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            طباعة / حفظ PDF
          </button>
        </div>

        <div id="general-report-preview" ref={reportPreviewRef} className="sheet bg-white max-w-4xl mx-auto border-4 border-gray-300" style={{ fontFamily: "'Helvetica Neue W23', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
          {/* Header */}
          <div className="text-white px-4 sm:px-8 py-4 sm:py-6 print-header" style={{ backgroundColor: '#15445A' }}>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {/* الشعار في المنتصف */}
              <div className="bg-[#1a4d5e] rounded-lg flex items-center justify-center p-2" style={{ minWidth: '64px', minHeight: '64px' }}>
                {logoImage ? (
                  <img src={logoImage} alt="وزارة التعليم" className="object-contain" style={{ maxWidth: '120px', maxHeight: '100px' }} />
                ) : (
                  <div className="text-white text-xs text-center">ضع الشعار</div>
                )}
              </div>
              
              {/* النصوص في المنتصف */}
              <div className="text-center leading-tight">
                <div className="text-sm sm:text-base font-bold">المملكة العربية السعودية</div>
                <div className="text-sm sm:text-base font-bold mt-1">وزارة التعليم</div>
                <div className="text-sm sm:text-base font-bold">الإدارة العامة للتعليم بمنطقة جازان</div>
              </div>
            </div>
          </div>

          {/* اسم المدرسة - ملاصق للهيدر */}
          <div className="text-center text-white py-2 px-4 sm:px-6" style={{ backgroundColor: '#15445A' }}>
            <h1 className="text-xl sm:text-2xl font-bold">{formData.schoolName}</h1>
          </div>

          {/* محتوى التقرير */}
          <div className="p-2 sm:p-3 space-y-2">
            {/* البيانات الأساسية */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-2 border border-teal-200">
              {/* اسم البرنامج وأهداف البرنامج جنباً إلى جنب */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 pb-2 border-b border-teal-300">
                <div className="text-sm">
                  <span className="font-bold text-gray-700">اسم البرنامج:</span>
                  <div className="text-gray-900 mt-0.5">{formData.programName}</div>
                </div>
                {formData.programGoals.length > 0 && (
                  <div className="text-sm">
                    <span className="font-bold text-gray-700">أهداف البرنامج:</span>
                    <ul className="list-disc list-inside mr-4 mt-0.5">
                      {formData.programGoals.map((goal, index) => (
                        <li key={index} className="text-gray-900">{goal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* المعيار والمؤشر في صف واحد */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-1.5">
                <div className="flex gap-1">
                  <span className="font-bold text-gray-700">المعيار:</span>
                  <span className="text-gray-900">{formData.performanceItem}</span>
                </div>
                <div className="flex gap-1">
                  <span className="font-bold text-gray-700">المؤشر:</span>
                  <span className="text-gray-900">{formData.performanceElement}</span>
                </div>
              </div>
              
              {/* تاريخ التنفيذ والمستهدفون في صف واحد */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex gap-1">
                  <span className="font-bold text-gray-700">تاريخ التنفيذ:</span>
                  <span className="text-gray-900">{formData.executionDay}/{formData.executionMonth}/{formData.executionYear} هـ</span>
                </div>
                <div className="flex gap-1">
                  <span className="font-bold text-gray-700">المستهدفون:</span>
                  <span className="text-gray-900">{formData.targetAudience}</span>
                </div>
              </div>
            </div>

            {/* الشواهد (4 صور بنسبة عرض مضاعف وارتفاع 1.5x) */}
            <div className="grid gap-1.5 grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto">
              {(['img1', 'img2', 'img3', 'img4'] as const).map((imgKey, index) => {
                const colors = [
                  { bg: 'from-blue-600 to-blue-700', border: 'border-blue-200', bgLight: 'bg-blue-50/50' },
                  { bg: 'from-green-600 to-green-700', border: 'border-green-200', bgLight: 'bg-green-50/50' },
                  { bg: 'from-orange-600 to-orange-700', border: 'border-orange-200', bgLight: 'bg-orange-50/50' },
                  { bg: 'from-purple-600 to-purple-700', border: 'border-purple-200', bgLight: 'bg-purple-50/50' }
                ];
                const color = colors[index];

                return (
                  <div key={imgKey} className={`border ${color.border} rounded p-1 ${color.bgLight}`}>
                    <div className={`bg-white rounded p-1 border border-dashed ${color.border} flex items-center justify-center`} style={{ aspectRatio: '16 / 9' }}>
                      {images[imgKey] ? (
                        <img
                          src={images[imgKey]!}
                          alt={`الشاهد ${index + 1}`}
                          className="max-w-full max-h-full object-cover rounded"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <span className="text-xl">📸</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* التوقيعات */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-200">
              <div className="text-right">
                <p className="text-gray-600 font-semibold mb-0.5 text-sm">المعلم</p>
                <p className="text-sm sm:text-base font-bold text-gray-800">{formData.teacherName}</p>
                {signatureImage && (
                  <img 
                    src={signatureImage} 
                    alt="توقيع"
                    className="h-20 object-contain ml-0 mt-1"
                  />
                )}
              </div>
              
              {/* الباركود في المنتصف */}
              <div className="flex items-center justify-center">
                {barcodeImage && (
                  <button
                    onClick={() => setShowBarcodeModal(true)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    title="اضغط لتكبير الباركود"
                  >
                    <img src={barcodeImage} alt="باركود" className="w-32 h-32 object-contain" />
                  </button>
                )}
              </div>
              
              <div className="text-left">
                <p className="text-gray-600 font-semibold mb-0.5 text-sm">مدير المدرسة</p>
                <p className="text-sm sm:text-base font-bold text-gray-800">{formData.principalName}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-white p-1.5 text-center bg-gradient-to-r from-[#3D7EB9] via-[#0DA9A6] to-[#07A869]">
            <p className="text-sm font-bold">العام الدراسي {formData.academicYear} هـ</p>
          </div>
        </div>
      </div>
    );
  }

  // نموذج إدخال البيانات
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Modal للباركود */}
      {showBarcodeModal && barcodeImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setShowBarcodeModal(false)}
        >
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowBarcodeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">الباركود</h3>
            <div className="flex justify-center">
              <img src={barcodeImage} alt="باركود" className="max-w-full max-h-96 object-contain" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">يمكنك مسح الباركود ضوئياً للوصول للمعلومات</p>
          </div>
        </div>
      )}
      
      {/* معاينة PDF المتقدمة */}
      {showPDFPreview && (
        <PDFPreview
          contentRef={reportPreviewRef}
          fileName={`تقرير-${formData.teacherName || 'عام'}.pdf`}
          onClose={() => setShowPDFPreview(false)}
        />
      )}
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">التقارير العامة</h2>
        <p className="text-gray-600 dark:text-gray-400">املأ النموذج لإنشاء تقرير توثيق مهني</p>
      </div>

      <div className="space-y-6">
        {/* البيانات الأساسية */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">البيانات الأساسية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المعلم</label>
              <input
                type="text"
                value={formData.teacherName}
                onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم مدير المدرسة</label>
              <input
                type="text"
                value={formData.principalName}
                onChange={(e) => setFormData({...formData, principalName: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المدرسة</label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العام الدراسي</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                placeholder="1447"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* بيانات البرنامج */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">بيانات البرنامج</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المعيار من معايير الأداء الوظيفي</label>
              <select
                value={formData.performanceItem}
                onChange={(e) => {
                  setFormData({...formData, performanceItem: e.target.value, performanceElement: ""});
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="">اختر المعيار</option>
                {Object.keys(performanceItemsWithElements).map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            {formData.performanceItem && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المؤشر</label>
                <select
                  value={formData.performanceElement}
                  onChange={(e) => setFormData({...formData, performanceElement: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">اختر المؤشر</option>
                  {performanceItemsWithElements[formData.performanceItem as keyof typeof performanceItemsWithElements]?.map((element, index) => (
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم البرنامج</label>
              <input
                type="text"
                value={formData.programName}
                onChange={(e) => setFormData({...formData, programName: e.target.value})}
                placeholder="مثال: برنامج تحفيز التفوق الدراسي"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">أهداف البرنامج</label>
              <div className="space-y-2">
                {formData.programGoals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => {
                        const newGoals = [...formData.programGoals];
                        newGoals[index] = e.target.value;
                        setFormData({...formData, programGoals: newGoals});
                      }}
                      placeholder={`الهدف ${index + 1}`}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => {
                        const newGoals = formData.programGoals.filter((_, i) => i !== index);
                        setFormData({...formData, programGoals: newGoals});
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setFormData({...formData, programGoals: [...formData.programGoals, ""]})}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  إضافة هدف
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تاريخ التنفيذ (هجري)</label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <select
                    value={formData.executionDay}
                    onChange={(e) => setFormData({...formData, executionDay: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    <option value="">اليوم</option>
                    {Array.from({length: 30}, (_, i) => i + 1).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={formData.executionMonth}
                    onChange={(e) => setFormData({...formData, executionMonth: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    <option value="">الشهر</option>
                    <option value="1">محرم</option>
                    <option value="2">صفر</option>
                    <option value="3">ربيع الأول</option>
                    <option value="4">ربيع الثاني</option>
                    <option value="5">جمادى الأولى</option>
                    <option value="6">جمادى الآخرة</option>
                    <option value="7">رجب</option>
                    <option value="8">شعبان</option>
                    <option value="9">رمضان</option>
                    <option value="10">شوال</option>
                    <option value="11">ذو القعدة</option>
                    <option value="12">ذو الحجة</option>
                  </select>
                </div>
                <div>
                  <select
                    value={formData.executionYear}
                    onChange={(e) => setFormData({...formData, executionYear: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    <option value="">السنة</option>
                    {Array.from({length: 10}, (_, i) => 1445 + i).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المستهدفون</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                placeholder="مثال: طلاب الصف الثالث المتوسط"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Logo and Signature Upload Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            الشعار والتوقيع
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">شعار وزارة التعليم:</label>
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center bg-white dark:bg-slate-800">
                {logoImage ? (
                  <div className="relative">
                    <img 
                      src={logoImage} 
                      alt="شعار وزارة التعليم" 
                      className="max-w-full h-auto object-contain mx-auto mb-3"
                      style={{maxHeight: '200px'}}
                    />
                    <button
                      onClick={() => setLogoImage("")}
                      className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      حذف الصورة
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <svg className="w-12 h-12 mx-auto text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">انقر لرفع صورة الشعار</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG أو SVG</p>
                  </label>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">توقيع المعلم:</label>
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center bg-white dark:bg-slate-800">
                {signatureImage ? (
                  <div className="relative">
                    <img 
                      src={signatureImage} 
                      alt="توقيع المعلم" 
                      className="max-h-24 mx-auto object-contain mb-3"
                    />
                    <button
                      onClick={() => setSignatureImage("")}
                      className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      حذف الصورة
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                    <svg className="w-12 h-12 mx-auto text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">انقر لرفع صورة التوقيع</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG أو SVG</p>
                  </label>
                )}
              </div>
            </div>
          </div>
          
          {/* مربع رفع الباركود */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">باركود التقرير (اختياري):</label>
            <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center max-w-xs mx-auto bg-white dark:bg-slate-800">
              {barcodeImage ? (
                <div className="relative">
                  <img src={barcodeImage} alt="الباركود" className="w-32 h-32 mx-auto object-contain" />
                  <button
                    onClick={() => setBarcodeImage("")}
                    className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    حذف الباركود
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBarcodeUpload}
                    className="hidden"
                  />
                  <div className="text-blue-600 dark:text-blue-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="font-semibold">انقر لرفع صورة الباركود</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG</p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* رفع الشواهد (4 صور) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">الشواهد (4 صور)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['img1', 'img2', 'img3', 'img4'] as const).map((imgKey, index) => (
              <div key={imgKey} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الشاهد {index + 1}
                </label>
                {images[imgKey] ? (
                  <div className="relative">
                    <img src={images[imgKey]!} alt={`الشاهد ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                    <button
                      onClick={() => setImages({...images, [imgKey]: null})}
                      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(imgKey, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* أزرار المعاينة */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all font-bold text-lg"
          >
            معاينة HTML 👁️
          </button>
          
          <button
            onClick={() => setShowPDFPreview(true)}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all font-bold text-lg flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            معاينة PDF المتقدمة 📄
          </button>
        </div>
        
        {/* نسخة مخفية من المحتوى للـ PDF - دائماً موجودة */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '210mm', 
          opacity: 0, 
          pointerEvents: 'none',
          zIndex: -1
        }}>
          <div id="general-report-preview" ref={reportPreviewRef} className="sheet bg-white" style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Helvetica Neue W23', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            {/* Header */}
            <div className="text-white px-4 sm:px-8 py-4 sm:py-6" style={{ backgroundColor: '#15445A' }}>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="bg-[#1a4d5e] rounded-lg flex items-center justify-center p-2" style={{ minWidth: '64px', minHeight: '64px' }}>
                  {logoImage ? (
                    <img src={logoImage} alt="وزارة التعليم" className="object-contain" style={{ maxWidth: '120px', maxHeight: '100px' }} />
                  ) : (
                    <div className="text-white text-xs text-center">ضع الشعار</div>
                  )}
                </div>
                <div className="text-center leading-tight">
                  <div className="text-sm sm:text-base font-bold">المملكة العربية السعودية</div>
                  <div className="text-sm sm:text-base font-bold mt-1">وزارة التعليم</div>
                  <div className="text-sm sm:text-base font-bold">الإدارة العامة للتعليم بمنطقة جازان</div>
                </div>
              </div>
            </div>

            <div className="text-center text-white py-2 px-4 sm:px-6" style={{ backgroundColor: '#15445A' }}>
              <h1 className="text-xl sm:text-2xl font-bold">{formData.schoolName}</h1>
            </div>

            <div className="p-2 sm:p-3 space-y-2">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-2 border border-teal-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 pb-2 border-b border-teal-300">
                  <div className="text-sm">
                    <span className="font-bold text-gray-700">اسم البرنامج:</span>
                    <div className="text-gray-900 mt-0.5">{formData.programName}</div>
                  </div>
                  {formData.programGoals.length > 0 && (
                    <div className="text-sm">
                      <span className="font-bold text-gray-700">أهداف البرنامج:</span>
                      <ul className="list-disc list-inside mr-4 mt-0.5">
                        {formData.programGoals.map((goal, index) => (
                          <li key={index} className="text-gray-900">{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-1.5">
                  <div className="flex gap-1">
                    <span className="font-bold text-gray-700">المعيار:</span>
                    <span className="text-gray-900">{formData.performanceItem}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-bold text-gray-700">المؤشر:</span>
                    <span className="text-gray-900">{formData.performanceElement}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex gap-1">
                    <span className="font-bold text-gray-700">تاريخ التنفيذ:</span>
                    <span className="text-gray-900">{formData.executionDay}/{formData.executionMonth}/{formData.executionYear} هـ</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-bold text-gray-700">المستهدفون:</span>
                    <span className="text-gray-900">{formData.targetAudience}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-1.5 grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto">
                {(['img1', 'img2', 'img3', 'img4'] as const).map((imgKey, index) => {
                  const colors = [
                    { bg: 'from-blue-600 to-blue-700', border: 'border-blue-200', bgLight: 'bg-blue-50/50' },
                    { bg: 'from-green-600 to-green-700', border: 'border-green-200', bgLight: 'bg-green-50/50' },
                    { bg: 'from-orange-600 to-orange-700', border: 'border-orange-200', bgLight: 'bg-orange-50/50' },
                    { bg: 'from-purple-600 to-purple-700', border: 'border-purple-200', bgLight: 'bg-purple-50/50' }
                  ];
                  const color = colors[index];
                  return (
                    <div key={imgKey} className={`border ${color.border} rounded p-1 ${color.bgLight}`}>
                      <div className={`bg-white rounded p-1 border border-dashed ${color.border} flex items-center justify-center`} style={{ aspectRatio: '16 / 9' }}>
                        {images[imgKey] ? (
                          <img src={images[imgKey]!} alt={`الشاهد ${index + 1}`} className="max-w-full max-h-full object-cover rounded" />
                        ) : (
                          <div className="text-center text-gray-400"><span className="text-xl">📸</span></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-200">
                <div className="text-right">
                  <p className="text-gray-600 font-semibold mb-0.5 text-sm">المعلم</p>
                  <p className="text-sm sm:text-base font-bold text-gray-800">{formData.teacherName}</p>
                  {signatureImage && <img src={signatureImage} alt="توقيع" className="h-20 object-contain ml-0 mt-1" />}
                </div>
                <div className="flex items-center justify-center">
                  {barcodeImage && <img src={barcodeImage} alt="باركود" className="w-32 h-32 object-contain" />}
                </div>
                <div className="text-left">
                  <p className="text-gray-600 font-semibold mb-0.5 text-sm">مدير المدرسة</p>
                  <p className="text-sm sm:text-base font-bold text-gray-800">{formData.principalName}</p>
                </div>
              </div>
            </div>

            <div className="text-white p-1.5 text-center bg-gradient-to-r from-[#3D7EB9] via-[#0DA9A6] to-[#07A869]">
              <p className="text-sm font-bold">العام الدراسي {formData.academicYear} هـ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
