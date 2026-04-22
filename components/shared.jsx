/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// =================== SHARED ATOMS ===================

const Logo = ({ size = 64 }) => (
  <div className="logo">
    <div
      className="logo__mark"
      style={{ width: size, height: size, background: "var(--bg)", border: "0px solid var(--border)" }}
    >
      <img
        src="static/logo.png"
        alt="Logo JAPSfiter"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
    <span>JAPSfiter</span>
  </div>
);

const Icon = ({ name, size = 20 }) => {
  const P = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    drop: <><path d="M12 3s6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 6-12 6-12z" /></>,
    pipe: <><path d="M3 8h8a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h4" /><path d="M7 5v6M17 13v6" /></>,
    wrench: <><path d="M14.5 4a4 4 0 0 1 3.9 5L21 11.6 19.6 13 17 10.4a4 4 0 1 1-2.5-6.4z" /><path d="M13 11 4 20l2 2 9-9" /></>,
    flame: <><path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 1 1 1.5 2 1.5 0-2 0-4 1-6.5z" /></>,
    shower: <><path d="M12 4v4M6 10h12M7 14v.01M10 14v.01M13 14v.01M16 14v.01M8 18v.01M11 18v.01M14 18v.01" /></>,
    shield: <><path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></>,
    pin: <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
    star: <><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z" /></>,
    arrow: <><path d="M5 12h14M13 5l7 7-7 7" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    whatsapp: <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.7 12.3c-.2.6-1.2 1.1-1.7 1.2-.5 0-1 .2-3-.6-2.5-.9-4-3.3-4.2-3.5-.1-.1-1-1.3-1-2.6 0-1.2.7-1.8 1-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8 0 .1 0 .2-.1.4-.1.1-.2.3-.3.4l-.3.3c-.1.1-.2.2-.1.4.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.5 0 .6-.1l1-1.2c.2-.3.4-.2.6-.1l1.7.8c.2.1.4.2.5.3.1.2.1.7-.1 1.1z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><circle cx="17" cy="7" r="3"/><path d="M15 14c3 0 7 2 7 6"/></>,
    truck: <><rect x="2" y="7" width="12" height="9" rx="1"/><path d="M14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></>,
  };
  return <svg {...P}>{paths[name] || null}</svg>;
};

// =================== NAV ===================

