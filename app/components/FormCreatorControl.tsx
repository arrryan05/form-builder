import { useState } from "react";
import { useFormStore } from "~/stores/form";

export function FormCreatorControls() {
  const createForm = useFormStore((s) => s.createForm);
  const formId = useFormStore((s) => s.formId);
  const [link, setLink] = useState("");

  const onCreate = () => {
    const id = createForm();
    const url = `${window.location.origin}/forms/${id}`;
    setLink(url);
  };

  return (
    <div className="space-y-2 mb-6">
      <button
        onClick={onCreate}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Generate Shareable Link
      </button>
      {link && (
        <div className="mt-2 text-sm break-all">
          <span className="block font-semibold">Link:</span>
          <a href={link} className="text-blue-700">{link}</a>
        </div>
      )}
    </div>
  );
}
