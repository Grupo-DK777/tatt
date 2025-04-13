export const particlesConfig = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  background: {
    color: '#0B001E',
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 1200,
      },
    },
    color: {
      value: ['#aa00ff', '#00ffee', '#ff00aa'],
    },
    shape: {
      type: ['circle', 'triangle', 'edge', 'polygon'] as unknown as string[], // ← solución aquí
    },
    opacity: {
      value: 0.5,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1,
        sync: false,
      },
    },
    size: {
      value: {
        min: 1,
        max: 4,
      },
      random: true,
      animation: {
        enable: true,
        speed: 5,
        minimumValue: 0.3,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 130,
      color: '#ffffff',
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'none' as const,
      random: false,
      straight: false,
      outModes: {
        default: 'bounce' as const, // ← también se puede anotar como constante
      },
      attract: {
        enable: false,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ['grab', 'bubble'] as unknown as string[], // ← solución aquí
      },
      onClick: {
        enable: true,
        mode: 'repulse' as const,
      },
    },
    modes: {
      grab: {
        distance: 150,
        links: {
          opacity: 0.4,
        },
      },
      bubble: {
        distance: 150,
        size: 8,
        duration: 2,
        opacity: 0.8,
      },
      repulse: {
        distance: 200,
        duration: 0.5,
      },
    },
  },
  detectRetina: true,
  fpsLimit: 120,
};
