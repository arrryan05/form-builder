import { create } from "zustand";
import { nanoid } from "nanoid";
import { FieldConfig, FieldType } from "~/types/field";

type Schema = { id: string; title: string; fields: FieldConfig[] };
type Response = Record<string, any>;

export type FormTemplate = {
  title: string;
  fields: FieldConfig[];
};

interface FormState {
  title: string;
  fields: FieldConfig[];
  selectedId: string | null;
  formId: string | null;
  
  // --- NEW:
  saveToLocal: (key: string) => void;
  loadFromLocal: (key: string) => void;
  // ---------------
  loadTemplate: (template: FormTemplate) => void;
  addField: (type: FieldType) => void;
  moveField: (from: number, to: number) => void;
  selectField: (id: string | null) => void;
  updateField: (id: string, changes: Partial<FieldConfig>) => void;

  createForm: () => string;
  getFormIds: () => string[];
  
}

export const useFormStore = create<FormState>((set, get) => ({
  title: "Untitled Form",
  fields: [],
  selectedId: null,
  formId: null,

  createForm: () => {
    const id = nanoid();
    const { title, fields } = get();
    const schema: Schema = { id, title, fields };
    // Save schema
    localStorage.setItem(`form-schema-${id}`, JSON.stringify(schema));
    // Update list of form IDs
    const existing = JSON.parse(
      localStorage.getItem("form-ids") || "[]"
    ) as string[];
    localStorage.setItem(
      "form-ids",
      JSON.stringify([...existing, id])
    );
    // Store in state
    set({ formId: id });
    return id;
  },
  getFormIds: () => {
    return JSON.parse(localStorage.getItem("form-ids") || "[]");
  },

  loadTemplate: (template) =>
    set(() => ({
      title: template.title,
      fields: template.fields.map((f) => ({ ...f, id: nanoid() })),
      selectedId: null,
    })),

  addField: (type) =>
    set((s) => ({
      fields: [
        ...s.fields,
        {
          id: nanoid(),
          type,
          label: `${type} label`,
          placeholder: "",
          required: false,
          helpText: "",
          minLength: undefined,
          maxLength: undefined,
          pattern: "",
          options:
            type === "dropdown" || type === "checkbox"
              ? [
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                ]
              : undefined,
        },
      ],
    })),

  moveField: (from, to) =>
    set((s) => {
      const f = [...s.fields];
      const [m] = f.splice(from, 1);
      f.splice(to, 0, m);
      return { fields: f };
    }),

  selectField: (id) => set({ selectedId: id }),

  updateField: (id, changes) =>
    set((s) => ({
      fields: s.fields.map((f) => (f.id === id ? { ...f, ...changes } : f)),
    })),

  // --- NEW ACTION: Save current form to localStorage under key
  saveToLocal: (key) => {
    const { title, fields } = get();
    const payload = { title, fields };
    localStorage.setItem(`form-${key}`, JSON.stringify(payload));
    alert(`Form saved as “${key}”`);
  },

  // --- NEW ACTION: Load form from localStorage by key
  loadFromLocal: (key) => {
    const raw = localStorage.getItem(`form-${key}`);
    if (!raw) {
      alert(`No form found under key “${key}”`);
      return;
    }
    try {
      const { title, fields } = JSON.parse(raw);
      set({ title, fields, selectedId: null });
      alert(`Form loaded from “${key}”`);
    } catch {
      alert(`Failed to parse form data for key “${key}”`);
    }
  },
}));
