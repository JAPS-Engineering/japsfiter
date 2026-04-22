/* global React, Icon */
const { useState, useMemo } = React;

// =================== AGENDAMIENTO (estilo GoHighLevel) ===================

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DIAS_SEMANA = ["lun","mar","mié","jue","vie","sáb","dom"];

// Simulamos disponibilidad: unos días completos, otros parciales, otros sin slots
const slotsForDay = (year, month, day) => {
  const seed = (year + month + day) % 7;
  const all = ["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  if (seed === 0) return []; // sin disponibilidad
  if (seed === 1) return all.slice(0, 3);
  if (seed === 2) return all.slice(4, 8);
  if (seed === 3) return [...all.slice(0,2), ...all.slice(6,9)];
  return all;
};

const Calendar = ({ year, month, setYM, selected, setSelected }) => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // lunes = 0
  const startOffset = (firstDay.getDay() + 6) % 7;
  const today = new Date();
  const isToday = (d) => year === today.getFullYear() && month === today.getMonth() && d === today.getDate();
  const isPast = (d) => {
    const dt = new Date(year, month, d);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dt < t;
  };

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const prev = () => {
    if (month === 0) setYM(year - 1, 11);
    else setYM(year, month - 1);
  };
  const next = () => {
    if (month === 11) setYM(year + 1, 0);
    else setYM(year, month + 1);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em" }}>{MESES[month]} {year}</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Selecciona un día con disponibilidad</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn--ghost btn--sm" onClick={prev} aria-label="Mes anterior">←</button>
          <button className="btn btn--ghost btn--sm" onClick={() => setYM(today.getFullYear(), today.getMonth())}>Hoy</button>
          <button className="btn btn--ghost btn--sm" onClick={next} aria-label="Siguiente mes">→</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 8 }}>
        {DIAS_SEMANA.map(d => (
          <div key={d} style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", padding: "6px 0" }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {cells.map((d, i) => {
          if (d === null) return <div key={i}/>;
          const slots = slotsForDay(year, month, d);
          const past = isPast(d);
          const avail = slots.length;
          const isSel = selected && selected.y === year && selected.m === month && selected.d === d;
          const disabled = past || avail === 0;
          const intensity = avail === 0 ? 0 : avail < 4 ? 1 : avail < 7 ? 2 : 3;
          const bg = disabled ? "transparent"
            : isSel ? "var(--primary)"
            : intensity === 1 ? "color-mix(in oklab, var(--accent) 18%, var(--surface))"
            : intensity === 2 ? "color-mix(in oklab, var(--good) 12%, var(--surface))"
            : "color-mix(in oklab, var(--good) 22%, var(--surface))";
          const color = isSel ? "var(--primary-ink)" : disabled ? "var(--ink-300)" : "var(--text)";

          return (
            <button key={i}
              disabled={disabled}
              onClick={() => setSelected({ y: year, m: month, d })}
              style={{
                aspectRatio: "1/1",
                background: bg,
                border: "1px solid " + (isSel ? "var(--primary)" : disabled ? "transparent" : "var(--border)"),
                borderRadius: 10,
                color,
                cursor: disabled ? "not-allowed" : "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: 4, gap: 2,
                position: "relative",
                fontFamily: "var(--font-body)",
                transition: "transform .12s ease, box-shadow .2s ease",
              }}
              onMouseEnter={e => { if (!disabled && !isSel) e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: 16, fontWeight: isToday(d) ? 700 : 500, textDecoration: isToday(d) ? "underline" : "none", textUnderlineOffset: 3 }}>
                {d}
              </div>
              {!disabled && (
                <div style={{ fontSize: 10, opacity: isSel ? 0.9 : 0.7, fontWeight: 500 }}>
                  {avail} hrs
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 20, fontSize: 11, color: "var(--muted)", flexWrap: "wrap" }}>
        <LegendDot color="color-mix(in oklab, var(--good) 22%, var(--surface))" label="Muy disponible"/>
        <LegendDot color="color-mix(in oklab, var(--good) 12%, var(--surface))" label="Disponible"/>
        <LegendDot color="color-mix(in oklab, var(--accent) 18%, var(--surface))" label="Pocos cupos"/>
        <LegendDot color="transparent" label="Sin cupos / pasado" border/>
      </div>
    </div>
  );
};

const LegendDot = ({ color, label, border }) => (
  <div className="row gap-8">
    <div style={{ width: 14, height: 14, borderRadius: 4, background: color, border: border ? "1px solid var(--border)" : "none" }}/>
    <span>{label}</span>
  </div>
);

// =================== TIMESLOTS ===================

const Timeslots = ({ selected, time, setTime }) => {
  if (!selected) {
    return (
      <div style={{ padding: 32, textAlign: "center", color: "var(--muted)", fontSize: 14, border: "1px dashed var(--border)", borderRadius: 12 }}>
        Elige un día del calendario para ver los horarios.
      </div>
    );
  }
  const slots = slotsForDay(selected.y, selected.m, selected.d);
  const d = new Date(selected.y, selected.m, selected.d);
  const label = d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });

  const morning = slots.filter(s => parseInt(s) < 12);
  const afternoon = slots.filter(s => parseInt(s) >= 12);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, textTransform: "capitalize" }}>
        {label}
      </div>
      {morning.length > 0 && <SlotGroup title="Mañana" slots={morning} time={time} setTime={setTime}/>}
      {afternoon.length > 0 && <SlotGroup title="Tarde" slots={afternoon} time={time} setTime={setTime}/>}
    </div>
  );
};

