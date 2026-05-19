import { z } from "zod";

// Raw CSV row schema (Portuguese headers)
export const csvTemplateRowSchema = z.object({
  Nome: z.string(),
  Tipo: z.string(),
  Categoria: z.string().optional(),
  Valor: z.string(),
  Data: z.string(),
  Observacoes: z.string().optional(),
  "Recorrencia Ativa": z.string().optional(),
  "Dia da Recorrencia": z.string().optional(),
  "Tipo da Recorrencia": z.string().optional(),
  "Quantidade de Meses": z.string().optional(),
  "Modo da Recorrencia": z.string().optional(),
}).superRefine((row, ctx) => {
  // Basic format checks
  const valor = row.Valor?.trim();
  if (!valor || !/^\d+(\.\d{1,2})?$/.test(valor)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Valor inválido: use ponto decimal (ex.: 129.90)', path: ["Valor"] });
  }

  const date = row.Data?.trim();
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Data inválida: use YYYY-MM-DD', path: ["Data"] });
  }

  const recActive = (row["Recorrencia Ativa"] || '').trim();
  if (recActive && !/^(Sim|Nao)$/i.test(recActive)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Recorrencia Ativa deve ser Sim ou Nao', path: ["Recorrencia Ativa"] });
  }

  if (/^\s*Sim\s*$/i.test(recActive)) {
    const dia = (row["Dia da Recorrencia"] || '').trim();
    const tipo = (row["Tipo da Recorrencia"] || '').trim();
    if (!dia || !/^\d+$/.test(dia) || Number(dia) < 1 || Number(dia) > 31) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Dia da Recorrencia inválido (1-31)', path: ["Dia da Recorrencia"] });
    }

    if (!tipo || !/^(Limitada|Ilimitada)$/i.test(tipo)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Tipo da Recorrencia deve ser Limitada ou Ilimitada', path: ["Tipo da Recorrencia"] });
    }

    if (/^\s*Limitada\s*$/i.test(tipo)) {
      const qtd = (row["Quantidade de Meses"] || '').trim();
      if (!qtd || !/^\d+$/.test(qtd) || Number(qtd) <= 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Quantidade de Meses obrigatória e deve ser inteiro > 0', path: ["Quantidade de Meses"] });
      }
    }

    if (/^\s*Ilimitada\s*$/i.test(tipo)) {
      const modo = (row["Modo da Recorrencia"] || '').trim();
      if (!modo || !/^(Automatica|Manual)$/i.test(modo)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Modo da Recorrencia deve ser Automatica ou Manual', path: ["Modo da Recorrencia"] });
      }
    }
  }
});

export type CsvTemplateRow = z.infer<typeof csvTemplateRowSchema>;
