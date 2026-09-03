"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OPERATOR } from "@/lib/data";

interface StoredUser {
  name: string;
  phone: string;
  isAdmin?: boolean;
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [dropOpen, setDropOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("musa_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  function handleLogout() {
    localStorage.removeItem("musa_user");
    setUser(null);
    setDropOpen(false);
    router.push("/");
  }

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
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <svg width="90" height="36" viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="90" height="36" rx="10" fill="#E8C96A"/>
            <text x="45" y="25" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="18" fontWeight="900" fill="#1B3A6B" letterSpacing="2">MUSA</text>
          </svg>
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

          {mounted && (
            user ? (
              /* Logged-in user avatar + dropdown */
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 14px",
                    borderRadius: 20,
                    border: "1px solid var(--border)",
                    background: "var(--surface-2)",
                    cursor: "pointer",
                    color: "var(--fg)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <span style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13,
                    fontWeight: 800,
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden-mobile">{user.name}</span>
                  <span style={{ fontSize: 10, opacity: 0.5 }}>▼</span>
                </button>

                {dropOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 16,
                      boxShadow: "var(--shadow)",
                      minWidth: 180,
                      padding: "8px",
                      zIndex: 100,
                    }}
                  >
                    <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--fg)", margin: 0 }}>{user.name}</p>
                      <p style={{ fontSize: 11, color: "var(--muted)", margin: 0 }}>{user.phone}</p>
                    </div>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setDropOpen(false)}
                        style={{
                          display: "block",
                          padding: "8px 12px",
                          borderRadius: 10,
                          color: "var(--accent)",
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        ⚙️ Admin panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 12px",
                        borderRadius: 10,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--red, #ef4444)",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      🚪 Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in */
              <>
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
                  href="/auth/register"
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
                  Ro&apos;yxatdan o&apos;tish
                </Link>
              </>
            )
          )}
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
