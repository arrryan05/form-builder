import React, { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useFormStore } from "~/stores/form";
import type { FieldConfig } from "~/types/field";

export function FieldCanvas() {
  const allFields = useFormStore((s) => s.fields);
  const selectedStep = useFormStore((s) => s.selectedStep);
  const fields = useMemo(
    () => allFields.filter((f) => f.stepId === selectedStep),
    [allFields, selectedStep]
  );

  console.log("🗄️ fieldcanvas"); 
  const moveFieldWithinStep = useFormStore((s) => s.moveFieldWithinStep);

  const [overlayContent, setOverlayContent] = useState<React.ReactNode>(null);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(e: DragStartEvent) {
    const f = fields.find((f) => f.id === e.active.id);
    if (f) {
      setOverlayContent(
        <div className="p-2 bg-blue-200 rounded">{f.label}</div>
      );
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    setOverlayContent(null);
    const { active, over } = e;
    if (!over) return;
    if (active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex > -1 && newIndex > -1) {
      moveFieldWithinStep(oldIndex, newIndex);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {fields.map((field) => (
          <SortableField key={field.id} field={field} />
        ))}
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 150 }}>
        {overlayContent}
      </DragOverlay>
    </DndContext>
  );
}

function SortableField({ field }: { field: FieldConfig }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectField = useFormStore((s) => s.selectField);
  const selectedFieldId = useFormStore((s) => s.selectedFieldId);
  const isSelected = selectedFieldId === field.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => selectField(field.id)}
      className={`p-4 mb-2 border rounded cursor-move bg-white dark:bg-gray-800 ${
        isSelected ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : ""
      }`}
    >
      <div className="font-medium">{field.label}</div>
      <div className="text-xs text-gray-500">{field.type}</div>
    </div>
  );
}
