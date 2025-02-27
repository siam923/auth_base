import { Navbar } from "@/components/custom/nav/navbar";
import Footer from "@/components/landing/Footer";
import { cookies } from "next/headers";
import { auth } from "../(auth)/auth";

export default async function RootLayout({ children }) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={session?.user} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
