import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { WebsitePhoto, WEBSITE_PHOTOS } from '../data/portfolioData';
import { StageImage } from './StageImage';

interface LightboxModalProps {
  activePhoto: WebsitePhoto | null;
  onClose: () => void;
  onSelectPhoto: (photo: WebsitePhoto) => void;
  onBookOccasion: (occasion: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  activePhoto,
  onClose,
  onSelectPhoto,
  onBookOccasion,
}) => {
  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentIndex = WEBSITE_PHOTOS.findIndex((p) => p.id === activePhoto.id);
        const nextIndex =
          e.key === 'ArrowRight'
            ? (currentIndex + 1) % WEBSITE_PHOTOS.length
            : (currentIndex - 1 + WEBSITE_PHOTOS.length) % WEBSITE_PHOTOS.length;
        onSelectPhoto(WEBSITE_PHOTOS[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, onClose, onSelectPhoto]);

  if (!activePhoto) return null;

  const currentIndex = WEBSITE_PHOTOS.findIndex((p) => p.id === activePhoto.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + WEBSITE_PHOTOS.length) % WEBSITE_PHOTOS.length;
    onSelectPhoto(WEBSITE_PHOTOS[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % WEBSITE_PHOTOS.length;
    onSelectPhoto(WEBSITE_PHOTOS[nextIdx]);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={activePhoto.title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0D0D0F] border border-white/15 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right high-contrast close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-lg bg-black/80 border border-white/20 text-[#F4F4F0] hover:border-[#E5B84B] hover:text-[#E5B84B] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close lightbox (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Viewer Column */}
        <div className="lg:col-span-7 bg-[#050505] relative flex items-center justify-center max-h-[55vh] lg:max-h-[85vh] overflow-hidden">
          <StageImage
            photo={activePhoto}
            showCaptionOverlay={false}
            className="w-full h-full border-0"
            imageClassName="object-contain max-h-[55vh] lg:max-h-[82vh] group-hover:scale-100"
          />

          {/* Prev / Next Navigation Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-lg bg-black/80 border border-white/15 text-[#F4F4F0] hover:border-[#E5B84B] hover:text-[#E5B84B] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous stage photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-lg bg-black/80 border border-white/15 text-[#F4F4F0] hover:border-[#E5B84B] hover:text-[#E5B84B] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next stage photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="ml-2 text-xs font-mono-num text-[#A1A1AA] bg-black/75 px-2.5 py-1 rounded">
              0{currentIndex + 1} / 0{WEBSITE_PHOTOS.length}
            </span>
          </div>
        </div>

        {/* Editorial Details Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10">
          <div>
            <div className="text-xs text-[#E5B84B] font-medium">
              {activePhoto.occasion} · {activePhoto.locationContext}
            </div>
            <h3 className="font-display text-2xl font-bold text-[#F4F4F0] mt-2">
              {activePhoto.title}
            </h3>
            <p className="text-sm text-[#A1A1AA] mt-1">{activePhoto.subtitle}</p>

            <p className="text-sm text-[#D4D4D8] leading-relaxed mt-5">
              {activePhoto.description}
            </p>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-xs font-semibold text-[#A1A1AA] tracking-wide mb-3">
                Stage Execution Highlights
              </h4>
              <ul className="space-y-2.5 text-sm text-[#E4E4E7]">
                {activePhoto.stageHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono-num text-xs text-[#E5B84B] mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onBookOccasion(activePhoto.occasion);
                onClose();
              }}
              className="px-5 py-2.5 rounded-lg bg-[#E5B84B] text-[#050505] font-semibold text-sm hover:bg-[#F2C963] transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Book {activePhoto.occasion}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-white/15 text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F0] hover:border-white/30 transition-colors whitespace-nowrap cursor-pointer"
            >
              Close Preview (ESC)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
