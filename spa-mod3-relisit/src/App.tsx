import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './styles.css';

function Particles() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={300}
          array={new Float32Array(Array.from({ length: 900 }, () => (Math.random() - 0.5) * 14))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00e5ff" size={0.035} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function useScrollAnimations(ref: React.RefObject<HTMLDivElement>) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.utils.toArray<HTMLElement>('.lesson-section').forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: { trigger: sec, start: 'top 85%' },
          y: 30, opacity: 0, duration: 0.6,
        });
      });
      gsap.utils.toArray<HTMLElement>('.step-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 90%' },
          x: i % 2 === 0 ? -30 : 30, opacity: 0, duration: 0.5,
        });
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

      {/* ===== HERO ===== */}
      <header className="hero">
        <div className="hero-canvas-bg">
          <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
            <ambientLight intensity={0.6} />
            <Particles />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>
        <div className="hero-content">
          <p className="eyebrow">Módulo 3 · RELISIT</p>
          <h1 className="hero-title">Tu RELISIT listo<br />en 40 minutos</h1>
          <p className="hero-sub">Hoy van a dejar RELISIT funcionando. Es como abrir la caja registradora de su negocio: si no la prenden, no cobran.</p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => document.getElementById('s1')?.scrollIntoView({ behavior: 'smooth' })}>Empezar clase</button>
            <button className="btn" onClick={() => document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth' })}>Ir al checklist</button>
          </div>
        </div>
      </header>

      {/* ===== SECCIÓN 1: Acceso y panel ===== */}
      <section className="lesson-section" id="s1">
        <span className="section-number">Bloque 1</span>
        <h2 className="section-title">Acceso y panel</h2>
        <p className="section-sub">Vamos a entrar a RELISIT y entender qué mide cada parte del panel. 10 minutos.</p>

        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80" alt="Panel de analytics" className="section-img" />

        <div className="explain">
          Abran su navegador, vayan a la URL de RELISIT. Pongan usuario y contraseña. Si es la primera vez, regístrense.
          <br /><br />
          Una vez adentro, van a ver el <strong>panel principal</strong>. Este panel es su tablero de mando.
        </div>

        <div className="analogy">
          El panel es como el tablero de un auto. Cada número les dice algo: pedidos nuevos, pedidos en proceso, pedidos entregados. Cada indicador es una luz del motor.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-body">
              <h4>Ingresar a RELISIT</h4>
              <p>Abran el navegador, vayan a la URL del sistema. Ingresen usuario y contraseña. Si no tienen cuenta, créenla ahora.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-body">
              <h4>Recorrido del panel</h4>
              <p>Identifiquen cada sección: pedidos nuevos, en proceso, entregados, métricas generales. No se asusten con los números, vamos uno por uno.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <p>Abran RELISIT en sus PCs y naveguen al panel principal. Cuando lo vean, levanten la mano.</p>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Instalar RELISIT y configura</strong> — Video del curso (66 min). Abre desde Mastermind/Modulo 3 RELISIT/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Tarifas por Zonas</strong> — Configuración de zonas de envío. Mastermind/Modulo 3 RELISIT/</div>
        </div>
      </section>

      {/* ===== SECCIÓN 2: Configuración básica ===== */}
      <section className="lesson-section" id="s2">
        <span className="section-number">Bloque 2</span>
        <h2 className="section-title">Configuración básica</h2>
        <p className="section-sub">Llenamos lo mínimo para que funcione: datos, validaciones y alertas. 15 minutos.</p>

        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80" alt="Configuración de formularios" className="section-img" />

        <div className="explain">
          Ahora vamos a llenar lo mínimo para que el sistema funcione. Es como llenar un formulario del banco: <strong>si falta un dato, no procesa</strong>.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-body">
              <h4>Campos obligatorios</h4>
              <p>Vayan campo por campo: nombre del negocio, datos de contacto, dirección, método de pago. Cada uno es necesario para que los pedidos se procesen correctamente.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-body">
              <h4>Validaciones y alertas</h4>
              <p>Las alertas son como la alarma del celular: si la ignoran, se les pasa algo importante. Activen las notificaciones esenciales: pedido nuevo, pago recibido, incidencia.</p>
            </div>
          </div>
        </div>

        <div className="analogy">
          Las alertas son su despertador. Si no suenan, se duermen y los pedidos se acumulan sin que se den cuenta.
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Completen todos los campos obligatorios en su panel. Pulgar arriba al terminar cada uno.</li>
            <li>Activen las alertas esenciales. Confirmen cuando estén activas.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Upsell y ofertas</strong> — Estrategias de venta extra. Mastermind/Modulo 3 RELISIT/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Mensaje de confirmación</strong> — Automatización de confirmación. Mastermind/Modulo 3 RELISIT/</div>
        </div>
      </section>

      {/* ===== SECCIÓN 3: Pedido de prueba ===== */}
      <section className="lesson-section" id="s3">
        <span className="section-number">Bloque 3</span>
        <h2 className="section-title">Pedido de prueba</h2>
        <p className="section-sub">El momento de la verdad: creamos un pedido ficticio y verificamos que todo funciona. 10 minutos.</p>

        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80" alt="Proceso de checkout" className="section-img" />

        <div className="explain">
          Vamos a crear un pedido inventado para probar que todo funciona. Es como hacer un <strong>simulacro de incendio</strong>: mejor probar ahora que lamentarse después.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">5</div>
            <div className="step-body">
              <h4>Crear pedido ficticio</h4>
              <p>Vayan a "Nuevo pedido". Llenen con datos inventados: nombre ficticio, dirección de prueba, producto cualquiera. Hagan clic en "Guardar" o "Crear".</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">6</div>
            <div className="step-body">
              <h4>Verificar que aparece</h4>
              <p>Vuelvan a la lista de pedidos. ¿Aparece el pedido que crearon? Si sí, su caja registradora está prendida. Si no, revisemos juntas qué faltó.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Creen su pedido ficticio con datos inventados.</li>
            <li>Vayan a la lista de pedidos y confirmen que aparece.</li>
            <li>Muéstrenme su pantalla — quiero ver el pedido ahí.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Realiza tu primer pedido</strong> — Flujo completo de prueba. Mastermind/Modulo 3 RELISIT/</div>
        </div>

        <div className="yt-embed">
          <iframe src="https://www.youtube.com/embed/videoseries?list=PLDuMhid3FLBZ_zj9YKOU6KDpq5BflRxgO" title="Dropshipping COD Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="yt-embed-label">Playlist de referencia: Dropshipping COD paso a paso</p>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="lesson-section" id="checklist">
        <span className="section-number">Verificación</span>
        <h2 className="section-title">Checklist final</h2>
        <p className="section-sub">Marquen cada punto cuando lo tengan listo. Todo debe estar en verde antes de seguir al módulo 4.</p>

        <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80" alt="Checklist completo" className="section-img" />

        <ul className="checklist">
          <CheckItem>Acceso a RELISIT funcionando (puedo entrar y ver el panel)</CheckItem>
          <CheckItem>Campos obligatorios completos (nombre, contacto, dirección, pago)</CheckItem>
          <CheckItem>Alertas esenciales activadas (pedido nuevo, pago, incidencia)</CheckItem>
          <CheckItem>Pedido de prueba creado y visible en la lista</CheckItem>
          <CheckItem>Sin errores pendientes (o documentados para resolver)</CheckItem>
        </ul>
      </section>

      {/* ===== QUIZ ===== */}
      <section className="lesson-section" id="quiz">
        <span className="section-number">Quiz rápido</span>
        <h2 className="section-title">¿Quedó claro?</h2>
        <p className="section-sub">Toca cada pregunta para ver la respuesta. Sin miedo, esto es para aprender.</p>

        <QuizCard
          question="¿Qué campo es obligatorio para que un pedido se procese?"
          answer="Nombre, dirección y método de pago — sin estos, el sistema no puede crear el pedido."
        />
        <QuizCard
          question="¿Dónde se ve el estado de un pedido?"
          answer="En la lista de pedidos del panel, cada uno tiene una etiqueta de estado (nuevo, en proceso, entregado)."
        />
        <QuizCard
          question="¿Qué hacen si el pedido no se guarda?"
          answer="Revisen los campos obligatorios — si falta alguno, el sistema no guarda. Si todo está lleno, contacten soporte."
        />
      </section>

      {/* ===== CIERRE ===== */}
      <div className="closing">
        <h2 className="closing-title">RELISIT está funcionando</h2>
        <p className="closing-text">
          La caja registradora está abierta. Antes de seguir con el módulo 4, tomen un screenshot de su panel con el pedido de prueba. Ese es su comprobante.
        </p>
        <div className="closing-quote">
          "¿Qué rompería todo si no lo prueban hoy? La integración. Si no prueban ahora, no saben si funciona hasta que un cliente real les compre... y ahí ya es tarde."
        </div>
      </div>
    </div>
  );
}

export default App;
