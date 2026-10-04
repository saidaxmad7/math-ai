import { z } from 'zod';

export const updateUserRoleSchema = z.object({
    role: z.enum(['USER', 'ADMIN']),
});

export type UpdateUserRolePayload = z.infer<typeof updateUserRoleSchema>;

export const adminUsersQuerySchema = z.object({
    search: z.string().optional(),
    role: z.enum(['ALL', 'USER', 'ADMIN']).optional().default('ALL'),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(50),
});

export type AdminUsersQuery = z.infer<typeof adminUsersQuerySchema>;
