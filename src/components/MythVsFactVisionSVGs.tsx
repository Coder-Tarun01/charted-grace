import React from 'react';

const colors = {
  primary: '#FF4500',   // Orange
  secondary: '#0F172A', // Navy
  muted: '#94A3B8',
  accent: '#E2E8F0'
};

export const GrowthBlueprintSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="50" y="50" width="300" height="200" rx="8" fill="white" stroke={colors.accent} strokeWidth="2" strokeDasharray="4 4" />
    <path d="M50 200L150 150L250 180L350 80" stroke={colors.primary} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="200" r="6" fill={colors.secondary} />
    <circle cx="150" cy="150" r="6" fill={colors.secondary} />
    <circle cx="250" cy="180" r="6" fill={colors.secondary} />
    <circle cx="350" cy="80" r="6" fill={colors.primary} />
    <text x="300" y="240" fill={colors.muted} fontSize="12" fontWeight="bold">SCALABILITY</text>
  </svg>
);

export const TrustProtocolSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="100" y="60" width="200" height="180" rx="12" fill="white" stroke={colors.secondary} strokeWidth="2" />
    <circle cx="200" cy="150" r="50" fill={colors.primary} opacity="0.05" />
    <path d="M170 150L190 170L230 130" stroke={colors.primary} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M140 210H260" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" />
    <path d="M140 90H260" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const ComplianceEngineSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <circle cx="200" cy="150" r="70" stroke={colors.accent} strokeWidth="2" strokeDasharray="5 5" />
    <circle cx="200" cy="150" r="40" fill={colors.primary} />
    <rect x="180" y="50" width="40" height="20" rx="4" fill={colors.secondary} />
    <rect x="180" y="230" width="40" height="20" rx="4" fill={colors.secondary} />
    <rect x="50" y="130" width="20" height="40" rx="4" fill={colors.secondary} />
    <rect x="330" y="130" width="20" height="40" rx="4" fill={colors.secondary} />
    <path d="M200 150L240 110" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const StrategicOptimizationSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <path d="M50 250H350V50H50V250Z" stroke={colors.accent} strokeWidth="2" strokeDasharray="8 8" />
    <path d="M100 200Q200 180 300 100" stroke={colors.primary} strokeWidth="8" strokeLinecap="round" />
    <circle cx="200" cy="180" r="4" fill={colors.secondary} />
    <circle cx="150" cy="190" r="4" fill={colors.secondary} />
    <circle cx="250" cy="140" r="4" fill={colors.secondary} />
  </svg>
);
