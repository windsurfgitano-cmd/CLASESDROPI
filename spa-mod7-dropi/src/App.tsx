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
      <pointsMaterial color="#ff6b6b" size={0.035} sizeAttenuation transparent opacity={0.7} />
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

function TeacherNote({ children }: { children: React.ReactNode }) {
  return <div className="teacher-note">{children}</div>;
}

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [teacherMode, setTeacherMode] = useState(false);
  useScrollAnimations(rootRef);

  return (
    <div ref={rootRef} className={`lesson${teacherMode ? ' teacher-mode' : ''}`}>

      <header className="hero">
        <div className="hero-canvas-bg">
          <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
            <ambientLight intensity={0.6} />
            <Particles />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>
        <div className="hero-content">
          <p className="eyebrow">Módulo 7 · Operación Dropi</p>
          <h1 className="hero-title">Opera pedidos sin caos<br />en 50 minutos</h1>
          <p className="hero-sub">Ya saben vender. Ahora toca cumplir. Si el pedido llega tarde o mal, pierden al cliente para siempre. Hoy simulan el flujo completo.</p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => document.getElementById('s1')?.scrollIntoView({ behavior: 'smooth' })}>Empezar clase</button>
            <button className="btn" onClick={() => document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth' })}>Ir al checklist</button>
          </div>
        </div>
      </header>

      <TeacherNote>
        <strong>Glosario profe (en simple):</strong><br />
        <strong>Contraentrega (COD):</strong> el cliente paga cuando le llega el producto, no antes. Bajo riesgo para el comprador, más confianza.<br />
        <strong>Incidencia:</strong> cualquier problema con un pedido: dirección mala, cliente no contesta, paquete devuelto. Hay que resolverlo rápido.<br />
        <strong>Etiqueta:</strong> un post-it digital que le pones a cada pedido para organizarte. "Nuevo", "En preparación", "Problema".<br />
        <strong>SLA:</strong> el tiempo máximo que tienes para responder o resolver algo. Ej: "responder en 24h". Si te pasas, el cliente se enoja.<br />
        <strong>Proveedor:</strong> la empresa que tiene el producto y lo envía. Tú vendes, ellos despachan. Tú no tocas el producto.<br />
        <strong>Retiro:</strong> sacar tu ganancia de Dropi a tu cuenta bancaria. Como ir al cajero, pero digital.<br />
        <strong>2FA:</strong> doble verificación para proteger tu plata. Contraseña + código del celular. Nunca retires sin esto activo.
      </TeacherNote>

      {/* ===== Bloque 1: Etapas de un pedido ===== */}
      <section className="lesson-section" id="s1">
        <span className="section-number">Bloque 1</span>
        <h2 className="section-title">Etapas de un pedido</h2>
        <p className="section-sub">El mapa completo: desde que el cliente compra hasta que retiran su dinero. 10 minutos.</p>

        <TeacherNote>Si no hay pedidos reales en Dropi, usa los pedidos ficticios del módulo 3 para la demostración.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80" alt="Logística y envíos" className="section-img" />

        <div className="explain">
          Todo pedido pasa por <strong>5 etapas</strong>. Siempre. Sin excepción:<br /><br />
          1. <strong>Pedido</strong> — el cliente compra.<br />
          2. <strong>Pago</strong> — se confirma que pagó (o contraentrega).<br />
          3. <strong>Preparación</strong> — el proveedor prepara el paquete.<br />
          4. <strong>Envío</strong> — sale de bodega al cliente.<br />
          5. <strong>Entrega / Posventa</strong> — llega al cliente. Si hay problema, se gestiona.
        </div>

        <div className="analogy">
          Piénsenlo como una carrera de postas: si un corredor se cae, se pierde la carrera. Dropi es la bodega y la caja registradora. Si la bodega es un desorden, los pedidos se pierden.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-body">
              <h4>Recorrido en Dropi</h4>
              <p>Abran Dropi. Vean la lista de pedidos. Cada pedido tiene un estado. Vamos a recorrer los estados juntas: Nuevo → Pago confirmado → En preparación → Enviado → Entregado.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <p>Abran Dropi en sus PCs y ubiquen la lista de pedidos. Cuando la vean, levanten la mano.</p>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Etapas de un pedido</strong> — Mapa visual completo. Mastermind/MÓDULO 7/</div>
        </div>
      </section>

      {/* ===== Bloque 2: Gestión de órdenes y etiquetas ===== */}
      <section className="lesson-section" id="s2">
        <span className="section-number">Bloque 2</span>
        <h2 className="section-title">Órdenes y etiquetas</h2>
        <p className="section-sub">Organizar pedidos con etiquetas para filtrar y priorizar. 15 minutos.</p>

        <TeacherNote>Verificar visualmente que las 3 etiquetas estén aplicadas. Recorre pantallas rápido.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80" alt="Organización de pedidos" className="section-img" />

        <div className="explain">
          Las etiquetas son como <strong>post-its de colores</strong> en cada pedido. Sirven para filtrar y priorizar:<br /><br />
          <strong>"Nuevo"</strong> = acaba de entrar.<br />
          <strong>"En preparación"</strong> = el proveedor lo está armando.<br />
          <strong>"Incidencia"</strong> = hay un problema (dirección incorrecta, pago pendiente, etc).
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-body">
              <h4>Aplicar etiquetas</h4>
              <p>Seleccionen un pedido → Clic en etiqueta → Elegir: Nuevo, En preparación o Incidencia. Repitan con 3 pedidos ficticios.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-body">
              <h4>Filtrar y priorizar</h4>
              <p>Ahora usen el filtro para ver solo los de "Incidencia". Así saben qué atender primero. Prueben con cada etiqueta.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Apliquen etiquetas a 3 pedidos: uno "Nuevo", uno "En preparación", uno "Incidencia".</li>
            <li>Filtren por cada etiqueta y vean cómo cambia la lista.</li>
            <li>¿Tienen las 3 etiquetas puestas? Pulgar arriba.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Gestión de Órdenes</strong> — Administración completa. Mastermind/MÓDULO 7/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Novedades Etiquetas y Clientes</strong> — Organización avanzada. Mastermind/MÓDULO 7/</div>
        </div>
      </section>

      {/* ===== Bloque 3: Procesar pedidos e incidencias ===== */}
      <section className="lesson-section" id="s3">
        <span className="section-number">Bloque 3</span>
        <h2 className="section-title">Procesar pedidos e incidencias</h2>
        <p className="section-sub">Confirmar pagos, actualizar estados y manejar problemas. 10 minutos.</p>

        <img src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=900&q=80" alt="Atención al cliente" className="section-img" />

        <div className="explain">
          Cuando un pedido pasa a "Pago confirmado", ustedes lo actualizan en Dropi. Es como <strong>marcar "listo" en una lista de tareas</strong>. Si no lo marcan, el sistema no avanza.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-body">
              <h4>Procesar un pedido completo</h4>
              <p>Cambien el estado: Nuevo → Pago confirmado → En preparación. Es el flujo normal cuando todo va bien.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">5</div>
            <div className="step-body">
              <h4>Simular una incidencia</h4>
              <p>Finjan que la dirección está equivocada. Pasos: 1) Etiqueta "Incidencia", 2) Contactar cliente para corregir, 3) Actualizar dirección, 4) Quitar etiqueta y pasar a "En preparación".</p>
            </div>
          </div>
        </div>

        <div className="analogy">
          Plantilla de respuesta rápida: "Hola [nombre], notamos un detalle con tu dirección. ¿Podrías confirmarnos [dato]? Queremos que tu pedido llegue perfecto."
        </div>

        <div className="task">
          <h4>Roleplay</h4>
          <ul>
            <li>Formen parejas: una es la operadora, la otra es la clienta enojada.</li>
            <li>Usen la plantilla de arriba para responder.</li>
          </ul>
        </div>

        <TeacherNote><strong>Roleplay:</strong> Abuela es la operadora, Nieta es la clienta enojada. Abuela responde usando la plantilla. Dales 3 min. Luego pregunta qué tan natural se sintió.</TeacherNote>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Procesando tus pedidos</strong> — Flujo completo. Mastermind/MÓDULO 7/</div>
        </div>

        <div className="yt-embed">
          <iframe src="https://www.youtube.com/embed/pVoEQ-JxP2g" title="Dropshipping COD operación" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="yt-embed-label">YouTube: Gestión de pedidos en dropshipping</p>
      </section>

      {/* ===== Bloque 4: Retiro de dinero ===== */}
      <section className="lesson-section" id="s4">
        <span className="section-number">Bloque 4</span>
        <h2 className="section-title">Retiro de dinero</h2>
        <p className="section-sub">La parte favorita: cobrar. Con seguridad. 10 minutos.</p>

        <TeacherNote><strong>NO dejes que hagan retiros reales en clase.</strong> Solo que ubiquen la sección y revisen los campos. El retiro lo hacen después con plata real.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80" alt="Retiro de dinero" className="section-img" />

        <div className="explain">
          En Dropi vayan a la sección de <strong>Retiros</strong>. Ahí ven cuánto tienen disponible, cuánto está pendiente y cuánto ya retiraron.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">6</div>
            <div className="step-body">
              <h4>Revisar sección de retiros</h4>
              <p>Abran la sección y revisen: saldo disponible, pendiente y retirado. Familiarícense con los campos.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">7</div>
            <div className="step-body">
              <h4>Flujo de retiro seguro</h4>
              <p>Para retirar: 1) Verificar cuenta bancaria correcta, 2) Confirmar con 2FA, 3) Solicitar retiro, 4) Esperar confirmación. No retiren a cuentas que no sean suyas. Revisen el monto antes de confirmar.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Abran la sección de retiros y ubiquen el saldo.</li>
            <li>Revisen que la cuenta bancaria sea correcta.</li>
            <li>¿Ubicaron la sección? ¿Ven el saldo? Pulgar arriba.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Retira tu dinero de dropi</strong> — Paso a paso seguro. Mastermind/MÓDULO 7/</div>
        </div>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="lesson-section" id="checklist">
        <span className="section-number">Verificación</span>
        <h2 className="section-title">Checklist final</h2>
        <p className="section-sub">Todo marcado = listas para operar cuando lleguen pedidos reales.</p>

        <TeacherNote>Verifica que todas hayan procesado al menos 1 pedido ficticio completo (Nuevo → Entregado).</TeacherNote>

        <ul className="checklist">
          <CheckItem>Pedido ficticio identificado en la lista de Dropi</CheckItem>
          <CheckItem>3 etiquetas aplicadas correctamente (Nuevo, En preparación, Incidencia)</CheckItem>
          <CheckItem>Estado de pedido actualizado (Nuevo → Pago → Preparación)</CheckItem>
          <CheckItem>Incidencia simulada y respondida con plantilla</CheckItem>
          <CheckItem>Sección de retiros revisada y flujo de retiro entendido con 2FA</CheckItem>
        </ul>
      </section>

      {/* ===== QUIZ ===== */}
      <section className="lesson-section" id="quiz">
        <span className="section-number">Quiz rápido</span>
        <h2 className="section-title">¿Quedó claro?</h2>
        <p className="section-sub">Toca cada pregunta para ver la respuesta.</p>

        <QuizCard question="¿Cuál es la secuencia de etapas de un pedido?" answer="Pedido → Pago → Preparación → Envío → Entrega/Posventa. Siempre en ese orden." />
        <QuizCard question="¿Qué etiqueta le ponen a un pedido con falta de pago?" answer="'Incidencia' (o una específica como 'Pago pendiente'). Lo importante es que se vea y se atienda." />
        <QuizCard question="¿Qué validan antes de retirar dinero?" answer="Cuenta bancaria correcta + 2FA. Nunca retiren sin verificar ambas cosas." />
      </section>

      {/* ===== CIERRE ===== */}
      <div className="closing">
        <h2 className="closing-title">Listas para operar</h2>
        <p className="closing-text">
          Operación no es glamoroso, pero es donde se gana la repetición de compra. Un cliente bien atendido vuelve y recomienda. Cuando lleguen pedidos reales, ya saben exactamente qué hacer.
        </p>
        <div className="closing-quote">
          "¿Qué es lo peor que pueden hacer en operación? Ignorar una incidencia. Un cliente esperando respuesta es un cliente que no vuelve."
        </div>
        <TeacherNote>Este es el último módulo. Cierra con el reto 72h si corresponde. Felicita al grupo por completar el Mastermind.</TeacherNote>
      </div>

      <button
        className={`teacher-toggle${teacherMode ? ' active' : ''}`}
        onClick={() => setTeacherMode(!teacherMode)}
        title={teacherMode ? 'Ocultar notas' : 'Modo profesor'}
      >
        {teacherMode ? '👁' : '🔑'}
      </button>
    </div>
  );
}

export default App;
