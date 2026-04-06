import { z } from "zod";

const recurrenceSchema = z
  .object({
    enabled: z.boolean(),
    dayOfMonth: z.number().int().min(1).max(31).optional(),
    recurrenceType: z.enum(["limited", "unlimited"]).optional(),
    maxCycles: z.number().int().positive().optional(),
    unlimitedMode: z.enum(["automatic", "manual"]).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.enabled) {
      return;
    }

    if (!value.dayOfMonth) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Dia da recorrencia obrigatorio.", path: ["dayOfMonth"] });
    }

    if (!value.recurrenceType) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Tipo de recorrencia obrigatorio.", path: ["recurrenceType"] });
      return;
    }

    if (value.recurrenceType === "limited") {
      if (!value.maxCycles || !Number.isInteger(value.maxCycles) || value.maxCycles <= 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Quantidade de meses obrigatoria.", path: ["maxCycles"] });
      }
    }

    if (value.recurrenceType === "unlimited" && !value.unlimitedMode) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Modo da recorrencia obrigatorio.", path: ["unlimitedMode"] });
    }
  });

export const transactionSchema = z.object({
  name: z.string().min(1).max(120),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1).max(120),
  amount: z.number().positive(),
  transactionDate: z.string().min(10),
  notes: z.string().max(500).optional(),
  recurrence: recurrenceSchema.optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
