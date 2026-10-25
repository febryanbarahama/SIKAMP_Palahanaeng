"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nik: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Payload:", formData);
    // Nanti dihubungkan ke backend API / services
  };

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          Buat Akun Baru
        </CardTitle>
        <CardDescription>
          Lengkapi data di bawah ini untuk mendaftar layanan SID Kampung
          Palahanaeng.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="namaLengkap">Nama Lengkap</Label>
            <Input
              id="namaLengkap"
              name="namaLengkap"
              type="text"
              placeholder="Sesuai KTP"
              value={formData.namaLengkap}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
            <Input
              id="nik"
              name="nik"
              type="text"
              placeholder="16 digit NIK"
              maxLength={16}
              value={formData.nik}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="konfirmasiPassword">Konfirmasi Kata Sandi</Label>
            <Input
              id="konfirmasiPassword"
              name="konfirmasiPassword"
              type="password"
              placeholder="Ulangi kata sandi"
              value={formData.konfirmasiPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
          >
            Daftar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
