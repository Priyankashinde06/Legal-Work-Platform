import { Receipt, Gavel, ListTodo, FileText, ArrowRight, Moon, Sun } from 'lucide-react';
import FloatingCard from './components/FloatingCard';
import { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <style>{`
        :root {
          --spacing-xs: 0.5rem;
          --spacing-sm: 1rem;
          --spacing-md: 1.5rem;
          --spacing-lg: 2rem;
          --spacing-xl: 3rem;
        }

        *:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }

        @media (prefers-contrast: high) {
          .opacity-60 {
            opacity: 0.85 !important;
          }
        }

        @keyframes floatSoft {
          0%, 100% { 
            transform: translateY(0px) rotate(var(--rotation, 0deg)); 
          }
          50% { 
            transform: translateY(-15px) rotate(calc(var(--rotation, 0deg) - 1deg)); 
          }
        }

        @keyframes shine {
          0% {
            transform: rotate(30deg) translateX(-100%);
          }
          100% {
            transform: rotate(30deg) translateX(200%);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes softPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(20px) translateY(20px);
          }
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: ${isDark ? '0.02' : '0.01'};
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          z-index: 100;
        }

        .light-mode-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          animation: gridMove 20s linear infinite;
        }

        .light-mode-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 30%),
                      radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.05) 0%, transparent 35%),
                      radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 25%),
                      radial-gradient(circle at 70% 20%, rgba(99, 102, 241, 0.04) 0%, transparent 30%);
          pointer-events: none;
        }

        .light-mode-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .light-mode-wave {
          position: absolute;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(59, 130, 246, 0.02) 20px,
            rgba(59, 130, 246, 0.02) 40px
          );
          pointer-events: none;
        }

        .animate-float-1 { 
          --rotation: -12deg;
          animation: floatSoft 7s cubic-bezier(0.4, 0, 0.2, 1) infinite; 
        }
        .animate-float-2 { 
          --rotation: -15deg;
          animation: floatSoft 7s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.3s; 
        }
        .animate-float-3 { 
          --rotation: -8deg;
          animation: floatSoft 7s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.6s; 
        }
        .animate-float-4 { 
          --rotation: -10deg;
          animation: floatSoft 7s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.9s; 
        }
        .animate-float-5 { 
          --rotation: -8deg;
          animation: floatSoft 7s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.2s; 
        }

        .heading-accent {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6 0%, transparent 100%);
          border-radius: 2px;
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .floating-card-grid {
            transform: scale(0.9);
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .floating-card {
            max-width: calc(100vw - 2rem);
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>

      <div className="noise-overlay"></div>
      
      <div className={`min-h-screen bg-gradient-to-br ${
        isDark 
          ? 'from-slate-900 via-slate-800/90 to-indigo-950/30' 
          : 'from-blue-50 via-indigo-50/50 to-white'
        } relative overflow-hidden transition-colors duration-500`}>
      
      {/* Light Mode Specific Background Elements */}
      {!isDark && (
        <>
          <div className="light-mode-grid"></div>
          <div className="light-mode-particles"></div>
          <div className="light-mode-wave"></div>
          
          {/* Soft gradient blobs for light mode */}
          <div className="light-mode-blob top-0 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-blue-200/30 to-indigo-200/30 animate-[softPulse_8s_ease-in-out_infinite]"></div>
          <div className="light-mode-blob bottom-0 -right-32 w-[600px] h-[600px] bg-gradient-to-l from-indigo-200/30 to-purple-200/30 animate-[softPulse_8s_ease-in-out_infinite_2s]"></div>
          <div className="light-mode-blob top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-t from-blue-200/20 to-indigo-200/20 animate-[softPulse_8s_ease-in-out_infinite_4s]"></div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Abstract shapes */}
          <svg className="absolute top-40 left-10 w-32 h-32 text-blue-200/20" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" />
          </svg>
          <svg className="absolute bottom-40 right-10 w-48 h-48 text-indigo-200/20 rotate-45" viewBox="0 0 100 100" fill="currentColor">
            <rect x="10" y="10" width="80" height="80" rx="20" />
          </svg>
        </>
      )}

      {/* Dark Mode Background Elements - Enhanced */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent"></div>
          <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-900/40 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle at center, #1e3a8a 0%, transparent 70%)', mixBlendMode: 'soft-light' }}></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-slate-700/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s', background: 'radial-gradient(circle at center, #334155 0%, transparent 70%)', mixBlendMode: 'soft-light' }}></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-slate-800/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', background: 'radial-gradient(circle at center, #1e293b 0%, transparent 70%)', mixBlendMode: 'soft-light' }}></div>
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-blue-800/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.7s', background: 'radial-gradient(circle at center, #1e40af 0%, transparent 70%)', mixBlendMode: 'soft-light' }}></div>
          
          {/* Star field effect for dark mode */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20px 30px, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </>
      )}

      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
          isDark 
            ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),0_10px_20px_-10px_rgba(0,0,0,0.3)]' 
            : 'bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),0_10px_20px_-10px_rgba(0,0,0,0.05)] border border-white/20'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-2 py-8 min-h-screen flex items-center">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8 z-10">
            <motion.div className="space-y-4 relative" variants={itemVariants}>
              <div className="heading-accent"></div>
              <h1 className={`text-5xl md:text-6xl lg:text-6xl font-light ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              } leading-[1.1] tracking-[-0.02em]`}>
                A single platform to{' '}
                <span className="block font-medium">manage every part of</span>
                <span className="block">
                   <span className={`font-semibold ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>your legal work</span>
                </span>
              </h1>
            </motion.div>
            <motion.p
              className={`text-lg md:text-xl max-w-xl font-light leading-[1.7] ${
                isDark ? 'text-slate-400' : 'text-slate-600/90'
              }`}
              variants={itemVariants}
            >
              Track matters, coordinate schedules, manage clients, centralize documents, and handle communication - all in one system.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 pt-4" variants={itemVariants}>
              <motion.button
                className={`px-8 py-3 bg-blue-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg flex items-center gap-2 group relative overflow-hidden ${
                  isDark ? 'hover:bg-blue-500' : 'hover:bg-blue-700'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: isDark 
                    ? '0 20px 40px -15px rgba(37, 99, 235, 0.5), 0 10px 20px -10px rgba(37, 99, 235, 0.3)'
                    : '0 20px 40px -15px rgba(37, 99, 235, 0.3), 0 10px 20px -10px rgba(37, 99, 235, 0.2)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_0.8s_ease-in-out]"></span>
              </motion.button>
              <motion.button
                className={`px-8 py-3 border-2 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ${
                  isDark 
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500' 
                    : 'border-slate-300/50 text-slate-700 hover:bg-white/50 hover:border-slate-400 bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="relative h-[650px] hidden lg:block perspective floating-card-grid"
            variants={itemVariants}
          >
            <div className="absolute top-8 right-12 animate-float-1">
              <FloatingCard
                color="blue"
                rotation={-12}
                icon={Receipt}
                label="Billing"
                className="cursor-pointer"
              />
            </div>

            <div className="absolute top-32 left-0 animate-float-2">
              <FloatingCard
                color="orange"
                rotation={-15}
                icon={Gavel}
                label="Matters"
                className="cursor-pointer"
              />
            </div>

            <div className="absolute top-56 right-4 animate-float-3">
              <FloatingCard
                color="purple"
                rotation={-8}
                label="John Doe - Portal"
                className="cursor-pointer min-w-[250px]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                      isDark 
                        ? 'from-slate-600 to-slate-700' 
                        : 'from-slate-500 to-slate-600'
                    } flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ${
                      isDark ? 'ring-white/20' : 'ring-white/50'
                    }`}>
                      JD
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>John Doe - Portal</span>
                      <span className={`text-xs opacity-80 line-clamp-2 pl-2 border-l-2 ${
                        isDark ? 'border-current' : 'border-blue-500'
                      }`}>Hey! Could you please review a document for me?</span>
                      <span className={`text-xs opacity-60 font-mono tracking-wider uppercase ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>MAT-2233 • 2h ago</span>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </div>

            <div className="absolute bottom-32 left-12 animate-float-4">
              <FloatingCard
                color="dark"
                rotation={-10}
                icon={ListTodo}
                label="Tasks"
                className="cursor-pointer"
              />
            </div>

            <div className="absolute bottom-32 right-0 animate-float-5">
              <FloatingCard
                color="dark"
                rotation={-8}
                icon={FileText}
                label="Documents"
                className="cursor-pointer"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:hidden grid grid-cols-2 gap-4 floating-card-grid"
            variants={itemVariants}
          >
            <FloatingCard
              color="blue"
              rotation={-3}
              icon={Receipt}
              label="Billing"
              className="cursor-pointer floating-card"
            />
            <FloatingCard
              color="orange"
              rotation={-3}
              icon={Gavel}
              label="Matters"
              className="cursor-pointer floating-card"
            />
            <FloatingCard
              color="dark"
              rotation={-3}
              icon={ListTodo}
              label="Tasks"
              className="cursor-pointer floating-card"
            />
            <FloatingCard
              color="dark"
              rotation={-3}
              icon={FileText}
              label="Documents"
              className="cursor-pointer floating-card"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
    </div>
  );
}

export default App;