import React from 'react';

const colors = {
  primary: '#FF4500',   // Corporate Orange
  secondary: '#1A1A1A', // Dark Grey/Black
  bg: '#F8F9FA',        // Light Background for icons
  accent: '#E5E7EB'      // Muted Grey for UI elements
};

export const ConfidentialitySVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[280px]">
    <path d="M40 240H360" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
    {/* Desk */}
    <rect x="110" y="170" width="180" height="12" rx="6" fill={colors.accent} />
    <rect x="125" y="182" width="8" height="58" fill={colors.accent} />
    <rect x="267" y="182" width="8" height="58" fill={colors.accent} />
    
    {/* Person 1 (Sitting) */}
    <circle cx="160" cy="115" r="14" fill={colors.secondary} />
    <path d="M135 170C135 140 185 140 185 170H135Z" fill={colors.secondary} />
    
    {/* Person 2 (Standing) */}
    <circle cx="280" cy="95" r="15" fill={colors.secondary} />
    <path d="M255 180L270 115H290L305 180H255Z" fill={colors.secondary} />
    
    {/* Desktop/Computer */}
    <rect x="175" y="140" width="40" height="25" rx="2" fill="white" stroke={colors.secondary} strokeWidth="1.5" />
    <path d="M190 165V170H200V165" stroke={colors.secondary} strokeWidth="1.5" />
    
    {/* Papers */}
    <rect x="225" y="145" width="18" height="24" rx="2" fill="white" stroke={colors.secondary} strokeWidth="1" />
    <rect x="235" y="135" width="18" height="24" rx="2" fill={colors.primary} />
  </svg>
);

export const QuickResponseSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[280px]">
    {/* Large Central Phone */}
    <rect x="145" y="40" width="110" height="220" rx="20" stroke={colors.secondary} strokeWidth="3" />
    <rect x="155" y="55" width="90" height="190" rx="12" fill={colors.bg} />
    <rect x="185" y="48" width="30" height="4" rx="2" fill={colors.secondary} />
    
    {/* Person (Small Standing) */}
    <circle cx="100" cy="200" r="12" fill={colors.secondary} />
    <path d="M85 240L95 200H105L115 240H85Z" fill={colors.secondary} />
    
    {/* Chat Bubbles */}
    <rect x="80" y="100" width="70" height="30" rx="8" fill={colors.primary} />
    <path d="M140 130L150 140V130H140Z" fill={colors.primary} />
    
    <rect x="230" y="140" width="90" height="30" rx="8" fill={colors.secondary} />
    <path d="M240 170L230 180V170H240Z" fill={colors.secondary} />
    
    <rect x="240" y="70" width="50" height="25" rx="8" stroke={colors.accent} strokeWidth="2" fill="white" />
    <path d="M190 210H210" stroke={colors.primary} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const ConvenientComplianceSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[280px]">
    {/* UI Elements / Sliders */}
    <g opacity="0.8">
      <rect x="80" y="90" width="180" height="10" rx="5" fill={colors.accent} />
      <circle cx="120" cy="95" r="8" fill={colors.primary} />
      
      <rect x="80" y="130" width="180" height="10" rx="5" fill={colors.accent} />
      <circle cx="180" cy="135" r="8" fill={colors.primary} />
      
      <rect x="80" y="170" width="180" height="10" rx="5" fill={colors.accent} />
      <circle cx="240" cy="175" r="8" fill={colors.primary} />
    </g>
    
    {/* Person */}
    <circle cx="310" cy="120" r="18" fill={colors.secondary} />
    <path d="M285 240V180C285 150 335 150 335 180V240H285Z" fill={colors.secondary} />
    <path d="M300 240V260" stroke={colors.secondary} strokeWidth="8" strokeLinecap="round" />
    <path d="M320 240V260" stroke={colors.secondary} strokeWidth="8" strokeLinecap="round" />
    
    {/* Background Shapes */}
    <path d="M60 220C60 180 140 180 140 220" fill={colors.bg} />
  </svg>
);

export const ExpertiseSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[280px]">
    {/* Centered Large Card */}
    <rect x="145" y="55" width="110" height="150" rx="10" fill="white" stroke={colors.accent} strokeWidth="2" />
    <circle cx="200" cy="100" r="22" fill={colors.secondary} />
    <path d="M175 160C175 140 225 140 225 160V160" fill={colors.secondary} />
    <rect x="175" y="170" width="50" height="4" rx="2" fill={colors.primary} />

    {/* Side Cards */}
    <rect x="65" y="90" width="90" height="120" rx="10" fill="white" stroke={colors.accent} strokeWidth="1" />
    <circle cx="110" cy="125" r="18" fill={colors.secondary} opacity="0.4" />
    <path d="M90 175C90 160 130 160 130 175" fill={colors.secondary} opacity="0.4" />

    <rect x="245" y="90" width="90" height="120" rx="10" fill="white" stroke={colors.accent} strokeWidth="1" />
    <circle cx="290" cy="125" r="18" fill={colors.primary} opacity="0.4" />
    <path d="M270 175C270 160 310 160 310 175" fill={colors.primary} opacity="0.4" />
  </svg>
);

export const AffordableSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[280px]">
    {/* Smartphone with Stats */}
    <rect x="160" y="40" width="80" height="160" rx="16" stroke={colors.secondary} strokeWidth="2" />
    <rect x="168" y="52" width="64" height="136" rx="8" fill={colors.bg} />
    <path d="M175 140L190 120L205 130L220 100" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="185" cy="165" r="12" fill={colors.primary} />
    <path d="M185 165V158M185 165V172M185 165H178M185 165H192" stroke="white" strokeWidth="2" />

    {/* Person standing */}
    <circle cx="280" cy="180" r="14" fill={colors.secondary} />
    <path d="M260 250V195C260 185 300 185 300 195V250H260Z" fill={colors.secondary} />
    
    {/* Abstract background bars */}
    <rect x="80" y="180" width="40" height="4" rx="2" fill={colors.accent} />
    <rect x="80" y="195" width="25" height="4" rx="2" fill={colors.accent} opacity="0.5" />
  </svg>
);

export const PersonalizedSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[280px]">
    {/* Two people collaborating */}
    <circle cx="100" cy="140" r="16" fill={colors.primary} />
    <path d="M75 220C75 180 125 180 125 220V220" fill={colors.primary} />
    
    <circle cx="300" cy="140" r="16" fill={colors.secondary} />
    <path d="M275 220C275 180 325 180 325 220V220" fill={colors.secondary} />

    {/* Connecting elements */}
    <path d="M140 180Q200 120 260 180" stroke={colors.secondary} strokeWidth="2" strokeDasharray="4 6" />
    <circle cx="200" cy="145" r="10" fill={colors.primary} />
    <path d="M195 145H205M200 140V150" stroke="white" strokeWidth="2" />
    
    <g opacity="0.3">
      <rect x="180" y="200" width="40" height="6" rx="3" fill={colors.accent} />
      <rect x="185" y="215" width="30" height="6" rx="3" fill={colors.accent} />
    </g>
  </svg>
);
