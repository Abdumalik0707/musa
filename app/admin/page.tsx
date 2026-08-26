"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

type Period = "daily" | "weekly" | "monthly";

// Demo data
const DEMO_ORDERS = [
  { id: 1, customer: "Aliyev Jasur", type: "individual", product: "Shokoladli Marojni", qty: 3, total: 300000, date: "2025-08-26", status: "yetkazildi" },
  { id: 2, customer: "Bahor Supermarket", type: "shop", product: "Klassik Vanil Marojni", qty: 50, total: 5000000, date: "2025-08-26", status: "jarayonda" },
  { id: 3, customer: "Nodira Karimova", type: "individual", product: "Uy Plov", qty: 2, total: 200000, date: "2025-08-25", status: "yetkazildi" },
  { id: 4, customer: "Fresh Market", type: "shop", product: "Mango Sorbet", qty: 100, total: 10000000, date: "2025-08-25", status: "yetkazildi" },
  { id: 5, customer: "Kamol Toshev", type: "individual", product: "Lag'mon", qty: 1, total: 100000, date: "2025-08-24", status: "yetkazildi" },
  { id: 6, customer: "Sarvar Mirzayev", type: "individual", product: "Pistali Marojni", qty: 5, total: 500000, date: "2025-08-24", status: "yetkazildi" },
  { id: 7, customer: "Oʻzbekiston Savdo", type: "shop", product: "Uy Plov", qty: 30, total: 3000000, date: "2025-08-23", status: "yetkazildi" },
  { id: 8, customer: "Maftuna Yusupova", type: "individual", product: "Qulupnayli Marojni", qty: 2, total: 200000, date: "2025-08-23", status: "bekor qilindi" },
];

const STATS = {
  daily: { orders: 2, revenue: 5300000, individual: 1, shop: 1 },
  weekly: { orders: 8, revenue: 19300000, individual: 5, shop: 3 },
  monthly: { orders: 32, revenue: 74800000, individual: 22, shop: 10 },
};

function fmt(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toString();
}

