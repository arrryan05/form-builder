// app/components/FieldPalette.tsx
import { useDraggable } from "@dnd-kit/core";
import { FieldType } from "~/types/field";

const SUPPORTED_FIELDS: FieldType[] = [
  "text",
  "textarea",
  "dropdown",
  "checkbox",
  "date",
];

export function FieldPalette() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Add Field</h3>
      <div className="flex flex-col">
        {SUPPORTED_FIELDS.map((type) => (
          <PaletteItem key={type} type={type} />
        ))}
      </div>
    </div>
  );
}

function PaletteItem({ type }: { type: FieldType }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${type}`,
    data: { type },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onPointerDown={() => console.log(`[Palette] pointer down on ${type}`)}
      className="p-2 m-1 border rounded cursor-grab dark:bg-gray-800"
    >
      {type}
    </div>
  );
}
