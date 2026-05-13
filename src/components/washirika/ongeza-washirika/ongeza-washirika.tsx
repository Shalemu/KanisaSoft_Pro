"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemberForm } from "@/hooks/useMemberForm";
import Field from "@/components/form/field";
import Select from "@/components/form/Select";
import PasswordField from "@/components/form/PasswordField";

export default function OngezaMshirika() {
  const router = useRouter();

  const {
    form,
    loading,
    activeTab,
    setActiveTab,
    tabTitles,
    handleChange,
    handleNext,
    handleRegister,
  } = useMemberForm(router);


  // TAB CONTENT


  const renderTabContent = () => {
    switch (activeTab) {

    
      // TAB 1 - TAARIFA BINAFSI
    

case 0:
  return (
    <>
      <Field
        label="Jina Kamili *"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
      />

      {/* Gender */}

      <div>
        <label className="block mb-1 text-sm font-medium text-white">
          Jinsia *
        </label>

   <Select
 
  name="gender"
  value={form.gender}
  onChange={handleChange}
  options={[
    {
      value: "Mwanaume",
      label: "Mwanaume",
    },
    {
      value: "Mwanamke",
      label: "Mwanamke",
    },
  ]}
/>
      </div>

      <Field
        label="Tarehe ya Kuzaliwa *"
        name="birthDate"
        type="date"
        value={form.birthDate}
        onChange={handleChange}
      />

      <Field
        label="Mkoa Ulipozaliwa *"
        name="birthRegion"
        value={form.birthRegion}
        onChange={handleChange}
      />

      <Field
        label="Wilaya Ulipozaliwa *"
        name="birthDistrict"
        value={form.birthDistrict}
        onChange={handleChange}
      />

      <Field
        label="Kata Ulipozaliwa"
        name="birthWard"
        value={form.birthWard}
        onChange={handleChange}
      />

      <Field
        label="Mtaa Ulipozaliwa"
        name="birthStreet"
        value={form.birthStreet}
        onChange={handleChange}
      />

      <Field
        label="Kata Unapoishi *"
        name="residentialWard"
        value={form.residentialWard}
        onChange={handleChange}
      />

      <Field
        label="Mtaa Unapoishi *"
        name="residentialStreet"
        value={form.residentialStreet}
        onChange={handleChange}
      />

      {/* Zone */}

      <div>
        <label className="block mb-1 text-sm font-medium text-white">
          Mtaa *
        </label>

    <Select
  
  name="zone"
  value={form.zone}
  onChange={handleChange}
  options={[
    { value: "MURUBOMBO", label: "MURUBOMBO" },
    { value: "MURUSI B", label: "MURUSI B" },
    { value: "KIGANAMO", label: "KIGANAMO" },
    { value: "MURUSI A", label: "MURUSI A" },
    { value: "KUMUNYIKA B", label: "KUMUNYIKA B" },
  ]}
  className="bg-[#2d314b] text-white border-gray-500"
/>
      </div>

      {/* Marital Status */}

      <div>
        <label className="block mb-1 text-sm font-medium text-white">
          Hali ya Ndoa *
        </label>

        <Select

  name="maritalStatus"
  value={form.maritalStatus}
  onChange={handleChange}
  options={[
    { value: "Nimeoa", label: "Nimeoa" },
    { value: "Nimeolewa", label: "Nimeolewa" },
    { value: "Sijaoa", label: "Sijaoa" },
    { value: "Sijaolewa", label: "Sijaolewa" },
    { value: "Mjane", label: "Mjane" },
    { value: "Mgane", label: "Mgane" },
  ]}
  className="bg-[#2d314b] text-white border-gray-500"
/>
      </div>

      {/* Marriage Type */}

      {(form.maritalStatus === "Nimeoa" ||
        form.maritalStatus === "Nimeolewa") && (
        <>
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Aina ya Ndoa *
            </label>

            <Select

  name="marriageType"
  value={form.marriageType}
  onChange={handleChange}
  options={[
    { value: "Kikristo", label: "Kikristo" },
    { value: "Kiserikali", label: "Kiserikali" },
    { value: "Kienyeji", label: "Kienyeji" },
  ]}
  className="bg-[#2d314b] text-white border-gray-500"
/>
          </div>

          <Field
            label="Jina la Mwenza *"
            name="spouseName"
            value={form.spouseName}
            onChange={handleChange}
          />
        </>
      )}

      <Field
        label="Idadi ya Watoto"
        name="childrenCount"
        type="number"
        value={form.childrenCount}
        onChange={handleChange}
      />

      <Field
        label="Namba ya Simu *"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />

      <Field
        label="Namba ya WhatsApp"
        name="whatsappNumber"
        value={form.whatsappNumber}
        onChange={handleChange}
      />

      <Field
        label="Barua Pepe"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <PasswordField
        label="Neno la Siri *"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <PasswordField
        label="Thibitisha Neno la Siri *"
        name="passwordConfirmation"
        value={form.passwordConfirmation}
        onChange={handleChange}
      />

      {/* Disability */}

      <div>
        <label className="block mb-1 text-sm font-medium text-white">
          Je, una ulemavu? *
        </label>

        <Select

  name="hasDisability"
  value={form.hasDisability}
  onChange={handleChange}
  options={[
    { value: "ndio", label: "Ndio" },
    { value: "hapana", label: "Hapana" },
  ]}
  className="bg-[#2d314b] text-white border-gray-500"
/>
      </div>

      {form.hasDisability === "ndio" && (
        <Field
          label="Eleza Aina ya Ulemavu *"
          name="disabilityDescription"
          value={form.disabilityDescription}
          onChange={handleChange}
        />
      )}
    </>
  );

      // =====================================
      // TAB 2 - IMANI
      // =====================================

      case 1:
        return (
          <>
            <Field
              label="Kanisa Ulipookoka"
              name="churchOfConversion"
              value={form.churchOfConversion}
              onChange={handleChange}
            />

            <Field
              label="Mahali Ulipobatizwa"
              name="baptismPlace"
              value={form.baptismPlace}
              onChange={handleChange}
            />

            <Field
              label="Aliyekubatiza *"
              name="baptizerName"
              value={form.baptizerName}
              onChange={handleChange}
            />

            <Field
              label="Cheo cha Aliyekubatiza *"
              name="baptizerTitle"
              value={form.baptizerTitle}
              onChange={handleChange}
            />

            <Field
              label="Huduma Unayofanya"
              name="churchService"
              value={form.churchService}
              onChange={handleChange}
            />
          </>
        );

  
      // TAB 3 - ELIMU
  

      case 2:
        return (
          <>
            <Field
              label="Kiwango cha Elimu"
              name="educationLevel"
              value={form.educationLevel}
              onChange={handleChange}
            />

            <Field
              label="Taaluma"
              name="profession"
              value={form.profession}
              onChange={handleChange}
            />

            <Field
              label="Kazi"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
            />

            <Field
              label="Mahali pa Kazi"
              name="workPlace"
              value={form.workPlace}
              onChange={handleChange}
            />

            <Field
              label="Mawasiliano ya Kazi"
              name="workContact"
              value={form.workContact}
              onChange={handleChange}
            />
          </>
        );

      
      // TAB 4 - FAMILIA

      case 3:
        return (
          <>
            <Field
              label="Mtu wa Karibu"
              name="nextOfKin"
              value={form.nextOfKin}
              onChange={handleChange}
            />

            <Field
              label="Namba ya Simu ya Mtu wa Karibu"
              name="nextOfKinPhone"
              value={form.nextOfKinPhone}
              onChange={handleChange}
            />
          </>
        );

      default:
        return null;
    }
  };

 
  // PAGE


  return (
    <>
      <Head>
        <title>Jisajili</title>
      </Head>

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-5xl bg-gradient-to-br from-[#130728] via-[#211a45] to-[#253266] rounded-3xl p-8 shadow-2xl text-white">

          <h1 className="text-3xl font-bold text-center mb-8">
            Fomu ya Usajili wa Mshirika
          </h1>

          {/* Tabs */}

          <div className="flex flex-wrap gap-3 justify-center mb-8">

            {tabTitles.map((tab, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setActiveTab(index)
                }
                className={`px-5 py-2 rounded-full transition-all ${
                  activeTab === index
                    ? "bg-[#f0ce32] text-black font-bold"
                    : "bg-white/10 text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FORM */}

          <form
            onSubmit={
              activeTab ===
              tabTitles.length - 1
                ? handleRegister
                : handleNext
            }
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {renderTabContent()}

            <button
              type="submit"
              disabled={loading}
              className="col-span-full py-3 rounded-xl bg-[#f0ce32] text-black font-bold hover:scale-[1.02] transition-all"
            >
              {loading
                ? "Inasajili..."
                : activeTab ===
                  tabTitles.length - 1
                ? "JISAJILI SASA"
                : "ENDELEA"}
            </button>
          </form>

          {/* FOOTER */}

          <div className="mt-6 text-center">
            <p>
              Tayari una akaunti?

              <Link
                href="/login"
                className="text-[#f0ce32] ml-2 underline"
              >
                Ingia hapa
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}