export default function AdminPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<Period>("weekly");
  const [activeTab, setActiveTab] = useState<"all" | "individual" | "shop">("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const u = localStorage.getItem("musa_user");
    if (!u) { router.push("/auth/login"); return; }
    const user = JSON.parse(u);
    if (user.type !== "admin") { router.push("/"); }
  }, [router]);

  const stats = STATS[period];
  const filteredOrders = activeTab === "all"
    ? DEMO_ORDERS
    : DEMO_ORDERS.filter((o) => o.type === activeTab);

  const topProducts = [
    { name: "Klassik Vanil Marojni", count: 12, revenue: 1200000 },
    { name: "Shokoladli Marojni", count: 9, revenue: 900000 },
    { name: "Uy Plov", count: 8, revenue: 800000 },
    { name: "Mango Sorbet", count: 6, revenue: 600000 },
    { name: "Pistali Marojni", count: 5, revenue: 500000 },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, padding: "0 8px" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--accent)", display: "grid", placeItems: "center", fontSize: 18 }}>🍦</div>
          <div>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 16, fontWeight: 800, color: "var(--fg)" }}>Musa Admin</div>
            <div style={{ color: "var(--muted)", fontSize: 11 }}>Boshqaruv paneli</div>
          </div>
        </div>

        {/* Nav */}
        {[
          ["📊", "Dashboard", true],
          ["📦", "Buyurtmalar", false],
          ["🍦", "Mahsulotlar", false],
          ["👥", "Mijozlar", false],
          ["🚚", "Yetkazib berish", false],
          ["⚙️", "Sozlamalar", false],
        ].map(([icon, lbl, active]) => (
          <div
            key={lbl as string}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              marginBottom: 4,
              background: active ? "var(--accent-bg)" : "transparent",
              color: active ? "var(--accent-text)" : "var(--muted)",
              fontWeight: active ? 700 : 500,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <span>{icon as string}</span>
            <span>{lbl as string}</span>
          </div>
        ))}

        <div style={{ flex: 1 }} />

        {/* Theme + Logout */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              fontSize: 14,
              cursor: "pointer",
              marginBottom: 8,
              width: "100%",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"} Tema: {theme === "dark" ? "Qoʻng'ir" : "Oq"}
          </button>
        )}

        <button
          onClick={() => { localStorage.removeItem("musa_user"); router.push("/auth/login"); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--red)",
            fontSize: 14,
            cursor: "pointer",
            width: "100%",
          }}
        >
          🚪 Chiqish
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "28px 32px", overflowX: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-jakarta)", fontSize: 24, fontWeight: 800, color: "var(--fg)" }}>Dashboard</h1>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 2 }}>Buyurtmalar va savdo tahlili</p>
          </div>

          {/* Period tabs */}
          <div style={{ display: "flex", gap: 6, background: "var(--surface-2)", padding: 4, borderRadius: 14, border: "1px solid var(--border)" }}>
            {[["daily", "Bugun"], ["weekly", "Hafta"], ["monthly", "Oy"]].map(([val, lbl]) => (
              <button
                key={val}
                onClick={() => setPeriod(val as Period)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: period === val ? "var(--accent)" : "transparent",
                  color: period === val ? "#fff" : "var(--muted)",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
          {[
            ["📦", "Buyurtmalar", stats.orders, "", "var(--accent)"],
            ["💰", "Tushum", fmt(stats.revenue), " so'm", "var(--green)"],
            ["👤", "Oddiy mijoz", stats.individual, " ta", "var(--blue)"],
            ["🏪", "Do'kon", stats.shop, " ta", "var(--amber)"],
          ].map(([icon, lbl, val, suffix, color]) => (
            <div
              key={lbl as string}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "20px 22px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `${color}20`,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                  }}
                >
                  {icon as string}
                </div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: color as string, fontFamily: "var(--font-jakarta)" }}>
                {val as string | number}{suffix as string}
              </div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{lbl as string}</div>
            </div>
          ))}
        </div>

        {/* Top products */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "24px",
            marginBottom: 24,
          }}
        >
          <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 16, fontWeight: 700, color: "var(--fg)", marginBottom: 16 }}>
            🔥 Eng ko&apos;p sotilgan mahsulotlar
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topProducts.map((p, i) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "var(--muted)", fontSize: 13, width: 20, textAlign: "center" }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 14, color: "var(--fg)", fontWeight: 500 }}>{p.name}</span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{p.count} ta · {fmt(p.revenue)} so&apos;m</span>
                  </div>
                  <div style={{ height: 5, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${(p.count / topProducts[0].count) * 100}%`,
                        background: "var(--accent)",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders table */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "24px",
            overflowX: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 16, fontWeight: 700, color: "var(--fg)" }}>
              So&apos;nggi buyurtmalar
            </h3>
            <div style={{ display: "flex", gap: 6 }}>
              {[["all", "Barchasi"], ["individual", "Oddiy"], ["shop", "Do'kon"]].map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setActiveTab(val as any)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 12,
                    border: `1px solid ${activeTab === val ? "var(--accent)" : "var(--border)"}`,
                    background: activeTab === val ? "var(--accent-bg)" : "transparent",
                    color: activeTab === val ? "var(--accent-text)" : "var(--muted)",
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                {["#", "Mijoz", "Turi", "Mahsulot", "Soni", "Summa", "Sana", "Holat"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      color: "var(--muted)",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 12px", color: "var(--muted-2)" }}>{o.id}</td>
                  <td style={{ padding: "12px 12px", color: "var(--fg)", fontWeight: 500 }}>{o.customer}</td>
                  <td style={{ padding: "12px 12px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 10,
                        background: o.type === "shop" ? "rgba(234,179,8,0.15)" : "rgba(59,130,246,0.15)",
                        color: o.type === "shop" ? "var(--amber)" : "var(--blue)",
                      }}
                    >
                      {o.type === "shop" ? "Do'kon" : "Mijoz"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 12px", color: "var(--fg)" }}>{o.product}</td>
                  <td style={{ padding: "12px 12px", color: "var(--muted)", textAlign: "center" }}>{o.qty}</td>
                  <td style={{ padding: "12px 12px", color: "var(--accent)", fontWeight: 700 }}>
                    {o.total.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 12px", color: "var(--muted)", fontSize: 12 }}>{o.date}</td>
                  <td style={{ padding: "12px 12px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 10,
                        background:
                          o.status === "yetkazildi"
                            ? "rgba(22,163,74,0.15)"
                            : o.status === "jarayonda"
                            ? "rgba(234,179,8,0.15)"
                            : "rgba(220,38,38,0.15)",
                        color:
                          o.status === "yetkazildi"
                            ? "var(--green)"
                            : o.status === "jarayonda"
                            ? "var(--amber)"
                            : "var(--red)",
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
