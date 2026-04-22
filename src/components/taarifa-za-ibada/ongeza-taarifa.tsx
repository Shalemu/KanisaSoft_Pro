'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { apiFetch } from '@/lib/api';

import Label from '@/components/form/Label';
import InputField from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';

export default function OngezaTaarifaZaIbada() {
  const serviceTypes = [
    'Ibada ya kimataifa',
    'Ibada ya Pili',
    'Ibada ya Tatu',
    'Ibada ya Vijana',
    'Ibada ya wanawake',
    'Ibada ya Neno la Mungu',
  ];

  const [formData, setFormData] = useState({
    date: '',
    service_name: '',
    preacher: '',
    preacher_description: '',
    message: '',
    attendance_children: 0,
    attendance_women: 0,
    attendance_men: 0,
    total_attendance: 0,
    total_offerings: 0,
    leaders_on_duty: '',
  });


  // SAFE EVENT HANDLER
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated: any = {
        ...prev,
        [name]:
          name.includes('attendance') || name === 'total_offerings'
            ? Number(value)
            : value,
      };

      updated.total_attendance =
        updated.attendance_children +
        updated.attendance_women +
        updated.attendance_men;

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { total_attendance, ...body } = formData;

      const res = await apiFetch('/service-events', {
        method: 'POST',
        body,
      });

      if (res.status === 'success') {
        Swal.fire('Success', 'Taarifa imehifadhiwa!', 'success');

        setFormData({
          date: '',
          service_name: '',
          preacher: '',
          preacher_description: '',
          message: '',
          attendance_children: 0,
          attendance_women: 0,
          attendance_men: 0,
          total_attendance: 0,
          total_offerings: 0,
          leaders_on_duty: '',
        });
      } else {
        Swal.fire('Error', res.message || 'Imeshindikana', 'error');
      }
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Tatizo la mtandao', 'error');
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">
        Ongeza Taarifa za Ibada
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* DATE */}
        <div>
          <Label>Tarehe</Label>
          <InputField
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* SERVICE */}
        <div>
          <Label>Aina ya Huduma</Label>
          <select
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Chagua Huduma</option>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* PREACHER */}
        <div>
          <Label>Mhubiri</Label>
          <InputField
            name="preacher"
            type="text"
            value={formData.preacher}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Maelezo ya Mhubiri</Label>
          <InputField
            name="preacher_description"
            type="text"
            value={formData.preacher_description}
            onChange={handleChange}
          />
        </div>

        {/* LEADER */}
        <div>
          <Label>Kiongozi wa Ibada</Label>
          <InputField
            name="leaders_on_duty"
            type="text"
            value={formData.leaders_on_duty}
            onChange={handleChange}
          />
        </div>

        {/* CHILDREN */}
        <div>
          <Label>Watoto</Label>
          <InputField
            name="attendance_children"
            type="number"
            value={formData.attendance_children}
            onChange={handleChange}
          />
        </div>

        {/* WOMEN */}
        <div>
          <Label>Wanawake</Label>
          <InputField
            name="attendance_women"
            type="number"
            value={formData.attendance_women}
            onChange={handleChange}
          />
        </div>

        {/* MEN */}
        <div>
          <Label>Wanaume</Label>
          <InputField
            name="attendance_men"
            type="number"
            value={formData.attendance_men}
            onChange={handleChange}
          />
        </div>

        {/* TOTAL */}
        <div>
          <Label>Jumla ya Mahudhurio</Label>
          <InputField
            name="total_attendance"
            type="number"
            value={formData.total_attendance}
            disabled
            onChange={() => {}}
          />
        </div>

        {/* OFFERINGS */}
        <div>
          <Label>Sadaka</Label>
          <InputField
            name="total_offerings"
            type="number"
            value={formData.total_offerings}
            onChange={handleChange}
          />
        </div>

        {/* MESSAGE */}
        <div className="md:col-span-2">
          <Label>Ujumbe</Label>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
     <button
        type="submit"
        className="w-full bg-[#334155] text-white py-3 rounded"
        >
        Hifadhi Taarifa
        </button>
        </div>

      </form>
    </div>
  );
}