'use client'

import { useState } from "react"
import { addContactMessages } from "../backend/server";
import Dashboard from "../components/Dashboard";
import Link from "next/link";

const initialFormData = {
  email: '',
  message: '',
  contact: '',
};

const socialLinks = [
  { href: 'https://x.com/aureliustheIV', label: 'X', color: 'bg-slate-950' },
  { href: 'https://github.com/Aurelius77', label: 'GH', color: 'bg-slate-800' },
  { href: 'https://www.linkedin.com/in/samson-akinpelu-abb585258/', label: 'IN', color: 'bg-sky-700' },
  { href: 'https://wa.me/+2348147364017', label: 'WA', color: 'bg-green-600' },
];

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modal, setModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addContactMessages([formData]);
      setModalText(response.message);

      if (response.success) {
        setFormData(initialFormData);
      }
    } catch (err) {
      setModalText('Something went wrong. Check network settings or try again.');
    } finally {
      setModal(true);
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  return (
    <>
      <Dashboard />
      <main className="mx-auto w-full max-w-2xl px-4 pb-12">
        <section className="mt-8 rounded-lg border border-white/25 bg-white p-6 text-slate-900 shadow-xl md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="mt-2 text-sm text-slate-600">Send a message and we will get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email*</label>
              <input
                id="email"
                required
                type="email"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">Message*</label>
              <textarea
                id="message"
                required
                className="min-h-32 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={formData.message}
                name="message"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="contact" className="mb-2 block text-sm font-semibold text-slate-700">Additional Contact</label>
              <input
                id="contact"
                type="text"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                onChange={handleInputChange}
                value={formData.contact}
                name="contact"
              />
              <p className="mt-2 text-xs text-slate-500">Add a phone number or social handle if email is not the best option.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="text-center text-sm font-semibold text-slate-700">You can also reach us at</h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-md text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 ${link.color}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center text-slate-900 shadow-2xl">
            <p className="text-base font-semibold">{modalText}</p>
            <button onClick={() => setModal(false)} className="mt-5 rounded-md bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
