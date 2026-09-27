export interface WebsitePhoto {
  id: string;
  title: string;
  subtitle: string;
  localSrc: string;
  remoteSrc: string;
  occasion: string;
  locationContext: string;
  description: string;
  stageHighlights: string[];
  aspectHint: 'portrait' | 'landscape';
}

export interface EventCategory {
  id: string;
  index: string;
  title: string;
  categoryGroup: 'corporate' | 'academic' | 'celebration';
  categoryLabel: string;
  shortDesc: string;
  detailedApproach: string;
  typicalDuration: string;
  audienceScale: string;
  hostingTone: string;
  signatureSegments: string[];
  featuredPhotoId?: string;
}

export interface WhyChoosePillar {
  id: string;
  index: string;
  title: string;
  summary: string;
  stageExecution: string;
  metricLabel: string;
}

export const CONTACT_INFO = {
  name: 'KARAN YADAV',
  fullTitle: 'Professional Anchor & Show Performer',
  tagline:
    'Turning every event into an unforgettable experience with confident hosting, energetic stage presence and engaging audience interaction.',
  extendedBio:
    'With a captivating stage presence, powerful voice modulation, and 5–6+ years of live stage experience, Anchor Karan Yadav ensures every event becomes a memorable celebration. From grand openings and corporate galas to annual institutional functions and cultural celebrations, his energy connects instantly with the audience.',
  phoneDisplay: '+91 9709544098',
  phoneRaw: '919709544098',
  email: 'ky758391@gmail.com',
  instagramHandle: 'yk.karanyadav',
  instagramUrl: 'https://www.instagram.com/yk.karanyadav/',
  youtubeTitle: 'Karan Yadav Ki Aawaj',
  youtubeUrl: 'https://youtube.com/@yk.karanyadavkiaawaj',
  youtubeEmbedUrl: 'https://www.youtube.com/embed/DNe4XS33qgg',
  youtubeWatchUrl: 'https://www.youtube.com/watch?v=DNe4XS33qgg',
  serviceHubs: ['Gorakhpur', 'Patna', 'Chhapra', 'Siwan'],
  languages: ['Hindi (हिंदी)', 'English', 'Hindi-Desi Masala (हिंदी-देसी मसाला)'],
  formats: ['Live Stage', 'Hybrid Broadcast', 'Virtual Event'],
};

/**
 * Exclusive authentic photographs from https://anchorkaranyadav.github.io/ANCHOR-KARAN-YADAV/
 * Notice: On the original site, `annual-event.jpg` and `business-advertisement.jpg` are the
 * exact uploaded stage images in the repository.
 */
export const WEBSITE_PHOTOS: WebsitePhoto[] = [
  {
    id: 'annual-event',
    title: 'Annual Event & Stage Hosting',
    subtitle: 'Live Stage Command · Spotlight Performance',
    localSrc: '/annual-event.jpg',
    remoteSrc: 'https://anchorkaranyadav.github.io/ANCHOR-KARAN-YADAV/annual-event.jpg',
    occasion: 'Annual Event',
    locationContext: 'Main Stage Auditorium · Live Audience',
    description:
      'Anchor Karan Yadav commanding the stage during a flagship annual function—combining formal protocol, high-spirit crowd interaction, and seamless artist transitions.',
    stageHighlights: [
      'Dignitary felicitation & lamp-lighting protocol',
      'High-energy crowd warm-up & interactive segments',
      'Seamless cue management with sound & light console',
    ],
    aspectHint: 'portrait',
  },
  {
    id: 'business-advertisement',
    title: 'Business & Brand Promotional Event',
    subtitle: 'Commercial Presentation · Brand Launch & Activation',
    localSrc: '/business-advertisement.jpg',
    remoteSrc: 'https://anchorkaranyadav.github.io/ANCHOR-KARAN-YADAV/business-advertisement.jpg',
    occasion: 'Business Advertisement',
    locationContext: 'Commercial Showcase · Brand Presentation',
    description:
      'Energetic brand storytelling, live promotional anchoring, and high-retention crowd engagement tailored for business launches, showroom openings, and commercial campaigns.',
    stageHighlights: [
      'Persuasive brand messaging & product spotlighting',
      'Spontaneous customer & visitor interaction on mic',
      'High-impact vocal projection for public & retail venues',
    ],
    aspectHint: 'portrait',
  },
];

