import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles.css';

function Particles() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={new Float32Array(Array.from({ length: 600 }, () => (Math.random() - 0.5) * 10))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#6bd5ff" size={0.04} sizeAttenuation />
    </points>
  );
}

function useHeroAnimation(ref: React.RefObject<HTMLDivElement>) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' });
      gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 0.6, delay: 0.1 });
      gsap.from('.section', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, delay: 0.2 });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useHeroAnimation(rootRef);

  return (
    <div ref={rootRef} className="page">
      <header className="hero">
        <div className="hero-text">
          <p className="eyebrow">Mastermind · SPA Template</p>
          <h1 className="hero-title">Promesa clara y CTA visible</h1>
          <p className="hero-sub">Listo para adaptar por módulo: hero, agenda, demo, tareas, checklist, quiz.</p>
          <div className="cta-row">
            <button className="btn primary">CTA en vivo</button>
            <button className="btn ghost">Ver agenda</button>
          </div>
        </div>
        <div className="hero-canvas">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={1} />
            <Particles />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
          </Canvas>
        </div>
      </header>

      <main className="content">
        <section className="section">
          <h2>Agenda rápida</h2>
          <ul>
            <li>Hero/Promesa</li>
            <li>Demo guiada</li>
            <li>Manos a la obra</li>
            <li>Checklist</li>
            <li>Quiz/Reto</li>
          </ul>
        </section>

        <section className="section grid">
          <div>
            <h3>Demo guiada</h3>
            <p>Pon aquí los bloques con tiempos y pasos concretos.</p>
          </div>
          <div>
            <h3>Manos a la obra</h3>
            <p>Tareas para que ellas ejecuten en sus PCs, con checkboxes visibles.</p>
          </div>
          <div>
            <h3>Checklist</h3>
            <p>Lista de verificación final para validar avance.</p>
          </div>
          <div>
            <h3>Quiz/Reto</h3>
            <p>3 preguntas o reto express para reforzar.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
