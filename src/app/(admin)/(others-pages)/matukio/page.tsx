import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Matukio from "@/components/matukio/yaliyopo/matukio";

export const metadata: Metadata = {
  title: "Tazama Matukio",
  description: "Matukio yaliyopo",
     icons: {
    icon: "/logo.png",
  },
};

export default function Page() {
  return (
    <div className="space-y-6">
      
      {/* Breadcrumb */}
      <PageBreadcrumb pageTitle="Tazama Viongozi" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Matukio />
      </div>

    </div>
  );
}