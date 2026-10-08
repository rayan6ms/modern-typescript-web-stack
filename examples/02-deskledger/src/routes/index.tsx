import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded((value) => !value), []);
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 sm:px-12">
      <header className="flex items-center justify-between gap-6 border-border border-b py-7">
        <a className="font-semibold text-xl tracking-tight" href="/">
          DeskLedger<span className="text-primary">.</span>
        </a>
        <span className="rounded-full bg-secondary px-3 py-1 font-medium text-xs">
          Em preparação
        </span>
      </header>
      <main className="flex-1 py-16 sm:py-24" id="conteudo" tabIndex={-1}>
        <p className="mb-6 font-semibold text-primary text-sm uppercase tracking-widest">
          Para agências brasileiras
        </p>
        <h1 className="max-w-3xl font-semibold text-5xl leading-tight tracking-tight sm:text-7xl">
          Mais clareza para o trabalho da sua agência.
        </h1>
        <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Um espaço para reunir projetos e pessoas, acompanhar responsabilidades
          e manter a equipe alinhada.
        </p>
        <div className="mt-10">
          <Button
            aria-controls="proximos-passos"
            aria-expanded={expanded}
            className="h-12 px-5"
            onClick={toggleExpanded}
          >
            {expanded
              ? "Ocultar próximos passos"
              : "Conhecer os próximos passos"}
          </Button>
          <section
            className="mt-6 max-w-xl rounded-xl border border-border bg-white p-6"
            hidden={!expanded}
            id="proximos-passos"
          >
            <h2 className="font-semibold text-xl">
              Estamos preparando o DeskLedger
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              O acesso à conta e a gestão de projetos estarão disponíveis em uma
              próxima etapa. Esta página apresenta a proposta do produto.
            </p>
          </section>
        </div>
        <div className="mt-16 grid gap-8 border-border border-t pt-8 sm:grid-cols-3">
          <div>
            <h2 className="font-semibold">Projetos em contexto</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Uma visão organizada do trabalho da agência.
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Equipe alinhada</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Responsabilidades claras para cada etapa.
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Feito para o seu dia a dia</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Uma experiência simples, em português.
            </p>
          </div>
        </div>
      </main>
      <footer className="border-border border-t py-6 text-muted-foreground text-sm">
        DeskLedger · Organização para criar melhor.
      </footer>
    </div>
  );
}
