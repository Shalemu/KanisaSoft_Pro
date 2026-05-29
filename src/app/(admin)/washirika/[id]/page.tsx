"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import UserDetailsClient from "@/components/washirika/UserDetailsClient";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch(`/members/by-user/${id}`);
        setUser(data.member);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Inapakia...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-red-500">
        Mshirika hakupatikana
      </div>
    );
  }

  return <UserDetailsClient user={user} />;
}