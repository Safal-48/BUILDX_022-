import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getUserNotifications,
  markNotificationAsRead,
  createNotification,
} from "@/lib/marketplace/opportunity-repository";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const queryUserId = searchParams.get("userId");
    // Graceful fallback to demo student if session cookie is not present in demo mode
    const userId = session?.id || queryUserId || "usr-demo-student-01";

    const notifications = await getUserNotifications(userId);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json({ notifications, unreadCount }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const queryUserId = searchParams.get("userId");
    const userId = session?.id || queryUserId || "usr-demo-student-01";

    if (!id) {
      return NextResponse.json({ error: "Notification ID is required" }, { status: 400 });
    }

    const success = await markNotificationAsRead(userId, id);
    return NextResponse.json({ success }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const queryUserId = searchParams.get("userId");
    const userId = session?.id || queryUserId || "usr-demo-student-01";

    const body = await req.json();
    const { title, message, type = "application_status", linkUrl = "/applications" } = body;

    if (!title || !message) {
      return NextResponse.json({ error: "Title and message are required" }, { status: 400 });
    }

    const notification = createNotification(userId, title, message, type, linkUrl);
    return NextResponse.json({ notification }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
