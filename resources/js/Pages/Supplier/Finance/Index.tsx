import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

interface Retail {
    id: number;
    name: string;
}

interface FinanceRow {
    id: number;
    retail?: Retail;
    total_amount: number;
    created_at: string;
}

export default function FinanceIndex() {
    const { finance, totalIncome } = usePage().props as any as{
        finance: FinanceRow[];
        totalIncome: number;
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Rekap Keuangan dari Retail</h1>
                <div className="bg-white rounded shadow p-4 mb-6">
                    <div className="text-lg font-semibold">Total Pemasukan:
                        <span className="text-green-700 font-bold ml-2">
                            Rp {totalIncome.toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="bg-white rounded shadow p-4">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Tanggal</th>
                                <th className="px-4 py-2 text-left">Retail</th>
                                <th className="px-4 py-2 text-left">Nominal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finance.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-gray-500">
                                        Tidak ada data pemasukan.
                                    </td>
                                </tr>
                            ) : (
                                finance.map((row) => (
                                    <tr key={row.id} className="border-b">
                                        <td className="px-4 py-2">{row.created_at.slice(0, 10)}</td>
                                        <td className="px-4 py-2">{row.retail?.name ?? "-"}</td>
                                        <td className="px-4 py-2">Rp {row.total_amount.toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
