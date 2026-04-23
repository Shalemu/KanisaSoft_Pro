import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form ya usajili |KanisaSoft Demo",
  description: "Usajili wa washirika",
    icons: {
    icon: "/logo.png",
  },
};

export default function SignUpn() {
  return <SignUpForm />;
}
