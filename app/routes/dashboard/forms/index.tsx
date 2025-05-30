// app/routes/dashboard/forms/index.tsx
import { Outlet, Link } from "@remix-run/react";

export default function DashboardFormsIndex() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Forms in Dashboard</h2>
      <p>
        <Link to="/dashboard" className="text-blue-600 underline">
          Back to Dashboard
        </Link>
      </p>
      {/* This <Outlet /> is optional here because your `responses` route lives under it */}
      <Outlet />
    </div>
  );
}
