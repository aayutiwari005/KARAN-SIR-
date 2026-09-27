import React, { useState } from 'react';
import { ArrowDownRight, Check } from 'lucide-react';
import { EVENT_CATEGORIES } from '../data/portfolioData';

export interface ShowPlanConfig {
  eventType: string;
  duration: string;
  audienceScale: string;
  languageStyle: string;
  selectedModules: string[];
}

interface RunOfShowPlannerProps {
  onApplyToBooking: (config: ShowPlanConfig) => void;
}

const DURATION_OPTIONS = [
  'Half-Day / 3–4 Hours',
  'Full Evening / 5–6 Hours',
  'Full-Day / Multi-Session',
];

const AUDIENCE_OPTIONS = [
  'Intimate Gathering (50–150)',
  'Mid-Scale Hall (150–500)',
  'Grand Arena / Lawn (500–2,000+)',
];

const LANGUAGE_OPTIONS = [
  'Hindi + English (Balanced)',
  'Hindi-Desi Masala (High Energy)',
  'Corporate English + Formal Hindi',
];

const STAGE_MODULES = [
  'Interactive Crowd Ice-Breakers',
  'VIP & Dignitary Protocol',
  'Brand / Product Spotlight',
  'Shayari & Musical Hype',
  'Stage Games & Giveaways',
  'Award & Trophy Distribution',
];

