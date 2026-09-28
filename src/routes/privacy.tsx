import { createFileRoute } from "@tanstack/react-router";
import { Column, ParamedicMark, TopBar } from "@/components/chrome";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar title="Privacy" to="/settings" />
      <div className="bottom-half flex-1 bg-primary text-accent">
      <Column>
        <div className="scope-bg space-y-5 rounded-lg p-5 text-lg font-extrabold leading-relaxed text-black">
        <h2 className="flex items-start gap-2 font-display text-4xl font-extrabold leading-none">
          <ParamedicMark className="mt-1 size-8" />
          Notes stay on this phone.
        </h2>
        <p>
          Pullover keeps visit notes in this browser. There is no account. Closing the tab does not upload your
          list. Clearing the browser's site data deletes the notes.
        </p>
        <p>
          When you tap Shape the note, the recap you typed or dictated, plus the name and clinic you entered, is
          sent once to an AI service to arrange it into what changed, what to watch, and what's next. That text is
          not used to build a medical record here. If you tap Save my words instead, nothing is sent.
        </p>
        <p>
          Copy and Share hand the note to whatever app you pick — a text thread, mail, or nothing. Pullover does
          not message your family on its own.
        </p>
        <p>
          Pullover does not record the appointment. You recap it afterward, in your own words. It is not medical
          advice, not a patient portal, and not for emergencies.
        </p>
        <p>The app is not directed at children. Don't put someone else's full medical chart into it.</p>
        <p className="text-base font-extrabold">Last updated September 28, 2026.</p>
        </div>
      </Column>
      </div>
    </div>
  );
}
