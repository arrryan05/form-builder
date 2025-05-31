// app/stores/form.ts

import {create} from "zustand";
import { nanoid } from "nanoid";
import type { FieldConfig, FieldType, Step } from "~/types/field";

/** A minimal “template”: a title plus a list of fields (no id/stepId). */
export type FormTemplate = {
  title: string;
  fields: Omit<FieldConfig, "id" | "stepId">[];
};

interface FormState {
  title: string;

  // Multi‐step schema:
  steps: Step[];
  selectedStep: string;
  fields: FieldConfig[];
  selectedFieldId: string | null;

  // Actions for steps:
  addStep: (title: string) => void;
  selectStep: (stepId: string) => void;
  renameStep: (stepId: string, newTitle: string) => void;
  deleteStep: (stepId: string) => void;

  // Actions for fields:
  addField: (type: FieldType) => void;
  moveFieldWithinStep: (fromIndex: number, toIndex: number) => void;

  selectField: (fieldId: string | null) => void;
  updateField: (fieldId: string, changes: Partial<FieldConfig>) => void;

  // Load a template into a single new step:
  loadTemplate: (template: FormTemplate) => void;

  // ⬇️ Phase 4: Save/load to localStorage under a chosen key:
  saveToLocal: (key: string) => void;
  loadFromLocal: (key: string) => void;
}

export const useFormStore = create<FormState>((set, get) => {
  console.log("⏳ [form store] initializing…");
  // Create the very first step
  const firstStepId = nanoid();

  return {
    title: "Untitled Multi-Step Form",

    steps: [{ id: firstStepId, title: "Step 1", fieldIds: [] }],
    selectedStep: firstStepId,
    fields: [],
    selectedFieldId: null,

    // ─── Step Actions ────────────────────────────────────────────
    addStep: (title) => {
      const newId = nanoid();
      const newStep: Step = { id: newId, title, fieldIds: [] };
      set((state) => ({
        steps: [...state.steps, newStep],
        selectedStep: state.selectedStep || newId,
      }));
    },
    selectStep: (stepId) =>
      set({ selectedStep: stepId, selectedFieldId: null }),

    renameStep: (stepId, newTitle) =>
      set((state) => ({
        steps: state.steps.map((s) =>
          s.id === stepId ? { ...s, title: newTitle } : s
        ),
      })),

    deleteStep: (stepId) =>
      set((state) => {
        // Don’t delete if it’s the only step
        if (state.steps.length === 1) return {};

        // Remove that step’s fields
        const toRemove = new Set(
          state.steps.find((s) => s.id === stepId)!.fieldIds
        );
        const newFields = state.fields.filter((f) => !toRemove.has(f.id));

        // Remove the step itself
        const newSteps = state.steps.filter((s) => s.id !== stepId);
        const newSelected =
          state.selectedStep === stepId ? newSteps[0].id : state.selectedStep;

        return {
          steps: newSteps,
          fields: newFields,
          selectedStep: newSelected,
          selectedFieldId: null,
        };
      }),

    // ─── Field Actions ──────────────────────────────────────────────
    addField: (type) => {
      const stepId = get().selectedStep;
      if (!stepId) return;
      const newId = nanoid();
      const newField: FieldConfig = {
        id: newId,
        type,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
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
        stepId,
      };
      set((state) => ({
        fields: [...state.fields, newField],
        steps: state.steps.map((s) =>
          s.id === stepId
            ? { ...s, fieldIds: [...s.fieldIds, newId] }
            : s
        ),
      }));
    },

    moveFieldWithinStep: (fromIndex, toIndex) =>
      set((state) => {
        const stepId = state.selectedStep;
        if (!stepId) return {};

        // 1) Pull out that step’s fieldIds
        const step = state.steps.find((s) => s.id === stepId)!;
        const ids = [...step.fieldIds];
        const [moved] = ids.splice(fromIndex, 1);
        ids.splice(toIndex, 0, moved);

        // 2) Update steps[]
        const newSteps = state.steps.map((s) =>
          s.id === stepId ? { ...s, fieldIds: ids } : s
        );

        // 3) Reassemble fields[] so this step’s fields come last in that new order
        const otherFields = state.fields.filter((f) => f.stepId !== stepId);
        const stepFieldsInOrder = ids
          .map((fid) => state.fields.find((f) => f.id === fid)!)
          .filter(Boolean);
        const newFields = [...otherFields, ...stepFieldsInOrder];

        return { steps: newSteps, fields: newFields };
      }),

    selectField: (fieldId) => set({ selectedFieldId: fieldId }),
    updateField: (fieldId, changes) =>
      set((state) => ({
        fields: state.fields.map((f) =>
          f.id === fieldId ? { ...f, ...changes } : f
        ),
      })),

    // ─── Template Loader ────────────────────────────────────────────
    loadTemplate: (template) => {
      console.log("☑️ [form store] loadTemplate");
      const stepId = nanoid();
      const newStep: Step = { id: stepId, title: template.title, fieldIds: [] };
      const newFields: FieldConfig[] = template.fields.map((f) => ({
        ...f,
        id: nanoid(),
        stepId,
      }));
      newStep.fieldIds = newFields.map((f) => f.id);
      set(() => ({
        title: template.title,
        steps: [newStep],
        selectedStep: stepId,
        fields: newFields,
        selectedFieldId: null,
      }));
    },

    // ─── Phase 4: Save / Load to localStorage under key “form-{key}” ───
    saveToLocal: (key) => {
      const { title, steps, fields } = get();
      // We only store `title` and `fields`; steps can be reconstructed 
      // or you can store steps[] if you want to preserve step titles/ids.
      const payload = { title, fields };
      localStorage.setItem(`form-${key}`, JSON.stringify(payload));
      alert(`Form saved as “${key}”`);
    },

    loadFromLocal: (key) => {
      try {
        const raw = localStorage.getItem(`form-${key}`);
        if (!raw) {
          alert(`No form found under key “${key}”`);
          return;
        }
        const { title, fields }: { title: string; fields: FieldConfig[] } =
          JSON.parse(raw);

        // If you saved “fields” with their stepId in localStorage, you can restore them directly:
        // Otherwise, you must decide how to rebuild steps[] from fields[]. For simplicity,
        // here we load everything into a single “Step 1” again:
        const stepId = nanoid();
        const reconstructedFields = fields.map((f) => ({
          ...f,
          id: nanoid(),
          stepId,
        }));
        const newStep: Step = {
          id: stepId,
          title,
          fieldIds: reconstructedFields.map((f) => f.id),
        };

        set(() => ({
          title,
          steps: [newStep],
          selectedStep: stepId,
          fields: reconstructedFields,
          selectedFieldId: null,
        }));
        alert(`Form loaded from “${key}”`);
      } catch {
        alert(`Failed to parse form data for key “${key}”`);
      }
    },
  };
});
