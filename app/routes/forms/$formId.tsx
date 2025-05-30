// app/routes/forms/$formId.tsx
import { useEffect, useState } from "react";
import type { FC } from "react";
import { useParams } from "@remix-run/react";
import { FieldConfig } from "~/types/field";


const FormFiller: FC = () => {
  const { formId } = useParams<"formId">();
  const [schema, setSchema] = useState<{
    title: string;
    fields: FieldConfig[];
  } | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  console.log("🖨️ forms/$formId.tsx rendered");


  useEffect(() => {
    if (!formId) return;
    const raw = localStorage.getItem(`form-schema-${formId}`);
    if (raw) {
      const { title, fields } = JSON.parse(raw);
      setSchema({ title, fields });
    }
  }, [formId]);

  const handleChange = (id: string) => (e: any) => {
    setValues((v) => ({
      ...v,
      [id]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId) return;
    const key = `form-responses-${formId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([...existing, values]));
    setSubmitted(true);
  };

  if (!schema) {
    return <p className="p-4">Loading form… or form not found.</p>;
  }

  if (submitted) {
    return <p className="p-4 text-green-600">Thank you for submitting!</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{schema.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {schema.fields.map((f) => (
          <div key={f.id} className="flex flex-col">
            <label className="font-medium">
              {f.label}
              {f.required && <span className="text-red-500">*</span>}
            </label>

            {f.type === "text" && (
              <input
                type="text"
                placeholder={f.placeholder}
                onChange={handleChange(f.id)}
                className="border rounded p-2"
              />
            )}
            {f.type === "textarea" && (
              <textarea
                placeholder={f.placeholder}
                onChange={handleChange(f.id)}
                className="border rounded p-2"
              />
            )}
            {f.type === "date" && (
              <input
                type="date"
                onChange={handleChange(f.id)}
                className="border rounded p-2"
              />
            )}
            {f.type === "dropdown" && (
              <select
                onChange={handleChange(f.id)}
                className="border rounded p-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}
            {f.type === "checkbox" && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  onChange={handleChange(f.id)}
                  className="mr-2"
                />
                <span>{f.helpText}</span>
              </div>
            )}

            {f.helpText && f.type !== "checkbox" && (
              <p className="text-sm text-gray-500">{f.helpText}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormFiller;
