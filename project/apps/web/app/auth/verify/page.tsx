"use client";

import { useState } from 'react';
import { Button, Input } from '@repo/ui';

export default function VerifyPage() {
    const [code, setCode] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-subtle">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your email</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        We sent a code to your email. Enter it below.
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <Input
                        label="Verification Code"
                        value={code}
                        onChangeText={setCode}
                        placeholder="123456"
                        className="text-center text-2xl tracking-widest"
                    />

                    <Button title="Verify" onPress={() => { }} />
                </div>
            </div>
        </div>
    );
}
