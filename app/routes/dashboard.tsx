// app/routes/dashboard.tsx
import { useEffect, useState } from "react";
import { Link, Outlet } from "@remix-run/react";

export default function Dashboard() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("form-ids") || "[]");
    setIds(list);
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Forms</h1>

      {ids.length === 0 ? (
        <p>No forms created yet.</p>
      ) : (
        <ul className="space-y-2">
          {ids.map((id) => (
            <li key={id} className="border rounded p-3 flex justify-between">
              <span>Form ID: {id}</span>
              <div className="space-x-2">
                <Link to={`/forms/${id}`} className="text-blue-600 underline">
                  Fill View
                </Link>
                <Link
                  to={`/dashboard/forms/${id}/responses`}
                  className="text-green-600 underline"
                >
                  View Responses
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* This Outlet will render any nested route under /dashboard */}
      <Outlet />
    </div>
  );
}
