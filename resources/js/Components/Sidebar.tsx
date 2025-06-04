import NavLink from "./NavLink"
import { usePage } from "@inertiajs/react"

const Sidebar = () => {
    const { auth } = usePage().props as { auth: { user: { email: string } } }
    const email = auth.user.email.toLowerCase()

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
                        <div className="flex flex-col space-y-1 gap-3">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </NavLink>

                            {email === 'retail@example.com' && (
                                <>
                                    <NavLink href={route('po.create')} active={route().current('po.create')}>
                                    Purchase Order
                                    </NavLink>
                                    <NavLink href={route('inventory.index')} active={route().current('inventory.index')}>
                                    Inventory
                                    </NavLink>
                                    <NavLink href={route('inventory.notification')} active={route().current('inventory.notification')}>
                                    Notification
                                    </NavLink>
                                </>
                            )}
                            {email === 'supplier@example.com' && (
                            <>
                                <NavLink href={route('products.index')} active={route().current('products.index') || route().current('products.create') || route().current('products.edit')}>
                                Products
                                </NavLink>
                                <NavLink href={route('orders.index')} active={route().current('orders.index')}>
                                Orders
                                </NavLink>
                                <NavLink href={route('po.notifications')} active={route().current('po.notifications')}>
                                Notification
                                </NavLink>
                            </>
                            )}
                            {email === 'admin@example.com' && (
                                <>
                                    <NavLink href={route('users.index')} active={route().current('users.index')}>
                                    Melihat User
                                    </NavLink>
                                    <NavLink href={route('roles.index')} active={route().current('roles.index')}>
                                    Mengganti Roles User
                                    </NavLink>
                                </>
                            )}
                        </div>
    </nav>
  )
}

export default Sidebar