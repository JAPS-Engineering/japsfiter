/* global React, Icon */
const { useState, useEffect } = React;

// =================== HOME VIEW ===================

const Hero = ({ setView, dir }) => (
  <section className="section" style={{ paddingTop: 48, paddingBottom: 48 }}>
    <div className="wrap">
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="row gap-8" style={{ marginBottom: 20 }}>
            <span className="chip"><span className="dot"/> Respondemos en &lt; 7 min</span>
            <span className="chip">⭐ 4.9 · 2.3k reseñas</span>
          </div>

          {dir === "a" ? (
            <h1 style={{ margin: "0 0 20px" }}>
              Gasfitería <em style={{ fontStyle: "italic", color: "var(--primary)" }}>sin dramas</em>,<br/>
              en tu casa <span style={{ color: "var(--accent)", fontStyle: "italic" }}>hoy mismo</span>.
            </h1>
          ) : (
            <h1 style={{ margin: "0 0 20px" }}>
              Gasfiter a domicilio,<br/>
              en <span style={{ color: "var(--primary)" }}>menos de 2 horas</span>.
            </h1>
          )}

          <p className="muted" style={{ fontSize: 18, maxWidth: 520, marginBottom: 28 }}>
            Diagnóstico gratis, rango de precio al tiro y técnicos certificados.
            Cubrimos 34 comunas en la Región Metropolitana.
          </p>

          <div className="row gap-12" style={{ flexWrap: "wrap" }}>
            <button className="btn btn--primary" onClick={() => setView("servicios")}>
              Cotizar ahora <Icon name="arrow" size={16} />
            </button>
            <button className="btn btn--ghost" onClick={() => setView("agendar")}>
              <Icon name="calendar" size={16}/> Agendar visita
            </button>
          </div>

          <div className="row gap-24 mt-48" style={{ flexWrap: "wrap" }}>
            <Stat n="12 años" l="en el rubro"/>
            <Stat n="34" l="comunas cubiertas"/>
            <Stat n="6 meses" l="de garantía"/>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          {/* Imagen principal */}
          <div style={{ aspectRatio: "4/5", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <img
              src="static/tecnico_cocina.jpg"
              alt="Técnico uniformado trabajando en cocina"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Floating price card */}
          <div className="hero-float" style={{
            position: "absolute", bottom: -24, left: -24,
            background: "var(--surface)", border: "1px solid var(--border)",
            padding: 16, borderRadius: "var(--radius)", boxShadow: "var(--shadow-lg)", width: 240
          }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase" }}>Visita técnica</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4 }}>
              Desde $18.000
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
              Se descuenta si aceptas la reparación.
            </div>
          </div>
          {/* Floating review */}
          <div className="hero-float" style={{
            position: "absolute", top: 24, right: -68,
            background: "var(--ink-900)", color: "#fff",
            padding: 14, borderRadius: "var(--radius)", boxShadow: "var(--shadow-lg)", width: 240
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, lineHeight: 1.4 }}>
              “Llegaron el mismo día, súper amables y el precio fue el mismo que dijeron.”
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>— Camila R., Ñuñoa</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Stat = ({ n, l }) => (
  <div>
    <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>{n}</div>
    <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>{l}</div>
  </div>
);

// ----- Logos strip -----
const LogosStrip = () => (
  <div className="wrap" style={{ padding: "24px 24px 8px" }}>
    <div style={{
      display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "16px 24px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)"
    }}>
      <span className="mono" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>
        Empresas que confían
      </span>
      {["colbún", "mall plaza", "dld", "sencorp", "patagonia"].map(l => (
        <span key={l} style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18, color: "var(--ink-500)", letterSpacing: "-0.02em", textTransform: "lowercase" }}>{l}</span>
      ))}
    </div>
  </div>
);

// ----- Services grid -----
const ServicesGrid = ({ setView }) => {
  const items = [
    { icon: "pipe", t: "Destape de cañerías", d: "Sondas eléctricas y cámara. Desde $35.000.", tag: "Más pedido" },
    { icon: "drop", t: "Reparación de fugas", d: "Ubicamos la filtración sin romper. Desde $28.000." },
    { icon: "shower", t: "Instalación de artefactos", d: "WC, lavamanos, grifería. Desde $45.000." },
    { icon: "flame", t: "Termos y calefactores", d: "Reparación e instalación. Desde $55.000." },
    { icon: "search", t: "Detección de filtraciones", d: "Cámara termográfica, sin picar muros." },
    { icon: "shield", t: "Mantención preventiva", d: "Plan trimestral para hogares y edificios." },
  ];
  return (
    <section className="section" id="servicios-home">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 32, gap: 24, flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">Qué hacemos</div>
            <h2 style={{ margin: "8px 0 0", maxWidth: 640 }}>Todo lo de agua y gas, sin letra chica.</h2>
          </div>
          <button className="btn btn--ghost" onClick={() => setView("servicios")}>
            Ver todos y cotizar <Icon name="arrow" size={14}/>
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {items.map((it, i) => (
            <article key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 180, position: "relative" }}>
              {it.tag && <span className="tag" style={{ position: "absolute", top: 16, right: 16 }}>{it.tag}</span>}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "var(--blue-50)", color: "var(--primary)",
                display: "grid", placeItems: "center"
              }}>
                <Icon name={it.icon} size={22}/>
              </div>
              <h3>{it.t}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 14 }}>{it.d}</p>
              <button className="btn btn--ghost btn--sm" style={{ alignSelf: "flex-start", marginTop: "auto" }}
                onClick={() => setView("servicios")}>
                Cotizar <Icon name="arrow" size={12}/>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----- How it works -----
