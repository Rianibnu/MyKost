import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Building, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PublicNavbar } from '@/components/public-navbar';
import { useState } from 'react';

interface Kost {
    id: number;
    name: string;
    city: string;
    address: string;
    rooms: { id: number; price_per_month: string }[];
}

export default function Index({ kosts, filters }: { kosts: Kost[]; filters?: { search?: string } }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/kosts', { search }, { preserveState: true });
    };

    return (
        <>
            <Head title="Cari Kost" />
            <PublicNavbar />

            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search bar */}
                    <div className="mb-8">
                        <form onSubmit={handleSearch} className="flex items-center gap-3 max-w-lg">
                            <div className="relative flex-1">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <Input
                                    type="text"
                                    placeholder="Cari kota atau nama kost..."
                                    className="pl-10 rounded-full"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                <Search className="h-4 w-4 mr-2" /> Cari
                            </Button>
                        </form>
                    </div>

                    <h1 className="text-2xl font-bold mb-6">
                        {filters?.search ? `Hasil pencarian "${filters.search}"` : 'Semua Kost'}
                    </h1>

                    {kosts.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                            <Building className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
                            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Tidak ada kost yang ditemukan</h3>
                            <p className="mt-1 text-neutral-500 dark:text-neutral-400">Coba ubah kata kunci pencarian Anda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {kosts.map((kost) => (
                                <Link href={`/kosts/${kost.id}`} key={kost.id} className="group">
                                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-neutral-200 dark:border-neutral-800">
                                        <div className="h-48 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                            <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/20" />
                                            <Badge className="absolute top-4 right-4 z-20 bg-white text-black hover:bg-neutral-100">Tersedia</Badge>
                                            <h3 className="absolute bottom-4 left-4 z-20 text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                                {kost.name}
                                            </h3>
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {kost.city}
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                                                {kost.address}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0 border-t border-neutral-100 dark:border-neutral-800 mt-4 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-neutral-500 block">Mulai dari</span>
                                                <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                                                    Rp {Number(kost.rooms[0]?.price_per_month || 0).toLocaleString('id-ID')}
                                                </span>
                                                <span className="text-xs text-neutral-500">/Bulan</span>
                                            </div>
                                            <Button variant="ghost" className="rounded-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30">
                                                Lihat Detail
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
