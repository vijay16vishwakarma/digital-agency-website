import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Folder,
  Home,
  Layers,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Pencil,
  Plus,
  Settings,
  Sliders,
  Star,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { BlogPost, PortfolioItem, Testimonial } from "../backend.d";
import {
  useBlogPosts,
  useContactMessages,
  useCreateBlogPost,
  useCreatePortfolioItem,
  useCreateTestimonial,
  useDeleteBlogPost,
  useDeleteContactMessage,
  useDeletePortfolioItem,
  useDeleteTestimonial,
  usePortfolioItems,
  useTestimonials,
  useUpdateBlogPost,
  useUpdatePortfolioItem,
  useUpdateTestimonial,
} from "../hooks/useQueries";

// ─── Auth Hook ───────────────────────────────────────────────────────────────
const CREDS_KEY = "edma_admin_creds";
const SESSION_KEY = "edma_admin_session";

function getStoredCreds(): { username: string; password: string } {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { username: "admin", password: "edma@2025" };
}

function useAdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  function login(username: string, password: string): boolean {
    const creds = getStoredCreds();
    if (username === creds.username && password === creds.password) {
      try {
        localStorage.setItem(SESSION_KEY, "true");
      } catch {}
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }

  function logout() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
    setIsLoggedIn(false);
  }

  return { isLoggedIn, login, logout };
}

// ─── Local Storage Helpers ───────────────────────────────────────────────────
function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function lsSet<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({
  onLogin,
}: { onLogin: (u: string, p: string) => boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = onLogin(username, password);
      if (!ok) setError("Invalid username or password. Please try again.");
      setLoading(false);
    }, 600);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.12) 0%, #0a0f1a 60%)",
      }}
    >
      {/* Bg orbs */}
      <div
        className="fixed top-10 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-20 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center mb-5"
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,212,255,0.5))",
            }}
          >
            <img
              src="/assets/uploads/edma-removebg-preview-019d2bb4-6362-75ca-8b1b-03b2060df5cf-1.png"
              alt="EDMA"
              className="h-16 w-auto"
            />
          </div>
          <h1
            className="text-3xl font-bold"
            style={{
              background:
                "linear-gradient(135deg, #00d4ff 0%, #06b6d4 50%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Panel
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            ERMS Intelligence Private Limited
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(13,21,32,0.85)",
            border: "1px solid rgba(0,212,255,0.18)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.08) inset",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Username
              </Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="mt-2 h-11"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "white",
                }}
                data-ocid="admin.input"
                autoComplete="username"
              />
            </div>
            <div>
              <Label
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 h-11"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "white",
                }}
                data-ocid="admin.input"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
                data-ocid="admin.error_state"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 font-semibold"
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #0891b2 100%)",
                boxShadow: "0 4px 20px rgba(0,212,255,0.3)",
                color: "#0a0f1a",
                border: "none",
              }}
              data-ocid="admin.primary_button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Login to Admin"
              )}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm inline-flex items-center gap-1.5 transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
            data-ocid="admin.link"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
type Tab =
  | "dashboard"
  | "blog"
  | "portfolio"
  | "testimonials"
  | "videos"
  | "services"
  | "hero"
  | "messages"
  | "settings";

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
  { id: "blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
  { id: "portfolio", label: "Portfolio", icon: <Folder className="w-4 h-4" /> },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: <Users className="w-4 h-4" />,
  },
  { id: "videos", label: "Videos", icon: <Video className="w-4 h-4" /> },
  { id: "services", label: "Services", icon: <Layers className="w-4 h-4" /> },
  { id: "hero", label: "Hero Slides", icon: <Sliders className="w-4 h-4" /> },
  { id: "messages", label: "Messages", icon: <Mail className="w-4 h-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
];

