
import React from 'react';

interface ImageContainerProps {
  imageUrl?: string;
  isLoading: boolean;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ imageUrl, isLoading }) => {
  const imageClasses = "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out";

  return (
    <>
      {/* Skeleton loader for the very first image */}
      <div 
        className={`absolute inset-0 bg-gray-900 transition-opacity duration-500 ${!imageUrl ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}
      >
        <div className="w-full h-full bg-gray-800 animate-pulse"></div>
      </div>
      
      {/* The image display */}
      <div
        key={imageUrl}
        className={`${imageClasses} ${isLoading ? 'opacity-30' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${imageUrl || ''})` }}
      />
    </>
  );
};

export default ImageContainer;
