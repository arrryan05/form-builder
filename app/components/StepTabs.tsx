// app/components/StepTabs.tsx

import { useFormStore } from "~/stores/form";
import { useState } from "react";

export function StepTabs() {
  const steps = useFormStore((s) => s.steps);
  const selectedStep = useFormStore((s) => s.selectedStep);
  console.log("🗄️ steptab");

  const selectStep = useFormStore((s) => s.selectStep);
  const addStep = useFormStore((s) => s.addStep);
  const deleteStep = useFormStore((s) => s.deleteStep);
  const renameStep = useFormStore((s) => s.renameStep);

  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");

  const onEdit = (stepId: string, currentTitle: string) => {
    setEditingStepId(stepId);
    setTempTitle(currentTitle);
  };
  const onSave = (stepId: string) => {
    renameStep(stepId, tempTitle || "Untitled Step");
    setEditingStepId(null);
  };

  return (
    <div className="flex items-center space-x-2 border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">
      {steps.map((step) => {
        const isSelected = step.id === selectedStep;
        return (
          <div key={step.id} className="flex items-center space-x-1">
            {editingStepId === step.id ? (
              <input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={() => onSave(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSave(step.id);
                }}
                className="border-b border-gray-400 bg-transparent px-1 focus:outline-none"
                autoFocus
              />
            ) : (
              <button
                onClick={() => selectStep(step.id)}
                className={`px-3 py-1 rounded ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {step.title}
              </button>
            )}
            {isSelected && (
              <div className="flex items-center space-x-1">
                <button
                  title="Rename"
                  onClick={() => onEdit(step.id, step.title)}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                >
                  ✏️
                </button>
                {steps.length > 1 && (
                  <button
                    title="Delete Step"
                    onClick={() => deleteStep(step.id)}
                    className="text-red-500 hover:text-red-800"
                  >
                    🗑️
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={() => addStep(`Step ${steps.length + 1}`)}
        className="ml-4 px-2 py-1 bg-green-600 text-white rounded"
      >
        + Step
      </button>
    </div>
  );
}
