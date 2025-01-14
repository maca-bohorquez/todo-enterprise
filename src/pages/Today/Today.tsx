import { Card } from '@/components/common/Card/Card';
import { useTodoStore } from '@/store/todoStore';
import { isToday } from 'date-fns';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Today.css';

export const Today = () => {
    const { todos, updateTodo } = useTodoStore();

    // Filtrar las tareas que son para hoy
    const todayTasks = todos.filter(todo => {
        if (!todo.dueDate) return false;
        return isToday(new Date(todo.dueDate));
    });

    const columns = [
        { id: 'TODO', title: 'To Do' },
        { id: 'IN_PROGRESS', title: 'In Progress' },
        { id: 'DONE', title: 'Done' }
    ] as const;

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const { draggableId, destination } = result;
        updateTodo(draggableId, {
            status: destination.droppableId as 'TODO' | 'IN_PROGRESS' | 'DONE'
        });
    };

    return (
        <div className="today-page">
            <div className="today-header">
                <h1>Today's Tasks</h1>
                <p>{new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
            </div>

            {todayTasks.length > 0 ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="today-columns">
                        {columns.map(column => (
                            <div key={column.id} className="today-column">
                                <h3 className="column-title">{column.title}</h3>
                                <Droppable droppableId={column.id}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="column-content"
                                        >
                                            {todayTasks
                                                .filter(todo => todo.status === column.id)
                                                .map((todo, index) => (
                                                    <Draggable
                                                        key={todo.id}
                                                        draggableId={todo.id}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Card
                                                                    {...todo}
                                                                    index={index}
                                                                    onUpdate={(updates) => updateTodo(todo.id, updates)}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            ) : (
                <div className="empty-state">
                    <h3>No tasks scheduled for today</h3>
                    <p>Tasks with today's due date will appear here</p>
                </div>
            )}
        </div>
    );
}; 