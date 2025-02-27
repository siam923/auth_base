import { Navbar } from "@/components/custom/nav/navbar";
import Footer from "@/components/landing/Footer";

export default async function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow  ">
        <div className="flex mt-20 w-screen items-center justify-center ">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
