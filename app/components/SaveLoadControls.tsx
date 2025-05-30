import { useState } from "react";
import { useFormStore } from "~/stores/form";

export function SaveLoadControls() {
  const save = useFormStore((s) => s.saveToLocal);
  const load = useFormStore((s) => s.loadFromLocal);
  const [key, setKey] = useState("");

  return (
    <div className="space-y-2 mb-6">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="flex-1 border rounded p-1"
        />
        <button
          onClick={() => save(key)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={() => load(key)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Load
        </button>
      </div>
    </div>
  );
}
