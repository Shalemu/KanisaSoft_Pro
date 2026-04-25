'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Swal from 'sweetalert2';
import { Link } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const primary = "#f0ce32";

  const tabTitles = [
    'Taarifa Binafsi',
    'Taarifa za Imani',
    'Elimu na Kazi',
    'Familia',
  ];

  const zoneOptions = [
    'MURUBOMBO',
    'MURUSI B',
    'KIGANAMO',
    'MURUSI A',
    'KUMUNYIKA B',
    'KAGUNGA C',
    'KUMUNYIKA A',
    'KAGANGA B',
    'MURUBONA A',
    'KAGUNGA A',
  ];

  const [form, setForm] = useState({
    fullName: '',
    gender: '',

    // BIRTH
    birth_date: '',
    birthRegion: '',
    birthDistrict: '',
    birthWard: '',
    birthStreet: '',

    // RESIDENCE
    residenceWard: '',
    residenceStreet: '',

    zone: '',
    maritalType: '',
    spouseName: '',

    childrenCount: '',

    hasDisability: '',
    disabilityDescription: '',

    phone: '',
    whatsappNumber: '',
    email: '',
    password: '',
    passwordConfirmation: '',

    // IMANI
    conversionYear: '',
    conversionMonth: '',
    conversionDay: '',

    churchOfConversion: '',

    baptismYear: '',
    baptismMonth: '',
    baptismDay: '',

    baptismPlace: '',
    baptizerName: '',
    baptizerTitle: '',

    previousChurch: '',
    churchService: '',
    serviceDuration: '',

    participatesCommunion: '',

    // ELIMU
    educationLevel: '',
    profession: '',
    occupation: '',
    occupationDesc: '',
    workPlace: '',
    workContact: '',

    // FAMILIA
    livesAlone: '',
    livesWith: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // ---------------- VALIDATION ----------------

  const validateTab0 = () => {
    const req = ['fullName', 'gender', 'phone', 'email', 'password', 'passwordConfirmation'];

    for (const k of req) {
      if (!form[k as keyof typeof form]) {
        Swal.fire('Error', 'Jaza taarifa za msingi', 'warning');
        return false;
      }
    }

    if (form.password !== form.passwordConfirmation) {
      Swal.fire('Error', 'Passwords hazifanani', 'error');
      return false;
    }

    return true;
  };

  const validateTab1 = () => {
    if (!form.conversionYear || !form.baptismYear) {
      Swal.fire('Tahadhari', 'Mwaka wa kuokoka na ubatizo ni lazima', 'warning');
      return false;
    }
    return true;
  };

  const next = (e: any) => {
    e.preventDefault();

    if (activeTab === 0 && !validateTab0()) return;
    if (activeTab === 1 && !validateTab1()) return;

    setActiveTab((t) => t + 1);
  };

  const submit = async (e: any) => {
  e.preventDefault();

  if (!validateTab0() || !validateTab1()) return;

  const payload = {
    full_name: form.fullName,
    gender: form.gender,

    birth_region: form.birthRegion,
    birth_ward: form.birthWard,
    birth_street: form.birthStreet,

    children_count: Number(form.childrenCount) || 0,

    birth_date: form.birth_date ,

    residential_ward: form.residenceWard,
    residential_street: form.residenceStreet,
    birth_place: `${form.birthRegion} ${form.birthDistrict} ${form.birthWard}`.trim(),

    zone: form.zone,
    marriage_type: form.maritalType,
    spouse_name: form.spouseName,

    has_disability: form.hasDisability === 'ndio',
    disability_description: form.disabilityDescription,

    phone: form.phone,
    whatsapp_number: form.whatsappNumber,
    email: form.email,

    password: form.password,
    password_confirmation: form.passwordConfirmation,

   conversion_year: Number(form.conversionYear),
baptism_year: Number(form.baptismYear),
    conversion_month: form.conversionMonth,
    conversion_day: form.conversionDay,

    church_of_conversion: form.churchOfConversion,

   
    baptism_month: form.baptismMonth,
    baptism_day: form.baptismDay,

    baptism_place: form.baptismPlace,
    baptizer_name: form.baptizerName,
    baptizer_title: form.baptizerTitle,

    previous_church: form.previousChurch,
    church_service: form.churchService,
    service_duration: form.serviceDuration,

    participates_communion: form.participatesCommunion === 'ndio',

    education_level: form.educationLevel,
    profession: form.profession,
    occupation: form.occupation,
    work_place: form.workPlace,
    work_contact: form.workContact,

    lives_alone: form.livesAlone === 'ndio',
    lives_with: form.livesWith,
  };

  console.log("FINAL PAYLOAD:", payload); 

  try {
    setLoading(true);

    const res = await apiFetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.error) {
      Swal.fire('Success', 'Usajili umefanikiwa', 'success');
      router.push('/login');
    } else {
      Swal.fire('Error', res.message, 'error');
    }

  } finally {
    setLoading(false);
  }
};

  // ---------------- UI ----------------
  return (
    <>
      <Head>
        <title>Usajili</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#130728] via-[#211a45] to-[#253266] px-4">

        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 text-white">

          <h1 className="text-center text-2xl font-bold mb-6">
            Fomu ya Usajili
          </h1>

          {/* TABS (UNCHANGED) */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {tabTitles.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeTab === i
                    ? `bg-[${primary}] text-black`
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={activeTab === 3 ? submit : next}>

            {/* ---------------- TAB 0 ---------------- */}
            {activeTab === 0 && (
  <div className="grid md:grid-cols-2 gap-4">

    <Input
      label="Jina Kamili"
      name="fullName"
      required
      onChange={handleChange}
    />

    <Select
      label="Jinsia"
      name="gender"
      options={['Mwanaume', 'Mwanamke']}
      required
      onChange={handleChange}
    />

    {/* BIRTH */}
    <Input
      label="Tarehe ya Kuzaliwa"
      name="birth_date" 
      type="date"
      required
      onChange={handleChange}
    />
  <Input
  label="Idadi ya Watoto"
  name="childrenCount"
  type="number"
  min={0}
  onChange={handleChange}
/>

    <Input label="Mkoa wa Kuzaliwa" name="birthRegion" onChange={handleChange} />
    <Input label="Wilaya" name="birthDistrict" onChange={handleChange} />
    <Input label="Kata ya Kuzaliwa" name="birthWard" onChange={handleChange} />
    <Input label="Mtaa wa Kuzaliwa" name="birthStreet" onChange={handleChange} />

    {/* RESIDENCE */}
    <Input label="Kata ya Kuishi" name="residenceWard" onChange={handleChange} />
    <Input label="Mtaa wa Kuishi" name="residenceStreet" onChange={handleChange} />

    {/* ZONE */}
    <Select
      label="Zoni"
      name="zone"
      options={zoneOptions}
      onChange={handleChange}
    />

    {/* MARITAL */}
    <Select
      label="Aina ya Ndoa"
      name="maritalType"
      options={['Kikristo', 'Kiserikali', 'Kienyeji']}
      onChange={handleChange}
    />

    <Input label="Jina la Mwenza (hiari)" name="spouseName" onChange={handleChange} />

    {/* DISABILITY */}
    <Select
      label="Hali ya Ulemavu"
      name="hasDisability"
      options={['hapana', 'ndio']}
      onChange={handleChange}
    />

    {form.hasDisability === 'ndio' && (
      <Input
        label="Maelezo ya Ulemavu"
        name="disabilityDescription"
        onChange={handleChange}
      />
    )}

    {/* CONTACT */}
    <Input label="Simu" name="phone" required onChange={handleChange} />
    <Input label="WhatsApp (hiari)" name="whatsappNumber" onChange={handleChange} />
    <Input label="Email" name="email" required onChange={handleChange} />

    <Input
      label="Password"
      name="password"
      type="password"
      required
      onChange={handleChange}
    />

    <Input
      label="Confirm Password"
      name="passwordConfirmation"
      type="password"
      required
      onChange={handleChange}
    />

  </div>
)}

            {/* ---------------- TAB 1 ---------------- */}
            {activeTab === 1 && (
              <div className="grid md:grid-cols-2 gap-4">

           {/* CONVERSION */}
          <Input label="Mwaka wa Kuokoka *" name="conversionYear" type="number" onChange={handleChange} />

          <Input
            label="Mwezi (1-12)"
            name="conversionMonth"
            type="number"
            min={1}
            max={12}
            onChange={handleChange}
          />

          <Input
            label="Siku (1-31)"
            name="conversionDay"
            type="number"
            min={1}
            max={31}
            onChange={handleChange}
          />

                {/* BAPTISM */}
                <Input label="Mwaka wa Ubatizo *" name="baptismYear" onChange={handleChange} />
                <Input label="Mwezi (hiari)" name="baptismMonth" onChange={handleChange} />
                <Input label="Siku (hiari)" name="baptismDay" onChange={handleChange} />

                <Input label="Mahali pa Ubatizo" name="baptismPlace" onChange={handleChange} />
                <Input label="Aliyekubatiza" name="baptizerName" onChange={handleChange} />
                <Input label="Cheo chake" name="baptizerTitle" onChange={handleChange} />

                <Input label="Kanisa la Zamani (hiari)" name="previousChurch" onChange={handleChange} />

                {/* NEW QUESTION */}
                <Select
                  label="Je unashiriki Meza ya Bwana?"
                  name="participatesCommunion"
                  options={['ndio','hapana']}
                  onChange={handleChange}
                />

                <Input label="Huduma (hiari)" name="churchService" onChange={handleChange} />
                <Input label="Muda wa Huduma (hiari)" name="serviceDuration" onChange={handleChange} />

              </div>
            )}

            {/* ---------------- TAB 2 ---------------- */}
            {activeTab === 2 && (
              <div className="grid md:grid-cols-2 gap-4">

                <Select
                  label="Elimu"
                  name="educationLevel"
                  options={['Msingi','Sekondari','Chuo']}
                  onChange={handleChange}
                />

                <Input label="Taaluma" name="profession" onChange={handleChange} />

                {/* UPDATED REQUIRED FIELD */}
                <Input label="Kazi / Shughuli *" name="occupation" onChange={handleChange} />

                <Input label="Maelezo ya Kazi (hiari)" name="occupationDesc" onChange={handleChange} />

                <Input label="Sehemu ya Kazi (hiari)" name="workPlace" onChange={handleChange} />
                <Input label="Mawasiliano ya Kazi (hiari)" name="workContact" onChange={handleChange} />

              </div>
            )}

            {/* ---------------- TAB 3 ---------------- */}
            {activeTab === 3 && (
              <div className="grid md:grid-cols-2 gap-4">

                <Select
                  label="Unaishi peke yako?"
                  name="livesAlone"
                  options={['ndio','hapana']}
                  onChange={handleChange}
                />

                <Input label="Unaishi na nani? (hiari)" name="livesWith" onChange={handleChange} />

              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg font-bold text-black"
              style={{ backgroundColor: primary }}
            >
              {activeTab === 3 ? 'JISAJILI' : 'ENDELEA'}
            </button>

            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-center text-sm">
                Tayari una akaunti?{' '}
                <a href="/login" className="text-[#f0ce32] underline font-medium">
                  Ingia hapa
                </a>
              </p>

              <Link href="/" className="text-sm font-medium text-[#f0ce32] hover:underline">
                ← Rudi Nyumbani
              </Link>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

/* INPUT */
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm mb-1 block">{label}</label>
      <input
        {...props}
        className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:ring-2 focus:ring-[#f0ce32]"
      />
    </div>
  );
}

/* SELECT */
function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="text-sm mb-1 block">{label}</label>
      <select
        {...props}
        className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:ring-2 focus:ring-[#f0ce32]"
      >
        <option value="">Chagua</option>
        {options.map((o: string) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}