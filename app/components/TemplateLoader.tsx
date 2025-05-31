// app/components/TemplateLoader.tsx

import { useState } from "react";
import { useFormStore } from "~/stores/form";
import { CONTACT_US, FEEDBACK } from "~/utils/templates";

const TEMPLATES = [
  { name: "Contact Us", data: CONTACT_US },
  { name: "Feedback", data: FEEDBACK },
];

export function TemplateLoader() {
  const loadTemplate = useFormStore((s) => s.loadTemplate);
  const [choice, setChoice] = useState<string>(TEMPLATES[0].name);

  const apply = () => {
    const tpl = TEMPLATES.find((t) => t.name === choice);
    if (tpl) {
      loadTemplate(tpl.data);
    }
  };

  return (
    <div className="mb-6 space-y-2">
      <h3 className="font-semibold">Load Template</h3>
      <select
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        className="w-full border rounded p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        {TEMPLATES.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
      <button
        onClick={apply}
        className="w-full bg-purple-600 text-white rounded px-2 py-1"
      >
        Load
      </button>
    </div>
  );
}
