# react-navbar




Gunakan Vercel CLI untuk Debugging (Opsional)
Jika masalah tetap ada, kamu bisa mencoba menggunakan Vercel CLI untuk melakukan deploy secara lokal dan melihat log lebih detail sebelum mempush ke GitHub.

Install Vercel CLI dengan:
bash
Copy code
npm install -g vercel
Login ke akun Vercel dengan:
bash
Copy code
vercel login
Jalankan deploy lokal:
bash
Copy code
vercel --prod
Dengan langkah-langkah ini, masalah Permission denied saat menjalankan vite build di Vercel seharusnya bisa teratasi.