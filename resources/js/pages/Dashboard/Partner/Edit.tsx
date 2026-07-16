import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';

export default function Edit({ kost }: { kost: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: kost.name || '',
        description: kost.description || '',
        address: kost.address || '',
        city: kost.city || '',
        rules: kost.rules || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/partner/kosts/${kost.id}`);
    };

    return (
        <>
            <Head title={`Edit — ${kost.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/partner/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Kost</h1>
                        <p className="text-muted-foreground">Perbarui informasi properti Anda.</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Detail Properti</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Kost *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="city">Kota *</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                />
                                {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">Alamat Lengkap *</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                />
                                {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Deskripsi *</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="rules">Aturan Kost (opsional)</Label>
                                <Textarea
                                    id="rules"
                                    rows={3}
                                    value={data.rules}
                                    onChange={e => setData('rules', e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Link href="/partner/dashboard">
                                    <Button type="button" variant="outline">Batal</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard Partner', href: '/partner/dashboard' },
        { title: 'Edit Kost', href: '#' },
    ],
};
