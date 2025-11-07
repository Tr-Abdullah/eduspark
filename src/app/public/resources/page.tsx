"use client";

import Link from "next/link";
import { useState } from "react";

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["الكل", "كتب ومراجع", "أوراق عمل", "عروض تقديمية", "فيديوهات", "ملفات صوتية", "ألعاب تعليمية", "خطط دروس", "اختبارات"];

  const resources = [
    // كتب ومراجع
    {
      id: 1,
      title: "Super Goal 3 - Student Book",
      category: "كتب ومراجع",
      description: "كتاب الطالب الأساسي للصف الأول متوسط - النسخة الرقمية التفاعلية",
      icon: "📘",
      downloadLink: "#",
      size: "45 MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Super Goal 3 - Teacher's Guide",
      category: "كتب ومراجع",
      description: "دليل المعلم الشامل مع الحلول والإرشادات التدريسية",
      icon: "📗",
      downloadLink: "#",
      size: "32 MB",
      format: "PDF"
    },
    {
      id: 3,
      title: "Grammar Reference Guide",
      category: "كتب ومراجع",
      description: "مرجع شامل لقواعد اللغة الإنجليزية بأسلوب مبسط",
      icon: "📙",
      downloadLink: "#",
      size: "15 MB",
      format: "PDF"
    },
    {
      id: 4,
      title: "Vocabulary Builder",
      category: "كتب ومراجع",
      description: "بنك المفردات التفاعلي - أكثر من 2000 كلمة مع الأمثلة",
      icon: "📕",
      downloadLink: "#",
      size: "8 MB",
      format: "PDF"
    },

    // أوراق عمل
    {
      id: 5,
      title: "Unit 1 - Lifestyles Worksheets",
      category: "أوراق عمل",
      description: "مجموعة أوراق عمل شاملة للوحدة الأولى (25 ورقة عمل)",
      icon: "📄",
      downloadLink: "#",
      size: "12 MB",
      format: "PDF"
    },
    {
      id: 6,
      title: "Grammar Practice Worksheets",
      category: "أوراق عمل",
      description: "تمارين متدرجة على قواعد اللغة - المستويات الثلاثة",
      icon: "✍️",
      downloadLink: "#",
      size: "18 MB",
      format: "PDF + DOCX"
    },
    {
      id: 7,
      title: "Reading Comprehension Collection",
      category: "أوراق عمل",
      description: "50 قطعة فهم مقروء متدرجة مع الأسئلة",
      icon: "📖",
      downloadLink: "#",
      size: "22 MB",
      format: "PDF"
    },
    {
      id: 8,
      title: "Writing Skills Worksheets",
      category: "أوراق عمل",
      description: "أوراق عمل لتطوير مهارات الكتابة - 30 نشاط",
      icon: "✏️",
      downloadLink: "#",
      size: "14 MB",
      format: "PDF"
    },

    // عروض تقديمية
    {
      id: 9,
      title: "Unit 1 - PowerPoint Presentation",
      category: "عروض تقديمية",
      description: "عرض تقديمي تفاعلي كامل للوحدة الأولى",
      icon: "🎞️",
      downloadLink: "#",
      size: "85 MB",
      format: "PPTX"
    },
    {
      id: 10,
      title: "Grammar Visual Presentations",
      category: "عروض تقديمية",
      description: "عروض بصرية لشرح القواعد بأسلوب جذاب",
      icon: "🎨",
      downloadLink: "#",
      size: "120 MB",
      format: "PPTX"
    },
    {
      id: 11,
      title: "Vocabulary Flashcards - Digital",
      category: "عروض تقديمية",
      description: "بطاقات تعليمية رقمية تفاعلية للمفردات",
      icon: "🎴",
      downloadLink: "#",
      size: "95 MB",
      format: "PPTX"
    },

    // فيديوهات تعليمية
    {
      id: 12,
      title: "Unit 1 - Introduction Video",
      category: "فيديوهات",
      description: "فيديو تعريفي شامل للوحدة الأولى (15 دقيقة)",
      icon: "🎬",
      downloadLink: "#",
      size: "280 MB",
      format: "MP4"
    },
    {
      id: 13,
      title: "Grammar Explained - Video Series",
      category: "فيديوهات",
      description: "سلسلة فيديوهات لشرح القواعد (12 فيديو)",
      icon: "📹",
      downloadLink: "#",
      size: "1.2 GB",
      format: "MP4"
    },
    {
      id: 14,
      title: "Pronunciation Guide Videos",
      category: "فيديوهات",
      description: "دليل فيديو للنطق الصحيح - جميع الأصوات",
      icon: "🎥",
      downloadLink: "#",
      size: "450 MB",
      format: "MP4"
    },
    {
      id: 15,
      title: "Listening Practice Videos",
      category: "فيديوهات",
      description: "فيديوهات لتطوير مهارات الاستماع - 20 حوار",
      icon: "🎞️",
      downloadLink: "#",
      size: "680 MB",
      format: "MP4"
    },

    // ملفات صوتية
    {
      id: 16,
      title: "Student Book Audio Files",
      category: "ملفات صوتية",
      description: "جميع التسجيلات الصوتية من كتاب الطالب",
      icon: "🎵",
      downloadLink: "#",
      size: "320 MB",
      format: "MP3"
    },
    {
      id: 17,
      title: "Listening Comprehension Tests",
      category: "ملفات صوتية",
      description: "اختبارات الاستماع مع النصوص والأجوبة",
      icon: "🎧",
      downloadLink: "#",
      size: "180 MB",
      format: "MP3"
    },
    {
      id: 18,
      title: "Pronunciation Practice Audio",
      category: "ملفات صوتية",
      description: "تسجيلات صوتية لممارسة النطق",
      icon: "🎤",
      downloadLink: "#",
      size: "95 MB",
      format: "MP3"
    },
    {
      id: 19,
      title: "Dialogues and Conversations",
      category: "ملفات صوتية",
      description: "حوارات واقعية لتطوير مهارات المحادثة",
      icon: "💬",
      downloadLink: "#",
      size: "210 MB",
      format: "MP3"
    },

    // ألعاب تعليمية
    {
      id: 20,
      title: "Vocabulary Games Pack",
      category: "ألعاب تعليمية",
      description: "مجموعة ألعاب تفاعلية لحفظ المفردات",
      icon: "🎮",
      downloadLink: "#",
      size: "45 MB",
      format: "HTML5"
    },
    {
      id: 21,
      title: "Grammar Quiz Games",
      category: "ألعاب تعليمية",
      description: "ألعاب تنافسية لممارسة القواعد",
      icon: "🎯",
      downloadLink: "#",
      size: "38 MB",
      format: "HTML5"
    },
    {
      id: 22,
      title: "Word Puzzles Collection",
      category: "ألعاب تعليمية",
      description: "ألغاز الكلمات - 50 لغز متدرج",
      icon: "🧩",
      downloadLink: "#",
      size: "25 MB",
      format: "PDF"
    },
    {
      id: 23,
      title: "Interactive Spelling Bee",
      category: "ألعاب تعليمية",
      description: "لعبة تفاعلية للتدريب على الإملاء",
      icon: "🐝",
      downloadLink: "#",
      size: "32 MB",
      format: "HTML5"
    },

    // خطط دروس
    {
      id: 24,
      title: "Complete Unit Plans - All Units",
      category: "خطط دروس",
      description: "خطط دروس تفصيلية لجميع الوحدات الدراسية",
      icon: "📋",
      downloadLink: "#",
      size: "28 MB",
      format: "DOCX"
    },
    {
      id: 25,
      title: "Differentiated Instruction Plans",
      category: "خطط دروس",
      description: "خطط دروس مع أنشطة متنوعة حسب المستويات",
      icon: "📝",
      downloadLink: "#",
      size: "35 MB",
      format: "DOCX"
    },
    {
      id: 26,
      title: "Project-Based Learning Activities",
      category: "خطط دروس",
      description: "أنشطة تعلم قائمة على المشاريع - 15 مشروع",
      icon: "🏗️",
      downloadLink: "#",
      size: "42 MB",
      format: "PDF"
    },

    // اختبارات وتقييم
    {
      id: 27,
      title: "Diagnostic Tests - Entry Level",
      category: "اختبارات",
      description: "اختبارات تشخيصية لتحديد مستوى الطلاب",
      icon: "📊",
      downloadLink: "#",
      size: "15 MB",
      format: "PDF"
    },
    {
      id: 28,
      title: "Formative Assessment Tools",
      category: "اختبارات",
      description: "أدوات التقييم التكويني المستمر",
      icon: "✅",
      downloadLink: "#",
      size: "18 MB",
      format: "PDF + DOCX"
    },
    {
      id: 29,
      title: "Unit Tests with Answer Keys",
      category: "اختبارات",
      description: "اختبارات نهاية الوحدة مع نماذج الإجابة",
      icon: "📝",
      downloadLink: "#",
      size: "22 MB",
      format: "PDF"
    },
    {
      id: 30,
      title: "Final Exam Samples",
      category: "اختبارات",
      description: "نماذج اختبارات نهائية شاملة",
      icon: "📃",
      downloadLink: "#",
      size: "20 MB",
      format: "PDF"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "الكل" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "كتب ومراجع": "from-blue-500 to-indigo-600",
      "أوراق عمل": "from-green-500 to-emerald-600",
      "عروض تقديمية": "from-purple-500 to-pink-600",
      "فيديوهات": "from-red-500 to-orange-600",
      "ملفات صوتية": "from-yellow-500 to-amber-600",
      "ألعاب تعليمية": "from-cyan-500 to-blue-600",
      "خطط دروس": "from-teal-500 to-green-600",
      "اختبارات": "from-indigo-500 to-purple-600"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const getFormatColor = (format: string) => {
    const colors: { [key: string]: string } = {
      "PDF": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      "DOCX": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      "PPTX": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      "MP4": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      "MP3": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      "HTML5": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
    };
    return colors[format] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">العودة للصفحة الرئيسية</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-sm font-bold">
                {filteredResources.length} مورد
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl shadow-xl">
              <span className="text-5xl">📚</span>
              <h1 className="text-4xl font-bold text-white">مكتبة الموارد التعليمية</h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            مجموعة شاملة من الموارد التعليمية عالية الجودة لدعم عملية التعليم والتعلم
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="ابحث عن موارد تعليمية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border-2 border-gray-200 dark:border-gray-700"
                }`}
              >
                {category}
                {category !== "الكل" && (
                  <span className="mr-2 text-xs opacity-75">
                    ({resources.filter(r => r.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(resource.category)} p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl">{resource.icon}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getFormatColor(resource.format)}`}>
                    {resource.format}
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-tight">{resource.title}</h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold mb-3">
                    {resource.category}
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span className="font-medium">{resource.size}</span>
                  </div>
                </div>

                <a
                  href={resource.downloadLink}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${getCategoryColor(resource.category)} text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  تحميل المورد
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              جرّب البحث بكلمات مختلفة أو اختر فئة أخرى
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              💡 جميع الموارد متاحة مجاناً لأغراض تعليمية فقط
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
