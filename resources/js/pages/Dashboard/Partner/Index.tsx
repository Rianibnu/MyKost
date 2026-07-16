import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Building, Pencil, Trash2, DoorOpen } from 'lucide-react';

export default function PartnerDashboard({ kosts }: { kosts: any[] }) {
    const handleDelete = (kostId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kost ini? Semua data kamar dan booking terkait juga akan dihapus.')) {
            router.delete(`/partner/kosts/${kostId}`);
        }
    };

    return (
        <>
            <Head title="Dashboard Partner" />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Properti</h1>
                        <p className="text-muted-foreground">Kelola kost dan kamar Anda di sini.</p>
                    </div>
                    <Link href="/partner/kosts/create">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Kost
                        </Button>
                    </Link>
                </div>

                {kosts.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                        <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Anda belum memiliki listing Kost</h3>
                        <p className="mt-1 text-muted-foreground mb-6">Mulai raih pendapatan dengan mendaftarkan properti pertama Anda.</p>
                        <Link href="/partner/kosts/create">
                            <Button variant="outline">Buat Listing Sekarang</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {kosts.map((kost) => (
                            <Card key={kost.id}>
                                <CardHeader>
                                    <CardTitle>{kost.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{kost.city}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-medium">Total Kamar:</span>
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold">{kost.rooms_count || 0} Kamar</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Link href={`/partner/kosts/${kost.id}/edit`}>
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Pencil className="h-3 w-3 mr-1" /> Edit
                                            </Button>
                                        </Link>
                                        <Link href={`/partner/kosts/${kost.id}/rooms`}>
                                            <Button variant="secondary" size="sm" className="w-full">
                                                <DoorOpen className="h-3 w-3 mr-1" /> Kamar
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDelete(kost.id)}>
                                            <Trash2 className="h-3 w-3 mr-1" /> Hapus
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

PartnerDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard Partner',
            href: '/partner/dashboard',
        },
    ],
};
