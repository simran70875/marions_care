import React, { useState, useEffect } from 'react';

// Define a simple placeholder component for GridShape to provide background texture
const GridShape: React.FC = () => (
    <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none animate-subtle-wave"
        style={{
            // Creating a subtle, wavy line pattern for the blue background
            // Uses repeating linear gradient at an angle to create diagonal lines
            backgroundImage: 'repeating-linear-gradient(-55deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px)',
            backgroundSize: '40px 40px',
        }}
    />
);


// Define animation phases for strict typing
enum AnimationPhase {
    WHITE_LOGO = 'white-logo',
    BLUE_FLASH = 'blue-flash',
    BLUE_CONTENT = 'blue-content',
}

// Define the interface for component props
interface LoadingScreenProps {
    isAppLoading: boolean;
    onFinish: () => void;
}

/**
 * Loading Screen Component for NYCC CRM with a multi-stage animated intro,
 * featuring a sticky logo that triggers a center-out blue flash and then slides to the header.
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ isAppLoading, onFinish }) => {
    const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(AnimationPhase.WHITE_LOGO);
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isLogoSliding, setIsLogoSliding] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setAnimationPhase(AnimationPhase.BLUE_FLASH), 1500);
        const timer2 = setTimeout(() => {
            setAnimationPhase(AnimationPhase.BLUE_CONTENT);
            setIsLogoSliding(true);
        }, 2300);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    useEffect(() => {
        if (!isAppLoading && animationPhase === AnimationPhase.BLUE_CONTENT) {
            const fadeDelay = 1500;
            const fadeTimeout = setTimeout(() => setIsFadingOut(true), fadeDelay);
            const hideTimeout = setTimeout(() => {
                setIsLoading(false);
                onFinish(); // 🔥 Notify parent when done
            }, fadeDelay + 700);
            return () => {
                clearTimeout(fadeTimeout);
                clearTimeout(hideTimeout);
            };
        }
    }, [isAppLoading, animationPhase, onFinish]);

    if (!isLoading) return null;


    // --- Handlers ---
    const handleContactClick = () => {
        console.log("Navigating to Contact Us page or opening modal...");
        // window.location.href = '/contact'; // Example for actual navigation
    };






    // Determine the wrapper classes
    const wrapperClasses = `fixed top-0 left-0 z-[9999] flex h-screen w-full items-center justify-center overflow-hidden
        transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}
        ${animationPhase === AnimationPhase.WHITE_LOGO ? 'bg-white' : 'bg-radial-dark-to-light'}`; // <-- Radial Gradient applied here

    // --- Component Rendering ---
    return (
        <div className={wrapperClasses}>

            {/* --------------------------- STICKY ANIMATED LOGO CONTAINER --------------------------- */}
            {/* This container is present throughout phases 1, 2, and 3, allowing it to anchor the position. */}
            <div
                className={`absolute flex flex-col items-center justify-center transform transition-all duration-300 ${animationPhase === AnimationPhase.WHITE_LOGO ? 'z-50' : 'z-20' // Logo must be above the flash (z-30)
                    } ${isLogoSliding ? 'animate-logo-slide-to-top-sticky' : 'animate-logo-initial-entrance-center'}`}
            >
                <img
                    src="/images/logo.png" // Ensure this path is correct!
                    alt="NYCC CRM Logo - Community Care"
                    // Added bg-white and rounded-full for the white background icon look
                    className="object-contain drop-shadow-md bg-white rounded-full"
                />
            </div>

            {/* --------------------------- BLUE FLASH TRANSITION OVERLAY --------------------------- */}
            {/* The flash happens over the background but under the logo */}
            {animationPhase === AnimationPhase.BLUE_FLASH && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                    aria-hidden="true"
                >
                    <div className="w-0 h-0 bg-gradient-to-br from-blue-950 to-indigo-900 rounded-full animate-blue-flash" />
                </div>
            )}

            {/* --------------------------- BLUE CONTENT PHASE --------------------------- */}
            {animationPhase === AnimationPhase.BLUE_CONTENT && (
                <div className="relative flex flex-col items-center p-8 z-10 w-full h-full text-white">
                    {/* Background GridShape */}
                    <GridShape />

                    {/* Main Content Area - Centered */}
                    <div className="flex flex-col items-center justify-center flex-grow text-center max-w-2xl px-4 mt-0">
                        {/* Main Tagline: "Marions Care" */}
                        <h2 className="text-4xl md:text-6xl font-extrabold select-none mb-4 animate-fade-in-up-1">
                            MARIONS  <span className="text-blue-400">CARE</span>
                        </h2>

                        {/* Main Messaging: "Managing elderly care made simpler." */}
                        <p className="text-lg md:text-xl font-medium text-white/90 mb-4 animate-fade-in-up-2">
                            Learn more about this fascinating service for our loved ones. <br />
                            Managing elderly care made simpler.
                        </p>

                        {/* Spinner (subtle, could be smaller or integrated into another element if preferred) */}
                        <div className="relative h-10 w-10 mb-8 animate-fade-in-up-3">
                            <div className="absolute inset-0 border-3 border-t-blue-300 border-r-blue-300 border-b-blue-600 border-l-blue-600 rounded-full animate-spin-fast shadow-lg"></div>
                            <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-90 animate-pulse-glow"></div>
                        </div>

                        {/* Call to Action Button */}
                        <button
                            onClick={handleContactClick}
                            className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-full shadow-xl 
                                       hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/70 
                                       transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 
                                       animate-bounce-in"
                        >
                            Request a Demo
                        </button>

                        {/* Supporting Information / Contact Details */}
                        <p className="text-sm font-light text-blue-200 mt-10 animate-fade-in-up-4">
                            CRM — Supporting quality care every day
                        </p>
                        <p className="text-xs font-medium text-white/70 mt-2 animate-fade-in-up-5">
                            Contact us for CRM solutions
                        </p>
                    </div>

                    {/* NEW: Copyright Line - Pinned to the bottom of the screen */}
                    <div className="absolute bottom-4 w-full text-center px-4 animate-fade-in-up-5">
                        <p className="text-xs text-blue-300 opacity-75">
                            &copy; {new Date().getFullYear()} Chorlton Community Care CRM. All rights reserved.
                        </p>
                    </div>

                </div>
            )}

            {/* Tailwind CSS keyframes and custom classes for custom animations */}
            <style>{`
                /* Custom radial gradient for the blue phase background */
                .bg-radial-dark-to-light {
                    /* Darkest color: blue-950, Center color: indigo-600 */
                    background-image: radial-gradient(circle at center, #4f46e5 0%, #172554 100%);
                }

                /* Center position for the logo at the start */
                .animate-logo-initial-entrance-center {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: logo-initial-entrance 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                .animate-logo-initial-entrance-center img {
                    width: 12rem; /* w-48 */
                    height: 12rem; /* h-48 */
                }

                /* Final position for the logo at the header */
                .animate-logo-slide-to-top-sticky {
                    top: 2.5rem; /* top-10 */
                    left: 50%;
                    animation: logo-slide-to-top 1s ease-out forwards;
                }
                .animate-logo-slide-to-top-sticky img {
                    animation: logo-scale 1s ease-out forwards;
                }

                /* Initial logo appearance/scale */
                @keyframes logo-initial-entrance {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }

                /* Logo container slide (movement) */
                @keyframes logo-slide-to-top {
                    0% { transform: translate(-50%, -50%); } /* Start: Center */
                    /* End: Now centered horizontally at the top */
                    100% { transform: translate(-50%, 0); } 
                }

                /* Logo image shrink (size change) */
                @keyframes logo-scale {
                    0% { width: 12rem; height: 12rem; } /* Start: Large size (w-48) */
                    100% { width: 4rem; height: 4rem; } /* End: Small size */
                }

                /* Blue circular flash from center */
                @keyframes blue-flash {
                    0% { width: 0; height: 0; opacity: 0; }
                    100% { width: 200vmax; height: 200vmax; opacity: 1; }
                }

                /* Standard Content Fade In */
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                /* Content animation applications with delays */
                .animate-fade-in-up-05 { animation: fade-in-up 1s ease-out 0s both; }
                .animate-fade-in-up-1 { animation: fade-in-up 1s ease-out 0.2s both; }
                .animate-fade-in-up-2 { animation: fade-in-up 1s ease-out 0.4s both; }
                .animate-fade-in-up-3 { animation: fade-in-up 1s ease-out 0.6s both; }
                .animate-fade-in-up-4 { animation: fade-in-up 1s ease-out 0.8s both; }
                .animate-fade-in-up-5 { animation: fade-in-up 1s ease-out 1s both; }
                
                @keyframes bounce-in {
                    0% { opacity: 0; transform: scale3d(.3, .3, .3); }
                    60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }
                    100% { opacity: 1; transform: scale3d(1, 1, 1); }
                }
                .animate-bounce-in { animation: bounce-in 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1.2s both; }

                /* Re-used animations */
                @keyframes spin-fast-keyframe { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-fast {
                    animation: spin-fast-keyframe 1s linear infinite;
                }
                @keyframes pulse-glow { 0%, 100% { opacity: 0.9; box-shadow: 0 0 8px rgba(255, 255, 255, 0.7); } 50% { opacity: 0.5; box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); } }
                
                /* Subtle background wave movement */
                @keyframes subtle-wave {
                    from { background-position: 0 0; }
                    to { background-position: 40px 40px; } /* Must match background-size in GridShape */
                }
                .animate-subtle-wave {
                    animation: subtle-wave 15s linear infinite; /* Increased duration for slower, smoother movement */
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
