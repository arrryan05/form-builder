import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useThemeStore } from "~/stores/theme";
import { useFormStore } from "~/stores/form";
import { FieldPalette } from "~/components/FieldPalette";
import { FieldCanvas } from "~/components/FieldCanvas";
import { FieldConfigPanel } from "~/components/FieldConfigPanel";
import { FormPreview } from "~/components/FormPreview";
import { SaveLoadControls } from "~/components/SaveLoadControls";
import { TemplateLoader } from "~/components/TemplateLoader";
import { FormCreatorControls } from "~/components/FormCreatorControl";
import { Link } from "@remix-run/react";

export default function Index() {
  const { theme, toggle } = useThemeStore();
  const { fields, addField, moveField } = useFormStore();

  // Ghost overlay
  const [overlayContent, setOverlayContent] = useState<React.ReactNode>(null);
  // Preview device mode
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const widths = {
    desktop: "w-[768px]",
    tablet: "w-[512px]",
    mobile: "w-[320px]",
  };

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor)
  );

  const handleDragStart = (e: DragStartEvent) => {
    const type = e.active.data.current?.type;
    if (type)
      setOverlayContent(<div className="p-2 rounded bg-blue-200">{type}</div>);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setOverlayContent(null);
    // Add new field
    if (active.data.current?.type) {
      addField(active.data.current.type);
      return;
    }
    // Reorder
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      if (oldIndex > -1 && newIndex > -1) moveField(oldIndex, newIndex);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Form Builder</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <FormCreatorControls />
        </div>
        <div className="flex-1 flex justify-end">
          <Link to="/dashboard" className="text-white-600">
            Dashboard
          </Link>
          <button
            onClick={toggle}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Responsive grid: sidebar 280px, builder 1fr, preview 2fr on md+ */}
        <main className="grid grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-[280px_1fr_2fr] md:grid-rows-none gap-4 flex-1 p-4 overflow-hidden">
          {/* Left Sidebar */}
          <aside className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 overflow-auto">
            <FieldPalette />
            <TemplateLoader />

            <div className="mt-6">
              <FieldConfigPanel />
            </div>
          </aside>

          {/* Builder Canvas (narrower) */}
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Builder Canvas</h2>
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <FieldCanvas />
            </SortableContext>
          </section>

          {/* Live Preview (wider) */}
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 overflow-auto flex flex-col items-center">
            <div className="mb-4 space-x-2">
              {(["desktop", "tablet", "mobile"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-2 py-1 border rounded ${
                    mode === m
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
            <div className={`border p-4 ${widths[mode]} mx-auto`}>
              <FormPreview />
            </div>
          </section>
        </main>

        {/* Drag Overlay */}
        <DragOverlay dropAnimation={{ duration: 150 }}>
          {overlayContent}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
