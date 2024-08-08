import Image from "next/image";
import Link from "next/link";

export default function Card({tool}) {
  return (
  <div className="w-full flex items-center justify-center">
    <div className="flex flex-col text-black md:flex-row items-center justify-between w-full md:w-11/12 bg-white p-5 m-3 rounded-md border border-gray-300 hover:shadow-lg hover:border-gray-400 transition-transform transform hover:scale-105">
      <div className="w-full md:w-1/4 border border-gray-300 rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={tool.imageURL}
          alt="AI tool screenshot"
        />
      </div>
      <div className="w-full md:w-1/4 flex flex-col items-center p-3">
        <p className="m-2 text-center text-sm text-blue-500">
              {tool.categories.reduce((acc, category, index) => 
    acc === null ? [category] : [...acc, ' # ', category], null)}
          </p>

      </div>
      <div className="w-full md:w-4/12 flex flex-col items-center p-3">
        <p className="m-2 text-lg font-bold">{tool.title}</p>
        <p className="text-sm text-center">
         {tool.description}
        </p>
      </div>
      <div className="w-full md:w-1/6 flex flex-col items-center p-3">
        <p className="font-semibold">{tool.pricingType? tool.pricingType : ''}</p>
        <p className="mb-2">{tool.pricingPrice? tool.pricingPrice : ''}</p>
        <button className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"><Link href={tool.visitLink}>Visit site</Link></button>
      </div>
    </div>
    </div>
  );
}
