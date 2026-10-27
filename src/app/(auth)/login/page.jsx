// src/app/(auth)/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

import { handleLogin } from "../actions";

// Import ReCAPTCHA secara dinamis agar aman dari isu SSR / Hydration
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState("");

  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    if (token) {
      setCaptchaError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { username: "", password: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username wajib diisi.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    if (!captchaToken) {
      setCaptchaError("Silakan centang verifikasi reCAPTCHA terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const dataToSend = new FormData();
      dataToSend.append("username", formData.username);
      dataToSend.append("password", formData.password);
      if (formData.rememberMe) {
        dataToSend.append("rememberMe", "on");
      }

      const result = await handleLogin(null, dataToSend);

      if (!result.success) {
        setServerError(result.message || "Gagal masuk ke sistem. ");
        setIsLoading(false);
      } else {
        router.push(result.redirectUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Login submmision error", err);
      setServerError("Terjadi kesalahan pada koneksi ke server. ");
      setIsLoading(false);
    }

    console.log("Login Payload:", formData);
  };

  return (
    <div
      className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white"
      suppressHydrationWarning
    >
      {/* BAGIAN KIRI: Form Login (Tanpa Card, Clean) */}
      <div className="lg:col-span-6 flex flex-col justify-between p-8">
        {/* Atas: Logo & Judul (Center Alignment & Image Logo) */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 relative rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo Kampung Palahanaeng"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">
            KAMPUNG PALAHANAENG
          </h1>
          <p className="text-xs font-semibold tracking-wider uppercase">
            Kecamatan Tabukan Tengah, Kabupaten Kepulauan Sangihe
          </p>

          {/* Garis Pembatas Bergradasi */}
          <div className="w-36 h-[5px] bg-gradient mt-2 mb-3 mx-auto border rounded" />

          <p className="text-slate-500 text-sm font-medium mt-1 mb-5">
            Masuk Ke Sistem Administrasi Dan Layanan Kampung
          </p>
        </div>

        {serverError && (
          <div className="mx-auto my-2 p-3 flex flex-col justify-center items-center text-xs text-red-600 bg-red-50 w-full max-w-md border border-red-200 rounded-xl text-center font-medium">
            {serverError}
          </div>
        )}

        {/* Tengah: Form */}
        <div className="my-auto py-8 w-full max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
            suppressHydrationWarning
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-slate-700 font-medium text-sm"
              >
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleChange}
                suppressHydrationWarning
                className={`h-12 rounded-xl bg-slate-50/50 transition-all ${
                  errors.username
                    ? "border-red-300 focus-visible:ring-1 focus-visible:ring-red-400/45 focus-visible:border-red-400"
                    : "border-slate-200 focus-visible:ring-1 focus-visible:ring-gray-400/45 focus-visible:border-gray-400"
                }`}
              />
              {errors.username && (
                <p className="text-xs text-red-500 font-medium mt-1 pl-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-medium text-sm"
                >
                  Password
                </Label>
                <Link
                  href="/lupa-password"
                  className="text-xs font-semibold teks-gradient bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  Lupa Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan Password"
                  value={formData.password}
                  onChange={handleChange}
                  suppressHydrationWarning
                  className={`h-12 pr-10 rounded-xl bg-slate-50/50 transition-all ${
                    errors.password
                      ? "border-red-300 focus-visible:ring-1 focus-visible:ring-red-400/50 focus-visible:border-red-400"
                      : "border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400/45 focus-visible:border-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  suppressHydrationWarning
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium mt-1 pl-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Checkbox Tetap Masuk */}
            <div className="flex items-center pt-1" suppressHydrationWarning>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  suppressHydrationWarning
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                />
                <span className="text-sm text-slate-600 font-medium">
                  Tetap masuk
                </span>
              </label>
            </div>

            {/* Google reCAPTCHA Widget dengan Inline Error */}
            <div
              className="pt-2 flex flex-col items-center"
              suppressHydrationWarning
            >
              <ReCAPTCHA
                className="cursor-pointer"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaChange}
              />
              {captchaError && (
                <p className="text-xs text-red-500 font-medium mt-1.5 text-center">
                  {captchaError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              suppressHydrationWarning
              className="w-full h-12 mt-2 btn-primary-gradient text-white font-medium rounded-xl shadow-md shadow-blue-600/20 transition-all duration-300 ease-in-out cursor-pointer"
            >
              Masuk
            </Button>
          </form>
        </div>

        {/* Bawah: Footer kecil */}
        <div
          className="text-xs text-slate-400 text-center relative z-10 top-5"
          suppressHydrationWarning
        >
          &copy; {mounted ? new Date().getFullYear() : "2026"} Pemerintah
          Kampung Palahanaeng. All rights reserved.
        </div>
      </div>

      {/* BAGIAN KANAN: Latar Belakang Gambar Kampung & Dark-to-Light Blue Gradient Overlay */}
      <div
        className="hidden lg:col-span-6 lg:flex flex-col justify-between relative p-12 overflow-hidden text-white"
        suppressHydrationWarning
      >
        {/* Gambar Background Kampung */}
        <Image
          src="/bg-kampung.png"
          alt="Pemandangan Kampung Palahanaeng"
          fill
          className="object-cover object-center absolute inset-0 z-0"
          priority
        />

        {/* Gradasi Biru Gelap ke Terang (Dark Blue to Lighter Blue Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/65 to-blue-600/35 z-1" />
        <div className="absolute inset-0 bg-blue-950/30 backdrop-brightness-105 z-1" />

        {/* Konten Atas */}
        <div className="relative z-10 flex items-center gap-2 text-sm font-medium">
          <ShieldCheck size={18} />
          <span>Sistem Informasi Kampung Palahanaeng</span>
        </div>

        {/* Konten Tengah */}
        <div className="relative z-10 max-w-lg my-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-transparant backdrop-blur text-blue-100 text-xs font-semibold tracking-wide uppercase shadow-lg">
            Modul Pemerintahan & Layanan
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight drop-shadow-md">
            Transformasi Digital Pelayanan Publik Kampung Palahanaeng
          </h2>
          <p className="text-blue-50/90 text-base leading-relaxed font-light drop-shadow">
            Mempermudah administrasi kependudukan, transparansi pemerintahan,
            serta akses layanan surat secara online bagi seluruh warga kampung.
          </p>
        </div>
      </div>
    </div>
  );
}
