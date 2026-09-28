import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { usePullover } from "@/lib/store";

export function HydratePullover() {
  useEffect(() => {
    void usePullover.persist.rehydrate();
  }, []);
  return null;
}

export function When({ at, withTime = false }: { at: number; withTime?: boolean }) {
  const [label, setLabel] = useState("");
  useEffect(() => {
    setLabel(format(at, withTime ? "EEE, MMM d · h:mm a" : "EEE, MMM d"));
  }, [at, withTime]);
  return <span className="tabular-nums">{label || "—"}</span>;
}

export function TopBar({ title, to = "/" }: { title: string; to?: "/" | "/settings" }) {
  return (
    <header className="ekg-top sticky top-0 z-10 border-b-2 border-black text-ink">
      <div className="mx-auto flex h-14 max-w-xl items-center gap-1 px-2">
        <Link
          to={to}
          aria-label="Back"
          className="flex size-11 items-center justify-center rounded-md"
        >
          <ArrowLeft className="size-5" strokeWidth={1.75} />
        </Link>
        <h1 className="flex min-w-0 items-center gap-1.5 text-lg font-bold">
          <ParamedicMark />
          <span className="truncate">{title}</span>
        </h1>
      </div>
    </header>
  );
}

export function Column({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-xl px-5 py-6 ${className}`}>{children}</div>;
}

export function ParamedicMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`inline-block shrink-0 ${className}`} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.2 14.6 7.6 21.6 6.4 17.2 12 21.6 17.6 14.6 16.4 12 22.8 9.4 16.4 2.4 17.6 6.8 12 2.4 6.4 9.4 7.6Z"
      />
      <circle cx="12" cy="12" r="3.3" fill="#fff" />
      <path d="M12 9.2v5.6" stroke="#000" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12 10.2c1.5.7 1.5 1.4 0 2.1s-1.5 1.4 0 2.1" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
