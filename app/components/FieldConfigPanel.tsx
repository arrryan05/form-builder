import { useFormStore } from "~/stores/form";
import type { FieldConfig } from "~/types/field";

export function FieldConfigPanel() {
  const selectedFieldId = useFormStore((s) => s.selectedFieldId);
  const field = useFormStore((s) =>
    s.fields.find((f) => f.id === selectedFieldId)
  );
  console.log("🔄 [FieldConfigPanel] render");  // <--- add this

  const updateField = useFormStore((s) => s.updateField);

  if (!field) {
    return (
      <div className="p-2 text-gray-500 dark:text-gray-400">
        Select a field to edit its properties
      </div>
    );
  }

  const onChange =
    (key: keyof FieldConfig) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        key === "required"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      updateField(field.id, { [key]: value } as any);
    };

  return (
    <div className="p-2 bg-white dark:bg-gray-800 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold">Field Properties</h3>

      <div>
        <label className="block text-sm">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={onChange("label")}
          className="mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700"
        />
      </div>

      {["text", "textarea"].includes(field.type) && (
        <div>
          <label className="block text-sm">Placeholder</label>
          <input
            type="text"
            value={field.placeholder || ""}
            onChange={onChange("placeholder")}
            className="mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700"
          />
        </div>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={field.required || false}
          onChange={onChange("required")}
          className="mr-2"
        />
        <label htmlFor="required" className="text-sm">
          Required
        </label>
      </div>

      <div>
        <label className="block text-sm">Help Text</label>
        <textarea
          value={field.helpText || ""}
          onChange={onChange("helpText")}
          className="mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700"
        />
      </div>

      {["text", "textarea"].includes(field.type) && (
        <>
          <div className="flex space-x-2">
            <div>
              <label className="block text-sm">Min Length</label>
              <input
                type="number"
                value={field.minLength || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    minLength: +e.target.value,
                  } as any)
                }
                className="mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm">Max Length</label>
              <input
                type="number"
                value={field.maxLength || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    maxLength: +e.target.value,
                  } as any)
                }
                className="mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm">Pattern (regex)</label>
            <input
              type="text"
              value={field.pattern || ""}
              onChange={onChange("pattern")}
              className="mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </>
      )}

      {["dropdown", "checkbox"].includes(field.type) && (
        <div>
          <label className="block text-sm">Options (comma-separated)</label>
          <input
            type="text"
            value={field.options?.map((o) => o.label).join(", ") || ""}
            onChange={(e) =>
              updateField(field.id, {
                options: e.target.value
                  .split(",")
                  .map((s) => ({
                    label: s.trim(),
                    value: s.trim().toLowerCase().replace(/\s+/g, "_"),
                  })),
              } as any)
            }
            className="mt-1 block w-full border rounded p-1 bg-gray-50 dark:bg-gray-700"
          />
        </div>
      )}
    </div>
  );
}
