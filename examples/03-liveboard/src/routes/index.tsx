import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col px-6 sm:px-10">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="flex items-center justify-between border-stone-300 border-b py-7">
        <a className="font-bold text-xl tracking-tight" href="/">
          LiveBoard<span className="text-teal-700">.</span>
        </a>
        <span className="rounded-full border border-stone-300 px-3 py-1 font-medium text-stone-700 text-xs">
          Early foundation
        </span>
      </header>
      <main
        className="flex flex-1 flex-col justify-center py-16 sm:py-24"
        id="main"
        tabIndex={-1}
      >
        <p className="mb-5 font-semibold text-sm text-teal-800 uppercase tracking-widest">
          A little clarity, together
        </p>
        <h1 className="max-w-3xl font-semibold text-5xl leading-tight tracking-tight sm:text-7xl">
          A shared place for your next move.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-stone-700 leading-relaxed">
          LiveBoard is taking shape as a planning space for small teams. Shared
          boards will help everyone stay close to the plan as it changes.
        </p>
        <section
          aria-labelledby="setup-title"
          className="mt-12 max-w-xl rounded-2xl border border-stone-300 bg-white p-6 sm:p-8"
        >
          <p className="mb-3 font-medium text-sm text-teal-800">
            Collaboration awaits setup
          </p>
          <h2 className="font-semibold text-xl" id="setup-title">
            The space is ready to take shape.
          </h2>
          <p className="mt-3 text-stone-700 leading-relaxed">
            Backend connection and authentication await configuration. Boards,
            team membership, and live updates are not available yet.
          </p>
          <p className="mt-4 text-sm text-stone-600">
            No private team data is stored by this shell.
          </p>
        </section>
      </main>
      <footer className="border-stone-300 border-t py-6 text-sm text-stone-600">
        LiveBoard · Plan together, move together.
      </footer>
    </div>
  );
}
