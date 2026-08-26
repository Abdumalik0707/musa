"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { OPERATOR } from "@/lib/data";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          padding: "0 24px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--accent)",
              display: "grid",
              placeItems: "center",
              fontSize: 18,
            }}
          >
            🍦
          </div>
          <span
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 20,
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.5px",
            }}
          >
            Musa
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden-mobile">
          <Link href="/#mahsulotlar" style={{ color: "var(--muted)", fontSize: 14.5, fontWeight: 500, textDecoration: "none" }}>
            Mahsulotlar
          </Link>
          <Link href="/#qanday" style={{ color: "var(--muted)", fontSize: 14.5, fontWeight: 500, textDecoration: "none" }}>
            Qanday ishlaydi
          </Link>
          <a
            href={`tel:${OPERATOR.phone.replace(/\s/g, "")}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--accent)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            📞 {OPERATOR.phone}
          </a>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--surface-2)",
                cursor: "pointer",
                fontSize: 16,
                display: "grid",
                placeItems: "center",
                color: "var(--fg)",
              }}
              aria-label="Temani almashtirish"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          <Link
            href="/auth/login"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--muted)",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: 20,
              border: "1px solid var(--border)",
            }}
          >
            Kirish
          </Link>

          <Link
            href="/#mahsulotlar"
            style={{
              fontSize: 14,
              fontWeight: 700,
              background: "var(--accent)",
              color: "#fff",
              textDecoration: "none",
              padding: "9px 20px",
              borderRadius: 20,
            }}
          >
            Buyurtma berish
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
