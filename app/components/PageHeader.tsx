export default function PageHeader({
  title,
  sub,
}: {
  title: string;
  sub?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-[#d9f3ee] via-[#eaf8f6] to-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-extrabold text-[#0a1f44] sm:text-5xl">
          {title}
        </h1>
        {sub && <p className="mt-3 max-w-2xl text-lg text-slate-500">{sub}</p>}
      </div>
    </section>
  );
}
