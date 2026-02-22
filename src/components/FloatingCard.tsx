import { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface FloatingCardProps {
  color: 'blue' | 'orange' | 'purple' | 'dark';
  rotation: number;
  icon?: LucideIcon;
  label: string;
  className?: string;
  children?: React.ReactNode;
}

export default function FloatingCard({
  color,
  rotation,
  icon: Icon,
  label,
  className = '',
  children
}: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = useTheme();

  const lightColorClasses = {
    blue: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-400 text-white',
    purple: 'bg-gradient-to-r from-indigo-300 to-purple-300 text-gray-800',
    dark: 'bg-gradient-to-r from-slate-800 to-slate-700 text-orange-400'
  };

  const darkColorClasses = {
    blue: 'bg-gradient-to-r from-blue-700 to-blue-600 text-white',
    orange: 'bg-gradient-to-r from-orange-600 to-orange-500 text-white',
    purple: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white',
    dark: 'bg-gradient-to-r from-slate-700 to-slate-600 text-orange-300'
  };

  const colorClasses = isDark ? darkColorClasses : lightColorClasses;

  return (
    <motion.div
      className={`rounded-full px-8 py-4 flex items-center gap-3 cursor-pointer ${colorClasses[color]} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: isDark 
          ? '0 20px 40px -15px rgba(0,0,0,0.4), 0 10px 20px -10px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)'
          : '0 20px 40px -15px rgba(0,0,0,0.15), 0 10px 20px -10px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.5)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.08,
        y: -2,
        filter: 'brightness(1.05)',
        transition: { duration: 0.4, type: 'spring', stiffness: 400, damping: 30 }
      }}
      transition={{ 
        duration: 0.4, 
        type: 'spring', 
        stiffness: 400, 
        damping: 30 
      }}
    >
      {Icon && (
        <motion.div
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
        </motion.div>
      )}
      {children || (
        <motion.span
          className="font-semibold text-lg tracking-wide"
          animate={{ 
            letterSpacing: isHovered ? '0.05em' : '0em',
          }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}