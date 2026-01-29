import logoImage from '@/assets/logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32',
  };

  return (
    <img 
      src={logoImage} 
      alt="Phoenix Solutions - Let's Shine Together" 
      className={`${sizes[size]} w-auto object-contain`}
    />
  );
}
