import { useDraggable } from "@dnd-kit/core";
import PositionCard from "./PositionCard";

const DraggablePosition = ({ position }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: position.id,
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                transition,
                cursor: 'grab',
            }}
        >
            <PositionCard position={position} />
        </div>
    );
};

export default DraggablePosition;