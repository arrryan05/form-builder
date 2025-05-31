// app/types/field.ts

/** All supported field types */
export type FieldType =
  | "text"
  | "textarea"
  | "dropdown"
  | "checkbox"
  | "date";

/** Option for dropdown / checkbox groups */
export interface FieldOption {
  label: string;
  value: string;
}

/** A single field’s configuration */
export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;

  // Validation for text/textarea
  minLength?: number;
  maxLength?: number;
  pattern?: string;

  // Options for dropdown/checkbox
  options?: FieldOption[];

  // Which step this field belongs to
  stepId: string;
}

/** A single “step” in the multi-step form */
export interface Step {
  id: string;
  title: string;
  fieldIds: string[]; // IDs of fields in this step
}
