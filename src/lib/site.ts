// Central place for phone/WhatsApp. Safe for client use (NEXT_PUBLIC_*).
export const SITE = {
  // E.164 format recommended, leading "+" ok here
  PHONE_E164: process.env.NEXT_PUBLIC_PHONE_E164 ?? "+2348161660213",
  WHATSAPP_E164: process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "+2348161660213",
};

// Build a WhatsApp chat link. Uses digits-only per wa.me rules.
export function waLink(text?: string) {
  const digits = (SITE.WHATSAPP_E164 || "").replace(/[^\d]/g, "");
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// tel: link
export const telLink = `tel:${(SITE.PHONE_E164 || "").replace(/\s/g, "")}`;
