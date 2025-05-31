// app/components/SaveLoadControls.tsx

import React, { useState } from "react";
import { useFormStore } from "~/stores/form";

export function SaveLoadControls() {
  const saveToLocal = useFormStore((s) => s.saveToLocal);
  const loadFromLocal = useFormStore((s) => s.loadFromLocal);

  const [key, setKey] = useState("");

  const onSave = () => {
    if (!key.trim()) {
      alert("Please enter a non-empty key to save.");
      return;
    }
    saveToLocal(key.trim());
  };

  const onLoad = () => {
    if (!key.trim()) {
      alert("Please enter a key to load.");
      return;
    }
    loadFromLocal(key.trim());
  };

  return (
    <div className="flex space-x-2 items-center">
      <input
        type="text"
        placeholder="form key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="border rounded px-2 py-1 text-sm w-32 bg-gray-50 dark:bg-gray-700"
      />
      <button
        onClick={onSave}
        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
      >
        Save
      </button>
      <button
        onClick={onLoad}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
      >
        Load
      </button>
    </div>
  );
}
