
import React from 'react';

interface ClockDisplayProps {
  time: Date;
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({ time }) => {
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  
  const formattedDate = time.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, ' / ');

  const dayOfWeek = time.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="text-white text-center select-none p-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
      <h1 className="text-8xl md:text-9xl font-bold font-clock tracking-wider">
        {formattedTime}
      </h1>
      <p className="mt-2 text-xl md:text-2xl font-light tracking-widest opacity-80">
        {formattedDate}
      </p>
      <p className="mt-1 text-lg md:text-xl font-light tracking-wide opacity-70">
        {dayOfWeek}
      </p>
    </div>
  );
};

export default ClockDisplay;
