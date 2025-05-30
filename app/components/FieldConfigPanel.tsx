import { useFormStore } from "~/stores/form";
import { FieldConfig } from "~/types/field";

export function FieldConfigPanel() {
  const selectedId = useFormStore((s) => s.selectedId);
  const field = useFormStore((s) =>
    s.fields.find((f) => f.id === selectedId)
  );
  const update = useFormStore((s) => s.updateField);

  if (!field) {
    return (
      <div className="p-2 text-gray-500">Select a field to edit its properties</div>
    );
  }

  const onChange =
    (key: keyof FieldConfig) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        key === "required"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      update(field.id, { [key]: value } as any);
    };

  return (
    <div className="p-2 space-y-4">
      <h3 className="font-semibold">Field Properties</h3>

      {/* Label */}
      <div>
        <label className="block text-sm">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={onChange("label")}
          className="mt-1 block w-full border rounded p-1"
        />
      </div>

      {/* Placeholder */}
      {field.type !== "checkbox" && (
        <div>
          <label className="block text-sm">Placeholder</label>
          <input
            type="text"
            value={field.placeholder}
            onChange={onChange("placeholder")}
            className="mt-1 block w-full border rounded p-1"
          />
        </div>
      )}

      {/* Required */}
      <div className="flex items-center">
        <input
          id="required"
          type="checkbox"
          checked={field.required}
          onChange={onChange("required")}
        />
        <label htmlFor="required" className="ml-2 text-sm">
          Required
        </label>
      </div>

      {/* Help Text */}
      <div>
        <label className="block text-sm">Help Text</label>
        <textarea
          value={field.helpText}
          onChange={onChange("helpText")}
          className="mt-1 block w-full border rounded p-1"
        />
      </div>

      {/* Min/Max Length & Pattern (text, textarea) */}
      {["text", "textarea"].includes(field.type) && (
        <>
          <div className="flex space-x-2">
            <div>
              <label className="block text-sm">Min Length</label>
              <input
                type="number"
                value={field.minLength || ""}
                onChange={(e) =>
                  update(field.id, { minLength: +e.target.value } as any)
                }
                className="mt-1 block w-full border rounded p-1"
              />
            </div>
            <div>
              <label className="block text-sm">Max Length</label>
              <input
                type="number"
                value={field.maxLength || ""}
                onChange={(e) =>
                  update(field.id, { maxLength: +e.target.value } as any)
                }
                className="mt-1 block w-full border rounded p-1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm">Pattern (regex)</label>
            <input
              type="text"
              value={field.pattern || ""}
              onChange={onChange("pattern")}
              className="mt-1 block w-full border rounded p-1"
            />
          </div>
        </>
      )}

      {/* Options (dropdown, checkbox) */}
      {["dropdown", "checkbox"].includes(field.type) && (
        <div>
          <label className="block text-sm">Options (comma-separated)</label>
          <input
            type="text"
            value={field.options?.map((o) => o.label).join(", ") || ""}
            onChange={(e) =>
              update(field.id, {
                options: e.target.value
                  .split(",")
                  .map((s) => ({ label: s.trim(), value: s.trim().toLowerCase().replace(/\s+/g, "_") })),
              } as any)
            }
            className="mt-1 block w-full border rounded p-1"
          />
        </div>
      )}
    </div>
  );
}
