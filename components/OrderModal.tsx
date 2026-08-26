"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Product } from "@/lib/data";

const LocationMap = dynamic(() => import("./LocationMap").then((m) => m.LocationMap), {
  ssr: false,
  loading: () => (
    <div style={{ height: 280, background: "var(--surface-2)", borderRadius: 14, display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 14 }}>
      Xarita yuklanmoqda...
    </div>
  ),
});

interface Props {
  product: Product;
  onClose: () => void;
  user?: { name: string; phone: string; type: string } | null;
}

export function OrderModal({ product, onClose, user }: Props) {
  const [qty, setQty] = useState(product.minOrder ?? 1);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [customerType, setCustomerType] = useState<"individual" | "shop">(
    (user?.type as "individual" | "shop") || "individual"
  );
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [step, setStep] = useState<"info" | "map" | "confirm" | "done">("info");
  const [submitting, setSubmitting] = useState(false);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const total = product.price * (qty ?? 1);

  async function handleSubmit() {
    if (!location) { setStep("map"); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setStep("done");
    setSubmitting(false);
  }

  function openDriverMap() {
    if (!location) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`,
      "_blank"
    );
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0 0 0 0",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxWidth: 560,
          maxHeight: "92vh",
          overflowY: "auto",
          padding: "28px 28px 40px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: "var(--border-strong)", borderRadius: 4, margin: "0 auto 20px" }} />

        {step === "done" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: 22, fontWeight: 800, color: "var(--fg)", marginBottom: 8 }}>
              Buyurtma qabul qilindi!
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
              Tez orada operator siz bilan bog&apos;lanadi.<br />
              <strong style={{ color: "var(--accent)" }}>+998 90 123 45 67</strong>
            </p>
            {location && (
              <button
                onClick={openDriverMap}
                style={{
                  marginTop: 20,
                  padding: "12px 24px",
                  borderRadius: 20,
                  background: "#4285f4",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                🗺️ Google Maps orqali yo&apos;l ko&apos;rsatish
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                marginTop: 12,
                display: "block",
                width: "100%",
                padding: "13px",
                borderRadius: 20,
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
              }}
            >
              Yopish
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                  Buyurtma berish
                </p>
                <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: 20, fontWeight: 800, color: "var(--fg)" }}>
                  {product.name}
                </h2>
                <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: 15, marginTop: 2 }}>
                  {product.price.toLocaleString()} so&apos;m / {product.unit}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  fontSize: 16,
                  color: "var(--muted)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Step tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {["info", "map", "confirm"].map((s, i) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 4,
                    background: ["info", "map", "confirm"].indexOf(step) >= i
                      ? "var(--accent)"
                      : "var(--border-strong)",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>

            {step === "info" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Customer type */}
                {!user && (
                  <div>
                    <label style={labelStyle}>Mijoz turi</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[["individual", "👤 Oddiy mijoz"], ["shop", "🏪 Do'kon"]].map(([val, lbl]) => (
                        <button
                          key={val}
                          onClick={() => setCustomerType(val as "individual" | "shop")}
                          style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: 12,
                            border: `2px solid ${customerType === val ? "var(--accent)" : "var(--border)"}`,
                            background: customerType === val ? "var(--accent-bg)" : "var(--surface-2)",
                            color: customerType === val ? "var(--accent-text)" : "var(--muted)",
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: "pointer",
                          }}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!user && (
                  <>
                    <div>
                      <label style={labelStyle}>Ismingiz</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="To'liq ismingiz"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Telefon raqam</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+998 90 000 00 00"
                        style={inputStyle}
                      />
                    </div>
                  </>
                )}

                {/* Quantity */}
                <div>
                  <label style={labelStyle}>Miqdor ({product.unit})</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                      onClick={() => setQty(Math.max(product.minOrder ?? 1, (qty ?? 1) - 1))}
                      style={qtyBtnStyle}
                    >
                      −
                    </button>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "var(--fg)", minWidth: 32, textAlign: "center" }}>
                      {qty}
                    </span>
                    <button onClick={() => setQty((qty ?? 1) + 1)} style={qtyBtnStyle}>+</button>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>{product.unit}</span>
                  </div>
                </div>

                {/* Total */}
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: 14,
                    background: "var(--accent-bg)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--muted)", fontSize: 14 }}>Jami summa</span>
                  <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 18 }}>
                    {total.toLocaleString()} so&apos;m
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (!user && (!name || !phone)) return;
                    setStep("map");
                  }}
                  style={primaryBtnStyle}
                >
                  Davom etish →
                </button>
              </div>
            )}

            {step === "map" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Yetkazib berish manzili</label>
                  <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 10 }}>
                    Xaritada o&apos;z manzilingizni bosing
                  </p>
                  <LocationMap
                    onSelect={(lat, lng, address) => setLocation({ lat, lng, address })}
                    selected={location}
                  />
                </div>

                {location && (
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      fontSize: 13,
                      color: "var(--muted)",
                    }}
                  >
                    📍 {location.address.slice(0, 80)}...
                  </div>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => setStep("info")}
                    style={{ ...primaryBtnStyle, background: "var(--surface-2)", color: "var(--fg)", flex: 1 }}
                  >
                    ← Orqaga
                  </button>
                  <button
                    onClick={() => location && setStep("confirm")}
                    disabled={!location}
                    style={{ ...primaryBtnStyle, flex: 2, opacity: location ? 1 : 0.4 }}
                  >
                    Tasdiqlash →
                  </button>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 16, fontWeight: 700, color: "var(--fg)" }}>
                  Buyurtmani tasdiqlang
                </h3>

                {[
                  ["Mahsulot", product.name],
                  ["Miqdor", `${qty} ${product.unit}`],
                  ["Summa", `${total.toLocaleString()} so'm`],
                  ["Ism", name || user?.name || "—"],
                  ["Telefon", phone || user?.phone || "—"],
                  ["Manzil", location?.address?.slice(0, 60) + "..." || "—"],
                ].map(([lbl, val]) => (
                  <div
                    key={lbl}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: 10,
                    }}
                  >
                    <span style={{ color: "var(--muted)", fontSize: 14 }}>{lbl}</span>
                    <span style={{ color: "var(--fg)", fontSize: 14, fontWeight: 600, maxWidth: "60%", textAlign: "right" }}>{val}</span>
                  </div>
                ))}

                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button
                    onClick={() => setStep("map")}
                    style={{ ...primaryBtnStyle, background: "var(--surface-2)", color: "var(--fg)", flex: 1 }}
                  >
                    ← Orqaga
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{ ...primaryBtnStyle, flex: 2, opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? "Yuborilmoqda..." : "✓ Buyurtma berish"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--muted)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 46,
  borderRadius: 12,
  border: "1px solid var(--border-strong)",
  background: "var(--surface-2)",
  padding: "0 16px",
  fontSize: 15,
  color: "var(--fg)",
  outline: "none",
};

const qtyBtnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 10,
  border: "1px solid var(--border-strong)",
  background: "var(--surface-2)",
  cursor: "pointer",
  fontSize: 18,
  color: "var(--fg)",
  display: "grid",
  placeItems: "center",
  fontWeight: 700,
};

const primaryBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 20,
  background: "var(--accent)",
  color: "#fff",
  fontWeight: 700,
  fontSize: 15,
  border: "none",
  cursor: "pointer",
};