const SlotGroup = ({ title, slots, time, setTime }) => (
  <div style={{ marginBottom: 20 }}>
    <div className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 10 }}>
      {title}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {slots.map(s => {
        const sel = time === s;
        return (
          <button key={s}
            onClick={() => setTime(s)}
            style={{
              padding: "10px 12px",
              background: sel ? "var(--primary)" : "var(--surface)",
              color: sel ? "var(--primary-ink)" : "var(--text)",
              border: "1px solid " + (sel ? "var(--primary)" : "var(--border)"),
              borderRadius: 8,
              fontSize: 14, fontWeight: 600,
              cursor: "pointer",
              transition: "all .15s"
            }}>
            {s}
          </button>
        );
      })}
    </div>
  </div>
);

// =================== AGENDAR VIEW ===================

const AgendarView = ({ setView }) => {
  const today = new Date();
  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(null);
  const [servicio, setServicio] = useState("");
  const [tipo, setTipo] = useState("programada");
  const [step, setStep] = useState(1);
  const [contacto, setContacto] = useState({ nombre: "", tel: "", direccion: "", comuna: "", notas: "" });
  const [done, setDone] = useState(false);

  const canConfirm = selected && time && servicio && contacto.nombre && contacto.tel && contacto.direccion;

  const dateLabel = selected
    ? new Date(selected.y, selected.m, selected.d).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" })
    : "—";

  if (done) {
    return (
      <div className="section" style={{ minHeight: "70vh" }}>
        <div className="wrap">
          <div className="card" style={{ textAlign: "center", padding: 64, maxWidth: 600, margin: "0 auto" }}>
            <div style={{ width: 72, height: 72, margin: "0 auto 24px", borderRadius: 999,
              background: "color-mix(in oklab, var(--good) 15%, transparent)", color: "var(--good)",
              display: "grid", placeItems: "center" }}>
              <Icon name="check" size={36}/>
            </div>
            <h2 style={{ marginTop: 0 }}>Visita confirmada ✨</h2>
            <p className="muted" style={{ fontSize: 17 }}>
              Te esperamos el <strong style={{ color: "var(--text)", textTransform: "capitalize" }}>{dateLabel}</strong> a las <strong style={{ color: "var(--text)" }}>{time}</strong>.
            </p>
            <div style={{ margin: "24px 0", padding: 20, background: "var(--surface-2)", borderRadius: 12, textAlign: "left", display: "flex", flexDirection: "column", gap: 10 }}>
              <Row l="Servicio" v={servicio}/>
              <Row l="Dirección" v={`${contacto.direccion}, ${contacto.comuna}`}/>
              <Row l="Contacto" v={`${contacto.nombre} · ${contacto.tel}`}/>
              <Row l="Modalidad" v={tipo === "emergencia" ? "Emergencia" : "Programada"}/>
            </div>
            <p className="muted" style={{ fontSize: 14 }}>
              Recibirás confirmación por WhatsApp y un recordatorio 1 hora antes.<br/>
              ¿Necesitas cambiar algo? Respóndenos ahí mismo.
            </p>
            <div className="row gap-12 mt-24" style={{ justifyContent: "center" }}>
              <button className="btn btn--primary" onClick={() => setView("home")}>Volver al inicio</button>
              <button className="btn btn--ghost" onClick={() => { setDone(false); setStep(1); setSelected(null); setTime(null); }}>
                Agendar otra
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="wrap">
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow">Agendar visita</div>
          <h2 style={{ margin: "8px 0 12px" }}>Elige el día y hora que te acomode.</h2>
          <p className="muted" style={{ fontSize: 17, maxWidth: 620 }}>
            Ventanas de 1 hora. Te avisamos 30 minutos antes cuando el técnico salga para allá.
          </p>
        </div>

        {/* Stepper */}
        <div className="row gap-16 stepper-row" style={{ marginBottom: 32 }}>
          {["Servicio", "Día y hora", "Confirmar"].map((s, i) => (
            <div key={s} className="row gap-8">
              <div style={{
                width: 28, height: 28, borderRadius: 999,
                background: step > i ? "var(--good)" : step === i + 1 ? "var(--primary)" : "var(--surface)",
                color: step >= i + 1 ? "#fff" : "var(--muted)",
                border: "1px solid " + (step >= i + 1 ? "transparent" : "var(--border)"),
                display: "grid", placeItems: "center", fontSize: 13, fontWeight: 600,
              }}>{step > i ? "✓" : i + 1}</div>
              <span style={{ fontSize: 14, fontWeight: step === i + 1 ? 600 : 400, color: step >= i + 1 ? "var(--text)" : "var(--muted)" }}>
                {s}
              </span>
              {i < 2 && <div style={{ width: 32, height: 1, background: "var(--border)" }}/>}
            </div>
          ))}
        </div>

        <div className="svc-split" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32, alignItems: "start" }}>
          <div className="card" style={{ padding: 28 }}>
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>¿Qué necesitas?</h3>
                <p className="muted" style={{ fontSize: 14 }}>Elige el servicio y la modalidad.</p>

                <div className="mt-24">
                  <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Modalidad</div>
                  <div className="row gap-8">
                    {[
                      { id: "programada", l: "Programada", d: "Cualquier día hábil" },
                      { id: "emergencia", l: "Emergencia", d: "Hoy / ahora" },
                    ].map(t => {
                      const sel = tipo === t.id;
                      return (
                        <button key={t.id} onClick={() => setTipo(t.id)}
                          style={{
                            flex: 1, padding: 16, borderRadius: 12, textAlign: "left",
                            background: sel ? "var(--surface-2)" : "var(--surface)",
                            border: "1.5px solid " + (sel ? "var(--primary)" : "var(--border)"),
                            cursor: "pointer"
                          }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontWeight: 600 }}>{t.l}</div>
                            {sel && <Icon name="check" size={16}/>}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{t.d}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-24">
                  <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Servicio</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {["Destape", "Fuga / filtración", "Instalación artefactos", "Termo / calefactor", "Mantención", "Otro"].map(s => {
                      const sel = servicio === s;
                      return (
                        <button key={s} onClick={() => setServicio(s)}
                          style={{
                            padding: "12px 14px", textAlign: "left", borderRadius: 10,
                            background: sel ? "var(--primary)" : "var(--surface)",
                            color: sel ? "var(--primary-ink)" : "var(--text)",
                            border: "1px solid " + (sel ? "var(--primary)" : "var(--border)"),
                            fontWeight: 500, fontSize: 14, cursor: "pointer"
                          }}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button className="btn btn--primary mt-24" disabled={!servicio} onClick={() => setStep(2)}
                  style={{ opacity: servicio ? 1 : .5 }}>
                  Continuar <Icon name="arrow" size={14}/>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="cal-split" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
                <Calendar
                  year={ym.y} month={ym.m}
                  setYM={(y, m) => setYm({ y, m })}
                  selected={selected} setSelected={setSelected}
                />
                <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 24 }}>
                  <Timeslots selected={selected} time={time} setTime={setTime}/>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="row gap-12 mt-24" style={{ justifyContent: "space-between" }}>
                <button className="btn btn--ghost" onClick={() => setStep(1)}>← Atrás</button>
                <button className="btn btn--primary" disabled={!selected || !time} onClick={() => setStep(3)}
                  style={{ opacity: selected && time ? 1 : .5 }}>
                  Continuar <Icon name="arrow" size={14}/>
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>Tus datos</h3>
                <p className="muted" style={{ fontSize: 14 }}>Para coordinar la visita.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
                  <div className="field"><label>Nombre</label>
                    <input value={contacto.nombre} onChange={e => setContacto({ ...contacto, nombre: e.target.value })} placeholder="Camila González"/>
                  </div>
                  <div className="field"><label>WhatsApp</label>
                    <input value={contacto.tel} onChange={e => setContacto({ ...contacto, tel: e.target.value })} placeholder="+56 9 ..."/>
                  </div>
                  <div className="field" style={{ gridColumn: "span 2" }}><label>Dirección</label>
                    <input value={contacto.direccion} onChange={e => setContacto({ ...contacto, direccion: e.target.value })} placeholder="Av. Providencia 2345, depto 501"/>
                  </div>
                  <div className="field"><label>Comuna</label>
                    <select value={contacto.comuna} onChange={e => setContacto({ ...contacto, comuna: e.target.value })}>
                      <option value="">Elegir...</option>
                      {["Providencia","Ñuñoa","Las Condes","Vitacura","Santiago","Maipú","La Florida","Puente Alto"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>¿Hay mascotas?</label>
                    <select><option>No</option><option>Sí, gato</option><option>Sí, perro</option></select>
                  </div>
                  <div className="field" style={{ gridColumn: "span 2" }}><label>Notas para el técnico</label>
                    <textarea value={contacto.notas} onChange={e => setContacto({ ...contacto, notas: e.target.value })} placeholder="Ej: el conserje tiene la llave del medidor"/>
                  </div>
                </div>
                <div className="row gap-12 mt-24" style={{ justifyContent: "space-between" }}>
                  <button className="btn btn--ghost" onClick={() => setStep(2)}>← Atrás</button>
                  <button className="btn btn--primary" disabled={!canConfirm} onClick={() => setDone(true)}
                    style={{ opacity: canConfirm ? 1 : .5 }}>
                    Confirmar visita <Icon name="check" size={14}/>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div style={{ position: "sticky", top: 100 }}>
            <div className="card" style={{ padding: 24, background: "var(--surface)" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>
                Resumen
              </div>
              <SumRow l="Servicio" v={servicio || "—"}/>
              <SumRow l="Modalidad" v={tipo === "emergencia" ? "Emergencia" : "Programada"}/>
              <SumRow l="Día" v={selected ? dateLabel : "—"} cap/>
              <SumRow l="Hora" v={time || "—"}/>
              <SumRow l="Dirección" v={contacto.direccion ? `${contacto.direccion}, ${contacto.comuna}` : "—"}/>

              <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 14, marginTop: 14 }}>
                <div className="row gap-8" style={{ fontSize: 13 }}>
                  <Icon name="shield" size={14}/> Sin costo hasta confirmar
                </div>
                <div className="row gap-8" style={{ fontSize: 13, marginTop: 6 }}>
                  <Icon name="clock" size={14}/> Cambia o cancela hasta 2hrs antes
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: 18, background: "var(--ink-900)", color: "#fff", borderRadius: "var(--radius)" }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>¿Emergencia ahora mismo?</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginBottom: 12 }}>
                Llama directo, tenemos técnico de turno.
              </div>
              <a href="tel:+56974322118" className="btn btn--accent btn--sm" style={{ width: "100%" }}>
                <Icon name="phone" size={14}/> +56 9 7432 2118
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ l, v }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
    <span className="muted">{l}</span>
    <strong style={{ textTransform: l === "Día" ? "capitalize" : "none" }}>{v}</strong>
  </div>
);

const SumRow = ({ l, v, cap }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed var(--border)", fontSize: 13 }}>
    <span className="muted">{l}</span>
    <span style={{ fontWeight: 600, textAlign: "right", maxWidth: "60%", textTransform: cap ? "capitalize" : "none" }}>{v}</span>
  </div>
);

Object.assign(window, { AgendarView });
