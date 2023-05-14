import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useRouteError,
} from '@remix-run/react';
import mainCss from './styles/main.css';
import MainNavigation from '~/components/MainNavigation';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: mainCss
  }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log('Root ErrorBoundary error', error);

  const content = isRouteErrorResponse(error) ? (
    <div className="error">
      <h1>Global error</h1>
      <p>Status: {error.status}</p>
      <p>{error.data}</p>
    </div>
  ) : (
    <div className="error">
      <h1>Error has occurred</h1>
      <p>{(error as Error).message}</p>
    </div>
  )

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Error Page</title>
      <Meta />
      <Links />
    </head>
    <body>
    <header>
      <MainNavigation />
    </header>
    {content}
    <Scripts />
    <LiveReload />
    </body>
    </html>
  )
}
