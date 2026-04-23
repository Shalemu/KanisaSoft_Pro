'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Swal from 'sweetalert2';

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

  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    birthDate: '',
    birthPlace: '',
    residence: '',
    zone: '',
    maritalStatus: '',
    spouseName: '',
    childrenCount: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    password: '',
    passwordConfirmation: '',

    dateOfConversion: '',
    churchOfConversion: '',
    baptismDate: '',
    baptismPlace: '',
    baptizerName: '',
    baptizerTitle: '',
    previousChurchStatus: '',
    tanguLini: '',
    kanisaUlipotoka: '',

    educationLevel: '',
    profession: '',
    occupation: '',
    workPlace: '',
    workContact: '',

    livesAlone: '',
    nextOfKin: '',
    nextOfKinPhone: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // ---------------- VALIDATION ----------------
  const validateTab0 = () => {
    const req = [
      'fullName',
      'gender',
      'birthDate',
      'birthPlace',
      'residence',
      'zone',
      'maritalStatus',
      'phone',
      'email',
      'password',
      'passwordConfirmation',
    ];

    for (const k of req) {
      if (!form[k as keyof typeof form]) {
        Swal.fire('Taarifa Inakosekana', 'Jaza taarifa zote za msingi', 'warning');
        return false;
      }
    }

    if (form.password !== form.passwordConfirmation) {
      Swal.fire('Makosa', 'Passwords hazifanani', 'error');
      return false;
    }

    return true;
  };

  const validateTab1 = () => {
    const req = [
      'dateOfConversion',
      'churchOfConversion',
      'baptismDate',
      'baptizerName',
      'baptizerTitle',
      'previousChurchStatus',
    ];

    for (const k of req) {
      if (!form[k as keyof typeof form]) {
        Swal.fire('Tahadhari', 'Jaza taarifa za imani', 'warning');
        return false;
      }
    }

    if (form.previousChurchStatus === 'Nimehamia') {
      if (!form.tanguLini || !form.kanisaUlipotoka) {
        Swal.fire('Tahadhari', 'Jaza taarifa za kanisa ulipotoka', 'warning');
        return false;
      }
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

    try {
      setLoading(true);

      const res = await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (!res.error) {
        Swal.fire('Success', 'Usajili umefanikiwa', 'success').then(() =>
          router.push('/login')
        );
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

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#130728] via-[#211a45] to-[#253266] px-4">

        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 text-white">

          {/* TITLE */}
          <h1 className="text-center text-2xl font-bold mb-6">
            Fomu ya Usajili
          </h1>

          {/* TABS */}
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

            {/* TAB 0 */}
            {activeTab === 0 && (
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Jina Kamili" name="fullName" onChange={handleChange} />
                <Select label="Jinsia" name="gender" onChange={handleChange}
                  options={['Mwanaume','Mwanamke']} />

                <Input type="date" label="Tarehe ya Kuzaliwa" name="birthDate" onChange={handleChange} />
                <Input label="Mahali pa Kuzaliwa" name="birthPlace" onChange={handleChange} />
                <Input label="Mahali pa Kuishi" name="residence" onChange={handleChange} />

                <Select label="Zoni" name="zone" onChange={handleChange}
                  options={['Kigamboni','Kinondoni','Tandika']} />

                <Select label="Hali ya Ndoa" name="maritalStatus" onChange={handleChange}
                  options={['Nimeoa','Nimeolewa','Sijaoa','Sijaolewa']} />

                {form.maritalStatus.includes('Nime') && (
                  <Input label="Jina la Mwenza" name="spouseName" onChange={handleChange} />
                )}

                <Input label="Simu" name="phone" onChange={handleChange} />
                <Input label="Email" name="email" onChange={handleChange} />
                <Input label="Password" name="password" type="password" onChange={handleChange} />
                <Input label="Confirm Password" name="passwordConfirmation" type="password" onChange={handleChange} />
              </div>
            )}

            {/* TAB 1 */}
            {activeTab === 1 && (
              <div className="grid md:grid-cols-2 gap-4">
                <Input type="date" label="Kuokoka" name="dateOfConversion" onChange={handleChange} />
                <Input label="Kanisa" name="churchOfConversion" onChange={handleChange} />
                <Input type="date" label="Ubatizo" name="baptismDate" onChange={handleChange} />
                <Input label="Aliyekubatiza" name="baptizerName" onChange={handleChange} />
                <Input label="Cheo" name="baptizerTitle" onChange={handleChange} />

                <Select label="Hali ya Kanisa" name="previousChurchStatus" onChange={handleChange}
                  options={['Nimehamia','Nimeokoka hapa']} />

                {form.previousChurchStatus === 'Nimehamia' && (
                  <>
                    <Input type="month" label="Tangu Lini" name="tanguLini" onChange={handleChange} />
                    <Input label="Kanisa ulipotoka" name="kanisaUlipotoka" onChange={handleChange} />
                  </>
                )}
              </div>
            )}

            {/* TAB 2 */}
            {activeTab === 2 && (
              <div className="grid md:grid-cols-2 gap-4">
                <Select label="Elimu" name="educationLevel" onChange={handleChange}
                  options={['Msingi','Sekondari','Chuo']} />

                <Input label="Taaluma" name="profession" onChange={handleChange} />

                <Select label="Kazi" name="occupation" onChange={handleChange}
                  options={['Nimeajiriwa','Nimejiajiri','Sina kazi']} />

                {form.occupation === 'Nimeajiriwa' && (
                  <>
                    <Input label="Sehemu ya Kazi" name="workPlace" onChange={handleChange} />
                    <Input label="Mawasiliano" name="workContact" onChange={handleChange} />
                  </>
                )}
              </div>
            )}

            {/* TAB 3 */}
            {activeTab === 3 && (
              <div className="grid md:grid-cols-2 gap-4">
                <Select label="Unaishi peke yako?" name="livesAlone" onChange={handleChange}
                  options={['ndio','hapana']} />

                <Input label="Next of Kin" name="nextOfKin" onChange={handleChange} />
                <Input label="Simu ya Next of Kin" name="nextOfKinPhone" onChange={handleChange} />
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
          </form>
        </div>
      </div>
    </>
  );
}

// INPUT
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

// SELECT FIXED (VISIBLE TEXT + BRAND STYLE)
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
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}