import EmptyState from "./EmptyState";

export default function Table({ columns = [], rows = [], emptyMessage = "Nothing here yet." }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-line/10">
        <EmptyState title={emptyMessage} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-line/10 overflow-hidden">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-4 py-3 text-[11px] font-semibold text-fg/40 uppercase tracking-wide border-b border-line/10"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex !== rows.length - 1 ? "border-b border-line/10" : ""}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-middle text-fg">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}