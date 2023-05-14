import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
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

export function ErrorBoundary(...args: any) {
  console.log('args', args);
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
    <div className="error">
      <h1>Error has occurred in Notes</h1>
      {/*<p>{error.message}</p>*/}
    </div>
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  )
}

