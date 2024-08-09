'use client'
import { useEffect, useState } from "react";
import Card from "../card/page";
import { toolsData } from "@/app/backend/tools";

export default function HomePage() {
   const [tools, setTools] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchTools, setSearchTools] = useState([]);
   const [term, setTerm] = useState('');
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState('')
   const itemsPerPage = 10;

   useEffect(() => {
      function getResources() {
         try {
            const fetchedTools = toolsData;
            setTools(fetchedTools)

             const toolCategories = new Set();
            fetchedTools.forEach((tool) => {
               if (tool.categories && Array.isArray(tool.categories)) {
                  tool.categories.forEach(category => toolCategories.add(category));
               }
            });
            setCategories(Array.from(toolCategories));


         } catch (err) {
            console.log('Error fetching tools:', err);
         }
      }

      getResources();
   }, []); 

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentTools = tools.slice(indexOfFirstItem, indexOfLastItem);

   const totalPages = Math.ceil(tools.length / itemsPerPage);

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const renderPagination = () => {
      const pageNumbers = [];
      const maxPageNumbersToShow = 4;

      if (totalPages <= maxPageNumbersToShow) {
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
               <button
                  key={i}
                  className={`mx-2 px-4 py-2 rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => handlePageChange(i)}
               >
                  {i}
               </button>
            );
         }
      } else {
         const startPage = Math.max(1, currentPage - 2);
         const endPage = Math.min(totalPages, currentPage + 2);

         if (startPage > 1) {
            pageNumbers.push(
               <button
                  key={1}
                  className={`mx-2 px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => handlePageChange(1)}
               >
                  1
               </button>
            );
            if (startPage > 2) {
               pageNumbers.push(<span key="ellipsis1" className="mx-2">...</span>);
            }
         }

         for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
               <button
                  key={i}
                  className={`mx-2 px-4 py-2 rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => handlePageChange(i)}
               >
                  {i}
               </button>
            );
         }

         if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
               pageNumbers.push(<span key="ellipsis2" className="mx-2">...</span>);
            }
            pageNumbers.push(
               <button
                  key={totalPages}
                  className={`mx-2 px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => handlePageChange(totalPages)}
               >
                  {totalPages}
               </button>
            );
         }
      }

      return pageNumbers;
   };

   const handleSearch = (searchTerm) => {
      if (searchTerm === '') {
         setSearchTools(tools);
      } else {
         const lowercasedTerm = searchTerm.toLowerCase();
         const searchResults = tools.filter(
            (tool) =>
               tool.title.toLowerCase().includes(lowercasedTerm)
         );
         setSearchTools(searchResults);
      }
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSearch(term);
      }
   };

   function filterCategory(category){
      if(category == 'All'){
         setSelectedCategory('All')
         setSearchTools(tools)
         return
      }
        if(selectedCategory === category){
         setSelectedCategory('')
          setSearchTools(tools)
        }
        else{
          const searchResults = tools.filter((tool)=> tool.categories.includes(category))
          console.log('selected')
          setSelectedCategory(category)
          setSearchTools(searchResults)
        }
   }

   

   const resources = searchTools.length > 0 ? searchTools : currentTools;

   return (
      <>
         <section className="w-full flex justify-center">
            <h1 className='text-3xl p-3 m-3 mt-5 font-bold'>
               Unlock AI Potential: Find the Right Tools for Every Task
            </h1>
         </section>
         <section className='search flex flex-col'>
            <div className="w-full flex items-center justify-center">
               <input
                  type='text'
                  className="rounded-md p-3 m-2 border text-black border-gray-300"
                  value={term}
                  placeholder="Search for tool"
                  onChange={(e) => setTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
               />
            </div>
         </section>

        <section className="mt-8 w-full flex overflow-x-auto pb-4 scrollbar-thin">
    <div className="flex gap-4 items-center">
        <div
            className={`cursor-pointer bg-white p-3 rounded-lg shadow-md min-w-[100px] text-center flex-shrink-0 ${selectedCategory === 'All' ? 'bg-black text-white' : ''}`}
            onClick={() => { filterCategory('All') }}
        >
            <p className={`${selectedCategory === 'All' ? 'text-white' : 'text-gray-700'}`}>All</p>
        </div>
        {categories.length > 0 ? (
            categories.map((category, index) => (
                <div key={index}
                    className={`cursor-pointer bg-white p-3 rounded-lg shadow-md min-w-[100px] text-center flex-shrink-0 ${selectedCategory === category ? 'bg-black text-white' : ''}`}
                    onClick={() => { filterCategory(category) }}
                >
                    <p className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'}`}>{category}</p>
                </div>
            ))
        ) : (
            ''
        )}
    </div>
</section>



         <section className="tools-grid grid grid-cols-1 gap-4 p-5">
            {resources.length > 0 ? (
               resources.map((tool) => (
                  <Card key={tool.title} tool={tool} />
               ))
            ) : (
               <h1>Loading...</h1>
            )}
         </section>

         <div className="pagination flex justify-center mt-4">
            {renderPagination()}
         </div>
      </>
   );
}
