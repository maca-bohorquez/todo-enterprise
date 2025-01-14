import { Button } from '@/components/common/Button/Button';
import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FiPlus } from 'react-icons/fi';
import styles from './BoardColumn.module.css';

interface BoardColumnProps {
    id: string;
    title: string;
    onAddCard: () => void;
    children: React.ReactNode;
}

export const BoardColumn = memo(({ id, title, onAddCard, children }: BoardColumnProps) => {
    return (
        <div className={styles.column} role="region" aria-label={`${title} column`}>
            <header className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onAddCard}
                    aria-label={`Add card to ${title}`}
                    startIcon={<FiPlus />}
                >
                    Add
                </Button>
            </header>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.content} ${snapshot.isDraggingOver ? styles.draggingOver : ''}`}
                    >
                        {children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
});

BoardColumn.displayName = 'BoardColumn'; 