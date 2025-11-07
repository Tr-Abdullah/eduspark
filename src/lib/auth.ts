// نظام مصادقة بسيط - يمكنك استبداله بنظام أكثر تطوراً لاحقاً
export const AUTH_PASSWORD = process.env.ADMIN_PASSWORD || "eduspark123";

export function validatePassword(password: string): boolean {
  return password === AUTH_PASSWORD;
}
