import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: flash.success,
                timer: 3000,
                showConfirmButton: true,
            });
        }

        if (flash.error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: flash.error,
                timer: 3000,
                showConfirmButton: true,
            });
        }
    }, [flash]);
    const { user } = usePage().props.auth;
    console.log("Authenticated user:", user);
    // Fungsi bantu untuk cek apakah user punya role tertentu
    const hasRole = (role: string) => user.roles.includes(role);
    console.log("User roles:", user.roles);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { lowStockCount, pendingCount } = usePage().props as any;
    const renderSidebarLinks = () => {
        if (hasRole("Retail")) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route("retail.purchase-orders.index")}
                        active={route().current("retail.purchase-orders.index")}
                    >
                        Purchase Order
                    </NavLink>
                    <NavLink
                        href={route("payments.index")}
                        active={route().current("payments.index")}
                    >
                        Pembayaran
                    </NavLink>
                    <NavLink
                        href={route("inventory.index")}
                        active={route().current("inventory.index")}
                    >
                        Inventori
                        {lowStockCount > 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-800">
                                {lowStockCount}
                            </span>
                        )}
                    </NavLink>
                </div>
            );
        } else if (hasRole("Supplier")) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink
                        href={route("supplier.dashboard")}
                        active={route().current("supplier.dashboard")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route("products.index")}
                        active={route().current("products.index")}
                    >
                        Produk
                    </NavLink>
                    <NavLink
                        href={route("supplier.orders.index")}
                        active={route().current("supplier.orders.index")}
                    >
                        Order
                        {pendingCount > 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-800">
                                {pendingCount}
                            </span>
                        )}
                    </NavLink>
                </div>
            );
        } else if (hasRole("Admin")) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink
                        href={route("admin.dashboard")}
                        active={route().current("admin.dashboard")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route("users.index")}
                        active={route().current("users.index")}
                    >
                        Manajemen User
                    </NavLink>
                </div>
            );
        } else {
            return <p className="text-red-500">Role tidak dikenali</p>;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition sm:translate-x-0 sm:static`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                        <button
                            className="sm:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-3">
                        {renderSidebarLinks()}
                    </nav>

                    <div className="border-t border-gray-100 px-6 py-4">
                        <div className="mb-2">
                            <div className="text-base font-medium">
                                {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 mt-2">
                            <Link
                                href={route("profile.edit")}
                                className="text-sm text-blue-600"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => router.post(route("logout"))}
                                className="text-sm text-red-600 text-left"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black opacity-50 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen ml-0">
                {/* Mobile Toggle */}
                <div className="sm:hidden flex items-center justify-between px-4 py-2 bg-white border-b">
                    <button onClick={() => setSidebarOpen(true)}>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <span className="text-lg font-semibold">Menu</span>
                </div>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto px-4 py-6">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1 p-4 max-w-full">{children}</main>
            </div>
        </div>
    );
}
