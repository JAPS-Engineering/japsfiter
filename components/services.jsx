/* global React, Icon */
const { useState, useMemo } = React;

// =================== SERVICIOS / COTIZACIÓN ===================

const SERVICES = [
  {
    id: "destape", icon: "pipe", cat: "Desagües",
    t: "Destape de cañerías",
    d: "Lavaplatos, WC, lavamanos, tinas, bajadas de lluvia.",
    base: 35000, max: 95000,
    factors: [
      { id: "lugar", label: "¿Dónde está el tapón?", opts: [
        { v: "lavaplatos", l: "Lavaplatos / lavamanos", f: 1 },
        { v: "wc", l: "Inodoro / WC", f: 1.2 },
        { v: "ducha", l: "Ducha / tina", f: 1.1 },
        { v: "bajada", l: "Bajada principal", f: 1.8 },
      ]},
      { id: "urgencia", label: "¿Cuándo lo necesitas?", opts: [
        { v: "ahora", l: "Ahora (emergencia)", f: 1.5 },
        { v: "hoy", l: "Hoy", f: 1.15 },
        { v: "prog", l: "Programar", f: 1 },
      ]},
    ],
  },
  {
    id: "fugas", icon: "drop", cat: "Agua",
    t: "Reparación de fugas",
    d: "Cañerías, uniones, llaves que gotean.",
    base: 28000, max: 140000,
    factors: [
      { id: "ubic", label: "¿Dónde es la fuga?", opts: [
        { v: "visible", l: "Visible (llave, unión)", f: 1 },
        { v: "muro", l: "Dentro de muro", f: 2.2 },
        { v: "piso", l: "Bajo el piso", f: 2.8 },
        { v: "jardin", l: "Jardín / exterior", f: 1.6 },
      ]},
    ],
  },
  {
    id: "instalacion", icon: "shower", cat: "Artefactos",
    t: "Instalación de artefactos",
    d: "WC, lavamanos, grifería, lavavajillas.",
    base: 45000, max: 180000,
    factors: [
      { id: "tipo", label: "¿Qué vas a instalar?", opts: [
        { v: "griferia", l: "Grifería (llave)", f: 1 },
        { v: "wc", l: "WC completo", f: 1.6 },
        { v: "lavamanos", l: "Lavamanos", f: 1.4 },
        { v: "lavavajillas", l: "Lavavajillas", f: 2.0 },
      ]},
      { id: "cant", label: "¿Cuántos?", opts: [
        { v: "1", l: "1", f: 1 },
        { v: "2", l: "2", f: 1.7 },
        { v: "3+", l: "3 o más", f: 2.3 },
      ]},
    ],
  },
  {
    id: "termos", icon: "flame", cat: "Gas",
    t: "Termos y calefactores",
    d: "Reparación, mantención e instalación.",
    base: 55000, max: 220000,
    factors: [
      { id: "acc", label: "¿Qué necesitas?", opts: [
        { v: "revision", l: "Revisión / diagnóstico", f: 1 },
        { v: "mant", l: "Mantención completa", f: 1.6 },
        { v: "rep", l: "Reparación con repuestos", f: 2.4 },
        { v: "inst", l: "Instalación nueva", f: 3.2 },
      ]},
    ],
  },
  {
    id: "deteccion", icon: "search", cat: "Diagnóstico",
    t: "Detección de filtraciones",
    d: "Cámara termográfica, sin picar muros.",
    base: 48000, max: 85000,
    factors: [
      { id: "area", label: "¿Área aproximada?", opts: [
        { v: "chica", l: "Un baño / cocina", f: 1 },
        { v: "media", l: "Hasta 50 m²", f: 1.4 },
        { v: "grande", l: "Más de 50 m²", f: 1.8 },
      ]},
    ],
  },
  {
    id: "preventiva", icon: "shield", cat: "Plan",
    t: "Mantención preventiva",
    d: "Revisión trimestral programada.",
    base: 75000, max: 180000,
    factors: [
      { id: "plan", label: "Tipo de propiedad", opts: [
        { v: "depto", l: "Depto / casa", f: 1 },
        { v: "casa-g", l: "Casa grande", f: 1.6 },
        { v: "edif", l: "Edificio completo", f: 2.4 },
      ]},
    ],
  },
  {
    id: "emergencia", icon: "clock", cat: "24/7",
    t: "Emergencia 24/7",
    d: "Fugas mayores, cortes de agua, sin gas.",
    base: 68000, max: 240000,
    factors: [
      { id: "hora", label: "¿Qué hora es?", opts: [
        { v: "dia", l: "Horario hábil (9–19)", f: 1 },
        { v: "tarde", l: "Tarde/noche (19–23)", f: 1.4 },
        { v: "madr", l: "Madrugada (23–7)", f: 1.8 },
        { v: "fin", l: "Fin de semana / feriado", f: 1.5 },
      ]},
    ],
  },
];

