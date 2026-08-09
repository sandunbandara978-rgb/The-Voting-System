import React from 'react';
import { Compass, Phone, Flower2, Container, Home, Trophy, CheckCircle2 } from 'lucide-react';

interface PartySymbolBadgeProps {
  symbolSvg: string;
  partyCode: string;
  partyColor: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PartySymbolBadge: React.FC<PartySymbolBadgeProps> = ({ symbolSvg, partyCode, partyColor, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-12 h-12 p-2.5',
    lg: 'w-16 h-16 p-3.5'
  }[size];

  const iconSize = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  }[size];

  const renderSymbol = () => {
    switch (symbolSvg.toLowerCase()) {
      case 'compass':
        return <Compass className={iconSize} />;
      case 'phone':
        return <Phone className={iconSize} />;
      case 'flower':
        return <Flower2 className={iconSize} />;
      case 'cylinder':
        return <Container className={iconSize} />;
      case 'home':
        return <Home className={iconSize} />;
      case 'trophy':
        return <Trophy className={iconSize} />;
      default:
        return <CheckCircle2 className={iconSize} />;
    }
  };

  return (
    <div
      className={`${sizeClasses} rounded-xl flex items-center justify-center shadow-md border border-white/20 transition-transform`}
      style={{ backgroundColor: partyColor, color: '#FFFFFF' }}
      title={`${partyCode} Symbol`}
    >
      {renderSymbol()}
    </div>
  );
};
