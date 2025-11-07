import Link from "next/link";

export default function Home() {
  const sharedContent = [
    {
      id: 1,
      title: "الدورات التعليمية",
      description: "دورات متنوعة ومجانية في مختلف المجالات العلمية والعملية",
      emoji: "🎓",
      link: "/public/courses",
      gradient: "from-purple-500 to-pink-500",
      available: true
    },
    {
      id: 2,
      title: "موارد تعليمية",
      description: "مجموعة من الموارد التعليمية المفيدة والكتب الإلكترونية",
      emoji: "📚",
      link: "/public/resources",
      gradient: "from-blue-500 to-cyan-500",
      available: true
    },
    {
      id: 3,
      title: "مقالات ومشاركات",
      description: "أحدث المقالات والمشاركات التعليمية والأخبار",
      emoji: "✍️",
      link: "/public/blog",
      gradient: "from-teal-500 to-cyan-500",
      available: false
    },
    {
      id: 4,
      title: "ملفات قابلة للتحميل",
      description: "ملفات وموارد يمكنك تحميلها واستخدامها",
      emoji: "📥",
      link: "/public/downloads",
      gradient: "from-green-500 to-emerald-500",
      available: false
    },
    {
      id: 5,
      title: "معلومات التواصل",
      description: "طرق التواصل والمعلومات الإضافية والدعم",
      emoji: "📧",
      link: "/public/contact",
      gradient: "from-orange-500 to-red-500",
      available: false
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-900 dark:to-cyan-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                E
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Eduspark
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">منصة تعليمية تفاعلية</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin"
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                👨‍🏫 لوحة المعلم
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              متاح للجميع - مجاناً
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                استكشف المحتوى التعليمي
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
              تعلم بطريقة تفاعلية وممتعة 🚀
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              دورات تفاعلية، موارد تعليمية، ومحتوى غني لرحلة تعليمية مميزة
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto">
          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {sharedContent.map((item) => (
              <Link
                key={item.id}
                href={item.available ? item.link : "#"}
                className={`group relative overflow-hidden glass backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover ${
                  item.available ? 'cursor-pointer' : 'cursor-default opacity-75'
                }`}
              >
                <div className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 rounded-br-full transform group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative flex items-start gap-4">
                  <div className="text-6xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors ${
                      item.available ? 'group-hover:text-green-600 dark:group-hover:text-green-400' : ''
                    }`}>
                      {item.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.description}
                    </p>
                    {item.available ? (
                      <div className={`inline-flex items-center gap-2 text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text font-semibold`}>
                        <span>استكشف الآن</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 text-gray-400 font-semibold">
                        <span>قريباً</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          صُنع بـ ❤️ باستخدام Next.js • © 2024 Eduspark
        </p>
      </footer>
    </div>
  );
}
