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
      <pointsMaterial color="#1877f2" size={0.035} sizeAttenuation transparent opacity={0.7} />
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
          <p className="eyebrow">Módulo 4 · Configuraciones de Facebook</p>
          <h1 className="hero-title">Tu casa en Meta<br />lista en 55 minutos</h1>
          <p className="hero-sub">Sin esto, Meta no confía en ustedes. Es como querer vender en un local sin letrero, sin puerta y sin llave. Hoy armamos todo.</p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => document.getElementById('s1')?.scrollIntoView({ behavior: 'smooth' })}>Empezar clase</button>
            <button className="btn" onClick={() => document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth' })}>Ir al checklist</button>
          </div>
        </div>
      </header>

      <TeacherNote>
        <strong>Glosario profe (en simple):</strong><br />
        <strong>Fan Page:</strong> la página de tu negocio en Facebook. Es tu vitrina, no tu perfil personal.<br />
        <strong>Business Manager (BM):</strong> la oficina central de Meta donde manejas páginas, anuncios y permisos. Todo se controla desde ahí.<br />
        <strong>2FA (doble verificación):</strong> una cerradura extra. Además de tu contraseña, te pide un código del celular. Si te hackean la clave, sin el código no entran.<br />
        <strong>Píxel:</strong> un chismoso invisible que pones en tu tienda. Le cuenta a Facebook quién entró, quién compró, quién solo miró. Sin él, gastas plata a ciegas.<br />
        <strong>Dominio:</strong> la dirección de tu tienda (ej: mitienda.com). Verificarlo es decirle a Meta "esta tienda es mía de verdad".<br />
        <strong>DNS:</strong> la guía telefónica de internet. Cuando verificas el dominio, a veces tarda en actualizar (como el correo, no llega al instante).<br />
        <strong>CTA:</strong> "Call to Action" = el botón que le dice al cliente qué hacer. Ej: "Comprar ahora", "Enviar mensaje".
      </TeacherNote>

      {/* ===== SECCIÓN 1: Fan Page ===== */}
      <section className="lesson-section" id="s1">
        <span className="section-number">Bloque 1</span>
        <h2 className="section-title">Fan Page en 7 clics</h2>
        <p className="section-sub">La cara de su negocio en Facebook. Logo, portada, bio y CTA. 15 minutos.</p>

        <TeacherNote>Si alguna ya tiene fan page, que ayude a la de al lado. Peer teaching ahorra tiempo. Escucha cómo leen sus bios mutuamente — corrige si son muy genéricas.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80" alt="Social media marketing" className="section-img" />

        <div className="analogy">
          Fan page = su vitrina. Business Manager = la oficina central. Dominio = la escritura de la casa. 2FA = cerradura doble.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-body">
              <h4>Crear o abrir fan page</h4>
              <p>Vayan a facebook.com/pages/create. Si ya tienen una, ábranla. Es la cara de su negocio.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-body">
              <h4>Logo y portada</h4>
              <p>Abran Canva, busquen una plantilla de logo, pongan el nombre de su tienda. La portada: una imagen limpia que diga qué venden. No tiene que ser perfecto, tiene que ser claro.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-body">
              <h4>Bio + botón CTA</h4>
              <p>La bio es su elevator pitch en 2 líneas: qué venden y por qué comprar acá. El botón: "Comprar ahora" o "Enviar mensaje" según su modelo.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-body">
              <h4>Roles de la página</h4>
              <p>Los roles son las llaves. Admin = llave maestra. Editor = puede publicar. Solo den admin a quien confíen de verdad.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Suban logo y portada a su fan page.</li>
            <li>Escriban su bio y elijan el CTA. Léansela mutuamente para validar claridad.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Crea tu logo y Edita tu FAN PAGE</strong> — Proceso completo (66 min). Mastermind/MÓDULO 4/</div>
        </div>
      </section>

      {/* ===== SECCIÓN 2: Business Manager + 2FA ===== */}
      <section className="lesson-section" id="s2">
        <span className="section-number">Bloque 2</span>
        <h2 className="section-title">Business Manager + 2FA</h2>
        <p className="section-sub">La oficina central de todo: páginas, anuncios, píxeles. Y la cerradura doble que protege todo. 15 minutos.</p>

        <TeacherNote><strong>2FA es donde más se traban.</strong> Ten tu teléfono listo para mostrar el ejemplo paso a paso. Haz cada clic al mismo tiempo en el proyector.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=80" alt="Seguridad digital" className="section-img" />

        <div className="explain">
          Business Manager es donde controlan todo. Vayan a <strong>business.facebook.com</strong>. Desde acá manejan páginas, cuentas publicitarias, píxeles y permisos.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">5</div>
            <div className="step-body">
              <h4>Acceder al BM</h4>
              <p>Vayan a business.facebook.com. Si no tienen BM, créenlo ahora. Asignen su fan page al BM.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">6</div>
            <div className="step-body">
              <h4>Activar 2FA (obligatorio)</h4>
              <p>Configuración del negocio &gt; Centro de seguridad &gt; Verificación en dos pasos. Sin 2FA, si alguien adivina su contraseña, pierden la cuenta. Con 2FA, necesitan su teléfono además de la contraseña.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">7</div>
            <div className="step-body">
              <h4>Revisar roles y activos</h4>
              <p>Configuración &gt; Cuentas &gt; Páginas: su página debe estar asignada. Configuración &gt; Personas: solo ustedes como admin.</p>
            </div>
          </div>
        </div>

        <div className="analogy">
          2FA es la cerradura doble de su casa. Pueden tener la puerta más bonita del barrio, pero si cualquiera la abre, no sirve de nada.
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Activen 2FA en su cuenta. Paso a paso, juntas. ¿Les pidió el código del teléfono? Pulgar arriba.</li>
            <li>Verifiquen que su página esté asignada al BM y los roles sean correctos.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Conociendo Facebook</strong> — Recorrido del BM completo. Mastermind/MÓDULO 4/</div>
        </div>

        <div className="yt-embed">
          <iframe src="https://www.youtube.com/embed/jWpqV4lHcKA" title="Business Manager Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="yt-embed-label">YouTube: Cómo configurar Business Manager desde cero</p>
      </section>

      {/* ===== SECCIÓN 3: Dominio + Shopify ===== */}
      <section className="lesson-section" id="s3">
        <span className="section-number">Bloque 3</span>
        <h2 className="section-title">Dominio verificado + Shopify conectado</h2>
        <p className="section-sub">Decirle a Meta que la tienda es suya y conectar el píxel. 15 minutos.</p>

        <TeacherNote>Si el check verde no aparece inmediatamente, puede ser propagación DNS (~5 min a 48h). Tranquilas. Incentivo: la primera en mostrar dominio verificado gana 10 min de feedback 1:1.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80" alt="Conexión de sistemas" className="section-img" />

        <div className="explain">
          <strong>Verificar dominio</strong> = decirle a Meta "esta tienda es mía". Sin esto, Meta no les deja controlar qué enlaces aparecen en sus anuncios.<br /><br />
          <strong>El píxel</strong> = un notario que firma que alguien visitó su tienda. Sin él, gastan plata a ciegas.
        </div>

        <div className="steps">
          <div className="step-card">
            <div className="step-num">8</div>
            <div className="step-body">
              <h4>Agregar y verificar dominio</h4>
              <p>Configuración del negocio &gt; Seguridad de la marca &gt; Dominios &gt; Agregar. Método meta-tag o DNS. Clic en "Verificar" y esperar el check verde.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">9</div>
            <div className="step-body">
              <h4>Conectar Shopify</h4>
              <p>En Shopify: Canal de ventas Facebook &gt; Vincular cuenta &gt; Seleccionar píxel. Esto hace que el píxel registre cada visita a su tienda.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">10</div>
            <div className="step-body">
              <h4>Probar evento</h4>
              <p>En el Administrador de Eventos &gt; Probador de eventos &gt; Abrir su tienda en otro tab &gt; Navegar. ¿Aparece el evento? Entonces el notario está trabajando.</p>
            </div>
          </div>
        </div>

        <div className="task">
          <h4>Manos a la obra</h4>
          <ul>
            <li>Agreguen su dominio y verifíquenlo. ¿Check verde? Muéstrenme la pantalla.</li>
            <li>Conecten Shopify con el píxel y disparen un evento de prueba.</li>
            <li>Confirmen que el check verde aparece.</li>
          </ul>
        </div>

        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Conectar Business Manager con Shopify Contraentrega</strong> — Mastermind/MÓDULO 4/</div>
        </div>
        <div className="local-video-ref">
          <span className="lv-icon">🎬</span>
          <div><strong>Verificación de dominio contra</strong> — Paso a paso. Mastermind/MÓDULO 4/</div>
        </div>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="lesson-section" id="checklist">
        <span className="section-number">Verificación</span>
        <h2 className="section-title">Checklist final</h2>
        <p className="section-sub">Todo debe estar marcado antes de pasar al módulo 5.</p>

        <TeacherNote>Pídeles screenshot de: fan page, BM con 2FA, dominio verificado, evento del píxel disparando. Son 4 capturas.</TeacherNote>

        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" alt="Dashboard de negocio" className="section-img" />

        <ul className="checklist">
          <CheckItem>Fan page con logo, portada y bio + CTA</CheckItem>
          <CheckItem>Roles correctos asignados en página y BM</CheckItem>
          <CheckItem>2FA activo en Business Manager</CheckItem>
          <CheckItem>Dominio agregado y verificado (check verde)</CheckItem>
          <CheckItem>Shopify/píxel conectado y evento de prueba disparado</CheckItem>
        </ul>
      </section>

      {/* ===== QUIZ ===== */}
      <section className="lesson-section" id="quiz">
        <span className="section-number">Quiz rápido</span>
        <h2 className="section-title">¿Quedó claro?</h2>
        <p className="section-sub">Toca cada pregunta para ver la respuesta.</p>

        <QuizCard question="¿Qué pasa si no verifican su dominio?" answer="Meta no les deja controlar qué enlaces aparecen en sus anuncios. Pierden atribución y control." />
        <QuizCard question="¿ABO y CBO — qué significan?" answer="ABO = presupuesto por conjunto (ustedes deciden cuánto por grupo). CBO = presupuesto centralizado (Meta decide). Lo veremos en el módulo 6." />
        <QuizCard question="¿Quién debe tener rol de administrador?" answer="Solo los dueños o personas de altísima confianza. Admin = llave maestra de todo." />
      </section>

      {/* ===== CIERRE ===== */}
      <div className="closing">
        <h2 className="closing-title">Meta confía en ustedes</h2>
        <p className="closing-text">
          Fan page profesional, BM seguro, dominio verificado y Shopify conectado. Tomen screenshot de todo: fan page, dominio verificado, evento del píxel disparando.
        </p>
        <div className="closing-quote">
          "¿Qué rompería todo si no lo hacen hoy? El 2FA y el dominio. Sin 2FA pueden perder la cuenta. Sin dominio, Meta no los toma en serio."
        </div>
        <TeacherNote>Verifica que TODAS tengan 2FA activo antes de salir. Es el punto crítico de seguridad.</TeacherNote>
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