export const RunOfShowPlanner: React.FC<RunOfShowPlannerProps> = ({ onApplyToBooking }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(EVENT_CATEGORIES[0].id);
  const [duration, setDuration] = useState<string>(DURATION_OPTIONS[1]);
  const [audienceScale, setAudienceScale] = useState<string>(AUDIENCE_OPTIONS[1]);
  const [languageStyle, setLanguageStyle] = useState<string>(LANGUAGE_OPTIONS[0]);
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Interactive Crowd Ice-Breakers',
    'VIP & Dignitary Protocol',
    'Award & Trophy Distribution',
  ]);
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  const activeCategory =
    EVENT_CATEGORIES.find((c) => c.id === selectedEventId) || EVENT_CATEGORIES[0];

  const toggleModule = (mod: string) => {
    setSelectedModules((prev) =>
      prev.includes(mod) ? prev.filter((item) => item !== mod) : [...prev, mod]
    );
  };

  const handleApply = () => {
    onApplyToBooking({
      eventType: activeCategory.title,
      duration,
      audienceScale,
      languageStyle,
      selectedModules,
    });
    setAppliedFeedback(true);
    setTimeout(() => setAppliedFeedback(false), 2500);
  };

  const cues = [
    {
      time: 'Act 01 · Opening 00:00',
      title: 'High-Energy Stage Arrival & Atmosphere Warm-Up',
      detail: `Voice check, sound-light sync, and welcoming the ${audienceScale.toLowerCase()} in ${languageStyle}.`,
    },
    {
      time: 'Act 02 · Core Segment',
      title: activeCategory.signatureSegments[0] || 'Inaugural & Main Stage Spotlight',
      detail: activeCategory.detailedApproach,
    },
    {
      time: 'Act 03 · Crowd Pulse',
      title:
        selectedModules.length > 0
          ? `Interactive Modules: ${selectedModules.slice(0, 2).join(' · ')}`
          : 'Spontaneous Audience Interaction & Stage Transition',
      detail:
        'Keeping momentum high between performances or speeches with zero dead air and natural crowd rapport.',
    },
    {
      time: 'Act 04 · Grand Finale',
      title:
        activeCategory.signatureSegments[2] ||
        'Closing Honours, Vote of Thanks & High-Energy Sign-Off',
      detail: `Memorable closing crescendo tailored for a ${duration.toLowerCase()} schedule.`,
    },
  ];

  return (
    <div className="bg-[#0D0D10] border border-white/10 rounded-2xl p-6 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Configuration Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs text-[#E5B84B] font-medium">
              Interactive Stage Cue Architect
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0] mt-1">
              Customize Your Event Run-of-Show
            </h3>
            <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
              Configure your event parameters below to preview how Anchor Karan Yadav structures
              stage energy, transitions, and crowd engagement—then attach it directly to your
              booking inquiry.
            </p>
          </div>

          {/* 1. Occasion Selector */}
          <div>
            <label className="block text-xs font-medium text-[#D4D4D8] mb-2">
              01. Select Event Occasion
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EVENT_CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedEventId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedEventId(cat.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors truncate cursor-pointer ${
                      isSelected
                        ? 'bg-[#E5B84B] text-[#050505] font-semibold'
                        : 'bg-[#141418] text-[#A1A1AA] border border-white/10 hover:text-[#F4F4F0] hover:border-white/25'
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Duration & Audience Scale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="planner-duration"
                className="block text-xs font-medium text-[#D4D4D8] mb-2"
              >
                02. Show Duration
              </label>
              <select
                id="planner-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#141418] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#E5B84B]"
              >
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="planner-audience"
                className="block text-xs font-medium text-[#D4D4D8] mb-2"
              >
                03. Expected Crowd Scale
              </label>
              <select
                id="planner-audience"
                value={audienceScale}
                onChange={(e) => setAudienceScale(e.target.value)}
                className="w-full bg-[#141418] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#E5B84B]"
              >
                {AUDIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Language Blend */}
          <div>
            <label className="block text-xs font-medium text-[#D4D4D8] mb-2">
              04. Preferred Language & Hosting Blend
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {LANGUAGE_OPTIONS.map((lang) => {
                const active = languageStyle === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguageStyle(lang)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors truncate cursor-pointer ${
                      active
                        ? 'bg-white text-[#050505] font-semibold'
                        : 'bg-[#141418] text-[#A1A1AA] border border-white/10 hover:text-[#F4F4F0]'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Interactive Stage Modules */}
          <div>
            <label className="block text-xs font-medium text-[#D4D4D8] mb-2">
              05. Special Stage Segments (Click to Toggle)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STAGE_MODULES.map((mod) => {
                const checked = selectedModules.includes(mod);
                return (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => toggleModule(mod)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      checked
                        ? 'bg-[#1B170B] border border-[#E5B84B]/60 text-[#F4F4F0]'
                        : 'bg-[#141418] border border-white/10 text-[#A1A1AA] hover:text-[#F4F4F0]'
                    }`}
                  >
                    <span className="truncate">{mod}</span>
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                        checked ? 'bg-[#E5B84B] text-[#050505]' : 'border border-white/20'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Live Run-of-Show Cue Sheet Preview */}
        <div className="lg:col-span-6 bg-[#08080A] border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs text-[#A1A1AA]">Recommended Stage Flow</span>
                <h4 className="font-display text-xl font-bold text-[#F4F4F0]">
                  {activeCategory.title} — Cue Sheet
                </h4>
              </div>
              <span className="font-mono-num text-xs text-[#E5B84B]">
                {activeCategory.typicalDuration}
              </span>
            </div>

            {/* Metadata summary bar (unboxed zero-pill text) */}
            <div className="py-3 border-b border-white/10 text-xs text-[#A1A1AA] flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[#F4F4F0] font-medium">{duration}</span>
              <span aria-hidden="true">·</span>
              <span>{audienceScale}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E5B84B]">{languageStyle}</span>
            </div>

            {/* 4-Act Timeline */}
            <div className="mt-5 space-y-4">
              {cues.map((cue, index) => (
                <div
                  key={index}
                  className="pl-4 border-l border-[#E5B84B]/40 py-1 transition-colors hover:border-[#E5B84B]"
                >
                  <div className="font-mono-num text-xs text-[#E5B84B]">{cue.time}</div>
                  <div className="font-display text-sm font-bold text-[#F4F4F0] mt-0.5">
                    {cue.title}
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">{cue.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-xs text-[#A1A1AA]">
              Tone: <span className="text-[#F4F4F0]">{activeCategory.hostingTone}</span>
            </div>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2.5 rounded-lg bg-[#E5B84B] text-[#050505] font-semibold text-xs sm:text-sm hover:bg-[#F2C963] transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>
                {appliedFeedback
                  ? 'Applied to Booking Form Below ✓'
                  : 'Attach Plan to Booking Form'}
              </span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
