// app/utils/templates.ts

import type { FormTemplate } from "~/stores/form";
import type { FieldConfig } from "~/types/field";

// Contact Us template – all fields go into one step titled “Contact Us”
export const CONTACT_US: FormTemplate = {
  title: "Contact Us",
  fields: [
    {
      // no `id` or `stepId` here—store will assign them
      type: "text",
      label: "Name",
      placeholder: "Your name",
      required: true,
      helpText: "",
      minLength: undefined,
      maxLength: undefined,
      pattern: "",
      options: undefined,
    },
    {
      type: "text",
      label: "Email",
      placeholder: "you@example.com",
      required: true,
      helpText: "",
      minLength: undefined,
      maxLength: undefined,
      pattern: "\\S+@\\S+\\.\\S+",
      options: undefined,
    },
    {
      type: "textarea",
      label: "Message",
      placeholder: "How can we help?",
      required: true,
      helpText: "",
      minLength: undefined,
      maxLength: undefined,
      pattern: "",
      options: undefined,
    },
  ],
};

// Feedback template
export const FEEDBACK: FormTemplate = {
  title: "Feedback",
  fields: [
    {
      type: "dropdown",
      label: "Rating",
      placeholder: undefined,
      required: true,
      helpText: "",
      options: [
        { label: "👍 Good", value: "good" },
        { label: "👎 Bad", value: "bad" },
      ],
      minLength: undefined,
      maxLength: undefined,
      pattern: "",
    },
    {
      type: "textarea",
      label: "Comments",
      placeholder: "Your comments…",
      required: false,
      helpText: "Optional",
      options: undefined,
      minLength: undefined,
      maxLength: undefined,
      pattern: "",
    },
  ],
};
