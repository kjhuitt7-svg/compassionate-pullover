import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Column, ParamedicMark, TopBar } from "@/components/chrome";
import { usePullover } from "@/lib/store";

export const Route = createFileRoute("/unlock")({
  component: UnlockPage,
});

function UnlockPage() {
  const navigate = useNavigate();
  const unlock = usePullover((s) => s.unlock);
  const unlocked = usePullover((s) => s.unlocked);

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar title="Unlock" />
      <div className="bottom-half flex-1 bg-primary text-accent">
        <Column>
          <div className="scope-bg rounded-lg p-5 text-black">
            <h2 className="flex items-start gap-2 text-4xl font-extrabold leading-none">
              <ParamedicMark className="mt-1 size-8" />
              $4.99 once
            </h2>
            <p className="mt-4 text-lg font-extrabold leading-relaxed">
              The first note is free. This keeps the rest on this phone.
            </p>
            <ul className="mt-5 space-y-3 text-xl font-extrabold">
              <li>Another note after every visit</li>
              <li>More than one person to send it to</li>
              <li>Earlier notes, still on this phone</li>
            </ul>
            <button
              type="button"
              disabled={unlocked}
              onClick={() => {
                unlock();
                void navigate({ to: "/" });
              }}
              className="mt-6 flex h-14 w-full items-center justify-center rounded-md bg-primary text-lg font-bold text-primary-fg disabled:opacity-60"
            >
              {unlocked ? "Unlocked" : "Unlock"}
            </button>
            <p className="mt-3 text-base font-extrabold leading-relaxed">
              The App Store charges $4.99 once. This preview unlocks on this phone.
            </p>
          </div>
        </Column>
      </div>
    </div>
  );
}
