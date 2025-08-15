
import React from 'react';
import { Todo } from '../types';
import TrashIcon from './icons/TrashIcon';
import CheckIcon from './icons/CheckIcon';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center p-3 bg-white/5 rounded-lg group transition-all duration-200 hover:bg-white/10">
      <button 
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mr-4 flex-shrink-0 ${
          todo.completed 
            ? 'bg-white/80 border-white/80' 
            : 'bg-transparent border-white/40 group-hover:border-white/80'
        }`}
        aria-label={todo.completed ? 'Mark as not completed' : 'Mark as completed'}
      >
        {todo.completed && <CheckIcon className="w-4 h-4 text-black" />}
      </button>
      <span className={`flex-grow text-white transition-all duration-300 ${todo.completed ? 'line-through opacity-50' : 'opacity-90'}`}>
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo.id)}
        className="ml-4 text-white/40 hover:text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TodoItem;
