import { cookies } from "next/headers";

const COOKIE_NAME = "scc_admin";

export async function isAdminRequest(token?: string | null) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  if (token && token === expected) return true;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === expected;
}

export async function setAdminCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
