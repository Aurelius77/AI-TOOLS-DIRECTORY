import Image from "next/image";

export default function Card() {
  return (
  <div className="w-full flex items-center justify-center">
    <div className="flex flex-col text-black md:flex-row items-center justify-between w-full md:w-11/12 bg-white p-5 m-3 rounded-md border border-gray-300 hover:shadow-lg hover:border-gray-400 transition-transform transform hover:scale-105">
      <div className="w-full md:w-1/4 border border-gray-300 rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://usercontent.one/wp/www.insidr.ai/wp-content/uploads/2024/08/Skjermbilde-2024-08-05-kl.-10.11.55.png?media=1714509658"
          alt="AI tool screenshot"
        />
      </div>
      <div className="w-full md:w-1/4 flex flex-col items-center p-3">
        <img
          src="https://usercontent.one/wp/www.insidr.ai/wp-content/uploads/2023/02/insidr-ai_ad-creative-ai.png?media=1714509658"
          alt="logo"
          className="w-20 h-20 object-contain"
        />
        <p className="m-2 text-center text-sm text-blue-500">
          #AI Social Media #AI Image Generators #AI Marketing #AI Content Generator #AI Ecommerce #AI Productivity Tools
        </p>
      </div>
      <div className="w-full md:w-4/12 flex flex-col items-center p-3">
        <p className="m-2 text-lg font-bold">Adcreative</p>
        <p className="text-sm text-center">
          The #1 AI tool for advertising. AdCreative.ai is an AI-powered tool that generates high-conversion ad creatives, texts, and headlines. It optimizes digital marketing campaigns, providing data-driven insights and competitor analysis to improve conversion rates by up to 14 times. Suitable for startups, e-commerce, agencies, and enterprises.
        </p>
      </div>
      <div className="w-full md:w-1/6 flex flex-col items-center p-3">
        <p className="font-semibold">Free trial</p>
        <p className="mb-2">$15/per month</p>
        <button className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition">Visit site</button>
      </div>
    </div>
    </div>
  );
}
