import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  items: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => string;
  emptyMessage: string;
}

export function DataTable<T>({ items, columns, getRowKey, emptyMessage }: DataTableProps<T>) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center text-sm text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface">
          <tr>
            {columns.map((column) => (
              <th key={column.header} className="px-4 py-3 font-medium text-muted">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={getRowKey(item)} className="border-b border-border last:border-0">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={cn("px-4 py-3 text-foreground", column.className)}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
