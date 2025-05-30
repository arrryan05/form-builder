export type FieldType =
  | "text"
  | "textarea"
  | "dropdown"
  | "checkbox"
  | "date";

export interface FieldOption {
  label: string;
  value: string;
}

export type FormSchema = {
    id: string;
    title: string;
    steps: Step[];
    fields: FieldConfig[];
  };
  export type Step = {
    id: string;
    title: string;
    fieldIds: string[];
  };

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  helpText?: string;
  // for text/textarea:
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  // for dropdown/checkbox:
  options?: FieldOption[];
}
