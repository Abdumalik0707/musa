"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, OPERATOR, type Category } from "@/lib/data";

type Filter = Category | "barchasi";

const FILTER_TABS: { key: Filter; label: string; emoji: string }[] = [
  { key: "barchasi", label: "Barchasi", emoji: "✨" },
  { key: "muzqaymoq", label: "Muzqaymoq", emoji: "🍦" },
  { key: "ovqat", label: "Ovqat", emoji: "🥟" },
];

export default function Home() {
  const [category, setCategory] = useState<Filter>("barchasi");

  const filtered =
    category === "barchasi" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px 48px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--accent-bg)",
            color: "var(--accent-text)",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          🚀 Toshkent bo&apos;ylab yetkazib berish · 60 daqiqada
        </div>

        <h1
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "clamp(34px, 6vw, 66px)",
            fontWeight: 900,
            color: "var(--fg)",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: 20,
          }}
        >
          MUSA — <span style={{ color: "var(--accent)" }}>Muzqaymoq</span>
          <br />va ovqatlar
        </h1>

        <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.6 }}>
          20+ xil marojni, organic bar va premium gelatolar. Do&apos;konlar uchun ham, oddiy mijozlar uchun ham.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#mahsulotlar"
            style={{
              padding: "14px 32px",
              borderRadius: 24,
              background: "var(--accent)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            Katalogni ko&apos;rish 🍦
          </a>
          <a
            href={`tel:${OPERATOR.phone.replace(/\s/g, "")}`}
            style={{
              padding: "14px 32px",
              borderRadius: 24,
              background: "var(--surface-2)",
              color: "var(--fg)",
              fontWeight: 600,
              fontSize: 16,
              textDecoration: "none",
              border: "1px solid var(--border-strong)",
            }}
          >
            📞 {OPERATOR.phone}
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 52, flexWrap: "wrap" }}>
          {[
            ["🍦", `${PRODUCTS.filter(p => p.category === "muzqaymoq").length}+`, "Marojni turi"],
            ["🥟", `${PRODUCTS.filter(p => p.category === "ovqat").length}+`, "Ovqat mahsulot"],
            ["🌿", "4", "Organic barlar"],
            ["⚡", "60 min", "Yetkazib berish"],
          ].map(([icon, val, lbl]) => (
            <div key={lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 22, fontWeight: 800, color: "var(--fg)" }}>{val}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 800, textAlign: "center", color: "var(--fg)", marginBottom: 36 }}>
            Qanday ishlaydi?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              ["1️⃣", "Mahsulot tanlang", "Katalogdan o'zingizga yoqganini tanlang"],
              ["2️⃣", "Miqdor kiriting", "Nechtasini olishingizni belgilang"],
              ["3️⃣", "Manzil ko'rsating", "Xaritada joylashuvingizni belgilang"],
              ["4️⃣", "Yetkazib beramiz", "60 daqiqada eshigingizda"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ padding: "22px", borderRadius: 18, background: "var(--bg-2)", border: "1px solid var(--border)", textAlign: "center" }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{icon}</div>
                <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 15, fontWeight: 700, color: "var(--fg)", marginBottom: 6 }}>{title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="mahsulotlar" style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 8 }}>
            Katalog
          </p>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, color: "var(--fg)", marginBottom: 10 }}>
            Mahsulotlarimiz
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            Har bir tovar haqida batafsil — uni bosib ko&apos;ring
          </p>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {FILTER_TABS.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              style={{
                padding: "9px 18px",
                borderRadius: 20,
                border: `2px solid ${category === key ? "var(--accent)" : "var(--border)"}`,
                background: category === key ? "var(--accent)" : "var(--surface)",
                color: category === key ? "#fff" : "var(--muted)",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>{emoji}</span> {label}
              <span style={{ opacity: 0.7, fontSize: 11 }}>
                ({key === "barchasi" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === key).length})
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Operator CTA */}
      <section style={{ background: "var(--accent)", padding: "56px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
            Do&apos;konlar uchun ulgurji buyurtma
          </p>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            Operator bilan bog&apos;laning
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            {OPERATOR.address}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`tel:${OPERATOR.phone.replace(/\s/g, "")}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 20, background: "#fff", color: "var(--accent)", fontWeight: 800, fontSize: 16, textDecoration: "none" }}
            >
              📞 {OPERATOR.phone}
            </a>
            <a
              href={`mailto:${OPERATOR.email}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 20, background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              ✉️ {OPERATOR.email}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 24px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
        © 2026 {OPERATOR.name} · {OPERATOR.website}
      </footer>
    </div>
  );
}
