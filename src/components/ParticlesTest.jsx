import React, { useCallback } from 'react';
import { Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesTest = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesConfig = {
    fullScreen: {
      enable: true,
      zIndex: 1,
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        enable: true,
        color: "#ffffff",
        distance: 150,
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },
      number: {
        value: 50,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <Particles
        id="tsparticles-test"
        init={particlesInit}
        options={particlesConfig}
      />
    </div>
  );
};

export default ParticlesTest; 