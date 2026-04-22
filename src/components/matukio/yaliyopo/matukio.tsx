'use client';

import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';
import { Card, CardContent } from '@/components/ui/card';

interface EventType {
  id: number;
  title: string;
  date: string;
  time?: string;
  location?: string;
  category: string;
  description?: string;
}

interface Group {
  id: number;
  name: string;
}

export default function Matukio() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    fetchEvents();
    fetchGroups();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    if (data.status === 'success') setEvents(data.events);
  };

  const fetchGroups = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    if (data.status === 'success') setGroups(data.groups);
  };

  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate >= today &&
        event.title.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === 'All' || event.category === selectedCategory)
      );
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const openModal = (event: EventType, edit = false) => {
    setSelectedEvent({ ...event });
    setIsEditing(edit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold flex items-center gap-2">
         <FaCalendarAlt className="text-3xl text-[#f0ce32]" />
          Orodha ya Matukio
        </h2>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Tafuta tukio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded w-full"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="All">Zote</option>
          {groups.map((g) => (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* EVENTS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent>

              <div className="flex justify-between">
                <h3 className="font-bold">{event.title}</h3>
                <span className="text-xs bg-indigo-100 px-2 rounded">
                  {event.category}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <div className="flex gap-2">
                  <FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}
                </div>

                {event.time && (
                  <div className="flex gap-2">
                    <FaClock /> {event.time}
                  </div>
                )}

                {event.location && (
                  <div className="flex gap-2">
                    <FaMapMarkerAlt /> {event.location}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openModal(event)}
                  className="flex-1 border rounded py-1 text-indigo-600"
                >
                  Angalia
                </button>

                <button
                  onClick={() => openModal(event, true)}
                  className="flex-1 border rounded py-1 text-yellow-600"
                >
                  Hariri
                </button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* MODAL */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />

        {selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-md">

              <h2 className="text-xl font-bold mb-4">
                {isEditing ? 'Hariri Tukio' : selectedEvent.title}
              </h2>

              {!isEditing ? (
                <p>{selectedEvent.description}</p>
              ) : (
                <input
                  value={selectedEvent.title}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, title: e.target.value })
                  }
                  className="border p-2 w-full"
                />
              )}

              <button onClick={closeModal} className="mt-4 border px-4 py-2">
                Funga
              </button>

            </Dialog.Panel>
          </div>
        )}
      </Dialog>

    </div>
  );
}