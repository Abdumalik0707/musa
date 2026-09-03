"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: pass }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Xatolik yuz berdi");
        return;
      }

      if (!data.user.isAdmin && data.user.type !== "admin") {
        setError("Siz admin emassiz");
        return;
      }

      localStorage.setItem("musa_user", JSON.stringify(data.user));
      router.push("/admin");
    } catch {
      setError("Server bilan bog'lanishda xatolik");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#1e293b",
              border: "1px solid #334155",
              display: "grid",
              placeItems: "center",
              fontSize: 26,
              margin: "0 auto 16px",
            }}
          >
            ⚙️
          </div>
          <h1 style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>
            Admin Panel
          </h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
            Faqat adminlar uchun
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 20,
            padding: "28px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                style={{
                  width: "100%",
                  height: 46,
                  borderRadius: 12,
                  border: "1px solid #334155",
                  background: "#0f172a",
                  padding: "0 16px",
                  fontSize: 15,
                  color: "#f1f5f9",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Parol
              </label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  height: 46,
                  borderRadius: 12,
                  border: "1px solid #334155",
                  background: "#0f172a",
                  padding: "0 16px",
                  fontSize: 15,
                  color: "#f1f5f9",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                  fontSize: 13,
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "13px",
                borderRadius: 14,
                background: "#3b82f6",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: 4,
              }}
            >
              {loading ? "Tekshirilmoqda..." : "Kirish →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
