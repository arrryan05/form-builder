// // app/routes/index.tsx

// import React, { useState } from "react";
// import {
//   DndContext,
//   DragStartEvent,
//   DragEndEvent,
//   DragOverlay,
//   closestCenter,
//   PointerSensor,
//   MouseSensor,
//   useSensors,
//   useSensor,
// } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// import { useThemeStore } from "~/stores/theme";
// import { useFormStore } from "~/stores/form";
// import { FieldPalette } from "~/components/FieldPalette";
// import { FieldCanvas } from "~/components/FieldCanvas";
// import { FieldConfigPanel } from "~/components/FieldConfigPanel";
// import { StepTabs } from "~/components/StepTabs";
// import { MultiStepPreview } from "~/components/MultiStepPreview";
// import { TemplateLoader } from "~/components/TemplateLoader";
// import { Link } from "@remix-run/react";

// export default function Index() {
//   // ─── THEME: subscribe only to `theme` and `toggle` explicitly ───
//   const theme = useThemeStore((s) => s.theme);
//   const toggle = useThemeStore((s) => s.toggle);

//   // This log should now appear only on actual theme change or fields change:
//   console.log("🔄 [Index] render");

//   // ─── FORM: subscribe only to the slices you need ─────────────────
//   const fields = useFormStore((s) => s.fields);
//   const addField = useFormStore((s) => s.addField);
//   const moveFieldWithinStep = useFormStore((s) => s.moveFieldWithinStep);

//   // ─── Drag ghost overlay for palette items ───────────────────────
//   const [overlayContent, setOverlayContent] = useState<React.ReactNode>(null);

//   // ─── DnD sensors: pointer & mouse ───────────────────────────────
//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//     useSensor(MouseSensor)
//   );

//   function handleDragStart(e: DragStartEvent) {
//     const type = e.active.data.current?.type;
//     if (type) {
//       setOverlayContent(<div className="p-2 bg-blue-200 rounded">{type}</div>);
//     }
//   }

//   function handleDragEnd(e: DragEndEvent) {
//     const { active, over } = e;
//     setOverlayContent(null);

//     // If dragging from the palette (has data.type), add a new field:
//     if (active.data.current?.type) {
//       addField(active.data.current.type);
//       return;
//     }

//     // Otherwise, reorder within the currently selected step
//     if (over && active.id !== over.id) {
//       const oldIndex = fields.findIndex((f) => f.id === active.id);
//       const newIndex = fields.findIndex((f) => f.id === over.id);
//       if (oldIndex > -1 && newIndex > -1) {
//         moveFieldWithinStep(oldIndex, newIndex);
//       }
//     }
//   }

//   return (
//     <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
//         <div className="flex-1">
//           <h1 className="text-xl font-bold">Multi-Step Form Builder</h1>
//         </div>
//         <div className="flex-1 flex justify-center">
//           <Link to="/dashboard" className="text-blue-600 underline">
//             Dashboard
//           </Link>
//         </div>
//         <div className="flex-1 flex justify-end">
//           <button
//             onClick={toggle}
//             className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
//           >
//             {theme === "light" ? "Dark" : "Light"} Mode
//           </button>
//         </div>
//       </header>

//       {/* Main: three-column layout (responsive) */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//       >
//         <main className="grid grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-[280px_1fr_1fr] md:grid-rows-none gap-4 flex-1 p-4 overflow-hidden">
//           {/* Sidebar: TemplateLoader, FieldPalette, FieldConfigPanel */}
//           <aside className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto space-y-4">
//             <TemplateLoader />
//             <FieldPalette />
//             <FieldConfigPanel />
//           </aside>

//           {/* Builder Canvas (middle) */}
//           <section className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto flex flex-col">
//             <StepTabs />
//             <div className="flex-1 overflow-auto p-2 bg-gray-50 dark:bg-gray-900 rounded shadow">
//               <SortableContext
//                 items={fields.map((f) => f.id)}
//                 strategy={verticalListSortingStrategy}
//               >
//                 <FieldCanvas />
//               </SortableContext>
//             </div>
//           </section>

//           {/* Multi-Step Preview (right) */}
//           <section className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto flex flex-col items-center">
//             <MultiStepPreview />
//           </section>
//         </main>

//         <DragOverlay dropAnimation={{ duration: 150 }}>{overlayContent}</DragOverlay>
//       </DndContext>
//     </div>
//   );
// }

// app/routes/index.tsx

import React, { useState } from "react";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  MouseSensor,
  useSensors,
  useSensor,
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
import { StepTabs } from "~/components/StepTabs";
import { MultiStepPreview } from "~/components/MultiStepPreview";
import { TemplateLoader } from "~/components/TemplateLoader";
import { Link } from "@remix-run/react";
import { SaveLoadControls } from "~/components/SaveLoadControls";

export default function Index() {
  // ─── THEME: subscribe only to `theme` and `toggle` explicitly ───
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  console.log("🔄 [Index] render");

  // ─── FORM: subscribe only to the slices you need ─────────────────
  const fields = useFormStore((s) => s.fields);
  const addField = useFormStore((s) => s.addField);
  const moveFieldWithinStep = useFormStore((s) => s.moveFieldWithinStep);

  // ─── DEVICE PREVIEW STATE ───────────────────────────────────────
  // Modes: "desktop" (768px), "tablet" (512px), "mobile" (320px)
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const widths = {
    desktop: "w-[768px]",
    tablet: "w-[512px]",
    mobile: "w-[320px]",
  };

  // ─── Drag ghost overlay for palette items ───────────────────────
  const [overlayContent, setOverlayContent] = useState<React.ReactNode>(null);

  // ─── DnD sensors: pointer & mouse ───────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor)
  );

  function handleDragStart(e: DragStartEvent) {
    const type = e.active.data.current?.type;
    if (type) {
      setOverlayContent(<div className="p-2 bg-blue-200 rounded">{type}</div>);
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setOverlayContent(null);

    // If dragging from the palette (has data.type), add a new field:
    if (active.data.current?.type) {
      addField(active.data.current.type);
      return;
    }

    // Otherwise, reorder within the currently selected step
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      if (oldIndex > -1 && newIndex > -1) {
        moveFieldWithinStep(oldIndex, newIndex);
      }
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Multi-Step Form Builder</h1>
        </div>
        <div className="flex-1 flex justify-center">
          <SaveLoadControls />
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={toggle}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </header>

      {/* Main: three-column layout (responsive) */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <main className="grid grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-[280px_1fr_1.5fr] md:grid-rows-none gap-4 flex-1 p-4 overflow-hidden">
          {/* Sidebar: TemplateLoader, FieldPalette, FieldConfigPanel */}
          <aside className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto space-y-4">
            <TemplateLoader />
            <FieldPalette />
            <FieldConfigPanel />
          </aside>

          {/* Builder Canvas (middle) */}
          <section className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto flex flex-col">
            <StepTabs />
            <div className="flex-1 overflow-auto p-2 bg-gray-50 dark:bg-gray-900 rounded shadow">
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <FieldCanvas />
              </SortableContext>
            </div>
          </section>

          {/* Device‐mode Preview Panel (right) */}
          <section className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 overflow-auto flex flex-col items-center">
            {/* Toggle Buttons */}
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

            {/* Preview Container (width controlled by `mode`) */}
            <div className={`border p-4 ${widths[mode]} mx-auto`}>
              <MultiStepPreview />
            </div>
          </section>
        </main>

        <DragOverlay dropAnimation={{ duration: 150 }}>
          {overlayContent}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
