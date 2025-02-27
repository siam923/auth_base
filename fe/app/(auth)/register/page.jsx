"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthForm } from "@/components/auth/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";

import { register } from "../actions";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState(register, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("Account already exists");
    } else if (state.status === "failed") {
      toast.error("Failed to create account");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      toast.success("Account created successfully");
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (formData) => {
    setEmail(formData.get("email"));
    formAction(formData);
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold ">Sign Up</h3>
        <p className="text-sm ">
          Create an account with your email and password
        </p>
      </div>
      <AuthForm formType="register" action={handleSubmit} defaultEmail={email}>
        <SubmitButton>Sign Up</SubmitButton>
        <p className="text-center text-sm  mt-4 ">
          {"Already have an account? "}
          <Link href="/login" className="font-semibold  hover:underline ">
            Sign in
          </Link>
          {" instead."}
        </p>
      </AuthForm>
    </div>
  );
}
