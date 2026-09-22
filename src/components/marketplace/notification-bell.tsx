"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Bell,
  Sparkles,
  Clock,
  CheckCircle2,
  X,
  Briefcase,
  Award,
  CheckCheck,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserNotificationEntity } from "@/lib/supabase/types";

const NOTIFICATION_CACHE_KEY = "skillora_notifications_cache";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<UserNotificationEntity[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync to localStorage
  const saveToStorage = (items: UserNotificationEntity[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(NOTIFICATION_CACHE_KEY, JSON.stringify(items));
      } catch {
        // Ignore storage write error
      }
    }
  };

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        const serverItems: UserNotificationEntity[] = data.notifications || [];
        
        // Merge with local storage if any items were posted recently
        setNotifications((prev) => {
          const map = new Map<string, UserNotificationEntity>();
          // Server items take precedence
          serverItems.forEach((item) => map.set(item.id, item));
          // Keep any optimistic local items
          prev.forEach((item) => {
            if (!map.has(item.id)) {
              map.set(item.id, item);
            }
          });
          const merged = Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          saveToStorage(merged);
          return merged;
        });
        setUnreadCount(data.unreadCount ?? serverItems.filter((n) => !n.isRead).length);
      }
    } catch {
      // Ignore background fetch error
    }
  }, []);

  // Hydrate on mount from localStorage then fetch from server
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(NOTIFICATION_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as UserNotificationEntity[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setNotifications(parsed);
            setUnreadCount(parsed.filter((n) => !n.isRead).length);
          }
        }
      } catch {
        // Ignore parse error
      }
    }

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Listen for real-time application submission & notification update events
  useEffect(() => {
    const handleNotificationUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserNotificationEntity | undefined>;
      if (customEvent.detail && customEvent.detail.id) {
        const newNotif = customEvent.detail;
        setNotifications((prev) => {
          const filtered = prev.filter((n) => n.id !== newNotif.id);
          const updated = [newNotif, ...filtered];
          saveToStorage(updated);
          return updated;
        });
        setUnreadCount((prev) => prev + 1);
      } else {
        fetchNotifications();
      }
    };

    window.addEventListener("skillora:notification-update", handleNotificationUpdate);
    window.addEventListener("skillora:application-submitted", handleNotificationUpdate);

    return () => {
      window.removeEventListener("skillora:notification-update", handleNotificationUpdate);
      window.removeEventListener("skillora:application-submitted", handleNotificationUpdate);
    };
  }, [fetchNotifications]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications?id=${id}`, { method: "PUT" });
    } catch {
      // Ignore network failure
    }
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, isRead: true } : n));
      saveToStorage(updated);
      return updated;
    });
    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    for (const n of unread) {
      fetch(`/api/notifications?id=${n.id}`, { method: "PUT" }).catch(() => {});
    }
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    saveToStorage(updated);
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application_status":
        return <Briefcase className="h-4 w-4 text-cyan-400" />;
      case "match_alert":
        return <Sparkles className="h-4 w-4 text-amber-400" />;
      case "interview_invite":
        return <Award className="h-4 w-4 text-emerald-400" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
        title="Notifications"
      >
        <Bell className="h-4 w-4 text-foreground/80" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-950/95 border border-cyan-500/20 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">Notifications</span>
              {unreadCount > 0 ? (
                <Badge variant="destructive" size="sm" className="font-mono text-[10px]">
                  {unreadCount} NEW
                </Badge>
              ) : (
                <Badge variant="glass" size="sm" className="font-mono text-[10px]">
                  {notifications.length} TOTAL
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="h-3 w-3" />
                  <span>Mark all read</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-white/5 transition-colors"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2.5 cyber-scrollbar pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <div className="h-10 w-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-muted-foreground">
                  <Bell className="h-5 w-5" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">No notifications yet.</p>
                <p className="text-[11px] text-muted-foreground/70">
                  Applications &amp; status updates will appear here automatically.
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleMarkAsRead(n.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    !n.isRead
                      ? "bg-cyan-950/30 border-cyan-500/40 text-foreground shadow-[0_0_15px_rgba(6,182,212,0.08)]"
                      : "bg-white/[0.02] border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-white/[0.04] border border-white/10">
                      {getNotificationIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="font-bold text-xs text-foreground leading-snug truncate">
                          {n.title}
                        </h5>
                        <span className="text-[9px] font-mono text-muted-foreground shrink-0 flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/90 leading-relaxed line-clamp-3">
                        {n.message}
                      </p>
                      {n.linkUrl && (
                        <Link
                          href={n.linkUrl}
                          onClick={() => setIsOpen(false)}
                          className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 pt-1"
                        >
                          <span>View in Pipeline</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Footer Link */}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <Link
              href="/applications"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-cyan-400 font-mono text-[11px] flex items-center gap-1 transition-colors"
            >
              <span>Application Tracker</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <span className="text-[10px] font-mono text-slate-500">Live Telemetry</span>
          </div>
        </div>
      )}
    </div>
  );
}