export const WHY_CHOOSE_PILLARS: WhyChoosePillar[] = [
  {
    id: 'presence',
    index: '01',
    title: 'Confident Stage Presence',
    summary: 'Commanding posture, crisp mic technique, and immediate authority from the opening announcement.',
    stageExecution:
      'Every event starts with setting the room’s energy within the first 90 seconds—aligning vocal tone, stage movement, and eye contact so audiences lean in immediately.',
    metricLabel: '5–6+ Years Live Stage Mastery',
  },
  {
    id: 'engagement',
    index: '02',
    title: 'Audience Engagement & Interaction',
    summary: 'Two-way crowd connection that turns passive spectators into active participants.',
    stageExecution:
      'Uses spontaneous wit, tailored ice-breakers, rapid-fire crowd games, and culturally resonant shayari or humor in Hindi, English, and Desi Masala.',
    metricLabel: '100% Live Crowd Participation',
  },
  {
    id: 'coordination',
    index: '03',
    title: 'Professional Event Coordination',
    summary: 'Tight synchronization with organizers, DJ/sound teams, lighting cues, and backstage performers.',
    stageExecution:
      'Bridges unexpected backstage delays smoothly without dead air, keeping VIP schedules, award sequences, and stage transitions running on time.',
    metricLabel: 'Zero Dead-Air Guarantee',
  },
  {
    id: 'adaptability',
    index: '04',
    title: 'Energetic & Adaptable Hosting Style',
    summary: 'Effortlessly shifts gears between boardroom sophistication and festival-level excitement.',
    stageExecution:
      'Adapts vocabulary and pacing in real time—refined English and formal Hindi for corporate executives, or infectious high-energy banter for youth fests and parties.',
    metricLabel: '3 Languages · Live, Hybrid & Virtual',
  },
  {
    id: 'versatility',
    index: '05',
    title: 'Suitable for Formal, Cultural & Celebration Events',
    summary: 'One versatile voice trusted across 9+ distinct event formats across Bihar, UP, and pan-India.',
    stageExecution:
      'Equally at home hosting corporate summits, showroom grand openings, college farewells, cultural nights, birthday milestones, and luxury weddings.',
    metricLabel: 'Gorakhpur · Patna · Chhapra · Siwan',
  },
];

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'corporate-events',
    index: '01',
    title: 'Corporate Events',
    categoryGroup: 'corporate',
    categoryLabel: 'Corporate & Brand',
    shortDesc: 'Professional hosting for corporate occasions, conferences, award nights, and dealer meets.',
    detailedApproach:
      'Structured run-of-show execution with crisp executive introductions, keynote transitions, panel moderation, and gala award presentations that elevate brand prestige.',
    typicalDuration: '3 – 6 Hours',
    audienceScale: '50 – 1,500+ Delegates',
    hostingTone: 'Polished · Articulate · Authoritative',
    signatureSegments: [
      'Keynote & VIP Leadership Introductions',
      'Gala Award Night & Recognition Hosting',
      'Interactive Corporate Ice-Breakers',
    ],
    featuredPhotoId: 'annual-event',
  },
  {
    id: 'business-advertisements',
    index: '02',
    title: 'Business Advertisements',
    categoryGroup: 'corporate',
    categoryLabel: 'Corporate & Brand',
    shortDesc: 'Energetic presentation, commercial shoots, and promotional brand activations.',
    detailedApproach:
      'High-conversion on-camera and on-stage promotional hosting designed to spotlight your business, articulate value propositions clearly, and draw footfall.',
    typicalDuration: '2 – 5 Hours / Campaign Shoot',
    audienceScale: 'Retail Footfall & Digital Reach',
    hostingTone: 'Persuasive · Dynamic · High-Recall',
    signatureSegments: [
      'Live Product & Showroom Spotlights',
      'On-Camera Promotional Reel Anchoring',
      'Interactive Customer Contests & Giveaways',
    ],
    featuredPhotoId: 'business-advertisement',
  },
  {
    id: 'annual-events',
    index: '03',
    title: 'Annual Events',
    categoryGroup: 'academic',
    categoryLabel: 'Institutional & Cultural',
    shortDesc: 'Annual functions for schools, colleges, and organizations with engaging stage hosting.',
    detailedApproach:
      'Complete command of multi-hour annual day celebrations—balancing ceremonial lamp-lighting and chief guest addresses with electrifying student and cultural performances.',
    typicalDuration: '4 – 7 Hours',
    audienceScale: '300 – 3,000+ Attendees',
    hostingTone: 'Ceremonial · Inspiring · Celebratory',
    signatureSegments: [
      'Ceremonial Inauguration & Chief Guest Protocol',
      'Sequential Cultural & Talent Show Introductions',
      'Excellence Awards & Trophy Distribution',
    ],
    featuredPhotoId: 'annual-event',
  },
  {
    id: 'grand-opening',
    index: '04',
    title: 'Grand Opening',
    categoryGroup: 'corporate',
    categoryLabel: 'Corporate & Brand',
    shortDesc: 'Make your showroom launch, franchise inauguration, or flagship opening memorable.',
    detailedApproach:
      'Creates buzz from the street to the stage—building countdown anticipation for ribbon-cutting ceremonies and engaging VIP guests and walk-in audiences.',
    typicalDuration: '3 – 5 Hours',
    audienceScale: '100 – 800+ Guests',
    hostingTone: 'Buzz-Building · Welcoming · Celebratory',
    signatureSegments: [
      'Ribbon-Cutting Countdown & Inauguration',
      'Founder & Brand Story Spotlight',
      'Live Visitor Vox-Pop & Launch Offers',
    ],
    featuredPhotoId: 'business-advertisement',
  },
  {
    id: 'farewell-events',
    index: '05',
    title: 'Farewell Events',
    categoryGroup: 'academic',
    categoryLabel: 'Institutional & Cultural',
    shortDesc: 'Emotional, entertaining, and well-managed hosting for college, school, and corporate farewells.',
    detailedApproach:
      'Blends heartfelt nostalgia and poetry with upbeat superlatives, ramp-walk commentary, and interactive games that celebrate graduating batches and departing colleagues.',
    typicalDuration: '3 – 5 Hours',
    audienceScale: '100 – 1,000+ Students / Staff',
    hostingTone: 'Warm · Nostalgic · Witty',
    signatureSegments: [
      'Mr. & Ms. Farewell Ramp Walk & Q&A',
      'Memory Lane Tributes & Shayari',
      'Batch Superlatives & Group Games',
    ],
  },
  {
    id: 'birthday-parties',
    index: '06',
    title: 'Birthday Parties',
    categoryGroup: 'celebration',
    categoryLabel: 'Private Celebrations',
    shortDesc: 'Fun hosting, family games, and lively audience interaction for milestone birthdays.',
    detailedApproach:
      'Turns family and milestone birthday gatherings into full-scale entertainment shows with customized trivia, all-ages stage games, and grand cake-cutting build-ups.',
    typicalDuration: '3 – 4 Hours',
    audienceScale: '50 – 400 Guests',
    hostingTone: 'Playful · Warm · Family-Friendly',
    signatureSegments: [
      'Grand Birthday Entry & Cake Ceremony',
      'All-Generation Family Stage Games',
      'Personalized Guest Wishes & Trivia',
    ],
  },
  {
    id: 'pool-parties',
    index: '07',
    title: 'Pool Parties',
    categoryGroup: 'celebration',
    categoryLabel: 'Private Celebrations',
    shortDesc: 'High-energy hosting, DJ synergy, and crowd hype for daytime and evening celebrations.',
    detailedApproach:
      'Non-stop vocal energy synchronized with live DJs—running poolside challenges, team battles, and high-tempo crowd interaction.',
    typicalDuration: '3 – 5 Hours',
    audienceScale: '80 – 500 Partygoers',
    hostingTone: 'High-Voltage · Spontaneous · Upbeat',
    signatureSegments: [
      'Live DJ Mic Hype & Crowd Drops',
      'Poolside Team Competitions',
      'High-Energy Dance-Off Hosting',
    ],
  },
  {
    id: 'cultural-events',
    index: '08',
    title: 'Cultural Events',
    categoryGroup: 'academic',
    categoryLabel: 'Institutional & Cultural',
    shortDesc: 'Stage coordination and engaging presentation for festivals, mahotsavs, and musical nights.',
    detailedApproach:
      'Honors cultural heritage with eloquent Hindi and regional expressions while maintaining crisp stage flow across dance troupes, live bands, and celebrity nights.',
    typicalDuration: '4 – 8 Hours',
    audienceScale: '500 – 5,000+ Audience',
    hostingTone: 'Eloquent · Rooted · Electrifying',
    signatureSegments: [
      'Traditional & Folk Performance Introductions',
      'Star Performer & Band Hype Segments',
      'Shayari & Cultural Storytelling',
    ],
    featuredPhotoId: 'annual-event',
  },
  {
    id: 'custom-events',
    index: '09',
    title: 'Weddings, Sangeet & Custom Shows',
    categoryGroup: 'celebration',
    categoryLabel: 'Private Celebrations',
    shortDesc: 'Tell me about your event—Sangeet nights, ring ceremonies, or custom shows—and let’s make it special.',
    detailedApproach:
      'Bespoke scriptwriting and family-focused entertainment for Sangeet nights, Haldi carnivals, wedding receptions, and one-of-a-kind live productions.',
    typicalDuration: 'Custom Schedule',
    audienceScale: '100 – 2,000+ Guests',
    hostingTone: 'Tailored · Charismatic · Memorable',
    signatureSegments: [
      'Royal Couple Entry & Sangeet Face-Offs',
      'Custom Family Roast & Story Script',
      'Interactive Dance Floor Energizers',
    ],
  },
];
