import { useState } from "react";
import { useFormStore } from "~/stores/form";
import type { FieldConfig, Step } from "~/types/field";

export function MultiStepPreview() {
  const steps = useFormStore((s) => s.steps);
  const fields = useFormStore((s) => s.fields);
  console.log("🔄 [MultiStepPreview] render");  


  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const step: Step = steps[currentStepIdx];
  const stepFields = fields.filter((f) => f.stepId === step.id);

  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateField(f: FieldConfig, v: any): string {
    if (f.required && !v) return "Required";
    if (f.minLength && v.length < f.minLength)
      return `Min length: ${f.minLength}`;
    if (f.maxLength && v.length > f.maxLength)
      return `Max length: ${f.maxLength}`;
    if (f.pattern) {
      const re = new RegExp(f.pattern);
      if (!re.test(v)) return "Invalid format";
    }
    return "";
  }

  const onChange = (f: FieldConfig) => (e: any) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [f.id]: v }));
    const err = validateField(f, v);
    setErrors((prev) => ({ ...prev, [f.id]: err }));
  };

  const goNext = () => {
    const newErrors: Record<string, string> = {};
    let hasError = false;
    stepFields.forEach((f) => {
      const v = values[f.id];
      const err = validateField(f, v);
      if (err) {
        newErrors[f.id] = err;
        hasError = true;
      }
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (hasError) return;

    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      alert("All steps validated! You can now submit.");
    }
  };

  const goPrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto p-4 bg-gray-50 dark:bg-gray-800 rounded shadow">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Step {currentStepIdx + 1} of {steps.length}: {step.title}
      </div>

      <div className="space-y-4">
        {stepFields.map((f) => (
          <div key={f.id} className="flex flex-col">
            <label className="font-medium text-gray-700 dark:text-gray-200">
              {f.label}
              {f.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {f.type === "text" && (
              <input
                type="text"
                placeholder={f.placeholder}
                value={values[f.id] || ""}
                onChange={onChange(f)}
                className="mt-1 border rounded p-2 bg-white dark:bg-gray-700"
              />
            )}
            {f.type === "textarea" && (
              <textarea
                placeholder={f.placeholder}
                value={values[f.id] || ""}
                onChange={onChange(f)}
                className="mt-1 border rounded p-2 bg-white dark:bg-gray-700"
              />
            )}
            {f.type === "date" && (
              <input
                type="date"
                value={values[f.id] || ""}
                onChange={onChange(f)}
                className="mt-1 border rounded p-2 bg-white dark:bg-gray-700"
              />
            )}
            {f.type === "dropdown" && (
              <select
                value={values[f.id] || ""}
                onChange={onChange(f)}
                className="mt-1 border rounded p-2 bg-white dark:bg-gray-700"
              >
                <option value="">Select…</option>
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
                  onChange={onChange(f)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-200">
                  {f.helpText}
                </span>
              </div>
            )}

            {errors[f.id] && (
              <p className="text-sm text-red-600 mt-1">{errors[f.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={goPrev}
          disabled={currentStepIdx === 0}
          className={`px-4 py-2 rounded ${
            currentStepIdx === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {currentStepIdx === steps.length - 1 ? "Submit" : "Next →"}
        </button>
      </div>
    </div>
  );
}
