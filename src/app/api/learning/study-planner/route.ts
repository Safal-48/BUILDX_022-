import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import {
  getOrCreateStudyPlanner,
  adaptStudyPlan,
  toggleTaskStatus,
  addExamToPlanner,
} from "@/lib/learning/study-planner-engine";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const userId = session?.id || searchParams.get("userId") || "usr-demo-student-01";

    const planner = getOrCreateStudyPlanner(userId);
    return NextResponse.json({ success: true, planner }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const userId = session?.id || searchParams.get("userId") || "usr-demo-student-01";

    const body = await req.json();
    const { action } = body;

    if (action === "adapt") {
      const { event, newBudget, examId, daysShifted } = body;
      const updated = adaptStudyPlan(userId, event, { newBudget, examId, daysShifted });
      return NextResponse.json({ success: true, planner: updated }, { status: 200 });
    }

    if (action === "toggle_task") {
      const { taskId } = body;
      if (!taskId) {
        return NextResponse.json({ error: "taskId is required" }, { status: 400 });
      }
      const updated = toggleTaskStatus(userId, taskId);
      return NextResponse.json({ success: true, planner: updated }, { status: 200 });
    }

    if (action === "add_exam") {
      const { exam } = body;
      if (!exam || !exam.subject || !exam.title || !exam.examDate) {
        return NextResponse.json({ error: "Missing required exam fields" }, { status: 400 });
      }
      const updated = addExamToPlanner(userId, exam);
      return NextResponse.json({ success: true, planner: updated }, { status: 201 });
    }

    if (action === "update_budget") {
      const { newBudget } = body;
      const updated = adaptStudyPlan(userId, "budget_changed", { newBudget });
      return NextResponse.json({ success: true, planner: updated }, { status: 200 });
    }

    if (action === "regenerate" || action === "reset") {
      const planner = getOrCreateStudyPlanner(userId);
      const { buildTodayPlan, buildWeeklySchedule } = await import("@/lib/learning/study-planner-engine");
      planner.todayPlan = buildTodayPlan(planner.dailyMinutes, planner.preferredTimeSlot, planner.exams, false);
      planner.weeklySchedule = buildWeeklySchedule(planner.dailyMinutes, false);
      planner.lastAdaptedReason = "🔄 Plan Regenerated: Schedule freshly re-synthesized from your live Skill DNA and upcoming exam deadlines.";
      planner.updatedAt = new Date().toISOString();
      return NextResponse.json({ success: true, planner }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
