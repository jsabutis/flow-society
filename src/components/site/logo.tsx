import Link from "next/link";
import localFont from "next/font/local";

const wordmark = localFont({
  src: "../../fonts/GT-Haptik-Black-Rotalic.woff2",
  weight: "900",
  style: "normal",
  display: "swap",
});

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="Flow Society"
    >
      <span
        aria-hidden="true"
        className="gear-spin h-8 w-8 shrink-0 bg-[var(--color-terracotta)]"
        style={{
          WebkitMask: "url('/gear.svg') center / contain no-repeat",
          mask: "url('/gear.svg') center / contain no-repeat",
        }}
      />
      <span
        className={`${wordmark.className} text-xl md:text-2xl leading-none tracking-tight`}
      >
        <img
          src="/flow_society_vector.svg"
          alt="Flow Society"
          className="block h-[1em] w-auto"
        />
      </span>
    </Link>
  );
}
