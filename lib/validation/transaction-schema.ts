import { z } from "zod";

export const transactionSchema = z.object({
  name: z.string().min(1).max(120),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1).max(120),
  amount: z.number().positive(),
  transactionDate: z.string().min(10),
  notes: z.string().max(500).optional(),
  recurrence: z
    .object({
      enabled: z.boolean(),
      dayOfMonth: z.number().int().min(1).max(31).optional(),
    })
    .optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
