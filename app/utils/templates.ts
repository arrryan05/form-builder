// app/utils/templates.ts
import { FormTemplate } from "~/stores/form";
import { FieldConfig } from "~/types/field";

// Contact Us
export const CONTACT_US: FormTemplate = {
  title: "Contact Us",
  fields: [
    {
      // id here will be replaced by store
      id: "tx", 
      type: "text",
      label: "Name",
      placeholder: "Your full name",
      required: true,
      helpText: "",
    },
    {
      id: "em", 
      type: "text",
      label: "Email",
      placeholder: "you@example.com",
      required: true,
      helpText: "",
      pattern: "\\S+@\\S+\\.\\S+",
    },
    {
      id: "msg", 
      type: "textarea",
      label: "Message",
      placeholder: "How can we help?",
      required: true,
      helpText: "",
    },
  ],
};

// Simple Feedback
export const FEEDBACK: FormTemplate = {
  title: "Feedback",
  fields: [
    {
      id: "rt",
      type: "dropdown",
      label: "Rating",
      options: [
        { label: "👍 Good", value: "good" },
        { label: "👎 Bad", value: "bad" },
      ],
      required: true,
    },
    {
      id: "cm",
      type: "textarea",
      label: "Comments",
      placeholder: "Leave your comments…",
      required: false,
      helpText: "Optional",
    },
  ],
};
