# 🚀 DEPLOYMENT GUIDE — Gesture Synth Pro
Panduan lengkap deploy aplikasi ke production. Semua layanan gratis (free tier).
Estimasi total: 30-45 menit.
---
## PRASYARAT
- Akun GitHub (untuk menyimpan kode)
- Akun Vercel (daftar pakai GitHub di [vercel.com](https://vercel.com))
- Akun Supabase (daftar di [supabase.com](https://supabase.com))
- Akun Upstash (daftar di [upstash.com](https://upstash.com))
- Akun Railway (daftar di [railway.app](https://railway.app))
---
## LANGKAH 1 — PUSH KODE KE GITHUB
Buka terminal di folder project (`D:\musik\gesture-synth-pro`), lalu jalankan:
```bash
git init
git add .
git commit -m "Initial commit - Gesture Synth Pro"
git branch -M main
git remote add origin https://github.com/USERNAME/gemma-synth-pro.git
git push -u origin main
```
Ganti `USERNAME` dengan username GitHub kamu. Repo harus public atau private (dua-duanya bisa).
---
## LANGKAH 2 — SETUP DATABASE (SUPABASE)
### 2.1 Buat Project
1. Buka [supabase.com](https://supabase.com) → klik **"New project"**
2. Isi:
   - **Name:** `gemma-synth-pro`
   - **Database Password:** buat password kuat (simpan, akan dipakai nanti)
   - **Region:** pilih yang terdekat (Singapore / Southeast Asia)
   - **Pricing Plan:** Free
3. Klik **"Create project"** → tunggu 1-2 menit sampai selesai
### 2.2 Buat Tabel
1. Di dashboard Supabase, klik menu **"SQL Editor"** (ikon `</>` di sidebar kiri)
2. Klik **"New query"**
3. Copy dan paste script di bawah ini:
```sql
-- Tabel users
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Index untuk pencarian
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
-- Tabel presets
CREATE TABLE presets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  config JSONB NOT NULL,
  is_public BOOLEAN DEFAULT false,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_presets_user ON presets(user_id);
CREATE INDEX idx_presets_public ON presets(is_public) WHERE is_public = true;
-- Tabel recordings
CREATE TABLE recordings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) DEFAULT 'Untitled',
  duration_ms INTEGER NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size INTEGER NOT NULL,
  format VARCHAR(10) DEFAULT 'webm',
  metadata JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_recordings_user ON recordings(user_id);
CREATE INDEX idx_recordings_created ON recordings(created_at DESC);
-- Tabel room_history (multiplayer session)
CREATE TABLE room_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID REFERENCES users(id) ON DELETE SET NULL,
  room_code VARCHAR(6) NOT NULL,
  player_count SMALLINT NOT NULL,
  duration_sec INTEGER,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_room_history_host ON room_history(host_id);
-- Tabel room_participants
CREATE TABLE room_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_history_id UUID REFERENCES room_history(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ
);
CREATE INDEX idx_room_participants_room ON room_participants(room_history_id);
CREATE INDEX idx_room_participants_user ON room_participants(user_id);
```
4. Klik **"Run"** (tombol hijau di kanan bawah)
5. Pastikan tidak ada error. Lima tabel sudah terbuat.
### 2.3 Ambil Connection String
1. Di sidebar kiri, klik **"Project Settings"** (ikon gear)
2. Klik **"Database"**
3. Scroll ke bagian **"Connection string"**
4. Pilih tab **"URI"**
5. Copy string yang tampil. Formatnya seperti:
   ```
   postgresql://postgres.[project-id]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
   ```
6. **Simpan dulu di Notepad.** Ini adalah `DATABASE_URL` kamu.
### 2.4 Setup Storage (untuk file rekaman)
1. Di sidebar kiri, klik **"Storage"**
2. Klik **"New bucket"** → nama: `recordings`
3. Centang **"Public bucket"** → klik **"Create"**
---
## LANGKAH 3 — SETUP REDIS (UPSTASH)
1. Buka [upstash.com](https://upstash.com) → klik **"Console"** (kanan atas)
2. Login pakai GitHub
3. Klik **"Create Database"**
4. Pilih:
   - **Type:** Redis
   - **Name:** `gemma-synth-redis`
   - **Region:** pilih yang terdekat
   - **Plan:** Free
5. Klik **"Create"**
6. Setelah dibuat, scroll ke bagian **"REST API"** → copy **"UPSTASH_REDIS_URL"**
   - Formatnya: `redis://default:[token]@[host]:[port]`
7. **Simpan di Notepad.** Ini adalah `REDIS_URL` kamu.
---
## LANGKAH 4 — DEPLOY FRONTEND KE VERCEL
### 4.1 Install Vercel CLI
Buka terminal, jalankan:
```bash
npm install -g vercel
```
### 4.2 Deploy
```bash
cd D:\musik\gesture-synth-pro
vercel login
```
Akan buka browser. Login pakai GitHub.
Setelah login:
```bash
vercel
```
Akan muncul pertanyaan. Jawab seperti ini:
```
? Set up and deploy? Y
? Which scope? (pilih akun GitHub kamu)
? Link to existing project? N
? What's your project name? gemma-synth-pro
? In which directory is your code? ./
? Want to override settings? N
```
Tunggu proses build dan deploy (1-2 menit). Setelah selesai, Vercel akan kasih URL production.
### 4.3 Deploy ke Production (custom domain opsional)
```bash
vercel --prod
```
**Catat URL Vercel kamu.** Contoh: `https://gemma-synth-pro.vercel.app`
### 4.4 Set Environment Variable di Vercel
1. Buka [vercel.com](https://vercel.com) → pilih project
2. Klik **"Settings"** → **"Environment Variables"**
3. Tambahkan satu variabel:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://nama-railway-app.railway.app` (isi nanti setelah Langkah 5) |
4. Simpan
---
## LANGKAH 5 — DEPLOY BACKEND KE RAILWAY
### 5.1 Siapkan File Konfigurasi
Buat file `railway.json` di folder `server/`:
```bash
cd D:\musik\gesture-synth-pro
```
Buat file `server/railway.json` (pakai Notepad atau code editor), isi:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd server && npm install"
  },
  "deploy": {
    "startCommand": "cd server && npx tsx index.ts",
    "healthcheckPath": "/api/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```
### 5.2 Deploy ke Railway
1. Buka [railway.app](https://railway.app) → login pakai GitHub
2. Klik **"New Project"** → pilih **"Deploy from GitHub repo"**
3. Pilih repo `gemma-synth-pro` (repo yang sama dengan frontend)
4. Setelah project terbuat, klik project tersebut
5. Klik service yang muncul (biasanya nama repo)
6. Klik tab **"Settings"**
7. Scroll ke **"Root Directory"** → isi: `server`
8. Scroll ke **"Environment Variables"** → klik **"Add Variable"**
9. Tambahkan semua variabel ini satu per satu:
   | Key | Value | Keterangan |
   |-----|-------|-----------|
   | `PORT` | `3001` | Port server |
   | `NODE_ENV` | `production` | Environment mode |
   | `CORS_ORIGIN` | `https://gemma-synth-pro.vercel.app` | URL frontend Vercel (dari Langkah 4) |
   | `DATABASE_URL` | `postgresql://postgres....` | dari Supabase (Langkah 2.3) |
   | `REDIS_URL` | `redis://default:....` | dari Upstash (Langkah 3) |
   | `JWT_SECRET` | `bikin-random-string-minimal-32-karakter` | String acak untuk JWT |
10. Klik **"Deploy"** (tombol di kanan atas)
Tunggu 2-3 menit sampai deployment selesai. Railway akan kasih URL, contoh: `https://gemma-synth-pro.up.railway.app`
### 5.3 Update Vercel Environment Variable
1. Kembali ke Vercel dashboard → Settings → Environment Variables
2. Edit `VITE_API_URL`:
   ```
   https://gemma-synth-pro.up.railway.app
   ```
3. Klik **"Save"** → Vercel akan auto-redeploy
---
## LANGKAH 6 — VERIFIKASI
### 6.1 Cek Backend
Buka browser, kunjungi:
```
https://gemma-synth-pro.up.railway.app/api/health
```
Harus menampilkan:
```json
{"success":true,"data":{"status":"ok"}}
```
### 6.2 Cek Frontend
Buka browser, kunjungi:
```
https://gemma-synth-pro.vercel.app
```
Harus menampilkan landing page Gesture Synth Pro. Klik **"Play Now"** untuk test gesture+audio.
### 6.3 Test Register/Login
1. Klik halaman Settings (atau buka Postman/Insomnia)
2. Test endpoint:
   ```
   POST https://gemma-synth-pro.up.railway.app/api/auth/register
   Content-Type: application/json
   {"username":"test","email":"test@test.com","password":"123456"}
   ```
3. Harus return sukses dengan token JWT.
---
## RINGKASAN ENVIRONMENT VARIABLES
### Railway (backend)
```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://gemma-synth-pro.vercel.app
DATABASE_URL=postgresql://postgres.[id]:[pass]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
REDIS_URL=redis://default:[token]@[host]:[port]
JWT_SECRET=random-string-minimal-32-karakter-ubah-ini
```
### Vercel (frontend)
```
VITE_API_URL=https://gemma-synth-pro.up.railway.app
```
---
## UKURAN BUNDLE & PERFORMA
| File | Size | Gzipped |
|------|------|---------|
| index.html | 0.43 KB | 0.29 KB |
| CSS | 22.55 KB | 6.31 KB |
| JS | ~560 KB | ~144 KB |
| **Total** | **~583 KB** | **~151 KB** |
First load < 3 detik di koneksi 4G. Cukup ringan untuk free tier hosting.
---
## LIMITASI FREE TIER
| Layanan | Limit | Cukup untuk |
|---------|-------|------------|
| **Vercel** | 100 GB bandwidth/bulan, 6000 build minutes | ~50K page views/bulan |
| **Supabase** | 500 MB database, 1 GB storage, 2 GB bandwidth | ~100 user + ratusan rekaman |
| **Upstash** | 10,000 commands/hari, 256 MB | ~200 multiplayer sessions/hari |
| **Railway** | 500 jam runtime/bulan, 512 MB RAM | ~20 hari uptime/bulan (sleep saat idle) |
Untuk < 100 user aktif, semua limit di atas lebih dari cukup. Jika butuh scale, upgrade plan sesuai kebutuhan.
---
## TROUBLESHOOTING
### Build frontend gagal
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```
### Backend tidak merespon
- Cek log di Railway dashboard → Deployments → View Logs
- Pastikan DATABASE_URL dan REDIS_URL benar
- Pastikan CORS_ORIGIN tidak ada trailing slash
### Error "Connection refused" di Redis
- Cek apakah Upstash Redis statusnya "Active"
- Cek apakah REDIS_URL sudah benar formatnya
### Tidak bisa register user
- Cek apakah tabel `users` sudah dibuat di Supabase
- Cek apakah policy RLS (Row Level Security) menghalangi INSERT
### Kamera tidak berfungsi di production
- Browser hanya mengizinkan kamera di HTTPS (localhost excluded)
- Vercel + Railway sudah HTTPS otomatis, jadi harusnya aman
- Pastikan user mengizinkan akses kamera di browser
---
## CEKLIS DEPLOYMENT
- [ ] Kode sudah di-push ke GitHub
- [ ] Tabel database dibuat di Supabase (5 tabel + 7 index)
- [ ] Supabase DATABASE_URL dicatat
- [ ] Upstash Redis dibuat, REDIS_URL dicatat
- [ ] Frontend terdeploy di Vercel, URL dicatat
- [ ] `railway.json` dibuat di folder `server/`
- [ ] Backend terdeploy di Railway, semua env vars diset
- [ ] VITE_API_URL di Vercel diupdate dengan URL Railway
- [ ] `/api/health` merespon 200 OK
- [ ] Landing page terbuka di browser
- [ ] Register/login berfungsi
- [ ] Multiplayer room bisa dibuat
---
Selesai. Aplikasi Gesture Synth Pro sudah live di production! 🎹