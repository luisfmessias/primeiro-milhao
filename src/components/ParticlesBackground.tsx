"use client"

import Particles, { initParticlesEngine } from "@tsparticles/react"
import { useEffect, useState } from "react"
import { loadSlim } from "@tsparticles/slim"

export default function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine) // carrega versão leve
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "transparent", 
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", 
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: { value: "#16F96A" },
          links: {
            enable: false, 
          },
          move: {
            enable: true,
            speed: 1, 
            direction: "none",
            outModes: { default: "bounce" },
          },
          number: {
            value: 20, 
            density: { enable: true, area: 800 },
          },
          opacity: { value: 0.6 },
          shape: { type: "circle" },
          size: { value: { min: 2, max: 4 } },
        },
        detectRetina: true,
      }}
    />
  )
}
