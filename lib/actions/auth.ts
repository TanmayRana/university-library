/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { AuthCredentials } from "@/types";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/to-fast");
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong in signin with credentials",
    };
  }
};

// export const signUp = async (params: AuthCredentials) => {
//   const { fullName, email, password, universityCard, universityId } = params;

//   const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
//   const { success } = await ratelimit.limit(ip);

//   if (!success) return redirect("/to-fast");

//   const existingUser = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, email))
//     .limit(1);

//   if (existingUser.length > 0) {
//     return {
//       success: false,
//       error: "User already exists",
//     };
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await db.insert(users).values({
//       fullName,
//       email,
//       password: hashedPassword,
//       universityCard,
//       universityId,
//     });
//     await signInWithCredentials({ email, password });
//     return {
//       success: true,
//       error: null,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//       error: "Something went wrong in signup",
//     };
//   }
// };

// export default signUp;

export const signUp = async (
  params: AuthCredentials
): Promise<{
  success: boolean;
  error: any;
}> => {
  const { fullName, email, password, universityCard, universityId } = params;

  try {
    // Get IP for rate limiting
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
      };
    }

    // Check if the user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        error: "User already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into DB
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityCard,
      universityId,
    });

    // Auto sign in the user
    await signInWithCredentials({ email, password });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Signup Error:", error);
    return {
      success: false,
      error: "Something went wrong in signup",
    };
  }
};

export default signUp;
