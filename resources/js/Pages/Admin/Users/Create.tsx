import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function CreateUser() {
    const { roles } = usePage().props as any as { roles: string[] };
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        roles: string[];
    }>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("users.store"));
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Tambah Pengguna</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Nama</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Role</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.roles[0] || ""}
                            onChange={(e) => setData("roles", [e.target.value])}
                        >
                            <option value="">Pilih Role</option>
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        {errors.roles && (
                            <div className="text-red-500 text-sm">
                                {errors.roles}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <Link
                            href={route("users.index")}
                            className="text-gray-600 hover:underline"
                        >
                            Kembali
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            disabled={processing}
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
