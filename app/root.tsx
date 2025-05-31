// app/root.tsx
import type { MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import stylesUrl from "./tailwind.css?url";

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { title: "Form Builder" },
  { viewport: "width=device-width,initial-scale=1" },
];

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export default function App() {
  return (
    <html lang="en" className="dark">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
