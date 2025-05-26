import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
 const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out sm:translate-x-0 sm:static sm:inset-0`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                        <button
                            className="sm:hidden text-gray-500 focus:outline-none"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </NavLink>
                        {/* Add more NavLinks here as needed */}
                    </nav>
                    <div className="border-t border-gray-100 px-6 py-4">
                        <div className="mb-2">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        Account
                                        <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
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

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen ml-0 sm:ml-64 transition-all duration-200">
                {/* Mobile sidebar toggle */}
                <div className="sm:hidden flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
                    <button
                        className="text-gray-500 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span className="font-semibold text-lg text-gray-800">Menu</span>
                </div>
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}
