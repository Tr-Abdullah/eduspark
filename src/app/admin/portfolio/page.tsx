"use client";

import { useState } from "react";
import Link from "next/link";

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const benefits = [
    {
      icon: "📚",
      title: "توثيق الإنجازات بشكل منظم",
      description: "تسجيل المعلم لأعماله وإنجازاته بطريقة منظمة وسهلة الوصول",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🌐",
      title: "سهولة التحديث والتعديل",
      description: "إضافة محتوى جديد أو تعديل الموجود بسرعة دون الحاجة لإعادة التصميم",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "📊",
      title: "تعزيز التطوير المهني",
      description: "يساعد المعلم على تقييم أدائه بنفسه وتحديد نقاط القوة والضعف",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🔄",
      title: "مشاركة سريعة وفعالة",
      description: "مشاركة الملف بسهولة مع المدير أو الزملاء أو لجان التقييم",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "✅",
      title: "دعم التقييم الوظيفي",
      description: "أداة رسمية لتقييم أداء المعلم مع دليل ملموس على الكفاءة",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: "💻",
      title: "إبراز المهارات التقنية",
      description: "يعكس قدرة المعلم على استخدام التقنية في التعليم الحديث",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "🎯",
      title: "المرونة والتنوع",
      description: "إدراج أنواع مختلفة من المحتوى: نصوص، صور، فيديوهات، روابط",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: "⚡",
      title: "توفير الوقت والجهد",
      description: "الوصول لأي معلومة في ثواني عبر البحث الإلكتروني",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const evaluationCriteria = [
    {
      id: 1,
      title: "أداء الواجبات الوظيفية",
      weight: "10%",
      icon: "📋",
      examples: [
        "التقيد بالدوام الرسمي",
        "تأدية الحصص الدراسية وفق الجدول الدراسي",
        "المشاركة في الإشراف والمناوبة وحصص الانتظار",
        "المشاركة في برامج النشاط المدرسي",
        "الالتزام بالتكليفات والواجبات الإضافية"
      ],
      evidence: [
        "سجل الدوام الرسمي",
        "جدول الحصص وسجل التنفيذ",
        "سجل المناوبة والانتظار",
        "شهادات المشاركة في الأنشطة"
      ]
    },
    {
      id: 2,
      title: "التفاعل مع المجتمع المهني",
      weight: "10%",
      icon: "👥",
      examples: [
        "المشاركة الفاعلة في مجتمعات التعلم المهنية",
        "تبادل الزيارات أو تقديم الدروس التطبيقية",
        "المشاركة في الدورات والورش التدريبية",
        "إبداع الإنتاج المعرفي في التخصص"
      ],
      evidence: [
        "محاضر مجتمعات التعلم المهنية",
        "سجل الزيارات والدروس التطبيقية",
        "شهادات التدريب",
        "أوراق عمل وأبحاث تربوية"
      ]
    },
    {
      id: 3,
      title: "التفاعل مع أولياء الأمور",
      weight: "10%",
      icon: "👨‍👩‍👧‍👦",
      examples: [
        "التواصل الإيجابي مع أولياء الأمور",
        "تزويد أولياء الأمور بمستويات الطلبة",
        "إرسال الخطة الأسبوعية في وقت مبكر"
      ],
      evidence: [
        "سجل التواصل مع أولياء الأمور",
        "التقارير الدورية للطلاب",
        "الخطط الأسبوعية المرسلة"
      ]
    },
    {
      id: 4,
      title: "التنويع في استراتيجيات التدريس",
      weight: "10%",
      icon: "🎓",
      examples: [
        "استخدام استراتيجيات متنوعة للتدريس",
        "يستخدم استراتيجيات تدريس إبداعية وجذابة للطلاب"
      ],
      evidence: [
        "تقارير تطبيق الاستراتيجيات",
        "خطط دروس بالاستراتيجيات المستخدمة",
        "صور وفيديوهات توثيقية"
      ]
    },
    {
      id: 5,
      title: "تحسين نتائج التعلم",
      weight: "10%",
      icon: "📈",
      examples: [
        "تشخيص مستوى الطلاب الفعلي في المادة",
        "معالجة الفاقد التعليمي",
        "وضع الخطط العلاجية للطلبة الضعاف",
        "وضع الخطط الإثرائية للطلاب المتميزين",
        "تكريم الطلبة المتميزين والذين تحسّن مستواهم"
      ],
      evidence: [
        "الاختبارات التشخيصية",
        "الخطط العلاجية والإثرائية",
        "نتائج الاختبار القبلي والبعدي",
        "شهادات التكريم"
      ]
    },
    {
      id: 6,
      title: "إعداد وتنفيذ خطة التعلم",
      weight: "10%",
      icon: "📅",
      examples: [
        "إكمال الواجبات والاختبارات والإجراءات",
        "تنفيذ الدروس وفق الخطط المعتمدة"
      ],
      evidence: [
        "خطة توزيع المنهج",
        "نماذج الواجبات والاختبارات",
        "سجل تنفيذ الدروس"
      ]
    },
    {
      id: 7,
      title: "توظيف تقنيات ووسائل التعلم المناسبة",
      weight: "10%",
      icon: "💻",
      examples: [
        "التنويع في الوسائل التعليمية",
        "توظيف منصة مدرستي وعين وما شابهها",
        "يفعل المعلم مصادر التعلم المختلفة في المدرسة"
      ],
      evidence: [
        "صور الوسائل التعليمية",
        "تقارير استخدام المنصات الرقمية",
        "تقرير استخدام مصادر التعلم"
      ]
    },
    {
      id: 8,
      title: "تهيئة بيئة تعليمية",
      weight: "5%",
      icon: "🏫",
      examples: [
        "يراعي الفروق الفردية وحاجات الطلاب المختلفة",
        "يطور مناخاً صفياً محفزاً ومعززاً",
        "يفعل أدوات متنوعة في الدرس (سبورة - كتاب - دفتر .....)"
      ],
      evidence: [
        "تقرير تصنيف الطلاب",
        "نظام التحفيز والتعزيز",
        "صور البيئة الصفية",
        "قائمة الأدوات المستخدمة"
      ]
    },
    {
      id: 9,
      title: "الإدارة الصفية",
      weight: "5%",
      icon: "🎯",
      examples: [
        "يستخدم أساليب تشجع الطلاب على الالتزام بالسلوك المقبول",
        "لديه قدرة على ضبط سلوك الطلبة وإدارة وقتهم بفاعلية",
        "يعطي فرصاً متنوعة تناسب جميع الطلاب"
      ],
      evidence: [
        "قوانين الصف المتفق عليها",
        "سجل متابعة السلوك",
        "تقرير إدارة الوقت في الحصة"
      ]
    },
    {
      id: 10,
      title: "تحليل نتائج المتعلمين وتشخيص مستوياتهم",
      weight: "10%",
      icon: "📊",
      examples: [
        "يحلل نتائج الطلاب وفق منهجية واضحة",
        "تصنيف الطلاب وفق نتائجهم ومعالجة تحصيلهم",
        "تطبيق خطة علاجية لكل وحدة دراسية",
        "توفير أساليب التقويم الورقية والإلكترونية والشهرية"
      ],
      evidence: [
        "تحليل النتائج مع رسوم بيانية",
        "جداول تصنيف الطلاب",
        "الخطط العلاجية للوحدات",
        "نماذج أساليب التقويم"
      ]
    },
    {
      id: 11,
      title: "تنوع أساليب التقويم",
      weight: "10%",
      icon: "✍️",
      examples: [
        "تنفيذ المشاريع الطلابية والمهام الأدائية",
        "توزيع درجات المقرر وفق الضوابط القياسية",
        "يفعل ملفات إنجاز الطلاب",
        "يلتزم بتعليمات ولوائح الاختبارات والتقويم"
      ],
      evidence: [
        "نماذج المشاريع والمهام الأدائية",
        "جدول توزيع الدرجات",
        "ملفات إنجاز الطلاب",
        "نماذج الاختبارات المتنوعة"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">العودة للوحة التحكم</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg mb-6">
            <span className="text-3xl">📁</span>
            <span className="text-white font-bold text-lg">ملف الإنجاز الإلكتروني</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              ملف الإنجاز الإلكتروني للمعلم
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            أداة رقمية تُستخدم لجمع وتوثيق إنجازات المعلم بشكل منظم وإلكتروني، تساعد على تقييم الأداء الوظيفي وتطوير المهارات التدريسية
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              فوائد ملف الإنجاز الإلكتروني ✨
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 card-hover"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Criteria Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              معايير تقييم الأداء الوظيفي للمعلمين 📋
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              11 معياراً رئيسياً لتقييم أداء المعلم وتوثيق إنجازاته للعام الدراسي 1447هـ
            </p>
          </div>

          <div className="space-y-4">
            {evaluationCriteria.map((criteria) => (
              <div
                key={criteria.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setActiveSection(activeSection === criteria.id ? null : criteria.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{criteria.icon}</div>
                    <div className="text-right">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {criteria.id} - {criteria.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-full">
                          {criteria.weight}
                        </span>
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform ${
                      activeSection === criteria.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeSection === criteria.id && (
                  <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900/50">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          أمثلة على تحقق العنصر:
                        </h4>
                        <ul className="space-y-2">
                          {criteria.examples.map((example, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          الشواهد والأدلة:
                        </h4>
                        <ul className="space-y-2">
                          {criteria.evidence.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <span className="text-purple-500 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">ابدأ في بناء ملف إنجازك الآن! 🚀</h2>
          <p className="text-xl mb-8 text-teal-100">
            وثّق إنجازاتك واحفظ مسيرتك المهنية بطريقة احترافية ومنظمة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admin/portfolio/manage"
                className="px-8 py-4 bg-white text-teal-600 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                إدارة ملف الإنجاز
              </Link>
            <Link
              href="/admin/dashboard"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-teal-600 transition-all"
            >
              العودة للوحة التحكم
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">© 2024 Eduspark - ملف الإنجاز الإلكتروني للمعلم</p>
        </div>
      </footer>
    </div>
  );
}
