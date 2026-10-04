import { cookies } from 'next/headers';
import { successResponse } from '@/lib/api/response';

export async function GET() {
    const cookieStore = await cookies();
    const isUnlocked = cookieStore.get('admin_pin_verified')?.value === 'true';

    return successResponse(
        { isUnlocked },
        "Admin PIN holati olindi.",
    );
}