function Sidebar({
  active,
  onNavigate,
  onLogout,
  messageCount,
  open,
  onClose,
}: {
  active: Tab;
  onNavigate: (tab: Tab) => void;
  onLogout: () => void;
  messageCount: number;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
          onKeyDown={onClose}
          role="button"
          tabIndex={-1}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:z-auto`}
        style={{
          width: "260px",
          background: "rgba(8,14,24,0.97)",
          borderRight: "1px solid rgba(0,212,255,0.12)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}
        >
          <img
            src="/assets/uploads/edma-removebg-preview-019d2bb4-6362-75ca-8b1b-03b2060df5cf-1.png"
            alt="EDMA"
            className="h-8 w-auto"
            style={{ filter: "drop-shadow(0 0 8px rgba(0,212,255,0.5))" }}
          />
          <div>
            <div
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#00d4ff" }}
            >
              EDMA
            </div>
            <div
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Admin Panel
            </div>
          </div>
          <button
            type="button"
            className="ml-auto lg:hidden"
            onClick={onClose}
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div
            className="text-xs uppercase tracking-widest mb-3 px-2"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Navigation
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-200 relative"
                style={{
                  background: isActive ? "rgba(0,212,255,0.1)" : "transparent",
                  color: isActive ? "#00d4ff" : "rgba(255,255,255,0.55)",
                  borderLeft: isActive
                    ? "2px solid #00d4ff"
                    : "2px solid transparent",
                }}
                data-ocid={`admin.${item.id}.tab`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === "messages" && messageCount > 0 && (
                  <span
                    className="ml-auto text-xs rounded-full px-2 py-0.5 font-bold"
                    style={{
                      background: "rgba(0,212,255,0.2)",
                      color: "#00d4ff",
                    }}
                  >
                    {messageCount}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-xs mb-3 transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            data-ocid="admin.link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Website
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
            style={{ color: "rgba(239,68,68,0.7)" }}
            data-ocid="admin.secondary_button"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({
  onNavigate,
}: {
  onNavigate: (tab: Tab) => void;
}) {
  const { data: posts = [] } = useBlogPosts();
  const { data: items = [] } = usePortfolioItems();
  const { data: testimonials = [] } = useTestimonials();
  const { data: messages = [] } = useContactMessages();

  const stats = [
    {
      label: "Blog Posts",
      value: posts.length,
      icon: <BookOpen className="w-5 h-5" />,
      color: "#00d4ff",
      tab: "blog" as Tab,
    },
    {
      label: "Portfolio Items",
      value: items.length,
      icon: <Folder className="w-5 h-5" />,
      color: "#10b981",
      tab: "portfolio" as Tab,
    },
    {
      label: "Testimonials",
      value: testimonials.length,
      icon: <Users className="w-5 h-5" />,
      color: "#8b5cf6",
      tab: "testimonials" as Tab,
    },
    {
      label: "Messages",
      value: messages.length,
      icon: <Mail className="w-5 h-5" />,
      color: "#f59e0b",
      tab: "messages" as Tab,
    },
  ];

  function formatDate(ns: bigint) {
    const ms = Number(ns / 1_000_000n);
    return new Date(ms).toLocaleDateString();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, Admin 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
          Here's what's happening with your EDMA website.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <button
            type="button"
            key={stat.label}
            onClick={() => onNavigate(stat.tab)}
            className="text-left rounded-xl p-5 transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(13,21,32,0.8)",
              border: `1px solid ${stat.color}22`,
              boxShadow: `0 4px 20px ${stat.color}0a`,
            }}
            data-ocid="dashboard.card"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${stat.color}18`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {stat.label}
            </div>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "rgba(13,21,32,0.8)",
          border: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <h2
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Blog Post", tab: "blog" as Tab, color: "#00d4ff" },
            {
              label: "Add Portfolio Item",
              tab: "portfolio" as Tab,
              color: "#10b981",
            },
            {
              label: "Add Testimonial",
              tab: "testimonials" as Tab,
              color: "#8b5cf6",
            },
            { label: "Add Video", tab: "videos" as Tab, color: "#f59e0b" },
          ].map((a) => (
            <button
              type="button"
              key={a.label}
              onClick={() => onNavigate(a.tab)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{
                background: `${a.color}15`,
                border: `1px solid ${a.color}30`,
                color: a.color,
              }}
              data-ocid="dashboard.primary_button"
            >
              <Plus className="w-3.5 h-3.5" />
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      {messages.length > 0 && (
        <div
          className="rounded-xl p-6"
          style={{
            background: "rgba(13,21,32,0.8)",
            border: "1px solid rgba(0,212,255,0.1)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Recent Messages
            </h2>
            <button
              type="button"
              onClick={() => onNavigate("messages")}
              className="text-xs"
              style={{ color: "#00d4ff" }}
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {messages.slice(0, 3).map((msg, i) => (
              <div
                key={String(msg.id)}
                className="flex items-start gap-3 py-3"
                style={{
                  borderBottom:
                    i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
                data-ocid={`dashboard.item.${i + 1}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: "rgba(0,212,255,0.15)",
                    color: "#00d4ff",
                  }}
                >
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {msg.name}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {formatDate(msg.submittedAt)}
                    </span>
                  </div>
                  <p
                    className="text-xs mt-0.5 truncate"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics teaser */}
      <div
        className="rounded-xl p-6 flex items-center gap-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(16,185,129,0.05) 100%)",
          border: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(0,212,255,0.15)", color: "#00d4ff" }}
        >
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <div className="font-semibold text-white">
            EDMA Analytics Overview
          </div>
          <div
            className="text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            500+ Projects Delivered · 200+ Happy Clients · 12 Countries · 98%
            Retention
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Portfolio Manager ────────────────────────────────────────────────────────
function PortfolioManager() {
  const { data: items = [], isLoading } = usePortfolioItems();
  const create = useCreatePortfolioItem();
  const update = useUpdatePortfolioItem();
  const remove = useDeletePortfolioItem();

  type PForm = Omit<PortfolioItem, "id">;
  const empty: PForm = {
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    clientName: "",
    year: BigInt(new Date().getFullYear()),
  };
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<PForm>(empty);

  function openAdd() {
    setForm(empty);
    setAdding(true);
  }
  function openEdit(item: PortfolioItem) {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl,
      clientName: item.clientName,
      year: item.year,
    });
  }
  function closeDialogs() {
    setAdding(false);
    setEditing(null);
  }

  async function handleSave() {
    try {
      if (editing) {
        await update.mutateAsync({ ...form, id: editing.id });
        toast.success("Portfolio item updated");
      } else {
        await create.mutateAsync(form);
        toast.success("Portfolio item created");
      }
      closeDialogs();
    } catch {
      toast.error("Failed to save");
    }
  }

  async function handleDelete(id: bigint) {
    if (!confirm("Delete this item?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  const isSaving = create.isPending || update.isPending;

  return (
    <div>
      <SectionHeader
        title="Portfolio Items"
        onAdd={openAdd}
        addLabel="Add Item"
        ocid="portfolio"
      />
      {isLoading && <LoadingRow ocid="portfolio" />}
      {!isLoading && items.length === 0 && (
        <EmptyRow label="No portfolio items yet." ocid="portfolio" />
      )}
      {items.length > 0 && (
        <AdminTable
          headers={["Title", "Client", "Category", "Year", "Actions"]}
          ocid="portfolio"
        >
          {items.map((item, i) => (
            <TableRow
              key={String(item.id)}
              data-ocid={`portfolio.item.${i + 1}`}
            >
              <TableCell className="font-medium text-white">
                {item.title}
              </TableCell>
              <TableCell style={{ color: "rgba(255,255,255,0.6)" }}>
                {item.clientName}
              </TableCell>
              <TableCell>
                <CategoryBadge>{item.category}</CategoryBadge>
              </TableCell>
              <TableCell style={{ color: "rgba(255,255,255,0.6)" }}>
                {String(item.year)}
              </TableCell>
              <TableCell>
                <RowActions
                  onEdit={() => openEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                  i={i}
                  ocid="portfolio"
                />
              </TableCell>
            </TableRow>
          ))}
        </AdminTable>
      )}
      <AdminDialog
        open={adding || !!editing}
        onClose={closeDialogs}
        title={editing ? "Edit Portfolio Item" : "Add Portfolio Item"}
        ocid="portfolio"
      >
        <FormField label="Title">
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            data-ocid="portfolio.input"
          />
        </FormField>
        <FormField label="Client Name">
          <Input
            value={form.clientName}
            onChange={(e) =>
              setForm((p) => ({ ...p, clientName: e.target.value }))
            }
            data-ocid="portfolio.input"
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Category">
            <Input
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              placeholder="e.g. Web Design"
              data-ocid="portfolio.input"
            />
          </FormField>
          <FormField label="Year">
            <Input
              type="number"
              value={String(form.year)}
              onChange={(e) =>
                setForm((p) => ({ ...p, year: BigInt(e.target.value || 0) }))
              }
              data-ocid="portfolio.input"
            />
          </FormField>
        </div>
        <FormField label="Image URL">
          <Input
            value={form.imageUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, imageUrl: e.target.value }))
            }
            placeholder="https://..."
            data-ocid="portfolio.input"
          />
        </FormField>
        <FormField label="Description">
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            rows={3}
            data-ocid="portfolio.textarea"
          />
        </FormField>
        <DialogFooter>
          <SaveButtons
            onCancel={closeDialogs}
            onSave={handleSave}
            isSaving={isSaving}
            isEdit={!!editing}
            ocid="portfolio"
          />
        </DialogFooter>
      </AdminDialog>
    </div>
  );
}

// ─── Blog Manager ────────────────────────────────────────────────────────────
function BlogManager() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const create = useCreateBlogPost();
  const update = useUpdateBlogPost();
  const remove = useDeleteBlogPost();

  type BForm = Omit<BlogPost, "id">;
  const empty: BForm = {
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    imageUrl: "",
    publishedAt: BigInt(Date.now()) * 1_000_000n,
  };
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<BForm>(empty);

  function openAdd() {
    setForm({ ...empty, publishedAt: BigInt(Date.now()) * 1_000_000n });
    setAdding(true);
  }
  function openEdit(p: BlogPost) {
    setEditing(p);
    setForm({
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      author: p.author,
      imageUrl: p.imageUrl,
      publishedAt: p.publishedAt,
    });
  }
  function closeDialogs() {
    setAdding(false);
    setEditing(null);
  }

  async function handleSave() {
    try {
      if (editing) {
        await update.mutateAsync({ ...form, id: editing.id });
        toast.success("Post updated");
      } else {
        await create.mutateAsync(form);
        toast.success("Post published");
      }
      closeDialogs();
    } catch {
      toast.error("Failed to save");
    }
  }

  async function handleDelete(id: bigint) {
    if (!confirm("Delete this post?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  const isSaving = create.isPending || update.isPending;

  function formatDate(ns: bigint) {
    return new Date(Number(ns / 1_000_000n)).toLocaleDateString();
  }

  return (
    <div>
      <SectionHeader
        title="Blog Posts"
        onAdd={openAdd}
        addLabel="New Post"
        ocid="blog"
      />
      {isLoading && <LoadingRow ocid="blog" />}
      {!isLoading && posts.length === 0 && (
        <EmptyRow label="No blog posts yet." ocid="blog" />
      )}
      {posts.length > 0 && (
        <AdminTable
          headers={["Title", "Author", "Category", "Date", "Actions"]}
          ocid="blog"
        >
          {posts.map((post, i) => (
            <TableRow key={String(post.id)} data-ocid={`blog.item.${i + 1}`}>
              <TableCell className="font-medium text-white max-w-xs">
                <div className="truncate">{post.title}</div>
              </TableCell>
              <TableCell style={{ color: "rgba(255,255,255,0.6)" }}>
                {post.author}
              </TableCell>
              <TableCell>
                <CategoryBadge>{post.category}</CategoryBadge>
              </TableCell>
              <TableCell
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {formatDate(post.publishedAt)}
              </TableCell>
              <TableCell>
                <RowActions
                  onEdit={() => openEdit(post)}
                  onDelete={() => handleDelete(post.id)}
                  i={i}
                  ocid="blog"
                />
              </TableCell>
            </TableRow>
          ))}
        </AdminTable>
      )}
      <AdminDialog
        open={adding || !!editing}
        onClose={closeDialogs}
        title={editing ? "Edit Post" : "New Blog Post"}
        ocid="blog"
      >
        <FormField label="Title">
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            data-ocid="blog.input"
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Author">
            <Input
              value={form.author}
              onChange={(e) =>
                setForm((p) => ({ ...p, author: e.target.value }))
              }
              data-ocid="blog.input"
            />
          </FormField>
          <FormField label="Category">
            <Input
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              placeholder="e.g. SEO"
              data-ocid="blog.input"
            />
          </FormField>
        </div>
        <FormField label="Image URL">
          <Input
            value={form.imageUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, imageUrl: e.target.value }))
            }
            placeholder="https://..."
            data-ocid="blog.input"
          />
        </FormField>
        <FormField label="Excerpt">
          <Textarea
            value={form.excerpt}
            onChange={(e) =>
              setForm((p) => ({ ...p, excerpt: e.target.value }))
            }
            rows={2}
            data-ocid="blog.textarea"
          />
        </FormField>
        <FormField label="Content">
          <Textarea
            value={form.content}
            onChange={(e) =>
              setForm((p) => ({ ...p, content: e.target.value }))
            }
            rows={8}
            data-ocid="blog.textarea"
          />
        </FormField>
        <DialogFooter>
          <SaveButtons
            onCancel={closeDialogs}
            onSave={handleSave}
            isSaving={isSaving}
            isEdit={!!editing}
            saveLabel={editing ? "Update" : "Publish"}
            ocid="blog"
          />
        </DialogFooter>
      </AdminDialog>
    </div>
  );
}

// ─── Testimonials Manager ─────────────────────────────────────────────────────
function TestimonialsManager() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const create = useCreateTestimonial();
  const update = useUpdateTestimonial();
  const remove = useDeleteTestimonial();

  type TForm = Omit<Testimonial, "id">;
  const empty: TForm = {
    clientName: "",
    company: "",
    quote: "",
    rating: 5n,
    avatarUrl: "",
  };
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<TForm>(empty);

  function openAdd() {
    setForm(empty);
    setAdding(true);
  }
  function openEdit(t: Testimonial) {
    setEditing(t);
    setForm({
      clientName: t.clientName,
      company: t.company,
      quote: t.quote,
      rating: t.rating,
      avatarUrl: t.avatarUrl,
    });
  }
  function closeDialogs() {
    setAdding(false);
    setEditing(null);
  }

  async function handleSave() {
    try {
      if (editing) {
        await update.mutateAsync({ ...form, id: editing.id });
        toast.success("Testimonial updated");
      } else {
        await create.mutateAsync(form);
        toast.success("Testimonial added");
      }
      closeDialogs();
    } catch {
      toast.error("Failed to save");
    }
  }

  async function handleDelete(id: bigint) {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  const isSaving = create.isPending || update.isPending;

  return (
    <div>
      <SectionHeader
        title="Testimonials"
        onAdd={openAdd}
        addLabel="Add Testimonial"
        ocid="testimonials"
      />
      {isLoading && <LoadingRow ocid="testimonials" />}
      {!isLoading && testimonials.length === 0 && (
        <EmptyRow label="No testimonials yet." ocid="testimonials" />
      )}
      {testimonials.length > 0 && (
        <AdminTable
          headers={["Client", "Company", "Rating", "Preview", "Actions"]}
          ocid="testimonials"
        >
          {testimonials.map((t, i) => (
            <TableRow
              key={String(t.id)}
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <TableCell className="font-medium text-white">
                {t.clientName}
              </TableCell>
              <TableCell style={{ color: "rgba(255,255,255,0.6)" }}>
                {t.company}
              </TableCell>
              <TableCell>
                <div className="flex gap-0.5">
                  {Array.from({ length: Number(t.rating) }).map(
                    (_unused, j) => (
                      <Star
                        key={`star-${String(t.id)}-${j}`}
                        className="w-3 h-3"
                        style={{ color: "#f59e0b", fill: "#f59e0b" }}
                      />
                    ),
                  )}
                </div>
              </TableCell>
              <TableCell
                className="max-w-xs text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <div className="truncate">{t.quote}</div>
              </TableCell>
              <TableCell>
                <RowActions
                  onEdit={() => openEdit(t)}
                  onDelete={() => handleDelete(t.id)}
                  i={i}
                  ocid="testimonials"
                />
              </TableCell>
            </TableRow>
          ))}
        </AdminTable>
      )}
      <AdminDialog
        open={adding || !!editing}
        onClose={closeDialogs}
        title={editing ? "Edit Testimonial" : "Add Testimonial"}
        ocid="testimonials"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Client Name">
            <Input
              value={form.clientName}
              onChange={(e) =>
                setForm((p) => ({ ...p, clientName: e.target.value }))
              }
              data-ocid="testimonials.input"
            />
          </FormField>
          <FormField label="Company">
            <Input
              value={form.company}
              onChange={(e) =>
                setForm((p) => ({ ...p, company: e.target.value }))
              }
              data-ocid="testimonials.input"
            />
          </FormField>
        </div>
        <FormField label="Rating">
          <Select
            value={String(form.rating)}
            onValueChange={(v) => setForm((p) => ({ ...p, rating: BigInt(v) }))}
          >
            <SelectTrigger
              data-ocid="testimonials.select"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(0,212,255,0.2)",
                color: "white",
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 4, 3, 2, 1].map((r) => (
                <SelectItem key={r} value={String(r)}>
                  {r} Star{r > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Avatar URL (optional)">
          <Input
            value={form.avatarUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, avatarUrl: e.target.value }))
            }
            placeholder="https://..."
            data-ocid="testimonials.input"
          />
        </FormField>
        <FormField label="Quote / Review">
          <Textarea
            value={form.quote}
            onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
            rows={4}
            data-ocid="testimonials.textarea"
          />
        </FormField>
        <DialogFooter>
          <SaveButtons
            onCancel={closeDialogs}
            onSave={handleSave}
            isSaving={isSaving}
            isEdit={!!editing}
            ocid="testimonials"
          />
        </DialogFooter>
      </AdminDialog>
    </div>
  );
}

// ─── Messages Manager ─────────────────────────────────────────────────────────
function MessagesManager() {
  const { data: messages = [], isLoading } = useContactMessages();
  const remove = useDeleteContactMessage();

  function formatDate(ns: bigint) {
    return new Date(Number(ns / 1_000_000n)).toLocaleString();
  }

  async function handleDelete(id: bigint) {
    if (!confirm("Delete this message?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Contact Messages</h2>
        <span
          className="text-xs rounded-full px-3 py-1 font-medium"
          style={{ background: "rgba(0,212,255,0.12)", color: "#00d4ff" }}
        >
          {messages.length} total
        </span>
      </div>
      {isLoading && <LoadingRow ocid="messages" />}
      {!isLoading && messages.length === 0 && (
        <EmptyRow
          label="No messages yet. Chatbot leads will appear here."
          ocid="messages"
        />
      )}
      {messages.length > 0 && (
        <AdminTable
          headers={["Name", "Email", "Message", "Date", "Delete"]}
          ocid="messages"
        >
          {messages.map((msg, i) => (
            <TableRow key={String(msg.id)} data-ocid={`messages.item.${i + 1}`}>
              <TableCell className="font-medium text-white">
                {msg.name}
              </TableCell>
              <TableCell style={{ color: "rgba(255,255,255,0.6)" }}>
                {msg.email}
              </TableCell>
              <TableCell
                className="max-w-xs text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <div className="truncate max-w-[200px]">{msg.message}</div>
              </TableCell>
              <TableCell
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {formatDate(msg.submittedAt)}
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: "rgba(239,68,68,0.6)" }}
                  data-ocid={`messages.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </AdminTable>
      )}
    </div>
  );
}

// ─── Videos Manager ───────────────────────────────────────────────────────────
interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [];

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))(\S{11})/,
  );
  return match ? match[1] : null;
}

function VideosManager() {
  const [videos, setVideos] = useState<VideoItem[]>(() =>
    lsGet("edma_videos", DEFAULT_VIDEOS),
  );
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
  });

  function save(updated: VideoItem[]) {
    setVideos(updated);
    lsSet("edma_videos", updated);
  }

  function handleAdd() {
    if (!form.title || !form.youtubeUrl) {
      toast.error("Title and URL required");
      return;
    }
    const newVideo: VideoItem = { id: Date.now().toString(), ...form };
    save([...videos, newVideo]);
    toast.success("Video added");
    setForm({ title: "", description: "", youtubeUrl: "" });
    setAdding(false);
  }

  function handleDelete(id: string) {
    if (!confirm("Remove this video?")) return;
    save(videos.filter((v) => v.id !== id));
    toast.success("Video removed");
  }

  return (
    <div>
      <SectionHeader
        title="Videos"
        onAdd={() => setAdding(true)}
        addLabel="Add Video"
        ocid="videos"
      />
      {videos.length === 0 && (
        <EmptyRow label="No videos added yet." ocid="videos" />
      )}
      {videos.length > 0 && (
        <div className="grid gap-4">
          {videos.map((v, i) => {
            const ytId = getYouTubeId(v.youtubeUrl);
            return (
              <div
                key={v.id}
                className="flex gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(13,21,32,0.8)",
                  border: "1px solid rgba(0,212,255,0.08)",
                }}
                data-ocid={`videos.item.${i + 1}`}
              >
                {ytId && (
                  <img
                    src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                    alt={v.title}
                    className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white">{v.title}</div>
                  {v.description && (
                    <div
                      className="text-xs mt-1 line-clamp-2"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {v.description}
                    </div>
                  )}
                  <div
                    className="text-xs mt-1 truncate"
                    style={{ color: "rgba(0,212,255,0.6)" }}
                  >
                    {v.youtubeUrl}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(v.id)}
                  className="p-2 rounded-lg self-start transition-colors"
                  style={{ color: "rgba(239,68,68,0.6)" }}
                  data-ocid={`videos.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <AdminDialog
        open={adding}
        onClose={() => setAdding(false)}
        title="Add Video"
        ocid="videos"
      >
        <FormField label="Video Title">
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="EDMA Services Showcase"
            data-ocid="videos.input"
          />
        </FormField>
        <FormField label="YouTube URL">
          <Input
            value={form.youtubeUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, youtubeUrl: e.target.value }))
            }
            placeholder="https://youtube.com/watch?v=..."
            data-ocid="videos.input"
          />
          {form.youtubeUrl && getYouTubeId(form.youtubeUrl) && (
            <img
              src={`https://img.youtube.com/vi/${getYouTubeId(form.youtubeUrl)}/mqdefault.jpg`}
              alt="Preview"
              className="mt-2 rounded-lg w-full"
            />
          )}
        </FormField>
        <FormField label="Description (optional)">
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            rows={2}
            data-ocid="videos.textarea"
          />
        </FormField>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setAdding(false)}
            data-ocid="videos.cancel_button"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            data-ocid="videos.save_button"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#0891b2)",
              color: "#0a0f1a",
            }}
          >
            Add Video
          </Button>
        </DialogFooter>
      </AdminDialog>
    </div>
  );
}

// ─── Services Manager ─────────────────────────────────────────────────────────
interface ServiceCategory {
  id: string;
  name: string;
  subcategories: string[];
}

const DEFAULT_SERVICES: ServiceCategory[] = [
  {
    id: "1",
    name: "Website Designing",
    subcategories: [
      "Business Website",
      "Corporate Website",
      "E-Commerce Website",
      "Portfolio Website",
      "Landing Page",
      "WordPress Website",
      "Shopify Website",
      "UI/UX Design",
    ],
  },
  {
    id: "2",
    name: "Website Development",
    subcategories: [
      "Custom Web Application",
      "React Development",
      "Node.js Backend",
      "API Development",
      "CMS Development",
      "Web Portal Development",
    ],
  },
  {
    id: "3",
    name: "Mobile App Development",
    subcategories: [
      "Android App",
      "iOS App",
      "React Native App",
      "Flutter App",
      "PWA",
      "App UI/UX Design",
    ],
  },
  {
    id: "4",
    name: "Graphic Designing",
    subcategories: [
      "Logo Design",
      "Brand Identity",
      "Social Media Graphics",
      "Brochure Design",
      "Banner Design",
      "Packaging Design",
    ],
  },
  {
    id: "5",
    name: "Digital Marketing",
    subcategories: [
      "SEO",
      "PPC / Google Ads",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Influencer Marketing",
      "ORM",
      "CRO",
    ],
  },
];

function ServicesManager() {
  const [categories, setCategories] = useState<ServiceCategory[]>(() =>
    lsGet("edma_services", DEFAULT_SERVICES),
  );
  const [newCatName, setNewCatName] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newSub, setNewSub] = useState<Record<string, string>>({});
  const [editName, setEditName] = useState<Record<string, string>>({});

  function save(updated: ServiceCategory[]) {
    setCategories(updated);
    lsSet("edma_services", updated);
  }

  function addCategory() {
    if (!newCatName.trim()) return;
    const cat: ServiceCategory = {
      id: Date.now().toString(),
      name: newCatName.trim(),
      subcategories: [],
    };
    save([...categories, cat]);
    setNewCatName("");
    toast.success("Category added");
  }

  function deleteCategory(id: string) {
    if (!confirm("Delete this category and all its subcategories?")) return;
    save(categories.filter((c) => c.id !== id));
    toast.success("Category deleted");
  }

  function addSubcategory(catId: string) {
    const sub = (newSub[catId] || "").trim();
    if (!sub) return;
    save(
      categories.map((c) =>
        c.id === catId ? { ...c, subcategories: [...c.subcategories, sub] } : c,
      ),
    );
    setNewSub((p) => ({ ...p, [catId]: "" }));
  }

  function removeSubcategory(catId: string, sub: string) {
    save(
      categories.map((c) =>
        c.id === catId
          ? { ...c, subcategories: c.subcategories.filter((s) => s !== sub) }
          : c,
      ),
    );
  }

  function saveCatName(catId: string) {
    const name = (editName[catId] || "").trim();
    if (!name) return;
    save(categories.map((c) => (c.id === catId ? { ...c, name } : c)));
    setEditName((p) => {
      const n = { ...p };
      delete n[catId];
      return n;
    });
    toast.success("Category renamed");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Services Manager</h2>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          Local reference — changes here do not auto-update the live site
          sections.
        </p>
      </div>

      {/* Add category */}
      <div className="flex gap-2 mb-6">
        <Input
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="New category name..."
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
          style={{
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(0,212,255,0.2)",
            color: "white",
          }}
          data-ocid="services.input"
        />
        <Button
          onClick={addCategory}
          style={{
            background: "linear-gradient(135deg,#00d4ff,#0891b2)",
            color: "#0a0f1a",
          }}
          data-ocid="services.primary_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <div className="space-y-3">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="rounded-xl overflow-hidden"
            style={{
              background: "rgba(13,21,32,0.8)",
              border: "1px solid rgba(0,212,255,0.1)",
            }}
            data-ocid={`services.item.${i + 1}`}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                type="button"
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                className="flex-1 flex items-center gap-2 text-left"
              >
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${expanded === cat.id ? "rotate-90" : ""}`}
                  style={{ color: "#00d4ff" }}
                />
                {editName[cat.id] !== undefined ? (
                  <input
                    value={editName[cat.id]}
                    onChange={(e) =>
                      setEditName((p) => ({ ...p, [cat.id]: e.target.value }))
                    }
                    onBlur={() => saveCatName(cat.id)}
                    onKeyDown={(e) => e.key === "Enter" && saveCatName(cat.id)}
                    className="bg-transparent border-b outline-none font-medium text-white flex-1"
                    style={{ borderColor: "#00d4ff" }}
                  />
                ) : (
                  <span className="font-medium text-white">{cat.name}</span>
                )}
                <span
                  className="text-xs ml-2 rounded-full px-2 py-0.5"
                  style={{
                    background: "rgba(0,212,255,0.12)",
                    color: "#00d4ff",
                  }}
                >
                  {cat.subcategories.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setEditName((p) => ({ ...p, [cat.id]: cat.name }))
                }
                className="p-1.5 rounded-lg"
                style={{ color: "rgba(255,255,255,0.4)" }}
                data-ocid={`services.edit_button.${i + 1}`}
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => deleteCategory(cat.id)}
                className="p-1.5 rounded-lg"
                style={{ color: "rgba(239,68,68,0.5)" }}
                data-ocid={`services.delete_button.${i + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expanded subcategories */}
            {expanded === cat.id && (
              <div
                className="px-4 pb-4"
                style={{ borderTop: "1px solid rgba(0,212,255,0.07)" }}
              >
                <div className="flex flex-wrap gap-2 mt-3">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(0,212,255,0.1)",
                        color: "#00d4ff",
                        border: "1px solid rgba(0,212,255,0.2)",
                      }}
                    >
                      {sub}
                      <button
                        type="button"
                        onClick={() => removeSubcategory(cat.id, sub)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <Input
                    value={newSub[cat.id] || ""}
                    onChange={(e) =>
                      setNewSub((p) => ({ ...p, [cat.id]: e.target.value }))
                    }
                    placeholder="Add subcategory..."
                    onKeyDown={(e) =>
                      e.key === "Enter" && addSubcategory(cat.id)
                    }
                    className="h-8 text-xs"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(0,212,255,0.15)",
                      color: "white",
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => addSubcategory(cat.id)}
                    style={{
                      background: "rgba(0,212,255,0.15)",
                      color: "#00d4ff",
                      border: "1px solid rgba(0,212,255,0.3)",
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Hero Slides Manager ──────────────────────────────────────────────────────
interface HeroSlide {
  id: number;
  headline: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
}

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    headline: "India's Premier Digital Marketing Agency",
    tagline:
      "Transforming businesses with cutting-edge digital solutions. 500+ projects delivered across 12+ countries.",
    ctaText: "Get Free Consultation",
    ctaLink: "#contact",
  },
  {
    id: 2,
    headline: "Dominate Search Rankings with Expert SEO",
    tagline:
      "Data-driven SEO strategies that put your business on top of Google and drive organic traffic 24/7.",
    ctaText: "Boost My Rankings",
    ctaLink: "#services",
  },
  {
    id: 3,
    headline: "High-ROI PPC Campaigns That Convert",
    tagline:
      "Every rupee counts. Our PPC experts optimize your ad spend for maximum clicks, leads, and revenue.",
    ctaText: "Start PPC Campaign",
    ctaLink: "#contact",
  },
  {
    id: 4,
    headline: "Social Media Marketing That Builds Brands",
    tagline:
      "From Instagram to LinkedIn, we create viral content and grow your audience across all platforms.",
    ctaText: "Grow My Audience",
    ctaLink: "#contact",
  },
  {
    id: 5,
    headline: "Stunning Websites That Win Clients",
    tagline:
      "Beautiful, fast, and conversion-optimized web designs that make your brand stand out online.",
    ctaText: "See Our Work",
    ctaLink: "#portfolio",
  },
  {
    id: 6,
    headline: "Powerful Web Development Solutions",
    tagline:
      "Custom web applications built with React, Node.js, and modern technologies for scalable performance.",
    ctaText: "Build My Website",
    ctaLink: "#contact",
  },
  {
    id: 7,
    headline: "Mobile Apps That Users Love",
    tagline:
      "iOS and Android apps with stunning UX, built to engage users and grow your mobile presence.",
    ctaText: "Build My App",
    ctaLink: "#contact",
  },
  {
    id: 8,
    headline: "Brand Identity That Commands Attention",
    tagline:
      "Logo, branding, and visual identity design that communicates your brand's value at a glance.",
    ctaText: "Design My Brand",
    ctaLink: "#contact",
  },
  {
    id: 9,
    headline: "Content Marketing That Drives Authority",
    tagline:
      "SEO-optimized blogs, videos, and infographics that position your brand as the industry leader.",
    ctaText: "Start Content Strategy",
    ctaLink: "#contact",
  },
  {
    id: 10,
    headline: "E-Commerce Solutions That Sell More",
    tagline:
      "From Shopify to custom carts, we build e-commerce experiences that convert browsers to buyers.",
    ctaText: "Launch My Store",
    ctaLink: "#contact",
  },
  {
    id: 11,
    headline: "Digital Strategy for Sustainable Growth",
    tagline:
      "Holistic digital marketing roadmaps tailored to your business goals, audience, and budget.",
    ctaText: "Plan My Strategy",
    ctaLink: "#contact",
  },
];

function HeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>(() =>
    lsGet("edma_hero_slides", DEFAULT_HERO_SLIDES),
  );
  const [dirty, setDirty] = useState(false);

  function updateSlide(id: number, field: keyof HeroSlide, value: string) {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
    setDirty(true);
  }

  function saveAll() {
    lsSet("edma_hero_slides", slides);
    setDirty(false);
    toast.success("Hero slides saved");
  }

  function resetAll() {
    if (!confirm("Reset all slides to defaults?")) return;
    setSlides(DEFAULT_HERO_SLIDES);
    lsSet("edma_hero_slides", DEFAULT_HERO_SLIDES);
    setDirty(false);
    toast.success("Reset to defaults");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Hero Slides</h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Edit the 11-slide homepage carousel content.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetAll}
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={saveAll}
            disabled={!dirty}
            style={{
              background: dirty
                ? "linear-gradient(135deg,#00d4ff,#0891b2)"
                : "rgba(0,212,255,0.2)",
              color: dirty ? "#0a0f1a" : "#00d4ff",
            }}
            data-ocid="hero.save_button"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="rounded-xl p-5"
            style={{
              background: "rgba(13,21,32,0.8)",
              border: "1px solid rgba(0,212,255,0.08)",
            }}
            data-ocid={`hero.item.${i + 1}`}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#00d4ff" }}
            >
              Slide {slide.id}
            </div>
            <div className="grid gap-3">
              <div>
                <Label
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Headline
                </Label>
                <Input
                  value={slide.headline}
                  onChange={(e) =>
                    updateSlide(slide.id, "headline", e.target.value)
                  }
                  className="mt-1 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(0,212,255,0.15)",
                    color: "white",
                  }}
                />
              </div>
              <div>
                <Label
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Tagline
                </Label>
                <Textarea
                  value={slide.tagline}
                  onChange={(e) =>
                    updateSlide(slide.id, "tagline", e.target.value)
                  }
                  rows={2}
                  className="mt-1 text-sm resize-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(0,212,255,0.15)",
                    color: "white",
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    CTA Text
                  </Label>
                  <Input
                    value={slide.ctaText}
                    onChange={(e) =>
                      updateSlide(slide.id, "ctaText", e.target.value)
                    }
                    className="mt-1 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(0,212,255,0.15)",
                      color: "white",
                    }}
                  />
                </div>
                <div>
                  <Label
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    CTA Link
                  </Label>
                  <Input
                    value={slide.ctaLink}
                    onChange={(e) =>
                      updateSlide(slide.id, "ctaLink", e.target.value)
                    }
                    className="mt-1 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(0,212,255,0.15)",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Manager ─────────────────────────────────────────────────────────
interface SiteSettings {
  stats: {
    projects: string;
    clients: string;
    countries: string;
    years: string;
  };
  contact: { phone: string; email: string; address: string; whatsapp: string };
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  stats: { projects: "500+", clients: "200+", countries: "12", years: "8+" },
  contact: {
    phone: "+91-XXXXXXXXXX",
    email: "info@ermsintelligence.com",
    address: "Indore, Madhya Pradesh, India",
    whatsapp: "+91-XXXXXXXXXX",
  },
  social: {
    instagram: "https://instagram.com/edma",
    facebook: "https://facebook.com/edma",
    twitter: "https://twitter.com/edma",
    linkedin: "https://linkedin.com/company/edma",
    youtube: "https://youtube.com/@edma",
  },
};

function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    lsGet("edma_settings", DEFAULT_SETTINGS),
  );

  function save(
    section: keyof SiteSettings,
    data: SiteSettings[typeof section],
  ) {
    const updated = { ...settings, [section]: data };
    setSettings(updated);
    lsSet("edma_settings", updated);
    toast.success("Settings saved");
  }

  function SettingSection({
    title,
    section,
    fields,
  }: {
    title: string;
    section: keyof SiteSettings;
    fields: { key: string; label: string; placeholder?: string }[];
  }) {
    const [local, setLocal] = useState({
      ...(settings[section] as Record<string, string>),
    });
    return (
      <div
        className="rounded-xl p-6"
        style={{
          background: "rgba(13,21,32,0.8)",
          border: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <h3 className="font-semibold text-white mb-4">{title}</h3>
        <div className="grid gap-4">
          {fields.map((f) => (
            <FormField key={f.key} label={f.label}>
              <Input
                value={local[f.key] || ""}
                onChange={(e) =>
                  setLocal((p) => ({ ...p, [f.key]: e.target.value }))
                }
                placeholder={f.placeholder}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(0,212,255,0.15)",
                  color: "white",
                }}
                data-ocid="settings.input"
              />
            </FormField>
          ))}
        </div>
        <Button
          className="mt-4"
          onClick={() => save(section, local as SiteSettings[typeof section])}
          style={{
            background: "linear-gradient(135deg,#00d4ff,#0891b2)",
            color: "#0a0f1a",
          }}
          data-ocid="settings.save_button"
        >
          Save {title}
        </Button>
      </div>
    );
  }

  // ─── Change Password local state ───────────────────────────────────────────
  const [credForm, setCredForm] = useState({
    currentPw: "",
    newUser: "",
    newPw: "",
    confirmPw: "",
  });
  const storedCreds = getStoredCreds();

  function saveCredentials() {
    if (credForm.currentPw !== storedCreds.password) {
      toast.error("Current password is incorrect");
      return;
    }
    if (!credForm.newUser.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    if (credForm.newPw.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (credForm.newPw !== credForm.confirmPw) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      localStorage.setItem(
        CREDS_KEY,
        JSON.stringify({
          username: credForm.newUser,
          password: credForm.newPw,
        }),
      );
    } catch {}
    setCredForm({ currentPw: "", newUser: "", newPw: "", confirmPw: "" });
    toast.success("Admin credentials updated");
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Site Settings</h2>

      {/* Admin Credentials Card */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "rgba(13,21,32,0.8)",
          border: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <h3 className="font-semibold text-white mb-1">Admin Credentials</h3>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
          Current username:{" "}
          <span className="text-cyan-400 font-mono">
            {storedCreds.username}
          </span>
        </p>
        <div className="grid gap-4">
          <FormField label="Current Password">
            <Input
              type="password"
              value={credForm.currentPw}
              onChange={(e) =>
                setCredForm((p) => ({ ...p, currentPw: e.target.value }))
              }
              placeholder="Enter current password"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(0,212,255,0.15)",
                color: "white",
              }}
              data-ocid="settings.input"
            />
          </FormField>
          <FormField label="New Username">
            <Input
              type="text"
              value={credForm.newUser}
              onChange={(e) =>
                setCredForm((p) => ({ ...p, newUser: e.target.value }))
              }
              placeholder="Enter new username"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(0,212,255,0.15)",
                color: "white",
              }}
              data-ocid="settings.input"
            />
          </FormField>
          <FormField label="New Password">
            <Input
              type="password"
              value={credForm.newPw}
              onChange={(e) =>
                setCredForm((p) => ({ ...p, newPw: e.target.value }))
              }
              placeholder="Min 6 characters"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(0,212,255,0.15)",
                color: "white",
              }}
              data-ocid="settings.input"
            />
          </FormField>
          <FormField label="Confirm New Password">
            <Input
              type="password"
              value={credForm.confirmPw}
              onChange={(e) =>
                setCredForm((p) => ({ ...p, confirmPw: e.target.value }))
              }
              placeholder="Repeat new password"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(0,212,255,0.15)",
                color: "white",
              }}
              data-ocid="settings.input"
            />
          </FormField>
        </div>
        <Button
          className="mt-4"
          onClick={saveCredentials}
          style={{
            background: "linear-gradient(135deg,#00d4ff,#0891b2)",
            color: "#0a0f1a",
          }}
          data-ocid="settings.save_button"
        >
          Update Credentials
        </Button>
      </div>

      <SettingSection
        title="About Stats"
        section="stats"
        fields={[
          { key: "projects", label: "Projects Count", placeholder: "500+" },
          { key: "clients", label: "Clients Count", placeholder: "200+" },
          { key: "countries", label: "Countries", placeholder: "12" },
          { key: "years", label: "Years Experience", placeholder: "8+" },
        ]}
      />
      <SettingSection
        title="Contact Information"
        section="contact"
        fields={[
          { key: "phone", label: "Phone Number" },
          { key: "email", label: "Email Address" },
          { key: "address", label: "Office Address" },
          { key: "whatsapp", label: "WhatsApp Number" },
        ]}
      />
      <SettingSection
        title="Social Media Links"
        section="social"
        fields={[
          { key: "instagram", label: "Instagram URL" },
          { key: "facebook", label: "Facebook URL" },
          { key: "twitter", label: "Twitter / X URL" },
          { key: "linkedin", label: "LinkedIn URL" },
          { key: "youtube", label: "YouTube URL" },
        ]}
      />
    </div>
  );
}

