/* global React, Icon */
const { useState, useEffect } = React;

const BOOKING_IFRAME_SRC =
  "https://api.one.japs.ing/widget/booking/9MlZ3fybEGTQPB8oc4bI";
const BOOKING_SCRIPT_SRC = "https://api.one.japs.ing/js/form_embed.js";
const BOOKING_IFRAME_ID = "9MlZ3fybEGTQPB8oc4bI_1776881513847";

const buildBookingSrc = (servicio) => {
  const url = new URL(BOOKING_IFRAME_SRC);
  if (servicio) {
    url.searchParams.set("Servicio", servicio);
  }
  return url.toString();
};

const BookingWidget = ({ servicio }) => {
  const iframeSrc = buildBookingSrc(servicio);

  useEffect(() => {
    const alreadyLoaded = document.querySelector(
      `script[src="${BOOKING_SCRIPT_SRC}"]`,
    );
    if (alreadyLoaded) return;

    const script = document.createElement("script");
    script.src = BOOKING_SCRIPT_SRC;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src={iframeSrc}
      style={{
        width: "100%",
        border: "none",
        overflow: "hidden",
        minHeight: 860,
      }}
      scrolling="no"
      id={BOOKING_IFRAME_ID}
      title="Agenda tu visita"
    />
  );
};

const SumRow = ({ l, v }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px dashed var(--border)",
      fontSize: 13,
    }}
  >
    <span className="muted">{l}</span>
    <span style={{ fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>
      {v}
    </span>
  </div>
);

const AgendarView = ({ setView }) => {
  const [servicio, setServicio] = useState("");
  const [tipo, setTipo] = useState("programada");
  const [step, setStep] = useState(1);

  const servicios = [
    "Destape",
    "Fuga / filtracion",
    "Instalacion artefactos",
    "Termo / calefactor",
    "Mantencion",
    "Otro",
  ];

  return (
    <div className="section">
      <div className="wrap">
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow">Agendar visita</div>
          <h2 style={{ margin: "8px 0 12px" }}>Agenda tu visita en minutos.</h2>
          <p className="muted" style={{ fontSize: 17, maxWidth: 620 }}>
            Primero define el servicio y modalidad. Luego completa el
            agendamiento en el calendario.
          </p>
        </div>

        <div className="row gap-16 stepper-row" style={{ marginBottom: 32 }}>
          {["Servicio", "Agendamiento"].map((label, i) => (
            <div key={label} className="row gap-8">
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background:
                    step > i + 1
                      ? "var(--good)"
                      : step === i + 1
                        ? "var(--primary)"
                        : "var(--surface)",
                  color: step >= i + 1 ? "#fff" : "var(--muted)",
                  border:
                    "1px solid " +
                    (step >= i + 1 ? "transparent" : "var(--border)"),
                  display: "grid",
                  placeItems: "center",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {step > i + 1 ? "OK" : i + 1}
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: step === i + 1 ? 600 : 400,
                  color: step >= i + 1 ? "var(--text)" : "var(--muted)",
                }}
              >
                {label}
              </span>
              {i < 1 && (
                <div
                  style={{ width: 32, height: 1, background: "var(--border)" }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          className="svc-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          <div className="card" style={{ padding: 28 }}>
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>
                  Que necesitas?
                </h3>
                <p className="muted" style={{ fontSize: 14 }}>
                  Elige el servicio y modalidad.
                </p>

                <div className="mt-24">
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Modalidad
                  </div>
                  <div className="row gap-8">
                    {[
                      {
                        id: "programada",
                        label: "Programada",
                        desc: "Cualquier dia habil",
                      },
                      {
                        id: "emergencia",
                        label: "Emergencia",
                        desc: "Hoy / ahora",
                      },
                    ].map((item) => {
                      const selected = tipo === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setTipo(item.id)}
                          style={{
                            flex: 1,
                            padding: 16,
                            borderRadius: 12,
                            textAlign: "left",
                            background: selected
                              ? "var(--surface-2)"
                              : "var(--surface)",
                            border:
                              "1.5px solid " +
                              (selected ? "var(--primary)" : "var(--border)"),
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ fontWeight: 600 }}>{item.label}</div>
                            {selected && <Icon name="check" size={16} />}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--muted)",
                              marginTop: 2,
                            }}
                          >
                            {item.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-24">
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Servicio
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 8,
                    }}
                  >
                    {servicios.map((item) => {
                      const selected = servicio === item;
                      return (
                        <button
                          key={item}
                          onClick={() => setServicio(item)}
                          style={{
                            padding: "12px 14px",
                            textAlign: "left",
                            borderRadius: 10,
                            background: selected
                              ? "var(--primary)"
                              : "var(--surface)",
                            color: selected
                              ? "var(--primary-ink)"
                              : "var(--text)",
                            border:
                              "1px solid " +
                              (selected ? "var(--primary)" : "var(--border)"),
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  className="btn btn--primary mt-24"
                  disabled={!servicio}
                  onClick={() => setStep(2)}
                  style={{ opacity: servicio ? 1 : 0.5 }}
                >
                  Continuar <Icon name="arrow" size={14} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>
                  Selecciona tu horario
                </h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
                  Completa el agendamiento directamente en el calendario
                  embebido.
                </p>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "var(--surface)",
                  }}
                >
                  <BookingWidget servicio={servicio} />
                </div>
                <div className="row gap-12 mt-24">
                  <button className="btn btn--ghost" onClick={() => setStep(1)}>
                    Volver y cambiar servicio
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ position: "sticky", top: 100 }}>
            <div
              className="card"
              style={{ padding: 24, background: "var(--surface)" }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Resumen
              </div>
              <SumRow l="Servicio" v={servicio || "-"} />
              <SumRow
                l="Modalidad"
                v={tipo === "emergencia" ? "Emergencia" : "Programada"}
              />
              <SumRow
                l="Calendario"
                v={step === 2 ? "En curso" : "Pendiente"}
              />

              <div
                style={{
                  borderTop: "1px dashed var(--border)",
                  paddingTop: 14,
                  marginTop: 14,
                }}
              >
                <div className="row gap-8" style={{ fontSize: 13 }}>
                  <Icon name="shield" size={14} /> Sin costo hasta confirmar
                </div>
                <div
                  className="row gap-8"
                  style={{ fontSize: 13, marginTop: 6 }}
                >
                  <Icon name="clock" size={14} /> Confirmacion y recordatorios
                  automaticos
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: 18,
                background: "var(--ink-900)",
                color: "#fff",
                borderRadius: "var(--radius)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Emergencia ahora mismo?
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.65)",
                  marginBottom: 12,
                }}
              >
                Llama directo, tenemos tecnico de turno.
              </div>
              <a
                href="tel:+56951019283"
                className="btn btn--accent btn--sm"
                style={{ width: "100%" }}
              >
                <Icon name="phone" size={14} /> +56 9 5101 9283
              </a>
            </div>

            <div className="row gap-12 mt-24">
              <button
                className="btn btn--ghost"
                onClick={() => setView("home")}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AgendarView });
