'use client';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LOGO_PATH } from '@/lib/vk-logo-path';
import ContactForm from './contact-form';
import { Button, buttonVariants } from './ui/button';

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return;
    }
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768); // Set mobile breakpoint
    };
    updateCanvasSize();
    let particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      scatteredColor: string;
      life: number;
      isYourLogo: boolean;
    }[] = [];
    let textImageData: ImageData | null = null;
    function createTextImage() {
      if (!(ctx && canvas)) {
        return 0;
      }
      ctx.fillStyle = 'white';
      ctx.save();

      // Responsive logo sizing based on screen width
      const logoHeight = isMobile
        ? Math.min(canvas.width * 0.55, 180) // 55% of screen width, max 180px
        : 220; // Increased desktop size from 180 to 220

      const yourLogoWidth = logoHeight * (100 / 56); // Your logo aspect ratio (100/56 from viewBox)

      // Position logo higher on mobile to avoid text overlap
      const verticalOffset = isMobile ? -80 : -20; // Move higher on both mobile and desktop

      ctx.translate(
        canvas.width / 2 - yourLogoWidth / 2,
        canvas.height / 2 - logoHeight / 2 + verticalOffset
      );

      // Draw your logo
      ctx.save();
      const yourLogoScale = logoHeight / 56; // Scale based on your logo's height (56 from viewBox)
      ctx.scale(yourLogoScale, yourLogoScale);
      const path = new Path2D(LOGO_PATH);
      ctx.fill(path);
      ctx.restore();
      ctx.restore();
      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return yourLogoScale;
    }
    function createParticle() {
      if (!(ctx && canvas && textImageData)) {
        return null;
      }
      const data = textImageData.data;
      // const particleGap = 2;
      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: 'white',
            scatteredColor: '#FF6B6B', // Single color for your logo
            isYourLogo: true,
            life: Math.random() * 100 + 50,
          };
        }
      }
      return null;
    }
    function createInitialParticles() {
      if (!canvas) {
        return;
      }
      const baseParticleCount = 7000; // Increased base count for higher density
      const particleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      );
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        if (particle) {
          particles.push(particle);
        }
      }
    }
    let animationFrameId: number;
    function animate() {
      if (!(ctx && canvas)) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'oklch(0.145 0 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 240;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (
          distance < maxDistance &&
          (isTouchingRef.current || !('ontouchstart' in window))
        ) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 60;
          const moveY = Math.sin(angle) * force * 60;
          p.x = p.baseX - moveX;
          p.y = p.baseY - moveY;
          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = 'white';
        }
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle();
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }
      const baseParticleCount = 7000;
      const targetParticleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      );
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle();
        if (newParticle) {
          particles.push(newParticle);
        }
      }
      animationFrameId = requestAnimationFrame(() => animate());
    }
    createTextImage();
    createInitialParticles();
    animate();
    const handleResize = () => {
      updateCanvasSize();
      createTextImage();
      particles = [];
      createInitialParticles();
    };
    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y };
    };
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };
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
  }, [isMobile]);
  return (
    <>
      <canvas
        aria-label="Interactive particle effect with VK logo"
        className="absolute top-0 left-0 h-full w-full touch-none"
        ref={canvasRef}
      />
      <div className="z-10 mt-auto py-8">
        <div className="mx-auto mb-8 flex items-center justify-center gap-2 text-center">
          <Suspense
            fallback={
              <span
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    size: 'default',
                    className:
                      'cursor-pointer text-[#FF6B6B] hover:text-[#FF6B6B]/80',
                  })
                )}
              >
                Contact
              </span>
            }
          >
            <ContactForm />
          </Suspense>
          <span
            aria-hidden="true"
            className="mx-2 select-none text-muted-foreground"
          >
            •
          </span>
          <Button
            asChild
            className="text-[#FF6B6B] hover:text-[#FF6B6B]/80"
            variant="ghost"
          >
            <Link href="/projects">Projects</Link>
          </Button>
        </div>

        <p className="max-w-[80ch] text-muted-foreground text-sm">
          Verkron provides expert solutions in pricing strategies, operations,
          inventory management, technical drafting, corporate branding, supply
          chain optimization, industrial product design, and software
          development. Our goal is to enhance efficiency, drive innovation, and
          support businesses in achieving operational excellence.
        </p>
      </div>
    </>
  );
}
