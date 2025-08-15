
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';
import PlusIcon from './icons/PlusIcon';

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  aiMessage: string | null;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onAddTodo, onToggleTodo, onDeleteTodo, aiMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Toggle daily plan"
      >
        <PlusIcon className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
      </button>

      <div 
        className={`fixed top-0 right-0 h-full z-40 p-6 pt-24 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full max-w-sm bg-black/70 backdrop-blur-lg shadow-2xl`}
      >
        <h2 className="text-2xl font-semibold text-white mb-2 font-clock" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          My Beautiful Day
        </h2>
        <p className="text-white/70 mb-6 text-sm">Set your intentions for the day.</p>
        
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new goal..."
            className="w-full px-4 py-2 text-white bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/50"
          />
        </form>

        <div className="h-12 flex items-center justify-center mb-4">
           <p className="text-white/90 text-center text-sm italic transition-opacity duration-300">
             {aiMessage}
           </p>
        </div>

        <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={onToggleTodo} 
              onDelete={onDeleteTodo} 
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