const HowItWorks = () => {
  const steps = [
    { n: "01", t: "Nos cuentas", d: "Por WhatsApp, web o chat con IA. En 1 minuto sabemos qué necesitas." },
    { n: "02", t: "Te enviamos un rango", d: "Precio estimado transparente antes de que agendemos nada." },
    { n: "03", t: "Visita y reparación", d: "Técnico certificado en la ventana que elegiste. Pagas al final." },
  ];
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100 }}>
            <div className="eyebrow">Cómo funciona</div>
            <h2 className="mt-8">Tres pasos.<br/>Cero vueltas.</h2>
            <p className="muted mt-16">Transparencia desde el primer mensaje. Si no arreglamos, no cobras visita.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {steps.map(s => (
              <div key={s.n} className="card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "start" }}>
                <div className="mono" style={{ fontSize: 48, fontWeight: 500, color: "var(--accent)", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.n}</div>
                <div>
                  <h3 style={{ marginBottom: 6 }}>{s.t}</h3>
                  <p className="muted" style={{ margin: 0 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ----- Coverage map -----
const Coverage = () => {
  const comunas = [
    "Providencia", "Las Condes", "Vitacura", "Lo Barnechea", "Ñuñoa", "La Reina",
    "Santiago Centro", "Macul", "Peñalolén", "San Miguel", "La Florida", "Maipú",
    "Huechuraba", "Recoleta", "Independencia", "Estación Central", "Quinta Normal",
    "Cerrillos", "San Joaquín", "La Cisterna", "El Bosque", "Puente Alto",
    "San Bernardo", "Colina", "Lampa", "Quilicura", "Renca", "Conchalí",
    "Pudahuel", "La Granja", "San Ramón", "Pedro Aguirre Cerda", "Lo Espejo", "Padre Hurtado"
  ];
  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div className="eyebrow">Cobertura</div>
            <h2 className="mt-8">34 comunas en la Región Metropolitana.</h2>
            <p className="muted mt-16" style={{ maxWidth: 440 }}>
              Con flotas en 4 bases estratégicas: Providencia, Maipú, Puente Alto y Colina. Despachamos al técnico más cercano.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20, maxWidth: 520 }}>
              {comunas.map(c => (
                <span key={c} style={{
                  padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 999, fontSize: 12, fontWeight: 500
                }}>{c}</span>
              ))}
            </div>
          </div>
          <MapIllustration />
        </div>
      </div>
    </section>
  );
};

const MapIllustration = () => (
  <div className="map-illu" style={{
    aspectRatio: "1/1", background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)", padding: 24, position: "relative",
    backgroundImage:
      "radial-gradient(circle at 30% 40%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 40%)," +
      "radial-gradient(circle at 70% 60%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 40%)"
  }}>
    <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
      {/* grid */}
      <defs>
        <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--border)" strokeWidth=".5"/>
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#g)" />
      {/* Silueta simplificada RM */}
      <path d="M80 120 Q120 80 180 90 Q240 70 290 110 Q330 140 320 200 Q310 260 260 300 Q200 330 140 310 Q90 290 70 230 Q60 170 80 120 Z"
        fill="color-mix(in oklab, var(--primary) 12%, transparent)"
        stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 3"/>
      {/* Bases */}
      {[
        { x: 180, y: 150, l: "Providencia" },
        { x: 120, y: 220, l: "Maipú" },
        { x: 240, y: 260, l: "Puente Alto" },
        { x: 220, y: 110, l: "Colina" },
      ].map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r="20" fill="var(--accent)" opacity="0.2">
            <animate attributeName="r" values="20;34;20" dur="3s" repeatCount="indefinite" begin={`${i*.5}s`}/>
            <animate attributeName="opacity" values=".3;0;.3" dur="3s" repeatCount="indefinite" begin={`${i*.5}s`}/>
          </circle>
          <circle cx={b.x} cy={b.y} r="7" fill="var(--primary)" stroke="#fff" strokeWidth="2.5"/>
          <text x={b.x + 12} y={b.y + 4} fontSize="10" fontWeight="600" fontFamily="var(--font-body)" fill="var(--ink-900)">{b.l}</text>
        </g>
      ))}
    </svg>
    <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", gap: 12 }}>
      <span className="chip"><Icon name="truck" size={12}/> 12 camionetas</span>
      <span className="chip"><Icon name="users" size={12}/> 28 técnicos</span>
    </div>
  </div>
);

