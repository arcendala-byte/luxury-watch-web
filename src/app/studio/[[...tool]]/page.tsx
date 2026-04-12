/**
 * This route would handle Sanity Studio, but it's not configured for this project.
 * This project uses Prisma + PostgreSQL for content management instead.
 */

export default function StudioPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl font-light tracking-tight mb-4">Sanity Studio Not Configured</h1>
        <p className="text-white/60 mb-8">This project uses Prisma + PostgreSQL for content management</p>
        <p className="text-white/40 text-sm">To set up Sanity CMS, install next-sanity and configure a sanity.config.ts file</p>
      </div>
    </div>
  );
}
