import { useState } from "react";
import { useFormStore } from "~/stores/form";
import { FieldConfig } from "~/types/field";

export function FormPreview() {
  const fields = useFormStore((s) => s.fields);
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (f: FieldConfig, v: any): string => {
    if (f.required && !v) return "This field is required.";
    if (f.minLength && v.length < f.minLength)
      return `Min length is ${f.minLength}.`;
    if (f.maxLength && v.length > f.maxLength)
      return `Max length is ${f.maxLength}.`;
    if (f.pattern) {
      const re = new RegExp(f.pattern);
      if (!re.test(v)) return "Invalid format.";
    }
    return "";
  };

  const onChange = (id: string, f: FieldConfig) => (e: any) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((s) => ({ ...s, [id]: v }));
    const err = validate(f, v);
    setErrors((s) => ({ ...s, [id]: err }));
  };

  return (
    <form className="space-y-4">
      {fields.map((f) => (
        <div key={f.id} className="flex flex-col">
          <label className="font-medium">
            {f.label} {f.required && <span className="text-red-500">*</span>}
          </label>

          {/* Input by type */}
          {f.type === "text" && (
            <input
              type="text"
              placeholder={f.placeholder}
              value={values[f.id] || ""}
              onChange={onChange(f.id, f)}
              className="mt-1 border rounded p-2"
            />
          )}
          {f.type === "textarea" && (
            <textarea
              placeholder={f.placeholder}
              value={values[f.id] || ""}
              onChange={onChange(f.id, f)}
              className="mt-1 border rounded p-2"
            />
          )}
          {f.type === "date" && (
            <input
              type="date"
              value={values[f.id] || ""}
              onChange={onChange(f.id, f)}
              className="mt-1 border rounded p-2"
            />
          )}
          {f.type === "dropdown" && (
            <select
              value={values[f.id] || ""}
              onChange={onChange(f.id, f)}
              className="mt-1 border rounded p-2"
            >
              <option value="">Select</option>
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
                checked={values[f.id] || false}
                onChange={onChange(f.id, f)}
                className="mr-2"
              />
              {f.helpText}
            </div>
          )}

          {f.helpText && f.type !== "checkbox" && (
            <p className="text-sm text-gray-500">{f.helpText}</p>
          )}

          {errors[f.id] && (
            <p className="text-sm text-red-500">{errors[f.id]}</p>
          )}
        </div>
      ))}
    </form>
  );
}
