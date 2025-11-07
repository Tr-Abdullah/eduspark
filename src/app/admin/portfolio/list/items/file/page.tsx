import { redirect } from "next/navigation";

export default function Page() {
  // إعادة توجيه للمسار الجديد لإدارة ملف الإنجاز
  redirect("/admin/portfolio/manage");
}
