/* global React, Icon */
const { useState, useEffect, useRef } = React;

// =================== NOSOTROS VIEW ===================

const NosotrosHero = () => (
  <section className="section" style={{ paddingTop: 48, paddingBottom: 48 }}>
    <div className="wrap">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="row gap-8" style={{ marginBottom: 20 }}>
            <span className="chip"><span className="dot" /> JAPS Engineering</span>
            <span className="chip">📍 Santiago, Chile</span>
          </div>

          <h1 style={{ margin: "0 0 20px" }}>
            Tecnología que <span style={{ color: "var(--primary)" }}>transforma</span> negocios.
          </h1>

          <p className="muted" style={{ fontSize: 18, maxWidth: 520, marginBottom: 28 }}>
            Somos JAPS Engineering, una empresa chilena de ingeniería e inteligencia artificial.
            Diseñamos soluciones tecnológicas a medida que automatizan operaciones y
            abren nuevas oportunidades de crecimiento para nuestros clientes.
          </p>

          <p className="muted" style={{ fontSize: 15, maxWidth: 520, marginBottom: 28, fontStyle: "italic", borderLeft: "3px solid var(--accent)", paddingLeft: 16 }}>
            Esta página, <strong>JAPSfiter</strong>, es una demo real de los servicios que desarrollamos:
            landing pages, agendamiento, chatbot con IA, cotización automatizada y más.
          </p>

          <div className="row gap-12" style={{ flexWrap: "wrap" }}>
            <a href="https://japs.ing" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              Visitar japs.ing <Icon name="arrow" size={16} />
            </a>
            <a href="https://wa.me/56951019283?text=Hola%20JAPS%2C%20me%20interesa%20saber%20más%20de%20sus%20servicios." target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <Icon name="whatsapp" size={16} /> Contactar
            </a>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            aspectRatio: "1/1", borderRadius: "var(--radius-xl)", overflow: "hidden",
            background: "var(--ink-900)", display: "grid", placeItems: "center",
            position: "relative"
          }}>
            {/* Abstract tech pattern */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 50%)," +
                "radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 50%)"
            }} />
            <svg viewBox="0 0 300 300" style={{ width: "60%", position: "relative", zIndex: 1 }}>
              <defs>
                <linearGradient id="jg1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
              </defs>
              {/* Circuit-like pattern */}
              <circle cx="150" cy="150" r="80" fill="none" stroke="url(#jg1)" strokeWidth="2" opacity="0.6">
                <animate attributeName="r" values="80;90;80" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="150" cy="150" r="50" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5">
                <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="20s" repeatCount="indefinite" />
              </circle>
              <circle cx="150" cy="150" r="110" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 8" />
              {/* Nodes */}
              {[
                { x: 150, y: 70 }, { x: 220, y: 120 }, { x: 200, y: 200 },
                { x: 100, y: 200 }, { x: 80, y: 120 }, { x: 150, y: 150 }
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={i === 5 ? 12 : 6} fill={i === 5 ? "var(--accent)" : "rgba(255,255,255,0.8)"} />
                  {i < 5 && <line x1={p.x} y1={p.y} x2={150} y2={150} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />}
                </g>
              ))}
              {/* JAPS text */}
              <text x="150" y="250" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontFamily="var(--font-display)" fontSize="28" fontWeight="600" letterSpacing="-0.02em">
                JAPS
              </text>
              <text x="150" y="275" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontFamily="var(--font-body)" fontSize="11" letterSpacing="0.15em" textTransform="uppercase">
                ENGINEERING
              </text>
            </svg>
          </div>

          {/* Floating badge */}
          <div className="hero-float" style={{
            position: "absolute", bottom: -16, left: -16,
            background: "var(--surface)", border: "1px solid var(--border)",
            padding: 14, borderRadius: "var(--radius)", boxShadow: "var(--shadow-lg)", width: 220
          }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase" }}>Fundada en</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 2 }}>Santiago, Chile</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>JAPS Engineering SpA</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----- What we do -----
const WhatWeDo = () => {
  const services = [
    {
      icon: "sparkle",
      title: "Inteligencia Artificial",
      desc: "Chatbots, asistentes de voz, generación de documentos y correos personalizados con IA. Automatizamos la interacción con tus clientes 24/7."
    },
    {
      icon: "pipe",
      title: "Automatización de Procesos",
      desc: "Conectamos tu ecosistema digital: ERPs, e-commerce, logística y pasarelas de pago. Eliminamos tareas repetitivas y reducimos errores."
    },
    {
      icon: "wrench",
      title: "Software a Medida",
      desc: "Aplicaciones web, estimadores de compras, planificación de producción y reportería avanzada. Diseñamos la arquitectura exacta que necesitas."
    },
    {
      icon: "calendar",
      title: "Sistemas de Agendamiento",
      desc: "Tus clientes agendan en tiempo real, sin llamadas ni correos. Sincronización de calendarios y recordatorios automáticos."
    },
    {
      icon: "mail",
      title: "Landing Pages & SEO",
      desc: "Diseño web profesional, optimizado para conversión y posicionamiento. Desde landing pages hasta ecosistemas digitales completos."
    },
    {
      icon: "shield",
      title: "Consultoría TI",
      desc: "Analizamos tus procesos y proponemos soluciones tecnológicas que escalen con tu negocio. IoT, sensores e integraciones avanzadas."
    },
  ];

  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow">Nuestros servicios</div>
          <h2 className="mt-8" style={{ maxWidth: 640, margin: "8px auto 0" }}>
            Soluciones tecnológicas que impulsan tu negocio.
          </h2>
          <p className="muted" style={{ maxWidth: 560, margin: "16px auto 0", fontSize: 16 }}>
            Desde la automatización de procesos hasta el desarrollo de software completo,
            cubrimos todas las necesidades digitales de tu empresa.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {services.map((svc, i) => (
            <article key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 180 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "var(--blue-50)", color: "var(--primary)",
                display: "grid", placeItems: "center"
              }}>
                <Icon name={svc.icon} size={22} />
              </div>
              <h3>{svc.title}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 14 }}>{svc.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----- About JAPS Demo -----
const AboutDemo = () => (
  <section className="section">
    <div className="wrap">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="eyebrow">Esta demo</div>
          <h2 className="mt-8">JAPSfiter es una muestra real de lo que hacemos.</h2>
          <p className="muted mt-16" style={{ fontSize: 16, maxWidth: 480 }}>
            Esta página de gasfitería no es un cliente real — es una demostración completa
            de los servicios que JAPS Engineering puede implementar para tu negocio:
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { n: "01", t: "Landing Page profesional", d: "Diseño web responsive con dos direcciones creativas. Optimizada para SEO y conversión." },
            { n: "02", t: "Sistema de agendamiento", d: "Calendario interactivo con selección de horarios, tipo de servicio y datos del cliente." },
            { n: "03", t: "Chatbot con IA", d: "Diagnóstico automatizado que analiza el problema, estima costos y sugiere agendar." },
            { n: "04", t: "Cotización dinámica", d: "Cotizador paso a paso con desglose de precios, adicionales y resumen descargable." },
          ].map(step => (
            <div key={step.n} className="card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
              <div className="mono" style={{ fontSize: 36, fontWeight: 500, color: "var(--accent)", lineHeight: 1, letterSpacing: "-0.02em" }}>{step.n}</div>
              <div>
                <h3 style={{ marginBottom: 4 }}>{step.t}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ----- Team -----
const JAPSTeam = () => {
  const team = [
    {
      name: "Pablo Landerretche",
      role: "Chief Executive Officer",
      initials: "PL",
      color: "#0b3b8c",
    },
    {
      name: "Alonso Rivera",
      role: "Chief Technology Officer",
      initials: "AR",
      color: "#1651c4",
    },
    {
      name: "Sergio Urzúa",
      role: "Chief Financial Officer",
      initials: "SU",
      color: "#d48711",
    },
    {
      name: "Jean Philipe Fuentes",
      role: "Lead Software Engineer",
      initials: "JF",
      color: "#1f8a5a",
    },
  ];

  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow">Equipo</div>
          <h2 className="mt-8">Las personas detrás de JAPS.</h2>
          <p className="muted" style={{ maxWidth: 500, margin: "16px auto 0" }}>
            Un equipo multidisciplinario de ingenieros y desarrolladores apasionados
            por la tecnología y la innovación.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {team.map((member, i) => (
            <div key={i} className="card" style={{ textAlign: "center", padding: "32px 22px" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: member.color, color: "#fff",
                display: "grid", placeItems: "center",
                margin: "0 auto 16px",
                fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em"
              }}>
                {member.initials}
              </div>
              <h3 style={{ marginBottom: 4 }}>{member.name}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 13 }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----- Values -----
const Values = () => {
  const values = [
    { icon: "star", title: "Excelencia", desc: "Cada proyecto es una oportunidad de superar expectativas. No entregamos productos mediocres." },
    { icon: "users", title: "Cercanía", desc: "Trabajamos codo a codo con nuestros clientes. Entendemos su negocio antes de escribir una línea de código." },
    { icon: "flame", title: "Innovación", desc: "Usamos las últimas tecnologías en IA, automatización y desarrollo para entregar soluciones de vanguardia." },
    { icon: "shield", title: "Confianza", desc: "Transparencia en precios, plazos y procesos. Nuestros clientes saben exactamente qué esperar." },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100 }}>
            <div className="eyebrow">Valores</div>
            <h2 className="mt-8">Lo que nos define.</h2>
            <p className="muted mt-16">
              Más que una empresa de tecnología, somos un partner estratégico para nuestros clientes.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {values.map((val, i) => (
              <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "var(--amber-50)", color: "var(--amber-600)",
                  display: "grid", placeItems: "center"
                }}>
                  <Icon name={val.icon} size={22} />
                </div>
                <h3>{val.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ----- CTA -----
const NosotrosCTA = ({ setView }) => (
  <section className="section">
    <div className="wrap">
      <div className="cta-dark" style={{
        background: "var(--ink-900)", color: "#fff",
        borderRadius: "var(--radius-xl)", padding: "64px 48px",
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "center",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", right: -80, top: -80, width: 280, height: 280,
          background: "radial-gradient(circle, var(--accent), transparent 70%)", opacity: .35,
        }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ color: "#fff", margin: 0, maxWidth: 560 }}>
            ¿Quieres algo <em style={{ color: "var(--accent)" }}>como esto</em> para tu negocio?
          </h2>
          <p style={{ color: "rgba(255,255,255,.7)", marginTop: 16, fontSize: 17, maxWidth: 500 }}>
            Esta demo es solo una muestra. Conversemos sobre cómo podemos transformar tu negocio con tecnología a medida.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
          <a href="https://japs.ing/#contacto" target="_blank" rel="noopener noreferrer"
            className="btn btn--accent" style={{ padding: "18px 24px", fontSize: 16 }}>
            <Icon name="mail" size={18} /> Contactar a JAPS
          </a>
          <button className="btn btn--ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.2)" }}
            onClick={() => setView("home")}>
            ← Ver la demo completa
          </button>
        </div>
      </div>
    </div>
  </section>
);

// ----- Main View -----
const NosotrosView = ({ setView }) => (
  <>
    <NosotrosHero />
    <WhatWeDo />
    <AboutDemo />
    <JAPSTeam />
    <Values />
    <NosotrosCTA setView={setView} />
  </>
);

Object.assign(window, { NosotrosView });
