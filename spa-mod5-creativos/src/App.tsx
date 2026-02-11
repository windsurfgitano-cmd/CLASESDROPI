import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './styles.css';

function Particles() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={300} array={new Float32Array(Array.from({ length: 900 }, () => (Math.random() - 0.5) * 14))} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ff6bca" size={0.035} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function useScrollAnimations(ref: React.RefObject<HTMLDivElement>) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.utils.toArray<HTMLElement>('.lesson-section').forEach((sec) => {
        gsap.from(sec, { scrollTrigger: { trigger: sec, start: 'top 85%' }, y: 30, opacity: 0, duration: 0.6 });
      });
      gsap.utils.toArray<HTMLElement>('.step-card').forEach((card, i) => {
        gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 90%' }, x: i % 2 === 0 ? -30 : 30, opacity: 0, duration: 0.5 });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}

function CheckItem({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  return (
    <li>
      <span className={`check-box ${checked ? 'checked' : ''}`} onClick={() => setChecked(!checked)} />
      <span style={{ textDecoration: checked ? 'line-through' : 'none', opacity: checked ? 0.5 : 1 }}>{children}</span>
    </li>
  );
}

function QuizCard({ question, answer }: { question: string; answer: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="quiz-card" onClick={() => setShow(!show)}>
      <h4>{question}</h4>
      <p className={`answer ${show ? 'show' : ''}`}>{answer}</p>
    </div>
  );
}

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollAnimations(rootRef);

  return (
    <div ref={rootRef} className="lesson">

      <header className="hero">
        <div className="hero-canvas-bg">
          <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
            <ambientLight intensity={0.6} />
            <Particles />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>
        <div className="hero-content">
          <p className="eyebrow">Módulo 5 · Creativos que Venden</p>
          <h1 className="hero-title">Tu creativo listo<br />en 55 minutos</h1>
          <p className="hero-sub">Un buen creativo es la diferencia entre que alguien se detenga a mirar o siga de largo. Hoy van a hacer uno que PARE a la gente.</p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => document.getElementById('s1')?.scrollIntoView({ behavior: 'smooth' })}>Empezar clase</button>
            <button className="btn" onClick={() => document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth' })}>Ir al checklist</button>
          </div>
        </div>
      </header>

      {/* ===== Bloque 1: Estructura de video ganador ===== */}
      <section className="lesson-section" id="s1">
        <span className="section-number">Bloque 1</span>
        <h2 className="section-title">Estructura de un video ganador</h2>
        <p className="section-sub">Los 4 ingredientes que todo video que vende tiene. 10 minutos.</p>

        <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80" alt="Producción de video" className="section-img" />

        <div className="explain">
          Todo video que vende tiene <strong>4 partes</strong>. Así de simple:<br /><br />
          1. <strong>Hook</strong> — los primeros 1 a 3 segundos. Es la portada del libro. Si no atrapa, la gente se va.<br />
          2. <strong>Dolor o prueba social</strong> — mostrar el problema o que otros ya lo resolvieron.<br />
          3. <strong>Solución</strong> — su producto resuelve eso.<br />
          4. <strong>CTA</strong> — decirle a la persona qué hacer: "Pide ahora", "Paga al recibir".
        </div>

        <div className="analogy">
          El creativo es la vitrina de la tienda. Si la vitrina es fea, nadie entra. Si la vitrina atrapa, la gente se detiene.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-body">
              <h4>Buenos vs malos hooks</h4>
              <p>Mal hook: "Hola, les presento nuestro producto..." Buen hook: "¿Sabías que el 80% de las personas pagan más por esto sin saberlo?" — ¿Cuál les haría detenerse?</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Interacción</h4>
          <p>Les muestro dos hooks en pantalla. Díganme en voz alta cuál les atrapa y por qué.</p>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Estructura de un video</strong> — Los 4 ingredientes en acción (4K). Mastermind/MÓDULO 5/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Búsqueda de Videos</strong> — Dónde encontrar inspiración (4K). Mastermind/MÓDULO 5/</div>
        </div>

        <div className="yt-embed">
          <iframe src="https://www.youtube.com/embed/n1dBSmNslOA" title="AIDA Copywriting" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="yt-embed-label">YouTube: Fórmula AIDA para anuncios que venden</p>
      </section>

      {/* ===== Bloque 2: Guion AIDA ===== */}
      <section className="lesson-section" id="s2">
        <span className="section-number">Bloque 2</span>
        <h2 className="section-title">Guion AIDA en 6 líneas</h2>
        <p className="section-sub">Una fórmula vieja que funciona siempre. 10 minutos.</p>

        <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80" alt="Escritura creativa" className="section-img" />

        <div className="explain">
          <strong>AIDA</strong> es una fórmula probada:<br /><br />
          <strong>A</strong>tención — el hook.<br />
          <strong>I</strong>nterés — el problema o dato que engancha.<br />
          <strong>D</strong>eseo — la solución (su producto).<br />
          <strong>A</strong>cción — el CTA.<br /><br />
          En 6 líneas cortas tienen un guion completo.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-body">
              <h4>Escribir el guion</h4>
              <p>Abran notas en su PC. Escriban 6 líneas: 1) Hook, 2) Problema, 3) Dato/prueba social, 4) Solución con su producto, 5) Beneficio clave, 6) CTA.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra — 5 minutos (cronómetro)</h4>
          <ul>
            <li>Escriban su guion AIDA de 6 líneas.</li>
            <li>La nieta: que sea atrevida y directa.</li>
            <li>La abuela: que sea clara y confiable.</li>
            <li>Después léanme solo la primera línea (el hook).</li>
          </ul>
        </div>
      </section>

      {/* ===== Bloque 3: Storyboard + Grabado ===== */}
      <section className="lesson-section" id="s3">
        <span className="section-number">Bloque 3</span>
        <h2 className="section-title">Storyboard + Grabado exprés</h2>
        <p className="section-sub">Convertir el guion en 3 escenas y grabar un clip corto. 15 minutos.</p>

        <img src="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=900&q=80" alt="Storyboard" className="section-img" />

        <div className="explain">
          Piensen en <strong>3 cajitas</strong>:<br /><br />
          <strong>Cajita 1:</strong> Hook + problema (lo que se ve y se dice en los primeros 3 segundos).<br />
          <strong>Cajita 2:</strong> Solución + prueba (mostrar el producto en acción o un testimonio).<br />
          <strong>Cajita 3:</strong> CTA + cierre (decir qué hacer y logo/marca de agua).<br /><br />
          No tiene que ser bonito. Pueden dibujar palitos. Lo importante es que sepan qué pasa en cada escena.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-body">
              <h4>Dibujar 3 escenas</h4>
              <p>En papel o digital, dibujen 3 cajas y escriban qué se ve y qué se dice en cada una. 5 minutos.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-body">
              <h4>Grabar clip exprés</h4>
              <p>Graben con celular o narración de pantalla. 30 segundos máximo. No tiene que ser perfecto, tiene que existir. Usen su guion.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Dibujen su storyboard de 3 escenas (5 min).</li>
            <li>Graben un clip corto usando su guion (5 min).</li>
            <li>Si no quieren aparecer, pueden narrar sobre una imagen del producto.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Creación de videos</strong> — Desde cero a video terminado. Mastermind/MÓDULO 5/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Crea tus plantillas de creativo</strong> — Plantillas reutilizables. Mastermind/MÓDULO 5/</div>
        </div>
      </section>

      {/* ===== Bloque 4: Marca de agua + Poll ===== */}
      <section className="lesson-section" id="s4">
        <span className="section-number">Bloque 4</span>
        <h2 className="section-title">Marca de agua + Poll del mejor hook</h2>
        <p className="section-sub">Firmar su creativo y competir por el mejor hook. 10 minutos.</p>

        <div className="explain">
          Toda pieza que sale de acá lleva su marca. Es como <strong>firmar un cuadro</strong>. Abran Canva o el editor que prefieran, pongan su logo en una esquina y el CTA como texto final.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">5</div>
            <div className="step-body">
              <h4>Añadir logo y CTA final</h4>
              <p>En Canva o editor de video: logo en una esquina + texto CTA al final del clip.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">6</div>
            <div className="step-body">
              <h4>Poll del mejor hook</h4>
              <p>Cada una lee su hook en voz alta. Votamos cuál pararía a alguien que está scrolleando. La ganadora muestra su pantalla 2 minutos.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Añadan marca de agua y CTA a su clip.</li>
            <li>Lean su hook en voz alta. ¡Vamos a votar!</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>marca de agua</strong> — Cómo firmar tu creativo. Mastermind/MÓDULO 5/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Segmentación desde Creativo</strong> — Crear públicos desde el creativo. Mastermind/MÓDULO 5/</div>
        </div>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="lesson-section" id="checklist">
        <span className="section-number">Verificación</span>
        <h2 className="section-title">Checklist final</h2>
        <p className="section-sub">Todo marcado = listas para lanzar con este creativo en el módulo 6.</p>

        <img src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=900&q=80" alt="Branding creativo" className="section-img" />

        <ul className="checklist">
          <CheckItem>Hook escrito y probado en la poll</CheckItem>
          <CheckItem>Guion AIDA completo (6 líneas)</CheckItem>
          <CheckItem>Storyboard de 3 escenas dibujado</CheckItem>
          <CheckItem>Video/clip grabado (aunque sea básico)</CheckItem>
          <CheckItem>Marca de agua + CTA añadidos al clip</CheckItem>
        </ul>
      </section>

      {/* ===== QUIZ ===== */}
      <section className="lesson-section" id="quiz">
        <span className="section-number">Quiz rápido</span>
        <h2 className="section-title">¿Quedó claro?</h2>
        <p className="section-sub">Toca cada pregunta para ver la respuesta.</p>

        <QuizCard question="¿Qué hace un hook?" answer="Captar la atención en los primeros 1 a 3 segundos. Sin hook, la gente sigue scrolleando." />
        <QuizCard question="¿Dónde va la prueba social en el guion AIDA?" answer="En la línea 3 — el dato o testimonio que genera confianza." />
        <QuizCard question="¿Qué CTA usarían si venden contraentrega?" answer="'Pide hoy, paga al recibir' o similar. Que quede claro que no hay riesgo." />
      </section>

      {/* ===== CIERRE ===== */}
      <div className="closing">
        <h2 className="closing-title">Tienen un creativo listo</h2>
        <p className="closing-text">
          Guion, storyboard y clip con marca. Esto es más de lo que el 90% hace antes de lanzar un anuncio. La clave es replicar: cambien el hook, prueben otro dolor, mantengan la estructura.
        </p>
        <div className="closing-quote">
          "El secreto no es hacer UN video perfecto. Es hacer muchos videos buenos con la misma estructura y probar cuál gana."
        </div>
      </div>
    </div>
  );
}

export default App;
