import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, CheckCircle, Clock } from 'lucide-react';

export default function UserBookings({ bookings }: { bookings: any[] }) {
    const { post, processing } = useForm();

    const handlePay = (bookingId: number) => {
        post(`/my-bookings/${bookingId}/pay`);
    };

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1"/> Menunggu Pembayaran</Badge>;
            case 'confirmed': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none"><CheckCircle className="w-3 h-3 mr-1"/> Dikonfirmasi</Badge>;
            case 'rejected': return <Badge variant="destructive">Ditolak</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Riwayat Pesanan', href: '/my-bookings' }]}>
            <Head title="Riwayat Pesanan" />
            
            <div className="max-w-4xl mx-auto p-4 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Pesanan Saya</h1>
                    <p className="text-muted-foreground">Pantau status penyewaan kost Anda.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                        <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Belum ada pesanan</h3>
                        <p className="mt-1 text-muted-foreground">Anda belum melakukan pemesanan kost apapun.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <Card key={booking.id} className="overflow-hidden">
                                <div className="border-b bg-muted/50 px-6 py-3 flex justify-between items-center">
                                    <span className="text-sm font-medium text-muted-foreground">ID Booking: #{booking.id}</span>
                                    {getStatusBadge(booking.status)}
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{booking.room.kost.name}</h3>
                                            <p className="text-muted-foreground mb-4">{booking.room.name} • {booking.room.type}</p>
                                            
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground block">Mulai Sewa</span>
                                                    <span className="font-medium">{new Date(booking.start_date).toLocaleDateString('id-ID')}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground block">Durasi</span>
                                                    <span className="font-medium">{booking.duration_months} Bulan</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="md:text-right bg-muted/30 p-4 rounded-xl border border-border">
                                            <span className="text-muted-foreground text-sm block mb-1">Total Tagihan</span>
                                            <span className="text-2xl font-bold text-primary block mb-2">Rp {Number(booking.total_price).toLocaleString('id-ID')}</span>
                                            
                                            {booking.status === 'pending' && (
                                                <form onSubmit={(e) => { e.preventDefault(); handlePay(booking.id); }}>
                                                    <Button type="submit" disabled={processing} className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                                                        <CreditCard className="w-4 h-4 mr-2" /> Konfirmasi Pembayaran
                                                    </Button>
                                                    <p className="text-xs text-muted-foreground mt-2 text-center md:text-right">
                                                        *Klik untuk simulasi bayar
                                                    </p>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
