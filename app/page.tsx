"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, OPERATOR, type Category } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

type Filter = Category | "barchasi";

export default function Home() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<Filter>("barchasi");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string; type: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("musa_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setIsLoggedIn(true);
      setCurrentUser(parsed);
    }
    setLoading(false);
  }, []);

  const FILTER_TABS: { key: Filter; label: string; emoji: string }[] = [
    { key: "barchasi", label: t("filter_all"), emoji: "✨" },
    { key: "muzqaymoq", label: t("filter_ice"), emoji: "🍦" },
    { key: "ovqat", label: t("filter_food"), emoji: "🥟" },
  ];

  const filtered =
    category === "barchasi" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--muted)", fontSize: 16 }}>Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 24px 0" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 28,
            padding: "28px",
            overflow: "hidden",
          }}
        >
          {/* Banner image — full width, uncropped */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-banner.png"
            alt="Muzqaymoq — hayotingizga shirin lahza"
            style={{ width: "100%", height: "auto", borderRadius: 20, display: "block", marginBottom: 28 }}
          />

          {/* Text below banner */}
          <div style={{ textAlign: "center" }}>
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
                marginBottom: 18,
              }}
            >
              {t("hero_badge")}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "clamp(28px, 4.2vw, 48px)",
                fontWeight: 900,
                color: "var(--fg)",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                marginBottom: 16,
              }}
            >
              {t("hero_title_1")} <span style={{ color: "var(--accent)" }}>{t("hero_title_2")}</span>
              <br />{t("hero_title_3")}
            </h1>

            <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 440, margin: "0 auto 24px", lineHeight: 1.6 }}>
              {t("hero_desc")}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href="#mahsulotlar"
                style={{
                  padding: "13px 28px",
                  borderRadius: 24,
                  background: "var(--accent)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                {t("hero_cta_catalog")}
              </a>
              <a
                href={`tel:${OPERATOR.phone.replace(/\s/g, "")}`}
                style={{
                  padding: "13px 28px",
                  borderRadius: 24,
                  background: "var(--surface-2)",
                  color: "var(--fg)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  border: "1px solid var(--border-strong)",
                }}
              >
                📞 {OPERATOR.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginTop: 24,
            marginInline: 20,
            position: "relative",
            zIndex: 2,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: "18px 12px",
            boxShadow: "var(--shadow)",
          }}
          data-stats-grid
        >
          {[
            ["🍦", `${PRODUCTS.filter(p => p.category === "muzqaymoq").length}+`, t("stat_flavors")],
            ["🥟", `${PRODUCTS.filter(p => p.category === "ovqat").length}+`, t("stat_food")],
            ["🌿", "4", t("stat_organic")],
            ["⚡", "60 min", t("stat_delivery")],
          ].map(([icon, val, lbl]) => (
            <div key={lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 18, fontWeight: 800, color: "var(--fg)" }}>{val}</div>
              <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="qanday" style={{ padding: "72px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", textAlign: "center", marginBottom: 8 }}>
            {t("catalog_label")}
          </p>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 800, textAlign: "center", color: "var(--fg)", marginBottom: 44 }}>
            {t("how_title")}
          </h2>

          <div style={{ position: "relative" }} data-how-grid-wrap>
            {/* Connecting line (desktop only) */}
            <div
              data-how-line
              style={{
                position: "absolute",
                top: 22,
                left: "12.5%",
                right: "12.5%",
                height: 2,
                background: "var(--border)",
                zIndex: 0,
              }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative", zIndex: 1 }} data-how-grid>
              {[
                [t("how_1_title"), t("how_1_desc")],
                [t("how_2_title"), t("how_2_desc")],
                [t("how_3_title"), t("how_3_desc")],
                [t("how_4_title"), t("how_4_desc")],
              ].map(([title, desc], i) => (
                <div key={title} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-jakarta)",
                      fontWeight: 800,
                      fontSize: 17,
                      margin: "0 auto 16px",
                      boxShadow: "0 8px 20px -6px rgba(255,107,53,0.55)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 15, fontWeight: 700, color: "var(--fg)", marginBottom: 6 }}>{title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, maxWidth: 200, margin: "0 auto" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="mahsulotlar" style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 8 }}>
            {t("catalog_label")}
          </p>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, color: "var(--fg)", marginBottom: 10 }}>
            {t("catalog_title")}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            {t("catalog_desc")}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 14 }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} user={currentUser} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </section>

      {/* Story + Limited offer */}
      <section style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }} data-story-grid>
          {/* Our story */}
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              minHeight: 320,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/p10_img1.jpeg"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)" }} />
            <div style={{ position: "relative", padding: "36px", maxWidth: 380 }}>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
                {t("story_label")}
              </p>
              <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.25 }}>
                {t("story_title")}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {t("story_desc")}
              </p>
              <a
                href="#mahsulotlar"
                style={{ display: "inline-block", padding: "11px 24px", borderRadius: 20, background: "#fff", color: "var(--fg)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
              >
                {t("story_btn")}
              </a>
            </div>
          </div>

          {/* Limited offer */}
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              minHeight: 320,
              display: "flex",
              alignItems: "center",
              background: "linear-gradient(135deg, var(--accent-bg), var(--surface))",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/p11_img1.jpeg"
              alt=""
              style={{ position: "absolute", right: -20, bottom: -20, width: "58%", height: "70%", objectFit: "cover", borderRadius: 20, boxShadow: "var(--shadow)" }}
            />
            <div style={{ position: "relative", padding: "36px", maxWidth: 260 }}>
              <p style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
                {t("offer_label")}
              </p>
              <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 900, color: "var(--fg)", marginBottom: 10, lineHeight: 1.2 }}>
                {t("offer_title")}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20 }}>
                {t("offer_desc")}
              </p>
              <a
                href="#mahsulotlar"
                style={{ display: "inline-block", padding: "11px 24px", borderRadius: 20, background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
              >
                {t("offer_btn")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Operator CTA */}
      <section style={{ background: "var(--accent)", padding: "56px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
            {t("operator_wholesale")}
          </p>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            {t("operator_contact")}
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

      <style>{`
        @media (max-width: 860px) {
          [data-stats-grid] { grid-template-columns: repeat(2, 1fr) !important; margin-inline: 0 !important; margin-top: 20px !important; }
          [data-how-grid] { grid-template-columns: repeat(2, 1fr) !important; gap: 28px 16px !important; }
          [data-how-line] { display: none !important; }
          [data-story-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
