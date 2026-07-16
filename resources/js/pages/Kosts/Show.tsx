import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, ChevronLeft, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PublicNavbar } from '@/components/public-navbar';

export default function Show({ kost }: { kost: any }) {
    const { auth } = usePage().props as any;
    const { data, setData, post, processing, errors } = useForm({
        start_date: '',
        duration_months: 1,
    });

    const handleBooking = (e: React.FormEvent, roomId: number) => {
        e.preventDefault();
        post(`/kosts/${roomId}/book`);
    };

    return (
        <>
            <Head title={kost.name} />
            <PublicNavbar />

            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
                <div className="max-w-5xl mx-auto p-4 lg:p-8">
                    {/* Back link */}
                    <div className="mb-4">
                        <Link href="/kosts">
                            <Button variant="ghost" className="rounded-full">
                                <ChevronLeft className="h-5 w-5 mr-1" /> Kembali ke Pencarian
                            </Button>
                        </Link>
                    </div>

                    {/* Header Image Area */}
                    <div className="h-64 md:h-96 w-full rounded-3xl bg-neutral-200 dark:bg-neutral-800 mb-8 overflow-hidden relative shadow-lg">
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                         <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">{kost.name}</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center text-neutral-500 mb-4">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span className="text-lg">{kost.address}, {kost.city}</span>
                                </div>
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    {kost.description}
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-2xl font-semibold mb-4">Aturan Kost</h3>
                                <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50 flex gap-3">
                                    <Info className="h-6 w-6 text-orange-600 dark:text-orange-400 shrink-0" />
                                    <p className="text-orange-800 dark:text-orange-200 text-sm">
                                        {kost.rules || 'Tidak ada aturan khusus yang disebutkan.'}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Pilihan Kamar</h3>
                                <div className="space-y-4">
                                    {kost.rooms.map((room: any) => (
                                        <Card key={room.id} className="overflow-hidden shadow-sm">
                                            <CardHeader className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                                                <CardTitle>{room.name}</CardTitle>
                                                <CardDescription>Tipe: {room.type} • Kapasitas: {room.capacity} Orang</CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                                    <div>
                                                        <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                                            Rp {Number(room.price_per_month).toLocaleString('id-ID')}
                                                        </span>
                                                        <span className="text-neutral-500"> / bulan</span>
                                                        <p className="text-sm text-neutral-500 mt-1">Sisa kamar: {room.stock}</p>
                                                    </div>
                                                    
                                                    {auth?.user ? (
                                                        <form onSubmit={(e) => handleBooking(e, room.id)} className="w-full md:w-auto bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                                                            <div className="grid gap-4 mb-4">
                                                                <div className="grid gap-2">
                                                                    <Label htmlFor={`date-${room.id}`}>Tanggal Masuk</Label>
                                                                    <Input 
                                                                        type="date" 
                                                                        id={`date-${room.id}`}
                                                                        required
                                                                        value={data.start_date}
                                                                        onChange={e => setData('start_date', e.target.value)}
                                                                    />
                                                                    {errors.start_date && <span className="text-red-500 text-xs">{errors.start_date}</span>}
                                                                </div>
                                                                <div className="grid gap-2">
                                                                    <Label htmlFor={`dur-${room.id}`}>Durasi (Bulan)</Label>
                                                                    <Input 
                                                                        type="number" 
                                                                        id={`dur-${room.id}`}
                                                                        min="1" 
                                                                        required
                                                                        value={data.duration_months}
                                                                        onChange={e => setData('duration_months', parseInt(e.target.value))}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <Button type="submit" disabled={processing || room.stock < 1} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                                                {room.stock < 1 ? 'Penuh' : 'Ajukan Sewa'}
                                                            </Button>
                                                        </form>
                                                    ) : (
                                                        <div className="text-center p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
                                                            <p className="text-sm text-neutral-500 mb-2">Login untuk memesan kamar</p>
                                                            <Link href="/login">
                                                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Login</Button>
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {kost.rooms.length === 0 && (
                                        <p className="text-neutral-500 italic">Belum ada kamar yang ditambahkan oleh pemilik.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Partner Info */}
                        <div className="relative">
                            <div className="sticky top-24">
                                <Card className="shadow-lg border-indigo-100 dark:border-indigo-900/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Dikelola oleh</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xl">
                                                {kost.partner.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{kost.partner.name}</p>
                                                <p className="text-sm text-neutral-500">Partner Terverifikasi</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
