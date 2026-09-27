import React, { useState } from 'react';
import { Maximize2, Mic } from 'lucide-react';
import { WebsitePhoto } from '../data/portfolioData';

interface StageImageProps {
  photo: WebsitePhoto;
  className?: string;
  imageClassName?: string;
  onExpand?: (photo: WebsitePhoto) => void;
  showCaptionOverlay?: boolean;
  priority?: boolean;
}

export const StageImage: React.FC<StageImageProps> = ({
  photo,
  className = '',
  imageClassName = '',
  onExpand,
  showCaptionOverlay = true,
  priority = false,
}) => {
  const [srcState, setSrcState] = useState<'local' | 'remote' | 'fallback'>('local');

  const currentSrc =
    srcState === 'local' ? photo.localSrc : srcState === 'remote' ? photo.remoteSrc : '';

  const handleImageError = () => {
    if (srcState === 'local') {
      setSrcState('remote');
    } else if (srcState === 'remote') {
      setSrcState('fallback');
    }
  };

  return (
    <div
      className={`group relative overflow-hidden bg-[#111113] border border-white/10 ${
        onExpand ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={() => onExpand && onExpand(photo)}
      role={onExpand ? 'button' : undefined}
      tabIndex={onExpand ? 0 : undefined}
      onKeyDown={(e) => {
        if (onExpand && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onExpand(photo);
        }
      }}
      aria-label={onExpand ? `View full-resolution stage photo: ${photo.title}` : undefined}
    >
      {srcState !== 'fallback' ? (
        <img
          src={currentSrc}
          alt={`${photo.title} — Anchor Karan Yadav`}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={handleImageError}
          className={`w-full h-full object-cover object-top transition-transform duration-200 ease-out group-hover:scale-[1.03] ${imageClassName}`}
        />
      ) : (
        <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#181409] via-[#0F0F12] to-[#050505]">
          <div className="w-12 h-12 rounded-full border border-[#E5B84B]/30 flex items-center justify-center text-[#E5B84B] mb-4">
            <Mic className="w-5 h-5" />
          </div>
          <p className="font-display text-lg font-bold text-[#F4F4F0]">{photo.title}</p>
          <p className="text-xs text-[#A1A1AA] mt-1">{photo.subtitle}</p>
        </div>
      )}

      {/* Measured contrast scrim for legibility */}
      {showCaptionOverlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-[#E5B84B] font-medium tracking-wide">
                {photo.occasion} · {photo.locationContext}
              </p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F4F0] mt-1">
                {photo.title}
              </h3>
            </div>
            {onExpand && (
              <span
                className="shrink-0 w-10 h-10 rounded-lg bg-black/70 border border-white/15 flex items-center justify-center text-[#F4F4F0] group-hover:border-[#E5B84B] group-hover:text-[#E5B84B] transition-colors duration-150"
                aria-hidden="true"
              >
                <Maximize2 className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
