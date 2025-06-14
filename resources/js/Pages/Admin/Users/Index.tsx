import React, { useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage, router } from "@inertiajs/react";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/Pagination";
import SearchBar from "@/Components/SearchBar";

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at?: string;
    updated_at?: string;
}

export default function UsersIndex() {
    const { users: rawUsers } = usePage().props as any;
    const users = rawUsers?.data
        ? rawUsers
        : {
              data: rawUsers || [],
              current_page: 1,
              last_page: 1,
              per_page: (rawUsers || []).length,
              total: (rawUsers || []).length,
              links: [],
          };

    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() => {
        if (!search) return users.data;
        return users.data.filter((user: User) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.roles.join(", ").toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users.data]);

    const columns = [
        { label: "Nama", render: (user: User) => user.name },
        { label: "Email", render: (user: User) => user.email },
        { label: "Role", render: (user: User) => user.roles.join(", ") },
        {
            label: "Created At",
            render: (user: User) =>
                user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-",
        },
        {
            label: "Updated At",
            render: (user: User) =>
                user.updated_at
                    ? new Date(user.updated_at).toLocaleDateString()
                    : "-",
        },
    ];

    const actions = (user: User) => (
        <div className="flex space-x-2 items-center">
            <Link
                href={route("users.edit", user.id)}
                className="text-blue-500 hover:underline flex items-center"
            >
                Edit
            </Link>
            <button
                onClick={() =>
                    router.delete(route("users.destroy", user.id))
                }
                className="text-red-500 hover:underline ml-2 flex items-center"
                type="button"
            >
                Hapus
            </button>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="space-y-4 max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Manajemen Pengguna</h1>
                <div className="flex justify-between items-center">
                    <SearchBar searchTerm={search} onSearch={setSearch} />
                    <Link
                        href={route("users.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Tambah Pengguna
                    </Link>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredUsers}
                    actions={actions}
                    currentPage={users.current_page}
                    perPage={users.per_page}
                />
                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div>
                        Menampilkan{" "}
                        {(users.current_page - 1) * users.per_page + 1} sampai{" "}
                        {Math.min(
                            users.current_page * users.per_page,
                            users.total
                        )} dari {users.total} pengguna
                    </div>
                    <Pagination links={users.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