const fmt = (n) => "$" + Math.round(n / 1000) * 1000 > 0
  ? "$" + Math.round(n / 1000).toLocaleString("es-CL") + ".000"
  : "$0";

const QuoteBuilder = ({ service, onBack, onAgendar }) => {
  const [answers, setAnswers] = useState({});
  const [contacto, setContacto] = useState({ nombre: "", tel: "", comuna: "", detalle: "" });
  const [sent, setSent] = useState(false);

  const range = useMemo(() => {
    let mult = 1;
    service.factors.forEach(f => {
      const a = answers[f.id];
      const opt = f.opts.find(o => o.v === a);
      if (opt) mult *= opt.f;
    });
    const answered = service.factors.every(f => answers[f.id]);
    const low = Math.round(service.base * mult);
    const high = Math.round(low * 1.4);
    return { low, high, answered };
  }, [answers, service]);

  if (sent) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 48, maxWidth: 560, margin: "0 auto" }}>
        <div style={{ width: 60, height: 60, margin: "0 auto 20px", borderRadius: 999, background: "color-mix(in oklab, var(--good) 15%, transparent)", color: "var(--good)", display: "grid", placeItems: "center" }}>
          <Icon name="check" size={28}/>
        </div>
        <h3 style={{ fontSize: 24 }}>Listo, {contacto.nombre.split(" ")[0] || "estamos en eso"}.</h3>
        <p className="muted">Te escribimos por WhatsApp al <strong>{contacto.tel}</strong> en menos de 7 minutos con el presupuesto afinado y los horarios disponibles.</p>
        <div style={{ margin: "24px 0", padding: 16, background: "var(--surface-2)", borderRadius: 12, textAlign: "left" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Tu solicitud</div>
          <div style={{ fontWeight: 600 }}>{service.t}</div>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Rango estimado: ${(range.low/1000).toLocaleString("es-CL")}.000 – ${(range.high/1000).toLocaleString("es-CL")}.000</div>
        </div>
        <div className="row gap-12" style={{ justifyContent: "center" }}>
          <button className="btn btn--primary" onClick={onAgendar}>Agendar ahora <Icon name="arrow" size={14}/></button>
          <button className="btn btn--ghost" onClick={onBack}>Cotizar otro servicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="svc-split" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 32 }}>
      <div>
        <button onClick={onBack} className="btn btn--ghost btn--sm" style={{ marginBottom: 24 }}>
          ← Volver a servicios
        </button>
        <div className="row gap-12" style={{ marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--blue-50)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
            <Icon name={service.icon} size={28}/>
          </div>
          <div>
            <div className="eyebrow">{service.cat}</div>
            <h2 style={{ margin: 0, fontSize: 36 }}>{service.t}</h2>
          </div>
        </div>
        <p className="muted">{service.d}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32 }}>
          {service.factors.map((f, fi) => (
            <div key={f.id}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--ink-700)" }}>
                <span className="mono" style={{ color: "var(--accent)", marginRight: 8 }}>0{fi+1}</span>
                {f.label}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {f.opts.map(o => {
                  const sel = answers[f.id] === o.v;
                  return (
                    <button key={o.v}
                      className="btn btn--ghost btn--sm"
                      onClick={() => setAnswers(a => ({ ...a, [f.id]: o.v }))}
                      style={{
                        background: sel ? "var(--primary)" : "var(--surface)",
                        color: sel ? "var(--primary-ink)" : "var(--text)",
                        borderColor: sel ? "var(--primary)" : "var(--border)",
                      }}>
                      {sel && <Icon name="check" size={12}/>} {o.l}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px dashed var(--border)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: "var(--ink-700)" }}>
            <span className="mono" style={{ color: "var(--accent)", marginRight: 8 }}>0{service.factors.length + 1}</span>
            Tus datos para afinar y coordinar
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label>Nombre</label>
              <input value={contacto.nombre} onChange={e => setContacto({ ...contacto, nombre: e.target.value })} placeholder="Camila González"/>
            </div>
            <div className="field">
              <label>WhatsApp</label>
              <input value={contacto.tel} onChange={e => setContacto({ ...contacto, tel: e.target.value })} placeholder="+56 9 ..."/>
            </div>
            <div className="field">
              <label>Comuna</label>
              <select value={contacto.comuna} onChange={e => setContacto({ ...contacto, comuna: e.target.value })}>
                <option value="">Elegir comuna...</option>
                {["Providencia","Ñuñoa","Las Condes","Vitacura","Santiago","Maipú","La Florida","Puente Alto","Otra"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>¿Algo más?</label>
              <input value={contacto.detalle} onChange={e => setContacto({ ...contacto, detalle: e.target.value })} placeholder="Opcional"/>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky summary */}
      <div>
        <div style={{ position: "sticky", top: 100 }}>
          <div className="card" style={{ background: "var(--ink-900)", color: "#fff", border: "none", padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase" }}>
              Rango estimado
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 8 }}>
              {range.answered ? (
                <>${(range.low/1000).toLocaleString("es-CL")}K – ${(range.high/1000).toLocaleString("es-CL")}K</>
              ) : (
                <span style={{ color: "rgba(255,255,255,.5)", fontSize: 24 }}>Responde para ver rango</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 6 }}>
              Precio final se confirma en visita. Si no reparamos, no cobramos.
            </div>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px dashed rgba(255,255,255,.15)", display: "flex", flexDirection: "column", gap: 10 }}>
              <IncItem text="Diagnóstico in-situ sin costo adicional"/>
              <IncItem text="Técnico certificado y uniformado"/>
              <IncItem text="6 meses de garantía escrita"/>
              <IncItem text="Boleta o factura al final"/>
            </div>

            <button
              className="btn btn--accent"
              style={{ width: "100%", marginTop: 24, padding: 16 }}
              disabled={!range.answered || !contacto.nombre || !contacto.tel}
              onClick={() => setSent(true)}>
              Enviar solicitud <Icon name="arrow" size={14}/>
            </button>

            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 12, textAlign: "center" }}>
              Respuesta por WhatsApp en &lt; 7 min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IncItem = ({ text }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
    <div style={{ color: "var(--accent)" }}><Icon name="check" size={14}/></div>
    {text}
  </div>
);

const ServicesView = ({ setView }) => {
  const [selected, setSelected] = useState(null);
  if (selected) {
    return (
      <div className="section"><div className="wrap">
        <QuoteBuilder
          service={selected}
          onBack={() => setSelected(null)}
          onAgendar={() => setView("agendar")}
        />
      </div></div>
    );
  }
  return (
    <div className="section">
      <div className="wrap">
        <div style={{ maxWidth: 720, marginBottom: 40 }}>
          <div className="eyebrow">Servicios y cotización</div>
          <h2 style={{ margin: "8px 0 16px" }}>Elige lo que necesitas y te damos un rango al tiro.</h2>
          <p className="muted" style={{ fontSize: 17 }}>
            Responde 2–3 preguntas y ves el rango estimado. Luego afinamos por WhatsApp antes de agendar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {SERVICES.map(s => (
            <button key={s.id} onClick={() => setSelected(s)}
              className="card"
              style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 10, minHeight: 200, transition: "transform .15s, box-shadow .2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-50)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
                  <Icon name={s.icon} size={22}/>
                </div>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600 }}>{s.cat}</span>
              </div>
              <h3>{s.t}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 14 }}>{s.d}</p>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>Desde</div>
                  <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>${(s.base/1000).toLocaleString("es-CL")}.000</div>
                </div>
                <div style={{ color: "var(--primary)" }}><Icon name="arrow" size={18}/></div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: 24, background: "var(--surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", display: "flex", gap: 24, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div className="row gap-16">
            <Icon name="sparkle" size={24} />
            <div>
              <div style={{ fontWeight: 600 }}>¿No sabes qué servicio es?</div>
              <div className="muted" style={{ fontSize: 14 }}>Cuéntale a nuestra IA qué pasa y te decimos.</div>
            </div>
          </div>
          <button className="btn btn--dark" onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}>
            Abrir diagnóstico IA
          </button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ServicesView });
