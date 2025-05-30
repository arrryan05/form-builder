import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";

export default function Responses() {
  const { formId } = useParams<{ formId: string }>();
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    if (!formId) return;
    const key = `form-responses-${formId}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    setResponses(list);
  }, [formId]);

  if (!formId) return null;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Responses for {formId}</h1>
      {responses.length === 0 && <p>No submissions yet.</p>}
      {responses.map((resp, i) => (
        <pre
          key={i}
          className="bg-gray-100 p-3 rounded mb-2 overflow-x-auto"
        >
          {JSON.stringify(resp, null, 2)}
        </pre>
      ))}
    </div>
  );
}
