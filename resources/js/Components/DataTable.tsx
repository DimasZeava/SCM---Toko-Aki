import React from "react";

interface Column<T> {
    label: string;
    render: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: (item: T) => React.ReactNode;
}

function DataTable<T>({
    columns,
    data,
    actions,
    currentPage = 1,
    perPage = 10,
}: DataTableProps<T> & { currentPage?: number; perPage?: number }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 block sm:table">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2 border-b whitespace-nowrap">
                            No
                        </th>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="text-left px-4 py-2 border-b whitespace-nowrap"
                            >
                                {col.label}
                            </th>
                        ))}
                        {actions && (
                            <th className="text-left px-4 py-2 border-b whitespace-nowrap">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="text-center px-4 py-2"
                            >
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b whitespace-nowrap">
                                    {(currentPage - 1) * perPage + idx + 1}
                                </td>
                                {columns.map((col, colIdx) => (
                                    <td
                                        key={colIdx}
                                        className="px-4 py-2 border-b whitespace-nowrap"
                                    >
                                        {col.render(item)}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-4 py-2 border-b whitespace-nowrap">
                                        {actions(item)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
