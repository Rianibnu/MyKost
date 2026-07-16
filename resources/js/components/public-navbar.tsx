import { Link, usePage } from '@inertiajs/react';
import { Home, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { login, register, dashboard } from '@/routes';
import { useState } from 'react';

export function PublicNavbar() {
    const { auth } = usePage().props as any;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
            <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                        <Home className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-bold text-xl tracking-tight">MyKost</span>
                    </Link>
                </div>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/kosts" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                        <Search className="h-4 w-4" /> Cari Kost
                    </Link>

                    {auth?.user ? (
                        <Link href={dashboard()}>
                            <Button variant="outline" className="rounded-full shadow-sm">Dashboard</Button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href={login()}>
                                <Button variant="ghost" className="rounded-full">Log in</Button>
                            </Link>
                            <Link href={register()}>
                                <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all hover:shadow-lg">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile burger */}
                <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 px-6 py-4 space-y-3 bg-white dark:bg-neutral-950">
                    <Link href="/kosts" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">
                        Cari Kost
                    </Link>
                    {auth?.user ? (
                        <Link href={dashboard()}>
                            <Button variant="outline" className="w-full rounded-full">Dashboard</Button>
                        </Link>
                    ) : (
                        <div className="space-y-2">
                            <Link href={login()} className="block">
                                <Button variant="ghost" className="w-full rounded-full">Log in</Button>
                            </Link>
                            <Link href={register()} className="block">
                                <Button className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
