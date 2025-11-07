import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "مرحباً بك في Eduspark",
      date: "2024-11-04",
      excerpt: "نبدأ معاً رحلة التعليم والإبداع...",
      content: "هذا مثال على مقال. يمكنك إضافة مقالاتك الخاصة هنا."
    },
    {
      id: 2,
      title: "كيفية استخدام المنصة",
      date: "2024-11-03",
      excerpt: "دليل شامل للاستفادة القصوى من Eduspark",
      content: "شرح تفصيلي لاستخدام جميع مميزات المنصة."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/public" className="text-blue-600 hover:text-blue-700">
            ← العودة للقسم العام
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">✍️ مقالات ومشاركات</h1>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span>📅 {new Date(post.date).toLocaleDateString("ar-SA")}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                قراءة المزيد →
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
