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

    const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => String(currentYear - i));
  const months = [
    { value: '1', label: 'Januari' }, { value: '2', label: 'Februari' }, { value: '3', label: 'Machi' },
    { value: '4', label: 'Aprili' }, { value: '5', label: 'Mei' }, { value: '6', label: 'Juni' },
    { value: '7', label: 'Julai' }, { value: '8', label: 'Agosti' }, { value: '9', label: 'Septemba' },
    { value: '10', label: 'Oktoba' }, { value: '11', label: 'Novemba' }, { value: '12', label: 'Desemba' },
  ];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));


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
  { value: "Ameoa", label: "Nimeoa" },
  { value: "Ameolewa", label: "Nimeolewa" },
  { value: "Hajaoa", label: "Sijaoa" },
  { value: "Hajaolewa", label: "Sijaolewa" },
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


      // TAB 2 - IMANI
      
case 1:
  return (
    <>
      {/* ===== TAREHE YA KUOKOKA ===== */}
      <div className="col-span-full">
        <label className="block mb-2 text-sm font-medium text-white">
          Tarehe ya Kuokoka *
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            name="conversionYear"
            value={form.conversionYear}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-[#2d314b] text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Mwaka *</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            name="conversionMonth"
            value={form.conversionMonth}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-[#2d314b] text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Mwezi *</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            name="conversionDay"
            value={form.conversionDay}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-[#2d314b] text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Siku *</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full">
        <Field
          label="Kanisa / Mahali Ulipookoka"
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
      </div>

      {/* ===== TAREHE YA UBATIZO ===== */}
      <div className="col-span-full mt-2">
        <label className="block mb-2 text-sm font-medium text-white">
          Tarehe ya Ubatizo *
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            name="baptismYear"
            value={form.baptismYear}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-[#2d314b] text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Mwaka *</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            name="baptismMonth"
            value={form.baptismMonth}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-[#2d314b] text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Mwezi *</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            name="baptismDay"
            value={form.baptismDay}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-[#2d314b] text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Siku *</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full">
        <Field
          label="Cheo cha Aliyekubatiza *"
          name="baptizerTitle"
          value={form.baptizerTitle}
          onChange={handleChange}
        />

        <Select
          label="Umehamia / Umeokoka Hapa? *"
          name="previousChurchStatus"
          value={form.previousChurchStatus}
          onChange={handleChange}
          options={[
            { value: "Nimehamia", label: "Nimehamia" },
            { value: "Nimeokoka hapa", label: "Nimeokoka hapa" },
          ]}
        />

        <Field
          label="Huduma Unayofanya"
          name="churchService"
          value={form.churchService}
          onChange={handleChange}
        />
      </div>

      {/* ===== IF NIMEHAMIA ===== */}
      {form.previousChurchStatus === "Nimehamia" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full">
          <Field
            label="Tangu Lini? *"
            name="tanguLini"
            type="month"
            value={form.tanguLini}
            onChange={handleChange}
          />

          <Field
            label="Kanisa Ulipotoka *"
            name="kanisaUlipotoka"
            value={form.kanisaUlipotoka}
            onChange={handleChange}
          />

          <Select
            label="Je, Unashiriki Meza ya Bwana? *"
            name="participatesCommunion"
            value={form.participatesCommunion}
            onChange={handleChange}
            options={[
              { value: "ndio", label: "Ndio" },
              { value: "hapana", label: "Hapana" },
            ]}
          />
        </div>
      )}

      {/* ===== IF SI NIMEHAMIA ===== */}
      {form.previousChurchStatus !== "Nimehamia" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full">
          <Select
            label="Je, Unashiriki Meza ya Bwana? *"
            name="participatesCommunion"
            value={form.participatesCommunion}
            onChange={handleChange}
            options={[
              { value: "ndio", label: "Ndio" },
              { value: "hapana", label: "Hapana" },
            ]}
          />
        </div>
      )}
    </>
  );
  
      // TAB 3 - ELIMU
  

     case 2:
  return (
    <>
      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full">
        <Select
          label="Kiwango cha Elimu *"
          name="educationLevel"
          value={form.educationLevel}
          onChange={handleChange}
          options={[
            { value: "Sijasoma", label: "Sijasoma" },
            { value: "Elimu ya msingi", label: "Elimu ya msingi" },
            { value: "Elimu ya sekondari", label: "Elimu ya sekondari" },
            { value: "Elimu ya chuo", label: "Elimu ya chuo" },
            { value: "Elimu ya chuo kikuu", label: "Elimu ya chuo kikuu" },
          ]}
        />

        <Field
          label="Taaluma (Hiari)"
          name="profession"
          value={form.profession}
          onChange={handleChange}
        />

        <Select
          label="Aina ya Kazi au Shughuli *"
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
          options={[
            { value: "Nimeajiriwa", label: "Nimeajiriwa" },
            { value: "Nimejiajiri", label: "Nimejiajiri" },
            { value: "Mwanafunzi", label: "Mwanafunzi" },
            { value: "Sina kazi", label: "Sina kazi" },
          ]}
        />
      </div>

      {/* ===== ROW 2 (CONDITIONAL) ===== */}
      {(form.occupation === "Nimeajiriwa" ||
        form.occupation === "Nimejiajiri") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full mt-2">
          <Field
            label="Kazi au Shughuli gani? (Hiari)"
            name="workPlace"
            value={form.workPlace}
            onChange={handleChange}
          />

          <Field
            label="Mahali pa Kazi (Hiari)"
            name="workPlace"
            value={form.workPlace}
            onChange={handleChange}
          />

          <Field
            label="Mawasiliano ya Kazi (Hiari)"
            name="workContact"
            value={form.workContact}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
      
      // TAB 4 - FAMILIA

     case 3:
  return (
    <>
      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full">
        <Select
          label="Unaishi Peke Yako? *"
          name="livesAlone"
          value={form.livesAlone}
          onChange={handleChange}
          options={[
            { value: "ndio", label: "Ndio" },
            { value: "hapana", label: "Hapana" },
          ]}
        />

        <Field
          label="Jina la Mtu wa Karibu"
          name="nextOfKin"
          value={form.nextOfKin}
          onChange={handleChange}
        />

        <Field
          label="Namba ya Simu ya Mtu wa Karibu"
          name="nextOfKinPhone"
          value={form.nextOfKinPhone}
          onChange={handleChange}
          type="tel"
        />
      </div>

      {/* ===== CONDITIONAL FAMILY INFO ===== */}
      {form.livesAlone === "hapana" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-full mt-2">
          <Select
            label="Nafasi yako katika Familia"
            name="familyRole"
            value={form.familyRole}
            onChange={handleChange}
            options={[
              { value: "Mzazi", label: "Mzazi" },
              { value: "Mtoto", label: "Mtoto" },
              { value: "Ndugu", label: "Ndugu" },
            ]}
          />

          <Select
            label="Unaishi na Nani"
            name="liveWithWho"
            value={form.liveWithWho}
            onChange={handleChange}
            options={[
              { value: "Wazazi", label: "Wazazi" },
              { value: "Ndugu", label: "Ndugu" },
              { value: "Marafiki", label: "Marafiki" },
              { value: "Wengine", label: "Wengine" },
            ]}
          />

          {/* empty slot for perfect 3-column alignment */}
          <div />
        </div>
      )}
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
        <title>Sajili Mshirika</title>
      </Head>

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-5xl bg-linear-to-br from-[#130728] via-[#211a45] to-[#253266] rounded-3xl p-8 shadow-2xl text-white">

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