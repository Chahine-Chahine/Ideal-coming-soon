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
      
      @keyframes iconFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      
      @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
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

  // Social media links - REPLACE WITH ACTUAL IDEAL MENA LINKS
  const socialLinks = {
    linkedin: "https://www.linkedin.com/company/ideal-mena", // Update with actual link
    instagram: "https://www.instagram.com/idealmena", // Update with actual link
    whatsapp: "https://wa.me/1234567890", // Update with actual WhatsApp number
  };

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

  // Handle social media click
  const handleSocialClick = (platform: string) => {
    const link = socialLinks[platform as keyof typeof socialLinks];
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
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

          {/* CENTERED CONTENT CONTAINER */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            
            {/* MAIN LOGO CONTAINER - GLASS BORDER REMOVED */}
            <div 
              className="relative p-6 md:p-8 lg:p-14 mx-4 mb-6 md:mb-8 lg:mb-12"
              style={{
                maxWidth: '90vw',
                width: 'fit-content',
                opacity: logoVisible ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
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
                opacity: logoVisible ? 0 : 0,
              }}
            >
              <p 
                className="text-white/90 text-xs md:text-sm lg:text-base font-light mb-1 md:mb-2 tracking-wide"
                style={{
                  fontFamily: fonts.nunitoSans,
                  fontWeight: 300,
                  lineHeight: '1.5',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                }}
              >
                We&apos;re working on a new look, a new feel, and a better experience.
              </p>
              <p 
                className="text-white font-medium text-sm md:text-base lg:text-lg italic"
                style={{
                  fontFamily: fonts.nunitoSans,
                  fontWeight: 600,
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.7)',
                  color: colors.secondaryBlue,
                }}
              >
                Our website will be live soon.
              </p>
            </div>

            {/* Loading Progress Bar - EXACT Brand Gradient WITH DELAYED ENTRANCE */}
            <div 
              className="w-10/12 md:w-80 max-w-md px-4 mb-6 md:mb-10 lg:mb-12"
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
                  fontFamily: fonts.nunitoSans,
                  fontWeight: 700,
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                }}
              >
                INITIALIZING EXPERIENCE
              </p>
            </div>

            {/* SOCIAL MEDIA ICONS SECTION - ADDED EXTRA MARGIN BELOW */}
            <div 
              className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8 px-4 mb-2" // Added mb-2 here
              style={{
                animation: logoVisible 
                  ? 'fadeInUp 0.8s ease-out forwards 1.8s' 
                  : 'none',
                opacity: logoVisible ? 0 : 0,
              }}
            >
              {/* LinkedIn Icon */}
              <button
                onClick={() => handleSocialClick('linkedin')}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-110"
                style={{
                  animation: logoVisible 
                    ? 'iconFloat 3s ease-in-out infinite 2s' 
                    : 'none',
                }}
                aria-label="https://www.linkedin.com/company/idealmena/"
              >
                <div className="relative p-2 md:p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 group-hover:border-secondaryBlue/50 transition-all duration-300">
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path 
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                      fill="white"
                      className="group-hover:fill-[#0077B5] transition-colors duration-300"
                    />
                  </svg>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,119,181,0.3) 0%, transparent 70%)',
                    }}
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  LinkedIn
                </span>
              </button>

              {/* Instagram Icon */}
              <button
                onClick={() => handleSocialClick('instagram')}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-110"
                style={{
                  animation: logoVisible 
                    ? 'iconFloat 3s ease-in-out infinite 2.2s' 
                    : 'none',
                }}
                aria-label="https://www.instagram.com/idealmena/"
              >
                <div className="relative p-2 md:p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 group-hover:border-purple-400/50 transition-all duration-300">
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path 
                      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                      fill="white"
                      className="group-hover:fill-[#E1306C] transition-colors duration-300"
                    />
                  </svg>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle, rgba(225,48,108,0.3) 0%, transparent 70%)',
                    }}
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Instagram
                </span>
              </button>

              {/* WhatsApp Icon */}
              <button
                onClick={() => handleSocialClick('whatsapp')}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-110"
                style={{
                  animation: logoVisible 
                    ? 'iconFloat 3s ease-in-out infinite 2.4s' 
                    : 'none',
                }}
                aria-label="https://wa.me/96170367037"
              >
                <div className="relative p-2 md:p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 group-hover:border-green-400/50 transition-all duration-300">
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path 
                      d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91m3.81 13.43c-.33.93-.75 1.78-1.35 2.48-.15.18-.33.33-.51.48-.18.15-.36.27-.57.37-.21.09-.42.15-.63.18-.21.03-.39.03-.57.03-.18 0-.36 0-.54-.03-.18-.03-.36-.09-.54-.15-.18-.06-.36-.12-.54-.21l-1.38-.72c-.18-.09-.36-.18-.54-.27-.18-.09-.36-.18-.54-.24-.18-.06-.33-.09-.48-.09-.15 0-.3.03-.45.06l-1.65.45c-.15.03-.3.06-.45.06-.15 0-.3 0-.45-.03-.15-.03-.3-.09-.45-.18-.15-.09-.3-.21-.45-.33-.15-.12-.27-.27-.39-.42-.12-.15-.21-.33-.27-.51-.06-.18-.09-.36-.09-.54 0-.18.03-.36.06-.54l.45-1.65c.03-.15.06-.3.09-.45.03-.15.09-.3.15-.45.06-.15.15-.3.24-.45.09-.15.21-.3.33-.45.12-.15.27-.3.42-.45.15-.15.33-.27.51-.39.18-.12.39-.21.6-.27.21-.06.45-.09.69-.09.24 0 .48.03.72.09.24.06.48.15.72.27.24.12.48.27.72.45.24.18.48.39.72.63.24.24.45.51.63.81.18.3.33.63.45.99.12.36.18.75.18 1.17 0 .42-.06.84-.18 1.26-.12.42-.27.81-.45 1.17z"
                      fill="white"
                      className="group-hover:fill-[#25D366] transition-colors duration-300"
                    />
                  </svg>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle, rgba(37,211,102,0.3) 0%, transparent 70%)',
                    }}
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  WhatsApp
                </span>
              </button>
            </div>

            {/* Social media connect text - ADDED EXTRA MARGIN ABOVE */}
            <div 
              className="mt-6 px-4 text-center" // Increased from mt-2 to mt-6
              style={{
                animation: logoVisible 
                  ? 'fadeInUp 0.8s ease-out forwards 2s' 
                  : 'none',
                opacity: logoVisible ? 0 : 0,
              }}
            >
              <p 
                className="text-white/80 text-xs md:text-sm font-light tracking-wide"
                style={{
                  fontFamily: fonts.nunitoSans,
                  fontWeight: 300,
                }}
              >
                Connect with us on social media
              </p>
            </div>
          </div>

          {/* Background Glow Elements - EXACT Brand Colors WITH STAGGERED ENTRANCE */}
          <div 
            className="absolute top-1/4 left-1/4 rounded-full blur-3xl"
            style={{
              width: 'clamp(3rem, 12vw, 12rem)',
              height: 'clamp(3rem, 12vw, 12rem)',
              backgroundColor: colors.primaryBlue2,
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
              backgroundColor: colors.secondaryPurple,
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
              backgroundColor: colors.primaryBlue1,
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