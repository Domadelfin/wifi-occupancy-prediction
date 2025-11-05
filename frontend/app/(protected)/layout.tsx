import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

// Function to fetch user authentication status from the backend
async function getUser() {
  const cookieHeader = (await cookies()).toString();
  const hdrs = await headers(); // Get request headers

  const res = await fetch(`${API_BASE}/users/whoami/`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
      // Optional passthroughs; you can remove them if not necessary
      "x-forwarded-for": hdrs.get("x-forwarded-for") ?? "",
      "user-agent": hdrs.get("user-agent") ?? "",
    },
    cache: "no-store",  // Avoid caching the response for fresh user data
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.authenticated ? data : null;  // Only return data if authenticated
}

// ProtectedLayout to handle access to protected pages
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) {
    // If the user is not authenticated, redirect them to the homepage
    redirect("/"); 
  }

  // If the user is authenticated, render the protected content
  return <>{children}</>;
}
