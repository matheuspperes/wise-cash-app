# Contract - Recurrences View

Scope: Contrato de dados e acoes para a view `GET /transactions?view=recurrences` no cliente.

## 1) View Resolution
- Input: query param `view`
- Accepted value for this feature: `recurrences`
- Behavior:
  - Quando `view=recurrences`, o client MUST renderizar `RecurrencesPage`.
  - Para valores invalidos, fallback para comportamento existente do parser de view.

## 2) RecurrencesPage Props Contract

```ts
type RecurrencesPageProps = {
  pendingItems: PendingConfirmationItem[];
  recurrenceItems: RecurrenceListItem[];
  isLoading?: boolean;
  isSubmittingPending?: boolean;
  onConfirmPending: (id: string) => Promise<void>;
  onCancelPending: (id: string) => Promise<void>;
  onEditRecurrence: (id: string) => void;
  onDeleteRecurrence: (id: string) => Promise<void>;
};
```

## 3) Pending Block Contract
- Component: `RecurrencePendingConfirmationsList` (reuso)
- Empty state:
  - Condition: `pendingItems.length === 0`
  - Message: `Sem confirmações pendentes`
- Actions:
  - Confirm -> `confirmLocalRecurrencePending(id)`
  - Cancel -> `cancelLocalRecurrencePending(id)`
- Post-action behavior:
  - Refetch/list refresh MUST run after mutacao.
  - Evento `wisecash:transactions-mutated` SHOULD be dispatched to sync other screens.

## 4) Recurrences Block Contract
- Component: `RecurrencesList`
- Required columns/fields per item:
  - Nome (`templateName`)
  - Valor (`templateAmount` formatado)
  - Proxima data agendada (`nextScheduledDate`)
  - Tipo (`templateType`)
  - Status (`Ilimitada`, `1 mês faltante`, `N meses faltantes` ou `Sem ciclos restantes`)
  - Acoes (`Editar`, `Excluir`)
- Empty state:
  - Condition: `recurrenceItems.length === 0`
  - Message: `Nenhuma recorrência cadastrada`
- Delete contract:
  - MUST require explicit user confirmation before removal/deactivation.

## 5) Local Gateway Contract Extension

```ts
type ListLocalRecurrencesResponse = {
  items: RecurrenceListItem[];
};

async function getAllLocalRecurrences(): Promise<ListLocalRecurrencesResponse>;
```

- Notes:
  - Nome da funcao pode seguir padrao ja adotado no gateway (`list*`), mantendo semantica equivalente.
  - A implementacao MUST encapsular acesso a repositórios locais e mapear erros para mensagens consistentes.
  - StorageUnavailableError deve continuar sendo tratado como erro de armazenamento indisponivel; listas vazias devem retornar `items: []`.

## 6) Transaction Form Tooltip Contract
- Scope: `transaction-form.tsx`
- Requirements:
  - Tooltip no rotulo `Recorrência` com conteudo: `Ative para repetir este lançamento mensalmente.`
  - Tooltips de tipo e modo posicionados imediatamente a direita dos respectivos selects.
  - Frase explicativa removida do corpo fixo da secao.
