import type { Metadata } from "next";
import DownloaderForm from "@/components/DownloaderForm";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Download Video TikTok Tanpa Watermark — Gratis & Cepat",
  description:
    "Download video TikTok tanpa watermark dalam kualitas HD. Simpan video & audio TikTok ke HP atau PC. Gratis, cepat, tanpa aplikasi, langsung dari browser.",
  alternates: { canonical: "/" },
};

const features = [
  { icon: "⚡", title: "Super Cepat", desc: "Proses dalam hitungan detik" },
  { icon: "🚫", title: "Tanpa Watermark", desc: "Video bersih tanpa logo TikTok" },
  { icon: "🎵", title: "Download Audio", desc: "Simpan musik/sound sebagai MP3" },
  { icon: "📱", title: "Semua Perangkat", desc: "HP, tablet, PC — semua bisa" },
  { icon: "🔒", title: "Aman & Privat", desc: "Tidak ada data yang disimpan" },
  { icon: "💸", title: "100% Gratis", desc: "Tanpa biaya, tanpa daftar akun" },
];

// JSON-LD structured data untuk Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TikDown",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  description: "Download video TikTok tanpa watermark gratis",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  featureList: [
    "Download video TikTok tanpa watermark",
    "Download audio/musik TikTok",
    "Kualitas HD",
    "Gratis tanpa registrasi",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero section */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "5rem 0 4rem",
          textAlign: "center",
        }}
      >
        {/* Background glows */}
        <div
          className="glow-accent"
          style={{ top: "-200px", left: "50%", transform: "translateX(-50%)" }}
        />
        <div
          className="glow-cyan"
          style={{ top: "100px", right: "10%", opacity: 0.6 }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                background: "var(--accent-dim)",
                border: "1px solid rgba(254,44,85,0.25)",
                borderRadius: "100px",
                fontSize: "13px",
                color: "#ff8fa3",
                fontWeight: 500,
              }}
            >
              <span style={{ fontSize: "10px" }}>●</span>
              Gratis · Tanpa Registrasi · No Watermark
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Download Video TikTok
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent) 0%, var(--cyan) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tanpa Watermark
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Simpan video & musik dari TikTok langsung ke perangkatmu.
            Kualitas HD, cepat, dan sepenuhnya gratis.
          </p>

          {/* Form */}
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <DownloaderForm />
          </div>
        </div>
      </section>

      {/* Ad banner atas */}
      <div className="container" style={{ marginBottom: "3rem" }}>
        <AdSlot slot="banner" />
      </div>

      {/* Features */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              textAlign: "center",
              marginBottom: "0.75rem",
            }}
          >
            Kenapa Pakai TikDown?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              textAlign: "center",
              marginBottom: "3rem",
              fontSize: "15px",
            }}
          >
            Tools terbaik untuk download konten TikTok
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                  transition: "border-color 0.2s",
                }}
                className="feature-card"
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    marginBottom: "6px",
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad square tengah */}
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}
      >
        <AdSlot slot="square" />
      </div>

      {/* How to use — SEO section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Cara Download Video TikTok
          </h2>

          {[
            {
              step: "01",
              title: "Buka TikTok & Salin Link",
              desc: 'Di aplikasi TikTok, tap tombol Share pada video yang ingin didownload, lalu pilih "Salin Link".',
            },
            {
              step: "02",
              title: "Tempel Link di Kolom Input",
              desc: "Kembali ke TikDown, tempel link yang sudah disalin ke kolom input di atas. Kamu bisa tap ikon 📋 untuk paste otomatis.",
            },
            {
              step: "03",
              title: "Pilih Format & Download",
              desc: "Klik tombol Download, tunggu sebentar, lalu pilih format yang diinginkan — dengan atau tanpa watermark.",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "2rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--accent-dim)",
                  border: "1px solid rgba(254,44,85,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  fontSize: "13px",
                  color: "var(--accent)",
                }}
              >
                {step}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    marginBottom: "6px",
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — SEO */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Pertanyaan Umum (FAQ)
          </h2>

          {[
            {
              q: "Apakah TikDown gratis?",
              a: "Ya, TikDown 100% gratis tanpa batas. Tidak perlu daftar akun atau bayar apapun.",
            },
            {
              q: "Apakah video yang didownload bebas watermark?",
              a: "Ya, kami menyediakan opsi download tanpa watermark TikTok. Kualitas video tetap HD.",
            },
            {
              q: "Bagaimana cara download audio/musik dari TikTok?",
              a: "Proses sama seperti download video. Setelah hasil muncul, pilih opsi 'Download Audio' jika tersedia.",
            },
            {
              q: "Apakah TikDown menyimpan video saya?",
              a: "Tidak. TikDown hanya memproses link dan mengembalikan URL download. Tidak ada video yang disimpan di server kami.",
            },
            {
              q: "Mengapa download kadang gagal?",
              a: "Hal ini bisa terjadi jika video bersifat privat, akun pengguna diblokir, atau server TikTok sedang sibuk. Coba beberapa saat lagi.",
            },
          ].map(({ q, a }, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid var(--border)",
                padding: "1.25rem 0",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{q}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}