import { auth } from "@/auth";
import { errorResponse, successResponse } from "@/lib/api/response";
import { toDashboardResponse } from "@/mappers/dashboard.mapper";
import { getDashboardStats } from "@/services/dashboard.service";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return errorResponse("Unauthorized.", 401);
        }

        const stats = await getDashboardStats(session.user.id);

        return successResponse(
            toDashboardResponse(stats),
            "Dashboard stats fetched successfully.",
        );
    } catch {
        return errorResponse();
    }
}
