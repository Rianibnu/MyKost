import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PublicNavbar } from '@/components/public-navbar';

export default function Welcome() {
    const [search, setSearch] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/kosts', { search });
    };

    return (
        <>
            <Head title="MyKost — Cari Kost Impianmu" />
            <PublicNavbar />
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-50">
                {/* Hero Section */}
                <div className="relative isolate">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                    </div>
                    
                    <div className="py-24 sm:py-32 lg:pb-40">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
                                    Cari Kost Impianmu Tanpa Ribet
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                                    Temukan ribuan pilihan kost di seluruh Indonesia. Mulai dari yang eksklusif hingga yang ramah di kantong, semua ada di MyKost.
                                </p>
                                
                                {/* Search Box */}
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <form onSubmit={handleSearch} className="w-full max-w-md relative flex items-center">
                                        <MapPin className="absolute left-4 h-5 w-5 text-neutral-400" />
                                        <Input 
                                            type="text"
                                            placeholder="Masukkan nama kota atau area..." 
                                            className="w-full pl-12 pr-24 py-6 rounded-full text-lg shadow-xl border-neutral-200 focus-visible:ring-indigo-600 bg-white/80 backdrop-blur-md dark:bg-neutral-900/80 dark:border-neutral-800 transition-all hover:shadow-2xl"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <Button type="submit" size="lg" className="absolute right-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                            <Search className="h-5 w-5 mr-2" /> Cari
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
