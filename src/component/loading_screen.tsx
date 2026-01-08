// components/LoadingScreen.tsx
"use client";

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  duration?: number; // animation duration in ms
}

// Animation styles as a separate component
function LoadingScreenStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      
      @keyframes gradientSweep {
        0%, 100% { transform: rotate(0deg); opacity: 0.1; }
        50% { transform: rotate(180deg); opacity: 0.3; }
      }
      
      @keyframes lightSweep {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      }
      
      @keyframes pulseSlow {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.1); }
      }
      
      @keyframes loadingProgress {
        0% { width: 0%; opacity: 0.5; }
        50% { opacity: 1; }
        100% { width: 100%; opacity: 0.5; }
      }
      
      @keyframes floatSlow {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-40px) translateX(20px); }
        75% { transform: translateY(-20px) translateX(-10px); }
      }
      
      @keyframes checkmark {
        0% { transform: scale(0) rotate(-45deg); opacity: 0; }
        70% { transform: scale(1.2) rotate(0deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
      }
      
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      /* NEW ANIMATIONS FOR LOGO ENTRANCE */
      @keyframes logoEntrance {
        0% { 
          opacity: 0; 
          transform: scale(0.8) translateY(20px); 
          filter: blur(10px);
        }
        70% { 
          opacity: 1; 
          transform: scale(1.05) translateY(0); 
          filter: blur(0);
        }
        100% { 
          opacity: 1; 
          transform: scale(1) translateY(0); 
          filter: blur(0);
        }
      }
      
      @keyframes borderGlowEntrance {
        0% { 
          opacity: 0; 
          transform: scale(0.9); 
          border-width: 0px;
          box-shadow: 0 0 0 0 rgba(44, 59, 238, 0);
        }
        50% { 
          opacity: 0.5; 
          transform: scale(1.02); 
          border-width: 1px;
          box-shadow: 0 0 0 10px rgba(44, 59, 238, 0.3);
        }
        100% { 
          opacity: 1; 
          transform: scale(1); 
          border-width: 2px;
          box-shadow: 0 25px 50px -12px rgba(44, 59, 238, 0.5);
        }
      }
      
      @keyframes glassAppear {
        0% { 
          opacity: 0; 
          backdrop-filter: blur(0px);
          background: rgba(255, 255, 255, 0);
        }
        100% { 
          opacity: 1; 
          backdrop-filter: blur(24px);
          background: rgba(255, 255, 255, 0.40);
        }
      }
      
      @keyframes outerGlowExpand {
        0% { 
          opacity: 0; 
          transform: translate(-50%, -50%) scale(0.5); 
        }
        100% { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1); 
        }
      }
    `}</style>
  );
}

const LoadingScreen = ({ isLoading, duration = 3000 }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger logo animation after a short delay
    const timer = setTimeout(() => {
      setLogoVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        setTimeout(() => setShow(false), 500);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
      setAnimationComplete(false);
    }
  }, [isLoading, duration]);

  // Don't render on server to avoid hydration mismatch
  if (!mounted || !show) return null;

  // EXACT IDEAL MENA Brand Colors from PDF
  const colors = {
    primaryBlue1: '#14284F',    // Primary Blue 1 - Deep corporate blue
    primaryBlue2: '#2C3BEE',    // Primary Blue 2 - Vibrant digital blue
    secondaryBlue: '#AAD2FF',   // Secondary Blue - Light accent blue
    secondaryPurple: '#7979E0', // Secondary Purple - Future-forward purple
  };

  // EXACT fonts from PDF
  const fonts = {
    nunitoSans: "'Nunito Sans', sans-serif",  // Primary font
    dmSans: "'DM Sans', sans-serif",          // Secondary font
  };

  return (
    <>
      <LoadingScreenStyles />
      
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${
        animationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        
        {/* Main Container */}
        <div className="relative w-full h-full bg-black overflow-hidden">
          
          {/* Animated Gradient Sweep Layer - EXACT BRAND COLORS */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4"
              style={{
                background: `linear-gradient(135deg, transparent, ${colors.primaryBlue2}40, ${colors.secondaryPurple}40)`,
                animation: 'gradientSweep 8s ease-in-out infinite',
              }}
            />
            
            {/* Diagonal Light Sweep - EXACT BRAND COLORS */}
            <div 
              className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.secondaryBlue}80, ${colors.secondaryPurple}80)`,
                animation: 'lightSweep 4s linear infinite',
              }}
            />
          </div>

          {/* Logo Container - FLEXIBLE HEIGHT */}
          <div className="relative w-full h-full flex flex-col items-center justify-between py-6 md:py-12 lg:justify-center px-4">
            
            {/* Spacer for top */}
            <div className="flex-1 md:hidden" />
            
            {/* Neon Outer Glow - EXACT BRAND GRADIENT WITH ENTRANCE ANIMATION */}
            <div 
              className="absolute rounded-full blur-3xl"
              style={{
                width: 'min(500px, 90vw)',
                height: 'min(500px, 90vw)',
                background: `linear-gradient(135deg, ${colors.primaryBlue2}80, ${colors.secondaryPurple}80)`,
                animation: logoVisible 
                  ? 'pulseSlow 3s ease-in-out infinite, outerGlowExpand 1.2s ease-out forwards'
                  : 'none',
                opacity: logoVisible ? 1 : 0,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            
            {/* Glass Morphism Effect - EXACT BRAND STYLING WITH ENTRANCE ANIMATION */}
            <div 
              className="relative rounded-3xl border-2 p-6 md:p-8 lg:p-14 shadow-2xl mx-4 mb-6 md:mb-8 lg:mb-12"
              style={{
                background: 'rgba(255, 255, 255, 0.40)',
                borderColor: 'rgba(255, 255, 255, 0.40)',
                boxShadow: `0 25px 50px -12px ${colors.primaryBlue2}80`,
                maxWidth: '90vw',
                width: 'fit-content',
                animation: logoVisible 
                  ? 'glassAppear 1s ease-out forwards, borderGlowEntrance 1.5s ease-out forwards'
                  : 'none',
                opacity: logoVisible ? 1 : 0,
                backdropFilter: logoVisible ? 'blur(24px)' : 'blur(0px)',
                transition: 'opacity 0.5s ease, backdrop-filter 0.5s ease',
              }}
            >
              
              {/* Logo with Integrated Checkmark - WITH ENTRANCE ANIMATION */}
              <div className="relative">
                <div 
                  className="relative flex items-center justify-center"
                  style={{
                    width: 'min(280px, 65vw)',
                    height: 'min(112px, 26vw)',
                    animation: logoVisible ? 'logoEntrance 1s ease-out forwards' : 'none',
                    opacity: logoVisible ? 1 : 0,
                    transform: logoVisible ? 'scale(1)' : 'scale(0.8) translateY(20px)',
                    filter: logoVisible ? 'blur(0)' : 'blur(10px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease',
                  }}
                >
                  {/* Logo Image */}
                  <img 
                    src="/Ideal-Logo.png"
                    alt="IDEAL Logo"
                    className="w-full h-full object-contain z-30 relative"
                    style={{
                      filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))',
                    }}
                  />
                  
                  {/* Checkmark overlay - EXACT Secondary Blue */}
                  <svg 
                    className="absolute drop-shadow-lg"
                    style={{ 
                      top: '40%', 
                      right: '35%',
                      width: 'clamp(1.5rem, 3.5vw, 3rem)',
                      height: 'clamp(1.5rem, 3.5vw, 3rem)',
                      color: colors.secondaryBlue, // #AAD2FF
                      animation: logoVisible 
                        ? 'checkmark 1s ease-out forwards 0.8s' 
                        : 'none',
                      filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.3))',
                      opacity: logoVisible ? 1 : 0,
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  
                  {/* Pulsing Neon Glow AROUND the logo - EXACT Brand Gradient */}
                  <div 
                    className="absolute blur-2xl rounded-lg"
                    style={{
                      width: 'calc(100% + min(3rem, 8vw))',
                      height: 'calc(100% + min(3rem, 8vw))',
                      background: `linear-gradient(135deg, ${colors.secondaryBlue}99, ${colors.primaryBlue2}99, ${colors.secondaryPurple}99)`,
                      animation: logoVisible 
                        ? 'pulse 2s ease-in-out infinite 1.2s' 
                        : 'none',
                      opacity: logoVisible ? 1 : 0,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      transition: 'opacity 0.5s ease 0.5s',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Coming Soon Text - EXACT FONTS WITH DELAYED ENTRANCE */}
            <div 
              className="px-4 text-center max-w-2xl mx-auto mb-4 md:mb-6 lg:mb-8"
              style={{
                animation: logoVisible 
                  ? 'fadeInUp 1s ease-out forwards 1s' 
                  : 'none',
                opacity: logoVisible ? 0 : 0, // Start at 0, animation will make it 1
              }}
            >
              <p 
                className="text-white/90 text-xs md:text-sm lg:text-base font-light mb-1 md:mb-2 tracking-wide"
                style={{
                  fontFamily: fonts.nunitoSans, // Nunito Sans - Primary font
                  fontWeight: 300, // Light weight as per PDF
                  lineHeight: '1.5',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                }}
              >
                We&apos;re working on a new look, a new feel, and a better experience.
              </p>
              <p 
                className="text-white font-medium text-sm md:text-base lg:text-lg italic"
                style={{
                  fontFamily: fonts.nunitoSans, // Nunito Sans - Primary font
                  fontWeight: 600, // Semi-bold weight
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.7)',
                  color: colors.secondaryBlue, // #AAD2FF
                }}
              >
                Our website will be live soon.
              </p>
            </div>

            {/* Loading Progress Bar - EXACT Brand Gradient WITH DELAYED ENTRANCE */}
            <div 
              className="w-10/12 md:w-80 max-w-md px-4"
              style={{
                animation: logoVisible 
                  ? 'fadeInUp 0.8s ease-out forwards 1.2s' 
                  : 'none',
                opacity: logoVisible ? 0 : 0,
              }}
            >
              <div 
                className="h-1 md:h-1.5 rounded-full overflow-hidden shadow-inner"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.30)',
                }}
              >
                <div 
                  className="h-full rounded-full shadow-lg"
                  style={{
                    // EXACT gradient: Primary Blue 1 → Primary Blue 2 → Secondary Purple
                    background: `linear-gradient(90deg, ${colors.primaryBlue1}, ${colors.primaryBlue2}, ${colors.secondaryPurple})`,
                    animation: logoVisible 
                      ? 'loadingProgress 3s ease-in-out forwards 1.5s' 
                      : 'none',
                    boxShadow: `0 8px 12px -3px ${colors.primaryBlue2}80`,
                  }}
                />
              </div>
              {/* Progress Text - EXACT Font */}
              <p 
                className="text-center text-xs md:text-xs lg:text-sm mt-1.5 md:mt-2 font-semibold tracking-wider drop-shadow-md"
                style={{
                  color: 'rgba(255, 255, 255, 0.90)',
                  fontFamily: fonts.nunitoSans, // Nunito Sans
                  fontWeight: 700, // Bold weight
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                }}
              >
                INITIALIZING EXPERIENCE
              </p>
            </div>

            {/* Spacer for bottom */}
            <div className="flex-1 md:hidden" />
          </div>

          {/* Background Glow Elements - EXACT Brand Colors WITH STAGGERED ENTRANCE */}
          <div 
            className="absolute top-1/4 left-1/4 rounded-full blur-3xl"
            style={{
              width: 'clamp(3rem, 12vw, 12rem)',
              height: 'clamp(3rem, 12vw, 12rem)',
              backgroundColor: colors.primaryBlue2, // #2C3BEE
              opacity: logoVisible ? 0.3 : 0,
              animation: logoVisible 
                ? 'floatSlow 8s ease-in-out infinite 0.5s' 
                : 'none',
              transition: 'opacity 0.8s ease 0.3s',
            }}
          />
          
          <div 
            className="absolute bottom-1/4 right-1/4 rounded-full blur-3xl"
            style={{
              width: 'clamp(4rem, 16vw, 16rem)',
              height: 'clamp(4rem, 16vw, 16rem)',
              backgroundColor: colors.secondaryPurple, // #7979E0
              opacity: logoVisible ? 0.3 : 0,
              animation: logoVisible 
                ? 'floatSlow 8s ease-in-out infinite 1s' 
                : 'none',
              transition: 'opacity 0.8s ease 0.6s',
            }}
          />
          
          {/* Third glow element */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              width: 'clamp(3.5rem, 14vw, 14rem)',
              height: 'clamp(3.5rem, 14vw, 14rem)',
              backgroundColor: colors.primaryBlue1, // #14284F
              opacity: logoVisible ? 0.2 : 0,
              animation: logoVisible 
                ? 'pulseSlow 3s ease-in-out infinite 0.5s' 
                : 'none',
              transition: 'opacity 0.8s ease 0.4s',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;