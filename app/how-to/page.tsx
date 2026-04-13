import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cara Download Video TikTok Tanpa Watermark — Tutorial Lengkap",
  description: "Panduan lengkap cara download video TikTok tanpa watermark di HP Android, iPhone, dan Laptop menggunakan TikDown. Cepat, gratis, dan mudah.",
  alternates: { canonical: "/how-to" },
};

export default function HowToPage() {
  return (
    <div className="container" style={{ maxWidth: "800px", padding: "4rem 1.5rem" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>
          Cara Download Video TikTok
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>
          Panduan lengkap untuk menyimpan video favoritmu tanpa watermark.
        </p>
      </header>

      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--accent)" }}>
          Langkah-langkah Cepat (Semua Perangkat)
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Step 
            number="1" 
            title="Salin Tautan Video" 
            content="Buka aplikasi TikTok atau situs web TikTok. Temukan video yang ingin Anda unduh, klik tombol 'Bagikan' (share), dan pilih 'Salin Tautan'." 
          />
          <Step 
            number="2" 
            title="Tempel di TikDown" 
            content="Buka TikDown di browser Anda. Tempelkan tautan yang sudah disalin ke kolom input di halaman utama." 
          />
          <Step 
            number="3" 
            title="Unduh Video" 
            content="Klik tombol 'Download' dan tunggu beberapa detik. Pilih opsi 'Tanpa Watermark' untuk mengunduh video yang bersih." 
          />
        </div>
      </section>

      <article style={{ lineHeight: 1.8, color: "var(--text-secondary)" }}>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>Mengapa Menggunakan TikDown?</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          TikTok adalah platform yang luar biasa untuk konten kreatif, tetapi fitur unduhan bawaannya menyertakan watermark yang terkadang mengganggu jika Anda ingin menontonnya secara offline atau membagikannya kembali. TikDown hadir untuk memberikan solusi unduhan berkualitas HD tanpa gangguan logo tersebut.
        </p>

        <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>Download di Android/iPhone</h3>
        <p style={{ marginBottom: "1.5rem" }}>
          Untuk pengguna ponsel, Anda tidak perlu menginstal aplikasi tambahan. Cukup gunakan browser bawaan seperti Chrome atau Safari. Prosesnya sangat cepat dan tidak membebani memori ponsel Anda.
        </p>

        <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>Download di Laptop/PC</h3>
        <p style={{ marginBottom: "1.5rem" }}>
          Bagi Anda yang sering bekerja di desktop, TikDown mendukung resolusi penuh. Sangat cocok untuk para editor video yang membutuhkan footage TikTok untuk keperluan kompilasi atau referensi kreatif.
        </p>
      </article>

      <div style={{ 
        marginTop: "4rem", 
        padding: "2rem", 
        background: "var(--bg-card)", 
        borderRadius: "var(--radius-lg)", 
        border: "1px solid var(--border)",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "1rem" }}>Siap Mencoba?</h2>
        <p style={{ marginBottom: "1.5rem", color: "var(--text-secondary)" }}>Gunakan tools kami sekarang juga, gratis selamanya!</p>
        <Link href="/" 
          className="btn-primary"
          style={{ 
          display: "inline-block",
          padding: "12px 32px",
          background: "var(--accent)",
          color: "white",
          borderRadius: "100px",
          fontWeight: 600,
          textDecoration: "none"
        }}
        >
          Ke Downloader Utama
        </Link>
      </div>
    </div>
  );
}

function Step({ number, title, content }: { number: string, title: string, content: string }) {
  return (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      <div style={{ 
        flexShrink: 0,
        width: "40px", 
        height: "40px", 
        background: "var(--accent-dim)", 
        color: "var(--accent)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: "18px",
        border: "1px solid rgba(254,44,85,0.3)"
      }}>
        {number}
      </div>
      <div>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>{title}</h3>
        <p style={{ fontSize: "15px" }}>{content}</p>
      </div>
    </div>
  );
}
