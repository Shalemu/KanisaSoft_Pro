"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // UI MESSAGE STATE
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "warning" | ""
  >("");

  const showMessage = (
    msg: string,
    type: "error" | "success" | "warning" = "error"
  ) => {
    setMessage(msg);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("LOGIN CLICKED");

  if (!login || !password) {
    showMessage("Tafadhali jaza taarifa zote.", "warning");
    return;
  }

  setLoading(true);
  showMessage("Inajaribu kuingia...", "warning");

  try {
    const data = await apiFetch("/login", {
      method: "POST",
      body: {
        login,
        password,
      },
    });

    console.log("LOGIN RESPONSE:", data);

    const { token, user } = data;

    if (!token) {
      showMessage("Token haijapatikana.", "error");
      return;
    }

    if (!user) {
      showMessage("User data haijapatikana.", "error");
      return;
    }

    if (!user.role) {
      showMessage(
        data.message || "Huna ruhusa ya kuingia mfumo.",
        "warning"
      );
      return;
    }

    // Save auth
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("user_id", String(user.id));

    if (isChecked) {
      localStorage.setItem("keep_logged_in", "true");
    }

    const role = user.role.toLowerCase().trim();

    console.log("USER ROLE:", role);

    const redirectMap: Record<string, string> = {
      admin: "/dashboard",
      katibu: "/dashboard",
      "mtunza hazina": "/dashboard",
      mchungaji: "/dashboard",
      kiongozi: "/dashboard",
      mshirika: "/dashboard",
    };

    const target = redirectMap[role];

    if (!target) {
      showMessage(`Hujapangiwa jukumu: ${user.role}`, "warning");
      return;
    }

    showMessage("Umeingia kikamilifu.", "success");

    console.log("REDIRECTING TO:", target);

    // IMPORTANT: small delay ensures toast shows before navigation
    setTimeout(() => {
      router.push(target);
    }, 300);
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    showMessage(err.message || "Tatizo la mfumo. Jaribu tena.", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full min-h-screen justify-center px-4 bg-white">
      <div className="w-full max-w-md mx-auto bg-linear-to-br from-[#130728] via-[#211a45] to-[#253266] rounded-3xl shadow-2xl border border-white/10 p-8 text-white">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-[#f0ce32] rounded-full px-4 py-2 mb-4">
            <span className="text-black font-bold text-lg">KanisaSoft</span>
          </div>

          <h1 className="mb-2 text-2xl font-bold">Ingia Kwenye Mfumo</h1>

          <p className="text-sm text-gray-300">
            Karibu katika mfumo wa taarifa za kanisa
          </p>
        </div>

        {/* MESSAGE BOX */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm border ${
              messageType === "error"
                ? "bg-red-500/10 text-red-300 border-red-500/30"
                : messageType === "success"
                ? "bg-green-500/10 text-green-300 border-green-500/30"
                : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>
          <div className="space-y-5">

            {/* LOGIN */}
            <div>
              <Label>
                <span className="text-white">
                  Email / Simu <span className="text-[#f0ce32]">*</span>
                </span>
              </Label>

              <Input
                type="text"
                placeholder="Email au namba ya simu"
                value={login}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLogin(e.target.value)
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label>
                <span className="text-white">
                  Neno la Siri <span className="text-[#f0ce32]">*</span>
                </span>
              </Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingiza neno la siri"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-300" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-300" />
                  )}
                </span>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-sm text-gray-300">Nikumbuke</span>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-[#f0ce32] hover:underline"
              >
                Umesahau?
              </Link>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f0ce32] text-black hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              size="sm"
            >
              {loading ? "Inapakia..." : "INGIA KWENYE MFUMO"}
            </Button>
          </div>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Huna akaunti?{" "}
            <Link
              href="/register"
              className="text-[#f0ce32] underline font-medium"
            >
              Jisajili hapa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}