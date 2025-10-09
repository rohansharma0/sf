import { z } from "zod";

export const createAddressSchema = z.object({
    name: z.string().min(1),
    country: z.string().min(1),
    state: z.string().min(1),
    address1: z.string().min(1),
    address2: z.string().optional(),
    phoneNumber: z.number().min(10),
    city: z.string().min(1),
    zip: z.number().min(1),
    isPrimary: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
