import Link from "next/link";

export default function Card({ tool }) {
  const categories = Array.isArray(tool.categories)
    ? tool.categories
    : (typeof tool.categories === 'string' ? tool.categories.split(',').map((category) => category.trim()).filter(Boolean) : []);
  const visitLink = tool.visitLink || '';

  return (
    <article className="grid gap-4 rounded-lg border border-white/20 bg-white p-4 text-slate-900 shadow-md transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-xl md:grid-cols-[180px_1fr_auto] md:items-center md:p-5">
      <div className="aspect-[16/10] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
        {tool.imageURL ? (
          <img
            className="h-full w-full object-cover"
            src={tool.imageURL}
            alt={`${tool.title || 'AI tool'} screenshot`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sky-50 text-sm font-semibold text-sky-700">
            AI Tool
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap gap-2">
          {categories.slice(0, 4).map((category) => (
            <span key={category} className="rounded-md bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
              {category}
            </span>
          ))}
          {categories.length > 4 && (
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              +{categories.length - 4}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold leading-snug text-slate-950">{tool.title || 'Untitled tool'}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {tool.description || 'No description provided.'}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 md:w-44 md:flex-col md:items-stretch md:border-l md:border-t-0 md:pl-4 md:pt-0">
        <div>
          <p className="text-sm font-bold text-slate-900">{tool.pricingType || 'Pricing'}</p>
          {tool.pricingPrice && <p className="mt-1 text-sm text-slate-500">{tool.pricingPrice}</p>}
        </div>

        {visitLink ? (
          <Link
            href={visitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-sky-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Visit site
          </Link>
        ) : (
          <span className="rounded-md bg-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-500">
            No link
          </span>
        )}
      </div>
    </article>
  );
}
