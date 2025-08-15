
import React from 'react';

interface InfoOverlayProps {
  prompt?: string;
  isLoading: boolean;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({ prompt, isLoading }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none">
      <div className="max-w-5xl mx-auto text-white">
        <div className="flex items-center justify-between transition-opacity duration-500" style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}>
          <p className={`text-sm md:text-base opacity-90 font-light transition-all duration-300 ${isLoading ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
            {prompt || 'Generating image description...'}
          </p>
          <div className="hidden md:flex items-center space-x-2 opacity-70">
            <span className="text-sm font-semibold">美人時計 AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
