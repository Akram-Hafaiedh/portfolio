'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";

interface GalleryImage {
    url: string;
    caption: string;
    category?: string;
}

interface GalleryLightboxProps {
    images: GalleryImage[];
    isOpen: boolean;
    initialIndex: number;
    onClose: () => void;
}

export default function GalleryLightbox({ images, isOpen, initialIndex, onClose }: GalleryLightboxProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentImageIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentImageIndex]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const downloadImage = async () => {
        try {
            const response = await fetch(currentImage.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${currentImage.caption.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    if (!isOpen) return null;

    const currentImage = images[currentImageIndex];

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
                aria-label="Close lightbox"
            >
                <FaTimes />
            </button>

            {/* Download Button */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    downloadImage();
                }}
                className="absolute top-4 right-20 text-white text-2xl hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
                aria-label="Download image"
                title="Download image"
            >
                <FaDownload />
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                    }}
                    className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
                    aria-label="Previous image"
                >
                    <FaChevronLeft />
                </button>
            )}

            {/* Image Container */}
            <div className="max-w-7xl w-full h-[85vh] flex flex-col items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-full h-full animate-slide-up flex items-center justify-center">
                    <Image
                        src={currentImage.url}
                        alt={currentImage.caption}
                        fill
                        className="object-contain"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="text-center pb-4 max-w-2xl">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        {currentImage.category && (
                            <span className="text-xs bg-blue-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium">
                                {currentImage.category}
                            </span>
                        )}
                        {images.length > 1 && (
                            <span className="text-gray-400 text-sm font-medium">
                                {currentImageIndex + 1} / {images.length}
                            </span>
                        )}
                    </div>
                    <p className="text-white text-lg font-medium leading-tight">{currentImage.caption}</p>
                </div>
            </div>

            {/* Next Button */}
            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                    }}
                    className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
                    aria-label="Next image"
                >
                    <FaChevronRight />
                </button>
            )}
        </div>
    );
}