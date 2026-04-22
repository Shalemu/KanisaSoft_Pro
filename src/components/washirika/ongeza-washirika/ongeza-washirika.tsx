"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Select from "@/components/form/Select";

export default function OngezaWashirika() {
  const [activeTab, setActiveTab] = useState(0);

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    birthPlace: "",
    birthDistrict: "",
    residence: "",
    maritalStatus: "",
    spouseName: "",
    childrenCount: "",
    zone: "",
    phone: "",
    whatsappNumber: "",
    email: "",

    dateOfConversion: "",
    churchOfConversion: "",
    baptismDate: "",
    baptismPlace: "",
    baptizerName: "",
    baptizerTitle: "",
    previousChurchStatus: "",
    tanguLini: "",
    kanisaUlipotoka: "",

    educationLevel: "",
    profession: "",
    occupation: "",
    workPlace: "",
    workContact: "",

    livesAlone: "",
    livesWith: "",
    familyRole: "",
    liveWithWho: "",

    nextOfKin: "",
    nextOfKinPhone: "",
  });

  const tabs = [
    "Taarifa Binafsi",
    "Taarifa za Imani",
    "Elimu na Kazi",
    "Familia",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle =
    "w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500";

  const labelStyle = "block mb-1 text-sm font-medium";

  return (
    <div className="space-y-6">

      {/* ================= TABS ================= */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === i
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= TAB 1 ================= */}
      {activeTab === 0 && (
        <ComponentCard title="Taarifa Binafsi">
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className={labelStyle}>Jina Kamili</label>
              <input className={inputStyle} name="fullName" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Jinsia</label>
              <Select
                placeholder="Chagua jinsia"
                value={form.gender}
                onChange={(val: any) =>
                  setForm((p) => ({ ...p, gender: val }))
                }
                options={[
                  { value: "Mwanaume", label: "Mwanaume" },
                  { value: "Mwanamke", label: "Mwanamke" },
                ]}
              />
            </div>

            <div>
              <label className={labelStyle}>Tarehe ya Kuzaliwa</label>
              <input type="date" className={inputStyle} name="birthDate" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Mahali pa Kuzaliwa</label>
              <input className={inputStyle} name="birthPlace" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Simu</label>
              <input className={inputStyle} name="phone" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>WhatsApp</label>
              <input className={inputStyle} name="whatsappNumber" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Email</label>
              <input className={inputStyle} name="email" onChange={handleChange} />
            </div>

          </div>
        </ComponentCard>
      )}

      {/* ================= TAB 2 ================= */}
      {activeTab === 1 && (
        <ComponentCard title="Taarifa za Imani">
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className={labelStyle}>Tarehe ya Kuokoka</label>
              <input type="date" className={inputStyle} name="dateOfConversion" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Kanisa la Kuokoka</label>
              <input className={inputStyle} name="churchOfConversion" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Tarehe ya Ubatizo</label>
              <input type="date" className={inputStyle} name="baptismDate" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Mahali pa Ubatizo</label>
              <input className={inputStyle} name="baptismPlace" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Aliyekubatiza</label>
              <input className={inputStyle} name="baptizerName" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Cheo cha Mubatizaji</label>
              <input className={inputStyle} name="baptizerTitle" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Hali ya Kanisa</label>
              <Select
                placeholder="Chagua"
                value={form.previousChurchStatus}
                onChange={(val: any) =>
                  setForm((p) => ({ ...p, previousChurchStatus: val }))
                }
                options={[
                  { value: "Nimehamia", label: "Nimehamia" },
                  { value: "Nimeokoka hapa", label: "Nimeokoka hapa" },
                ]}
              />
            </div>

          </div>
        </ComponentCard>
      )}

      {/* ================= TAB 3 ================= */}
      {activeTab === 2 && (
        <ComponentCard title="Elimu na Kazi">
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className={labelStyle}>Elimu</label>
              <Select
                placeholder="Chagua elimu"
                value={form.educationLevel}
                onChange={(val: any) =>
                  setForm((p) => ({ ...p, educationLevel: val }))
                }
                options={[
                  { value: "Msingi", label: "Msingi" },
                  { value: "Sekondari", label: "Sekondari" },
                  { value: "Chuo", label: "Chuo" },
                ]}
              />
            </div>

            <div>
              <label className={labelStyle}>Taaluma</label>
              <input className={inputStyle} name="profession" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Kazi</label>
              <Select
                placeholder="Chagua kazi"
                value={form.occupation}
                onChange={(val: any) =>
                  setForm((p) => ({ ...p, occupation: val }))
                }
                options={[
                  { value: "Ajira", label: "Nimeajiriwa" },
                  { value: "Biashara", label: "Nimejiajiri" },
                  { value: "Mwanafunzi", label: "Mwanafunzi" },
                ]}
              />
            </div>

          </div>
        </ComponentCard>
      )}

      {/* ================= TAB 4 ================= */}
      {activeTab === 3 && (
        <ComponentCard title="Familia">
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className={labelStyle}>Anaishi Pekee?</label>
              <Select
                placeholder="Chagua"
                value={form.livesAlone}
                onChange={(val: any) =>
                  setForm((p) => ({ ...p, livesAlone: val }))
                }
                options={[
                  { value: "ndio", label: "Ndio" },
                  { value: "hapana", label: "Hapana" },
                ]}
              />
            </div>

            <div>
              <label className={labelStyle}>Next of Kin</label>
              <input className={inputStyle} name="nextOfKin" onChange={handleChange} />
            </div>

            <div>
              <label className={labelStyle}>Simu ya Next of Kin</label>
              <input className={inputStyle} name="nextOfKinPhone" onChange={handleChange} />
            </div>

          </div>
        </ComponentCard>
      )}

    </div>
  );
}