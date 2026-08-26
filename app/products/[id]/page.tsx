"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById, OPERATOR } from "@/lib/data";
import { OrderModal } from "@/components/OrderModal";
import { Navbar } from "@/components/Navbar";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [ordering, setOrdering] = useState(false);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
          <h1 style={{ color: "var(--fg)", marginBottom: 12 }}>Mahsulot topilmadi</h1>
          <Link href="/" style={{ color: "var(--accent)" }}>Asosiy sahifaga qaytish</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontSize: 14, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Bosh sahifa</Link>
          <span>›</span>
          <Link href="/#mahsulotlar" style={{ color: "var(--muted)", textDecoration: "none" }}>Mahsulotlar</Link>
          <span>›</span>
          <span style={{ color: "var(--fg)" }}>{product.name}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Images */}
          <div>
            {/* Main image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 24,
                overflow: "hidden",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                marginBottom: 12,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImg] || product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: 8 }}>
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 12,
                      overflow: "hidden",
                      border: `2px solid ${activeImg === i ? "var(--accent)" : "var(--border)"}`,
                      padding: 0,
                      cursor: "pointer",
                      background: "var(--surface-2)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Badges */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 12,
                  background: "var(--accent-bg)",
                  color: "var(--accent-text)",
                }}
              >
                {product.categoryLabel}
              </span>
              {product.isNew && (
                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 12, background: "rgba(37,99,235,0.12)", color: "var(--blue)" }}>
                  YANGI
                </span>
              )}
              {product.isPremium && (
                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 12, background: "rgba(217,119,6,0.12)", color: "var(--amber)" }}>
                  ⭐ PREMIUM
                </span>
              )}
            </div>

            <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 6 }}>{product.brand}</p>
            <h1
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 900,
                color: "var(--fg)",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              {product.name}
            </h1>

            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              {product.descriptionFull}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
              {product.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 10,
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "20px",
                marginBottom: 24,
              }}
            >
              {[
                ["⚖️ Og'irligi", product.weight],
                ["📦 Qutidagi soni", `${product.boxQty} dona`],
              ].map(([lbl, val]) => (
                <div
                  key={lbl}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid var(--border)",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "var(--muted)" }}>{lbl}</span>
                  <span style={{ color: "var(--fg)", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Prices */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {/* Individual */}
              <div
                style={{
                  padding: "18px",
                  borderRadius: 16,
                  border: "2px solid var(--accent)",
                  background: "var(--accent-bg)",
                }}
              >
                <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 4 }}>👤 Oddiy mijoz</p>
                <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: 22, fontFamily: "var(--font-jakarta)" }}>
                  {product.price.toLocaleString()}
                </p>
                <p style={{ color: "var(--muted)", fontSize: 12 }}>so&apos;m / {product.unit}</p>
              </div>
              {/* Shop */}
              <div
                style={{
                  padding: "18px",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 4 }}>🏪 Do&apos;kon (quti)</p>
                <p style={{ color: "var(--fg)", fontWeight: 900, fontSize: 22, fontFamily: "var(--font-jakarta)" }}>
                  {product.boxPrice.toLocaleString()}
                </p>
                <p style={{ color: "var(--muted)", fontSize: 12 }}>so&apos;m / {product.boxQty} dona</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setOrdering(true)}
                style={{
                  flex: 2,
                  padding: "15px",
                  borderRadius: 20,
                  background: "var(--accent)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                🛒 Buyurtma berish
              </button>
              <a
                href={`tel:${OPERATOR.phone.replace(/\s/g, "")}`}
                style={{
                  flex: 1,
                  padding: "15px",
                  borderRadius: 20,
                  border: "1px solid var(--border-strong)",
                  background: "var(--surface)",
                  color: "var(--fg)",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                📞 Operator
              </a>
            </div>

            {/* Delivery note */}
            <div
              style={{
                marginTop: 16,
                padding: "12px 16px",
                borderRadius: 12,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                fontSize: 13,
                color: "var(--muted)",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              ⚡ Toshkent bo&apos;ylab 60 daqiqada yetkazib beramiz
            </div>
          </div>
        </div>
      </div>

      {/* Order modal */}
      {ordering && (
        <OrderModal product={{ ...product, minOrder: 1 }} onClose={() => setOrdering(false)} />
      )}

      <style>{`
        @media (max-width: 768px) {
          [data-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
