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
      <pointsMaterial color="#69f0ae" size={0.035} sizeAttenuation transparent opacity={0.7} />
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
          <p className="eyebrow">Módulo 6 · Campañas Facebook Ads</p>
          <h1 className="hero-title">Lanza tu campaña<br />en 55 minutos</h1>
          <p className="hero-sub">Ya tienen la tienda, el creativo y la fan page. Ahora toca poner plata y que Meta les traiga clientes. Es más simple de lo que parece.</p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => document.getElementById('s1')?.scrollIntoView({ behavior: 'smooth' })}>Empezar clase</button>
            <button className="btn" onClick={() => document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth' })}>Ir al checklist</button>
          </div>
        </div>
      </header>

      <TeacherNote>
        <strong>Glosario profe (en simple):</strong><br />
        <strong>ABO:</strong> tú decides cuánta plata va a cada grupo de personas. Como repartir mesada: "$5 para ti, $5 para ti".<br />
        <strong>CBO:</strong> le das toda la plata a Meta y él decide dónde ponerla según qué funciona mejor. Como darle la billetera al DJ.<br />
        <strong>CTR:</strong> de cada 100 personas que ven tu anuncio, cuántas hacen clic. Arriba de 1% = bien. Si es bajo, el creativo no atrapa.<br />
        <strong>CPA:</strong> cuánto te cuesta cada resultado (compra, lead, etc). Si vendes algo de $20 y el CPA es $15, solo ganas $5. Ojo ahí.<br />
        <strong>ROAS:</strong> por cada peso que gastas, cuántos vuelven. ROAS 3 = gasté $1, me volvieron $3. Mientras más alto, mejor.<br />
        <strong>Lookalike (LAL):</strong> le dices a Meta "busca gente parecida a mis clientes". Meta busca gemelos de tus compradores.<br />
        <strong>Retargeting:</strong> mostrarle anuncios a gente que YA visitó tu tienda pero no compró. Recordatorio: "oye, se te quedó esto".<br />
        <strong>Conversiones:</strong> las acciones que te importan (compra, agregar al carrito). Es lo que le dices a Meta que optimice.
      </TeacherNote>

      {/* ===== Bloque 1: ABO vs CBO ===== */}
      <section className="lesson-section" id="s1">
        <span className="section-number">Bloque 1</span>
        <h2 className="section-title">ABO vs CBO</h2>
        <p className="section-sub">Solo hay dos formas de organizar el presupuesto en Meta. 10 minutos.</p>

        <TeacherNote>La mayoría elegirá ABO y está bien — es lo correcto para quien empieza sin datos. No presiones hacia CBO.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&q=80" alt="Marketing digital" className="section-img" />

        <div className="explain">
          <strong>ABO</strong> (Presupuesto por Conjunto): ustedes le dicen a cada grupo cuánto gastar. Ideal cuando tienen poca plata o quieren probar varios públicos sin que Meta decida por ustedes.<br /><br />
          <strong>CBO</strong> (Presupuesto de Campaña): ustedes ponen un monto total y Meta lo reparte donde mejor funcione. Ideal cuando ya tienen datos y quieren que Meta optimice.<br /><br />
          <strong>Regla simple:</strong> poca plata o sin datos → ABO. Con datos y presupuesto estable → CBO.
        </div>

        <div className="analogy">
          ABO = un DJ que reparte presupuesto por pista de baile (cada conjunto elige cuánto gastar). CBO = un banco central que decide dónde va la plata según quién baile mejor.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-body">
              <h4>Elegir estructura</h4>
              <p>¿Cuánto van a gastar por día? Menos de $10/día o empezando → ABO. Más de $20/día con datos previos → CBO.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <p>Anoten en su PC qué estructura eligen y por qué (1 línea). Díganme: ¿ABO o CBO?</p>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Diferencia entre ABO y CBO Contraentrega</strong> — Mastermind/MÓDULO 6/</div>
        </div>

        <div className="yt-embed">
          <iframe src="https://www.youtube.com/embed/HGg1gX1yNMY" title="ABO vs CBO Facebook Ads" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="yt-embed-label">YouTube: ABO vs CBO explicado para principiantes</p>
      </section>

      {/* ===== Bloque 2: Crear campaña + 3 públicos ===== */}
      <section className="lesson-section" id="s2">
        <span className="section-number">Bloque 2</span>
        <h2 className="section-title">Crear campaña + 3 públicos</h2>
        <p className="section-sub">Configuramos la campaña con 3 conjuntos de audiencia distintos. 20 minutos.</p>

        <TeacherNote>Si no tienen datos para crear Lookalike, que lo anoten como tarea. No te atasques en eso. Recorre pantallas rápido al final del bloque.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80" alt="Audiencia objetivo" className="section-img" />

        <div className="explain">
          Abran el <strong>Administrador de Anuncios</strong>. Clic en "Crear". Objetivo: si venden contraentrega, <strong>"Ventas"</strong> o "Conversiones". Para hoy, elijan Ventas.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-body">
              <h4>Crear la campaña</h4>
              <p>Ads Manager → Crear → Objetivo Ventas → Nombrar la campaña. Seleccionen ABO o CBO según lo que eligieron.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-body">
              <h4>Público 1: Frío / Interés</h4>
              <p>Personas que NO las conocen pero podrían interesarse. Metan intereses: "belleza", "moda", "gadgets"... lo que vendan. Edad, ubicación, idioma.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-body">
              <h4>Público 2: Lookalike (LAL)</h4>
              <p>Personas parecidas a las que ya les compraron. Meta busca "gemelos" de sus mejores clientes. Si no tienen datos aún, anótenlo para después.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">5</div>
            <div className="step-body">
              <h4>Público 3: Retargeting</h4>
              <p>Personas que YA visitaron su tienda pero no compraron. Es como el vendedor que dice "oye, te faltó pagar". Es el público más rentable.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Creen su campaña en Ads Manager con el objetivo correcto.</li>
            <li>Configuren los 3 públicos: interés, LAL (si hay datos), retargeting (visitantes 7–30 días).</li>
            <li>¿Tienen los 3 creados? Pulgar arriba.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Campaña ABO</strong> — Creación paso a paso. Mastermind/MÓDULO 6/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Campaña CBO</strong> — Flujo completo. Mastermind/MÓDULO 6/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Retargeting clase Contra</strong> — Público caliente. Mastermind/MÓDULO 6/</div>
        </div>
      </section>

      {/* ===== Bloque 3: Probar evento ===== */}
      <section className="lesson-section" id="s3">
        <span className="section-number">Bloque 3</span>
        <h2 className="section-title">Probar evento del píxel</h2>
        <p className="section-sub">Antes de gastar un peso, verificamos que el píxel registra. 10 minutos.</p>

        <TeacherNote>Si el píxel no dispara, vuelve al módulo 4: dominio + integración Shopify. Error más común: dominio no verificado.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80" alt="Análisis de datos" className="section-img" />

        <div className="explain">
          Vayan al <strong>Administrador de Eventos → Probador de eventos</strong>. Abran su tienda en otro tab y naveguen. Si el evento aparece en el probador, el píxel está funcionando.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">6</div>
            <div className="step-body">
              <h4>Verificar píxel</h4>
              <p>Administrador de Eventos → Probador → Abrir tienda → Navegar. ¿Aparece el evento? Bien. ¿No aparece? Revisar dominio verificado e integración Shopify.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">7</div>
            <div className="step-body">
              <h4>Elegir evento de conversión</h4>
              <p>En la campaña, seleccionen el evento a optimizar. Contraentrega: "Iniciar pago" o "Compra". Pocos eventos: usar "Ver contenido" al inicio.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Abran el Probador de Eventos y disparen un evento visitando su tienda.</li>
            <li>Seleccionen el evento de conversión en su campaña.</li>
          </ul>
        </div>
      </section>

      {/* ===== Bloque 4: Métricas ===== */}
      <section className="lesson-section" id="s4">
        <span className="section-number">Bloque 4</span>
        <h2 className="section-title">Métricas que importan</h2>
        <p className="section-sub">Configurar las columnas correctas y definir su KPI. 10 minutos.</p>

        <TeacherNote><strong>Escribe en la pizarra: CTR &gt; 1%, CPA &lt; margen.</strong> Que lo copien en sus notas. Es la brújula que van a usar después de clase.</TeacherNote>

        <div className="explain">
          Los números sin contexto no sirven. Vamos a poner las columnas que importan:<br /><br />
          <strong>CTR</strong> (Click-Through Rate): % de gente que hizo clic. Apunten a 1%+.<br />
          <strong>CPA</strong> (Costo por Acción): cuánto les cuesta cada resultado.<br />
          <strong>ROAS</strong> (si aplica): por cada peso que gastan, cuánto vuelve.<br />
          <strong>Impresiones, clics y gasto:</strong> para ver volumen.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">8</div>
            <div className="step-body">
              <h4>Configurar columnas</h4>
              <p>Ads Manager → Columnas → Personalizar → Agregar: CTR, CPA, ROAS, impresiones, clics, gasto.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">9</div>
            <div className="step-body">
              <h4>Definir KPI inicial</h4>
              <p>CTR objetivo: 1%+ (si &lt;0.7%, el creativo no funciona). CPA: depende del ticket y margen. Ej: producto $25, margen 30% → CPA máximo $7.5. Anótenlo.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Ajusten sus columnas en Ads Manager.</li>
            <li>Anoten su CTR y CPA objetivo. Eso es su brújula.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Configurando tus métricas contraentrega</strong> — Mastermind/MÓDULO 6/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Toma de decisiones</strong> — Qué hacer con los números. Mastermind/MÓDULO 6/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Estrategias de Facebook</strong> — Estrategias avanzadas. Mastermind/MÓDULO 6/</div>
        </div>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="lesson-section" id="checklist">
        <span className="section-number">Verificación</span>
        <h2 className="section-title">Checklist final</h2>
        <p className="section-sub">Todo marcado = campaña lista para lanzar (o lo más cerca posible).</p>

        <TeacherNote>Si alguna no tiene los 3 públicos, al menos debe tener Interés + Retargeting. LAL puede esperar.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" alt="Métricas de éxito" className="section-img" />

        <ul className="checklist">
          <CheckItem>Estructura elegida (ABO o CBO) con justificación</CheckItem>
          <CheckItem>3 públicos creados (interés, LAL, retargeting)</CheckItem>
          <CheckItem>Evento del píxel verificado y disparando</CheckItem>
          <CheckItem>Columnas ajustadas (CTR, CPA, ROAS, gasto, impresiones, clics)</CheckItem>
          <CheckItem>KPI inicial anotado (CTR y CPA objetivo)</CheckItem>
        </ul>
      </section>

      {/* ===== QUIZ ===== */}
      <section className="lesson-section" id="quiz">
        <span className="section-number">Quiz rápido</span>
        <h2 className="section-title">¿Quedó claro?</h2>
        <p className="section-sub">Toca cada pregunta para ver la respuesta.</p>

        <QuizCard question="¿Cuándo usar ABO?" answer="Cuando tienen poco presupuesto o están testeando públicos nuevos y quieren controlar cuánto va a cada uno." />
        <QuizCard question="¿Qué métrica miran primero si no hay ventas?" answer="CTR — si la gente no hace clic, el creativo o el público no funcionan. Arreglen eso antes de cambiar presupuesto." />
        <QuizCard question="¿Qué hacen si el CTR es menor a 0.7%?" answer="Cambiar el hook o el creativo antes que el público. El problema está en lo que la gente ve, no en quién lo ve." />
      </section>

      {/* ===== CIERRE ===== */}
      <div className="closing">
        <h2 className="closing-title">Campaña lista para lanzar</h2>
        <p className="closing-text">
          Tienen una campaña armada con 3 públicos, evento verificado y métricas claras. Si el creativo del módulo anterior está listo, pueden activar hoy.
        </p>
        <div className="closing-quote">
          "¿Qué es lo peor que pueden hacer? Lanzar sin píxel verificado. Gastan plata y no saben quién compró ni por qué."
        </div>
        <TeacherNote>Recuerda: NO activen campañas en clase con plata real. Solo dejar todo listo. La activación la hacen después con su propio presupuesto.</TeacherNote>
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
