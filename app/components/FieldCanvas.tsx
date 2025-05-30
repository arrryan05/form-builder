import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFormStore } from "~/stores/form";
import { FieldConfig } from "~/types/field";

export function FieldCanvas() {
  const fields = useFormStore((s) => s.fields);

  return (
    <>
      {fields.map((field) => (
        <SortableField key={field.id} field={field} />
      ))}
    </>
  );
}

function SortableField({ field }: { field: FieldConfig }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectedId = useFormStore((s) => s.selectedId);
  const selectField = useFormStore((s) => s.selectField);
  const isSelected = selectedId === field.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => selectField(field.id)}
      className={`p-4 mb-2 border rounded cursor-move dark:bg-gray-800 ${
        isSelected
          ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      {field.type} — {field.label}
    </div>
  );
}