// ----- Testimonios -----
const Testimonials = () => {
  const t = [
    { name: "Camila R.", where: "Ñuñoa", q: "Se tapó el lavaplatos un domingo. Agendé por WhatsApp y llegaron en 90 minutos. Precio exacto al presupuesto.", s: 5 },
    { name: "Edificio Alcántara", where: "Las Condes", q: "Llevamos 2 años con plan de mantención. Bajaron un 40% las emergencias del edificio.", s: 5 },
    { name: "Jorge M.", where: "Maipú", q: "El termo dejó de andar en pleno invierno. Lo diagnosticaron, pidieron repuesto y al otro día listo.", s: 5 },
    { name: "Dra. Pérez", where: "Providencia", q: "Cambié toda la grifería del baño. Puntuales, limpios, y me explicaron todo. Volvería.", s: 5 },
  ];
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <div className="eyebrow">Reseñas reales</div>
        <h2 className="mt-8" style={{ maxWidth: 700 }}>“Llegan cuando dicen y cobran lo que dicen.”</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 32 }}>
          {t.map((x, i) => (
            <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 12, background: "var(--bg)" }}>
              <div style={{ display: "flex", gap: 2, color: "var(--accent)" }}>
                {[...Array(x.s)].map((_, j) => <Icon key={j} name="star" size={14}/>)}
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>"{x.q}"</p>
              <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px dashed var(--border)" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{x.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{x.where}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----- Team / fleet -----
const Team = () => (
  <section className="section">
    <div className="wrap">
      <div className="eyebrow">Quienes vamos</div>
      <h2 className="mt-8">Técnicos certificados, uniformados y con patente SEC.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 32 }}>
        {[
          { src: "static/cristian.jpg", alt: "Cristián, técnico JAPS", d: "Cristián · 14 años" },
          { src: "static/valentina.jpg", alt: "Valentina, técnica JAPS", d: "Valentina · 6 años" },
          { src: "static/rodrigo.jpg", alt: "Rodrigo, técnico JAPS", d: "Rodrigo · 9 años" },
          { src: "static/grupo.jpg", alt: "Equipo técnico junto a camioneta", d: "Flota equipada" },
        ].map((x, i) => (
          <div key={i}>
            <div style={{ aspectRatio: "3/4", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <img src={x.src} alt={x.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 10 }}>{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ----- Final CTA -----
const FinalCTA = ({ setView }) => (
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
        }}/>
        <div style={{ position: "relative" }}>
          <h2 style={{ color: "#fff", margin: 0, maxWidth: 560 }}>
            ¿Tienes una fuga <em style={{ color: "var(--accent)" }}>ahora mismo</em>?
          </h2>
          <p style={{ color: "rgba(255,255,255,.7)", marginTop: 16, fontSize: 17, maxWidth: 500 }}>
            Línea de emergencia 24/7. Respondemos en menos de 7 minutos y llegamos en 2 horas o menos.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
          <a href="tel:+56951019283" className="btn btn--accent" style={{ padding: "18px 24px", fontSize: 16 }}>
            <Icon name="phone" size={18}/> +56 9 51019283
          </a>
          <button className="btn btn--ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.2)" }}
            onClick={() => setView("agendar")}>
            Agendar para más tarde
          </button>
        </div>
      </div>
    </div>
  </section>
);

const HomeView = ({ setView, dir }) => (
  <>
    <Hero setView={setView} dir={dir}/>
    <LogosStrip />
    <ServicesGrid setView={setView}/>
    <HowItWorks />
    <Coverage />
    <Testimonials />
    <Team />
    <FinalCTA setView={setView}/>
  </>
);

Object.assign(window, { HomeView });
