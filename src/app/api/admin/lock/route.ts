import { cookies } from 'next/headers';
import { successResponse } from '@/lib/api/response';

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_pin_verified');

    return successResponse(
        { isUnlocked: false },
        "Admin panel xavfsiz qulflandi.",
    );
}
