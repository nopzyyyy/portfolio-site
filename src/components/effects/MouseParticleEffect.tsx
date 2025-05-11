import React, { useEffect, useRef } from 'react';
import { useThemeStore } from '../../stores/themeStore';

const MouseParticleEffect: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const effectRef = useRef<boolean>(true);
  
  useEffect(() => {
    let particles: HTMLDivElement[] = [];
    let mouseX = 0;
    let mouseY = 0;
    
    const createParticle = () => {
      if (!effectRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Randomize size
      const size = Math.random() * 30 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Set position to mouse position
      particle.style.left = `${mouseX}px`;
      particle.style.top = `${mouseY}px`;
      
      // Set color based on theme
      if (isDarkMode) {
        particle.style.background = `radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0) 70%)`;
      } else {
        particle.style.background = `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)`;
      }
      
      // Add to document
      document.body.appendChild(particle);
      particles.push(particle);
      
      // Animate and then remove
      setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => {
          if (particle.parentNode) {
            document.body.removeChild(particle);
            particles = particles.filter(p => p !== particle);
          }
        }, 500);
      }, 200);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create particle with throttling
      if (Math.random() < 0.2) {
        createParticle();
      }
    };
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        if (particle.parentNode) {
          document.body.removeChild(particle);
        }
      });
      effectRef.current = false;
    };
  }, [isDarkMode]);
  
  return null;
};

export default MouseParticleEffect;