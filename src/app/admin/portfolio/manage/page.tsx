"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { portfolioTemplates } from "@/data/portfolioTemplates";

export interface PortfolioItem {
  id: number;
  criteriaId: number;
  title: string;
  description: string;
  files: string[];
  date: string;
  reportData?: any;
}

export default function ManagePortfolioPage() {
  const [selectedCriteria, setSelectedCriteria] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<{ title: string; description: string; files: string[] }>({
    title: "",
    description: "",
    files: []
  });
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  // قوائم أساسية للنموذج المصغر داخل النافذة
  const regions = ["جازان", "صبيا", "أبو عريش", "صامطة", "بيش", "الدرب"];
  const subjects = ["اللغة العربية", "الرياضيات", "اللغة الإنجليزية", "العلوم", "التربية الإسلامية"];
  const stages = ["الابتدائية", "المتوسطة", "الثانوية"];
  const semesters = ["الفصل الأول", "الفصل الثاني", "الفصل الثالث"];

  // Hijri date helpers and other picklists
  const hijriDays = Array.from({ length: 30 }, (_, i) => String(i + 1));
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
  const hijriYears = ["1445", "1446", "1447", "1448"];
  const studentCounts = Array.from({ length: 41 }, (_, i) => String(i + 10));

  // Tools list (subset, expandable)
  const tools = [
    { id: "whiteboard", label: "سبورة وأقلام" },
    { id: "projector", label: "جهاز عرض (بروجكتر)" },
    { id: "flashcards", label: "بطاقات تعليمية (Flashcards)" },
    { id: "worksheets", label: "أوراق عمل" },
    { id: "manipulatives", label: "وسائل محسوسة" },
    { id: "lms", label: "منصة تعليمية (LMS)" },
    { id: "quiz", label: "اختبارات قصيرة إلكترونية" },
    { id: "rubrics", label: "معايير تقويم (Rubrics)" },
    { id: "exitTickets", label: "بطاقات الخروج" },
    { id: "mindMap", label: "خرائط ذهنية" },
    { id: "conceptMap", label: "خرائط مفاهيم" },
    { id: "rolePlay", label: "لعب أدوار" },
    { id: "peerInstruction", label: "تعليم الأقران" },
    { id: "stations", label: "محطات تعلم" },
    { id: "galleryWalk", label: "معرض تعليمي" },
    { id: "videos", label: "فيديوهات تعليمية" },
    { id: "audio", label: "مواد صوتية" },
    { id: "interactiveWalls", label: "لوحات حائط تفاعلية" },
    { id: "visualSupports", label: "وسائل دعم بصرية" }
  ];

  const objectiveSuggestions = [
    "أن يقرأ الطالب نصًا قراءة سليمة",
    "أن يميز بين المفرد والجمع",
    "أن يوظف مفردات الدرس في جمل مفيدة",
    "أن يحل مسائل حسابية بسياقات حياتية",
    "أن يطبق استراتيجية عمل جماعي",
    "أن يستخدم أدوات التقنية في التعلم",
    "أن يبدي سلوكًا إيجابيًا داخل الصف",
    "أن ينجز مهمة تعليمية ضمن زمن محدد",
    "أن يشارك في التقويم الذاتي",
    "أن يعرض ما تعلمه أمام زملائه"
  ];


  const performanceItemKeys = [
    "البند الأول: أداء الواجبات الوظيفية",
    "البند الثاني: التفاعل مع المجتمع المدرسي",
    "البند الثالث: التفاعل مع الأمور",
    "البند الرابع: التنوع في أساليب التدريس",
    "البند الخامس: تحسين نواتج التعلم",
    "البند السادس: إعداد وتنفيذ خطة التعلم",
    "البند السابع: توظيف تقنيات ووسائل التعلم المناسبة",
    "البند الثامن: تهيئة بيئة تعليمية",
    "البند التاسع: الإدارة الصفية",
    "البند العاشر: تحليل نتائج المتعلمين وتحسين مستوياتهم",
    "البند الحادي عشر: تنويع أساليب التقويم"
  ];

  const units: { [key: string]: string[] } = {
    "Unit 1 – Lifestyles": [
      "Listen and Discuss",
      "Grammar (Simple Present / Adverbs of Frequency)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 2 – Life Stories": [
      "Listen and Discuss",
      "Grammar (Past Simple / Used to)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 3 – At a Health Club": [
      "Listen and Discuss",
      "Grammar (Present Continuous / Imperatives)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 4 – That’s Life!": [
      "Listen and Discuss",
      "Grammar (Future / Time Clauses)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 5 – Tell Me What Happened": [
      "Listen and Discuss",
      "Grammar (Past Continuous / Simple Past)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 6 – What’s the Matter?": [
      "Listen and Discuss",
      "Grammar (Modal Verbs: should / must)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 7 – What Are You Good At?": [
      "Listen and Discuss",
      "Grammar (Gerunds / Infinitives)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 8 – Famous People": [
      "Listen and Discuss",
      "Grammar (Comparatives / Superlatives)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 9 – Look What I Can Do!": [
      "Listen and Discuss",
      "Grammar (Can / Could)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 10 – Around Town": [
      "Listen and Discuss",
      "Grammar (Prepositions / Directions)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 11 – Good Jobs": [
      "Listen and Discuss",
      "Grammar (Modal Verbs / Advice)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ],
    "Unit 12 – The Natural World": [
      "Listen and Discuss",
      "Grammar (Passive / Relative Clauses)",
      "Language in Context + Listening + Pronunciation",
      "Conversation",
      "Reading",
      "Writing",
      "Form / Meaning / Function"
    ]
  };

  const strategies = [
    "توظيف نظام دقيق لتوثيق الجداول الزمنية للحصص والأنشطة المنفذة أسبوعيًا",
    "إعداد تقارير دورية عن تقدم تنفيذ الخطة الدراسية وربطها بالأداء التحصيلي",
    "الالتزام بتنفيذ المهام الإشرافية (مناوبة، انتظار) ضمن خطة تشغيلية موثقة",
    "استخدام سجل متابعة إلكتروني للواجبات والأنشطة الصفية واللاصفية",
    "تطبيق آلية تقييم ذاتي مستمر لأداء المعلم والطلاب داخل الفصل",
    "تصميم خطط تعليمية قائمة على نواتج التعلم القابلة للقياس ومراعية للفروق الفردية",
    "دمج ممارسات التعلم القائم على المشاريع (PBL) في وحدات محددة",
    "بناء خبرات تعلم تفاعلية تنطلق من واقع المتعلم وتربط المحتوى بالسياق الحياتي",
    "مراجعة الخطة بشكل دوري وتحديثها استنادًا لنتائج التقويم البنائي",
    "تقديم خطط تفصيلية توضح الربط بين الأهداف والأنشطة وأدوات التقويم",
    "بناء منظومة سلوك إيجابي باستخدام تقنيات التعزيز المتدرج",
    "تطبيق استراتيجيات إدارة الوقت التعليمي بكفاءة (تقسيم الحصة إلى مراحل تعلم)",
    "تخصيص أدوار قيادية للطلاب لتنمية الشعور بالمسؤولية داخل الصف",
    "تفعيل النمذجة السلوكية كأسلوب تربوي لتوجيه سلوك الطلاب",
    "استخدام أدوات التتبع السلوكي ومخططات السلوك لتحليل أنماط الطلاب",
    "تصميم تقارير وصفية شهرية توضح تقدم الطالب في المهارات الأكاديمية والسلوكية"
  ];

  // Elements per performance item (mini set; can be expanded)
  const performanceItems: Record<string, string[]> = {
    [performanceItemKeys[0]]: [
      "العنصر الأول: الالتزام بالحضور والانصراف",
      "العنصر الثاني: تنفيذ المهام الإدارية",
      "العنصر الثالث: المشاركة في أنشطة المدرسة"
    ],
    [performanceItemKeys[1]]: [
      "العنصر الأول: التعاون مع الزملاء",
      "العنصر الثاني: تبادل الخبرات المهنية"
    ],
    [performanceItemKeys[2]]: [
      "العنصر الأول: التواصل مع أولياء الأمور",
      "العنصر الثاني: متابعة حالات الطلاب"
    ],
    [performanceItemKeys[3]]: [
      "العنصر الأول: التنويع في الاستراتيجيات",
      "العنصر الثاني: تفعيل دور المتعلم"
    ],
    [performanceItemKeys[4]]: [
      "العنصر الأول: معالجة الفاقد التعليمي",
      "العنصر الثاني: خطط إثرائية"
    ],
    [performanceItemKeys[5]]: [
      "العنصر الأول: اكتمال الواجبات",
      "العنصر الثاني: تنفيذ الدروس وفق الجداول"
    ],
    [performanceItemKeys[6]]: [
      "العنصر الأول: توظيف التقنية",
      "العنصر الثاني: تنويع الوسائل"
    ],
    [performanceItemKeys[7]]: [
      "العنصر الأول: مراعاة الفروق الفردية",
      "العنصر الثاني: التحفيز المعنوي والمادي"
    ],
    [performanceItemKeys[8]]: [
      "العنصر الأول: ضبط السلوك",
      "العنصر الثاني: إدارة الوقت والنشاط"
    ],
    [performanceItemKeys[9]]: [
      "العنصر الأول: تحليل النتائج",
      "العنصر الثاني: تشخيص مواطن القوة والضعف"
    ],
    [performanceItemKeys[10]]: [
      "العنصر الأول: تنويع أساليب التقويم",
      "العنصر الثاني: التقويم الإلكتروني والشفوي"
    ]
  };

  // نموذج بيانات التقرير داخل نافذة إضافة شاهد
  const [reportForm, setReportForm] = useState({
    region: regions[0],
    schoolName: "مدرسة ابن سيناء المتوسطة وبرنامجي العوق الفكري والتوحد",
    day: "",
    month: "",
  year: "1447",
    subject: subjects[2],
    strategy: strategies[0],
    students: "30",
    stage: stages[0],
    semester: semesters[0],
    performanceItem: performanceItemKeys[0],
    performanceElement: "",
    unit: "",
    lesson: "",
    tools: [] as string[],
    objectives: [] as string[],
    teacherName: "عبدالله حسن الفيفي",
    principalName: "احمد علي كريري",
    uploadedFiles: [] as Array<{ name: string; url: string }>
  });

  // مزامنة البند المختار
  useEffect(() => {
    if (showAddModal) {
      const key = performanceItemKeys[selectedCriteria - 1] || performanceItemKeys[0];
      setReportForm((prev) => ({ ...prev, performanceItem: key }));
    }
  }, [showAddModal, selectedCriteria]);

  const handleReportFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
      setReportForm((prev) => ({ ...prev, uploadedFiles: [...prev.uploadedFiles, ...newFiles] }));
    }
  };

  const removeReportFile = (index: number) => {
    setReportForm((prev) => ({ ...prev, uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index) }));
  };

  const toggleReportObjective = (objective: string) => {
    setReportForm((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter((o) => o !== objective)
        : [...prev.objectives, objective]
    }));
  };

  const toggleReportTool = (toolId: string) => {
    setReportForm((prev) => ({
      ...prev,
      tools: prev.tools.includes(toolId) ? prev.tools.filter((t) => t !== toolId) : [...prev.tools, toolId]
    }));
  };

  const saveReportEvidence = () => {
    const item: PortfolioItem = {
      id: Date.now(),
      criteriaId: selectedCriteria,
      title: `تقرير: ${reportForm.strategy}`,
      description: `المادة: ${reportForm.subject} | المرحلة: ${reportForm.stage} | التاريخ: ${reportForm.day || "?"}/${reportForm.month || "?"}/${reportForm.year}`,
      files: reportForm.uploadedFiles.map((f) => f.name),
      date: new Date().toLocaleDateString("ar-SA"),
      reportData: reportForm
    };
    const newList = [...portfolioItems, item];
    setPortfolioItems(newList);
    try {
      localStorage.setItem("portfolio-items", JSON.stringify(newList));
    } catch {}
    setShowAddModal(false);
    setReportForm((prev) => ({ ...prev, objectives: [], tools: [], uploadedFiles: [] }));
  };

  // البنود الرئيسية (قائمة)
  const criteria = [
    { id: 1, title: "أداء الواجبات الوظيفية", icon: "📋", color: "blue", weight: "10%" },
    { id: 2, title: "التفاعل مع المجتمع المهني", icon: "👥", color: "green", weight: "10%" },
    { id: 3, title: "التفاعل مع أولياء الأمور", icon: "👨‍👩‍👧‍👦", color: "purple", weight: "10%" },
    { id: 4, title: "التنويع في استراتيجيات التدريس", icon: "🎓", color: "pink", weight: "10%" },
    { id: 5, title: "تحسين نتائج التعلم", icon: "📈", color: "orange", weight: "10%" },
    { id: 6, title: "إعداد وتنفيذ خطة التعلم", icon: "📅", color: "teal", weight: "10%" },
    { id: 7, title: "توظيف تقنيات ووسائل التعلم المناسبة", icon: "💻", color: "indigo", weight: "10%" },
    { id: 8, title: "تهيئة بيئة تعليمية", icon: "🏫", color: "cyan", weight: "5%" },
    { id: 9, title: "الإدارة الصفية", icon: "🎯", color: "emerald", weight: "5%" },
    { id: 10, title: "تحليل نتائج المتعلمين وتشخيص مستوياتهم", icon: "📊", color: "violet", weight: "10%" },
    { id: 11, title: "تنوع أساليب التقويم", icon: "✍️", color: "rose", weight: "10%" }
  ];

  // Tailwind static class map to avoid dynamic class names being purged
  const colorClassMap: Record<string, { activeBg: string; inactiveBadge: string }> = {
    blue: { activeBg: "bg-blue-600 text-white shadow-lg", inactiveBadge: "bg-blue-100 text-blue-700" },
    green: { activeBg: "bg-green-600 text-white shadow-lg", inactiveBadge: "bg-green-100 text-green-700" },
    purple: { activeBg: "bg-purple-600 text-white shadow-lg", inactiveBadge: "bg-purple-100 text-purple-700" },
    pink: { activeBg: "bg-pink-600 text-white shadow-lg", inactiveBadge: "bg-pink-100 text-pink-700" },
    orange: { activeBg: "bg-orange-600 text-white shadow-lg", inactiveBadge: "bg-orange-100 text-orange-700" },
    teal: { activeBg: "bg-teal-600 text-white shadow-lg", inactiveBadge: "bg-teal-100 text-teal-700" },
    indigo: { activeBg: "bg-indigo-600 text-white shadow-lg", inactiveBadge: "bg-indigo-100 text-indigo-700" },
    cyan: { activeBg: "bg-cyan-600 text-white shadow-lg", inactiveBadge: "bg-cyan-100 text-cyan-700" },
    emerald: { activeBg: "bg-emerald-600 text-white shadow-lg", inactiveBadge: "bg-emerald-100 text-emerald-700" },
    violet: { activeBg: "bg-violet-600 text-white shadow-lg", inactiveBadge: "bg-violet-100 text-violet-700" },
    rose: { activeBg: "bg-rose-600 text-white shadow-lg", inactiveBadge: "bg-rose-100 text-rose-700" }
  };

  // Load from localStorage on mount or initialize with templates
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-items");
      if (stored) {
        const items = JSON.parse(stored);
        // If empty, populate with template data
        if (items.length === 0) {
          const initialItems = populateTemplateItems();
          setPortfolioItems(initialItems);
        } else {
          setPortfolioItems(items);
        }
      } else {
        // First time: populate with template data
        const initialItems = populateTemplateItems();
        setPortfolioItems(initialItems);
      }
      const storedCriteria = localStorage.getItem("portfolio-selected-criteria");
      if (storedCriteria) {
        const id = parseInt(storedCriteria, 10);
        if (!Number.isNaN(id)) setSelectedCriteria(id);
      }
    } catch {
      // ignore
    }
  }, []);

  // Populate initial items from templates
  const populateTemplateItems = (): PortfolioItem[] => {
    const items: PortfolioItem[] = [];
    let idCounter = 1;
    
    Object.keys(portfolioTemplates).forEach((criteriaId) => {
      const criteriaNum = parseInt(criteriaId);
      const templates = portfolioTemplates[criteriaNum as keyof typeof portfolioTemplates];
      
      templates.forEach((template) => {
        items.push({
          id: idCounter++,
          criteriaId: criteriaNum,
          title: template.title,
          description: template.description,
          files: template.files,
          date: new Date().toLocaleDateString("ar-SA")
        });
      });
    });
    
    return items;
  };

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("portfolio-items", JSON.stringify(portfolioItems));
    } catch {
      // ignore
    }
  }, [portfolioItems]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-selected-criteria", String(selectedCriteria));
    } catch {
      // ignore
    }
  }, [selectedCriteria]);

  const handleAddItem = () => {
    if (newItem.title && newItem.description) {
      const item: PortfolioItem = {
        id: Date.now(),
        criteriaId: selectedCriteria,
        title: newItem.title,
        description: newItem.description,
        files: newItem.files,
        date: new Date().toLocaleDateString("ar-SA")
      };
      setPortfolioItems([...portfolioItems, item]);
      setNewItem({ title: "", description: "", files: [] });
      setShowAddModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setNewItem({ ...newItem, files: [...newItem.files, ...fileNames] });
    }
  };

  const deleteItem = (id: number) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  const handleResetDefaults = () => {
    if (confirm("هل أنت متأكد من استعادة البيانات الافتراضية؟ سيتم حذف جميع التغييرات الحالية.")) {
      const initialItems = populateTemplateItems();
      setPortfolioItems(initialItems);
      localStorage.setItem("portfolio-items", JSON.stringify(initialItems));
    }
  };

  const currentCriteria = criteria.find(c => c.id === selectedCriteria);
  const currentItems = portfolioItems.filter(item => item.criteriaId === selectedCriteria);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/portfolio" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">رجوع</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg">
                  <span className="text-2xl">📁</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">إدارة ملف الإنجاز</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">إضافة وتنظيم الشواهد والأدلة</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleResetDefaults}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">استعادة الافتراضيات</span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">تصدير PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Criteria List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                البنود الرئيسية
              </h2>
              <div className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto">
                {criteria.map((criterion) => {
                  const itemCount = portfolioItems.filter(item => item.criteriaId === criterion.id).length;
                  return (
                    <button
                      key={criterion.id}
                      onClick={() => setSelectedCriteria(criterion.id)}
                      className={`w-full text-right p-3 rounded-xl transition-all ${
                        selectedCriteria === criterion.id
                          ? colorClassMap[criterion.color]?.activeBg || "bg-blue-600 text-white shadow-lg"
                          : 'bg-gray-50 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{criterion.icon}</span>
                          <div className="text-right">
                            <div className="text-xs opacity-75">{criterion.id}</div>
                          </div>
                        </div>
                        {itemCount > 0 && (
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            selectedCriteria === criterion.id 
                              ? 'bg-white/20' 
                              : colorClassMap[criterion.color]?.inactiveBadge || 'bg-blue-100 text-blue-700'
                          }`}>
                            {itemCount}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium mt-1 line-clamp-2">
                        {criterion.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Current Criteria Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{currentCriteria?.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm opacity-90">البند {currentCriteria?.id}</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                        {currentCriteria?.weight}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold">{currentCriteria?.title}</h2>
                    <p className="text-sm text-teal-100 mt-1">
                      {currentItems.length} عنصر مضاف
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/dashboard?criteria=${currentCriteria?.id}`}
                    className="px-6 py-3 bg-white text-teal-600 rounded-xl font-bold hover:shadow-2xl transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    إنشاء تقرير جديد
                  </Link>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all flex items-center gap-2 border-2 border-white/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    إضافة شاهد
                  </button>
                </div>
              </div>
            </div>

            {/* Items List */}
            {currentItems.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  لا توجد عناصر بعد
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  ابدأ بإضافة الشواهد والأدلة لهذا البند
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  إضافة أول عنصر
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.reportData && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-200 border border-teal-200 dark:border-teal-800">تقرير</span>
                          )}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {item.date}
                          </span>
                          {item.files.length > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {item.files.length} ملف
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Files */}
                    {item.files.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          الملفات المرفقة:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.files.map((file, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-gray-700 dark:text-gray-300">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-3xl">{currentCriteria?.icon}</span>
                  إضافة عنصر جديد
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {currentCriteria?.title}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* معلومات المدرسة والتاريخ */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-4 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">معلومات المدرسة والتاريخ</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">الإدارة / المنطقة</label>
                    <select value={reportForm.region} onChange={(e)=>setReportForm({...reportForm, region:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">اسم المدرسة</label>
                    <input value={reportForm.schoolName} onChange={(e)=>setReportForm({...reportForm, schoolName:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700"/>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">تاريخ التنفيذ (هجري)</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select value={reportForm.day} onChange={(e)=>setReportForm({...reportForm, day:e.target.value})} className="px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                        <option value="">اليوم</option>
                        {hijriDays.map(d=> <option key={d} value={d}>{d}</option>)}
                      </select>
                      <select value={reportForm.month} onChange={(e)=>setReportForm({...reportForm, month:e.target.value})} className="px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                        <option value="">الشهر</option>
                        {hijriMonths.map(m=> <option key={m.value} value={m.value}>{m.label}</option>)}
                      </select>
                      <select value={reportForm.year} onChange={(e)=>setReportForm({...reportForm, year:e.target.value})} className="px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                        <option value="">السنة</option>
                        {hijriYears.map(y=> <option key={y} value={y}>{y} هـ</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* تفاصيل التقرير */}
              <div className="bg-white dark:bg-slate-700/50 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">تفاصيل التقرير</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">المادة</label>
                    <select value={reportForm.subject} onChange={(e)=>setReportForm({...reportForm, subject:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      {subjects.map(s=> <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">المرحلة</label>
                    <select value={reportForm.stage} onChange={(e)=>setReportForm({...reportForm, stage:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      {stages.map(s=> <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">الفصل</label>
                    <select value={reportForm.semester} onChange={(e)=>setReportForm({...reportForm, semester:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      {semesters.map(s=> <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">عدد الطلاب</label>
                    <select value={reportForm.students} onChange={(e)=>setReportForm({...reportForm, students:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      {studentCounts.map(n=> <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">الاستراتيجية</label>
                    <select value={reportForm.strategy} onChange={(e)=>setReportForm({...reportForm, strategy:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      {strategies.map((st, i)=> <option key={i} value={st}>{st}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* البند والعنصر */}
              <div className="bg-white dark:bg-slate-700/50 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">البند والعنصر</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">البند</label>
                    <select value={reportForm.performanceItem} onChange={(e)=>setReportForm({...reportForm, performanceItem:e.target.value, performanceElement: ""})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      {performanceItemKeys.map(k=> <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">العنصر</label>
                    <select value={reportForm.performanceElement} onChange={(e)=>setReportForm({...reportForm, performanceElement:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      <option value="">اختر العنصر</option>
                      {(performanceItems[reportForm.performanceItem] || []).map(el => <option key={el} value={el}>{el}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* الوحدة والدرس */}
              <div className="bg-white dark:bg-slate-700/50 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">الوحدة والدرس</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">الوحدة</label>
                    <select value={reportForm.unit} onChange={(e)=>setReportForm({...reportForm, unit:e.target.value, lesson: ""})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700">
                      <option value="">اختر الوحدة</option>
                      {Object.keys(units).map(u=> <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">الدرس</label>
                    <select value={reportForm.lesson} onChange={(e)=>setReportForm({...reportForm, lesson:e.target.value})} disabled={!reportForm.unit} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700 disabled:opacity-50">
                      <option value="">اختر الدرس</option>
                      {(units[reportForm.unit] || []).map(l=> <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* الأدوات والأهداف */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-700/50 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
                    <span>الأدوات والوسائل التعليمية</span>
                    <span className="text-xs text-gray-500 font-normal">({reportForm.tools.length} محدد)</span>
                  </h3>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-2">
                    {tools.map(tool => (
                      <label key={tool.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
                        <input type="checkbox" checked={reportForm.tools.includes(tool.id)} onChange={()=>toggleReportTool(tool.id)} className="w-4 h-4 text-teal-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 flex-shrink-0"/>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tool.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-700/50 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
                    <span>الأهداف</span>
                    <span className="text-xs text-gray-500 font-normal">({reportForm.objectives.length} محدد)</span>
                  </h3>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-2">
                    {objectiveSuggestions.map((objective, index) => (
                      <label key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
                        <input type="checkbox" checked={reportForm.objectives.includes(objective)} onChange={()=>toggleReportObjective(objective)} className="w-4 h-4 mt-0.5 text-teal-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 flex-shrink-0"/>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{objective}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* الشواهد - الصور والملفات */}
              <div className="bg-white dark:bg-slate-700/50 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">الشواهد (الصور والملفات)</h3>
                <input type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleReportFileUpload} className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800"/>
                {reportForm.uploadedFiles.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {reportForm.uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        {file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                            <img src={file.url} alt={file.name} className="w-full h-24 object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white px-2 py-1">
                              <p className="text-xs truncate">{file.name}</p>
                            </div>
                            <button onClick={() => removeReportFile(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                          </div>
                        ) : (
                          <div className="relative bg-gray-100 dark:bg-slate-700 rounded-lg p-2 flex items-center gap-2 border-2 border-gray-200 dark:border-gray-600">
                            <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"/></svg>
                            <span className="text-xs text-gray-700 dark:text-gray-300 truncate flex-1">{file.name}</span>
                            <button onClick={() => removeReportFile(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* معلومات التوقيع */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">معلومات التوقيع</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">اسم المعلم</label>
                    <input value={reportForm.teacherName} onChange={(e)=>setReportForm({...reportForm, teacherName:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">مدير المدرسة</label>
                    <input value={reportForm.principalName} onChange={(e)=>setReportForm({...reportForm, principalName:e.target.value})} className="w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-slate-700"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={saveReportEvidence}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                حفظ الشاهد كتقرير رسمي
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
