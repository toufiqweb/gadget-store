"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

import { UserSession } from "@/types";

/**
 * Server action to securely fetch the current user's session from better-auth.
 * Can be used cleanly inside any server component without importing auth boilerplate.
 */
export const getUserServerSession = async (): Promise<UserSession | null> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return (session?.user as UserSession) || null;
  } catch (error) {
    console.error("Failed to get server session:", error);
    return null;
  }
};
