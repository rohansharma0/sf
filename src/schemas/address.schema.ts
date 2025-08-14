import { z } from "zod";

export const createAddressSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    country: z.string().min(1),
    state: z.string().min(1),
    address1: z.string().min(1),
    address2: z.string().optional(),
    phoneNumber: z.string().min(5),
    city: z.string().min(1),
    zip: z.string().min(1),
    isPrimary: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
