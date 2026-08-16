'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";
import { toolsData } from "@/app/backend/tools";

const ITEMS_PER_PAGE = 10;
const CATEGORY_SCROLL_SPEED = 45; // category marquee auto-scroll, pixels per second

// Tool `categories` arrive as either an array or a comma-separated string, and
// some are prefixed with '#' (e.g. "#AI Agents") while others aren't ("AI Agents").
// Normalize to a clean string array — stripping any leading '#' — so the category
// bar, filter, and search all agree on one label per category.
const cleanCategory = (category) => String(category).trim().replace(/^#+\s*/, '').trim();

const toCategoryArray = (categories) => {
   const raw = Array.isArray(categories)
      ? categories
      : (typeof categories === 'string' ? categories.split(',') : []);

   return raw.map(cleanCategory).filter(Boolean);
};

export default function HomePage() {
   const [tools, setTools] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [term, setTerm] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('All');
   const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
   const categoryScrollRef = useRef(null);

   useEffect(() => {
      setTools(toolsData.map((tool) => ({
         ...tool,
         categories: toCategoryArray(tool.categories),
      })));
   }, []);

   const categories = useMemo(() => {
      const toolCategories = new Set();

      tools.forEach((tool) => {
         if (Array.isArray(tool.categories)) {
            tool.categories.forEach((category) => toolCategories.add(category));
         }
      });

      return Array.from(toolCategories).sort((a, b) => a.localeCompare(b));
   }, [tools]);

   const categoryItems = useMemo(() => ['All', ...categories], [categories]);

   const filteredTools = useMemo(() => {
      const searchTerm = term.trim().toLowerCase();

      return tools.filter((tool) => {
         const matchesCategory = selectedCategory === 'All' || tool.categories?.includes(selectedCategory);
         const matchesSearch = !searchTerm
            || tool.title?.toLowerCase().includes(searchTerm)
            || tool.description?.toLowerCase().includes(searchTerm)
            || tool.categories?.some((category) => category.toLowerCase().includes(searchTerm));

         return matchesCategory && matchesSearch;
      });
   }, [tools, term, selectedCategory]);

   const totalPages = Math.max(1, Math.ceil(filteredTools.length / ITEMS_PER_PAGE));
   const indexOfFirstItem = (currentPage - 1) * ITEMS_PER_PAGE;
   const currentTools = filteredTools.slice(indexOfFirstItem, indexOfFirstItem + ITEMS_PER_PAGE);

   useEffect(() => {
      setCurrentPage(1);
   }, [term, selectedCategory]);

   useEffect(() => {
      if (currentPage > totalPages) {
         setCurrentPage(totalPages);
      }
   }, [currentPage, totalPages]);

   useEffect(() => {
      const scrollContainer = categoryScrollRef.current;

      if (!scrollContainer || isAutoScrollPaused || categoryItems.length <= 1) {
         return;
      }

      // Respect reduced-motion preferences — users can still swipe/scroll manually.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
         return;
      }

      let animationFrame;
      let lastTimestamp;

      const animateScroll = (timestamp) => {
         if (lastTimestamp === undefined) {
            lastTimestamp = timestamp;
         }

         const delta = timestamp - lastTimestamp;
         lastTimestamp = timestamp;

         // scrollWidth spans both duplicated category sets, so half of it is
         // one full set — the point where we loop back seamlessly.
         const loopPoint = scrollContainer.scrollWidth / 2;

         if (loopPoint > scrollContainer.clientWidth) {
            scrollContainer.scrollLeft += (delta * CATEGORY_SCROLL_SPEED) / 1000;

            if (scrollContainer.scrollLeft >= loopPoint) {
               scrollContainer.scrollLeft -= loopPoint;
            }
         }

         animationFrame = requestAnimationFrame(animateScroll);
      };

      animationFrame = requestAnimationFrame(animateScroll);

      return () => cancelAnimationFrame(animationFrame);
   }, [categoryItems.length, isAutoScrollPaused]);

   const renderCategoryButton = (category, key) => (
      <button
         key={key}
         type="button"
         className={`min-w-max rounded-md border px-4 py-2 text-sm font-semibold transition ${selectedCategory === category ? 'border-white bg-slate-950 text-white' : 'border-white/50 bg-white text-slate-700 hover:bg-sky-50'}`}
         onClick={() => setSelectedCategory(category)}
      >
         {category}
      </button>
   );

   const renderPagination = () => {
      if (filteredTools.length <= ITEMS_PER_PAGE) {
         return null;
      }

      const pageNumbers = [];
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      const buttonClass = (pageNumber) => `min-h-10 min-w-10 rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/80 ${currentPage === pageNumber ? 'bg-white text-sky-700 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`;

      if (startPage > 1) {
         pageNumbers.push(
            <button key={1} className={buttonClass(1)} onClick={() => setCurrentPage(1)}>
               1
            </button>
         );
         if (startPage > 2) {
            pageNumbers.push(<span key="ellipsis1" className="px-1 text-white/80">...</span>);
         }
      }

      for (let i = startPage; i <= endPage; i++) {
         pageNumbers.push(
            <button key={i} className={buttonClass(i)} onClick={() => setCurrentPage(i)}>
               {i}
            </button>
         );
      }

      if (endPage < totalPages) {
         if (endPage < totalPages - 1) {
            pageNumbers.push(<span key="ellipsis2" className="px-1 text-white/80">...</span>);
         }
         pageNumbers.push(
            <button key={totalPages} className={buttonClass(totalPages)} onClick={() => setCurrentPage(totalPages)}>
               {totalPages}
            </button>
         );
      }

      return pageNumbers;
   };

   return (
      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-12 md:px-8">
         <section className="py-8 text-center text-white md:py-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">{tools.length}+ curated resources</p>
            <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
               Unlock AI Potential: Find the Right Tools for Every Task
            </h1>
         </section>

         <section className="rounded-lg border border-white/25 bg-white/15 p-4 shadow-lg backdrop-blur md:p-5">
            <label htmlFor="tool-search" className="sr-only">Search tools</label>
            <input
               id="tool-search"
               type="search"
               className="w-full rounded-md border border-white/30 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
               value={term}
               placeholder="Search by name, description, or category"
               onChange={(e) => setTerm(e.target.value)}
            />

            <div
               ref={categoryScrollRef}
               className="category-scroll mt-5 overflow-x-auto pb-2 scrollbar-thin"
               aria-label="Tool categories"
               onPointerEnter={() => setIsAutoScrollPaused(true)}
               onPointerLeave={() => setIsAutoScrollPaused(false)}
               onFocus={() => setIsAutoScrollPaused(true)}
               onBlur={() => setIsAutoScrollPaused(false)}
            >
               <div className="flex w-max gap-3 pr-3">
                  {categoryItems.map((category) => renderCategoryButton(category, `primary-${category}`))}
                  {categoryItems.map((category) => renderCategoryButton(category, `duplicate-${category}`))}
               </div>
            </div>
         </section>

         <div className="mt-5 flex items-center justify-between text-sm text-white/85">
            <p>{filteredTools.length} tool{filteredTools.length === 1 ? '' : 's'} found</p>
            {filteredTools.length > ITEMS_PER_PAGE && <p>Page {currentPage} of {totalPages}</p>}
         </div>

         <section className="mt-4 grid grid-cols-1 gap-4">
            {currentTools.length > 0 ? (
               currentTools.map((tool) => (
                  <Card key={tool._id?.$oid || tool.title} tool={tool} />
               ))
            ) : (
               <div className="rounded-lg border border-white/25 bg-white p-8 text-center text-slate-700 shadow-lg">
                  <h2 className="text-xl font-bold text-slate-900">No tools found</h2>
                  <p className="mt-2 text-sm">Try another search term or category.</p>
               </div>
            )}
         </section>

         <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {renderPagination()}
         </div>
      </main>
   );
}
