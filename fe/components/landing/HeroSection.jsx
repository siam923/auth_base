"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const HeroSection = () => {
  const [email, setEmail] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Thank you for your interest!",
      description: "We'll keep you updated on our launch.",
    });
    setEmail("");
  };

  return (
    <div id="hero" className="max-w-4xl mx-auto text-center animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
        All in one Auth Flow
      </h1>
      <p className="text-xl md:text-2xl mb-12">
        Coming soon! Sign up to get early access.
      </p>
    </div>
  );
};
