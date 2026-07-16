import { Link, usePage } from '@inertiajs/react';
import { Building, CalendarCheck, Home, LayoutGrid, Search, ClipboardList } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

function getNavItems(role: string): NavItem[] {
    if (role === 'partner') {
        return [
            {
                title: 'Dashboard',
                href: '/partner/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Pesanan Masuk',
                href: '/partner/bookings',
                icon: ClipboardList,
            },
        ];
    }

    // Default: user role
    return [
        {
            title: 'Cari Kost',
            href: '/kosts',
            icon: Search,
        },
        {
            title: 'Pesanan Saya',
            href: '/my-bookings',
            icon: CalendarCheck,
        },
    ];
}

const footerNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/',
        icon: Home,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const role = auth?.user?.role || 'user';
    const mainNavItems = getNavItems(role);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
