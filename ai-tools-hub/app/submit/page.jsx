'use client'

import { useState } from "react";
import { addTools } from "../backend/server";
import Dashboard from "../components/Dashboard";

const initialFormData = {
  title: '',
  description: '',
  visitLink: '',
  imageURL: '',
  categories: '',
  pricingType: 'Freemium',
  pricingPrice: '',
};

export default function Submit() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modal, setModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      categories: formData.categories
        .split(',')
        .map((category) => category.trim())
        .filter(Boolean),
    };

    try {
      const response = await addTools([payload]);
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
            <h1 className="text-3xl font-bold">Submit a Tool</h1>
            <p className="mt-2 text-sm text-slate-600">Share an AI tool with the community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">Tool Name*</label>
              <input
                id="title"
                required
                type="text"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={formData.title}
                name="title"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">Description*</label>
              <textarea
                id="description"
                required
                className="min-h-32 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={formData.description}
                name="description"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="visitLink" className="mb-2 block text-sm font-semibold text-slate-700">Website URL*</label>
              <input
                id="visitLink"
                required
                type="url"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={formData.visitLink}
                name="visitLink"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="imageURL" className="mb-2 block text-sm font-semibold text-slate-700">Logo or Screenshot URL</label>
              <input
                id="imageURL"
                type="url"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={formData.imageURL}
                name="imageURL"
                onChange={handleInputChange}
                placeholder="https://example.com/image.png"
              />
            </div>

            <div>
              <label htmlFor="categories" className="mb-2 block text-sm font-semibold text-slate-700">Categories</label>
              <input
                id="categories"
                type="text"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                onChange={handleInputChange}
                value={formData.categories}
                name="categories"
                placeholder="AI Writing Tools, AI Productivity Tools"
              />
              <p className="mt-2 text-xs text-slate-500">Separate categories with commas.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="pricingType" className="mb-2 block text-sm font-semibold text-slate-700">Pricing Type</label>
                <select
                  id="pricingType"
                  name="pricingType"
                  value={formData.pricingType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                >
                  <option>Free</option>
                  <option>Freemium</option>
                  <option>Trial</option>
                  <option>Paid</option>
                  <option>Contact for pricing</option>
                </select>
              </div>

              <div>
                <label htmlFor="pricingPrice" className="mb-2 block text-sm font-semibold text-slate-700">Starting Price</label>
                <input
                  id="pricingPrice"
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  value={formData.pricingPrice}
                  name="pricingPrice"
                  onChange={handleInputChange}
                  placeholder="from $9 / mo"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {loading ? 'Submitting...' : 'Submit Tool'}
            </button>
          </form>
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
