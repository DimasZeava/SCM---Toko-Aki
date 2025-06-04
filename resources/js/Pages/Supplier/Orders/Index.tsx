import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import React from 'react';

export default function Orders({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Manajemen Order</h1>
                <p>Selamat datang, {auth.user.name}</p>
                {/* Tambahkan tabel atau komponen daftar inventory di sini */}
            </div>
        </AuthenticatedLayout>
    );
}
