"use client";

import { useState } from 'react';
import { Button, Input } from '@repo/ui';
import Link from 'next/link';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-subtle">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>
                <div className="mt-8 space-y-6">
                    <Input
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholder="Full Name"
                    />
                    <Input
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email address"
                    />
                    <Input
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry
                    />

                    <Button title="Sign up" onPress={() => { }} />

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link href="/auth/login" className="font-medium text-primary hover:text-primaryAccent">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
