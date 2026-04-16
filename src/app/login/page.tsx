import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Page |KanisaSoft Demo",
  description: "This is Next.js kanisasoft login page built with TailAdmin, a Next.js dashboard template.",
};

export default function SignIn() {
  return <SignInForm />;
}
