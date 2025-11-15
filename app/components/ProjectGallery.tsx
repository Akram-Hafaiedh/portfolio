'use client';
import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";
import { ProjectImage } from "@/lib/projects";


interface ProjectGalleryProps {
    images?: ProjectImage[];
    title?: string;
    initialDisplayCount?: number;
}

export default function ProjectGallery({ images, title = "Project Gallery", initialDisplayCount = 6 }: ProjectGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(initialDisplayCount);
    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const loadMore = () => {
        setDisplayCount(prev => Math.min(prev + 6, images?.length || 0));
    };

    const showAll = () => {
        setDisplayCount(images?.length || 0);
    };

    if (!images || images.length === 0) return null;

    const displayedImages = images.slice(0, displayCount);
    const remainingCount = images.length - displayCount;
    const hasMore = remainingCount > 0;

    return (
        <>
            {/* Only show title if provided */}
            {title && (
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                    {title}
                </h2>
            )}

            {/* Grid layout - removed extra padding and container */}
            <div className={`grid ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
                {displayedImages.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer bg-slate-100 dark:bg-slate-800 hover:shadow-xl transition-all duration-300"
                    >
                        <img
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <div className="w-full">
                                {image.category && (
                                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded mb-2 inline-block font-medium">
                                        {image.category}
                                    </span>
                                )}
                                <p className="text-white font-medium text-sm">{image.caption}</p>
                            </div>
                        </div>
                        {/* Click indicator */}
                        <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="mt-8 flex flex-col items-center gap-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Showing {displayCount} of {images.length} images
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={loadMore}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            Load {Math.min(6, remainingCount)} More
                        </button>
                        {remainingCount > 6 && (
                            <button
                                type="button"
                                onClick={showAll}
                                className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium rounded-lg transition-all duration-300"
                            >
                                Show All ({remainingCount} remaining)
                            </button>
                        )}
                    </div>
                </div>
            )}

            <GalleryLightbox
                images={images}
                isOpen={lightboxOpen}
                initialIndex={selectedImageIndex}
                onClose={closeLightbox}
            />
        </>
    );
}