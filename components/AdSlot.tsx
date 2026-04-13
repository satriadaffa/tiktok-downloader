"use client";

interface AdSlotProps {
  slot: "banner" | "square" | "native";
  className?: string;
}

// Ganti ADSTERRA_KEY dan slot ID setelah approved
const ADSTERRA_KEY = process.env.NEXT_PUBLIC_ADSTERRA_KEY ?? "";

const slotConfig = {
  banner: { width: 728, height: 90, label: "Banner 728×90" },
  square: { width: 300, height: 250, label: "Square 300×250" },
  native: { width: "100%", height: 90, label: "Native Ad" },
};

export default function AdSlot({ slot, className }: AdSlotProps) {
  const config = slotConfig[slot];
  const isProduction = process.env.NODE_ENV === "production" && ADSTERRA_KEY;

  if (isProduction) {
    // Production: render actual Adsterra script
    return (
      <div
        className={className}
        style={{
          textAlign: "center",
          overflow: "hidden",
          minHeight: typeof config.height === "number" ? config.height : 90,
        }}
      >
        {/* Adsterra script — ganti atOptions sesuai panel Adsterra */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key': '${ADSTERRA_KEY}',
                'format': 'iframe',
                'height': ${typeof config.height === "number" ? config.height : 90},
                'width': ${typeof config.width === "number" ? config.width : 728},
                'params': {}
              };
            `,
          }}
        />
        <script
          src={`//www.topcreativeformat.com/${ADSTERRA_KEY}/invoke.js`}
          async
        />
      </div>
    );
  }

  // Development / placeholder
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: typeof config.width === "number" ? config.width : "100%",
        maxWidth: "100%",
        height: typeof config.height === "number" ? config.height : 90,
        margin: "0 auto",
        background: "rgba(255,255,255,0.03)",
        border: "1px dashed var(--border)",
        borderRadius: "var(--radius-sm)",
        color: "var(--text-muted)",
        fontSize: "12px",
        letterSpacing: "0.5px",
        userSelect: "none",
      }}
    >
      {config.label} — Ad Placeholder
    </div>
  );
}