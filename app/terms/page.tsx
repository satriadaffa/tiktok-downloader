import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan layanan TikDown.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container" style={{ maxWidth: "760px", padding: "4rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Syarat & Ketentuan</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "3rem" }}>
        Terakhir diperbarui: 1 Januari 2025
      </p>

      <div style={{ lineHeight: 1.8, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-syne)" }}>1. Penerimaan Syarat</h2>
          <p style={{ fontSize: "15px" }}>Dengan menggunakan TikDown, kamu menyetujui syarat dan ketentuan ini. Jika tidak setuju, harap berhenti menggunakan layanan kami.</p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-syne)" }}>2. Penggunaan yang Diizinkan</h2>
          <p style={{ fontSize: "15px" }}>TikDown hanya boleh digunakan untuk:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px" }}>
            <li>Mengunduh konten TikTok yang kamu buat sendiri</li>
            <li>Mengunduh konten dengan izin eksplisit dari pemiliknya</li>
            <li>Tujuan pribadi yang tidak melanggar hak cipta</li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-syne)" }}>3. Penggunaan yang Dilarang</h2>
          <p style={{ fontSize: "15px" }}>Dilarang keras menggunakan TikDown untuk:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px" }}>
            <li>Mengunduh konten berhak cipta tanpa izin</li>
            <li>Mendistribusikan ulang konten kreator tanpa kredit</li>
            <li>Scraping massal atau penggunaan otomatis (bot)</li>
            <li>Segala aktivitas ilegal berdasarkan hukum yang berlaku</li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-syne)" }}>4. Penafian Tanggung Jawab</h2>
          <p style={{ fontSize: "15px" }}>
            TikDown adalah alat teknis. Kami tidak bertanggung jawab atas bagaimana konten yang
            diunduh digunakan oleh pengguna. Pengguna sepenuhnya bertanggung jawab atas
            kepatuhan terhadap hukum hak cipta yang berlaku di negara mereka.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-syne)" }}>5. Ketersediaan Layanan</h2>
          <p style={{ fontSize: "15px" }}>
            Kami berusaha menjaga layanan tetap aktif, namun tidak menjamin ketersediaan 100%.
            Layanan dapat terganggu akibat pemeliharaan, pembaruan, atau faktor di luar kendali kami
            (termasuk perubahan dari pihak TikTok).
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-syne)" }}>6. Kontak</h2>
          <p style={{ fontSize: "15px" }}>
            Pertanyaan mengenai syarat & ketentuan:{" "}
            <a href="mailto:legal@tikdown.app" style={{ color: "var(--accent)" }}>legal@tikdown.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}