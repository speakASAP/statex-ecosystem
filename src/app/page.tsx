import { EcosystemCatalog } from "@/components/EcosystemCatalog";
import { getEcosystemItems } from "@/data/ecosystemRuntime";

export default async function Home() {
  const ecosystemItems = await getEcosystemItems();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-white/10 bg-black/20 px-6 py-10 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-violet-300">
            Statex / Alfares
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ecosystem catalog
          </h1>
          <p className="max-w-2xl text-lg text-zinc-300">
            Applications and microservices you can explore or license. Pick a
            category, then open the live site or API where available.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Canonical list: <code className="text-zinc-400">shared/README.md</code>{" "}
            and <code className="text-zinc-400">shared/ECOSYSTEM_MAP.md</code> in
            the Statex workspace.
          </p>
        </div>
      </header>
      <main className="flex flex-1 justify-center px-6 py-12">
        <EcosystemCatalog items={ecosystemItems} />
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-sm text-zinc-500">
        <a
          href="https://statex-ecosystem.alfares.cz"
          className="text-zinc-400 hover:text-zinc-300"
        >
          statex-ecosystem.alfares.cz
        </a>
      </footer>
    </div>
  );
}
