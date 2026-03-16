import React from 'react';

const colors = {
  primary: '#FF4500',   // Orange
  secondary: '#1A1A1A', // Dark
  bg: '#F8F9FA',
  accent: '#E5E7EB'
};

export const RegistrationSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="100" y="80" width="200" height="140" rx="12" fill="white" stroke={colors.secondary} strokeWidth="2" />
    <path d="M120 110H280M120 135H280M120 160H220" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" />
    <circle cx="260" cy="180" r="25" fill={colors.primary} />
    <path d="M250 180H270M260 170V190" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M100 220C100 200 150 200 150 220" fill={colors.accent} opacity="0.4" />
  </svg>
);

export const LicensesSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="120" y="60" width="160" height="180" rx="10" fill="white" stroke={colors.secondary} strokeWidth="2" />
    <circle cx="200" cy="110" r="30" fill={colors.primary} />
    <path d="M185 110L195 120L215 100" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="140" y="160" width="120" height="6" rx="3" fill={colors.accent} />
    <rect x="140" y="180" width="120" height="6" rx="3" fill={colors.accent} />
    <rect x="140" y="200" width="80" height="6" rx="3" fill={colors.accent} />
  </svg>
);

export const TaxSetupSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="100" y="70" width="200" height="160" rx="12" fill="white" stroke={colors.secondary} strokeWidth="2" />
    <path d="M130 110H270M130 140H270M130 170H200" stroke={colors.primary} strokeWidth="3" opacity="0.2" />
    <rect x="220" y="160" width="50" height="40" rx="6" fill={colors.primary} />
    <text x="235" y="188" fill="white" fontSize="16" fontWeight="bold">ITR</text>
    <circle cx="150" cy="190" r="10" fill={colors.secondary} />
    <circle cx="180" cy="190" r="10" fill={colors.secondary} opacity="0.6" />
  </svg>
);

export const LegalSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M200 60V240M120 150H280" stroke={colors.secondary} strokeWidth="4" strokeLinecap="round" />
    <circle cx="200" cy="90" r="25" stroke={colors.primary} strokeWidth="4" />
    <rect x="140" y="200" width="120" height="15" rx="5" fill={colors.primary} />
    <path d="M160 140Q200 100 240 140" stroke={colors.secondary} strokeWidth="2" strokeDasharray="4 4" />
  </svg>
);

export const PayrollSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="100" cy="120" r="20" fill={colors.secondary} />
    <rect x="80" y="150" width="40" height="60" rx="5" fill={colors.secondary} opacity="0.3" />
    
    <circle cx="200" cy="120" r="20" fill={colors.primary} />
    <rect x="180" y="150" width="40" height="60" rx="5" fill={colors.primary} opacity="0.6" />
    
    <circle cx="300" cy="120" r="20" fill={colors.secondary} />
    <rect x="280" y="150" width="40" height="60" rx="5" fill={colors.secondary} opacity="0.3" />
    
    <path d="M120 180H180M220 180H280" stroke={colors.accent} strokeWidth="2" />
  </svg>
);

export const GrowthSVG = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M80 220L150 150L220 180L320 80" stroke={colors.primary} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M320 80H270M320 80V130" stroke={colors.secondary} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="80" cy="220" r="8" fill={colors.secondary} />
    <circle cx="150" cy="150" r="8" fill={colors.secondary} />
    <circle cx="220" cy="180" r="8" fill={colors.secondary} />
    <circle cx="320" cy="80" r="12" fill={colors.primary} />
  </svg>
);
