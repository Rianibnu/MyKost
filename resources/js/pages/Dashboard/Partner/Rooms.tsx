import { Head, useForm, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, PlusCircle, Pencil, Trash2, Save, X } from 'lucide-react';
import { useState } from 'react';

export default function Rooms({ kost }: { kost: any }) {
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form for creating new room
    const createForm = useForm({
        name: '',
        type: '',
        capacity: 1,
        price_per_month: '',
        stock: 1,
    });

    // Form for editing existing room
    const editForm = useForm({
        name: '',
        type: '',
        capacity: 1,
        price_per_month: '',
        stock: 1,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(`/partner/kosts/${kost.id}/rooms`, {
            onSuccess: () => createForm.reset(),
        });
    };

    const startEdit = (room: any) => {
        setEditingId(room.id);
        editForm.setData({
            name: room.name,
            type: room.type || '',
            capacity: room.capacity,
            price_per_month: room.price_per_month,
            stock: room.stock,
        });
    };

    const handleUpdate = (e: React.FormEvent, roomId: number) => {
        e.preventDefault();
        editForm.put(`/partner/rooms/${roomId}`, {
            onSuccess: () => setEditingId(null),
        });
    };

    const handleDelete = (roomId: number) => {
        if (confirm('Hapus kamar ini?')) {
            router.delete(`/partner/rooms/${roomId}`);
        }
    };

    return (
        <>
            <Head title={`Kelola Kamar — ${kost.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/partner/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Kelola Kamar</h1>
                        <p className="text-muted-foreground">{kost.name} — {kost.city}</p>
                    </div>
                </div>

                {/* Add new room form */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <PlusCircle className="h-5 w-5" /> Tambah Kamar Baru
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="grid gap-1">
                                <Label htmlFor="new-name">Nama Kamar</Label>
                                <Input
                                    id="new-name"
                                    placeholder="Kamar VIP"
                                    value={createForm.data.name}
                                    onChange={e => createForm.setData('name', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="new-type">Tipe</Label>
                                <Input
                                    id="new-type"
                                    placeholder="VIP / Standard"
                                    value={createForm.data.type}
                                    onChange={e => createForm.setData('type', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="new-price">Harga/Bulan (Rp)</Label>
                                <Input
                                    id="new-price"
                                    type="number"
                                    min="0"
                                    placeholder="1500000"
                                    value={createForm.data.price_per_month}
                                    onChange={e => createForm.setData('price_per_month', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="new-stock">Stok</Label>
                                <Input
                                    id="new-stock"
                                    type="number"
                                    min="0"
                                    value={createForm.data.stock}
                                    onChange={e => createForm.setData('stock', parseInt(e.target.value))}
                                />
                            </div>
                            <Button type="submit" disabled={createForm.processing} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                <PlusCircle className="h-4 w-4 mr-1" /> Tambah
                            </Button>
                        </form>
                        {Object.keys(createForm.errors).length > 0 && (
                            <div className="mt-2 text-red-500 text-xs">
                                {Object.values(createForm.errors).map((err, i) => <p key={i}>{err}</p>)}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Rooms table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Daftar Kamar ({kost.rooms?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {kost.rooms?.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">Belum ada kamar. Tambahkan kamar pertama di atas.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Harga/Bulan</TableHead>
                                        <TableHead>Stok</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {kost.rooms.map((room: any) => (
                                        <TableRow key={room.id}>
                                            {editingId === room.id ? (
                                                <>
                                                    <TableCell>
                                                        <Input
                                                            value={editForm.data.name}
                                                            onChange={e => editForm.setData('name', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            value={editForm.data.type}
                                                            onChange={e => editForm.setData('type', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            value={editForm.data.price_per_month}
                                                            onChange={e => editForm.setData('price_per_month', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            value={editForm.data.stock}
                                                            onChange={e => editForm.setData('stock', parseInt(e.target.value))}
                                                            className="h-8 w-16"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-right space-x-1">
                                                        <form onSubmit={(e) => handleUpdate(e, room.id)} className="inline">
                                                            <Button type="submit" size="sm" variant="default" disabled={editForm.processing}>
                                                                <Save className="h-3 w-3" />
                                                            </Button>
                                                        </form>
                                                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell className="font-medium">{room.name}</TableCell>
                                                    <TableCell>{room.type || '-'}</TableCell>
                                                    <TableCell>Rp {Number(room.price_per_month).toLocaleString('id-ID')}</TableCell>
                                                    <TableCell>{room.stock}</TableCell>
                                                    <TableCell className="text-right space-x-1">
                                                        <Button size="sm" variant="ghost" onClick={() => startEdit(room)}>
                                                            <Pencil className="h-3 w-3" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(room.id)}>
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </TableCell>
                                                </>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Rooms.layout = {
    breadcrumbs: [
        { title: 'Dashboard Partner', href: '/partner/dashboard' },
        { title: 'Kelola Kamar', href: '#' },
    ],
};
