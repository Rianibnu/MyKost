import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Building } from 'lucide-react';

export default function PartnerDashboard({ kosts }: { kosts: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard Partner', href: '/partner/dashboard' }]}>
            <Head title="Partner Dashboard" />
            
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Properti</h1>
                        <p className="text-muted-foreground">Kelola kost dan kamar Anda di sini.</p>
                    </div>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Kost
                    </Button>
                </div>

                {kosts.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                        <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Anda belum memiliki listing Kost</h3>
                        <p className="mt-1 text-muted-foreground mb-6">Mulai raih pendapatan dengan mendaftarkan properti pertama Anda.</p>
                        <Button variant="outline">Buat Listing Sekarang</Button>
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
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold">{kost.rooms_count} Kamar</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" size="sm" className="w-full">Edit</Button>
                                        <Button variant="secondary" size="sm" className="w-full">Kelola Kamar</Button>
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
