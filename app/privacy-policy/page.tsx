import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi TikDown — bagaimana kami menangani data pengguna.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tikdown.vercel.app";

export default function PrivacyPolicyPage() {
  const lastUpdated = "1 Januari 2025";

  return (
    <div className="container" style={{ maxWidth: "760px", padding: "4rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Kebijakan Privasi</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "3rem" }}>
        Terakhir diperbarui: {lastUpdated}
      </p>

      <div style={{ lineHeight: 1.8, color: "var(--text-secondary)" }}>
        <Section title="1. Informasi yang Kami Kumpulkan">
          <p>
            TikDown (<strong style={{ color: "var(--text-primary)" }}>{siteUrl}</strong>) adalah layanan
            gratis untuk membantu pengguna mengunduh konten dari TikTok. Kami mengumpulkan informasi
            minimal yang diperlukan untuk menjalankan layanan:
          </p>
          <ul>
            <li><strong style={{ color: "var(--text-primary)" }}>Log Server:</strong> Alamat IP, waktu request, dan URL yang diproses. Data ini digunakan untuk keamanan dan pencegahan penyalahgunaan.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Data Analitik:</strong> Data penggunaan anonim melalui layanan analitik pihak ketiga (seperti Google Analytics) untuk memahami bagaimana layanan digunakan.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Cookie:</strong> Cookie teknis yang diperlukan untuk menjalankan website dan cookie dari jaringan iklan yang kami gunakan.</li>
          </ul>
        </Section>

        <Section title="2. Cara Kami Menggunakan Informasi">
          <p>Informasi yang dikumpulkan digunakan untuk:</p>
          <ul>
            <li>Menyediakan dan meningkatkan layanan TikDown</li>
            <li>Mencegah penyalahgunaan dan serangan spam (rate limiting)</li>
            <li>Menganalisis penggunaan website secara anonim</li>
            <li>Menampilkan iklan yang relevan melalui jaringan iklan Adsterra</li>
          </ul>
        </Section>

        <Section title="3. Penyimpanan Data">
          <p>
            TikDown <strong style={{ color: "var(--text-primary)" }}>tidak menyimpan video, audio, atau konten apapun</strong> yang
            diproses melalui layanan kami. URL yang kamu masukkan hanya diproses secara real-time
            dan tidak disimpan di database kami.
          </p>
          <p>
            Data log server (IP address) disimpan maksimal 30 hari untuk keperluan keamanan,
            setelah itu dihapus secara otomatis.
          </p>
        </Section>

        <Section title="4. Iklan Pihak Ketiga (Adsterra)">
          <p>
            Website ini menampilkan iklan dari Adsterra Network. Adsterra mungkin menggunakan
            cookie dan teknologi pelacakan untuk menampilkan iklan yang relevan. Kamu dapat
            mempelajari kebijakan privasi Adsterra di{" "}
            <a href="https://adsterra.com/privacy-policy" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)" }}>
              adsterra.com/privacy-policy
            </a>.
          </p>
        </Section>

        <Section title="5. Hak Pengguna">
          <p>Kamu memiliki hak untuk:</p>
          <ul>
            <li>Meminta penghapusan data log yang terkait dengan IP kamu</li>
            <li>Menolak cookie iklan melalui pengaturan browser</li>
            <li>Mengakses informasi tentang data yang kami simpan</li>
          </ul>
          <p>
            Untuk permintaan terkait data, hubungi kami melalui:{" "}
            <a href="mailto:privacy@tikdown.app" style={{ color: "var(--accent)" }}>
              privacy@tikdown.app
            </a>
          </p>
        </Section>

        <Section title="6. Perubahan Kebijakan">
          <p>
            Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan
            akan diberitahukan melalui pemberitahuan di website. Penggunaan layanan setelah
            perubahan dianggap sebagai persetujuan terhadap kebijakan baru.
          </p>
        </Section>

        <Section title="7. Hukum yang Berlaku">
          <p>
            Kebijakan ini tunduk pada hukum Republik Indonesia. Sengketa diselesaikan melalui
            pengadilan yang berwenang di Indonesia.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "1rem",
          fontFamily: "var(--font-syne)",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {children}
      </div>
      <style>{`
        ul { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 6px; }
        li { font-size: 14px; }
      `}</style>
    </div>
  );
}