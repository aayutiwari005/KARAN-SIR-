/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Maximize2,
  Menu,
  MessageSquare,
  Mic,
  Phone,
  Play,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import {
  CONTACT_INFO,
  EVENT_CATEGORIES,
  EventCategory,
  WEBSITE_PHOTOS,
  WebsitePhoto,
  WHY_CHOOSE_PILLARS,
} from './data/portfolioData';
import { StageImage } from './components/StageImage';
import { LightboxModal } from './components/LightboxModal';
import { RunOfShowPlanner, ShowPlanConfig } from './components/RunOfShowPlanner';

export default function App() {
  // Hero photo switcher state (uses the real website photos)
  const [heroPhotoIndex, setHeroPhotoIndex] = useState<number>(0);

  // Fullscreen Lightbox modal state
  const [lightboxPhoto, setLightboxPhoto] = useState<WebsitePhoto | null>(null);

  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Why Choose Karan active pillar state
  const [activePillarId, setActivePillarId] = useState<string>(WHY_CHOOSE_PILLARS[0].id);

  // Events filter state (functional interactive filter buttons)
  const [eventFilter, setEventFilter] = useState<
    'all' | 'corporate' | 'academic' | 'celebration'
  >('all');

  // Expanded event card detail state
  const [selectedEventDetail, setSelectedEventDetail] = useState<EventCategory>(
    EVENT_CATEGORIES[0]
  );

  // Booking form state
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingEmail, setBookingEmail] = useState<string>('');
  const [bookingEventType, setBookingEventType] = useState<string>('Corporate Event');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingLocation, setBookingLocation] = useState<string>('');
  const [bookingFormat, setBookingFormat] = useState<string>('Live Stage');
  const [bookingMessage, setBookingMessage] = useState<string>('');

  // Copy feedback states
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bookingBannerNote, setBookingBannerNote] = useState<string | null>(null);

  const activeHeroPhoto = WEBSITE_PHOTOS[heroPhotoIndex] || WEBSITE_PHOTOS[0];
  const activePillar =
    WHY_CHOOSE_PILLARS.find((p) => p.id === activePillarId) || WHY_CHOOSE_PILLARS[0];

  const filteredEvents =
    eventFilter === 'all'
      ? EVENT_CATEGORIES
      : EVENT_CATEGORIES.filter((ev) => ev.categoryGroup === eventFilter);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSelectEventForBooking = (eventTitle: string, extraNote?: string) => {
    setBookingEventType(eventTitle);
    if (extraNote) {
      setBookingMessage(extraNote);
      setBookingBannerNote(`Pre-filled booking form for "${eventTitle}"`);
      setTimeout(() => setBookingBannerNote(null), 4000);
    } else {
      setBookingBannerNote(`Selected "${eventTitle}" for your booking inquiry`);
      setTimeout(() => setBookingBannerNote(null), 3500);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPlannerToBooking = (config: ShowPlanConfig) => {
    const planSummary = `Duration: ${config.duration} | Crowd Scale: ${config.audienceScale} | Language Blend: ${config.languageStyle}${
      config.selectedModules.length > 0
        ? ` | Stage Segments: ${config.selectedModules.join(', ')}`
        : ''
    }`;
    handleSelectEventForBooking(config.eventType, planSummary);
  };

  // Build formatted WhatsApp text identical in spirit to original site + enhanced fields
  const formattedWhatsAppText = [
    'Hello Karan Yadav,',
    'I want to book you for an event.',
    '',
    `Name: ${bookingName.trim() || 'Not specified'}`,
    `Mobile: ${bookingPhone.trim() || 'Not specified'}`,
    bookingEmail.trim() ? `Email: ${bookingEmail.trim()}` : null,
    `Event: ${bookingEventType || 'Not specified'}`,
    `Format: ${bookingFormat}`,
    `Date: ${bookingDate || 'Not specified'}`,
    `Location: ${bookingLocation.trim() || 'Not specified'}`,
    `Message: ${bookingMessage.trim() || 'No additional message'}`,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappBookingHref = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
    formattedWhatsAppText
  )}`;

  const mailtoBookingHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Event Booking Inquiry: ${bookingEventType} — ${bookingName || 'New Client'}`
  )}&body=${encodeURIComponent(formattedWhatsAppText)}`;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F0] flex flex-col">
      {/* =====================================================================
          TOP BAR CONTRACT (Strict 3-Zone Header: Brand | 5 Nav Links | 1 CTA)
         ===================================================================== */}
      <header className="sticky top-0 z-40 h-16 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#F4F4F0] hover:text-[#E5B84B] transition-colors whitespace-nowrap shrink-0"
          >
            KARAN YADAV
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]"
            aria-label="Primary Navigation"
          >
            <a
              href="#about"
              className="hover:text-[#F4F4F0] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#gallery"
              className="hover:text-[#F4F4F0] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
            >
              Stage Photos
            </a>
            <a
              href="#events"
              className="hover:text-[#F4F4F0] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
            >
              Events
            </a>
            <a
              href="#performance"
              className="hover:text-[#F4F4F0] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
            >
              Performance
            </a>
            <a
              href="#booking"
              className="hover:text-[#F4F4F0] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
            >
              Booking
            </a>
          </nav>

          {/* Zone 3: Primary action */}
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="px-4 py-2 rounded-lg bg-[#E5B84B] text-[#050505] text-xs sm:text-sm font-semibold hover:bg-[#F2C963] transition-colors whitespace-nowrap shrink-0"
            >
              Book Karan
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-[#F4F4F0] hover:border-[#E5B84B] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0D] border-b border-white/15 px-6 py-5 space-y-3">
            <div className="flex flex-col space-y-2.5 text-sm font-medium text-[#D4D4D8]">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E5B84B]"
              >
                About
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E5B84B]"
              >
                Stage Photos
              </a>
              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E5B84B]"
              >
                Events
              </a>
              <a
                href="#performance"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E5B84B]"
              >
                Performance
              </a>
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E5B84B]"
              >
                Booking & Contact
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ===================================================================
            HERO SECTION: Split-Screen Editorial Stage Showcase
           =================================================================== */}
        <section
          id="home"
          className="relative overflow-hidden pt-10 pb-16 sm:py-20 lg:py-24 border-b border-white/10"
          style={{
            background:
              'radial-gradient(circle at 75% 25%, rgba(229, 184, 75, 0.14) 0%, rgba(17, 17, 19, 0.6) 38%, #050505 75%)',
          }}
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Hero Left Column: Typography, Metrics & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Quiet unboxed metadata line */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#E5B84B] font-medium">
                  <span>Professional Anchor & Show Performer</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#A1A1AA]">Live Stage & Event Host</span>
                </div>

                {/* Display Headline */}
                <div>
                  <h1
                    className="font-display text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[0.94] text-[#F4F4F0]"
                    style={{ textWrap: 'balance' }}
                  >
                    KARAN YADAV
                  </h1>
                  <p className="font-editorial italic text-2xl sm:text-3xl text-[#E5B84B] mt-3">
                    Anchoring · Stage Performance · Event Hosting
                  </p>
                </div>

                {/* Core Lead Copy from Website */}
                <p className="text-base sm:text-lg text-[#D4D4D8] leading-relaxed max-w-[62ch]">
                  {CONTACT_INFO.tagline} From high-profile corporate galas and showroom grand
                  openings to annual functions, cultural nights, and grand weddings—bringing
                  commanding voice modulation and unforgettable crowd energy to every stage.
                </p>

                {/* Unboxed Regional & Linguistic Metadata (Zero-Pill Discipline) */}
                <div className="pt-2 border-t border-white/10 text-xs sm:text-sm text-[#A1A1AA] flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-[#F4F4F0] font-medium">
                    Languages: हिंदी · English · हिंदी-देसी मसाला
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Primary Hubs: Gorakhpur · Patna · Chhapra · Siwan & Pan-India
                  </span>
                </div>

                {/* Key Quantitative Proof Bar */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-3 pb-2 border-y border-white/10">
                  <div>
                    <div className="font-mono-num text-2xl sm:text-3xl font-bold text-[#E5B84B]">
                      5–6+
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">Years Stage Experience</div>
                  </div>
                  <div>
                    <div className="font-mono-num text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                      9+
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">
                      Signature Event Formats
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-num text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                      Live · Hybrid
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">
                      Stage & Broadcast Ready
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#booking"
                    className="px-6 py-3.5 rounded-lg bg-[#E5B84B] text-[#050505] font-semibold text-sm hover:bg-[#F2C963] transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Book Karan Yadav</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#performance"
                    className="px-6 py-3.5 rounded-lg bg-[#121216] border border-white/15 text-[#F4F4F0] font-semibold text-sm hover:border-[#E5B84B] hover:text-[#E5B84B] transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Live Performance</span>
                  </a>
                  <a
                    href={`tel:+${CONTACT_INFO.phoneRaw}`}
                    className="px-4 py-3.5 rounded-lg text-xs sm:text-sm font-mono-num text-[#A1A1AA] hover:text-[#F4F4F0] transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#E5B84B]" />
                    <span>{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Hero Right Column: Authentic Website Pictures Interactive Stage Frame */}
              <div className="lg:col-span-5">
                <div className="bg-[#0D0D10] border border-white/15 rounded-2xl p-3 sm:p-4">
                  {/* Main Featured Website Picture */}
                  <StageImage
                    photo={activeHeroPhoto}
                    priority={true}
                    onExpand={(photo) => setLightboxPhoto(photo)}
                    className="rounded-xl aspect-[4/5] w-full"
                  />

                  {/* Interactive Switcher between the Website's Authentic Photos */}
                  <div className="mt-3 flex items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-1.5">
                      {WEBSITE_PHOTOS.map((photo, idx) => {
                        const isCurrent = idx === heroPhotoIndex;
                        return (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => setHeroPhotoIndex(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                              isCurrent
                                ? 'bg-[#E5B84B] text-[#050505] font-semibold'
                                : 'bg-[#16161A] text-[#A1A1AA] hover:text-[#F4F4F0]'
                            }`}
                          >
                            0{idx + 1}. {photo.occasion}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightboxPhoto(activeHeroPhoto)}
                      className="text-xs text-[#A1A1AA] hover:text-[#E5B84B] flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            EDITORIAL MARQUEE RIBBON DIVIDER
           =================================================================== */}
        <div
          className="border-b border-white/10 bg-[#09090B] py-3.5 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium tracking-wider text-[#A1A1AA]">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-8 shrink-0">
                <span className="text-[#E5B84B]">CORPORATE EVENTS</span>
                <span>·</span>
                <span>BUSINESS ADVERTISEMENTS</span>
                <span>·</span>
                <span className="text-[#F4F4F0]">ANNUAL FUNCTIONS</span>
                <span>·</span>
                <span>GRAND OPENINGS</span>
                <span>·</span>
                <span className="text-[#E5B84B]">FAREWELL CEREMONIES</span>
                <span>·</span>
                <span>BIRTHDAY & POOL PARTIES</span>
                <span>·</span>
                <span className="text-[#F4F4F0]">CULTURAL GALAS & WEDDINGS</span>
                <span>·</span>
                <span>GORAKHPUR · PATNA · CHHAPRA · SIWAN</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            ABOUT SECTION: "The Voice Behind the Event" + Interactive Pillars
           =================================================================== */}
        <section id="about" className="py-20 sm:py-24 border-b border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            {/* Section Header */}
            <div className="max-w-2xl">
              <p className="text-xs text-[#E5B84B] font-medium">
                01. About Anchor Karan Yadav
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0] mt-2"
                style={{ textWrap: 'balance' }}
              >
                The Voice Behind the Event — Professional. Energetic. Memorable.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Narrative + Regional & Format Matrix */}
              <div className="lg:col-span-6 space-y-6">
                <p className="text-base text-[#D4D4D8] leading-relaxed">
                  <strong className="text-[#F4F4F0] font-semibold">KARAN YADAV</strong> is a
                  professional anchor and show performer with 5–6+ years of experience in live
                  stage hosting and event entertainment.
                </p>
                <p className="text-base text-[#A1A1AA] leading-relaxed">
                  From grand openings and corporate events to cultural celebrations, college
                  annual functions, and private parties, the focus is always on creating a
                  lively atmosphere, keeping the audience deeply connected, and making every
                  single moment count on stage.
                </p>

                {/* Clean hairline structured info grid (no nested cards-in-cards) */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-[#A1A1AA]">Vocal & Linguistic Range</div>
                    <div className="font-display text-base font-bold text-[#F4F4F0] mt-1">
                      Hindi · English · Desi Masala
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                      Fluent switches between formal corporate English, literary Hindi, and
                      crowd-favorite regional warmth.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs text-[#A1A1AA]">Primary Service Corridor</div>
                    <div className="font-display text-base font-bold text-[#F4F4F0] mt-1">
                      Gorakhpur · Patna · Chhapra · Siwan
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                      Available for live outstation travel across Uttar Pradesh, Bihar, and
                      pan-India venues.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs text-[#A1A1AA]">Event Delivery Formats</div>
                    <div className="font-display text-base font-bold text-[#F4F4F0] mt-1">
                      Live Stage · Hybrid · Virtual
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                      Experienced in multi-camera broadcast stages, open-air grounds, and
                      indoor auditoriums.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs text-[#A1A1AA]">Showmanship Signature</div>
                    <div className="font-display text-base font-bold text-[#E5B84B] mt-1">
                      Zero Dead-Air Stage Command
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                      Spontaneous crowd work, shayari, and seamless backstage coordination.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive "Why Choose Karan?" 5 Pillars Explorer */}
              <div className="lg:col-span-6 bg-[#0D0D10] border border-white/10 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs text-[#E5B84B] font-medium">
                      5 Signature Stage Pillars
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#F4F4F0] mt-0.5">
                      Why Choose Karan Yadav?
                    </h3>
                  </div>
                  <span className="text-xs text-[#A1A1AA]">Click to inspect</span>
                </div>

                <div className="divide-y divide-white/10 mt-2">
                  {WHY_CHOOSE_PILLARS.map((pillar) => {
                    const isOpen = pillar.id === activePillar.id;
                    return (
                      <div key={pillar.id} className="py-3.5">
                        <button
                          type="button"
                          onClick={() => setActivePillarId(pillar.id)}
                          className="w-full text-left flex items-center justify-between gap-4 group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-mono-num text-xs ${
                                isOpen ? 'text-[#E5B84B] font-semibold' : 'text-[#A1A1AA]'
                              }`}
                            >
                              {pillar.index}.
                            </span>
                            <span
                              className={`font-display text-base font-bold transition-colors ${
                                isOpen
                                  ? 'text-[#E5B84B]'
                                  : 'text-[#F4F4F0] group-hover:text-[#E5B84B]'
                              }`}
                            >
                              {pillar.title}
                            </span>
                          </div>
                          <span className="text-xs font-mono-num text-[#A1A1AA] shrink-0">
                            {isOpen ? 'Active' : 'View'}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="mt-3 pl-7 pr-2 space-y-2">
                            <p className="text-sm text-[#F4F4F0] font-medium">
                              {pillar.summary}
                            </p>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed">
                              {pillar.stageExecution}
                            </p>
                            <div className="pt-1 text-xs font-mono-num text-[#E5B84B]">
                              Benchmark · {pillar.metricLabel}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            STAGE PHOTOGRAPHY SHOWCASE: Exclusively Using Website's Pictures
           =================================================================== */}
        <section id="gallery" className="py-20 sm:py-24 border-b border-white/10 bg-[#08080A]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs text-[#E5B84B] font-medium">
                  02. Authentic Stage Portfolio
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0] mt-2"
                  style={{ textWrap: 'balance' }}
                >
                  On-Stage Moments & Brand Presentations
                </h2>
              </div>
              <p className="text-sm text-[#A1A1AA] max-w-md">
                Click any photograph to open the full-resolution stage lightbox viewer with
                execution notes and direct booking options.
              </p>
            </div>

            {/* 2-Column Editorial Stage Showcase featuring both real website pictures */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {WEBSITE_PHOTOS.map((photo, index) => (
                <article
                  key={photo.id}
                  className="lg:col-span-6 bg-[#0E0E12] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <StageImage
                    photo={photo}
                    onExpand={(p) => setLightboxPhoto(p)}
                    className="aspect-[4/4.6] w-full border-0 border-b border-white/10"
                  />

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1AA]">
                        <span className="font-mono-num text-[#E5B84B]">
                          0{index + 1} · {photo.occasion}
                        </span>
                        <span>{photo.locationContext}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#F4F4F0] mt-2">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                        {photo.description}
                      </p>

                      <ul className="mt-5 pt-5 border-t border-white/10 space-y-2 text-xs sm:text-sm text-[#D4D4D8]">
                        {photo.stageHighlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="font-mono-num text-xs text-[#E5B84B] mt-0.5">
                              0{i + 1}.
                            </span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setLightboxPhoto(photo)}
                        className="px-4 py-2 rounded-lg bg-[#16161C] border border-white/15 text-xs font-medium text-[#F4F4F0] hover:border-[#E5B84B] hover:text-[#E5B84B] transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Full Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectEventForBooking(photo.occasion)}
                        className="px-4 py-2 rounded-lg bg-[#E5B84B] text-[#050505] text-xs font-semibold hover:bg-[#F2C963] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                      >
                        <span>Book {photo.occasion}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            EVENTS & OCCASIONS SECTION: Interactive Filter + 9 Signature Formats
           =================================================================== */}
        <section id="events" className="py-20 sm:py-24 border-b border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <p className="text-xs text-[#E5B84B] font-medium">
                  03. What I Host — Events & Occasions
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0] mt-2"
                  style={{ textWrap: 'balance' }}
                >
                  Tailored Stage Hosting Across Every Format
                </h2>
              </div>

              {/* Interactive Filter Controls (Segmented Button Bar) */}
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#111115] border border-white/10 rounded-xl self-start lg:self-auto"
                role="tablist"
                aria-label="Filter event categories"
              >
                {[
                  { id: 'all', label: 'All Occasions (9)' },
                  { id: 'corporate', label: 'Corporate & Brand' },
                  { id: 'academic', label: 'Annual & Cultural' },
                  { id: 'celebration', label: 'Parties & Weddings' },
                ].map((tab) => {
                  const active = eventFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() =>
                        setEventFilter(
                          tab.id as 'all' | 'corporate' | 'academic' | 'celebration'
                        )
                      }
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#E5B84B] text-[#050505] font-semibold'
                          : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Event Cards Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((ev) => {
                const isSelected = selectedEventDetail.id === ev.id;
                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEventDetail(ev)}
                    className={`group rounded-2xl p-6 transition-colors flex flex-col justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-[#12110C] border-[#E5B84B]'
                        : 'bg-[#0D0D10] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      {/* Quiet 1-line unboxed kicker with typographic separator */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1AA]">
                        <span>
                          <span className="font-mono-num text-[#E5B84B]">{ev.index}.</span>{' '}
                          {ev.categoryLabel}
                        </span>
                        <span className="font-mono-num">{ev.typicalDuration}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#F4F4F0] mt-2.5 group-hover:text-[#E5B84B] transition-colors">
                        {ev.title}
                      </h3>

                      <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                        {ev.shortDesc}
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                        {ev.signatureSegments.map((seg, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-[#D4D4D8] flex items-center gap-2"
                          >
                            <span className="font-mono-num text-[#E5B84B]">·</span>
                            <span className="truncate">{seg}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-xs text-[#A1A1AA] truncate">
                        {ev.hostingTone}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectEventForBooking(ev.title);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#1A1A20] group-hover:bg-[#E5B84B] text-[#F4F4F0] group-hover:text-[#050505] text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Select & Book</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Run-of-Show Planner */}
            <div className="mt-16">
              <RunOfShowPlanner onApplyToBooking={handleApplyPlannerToBooking} />
            </div>
          </div>
        </section>

        {/* ===================================================================
            LIVE PERFORMANCE SECTION: Official YouTube Stage Reel
           =================================================================== */}
        <section
          id="performance"
          className="py-20 sm:py-24 border-b border-white/10 bg-[#08080A]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Stage Reel Context & Channel Links */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs text-[#E5B84B] font-medium">
                    04. Live Performance Showreel
                  </p>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0] mt-2"
                    style={{ textWrap: 'balance' }}
                  >
                    Watch Anchor Karan Yadav Live On Stage
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  Experience the real-time vocal energy, spontaneous crowd connection, and
                  commanding stage presence that turn audiences into active participants.
                </p>

                <div className="space-y-4 pt-2 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <Volume2 className="w-5 h-5 text-[#E5B84B] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#F4F4F0]">
                        Dynamic Voice Modulation
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">
                        Crystal-clear articulation across booming open-air grounds and indoor
                        banquet halls.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#E5B84B] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#F4F4F0]">
                        Instant Crowd Rapport
                      </h3>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">
                        Keeping VIPs, youth crowds, and families entertained from the opening
                        entry to the closing note.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Official Channel Links */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <a
                    href={CONTACT_INFO.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-[#E5B84B] text-[#050505] text-xs font-semibold hover:bg-[#F2C963] transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>YouTube · {CONTACT_INFO.youtubeTitle}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={CONTACT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-[#141418] border border-white/15 text-[#F4F4F0] text-xs font-medium hover:border-[#E5B84B] hover:text-[#E5B84B] transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Instagram · @{CONTACT_INFO.instagramHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Cinema Embed Container */}
              <div className="lg:col-span-7">
                <div className="bg-[#0E0E12] border border-white/15 rounded-2xl p-3 sm:p-4">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={CONTACT_INFO.youtubeEmbedUrl}
                      title="Karan Yadav Live Stage Performance"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="mt-3 px-1 flex flex-wrap items-center justify-between gap-2 text-xs text-[#A1A1AA]">
                    <span>Official Stage Reel · Karan Yadav Ki Aawaj</span>
                    <a
                      href={CONTACT_INFO.youtubeWatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E5B84B] hover:underline flex items-center gap-1"
                    >
                      <span>Open directly on YouTube</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            BOOKING & DIRECT CONTACT SECTION: WhatsApp & Email Concierge
           =================================================================== */}
        <section id="booking" className="py-20 sm:py-24">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-xs text-[#E5B84B] font-medium">
                05. Let’s Work Together — Direct Booking
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0] mt-2"
                style={{ textWrap: 'balance' }}
              >
                Book Anchor Karan Yadav for Your Next Event
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] mt-2">
                Fill in your event details below. Your formatted booking request opens
                directly in WhatsApp or Email for instant confirmation.
              </p>
            </div>

            {bookingBannerNote && (
              <div className="mt-6 px-4 py-3 rounded-xl bg-[#1C1709] border border-[#E5B84B]/50 text-xs sm:text-sm text-[#E5B84B] flex items-center justify-between gap-4">
                <span>✓ {bookingBannerNote}</span>
                <button
                  type="button"
                  onClick={() => setBookingBannerNote(null)}
                  className="text-xs underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Direct Contact Box */}
              <div
                id="contact"
                className="lg:col-span-5 bg-[#0D0D10] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F4F4F0]">
                    Make Your Event Special
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
                    Reach out directly via phone, WhatsApp, email, or social channels.
                  </p>
                </div>

                <div className="divide-y divide-white/10">
                  {/* Phone / WhatsApp */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#A1A1AA]">Phone / WhatsApp</div>
                      <a
                        href={`tel:+${CONTACT_INFO.phoneRaw}`}
                        className="font-mono-num text-base font-bold text-[#F4F4F0] hover:text-[#E5B84B] transition-colors mt-0.5 block"
                      >
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(CONTACT_INFO.phoneDisplay, 'phone')}
                        className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-white/10 text-xs text-[#D4D4D8] hover:border-[#E5B84B] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#E5B84B]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`https://wa.me/${CONTACT_INFO.phoneRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#E5B84B] text-[#050505] text-xs font-semibold hover:bg-[#F2C963] transition-colors whitespace-nowrap"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-xs text-[#A1A1AA]">Official Email</div>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="font-mono-num text-sm sm:text-base font-bold text-[#F4F4F0] hover:text-[#E5B84B] transition-colors mt-0.5 block truncate"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                      className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-white/10 text-xs text-[#D4D4D8] hover:border-[#E5B84B] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#E5B84B]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Instagram */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#A1A1AA]">Instagram</div>
                      <a
                        href={CONTACT_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#E5B84B] hover:underline mt-0.5 block"
                      >
                        @{CONTACT_INFO.instagramHandle}
                      </a>
                    </div>
                    <a
                      href={CONTACT_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-white/10 text-xs text-[#D4D4D8] hover:border-[#E5B84B] transition-colors flex items-center gap-1.5"
                    >
                      <span>Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* YouTube */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#A1A1AA]">YouTube Channel</div>
                      <a
                        href={CONTACT_INFO.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#E5B84B] hover:underline mt-0.5 block"
                      >
                        {CONTACT_INFO.youtubeTitle}
                      </a>
                    </div>
                    <a
                      href={CONTACT_INFO.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-white/10 text-xs text-[#D4D4D8] hover:border-[#E5B84B] transition-colors flex items-center gap-1.5"
                    >
                      <span>Channel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Quick City Fill Buttons */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs text-[#A1A1AA] mb-2">
                    Quick-Select Event City (Click to fill location):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_INFO.serviceHubs.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setBookingLocation(city)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          bookingLocation === city
                            ? 'bg-[#E5B84B] text-[#050505] font-semibold'
                            : 'bg-[#15151A] text-[#D4D4D8] border border-white/10 hover:border-[#E5B84B]'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Booking Form */}
              <div className="lg:col-span-7 bg-[#0D0D10] border border-white/10 rounded-2xl p-6 sm:p-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] placeholder:text-[#52525B] focus:outline-none focus:border-[#E5B84B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] placeholder:text-[#52525B] focus:outline-none focus:border-[#E5B84B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-event-type"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Event Type *
                      </label>
                      <select
                        id="booking-event-type"
                        value={bookingEventType}
                        onChange={(e) => setBookingEventType(e.target.value)}
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#E5B84B]"
                      >
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Business Advertisement">
                          Business Advertisement
                        </option>
                        <option value="Annual Event">Annual Event</option>
                        <option value="Grand Opening">Grand Opening</option>
                        <option value="Farewell Event">Farewell Event</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Pool Party">Pool Party</option>
                        <option value="Cultural Event">Cultural Event</option>
                        <option value="Weddings, Sangeet & Custom Shows">
                          Weddings, Sangeet & Custom Shows
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Event Date
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#E5B84B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-location"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Event Location (City / Venue)
                      </label>
                      <input
                        id="booking-location"
                        type="text"
                        value={bookingLocation}
                        onChange={(e) => setBookingLocation(e.target.value)}
                        placeholder="e.g., Gorakhpur, Patna, Chhapra, Siwan..."
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] placeholder:text-[#52525B] focus:outline-none focus:border-[#E5B84B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-format"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Event Format
                      </label>
                      <select
                        id="booking-format"
                        value={bookingFormat}
                        onChange={(e) => setBookingFormat(e.target.value)}
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#E5B84B]"
                      >
                        {CONTACT_INFO.formats.map((fmt) => (
                          <option key={fmt} value={fmt}>
                            {fmt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Your Email (Optional)
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] placeholder:text-[#52525B] focus:outline-none focus:border-[#E5B84B]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-message"
                        className="block text-xs font-medium text-[#D4D4D8] mb-1.5"
                      >
                        Event Details & Message
                      </label>
                      <textarea
                        id="booking-message"
                        rows={4}
                        value={bookingMessage}
                        onChange={(e) => setBookingMessage(e.target.value)}
                        placeholder="Tell me about your event schedule, venue, audience size, or special hosting requirements..."
                        className="w-full bg-[#070709] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-[#F4F4F0] placeholder:text-[#52525B] focus:outline-none focus:border-[#E5B84B] resize-y"
                      />
                    </div>
                  </div>

                  {/* Live WhatsApp Message Preview */}
                  <div className="bg-[#070709] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs text-[#A1A1AA]">
                        Instant Booking Dispatch Preview
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(formattedWhatsAppText, 'summary')}
                        className="text-xs text-[#E5B84B] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'summary' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied Summary</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Message Text</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="font-mono-num text-xs text-[#D4D4D8] whitespace-pre-wrap leading-relaxed">
                      {formattedWhatsAppText}
                    </pre>
                  </div>

                  {/* Primary Dispatch Actions (Direct <a> links for 100% iframe & mobile compatibility) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                    <a
                      href={whatsappBookingHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3.5 rounded-lg bg-[#E5B84B] text-[#050505] font-semibold text-sm hover:bg-[#F2C963] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Booking Request on WhatsApp</span>
                    </a>

                    <a
                      href={mailtoBookingHref}
                      className="px-5 py-3.5 rounded-lg bg-[#16161C] border border-white/15 text-[#F4F4F0] text-xs sm:text-sm font-medium hover:border-[#E5B84B] hover:text-[#E5B84B] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          CLEAN EDITORIAL FOOTER
         ===================================================================== */}
      <footer className="border-t border-white/10 bg-[#050505] py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A1AA]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display font-bold text-sm text-[#E5B84B]">
              KARAN YADAV
            </span>
            <span>—</span>
            <span>Professional Anchor & Show Performer</span>
            <span>·</span>
            <span className="font-mono-num">{CONTACT_INFO.phoneDisplay}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5B84B] transition-colors"
            >
              Instagram
            </a>
            <a
              href={CONTACT_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5B84B] transition-colors"
            >
              YouTube
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-[#E5B84B] transition-colors"
            >
              Email
            </a>
            <span>© {new Date().getFullYear()} Karan Yadav. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Fullscreen Lightbox Modal for Authentic Website Stage Photographs */}
      <LightboxModal
        activePhoto={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
        onSelectPhoto={(photo) => setLightboxPhoto(photo)}
        onBookOccasion={(occasion) => handleSelectEventForBooking(occasion)}
      />
    </div>
  );
}
