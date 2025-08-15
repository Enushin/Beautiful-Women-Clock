import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTime } from './hooks/useTime';
import { imageStock } from './services/imageData';
import { BijinImage, Todo } from './types';
import ImageContainer from './components/ImageContainer';
import ClockDisplay from './components/ClockDisplay';
import InfoOverlay from './components/InfoOverlay';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const time = useTime();
  const [currentImage, setCurrentImage] = useState<BijinImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [lastImageIndex, setLastImageIndex] = useState<number | null>(null);
  const minuteRef = useRef<number | null>(null);
  const messageTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('bijin-todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
    }
  }, []);
  
  const saveTodos = (newTodos: Todo[]) => {
    localStorage.setItem('bijin-todos', JSON.stringify(newTodos));
  };

  const showAiMessage = (message: string) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    setAiMessage(message);
    messageTimeoutRef.current = window.setTimeout(() => {
      setAiMessage(null);
    }, 5000); // Message disappears after 5 seconds
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    saveTodos(newTodos);
    showAiMessage("新しい目標、素敵です！");
  };

  const handleToggleTodo = (id: number) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTodos(newTodos);

    const targetTodo = newTodos.find(todo => todo.id === id);
    if (targetTodo?.completed) {
      showAiMessage("お疲れ様です！素晴らしい達成です。");
    }
  };
  
  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const fetchBijinImage = useCallback((date: Date) => {
    setIsLoading(true);
    const timeString = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    // Select a random image from the stock, ensuring it's not the same as the last one
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * imageStock.length);
    } while (imageStock.length > 1 && randomIndex === lastImageIndex);
    
    setLastImageIndex(randomIndex);
    const selectedImage = imageStock[randomIndex];
    const { imageUrl, prompt } = selectedImage;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setCurrentImage({
        imageUrl,
        prompt,
        time: timeString,
      });
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error("Failed to load image:", imageUrl);
      setCurrentImage({
        imageUrl: `https://picsum.photos/1080/1920?t=error`,
        prompt: "Error loading image. Displaying a fallback.",
        time: timeString,
      });
      setIsLoading(false);
    };
  }, [lastImageIndex]);

  useEffect(() => {
    const currentMinute = time.getMinutes();
    if (minuteRef.current !== currentMinute) {
      minuteRef.current = currentMinute;
      fetchBijinImage(time);
    }
  }, [time, fetchBijinImage]);
  
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    }
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden font-sans bg-black">
      <ImageContainer imageUrl={currentImage?.imageUrl} isLoading={isLoading} />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
        <ClockDisplay time={time} />
      </div>
      <InfoOverlay prompt={currentImage?.prompt} isLoading={isLoading} />
      <TodoList 
        todos={todos}
        onAddTodo={handleAddTodo}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        aiMessage={aiMessage}
      />
    </main>
  );
};

export default App;