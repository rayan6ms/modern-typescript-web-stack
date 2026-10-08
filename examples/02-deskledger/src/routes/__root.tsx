import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import stylesheet from "../styles.css?url";

export const Route = createRootRoute({
  component: Root,
  head: () => ({
    links: [{ href: stylesheet, rel: "stylesheet" }],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: "DeskLedger | Projetos para agências" },
      {
        content:
          "Um espaço para organizar o trabalho da sua agência. DeskLedger está em preparação.",
        name: "description",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl p-8" id="conteudo" tabIndex={-1}>
      <h1>Página não encontrada</h1>
      <a href="/">Voltar ao início</a>
    </main>
  ),
});

function Root() {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <a className="skip-link" href="#conteudo">
          Ir para o conteúdo
        </a>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
