"use server";

import { z } from "zod";

import {
  createUser,
  forgetPassApi,
  getUser,
  resetPassApi,
} from "@/api/user-data";

import { signIn } from "./auth";

const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const authRegisterSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const authForgetPassSchema = z.object({
  email: z.string().email(),
});

const authResetSchema = z.object({
  password: z.string().min(6),
  token: z.string(),
});

// export interface LoginActionState {
//   status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
// }

export const login = async (_, formData) => {
  try {
    const validatedData = authLoginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    console.log("Logged in");

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

// export interface RegisterActionState {
//   status:
//     | "idle"
//     | "in_progress"
//     | "success"
//     | "failed"
//     | "user_exists"
//     | "invalid_data";
// }

export const register = async (_, formData) => {
  try {
    const validatedData = authRegisterSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    let user;

    await createUser(
      validatedData.name,
      validatedData.email,
      validatedData.password
    );

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    console.log(error);
    return { status: "failed" };
  }
};

export const forgetPass = async (_, formData) => {
  try {
    const validatedData = authForgetPassSchema.parse({
      email: formData.get("email"),
    });

    // console.log("Validated data", validatedData);

    try {
      await forgetPassApi(validatedData);

      return { status: "success" };
    } catch (error) {
      console.error(error);
      return { status: "failed" };
    }
  } catch (error) {
    console.log(error);
    return { status: "failed" };
  }
};

export const resetPass = async (_, formData) => {
  try {
    const validatedData = authResetSchema.parse({
      password: formData.get("password"),
      token: formData.get("token"),
    });

    const data = await resetPassApi({
      newPassword: validatedData.password,
      token: validatedData.token,
    });

    if (data && data.message === "Password has been reset") {
      return { status: "success" };
    }

    return { status: "failed" };
  } catch (error) {
    console.error(error);
    return { status: "failed" };
  }
};