const Nav = ({ view, setView, onOpenTweaks }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  const items = [
    { id: "home", label: "Inicio" },
    { id: "servicios", label: "Servicios y cotización" },
    { id: "agendar", label: "Agendar" },
    { id: "nosotros", label: "Nosotros" },
  ];
  const go = (id) => { setView(id); setMenuOpen(false); };
  const menu = (
    <div className={"mobile-menu " + (menuOpen ? "open" : "")}>
      <div className="mobile-menu__top">
        <Logo/>
        <button className="nav__burger" style={{ display: "inline-flex" }} onClick={() => setMenuOpen(false)} aria-label="Cerrar">
          <Icon name="close" size={20}/>
        </button>
      </div>
      {items.map(it => (
        <button key={it.id}
          className={"mobile-menu__link " + (view === it.id ? "active" : "")}
          onClick={() => go(it.id)}>
          {it.label}
          <Icon name="arrow" size={18}/>
        </button>
      ))}
      <div style={{ marginTop: "auto", paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="btn btn--primary" onClick={() => go("agendar")}>
          Pedir visita <Icon name="arrow" size={14}/>
        </button>
        <a href="tel:+56974322118" className="btn btn--ghost">
          <Icon name="phone" size={14}/> +56 9 7432 2118
        </a>
        <span className="chip" style={{ alignSelf: "center", marginTop: 8 }}>
          <span className="dot"/> En línea 24/7
        </span>
      </div>
    </div>
  );
  return (
    <>
      <header className={"nav " + (scrolled ? "scrolled" : "")}>
        <div className="wrap nav__inner">
          <button onClick={() => go("home")} style={{ display: "inline-flex" }}>
            <Logo />
          </button>
          <nav className="nav__links">
            {items.map(it => (
              <button key={it.id}
                className={"nav__link " + (view === it.id ? "active" : "")}
                onClick={() => setView(it.id)}>
                {it.label}
              </button>
            ))}
          </nav>
          <div className="row gap-8">
            <span className="chip"><span className="dot" /> En línea 24/7</span>
            <button className="btn btn--primary btn--sm" onClick={() => setView("agendar")}>
              Pedir visita
            </button>
            <button className="nav__burger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
              <Icon name="menu" size={20}/>
            </button>
          </div>
        </div>
      </header>
      {ReactDOM.createPortal(menu, document.body)}
    </>
  );
};

// =================== FOOTER ===================

const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer__grid">
        <div>
          <Logo />
          <p className="muted mt-16" style={{ maxWidth: 360 }}>
            Gasfiteres de confianza para hogares y empresas en la Región Metropolitana. Técnicos certificados, trabajo garantizado por 6 meses.
          </p>
          <div className="row gap-8 mt-16">
            <span className="chip"><Icon name="shield" size={14}/> Empresa formal</span>
            <span className="chip"><Icon name="star" size={14}/> 4.9 · 2.3k reseñas</span>
          </div>
        </div>
        <div>
          <h4>Servicios</h4>
          <ul>
            <li>Destape</li><li>Fugas</li><li>Instalaciones</li><li>Emergencia 24/7</li><li>Termos</li>
          </ul>
        </div>
        <div>
          <h4>Compañía</h4>
          <ul>
            <li>Nosotros</li><li>Cobertura</li><li>Trabaja con nosotros</li><li>Blog</li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li>+56 9 7432 2118</li><li>contacto.demo@japs.ing</li><li>Providencia, RM</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Japsfiter SpA · Rut 77.432.118-K</span>
        <span>Hecho con ☕ en Santiago</span>
      </div>
    </div>
  </footer>
);

// =================== FLOATING ===================

const WAFloat = () => (
  <a href="#" className="wa-float" aria-label="WhatsApp" onClick={e => e.preventDefault()}>
    <Icon name="whatsapp" size={28} />
  </a>
);

const AIChatButton = ({ onOpen }) => (
  <button className="ai-btn" onClick={onOpen}>
    <span className="ai-dot" />
    Diagnóstico rápido con IA
  </button>
);

// =================== AI CHAT MODAL ===================

const AIChat = ({ open, onClose, setView }) => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hola 👋 cuéntame qué está pasando. Ej: \"se tapó el WC\", \"gotea la llave del baño\", \"no sale agua caliente\"." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollTo(0, endRef.current.scrollHeight); }, [messages, thinking]);

  const send = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setThinking(true);
    try {
      const prompt = `Eres "Japsi", asistente de una empresa de gasfitería chilena llamada Japsfiter. Responde en máximo 4 frases, en chileno cercano pero sin modismos confusos. El cliente dice: "${userMsg}". Dale: (1) diagnóstico probable, (2) 1 cosa que puede hacer ya, (3) rango estimado en CLP (entre 25.000 y 180.000), (4) sugerencia de agendar visita. Sin listas ni markdown.`;
      const res = await window.claude.complete(prompt);
      setMessages(m => [...m, { role: "ai", text: res, cta: true }]);
    } catch {
      setMessages(m => [...m, { role: "ai", text: "Tuve un problema conectándome. Mientras, te recomiendo agendar una visita — cobramos $0 si no reparamos.", cta: true }]);
    }
    setThinking(false);
  };

  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 70, background: "rgba(7,17,41,.45)",
      display: "grid", placeItems: "flex-end", padding: 24
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(420px, 100%)", background: "var(--surface)",
        border: "1px solid var(--border)", borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column",
        maxHeight: "80vh", overflow: "hidden", marginLeft: "auto"
      }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "var(--primary)",
            color: "var(--accent)", display: "grid", placeItems: "center"
          }}>
            <Icon name="sparkle" size={18}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Japsi · Diagnóstico IA</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Responde en segundos</div>
          </div>
          <button onClick={onClose}><Icon name="close" size={18}/></button>
        </div>
        <div ref={endRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, background: "var(--surface-2)" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
              <div style={{
                background: m.role === "user" ? "var(--primary)" : "var(--surface)",
                color: m.role === "user" ? "var(--primary-ink)" : "var(--text)",
                padding: "10px 14px", borderRadius: 14,
                border: m.role === "user" ? "none" : "1px solid var(--border)",
                fontSize: 14, lineHeight: 1.45,
                whiteSpace: "pre-wrap"
              }}>
                {m.text}
              </div>
              {m.cta && (
                <button className="btn btn--accent btn--sm" style={{ marginTop: 8 }}
                  onClick={() => { setView("agendar"); onClose(); }}>
                  Agendar visita <Icon name="arrow" size={14} />
                </button>
              )}
            </div>
          ))}
          {thinking && (
            <div style={{ alignSelf: "flex-start", background: "var(--surface)", border: "1px solid var(--border)", padding: "10px 14px", borderRadius: 14 }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>Japsi escribiendo<span className="ai-dot" style={{ display: "inline-block", marginLeft: 6 }}/></span>
            </div>
          )}
        </div>
        <form onSubmit={send} style={{ padding: 12, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ej: se tapó el WC"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, outline: "none" }}
          />
          <button type="submit" className="btn btn--primary btn--sm" disabled={!input.trim()}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

// export
Object.assign(window, { Logo, Icon, Nav, Footer, WAFloat, AIChatButton, AIChat });
