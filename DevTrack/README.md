# DevTrack

DevTrack adalah dashboard untuk mengelola project portfolio: status, progress, deadline, teknologi, dan repository GitHub.

## Stack

- Frontend: React + Vite
- Backend: NestJS
- Validasi: `class-validator` + global `ValidationPipe`
- Penyimpanan: array in-memory (sesuai kebutuhan tugas)

## Menjalankan aplikasi

Terminal 1:

```bash
cd backend
npm install
npm run start:dev
```

Terminal 2:

```bash
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173` dan API di `http://localhost:3000`.

## API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/projects` | Semua project |
| GET | `/projects/:id` | Detail project |
| POST | `/projects` | Tambah project |
| PATCH | `/projects/:id` | Ubah project |
| DELETE | `/projects/:id` | Hapus project |

Contoh request API tersedia di `backend/projects.http`.

## Struktur MVC

- `backend/src/projects/entities/project.entity.ts`: model/entity project
- `backend/src/projects/dto`: DTO dan aturan validasi
- `backend/src/projects/projects.service.ts`: operasi CRUD dan aturan bisnis
- `backend/src/projects/projects.controller.ts`: HTTP endpoint
- `backend/src/projects/projects.module.ts`: module NestJS

Service menangani `NotFoundException` untuk ID yang tidak ada dan `ConflictException` untuk nama project duplikat. Data disimpan sementara dalam array sehingga kembali ke seed awal ketika server dimulai ulang.

## Bukti Tugas Bab 9

Simpan screenshot pada `docs/screenshots/` dengan nama berikut:

| File | Bukti |
|---|---|
| [`01-struktur-project.png`](docs/screenshots/01-struktur-project.png) | Struktur folder backend NestJS/MVC di VS Code |
| [`02-entity-dto.png`](docs/screenshots/02-entity-dto.png) | Entity dan DTO beserta field serta validasi |
| [`03-service-controller.png`](docs/screenshots/03-service-controller.png) | Method CRUD pada Service dan route Controller |
| [`04-validation-pipe.png`](docs/screenshots/04-validation-pipe.png) | `ValidationPipe` global pada `main.ts` |
| [`05-get-all.png`](docs/screenshots/05-get-all.png) | REST Client: `GET /projects` dan response 200 |
| [`06-get-detail.png`](docs/screenshots/06-get-detail.png) | REST Client: `GET /projects/:id` dan response 200 |
| [`07-post.png`](docs/screenshots/07-post.png) | REST Client: `POST /projects` dan response project baru |
| [`08-patch.png`](docs/screenshots/08-patch.png) | REST Client: `PATCH /projects/:id` dan response perubahan |
| [`09-delete.png`](docs/screenshots/09-delete.png) | REST Client: `DELETE /projects/:id` dan response berhasil |
| [`10-error-not-found.png`](docs/screenshots/10-error-not-found.png) | `GET` ID tidak ada dan response 404 |
| [`11-error-validation.png`](docs/screenshots/11-error-validation.png) | Request DTO tidak valid dan response 400 |
| [`12-error-conflict.png`](docs/screenshots/12-error-conflict.png) | Nama project duplikat dan response 409 |
| [`13-frontend-create.png`](docs/screenshots/13-frontend-create.png) | Form frontend menambah project dan project tampil di dashboard |
| [`14-frontend-edit-delete.png`](docs/screenshots/14-frontend-edit-delete.png) | Frontend mengubah lalu menghapus project |

Screenshot endpoint diambil dari REST Client dengan request dan response terlihat dalam satu gambar. File request sudah tersedia di `backend/projects.http`.

<!-- React template details below -->

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
