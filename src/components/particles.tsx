'use client';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { LOGO_PATH } from '@/lib/vk-logo-path';

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  scatteredColor: string;
  life: number;
  isYourLogo: boolean;
};

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!(canvas && ctx)) {
      return;
    }

    let particles: Particle[] = [];
    let textImageData: ImageData | null = null;
    let animationFrameId: number;

    const updateCanvasSize = () => {
      canvas.width = isMobile ? 400 : 800;
      canvas.height = isMobile ? 300 : 600;
      setIsMobile(window.innerWidth < 768);
    };

    const createTextImage = () => {
      const isDark = theme === 'dark';
      ctx.fillStyle = isDark ? 'white' : 'black';
      ctx.save();

      // Calculate optimal logo size to fit canvas with padding
      const padding = 40; // Minimum padding around logo
      const availableWidth = canvas.width - padding * 2;
      const availableHeight = canvas.height - padding * 2;

      // Calculate scale to fit within available space
      const scaleByWidth = availableWidth / 100;
      const scaleByHeight = availableHeight / 56;
      const optimalScale = Math.min(scaleByWidth, scaleByHeight);

      // Calculate final logo dimensions
      const logoWidth = 100 * optimalScale;
      const logoHeight = 56 * optimalScale;

      // Center the logo perfectly
      ctx.translate(
        canvas.width / 2 - logoWidth / 2,
        canvas.height / 2 - logoHeight / 2
      );

      ctx.scale(optimalScale, optimalScale);
      ctx.fill(new Path2D(LOGO_PATH));
      ctx.restore();

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const createParticle = (): Particle | null => {
      if (!textImageData) {
        return null;
      }

      const data = textImageData.data;

      for (let attempt = 0; attempt < 200; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const particleSize = isMobile
            ? Math.random() * 0.8 + 0.4 // Mobile
            : Math.random() * 1.5 + 0.8; // Desktop

          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: particleSize,
            color: theme === 'dark' ? 'white' : 'black',
            scatteredColor: '#FF6B6B',
            isYourLogo: true,
            life: Math.random() * 100 + 50,
          };
        }
      }
      return null;
    };

    const getParticleCount = () => {
      // PARTICLE DENSITY SETTING
      const baseParticleCount = 30_000;
      return Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      );
    };

    const createInitialParticles = () => {
      const particleCount = getParticleCount();
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        if (particle) {
          particles.push(particle);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = theme === 'dark' ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;

      // INTERACTION EFFECT SETTINGS
      const maxDistance = isMobile
        ? canvas.width * 0.25 // Mobile
        : canvas.width * 0.35; // Desktop
      const forceMultiplier = isMobile
        ? 80 // Mobile
        : 120; // Desktop

      const isInteracting =
        isTouchingRef.current || !('ontouchstart' in window);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (
          distance < maxDistance &&
          isInteracting &&
          mouseX > 0 &&
          mouseY > 0
        ) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * forceMultiplier;
          const moveY = Math.sin(angle) * force * forceMultiplier;
          p.x = p.baseX - moveX;
          p.y = p.baseY - moveY;
          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = p.color;
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (--p.life <= 0) {
          const newParticle = createParticle();
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
          }
        }
      }

      const targetCount = getParticleCount();
      while (particles.length < targetCount) {
        const newParticle = createParticle();
        if (newParticle) {
          particles.push(newParticle);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      updateCanvasSize();
      createTextImage();
      particles = [];
      createInitialParticles();
    };

    const getRelativeMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const handleMove = (clientX: number, clientY: number) => {
      mousePositionRef.current = getRelativeMousePosition(clientX, clientY);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = () => {
      isTouchingRef.current = true;
    };
    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      mousePositionRef.current = { x: 0, y: 0 };
    };

    const handleMouseLeave = () => {
      if (!('ontouchstart' in window)) {
        mousePositionRef.current = { x: 0, y: 0 };
      }
    };

    updateCanvasSize();
    createTextImage();
    createInitialParticles();
    animate();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, theme]);

  return (
    <canvas
      aria-label="Interactive particle effect with VK logo"
      className="h-full w-full touch-none"
      ref={canvasRef}
    />
  );
}
