import React, { FC } from 'react';
import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


interface SortableLinkCardProps {
    id: { id: number | string };
    onDelete: (id: number | string) => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

const SortableLinks: FC<SortableLinkCardProps> = ({ id, onDelete, disabled, children }) => {
    const uniqueId = id.id;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: uniqueId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleButtonClick = () => {
        onDelete(uniqueId);
    };

    const isCursorGrabbing = attributes['aria-pressed'];

    return (
        <div ref={setNodeRef} style={style} key={uniqueId}>
            <Card className='p-4 relative flex justify-between gap-5 group'>
                
                {children}

                <div className='flex justify-center items-center gap-4'>
                    <button disabled={disabled} {...attributes} {...listeners} className={` ${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`} aria-describedby={`DndContext-${uniqueId}`}>
                        <svg viewBox="0 0 20 20" width="15">
                            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
                                fill="currentColor"></path>
                        </svg>
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default SortableLinks;