// ─── Shared UI Components ─────────────────────────────────────────────────────
function SectionHeader({
  title,
  onAdd,
  addLabel,
  ocid,
}: {
  title: string;
  onAdd: () => void;
  addLabel: string;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        style={{
          background: "linear-gradient(135deg,#00d4ff,#0891b2)",
          color: "#0a0f1a",
        }}
        data-ocid={`${ocid}.open_modal_button`}
      >
        <Plus className="w-4 h-4" />
        {addLabel}
      </button>
    </div>
  );
}

function LoadingRow({ ocid }: { ocid: string }) {
  return (
    <div
      className="flex items-center gap-3 py-8 justify-center"
      data-ocid={`${ocid}.loading_state`}
    >
      <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#00d4ff" }} />
      <span style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</span>
    </div>
  );
}

function EmptyRow({ label, ocid }: { label: string; ocid: string }) {
  return (
    <div
      className="text-center py-12 rounded-xl"
      style={{
        background: "rgba(13,21,32,0.5)",
        border: "1px dashed rgba(0,212,255,0.15)",
        color: "rgba(255,255,255,0.3)",
      }}
      data-ocid={`${ocid}.empty_state`}
    >
      {label}
    </div>
  );
}

function AdminTable({
  headers,
  children,
  ocid,
}: {
  headers: string[];
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(0,212,255,0.08)" }}
    >
      <Table data-ocid={`${ocid}.table`}>
        <TableHeader>
          <TableRow
            style={{
              background: "rgba(0,212,255,0.04)",
              borderColor: "rgba(0,212,255,0.08)",
            }}
          >
            {headers.map((h) => (
              <TableHead
                key={h}
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}

function CategoryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-medium"
      style={{ background: "rgba(0,212,255,0.12)", color: "#00d4ff" }}
    >
      {children}
    </span>
  );
}

function RowActions({
  onEdit,
  onDelete,
  i,
  ocid,
}: {
  onEdit: () => void;
  onDelete: () => void;
  i: number;
  ocid: string;
}) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={onEdit}
        className="p-1.5 rounded-lg transition-colors"
        style={{ color: "rgba(0,212,255,0.7)" }}
        data-ocid={`${ocid}.edit_button.${i + 1}`}
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 rounded-lg transition-colors"
        style={{ color: "rgba(239,68,68,0.6)" }}
        data-ocid={`${ocid}.delete_button.${i + 1}`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function AdminDialog({
  open,
  onClose,
  title,
  children,
  ocid,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent
        className="max-w-lg max-h-[85vh] overflow-y-auto"
        style={{
          background: "#0d1520",
          border: "1px solid rgba(0,212,255,0.2)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          color: "white",
        }}
        data-ocid={`${ocid}.dialog`}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "white" }}>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function SaveButtons({
  onCancel,
  onSave,
  isSaving,
  isEdit,
  saveLabel,
  ocid,
}: {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
  isEdit: boolean;
  saveLabel?: string;
  ocid: string;
}) {
  return (
    <>
      <Button
        variant="outline"
        onClick={onCancel}
        style={{
          borderColor: "rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.6)",
        }}
        data-ocid={`${ocid}.cancel_button`}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        disabled={isSaving}
        style={{
          background: "linear-gradient(135deg,#00d4ff,#0891b2)",
          color: "#0a0f1a",
        }}
        data-ocid={`${ocid}.save_button`}
      >
        {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {saveLabel ?? (isEdit ? "Update" : "Create")}
      </Button>
    </>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const { isLoggedIn, login, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: messages = [] } = useContactMessages();

  // Close sidebar on resize to desktop
  const resizeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    function handleResize() {
      if (resizeRef.current) clearTimeout(resizeRef.current);
      resizeRef.current = setTimeout(() => {
        if (window.innerWidth >= 1024) setSidebarOpen(false);
      }, 150);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLogin={login} />;
  }

  const CONTENT: Record<Tab, React.ReactNode> = {
    dashboard: <Dashboard onNavigate={setActiveTab} />,
    blog: <BlogManager />,
    portfolio: <PortfolioManager />,
    testimonials: <TestimonialsManager />,
    videos: <VideosManager />,
    services: <ServicesManager />,
    hero: <HeroSlidesManager />,
    messages: <MessagesManager />,
    settings: <SettingsManager />,
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#0a0f1a" }}>
      <Sidebar
        active={activeTab}
        onNavigate={setActiveTab}
        onLogout={logout}
        messageCount={messages.length}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-14 flex items-center gap-4 px-4 lg:px-8 sticky top-0 z-30"
          style={{
            background: "rgba(8,14,24,0.95)",
            borderBottom: "1px solid rgba(0,212,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onClick={() => setSidebarOpen(true)}
            data-ocid="admin.toggle"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <span
              className="text-sm font-medium capitalize"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {activeTab === "hero"
                ? "Hero Slides"
                : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Admin
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hidden sm:flex"
              style={{
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">{CONTENT[activeTab]}</div>
        </main>

        {/* Footer */}
        <footer
          className="px-8 py-4 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(0,212,255,0.06)",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          EDMA Admin Panel · ERMS Intelligence Private Limited · Indore, India
        </footer>
      </div>
    </div>
  );
}
