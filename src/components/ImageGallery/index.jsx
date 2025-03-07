import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const openPreview = (index) => {
    setCurrentIndex(index);
    setSelectedImage(`${BASE_URL}/${images[index]}`);
  };

  const closePreview = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const showNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(`${BASE_URL}/${images[currentIndex + 1]}`);
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(`${BASE_URL}/${images[currentIndex - 1]}`);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closePreview();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center text-orange-700 mb-5">
        🖼 Image Gallery
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={`${BASE_URL}/${img}`}
            alt={`Gallery ${index}`}
            className="w-auto h-auto object-cover rounded-lg cursor-pointer hover:scale-105 transition"
            onClick={() => openPreview(index)}
          />
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center  z-50">
          <div className="relative flex items-center">
            {/* Previous Button */}
            {currentIndex > 0 && (
              <button
                className="absolute left-4 text-white bg-gray-800 hover:bg-gray-600 rounded-full p-3"
                onClick={showPrev}
              >
                <AiOutlineLeft size={24} />
              </button>
            )}

            {/* Image Preview */}
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[80vh] rounded-lg"
            />

            {/* Next Button */}
            {currentIndex < images.length - 1 && (
              <button
                className="absolute right-4 text-white bg-gray-800 hover:bg-gray-600 rounded-full p-3"
                onClick={showNext}
              >
                <AiOutlineRight size={24} />
              </button>
            )}

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-600 rounded-full p-2"
              onClick={closePreview}
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
