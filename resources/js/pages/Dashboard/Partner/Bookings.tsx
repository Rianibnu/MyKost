import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, ClipboardList } from 'lucide-react';

export default function PartnerBookings({ bookings }: { bookings: any[] }) {
    const handleConfirm = (bookingId: number) => {
        if (confirm('Konfirmasi booking ini?')) {
            router.post(`/partner/bookings/${bookingId}/confirm`);
        }
    };

    const handleReject = (bookingId: number) => {
        if (confirm('Tolak booking ini? Pembayaran akan di-refund.')) {
            router.post(`/partner/bookings/${bookingId}/reject`);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
            case 'confirmed':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none"><CheckCircle className="w-3 h-3 mr-1" /> Dikonfirmasi</Badge>;
            case 'rejected':
                return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Ditolak</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const getPaymentBadge = (payment: any) => {
        if (!payment) return <Badge variant="outline">Belum Bayar</Badge>;
        switch (payment.status) {
            case 'verified':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Terverifikasi</Badge>;
            case 'pending':
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Menunggu</Badge>;
            case 'failed':
                return <Badge variant="destructive">Gagal</Badge>;
            default:
                return <Badge>{payment.status}</Badge>;
        }
    };

    return (
        <>
            <Head title="Pesanan Masuk" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold tracking-tight">Pesanan Masuk</h1>
                    <p className="text-muted-foreground">Kelola permintaan booking dari penyewa.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                        <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Belum ada pesanan masuk</h3>
                        <p className="mt-1 text-muted-foreground">Pesanan dari penyewa akan muncul di sini.</p>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Penyewa</TableHead>
                                        <TableHead>Kost</TableHead>
                                        <TableHead>Kamar</TableHead>
                                        <TableHead>Mulai</TableHead>
                                        <TableHead>Durasi</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Pembayaran</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">#{booking.id}</TableCell>
                                            <TableCell>{booking.user?.name || '-'}</TableCell>
                                            <TableCell>{booking.room?.kost?.name || '-'}</TableCell>
                                            <TableCell>{booking.room?.name || '-'}</TableCell>
                                            <TableCell>{new Date(booking.start_date).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell>{booking.duration_months} bln</TableCell>
                                            <TableCell className="font-semibold">Rp {Number(booking.total_price).toLocaleString('id-ID')}</TableCell>
                                            <TableCell>{getPaymentBadge(booking.payment)}</TableCell>
                                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                            <TableCell className="text-right">
                                                {booking.status === 'pending' && (
                                                    <div className="flex gap-1 justify-end">
                                                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleConfirm(booking.id)}>
                                                            <CheckCircle className="h-3 w-3 mr-1" /> Terima
                                                        </Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleReject(booking.id)}>
                                                            <XCircle className="h-3 w-3 mr-1" /> Tolak
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

PartnerBookings.layout = {
    breadcrumbs: [
        { title: 'Dashboard Partner', href: '/partner/dashboard' },
        { title: 'Pesanan Masuk', href: '/partner/bookings' },
    ],
};
