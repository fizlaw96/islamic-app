import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function OrderedQuestion({ question, language, onAnswer }) {
    // ✅ Function to shuffle array randomly
    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    // ✅ State for correct order and user-selected order
    const [correctOrder, setCorrectOrder] = useState([]);
    const [userOrder, setUserOrder] = useState([]);

    // ✅ Reinitialize when `question` changes
    useEffect(() => {
        const sortedOrder = [...question.options].sort((a, b) => a.order - b.order);
        setCorrectOrder(sortedOrder);
        setUserOrder(shuffleArray(sortedOrder));
    }, [question]); // Runs every time `question` changes

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(userOrder);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setUserOrder(reorderedItems);
    };

    const handleSubmit = () => {
        // ✅ Check if the user order matches the correct order
        const isCorrect = userOrder.every((option, index) => option.id === correctOrder[index].id);

        onAnswer(isCorrect);
    };

    return (
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">
                {language === "bm" ? question.question_text_bm : question.question_text_en}
            </p>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="ordered-options">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                            {userOrder.map((option, index) => (
                                <Draggable key={option.id} draggableId={option.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="p-3 border rounded-lg bg-gray-200 cursor-move"
                                        >
                                            {language === "bm" ? option.option_text_bm : option.option_text_en}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* ✅ Instruction Message for Users */}
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {language === "bm"
                    ? "Seret dan susun jawapan dalam urutan yang betul."
                    : "Drag and arrange the answers in the correct order."}
            </p>

            <button
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
                {language === "bm" ? "Jawab" : "Answer"}
            </button>
        </div>
    );
}
