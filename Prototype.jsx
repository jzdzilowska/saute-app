import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, Plus, ShoppingCart, Calendar, Heart, User, Home, Clock, Leaf, Sparkles, ChevronDown, ArrowUpRight, Package, TrendingUp, ChevronLeft } from 'lucide-react';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap');
`;

// Dark glossy palette with silver + olive + pale pink
const colors = {
  // Deep darks
  void: '#08090a',
  obsidian: '#0f1012',
  graphite: '#181a1c',
  slate: '#222426',
  charcoal: '#2a2c2e',

  // Metallic silvers
  chrome: 'linear-gradient(135deg, #7a7a7a 0%, #c4c4c4 20%, #9a9a9a 40%, #e0e0e0 60%, #a8a8a8 80%, #d0d0d0 100%)',
  silver: '#b0b0b0',
  silverBright: '#d4d4d4',
  silverMuted: '#707070',
  silverDark: '#505050',

  // Chic olive green
  olive: '#4a5a42',
  oliveMid: '#5a6b50',
  oliveLight: '#7a8b6e',
  olivePale: '#9aab8e',
  oliveGlow: 'rgba(90, 107, 80, 0.4)',

  // Pale pink accent
  pink: '#e8c4c4',
  pinkMid: '#d4a8a8',
  pinkDeep: '#c49090',
  pinkMuted: '#a88888',
  pinkGlow: 'rgba(232, 196, 196, 0.35)',

  // Text
  cream: '#f0ede8',
  white: '#ffffff',
};

// Animated Grain for dark mode - silver particles
const AnimatedGrain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const createParticles = () => {
      particles = [];
      const numParticles = 60;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.12 + 0.03,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

// User's SAUTÉ Logo (SVG)
const SauteLogo = ({ size = 'normal' }) => (
  <svg
    viewBox="0 0 1279.36 276.59"
    style={{
      width: size === 'large' ? 140 : 100,
      height: 'auto',
    }}
  >
    <defs>
      <linearGradient id="logoMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#909090" />
        <stop offset="25%" stopColor="#e0e0e0" />
        <stop offset="50%" stopColor="#b0b0b0" />
        <stop offset="75%" stopColor="#f0f0f0" />
        <stop offset="100%" stopColor="#c0c0c0" />
      </linearGradient>
    </defs>
    <path fill="url(#logoMetallic)" d="M900.97,122.44l57.45.28c5.05,3.26-3.76,12.54-5.88,16.07-26.16,43.53,7.42,65.04,47.7,70.09,40.52,5.08,83.61-1.78,121.8-15.4,10.74-25.27,35.94-66.78,64.81-72.79,28.71-5.98,35.17,15.42,19.91,36.41-15.61,21.47-44.83,37.81-68.89,48.08-2.16.92-12.44,4.05-12.89,5.6-.24.83-.54,5.11-.61,6.39-1.71,29.76,16.6,42.72,44.63,33.14,20.72-7.08,37.2-22.58,46.43-42.3.78-.49,3.81.36,3.87,1.16-3.69,7.25-7.15,14.6-11.43,21.52-10.99,17.76-26.65,34.49-47.5,39.99-14.26,3.76-29.47,3.76-39.47-8.51-11.22-13.77-8.74-33.05-5.51-49.24-20.55,6.66-42.11,11.28-63.73,13-31.38,2.49-80.59,2.84-102.69-23.26-16.75-19.78-13.02-44.94-7.01-68.23-6.91-.13-13.85.15-20.76.02-8.42-.16-20.33-1.63-28.5-.55-.55.07-1.07.08-1.5.5l-38.1,47.38-1.37,6.13c10.29,11.48,22.68,21.77,31.95,34.07,7.51,9.95,12.15,19.79,8.66,32.56-3.4,12.4-15.68,19.01-28.09,18.38-35.76-1.8-27.08-55.61-21.25-78.49l-23.47,25.26c-16.48,15.52-33.42,33.19-53.66,43.82-14.52,7.62-51.65,20.04-48.81-8.83.54-5.47,3.56-10.26,5.49-15.25-10.78,11.47-23.42,23.4-38.14,29.59-29.61,12.43-43.9-6.37-30.75-34.27,12.47-26.46,35.98-50.97,51.42-76.06,4.15-6.74,13.24-20.76,3.34-26.37-5.61-3.18-18.3.1-24.45,1.75-19.53,5.21-41.15,15.87-59.71,24.27-86.35,39.1-168.24,82.04-260.96,105.95-25.06,6.46-84.96,23.1-80.45-21.48l3.62-12.38c-8.48,10.94-18.11,21.46-29.28,29.7-9.93,7.33-23.85,15.48-36.55,11.65-12.61-3.81-9.29-25.22-6.89-34.86-8.61,6.87-16.78,14.5-25.83,20.91-11.49,8.14-25.25,15.93-39.89,15.09-1.57-.09-5.95-1.39-6.8-1.24-1.06.18-4.21,2.09-5.85,2.6-9.78,3.09-20.69,4.04-28.61-3.59-4.28-4.12-7.81-11.79-6.25-17.78.83-3.2,6.61-7.06,9.89-6.4,1.26.25,7.79,6.51,9.7,7.83,15.11,10.47,28.85,8.89,39.56-6.26,12.22-17.29,10.74-39.32,8.53-59.35-1.31-11.8-3.77-23.49-4.94-35.31-24.84,29.36-49.19,59.55-77.46,85.76-16.66,15.44-49.06,41.32-73.11,31.62-6.49-2.62-11.07-9.37-12.32-16.18-.48-2.6-.63-10.16.55-12.35.67-1.24,1.8-.94,3.07-.77l.8,1.12c-3.45,12.7,3.21,20.31,16.21,19.24,22.53-1.86,59.62-40.75,75.3-57.17,21.61-22.63,41.59-46.85,61.72-70.78-2.05-12.25-2.45-30.17,8.24-38.73,8.55-6.85,21.99-3.15,23.77,8.23,2.7,17.23-11.21,28.76-20.19,41.39,3.8,32.87,20.26,71.26-.37,101.59-3.09,4.55-7.16,8.36-11.2,12.04.84.13,1.6-.14,2.4-.35,20.35-5.25,55.64-38.85,69.06-55.41,5.62-6.93,10.3-15.42,15.81-22.68,15.19-20.03,52.83-60.79,79.5-60.36,6.33.1,10.96,3.49,10.17,10.31l4.24-7.5c.25-.35.61-.42,1-.49,2.22-.43,16.34,2.42,16.74,4.28l-57.23,91.21c-7.14,14.05-16.23,35.38,6.24,39.78,14.89,2.91,33.14-2.3,47.5-6.52,91.13-26.75,174.87-68.16,261.92-104.48,23.18-9.67,54.89-24.22,79.71-26.26,39.16-3.21,27.32,26.06,13.65,47.15-11.95,18.44-26.65,35.31-38.8,53.69-6.13,9.28-13.86,20.9-14.11,32.39-.18,8.13,5.48,11.75,13.23,10.72,11.96-1.59,31.96-24.42,39.77-33.72,27.96-33.31,50.42-71.45,74.24-107.74.25-.35.6-.43.99-.5,2.47-.47,16.52,1.91,17.53,3.99l-.88,2.17c-20.19,32.5-42.73,63.69-62.58,96.39-4.41,7.26-13.33,21.76-12.3,30.22.49,4.04,4.66,5.33,8.24,5.25,18.38-.42,39.14-17.91,52.26-29.75,17.17-15.5,32.26-33.15,47.76-50.27.45-.89-3.21-5.26-3.99-6.53-6.51-10.66-11.21-22.67-4.7-34.61,8.11-14.87,28.62-17.01,43.82-16.41,11.51-26.78,24.13-53.68,38.97-78.77C916.06,30.63,934.29-.07,951.15,0c24.74.11,5.65,37.97-.11,48.78-13.89,26.09-32.57,49.96-50.07,73.66ZM953.31,7.59c-3.09-3.09-9.42-.04-12.31,2.15-10.59,8.04-21.45,27.17-28.12,38.87-13.59,23.83-25.39,48.72-36.4,73.83l4.74-.5c16.63-21.72,33.89-43.03,49.35-65.63,5.97-8.73,25.09-36.45,23.85-46.07-.08-.6-.72-2.25-1.11-2.65ZM171.62,97.05c-3.42.66-6.77,6.78-7.63,9.89-1.27,4.61-1.43,12.14-.25,16.77.17.65-.04,1.27.76,1.73,4.85-5.48,14.43-17.06,13.22-24.71-.45-2.83-3.45-4.18-6.1-3.67ZM1130.89,189.44c8.84-3.3,17.44-7.43,25.64-12.1,12.34-7.02,35.29-22.54,40.58-35.91,4.99-12.6-3.65-16.52-14.71-13.22-12.78,3.81-27.82,20.89-35.42,31.57-6.54,9.2-11.81,19.21-16.09,29.65ZM864.49,133.95h-14.74c-5.1,0-12.66,3.58-15.95,7.54-7.35,8.86-3.92,17.8,1.5,26.42.72,1.15,3.29,5.56,4.45,5.55l17.67-21.83,7.08-17.67ZM226.38,225.1c-3.6,6.54-7.26,13.28-8.51,20.74-1.53,9.2-1.68,19.24,10.6,18.1,14.15-1.31,39.87-32.02,48.71-43.26,16.65-21.19,32-45.11,45.59-68.39,2.93-5.01,6-10.04,8.41-15.34-8.41,6.06-17.26,11.48-25.64,17.59-28.62,20.87-53.32,46.5-79.16,70.56ZM849,196.45c-3.04,17.22-7.87,38.73-1.38,55.63,9.84,25.65,45.72,12.53,37.1-14.61-2.05-6.44-6.85-11.4-10.97-16.53l-24.74-24.49Z"/>
    <path fill="url(#logoMetallic)" d="M1270.7,23.06c6.96-1.27,11.06,6.8,7.14,12.14l-72.48,58.52-2.77-3.27,63.98-65.01c1.15-1.02,2.57-2.09,4.12-2.37Z"/>
  </svg>
);

const NourishApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [navExpanded, setNavExpanded] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [greetingOpacity, setGreetingOpacity] = useState(0);
  const [selectedDay, setSelectedDay] = useState(3); // Thursday (index 3) is today
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartTime = useRef(0);
  const hasMoved = useRef(false);

  // Week plan data
  const weekPlan = [
    { day: 'Mon', date: 27, meal: { name: 'Miso Salmon', emoji: '🐟', time: '25m', macros: { protein: 42, carbs: 28, fat: 18 } }, planned: true },
    { day: 'Tue', date: 28, meal: { name: 'Salmon Grain Bowl', emoji: '🍚', time: '15m', note: 'leftover', macros: { protein: 38, carbs: 45, fat: 14 } }, planned: true },
    { day: 'Wed', date: 29, meal: { name: 'Greek Salad', emoji: '🥗', time: '15m', macros: { protein: 12, carbs: 18, fat: 22 } }, planned: true },
    { day: 'Thu', date: 30, meal: null, planned: false }, // Today - not planned yet
    { day: 'Fri', date: 31, meals: [
      { name: 'Açaí Bowl', emoji: '🫐', time: '10m', type: 'breakfast', macros: { protein: 8, carbs: 52, fat: 12 } },
      { name: 'Thai Curry', emoji: '🍲', time: '30m', type: 'dinner', macros: { protein: 28, carbs: 35, fat: 24 } }
    ], planned: true },
    { day: 'Sat', date: 1, meal: null, planned: false },
    { day: 'Sun', date: 2, meal: { name: 'Brunch Bowl', emoji: '🥑', time: '20m', macros: { protein: 18, carbs: 32, fat: 26 } }, planned: true },
  ];

  // Slow alternating animation with proper fade out / fade in
  useEffect(() => {
    let isMounted = true;
    let showingLogo = true;

    const cycle = async () => {
      while (isMounted) {
        // Hold current state for 3 seconds
        await new Promise(r => setTimeout(r, 3000));
        if (!isMounted) break;

        // Fade out current (1 second)
        if (showingLogo) {
          setLogoOpacity(0);
        } else {
          setGreetingOpacity(0);
        }
        await new Promise(r => setTimeout(r, 1000));
        if (!isMounted) break;

        // Pause while both are invisible (0.5 seconds)
        await new Promise(r => setTimeout(r, 500));
        if (!isMounted) break;

        // Fade in the other one (1 second)
        showingLogo = !showingLogo;
        if (showingLogo) {
          setLogoOpacity(1);
        } else {
          setGreetingOpacity(1);
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    };

    cycle();

    return () => { isMounted = false; };
  }, []);

  const recipes = [
    { name: 'Miso Glazed Salmon', cost: '$14.20', savings: '$7.20', time: '25m', match: 96, emoji: '🐟' },
    { name: 'Lemon Herb Chicken', cost: '$11.80', savings: '$5.40', time: '35m', match: 91, emoji: '🍗' },
    { name: 'Mushroom Risotto', cost: '$9.40', savings: '$4.60', time: '40m', match: 88, emoji: '🍄' },
    { name: 'Thai Coconut Curry', cost: '$10.20', savings: '$6.80', time: '30m', match: 94, emoji: '🥥' },
    { name: 'Mediterranean Bowl', cost: '$8.60', savings: '$3.90', time: '20m', match: 89, emoji: '🥗' },
  ];

  const handlePointerDown = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragStartTime.current = Date.now();
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const diffX = e.clientX - dragStartX.current;
    const diffY = e.clientY - dragStartY.current;
    if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
      hasMoved.current = true;
    }
    setDragX(diffX);
  };

  const handlePointerUp = (e, recipe, isActive) => {
    if (!isDragging) return;
    const elapsed = Date.now() - dragStartTime.current;
    const wasTap = !hasMoved.current && elapsed < 300;

    setIsDragging(false);

    if (dragX > 80 && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else if (dragX < -80 && currentCardIndex < recipes.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (wasTap && isActive && recipe) {
      setSelectedRecipe(recipe);
      setCurrentScreen('recipe');
    }

    setDragX(0);
  };

  const metallicText = {
    background: colors.chrome,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  // Silver metallic border style (no glass)
  const metallicCard = {
    background: colors.graphite,
    border: `1px solid transparent`,
    backgroundImage: `linear-gradient(${colors.graphite}, ${colors.graphite}), linear-gradient(135deg, rgba(120,120,120,0.4) 0%, rgba(180,180,180,0.2) 25%, rgba(100,100,100,0.1) 50%, rgba(200,200,200,0.3) 75%, rgba(130,130,130,0.2) 100%)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  };

  // Subtle metallic border
  const subtleMetallic = {
    background: colors.slate,
    border: `1px solid rgba(180,180,180,0.15)`,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  };

  const PhoneFrame = ({ children }) => (
    <div className="flex items-center justify-center min-h-screen p-8" style={{ background: 'linear-gradient(180deg, #0a0a0c 0%, #000 100%)' }}>
      <style>{fontStyles}</style>
      <div
        className="relative overflow-hidden"
        style={{
          width: 393,
          height: 852,
          borderRadius: 55,
          background: colors.obsidian,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 50px 100px -20px rgba(0,0,0,0.8), inset 0 0 0 11px #000',
        }}
      >
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-50" style={{ width: 126, height: 37, backgroundColor: '#000', borderRadius: 20, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }} />
        <div className="h-full overflow-hidden pt-14 relative" style={{ background: colors.obsidian }}>
          <AnimatedGrain />
          <div className="relative z-10 h-full">{children}</div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2" style={{ width: 134, height: 5, background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 100%)', borderRadius: 3 }} />
      </div>
    </div>
  );

  // Fixed centered orbital nav
  const OrbitalNav = () => {
    const navItems = [
      { icon: Home, screen: 'home', label: 'Home' },
      { icon: Calendar, screen: 'planner', label: 'Plan' },
      { icon: Search, screen: 'discover', label: 'Find' },
      { icon: ShoppingCart, screen: 'cart', label: 'Cart' },
      { icon: User, screen: 'profile', label: 'You' },
    ];

    return (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        {navExpanded && (
          <>
            {navItems.map(({ icon: Icon, screen, label }, idx) => {
              // Position items in a semi-circle above the button
              const totalItems = navItems.length;
              const angleSpread = 140; // degrees
              const startAngle = 180 + (180 - angleSpread) / 2;
              const angleStep = angleSpread / (totalItems - 1);
              const angle = startAngle + idx * angleStep;
              const radius = 95;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <button
                  key={screen}
                  onClick={() => { setCurrentScreen(screen); setNavExpanded(false); }}
                  className="absolute flex flex-col items-center gap-1 transition-all duration-300"
                  style={{
                    left: '50%',
                    bottom: 70,
                    transform: `translate(calc(-50% + ${x}px), ${y}px)`,
                    opacity: navExpanded ? 1 : 0,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      ...metallicCard,
                      background: currentScreen === screen
                        ? `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)`
                        : colors.graphite,
                    }}
                  >
                    <Icon size={20} color={currentScreen === screen ? colors.cream : colors.silverMuted} strokeWidth={1.5} />
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted }}>{label}</span>
                </button>
              );
            })}
          </>
        )}
        <button
          onClick={() => setNavExpanded(!navExpanded)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            ...metallicCard,
            background: navExpanded
              ? `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)`
              : colors.graphite,
            transform: navExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <Plus size={22} color={navExpanded ? colors.cream : colors.silver} strokeWidth={2} />
        </button>
      </div>
    );
  };

  // HOME SCREEN with Calendar
  const HomeScreen = () => (
    <div className="h-full flex flex-col relative">
      {/* Ambient olive glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${colors.oliveGlow} 0%, transparent 70%)` }} />

      {/* Header with slow alternating logo/greeting */}
      <div className="px-6 pt-3 pb-2 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <div className="relative h-10 flex items-center" style={{ minWidth: 220 }}>
            {/* Logo - always in DOM */}
            <div
              className="absolute left-0"
              style={{
                opacity: logoOpacity,
                transition: 'opacity 1s ease-in-out',
              }}
            >
              <SauteLogo size="large" />
            </div>
            {/* Greeting - always in DOM */}
            <div
              className="absolute left-0"
              style={{
                opacity: greetingOpacity,
                transition: 'opacity 1s ease-in-out',
              }}
            >
              <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontStyle: 'italic', fontWeight: 300, color: colors.cream, whiteSpace: 'nowrap' }}>
                Good to see you, Julia
              </h1>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={metallicCard}>
            <Sparkles size={18} color={colors.silver} strokeWidth={1.5} />
          </div>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Thursday, Jan 30
        </p>
      </div>

      {/* Week Calendar Strip */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2 px-2">
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, fontStyle: 'italic', color: colors.cream }}>
            This week
          </h2>
          <button
            onClick={() => setCurrentScreen('planner')}
            className="flex items-center gap-1"
          >
            <span style={{ fontFamily: 'Inter', fontSize: 11, color: colors.oliveLight }}>View all</span>
            <ChevronRight size={14} color={colors.oliveLight} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {weekPlan.map((day, idx) => {
            const isSelected = idx === selectedDay;
            const isToday = idx === 3;

            return (
              <button
                key={day.day}
                onClick={() => setSelectedDay(idx)}
                className="flex-shrink-0 flex flex-col items-center p-2 rounded-2xl transition-all duration-200"
                style={{
                  width: 46,
                  background: isSelected
                    ? `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)`
                    : colors.slate,
                  border: isToday && !isSelected
                    ? `1px solid ${colors.pink}50`
                    : `1px solid ${isSelected ? colors.oliveMid : 'rgba(180,180,180,0.1)'}`,
                  boxShadow: isSelected ? `0 4px 16px ${colors.oliveGlow}` : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'Inter',
                  fontSize: 9,
                  color: isSelected ? colors.olivePale : colors.silverMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {day.day}
                </span>
                <span style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 500,
                  color: isSelected ? colors.white : colors.cream,
                  marginTop: 2,
                }}>
                  {day.date}
                </span>
                <div
                  className="mt-2 w-6 h-6 rounded-lg flex items-center justify-center text-sm"
                  style={{
                    background: day.planned ? (isSelected ? 'rgba(255,255,255,0.15)' : colors.graphite) : 'transparent',
                  }}
                >
                  {day.meal ? day.meal.emoji : day.meals ? day.meals[0].emoji : (
                    <Plus size={12} color={isSelected ? colors.olivePale : colors.silverDark} strokeWidth={1.5} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day's Meal Card(s) */}
        {(weekPlan[selectedDay].meal || weekPlan[selectedDay].meals) ? (
          <div className="mt-2 space-y-2">
            {(weekPlan[selectedDay].meals || [weekPlan[selectedDay].meal]).map((meal, mealIdx) => (
              <div
                key={mealIdx}
                className="p-4 rounded-2xl"
                style={metallicCard}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: colors.slate, border: `1px solid rgba(180,180,180,0.1)` }}
                  >
                    {meal.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', color: colors.cream }}>
                        {meal.name}
                      </h3>
                      {meal.type && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: `${colors.olive}30`,
                            border: `1px solid ${colors.olive}50`,
                            fontFamily: 'Inter',
                            fontSize: 9,
                            color: colors.oliveLight,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                          }}
                        >
                          {meal.type}
                        </span>
                      )}
                      {meal.note && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: `${colors.pink}20`,
                            border: `1px solid ${colors.pink}30`,
                            fontFamily: 'Inter',
                            fontSize: 9,
                            color: colors.pink,
                            fontWeight: 500,
                          }}
                        >
                          {meal.note}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted }}>
                        <Clock size={10} className="inline mr-1" strokeWidth={1.5} />{meal.time}
                      </span>
                      <div className="flex items-center gap-2 ml-1">
                        <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.pink }}>{meal.macros.protein}g P</span>
                        <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.oliveLight }}>{meal.macros.carbs}g C</span>
                        <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted }}>{meal.macros.fat}g F</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} color={colors.silverMuted} strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="mt-2 p-4 rounded-2xl flex items-center justify-center gap-2"
            style={{ ...subtleMetallic, border: `1px dashed rgba(180,180,180,0.2)` }}
          >
            <Plus size={16} color={colors.silverMuted} strokeWidth={1.5} />
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.silverMuted }}>
              Plan a meal for {weekPlan[selectedDay].day}
            </span>
          </div>
        )}
      </div>

      {/* This Week's Savings - compact */}
      <div className="px-6 py-2">
        <div
          className="p-4 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)`,
            boxShadow: `0 8px 24px ${colors.oliveGlow}`,
          }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} color={colors.olivePale} strokeWidth={1.5} />
              <div>
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.olivePale, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  This week you save
                </span>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontStyle: 'italic', fontWeight: 300, color: colors.white, marginTop: -2 }}>
                  $47.20
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.olivePale, marginTop: -2 }}>
                  across <span style={{ color: colors.white }}>Target</span>, <span style={{ color: colors.white }}>Whole Foods</span> & <span style={{ color: colors.white }}>Instacart</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {['🎯', '🥬', '🛒'].map((store, i) => (
                <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  {store}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swipeable Cards */}
      <div className="px-6 py-2 flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, fontStyle: 'italic', color: colors.cream }}>
            Tonight's picks
          </h2>
          <div className="flex items-center gap-1.5">
            {recipes.map((_, idx) => (
              <div key={idx} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: idx === currentCardIndex ? colors.oliveLight : colors.silverDark }} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-2">
          <ChevronLeft size={14} color={currentCardIndex > 0 ? colors.silverMuted : colors.silverDark} strokeWidth={1.5} />
          <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted }}>swipe to explore</span>
          <ChevronRight size={14} color={currentCardIndex < recipes.length - 1 ? colors.silverMuted : colors.silverDark} strokeWidth={1.5} />
        </div>

        <div className="relative h-40">
          {recipes.map((recipe, idx) => {
            const offset = idx - currentCardIndex;
            const isActive = offset === 0;
            const translateX = isActive ? dragX : offset * 16;
            const scale = isActive ? 1 : 0.96 - Math.abs(offset) * 0.02;
            const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.15;
            const zIndex = recipes.length - Math.abs(offset);

            if (Math.abs(offset) > 2) return null;

            return (
              <div
                key={idx}
                className="absolute w-full transition-all cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transitionDuration: isDragging ? '0ms' : '300ms',
                  touchAction: 'pan-y',
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={(e) => handlePointerUp(e, recipe, isActive)}
                onPointerLeave={() => { if (isDragging) { setIsDragging(false); setDragX(0); } }}
              >
                <div
                  className="p-4 rounded-3xl"
                  style={{
                    ...metallicCard,
                    boxShadow: isActive ? '0 12px 40px rgba(0,0,0,0.5)' : '0 6px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ background: colors.pink }} />

                  <div className="flex gap-4 relative z-10">
                    <div className="rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: colors.slate, width: 60, height: 60, border: `1px solid rgba(180,180,180,0.1)` }}>
                      {recipe.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', color: colors.cream, lineHeight: 1.2 }}>
                        {recipe.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted }}>
                          <Clock size={10} className="inline mr-1" strokeWidth={1.5} />{recipe.time}
                        </span>
                        <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.pink }}>{recipe.match}% match</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, fontStyle: 'italic', ...metallicText }}>{recipe.cost}</span>
                          <span style={{ fontFamily: 'Inter', fontSize: 9, color: colors.oliveLight }}>save {recipe.savings}</span>
                        </div>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: colors.slate, border: `1px solid rgba(180,180,180,0.15)` }}>
                          <ArrowUpRight size={12} color={colors.silver} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <OrbitalNav />
    </div>
  );

  // RECIPE SCREEN
  const RecipeScreen = () => {
    const recipe = selectedRecipe || recipes[0];

    return (
      <div className="h-full flex flex-col relative">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${colors.oliveGlow} 0%, transparent 70%)` }} />
        <div className="absolute top-40 right-0 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${colors.pinkGlow} 0%, transparent 70%)` }} />

        <div className="px-6 pt-3 flex justify-between items-center relative z-10">
          <button onClick={() => setCurrentScreen('home')} className="w-10 h-10 rounded-full flex items-center justify-center" style={metallicCard}>
            <ChevronDown size={20} color={colors.silver} strokeWidth={1.5} />
          </button>
          <SauteLogo />
          <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ ...metallicCard, border: `1px solid ${colors.pink}40` }}>
            <Heart size={18} color={colors.pink} strokeWidth={1.5} fill={colors.pink} />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-6 pt-4 pb-32 relative z-10">
          <div className="text-center mb-6">
            <div className="w-28 h-28 mx-auto rounded-3xl flex items-center justify-center text-6xl mb-4" style={{ background: colors.slate, border: `1px solid rgba(180,180,180,0.1)` }}>
              {recipe.emoji}
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 28, fontStyle: 'italic', color: colors.cream, lineHeight: 1.1 }}>
              {recipe.name}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-3">
              <span className="flex items-center gap-1" style={{ fontFamily: 'Inter', fontSize: 12, color: colors.silverMuted }}>
                <Clock size={14} strokeWidth={1.5} /> {recipe.time}
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: 'Inter', fontSize: 12, color: colors.pink }}>
                <Sparkles size={14} strokeWidth={1.5} /> {recipe.match}% match
              </span>
            </div>
          </div>

          {/* Flavor Profile */}
          <div className="mb-5">
            <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
              Flavor Profile
            </p>
            <div className="p-4 rounded-2xl" style={metallicCard}>
              <div className="grid grid-cols-5 gap-3">
                {[{ label: 'Umami', value: 85 }, { label: 'Salt', value: 60 }, { label: 'Sweet', value: 40 }, { label: 'Acid', value: 70 }, { label: 'Spice', value: 20 }].map((f, idx) => (
                  <div key={f.label} className="text-center">
                    <div className="relative w-full h-12 rounded-full overflow-hidden mb-2" style={{ background: colors.slate }}>
                      <div className="absolute bottom-0 w-full rounded-full" style={{ height: `${f.value}%`, background: idx % 2 === 0 ? `linear-gradient(180deg, ${colors.oliveLight} 0%, ${colors.olive} 100%)` : `linear-gradient(180deg, ${colors.pink} 0%, ${colors.pinkDeep} 100%)` }} />
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: 9, color: colors.silverMuted }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-5">
            <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
              Optimized Price
            </p>
            <div className="p-5 rounded-2xl relative overflow-hidden" style={metallicCard}>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15 blur-xl" style={{ background: colors.pink }} />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                  <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 34, fontStyle: 'italic', ...metallicText }}>{recipe.cost}</span>
                  <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.oliveLight, marginTop: 2 }}>You save {recipe.savings}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)` }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.white, fontWeight: 500 }}>33% off</span>
                </div>
              </div>
              <div className="space-y-2 pt-3 relative z-10" style={{ borderTop: `1px solid rgba(180,180,180,0.1)` }}>
                {[{ store: 'Target', items: 'Salmon, rice', price: '$10.48', logo: '🎯', best: true }, { store: 'Whole Foods', items: 'Miso paste', price: '$2.49', logo: '🥬' }, { store: 'Instacart', items: 'Edamame', price: '$1.23', logo: '🛒' }].map((s) => (
                  <div key={s.store} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{s.logo}</span>
                      <div>
                        <span style={{ fontFamily: 'Inter', fontSize: 13, color: colors.cream }}>{s.store}</span>
                        {s.best && <span className="ml-2 px-2 py-0.5 rounded-full text-xs" style={{ background: colors.olive, color: colors.white }}>Best</span>}
                        <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.silverMuted }}>{s.items}</p>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: colors.silverMuted }}>{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carbon */}
          <div className="p-4 rounded-2xl" style={metallicCard}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf size={16} color={colors.oliveLight} strokeWidth={1.5} />
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.cream }}>Carbon Footprint</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-1.5 h-4 rounded-full" style={{ background: i <= 2 ? colors.oliveLight : colors.slate }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 11, color: colors.oliveLight }}>Low impact</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 pb-8" style={{ background: colors.obsidian, borderTop: `1px solid rgba(180,180,180,0.1)` }}>
          <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)`, boxShadow: `0 8px 30px ${colors.oliveGlow}` }}>
            <ShoppingCart size={18} color={colors.white} strokeWidth={2} />
            <span style={{ fontFamily: 'Inter', fontSize: 15, color: colors.white, fontWeight: 500 }}>Add ingredients · {recipe.cost}</span>
          </button>
        </div>
      </div>
    );
  };

  // PLANNER SCREEN
  const PlannerScreen = () => (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${colors.oliveGlow} 0%, transparent 70%)` }} />

      <div className="px-6 pt-3 pb-2 relative z-10">
        <SauteLogo />
        <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 14 }}>This week</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 30, fontStyle: 'italic', color: colors.cream, marginTop: 4 }}>Meal Flow</h1>
      </div>

      <div className="px-6 py-3">
        <div className="p-4 rounded-2xl relative overflow-hidden" style={metallicCard}>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-20 blur-xl" style={{ background: colors.pink }} />
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: colors.pink, boxShadow: `0 0 8px ${colors.pink}` }} />
            <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.pink, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>Leftover Threading Active</span>
          </div>
          <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', color: colors.cream }} className="relative z-10">Monday's salmon → Tuesday's grain bowl</p>
          <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.oliveLight, marginTop: 4 }} className="relative z-10">Zero food waste</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-2 pb-28">
        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-px" style={{ background: `linear-gradient(180deg, ${colors.oliveLight} 0%, ${colors.slate} 100%)` }} />
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
            <div key={day} className="relative flex gap-4 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0" style={{ background: idx === 0 ? `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)` : colors.slate, border: `1px solid ${idx === 0 ? colors.oliveMid : 'rgba(180,180,180,0.15)'}` }}>
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: idx === 0 ? colors.white : colors.silverMuted, fontWeight: 500 }}>{day.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.silverMuted, marginBottom: 6 }}>{day}</p>
                <div className="p-4 rounded-2xl" style={subtleMetallic}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{['🐟', '🍚', '🥗', '🍝', '🍲'][idx]}</span>
                      <div>
                        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 15, fontStyle: 'italic', color: colors.cream }}>{['Miso Salmon', 'Salmon Grain Bowl', 'Greek Salad', 'Aglio Olio', 'Thai Curry'][idx]}</p>
                        <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.silverMuted }}>{['$14.20', '$0 leftover', '$8.40', '$6.20', '$11.80'][idx]}</p>
                      </div>
                    </div>
                    {idx === 1 && (
                      <div className="px-2 py-1 rounded-full" style={{ background: `${colors.pink}20`, border: `1px solid ${colors.pink}30` }}>
                        <span style={{ fontFamily: 'Inter', fontSize: 9, color: colors.pink, fontWeight: 500 }}>THREADED</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-24 left-6 right-6">
        <div className="p-5 rounded-2xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)`, boxShadow: `0 8px 30px ${colors.oliveGlow}` }}>
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-25 blur-2xl" style={{ background: colors.pink }} />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.olivePale }}>Week total</p>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontStyle: 'italic', color: colors.white }}>$40.60</p>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.pink }}>You save</p>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontStyle: 'italic', color: colors.white }}>$47.20</p>
            </div>
          </div>
        </div>
      </div>

      <OrbitalNav />
    </div>
  );

  // DISCOVER SCREEN
  const DiscoverScreen = () => (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${colors.oliveGlow} 0%, transparent 70%)` }} />

      <div className="px-6 pt-3 pb-2 relative z-10">
        <SauteLogo />
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 30, fontStyle: 'italic', color: colors.cream, marginTop: 14 }}>Discover</h1>
      </div>

      <div className="px-6 py-3">
        <div className="p-4 rounded-2xl flex items-center gap-3" style={metallicCard}>
          <Search size={18} color={colors.silverMuted} strokeWidth={1.5} />
          <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 15, fontStyle: 'italic', color: colors.silverMuted }}>"Something warming with what I have..."</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-2 pb-28">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {['Pantry-ready', 'Under $10', '< 20 min', 'High protein'].map((filter, idx) => (
            <button key={filter} className="px-4 py-2 rounded-full whitespace-nowrap" style={{ background: idx === 0 ? colors.olive : colors.slate, color: idx === 0 ? colors.white : colors.cream, fontFamily: 'Inter', fontSize: 12, border: `1px solid ${idx === 0 ? colors.oliveMid : 'rgba(180,180,180,0.15)'}` }}>
              {filter}
            </button>
          ))}
        </div>

        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontStyle: 'italic', color: colors.cream, marginBottom: 12 }}>Trending this week</h2>
        <div className="grid grid-cols-2 gap-3">
          {[{ name: 'Spicy Miso Ramen', cost: '$8.20', savings: '$4.80', emoji: '🍜' }, { name: 'Crispy Tofu Bowl', cost: '$6.40', savings: '$3.20', emoji: '🥢' }, { name: 'Kimchi Fried Rice', cost: '$5.80', savings: '$2.90', emoji: '🍳' }, { name: 'Coconut Curry', cost: '$9.60', savings: '$5.40', emoji: '🥥' }].map((r, idx) => (
            <button key={idx} className="p-4 rounded-2xl text-left" style={subtleMetallic} onClick={() => { setSelectedRecipe({ ...r, match: 90, time: '25m' }); setCurrentScreen('recipe'); }}>
              <div className="h-14 flex items-center justify-center text-4xl mb-3">{r.emoji}</div>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 14, fontStyle: 'italic', color: colors.cream, lineHeight: 1.2 }}>{r.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.cream }}>{r.cost}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: colors.oliveLight }}>save {r.savings}</span>
              </div>
            </button>
          ))}
        </div>

        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontStyle: 'italic', color: colors.cream, margin: '20px 0 12px' }}>Collections</h2>
        {[{ title: 'Batch Cook Sunday', count: 8, desc: 'Cook once, eat all week' }, { title: 'Under 20 Minutes', count: 24, desc: 'Quick weeknight dinners' }].map((c) => (
          <div key={c.title} className="flex items-center justify-between p-4 rounded-2xl mb-3" style={subtleMetallic}>
            <div>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', color: colors.cream }}>{c.title}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.silverMuted, marginTop: 2 }}>{c.count} recipes · {c.desc}</p>
            </div>
            <ChevronRight size={18} color={colors.silverMuted} strokeWidth={1.5} />
          </div>
        ))}
      </div>

      <OrbitalNav />
    </div>
  );

  // CART SCREEN
  const CartScreen = () => (
    <div className="h-full flex flex-col relative">
      <div className="px-6 pt-3 pb-2">
        <SauteLogo />
        <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 14 }}>Optimized across 3 stores</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 30, fontStyle: 'italic', color: colors.cream, marginTop: 4 }}>Your cart</h1>
      </div>

      <div className="flex-1 overflow-auto px-6 py-2 pb-44">
        {[{ store: 'Target', logo: '🎯', items: ['Salmon fillet (2)', 'Sushi rice'], total: '$12.48', eta: '1hr' }, { store: 'Whole Foods', logo: '🥬', items: ['Miso paste', 'Edamame'], total: '$9.48', eta: '45min' }].map((s, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.logo}</span>
                <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 17, fontStyle: 'italic', color: colors.cream }}>{s.store}</span>
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: 11, color: colors.oliveLight }}>{s.eta}</span>
            </div>
            <div className="p-4 rounded-2xl" style={subtleMetallic}>
              {s.items.map((item, iidx) => (
                <div key={iidx} className="flex items-center justify-between py-3" style={{ borderBottom: iidx < s.items.length - 1 ? `1px solid rgba(180,180,180,0.1)` : 'none' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, color: colors.cream }}>{item}</span>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: colors.graphite, border: `1px solid rgba(180,180,180,0.15)` }}><span style={{ color: colors.silver }}>−</span></button>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: colors.silver }}>1</span>
                    <button className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: colors.graphite, border: `1px solid rgba(180,180,180,0.15)` }}><span style={{ color: colors.silver }}>+</span></button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-3 mt-2" style={{ borderTop: `1px solid rgba(180,180,180,0.1)` }}>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.silverMuted }}>Subtotal</span>
                <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 15, fontStyle: 'italic', ...metallicText }}>{s.total}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="p-5 rounded-2xl mt-4" style={metallicCard}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.silverMuted }}>Original total</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.silverMuted, textDecoration: 'line-through' }}>$31.96</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.oliveLight }}>Smart savings</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: colors.oliveLight }}>-$10.00</span>
            </div>
            <div className="flex justify-between pt-3" style={{ borderTop: `1px solid rgba(180,180,180,0.1)` }}>
              <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 17, fontStyle: 'italic', color: colors.cream }}>Total</span>
              <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontStyle: 'italic', ...metallicText }}>$21.96</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-6 right-6">
        <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${colors.olive} 0%, ${colors.oliveMid} 100%)`, boxShadow: `0 8px 30px ${colors.oliveGlow}` }}>
          <span style={{ fontFamily: 'Inter', fontSize: 15, color: colors.white, fontWeight: 500 }}>Checkout · 2 deliveries</span>
        </button>
      </div>

      <OrbitalNav />
    </div>
  );

  // PROFILE SCREEN
  const ProfileScreen = () => (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, rgba(176,176,176,0.5) 0%, transparent 70%)` }} />

      <div className="px-6 pt-3 pb-2 relative z-10">
        <SauteLogo />
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 30, fontStyle: 'italic', color: colors.cream, marginTop: 14 }}>Your profile</h1>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4 pb-28">
        <div className="mb-5">
          <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Your Flavor Profile</p>
          <div className="p-5 rounded-2xl" style={metallicCard}>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 17, fontStyle: 'italic', color: colors.cream, marginBottom: 12 }}>Umami-forward, acid-loving</p>
            <div className="flex flex-wrap gap-2">
              {['🍋 Citrus', '🧄 Garlic', '🌶️ Mild heat'].map((p) => (
                <span key={p} className="px-3 py-1.5 rounded-full" style={{ background: colors.slate, fontFamily: 'Inter', fontSize: 11, color: colors.cream, border: `1px solid rgba(180,180,180,0.1)` }}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[{ label: 'Lifetime saved', value: '$847' }, { label: 'Meals planned', value: '156' }, { label: 'Food waste', value: '0.2kg' }, { label: 'Carbon saved', value: '12kg' }].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl" style={subtleMetallic}>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 24, fontStyle: 'italic', ...metallicText }}>{s.value}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 11, color: colors.silverMuted, marginTop: 4 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Dietary Goals</p>
          <div className="p-4 rounded-2xl" style={subtleMetallic}>
            {['Low Sugar', 'High Protein', 'Anti-Inflammatory'].map((g, idx) => (
              <div key={g} className="flex items-center justify-between py-3" style={{ borderBottom: idx < 2 ? `1px solid rgba(180,180,180,0.1)` : 'none' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 13, color: colors.cream }}>{g}</span>
                <div className="w-11 h-6 rounded-full flex items-center px-0.5" style={{ background: idx < 2 ? colors.olive : colors.slate }}>
                  <div className="w-5 h-5 rounded-full" style={{ background: colors.cream, transform: idx < 2 ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: 'Inter', fontSize: 10, color: colors.silverMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Connected Stores</p>
          <div className="flex gap-3">
            {[{ logo: '🎯', name: 'Target' }, { logo: '🥬', name: 'Whole Foods' }, { logo: '🛒', name: 'Instacart' }, { logo: '🚗', name: 'DoorDash' }].map((s) => (
              <div key={s.name} className="flex-1 p-3 rounded-2xl flex flex-col items-center" style={subtleMetallic}>
                <span className="text-2xl">{s.logo}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 9, color: colors.silverMuted, marginTop: 4 }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OrbitalNav />
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen />;
      case 'recipe': return <RecipeScreen />;
      case 'planner': return <PlannerScreen />;
      case 'discover': return <DiscoverScreen />;
      case 'cart': return <CartScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return <PhoneFrame>{renderScreen()}</PhoneFrame>;
};

export default NourishApp;