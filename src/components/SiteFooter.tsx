import Link from "next/link";
import { SITE } from "@/data/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div>
          <div className="font-[Space_Grotesk] text-xl font-semibold">
            NoNameHub
          </div>
          <div className="mt-4 flex gap-2">
            <a
              href={SITE.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:border-violet-400/40 hover:bg-violet-400/10"
              aria-label="Discord"
            >
              💬
            </a>
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:border-violet-400/40 hover:bg-violet-400/10"
              aria-label="YouTube"
            >
              ▶
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Product
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/resources" className="text-zinc-400 hover:text-white">
                All resources
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="text-zinc-400 hover:text-white">
                How it works
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Community
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={SITE.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Company
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-zinc-400 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-zinc-400 hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-zinc-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-zinc-600">
          © {year} NoNameHub
        </p>
      </div>
    </footer>
  );
}