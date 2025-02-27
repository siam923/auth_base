// components/landing/Footer.jsx
import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function Footer() {
  return (
    <footer className=" py-8 px-4">
      {/* Footer bottom */}
      <Separator />
      <div className="flex flex-col md:flex-row justify-center items-center pt-4 ">
        <p className="text-xs mb-4 md:mb-0">
          &copy; 2024 Algoclan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
