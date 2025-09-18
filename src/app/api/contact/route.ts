export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_FILES = Number(process.env.CONTACT_MAX_FILES ?? 5);
const MAX_TOTAL_MB = Number(process.env.CONTACT_MAX_TOTAL_MB ?? 20);
const EXTRA_OK = [".dxf", ".dwg", ".step", ".stp", ".iges", ".igs", ".zip"];

function okExt(name: string) {
  const lower = name.toLowerCase();
  return EXTRA_OK.some((x) => lower.endsWith(x));
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const serviceSlug = String(form.get("service") ?? "").trim();
    const serviceTitle = String(form.get("service_title") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();
    const sendCopy = String(form.get("sendcopy") ?? "").toLowerCase() === "on";

    if (!name || !email || !serviceSlug) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // ---- Files: ignore empty entries, validate the rest
    const rawFiles = form.getAll("attachments") as unknown[];
    const files: File[] = rawFiles.filter(
      (f): f is File =>
        f instanceof File &&
        !!f.name && // non-empty filename
        typeof f.size === "number" &&
        f.size > 0 // non-zero
    );

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { ok: false, error: `Too many files (max ${MAX_FILES}).` },
        { status: 400 }
      );
    }

    let totalBytes = 0;
    const attachments: {
      filename: string;
      content: Buffer;
      contentType?: string;
    }[] = [];
    for (const f of files) {
      const typeOk =
        f.type?.startsWith("image/") ||
        f.type === "application/pdf" ||
        okExt(f.name);

      if (!typeOk) {
        return NextResponse.json(
          { ok: false, error: `Unsupported file: ${f.name}` },
          { status: 400 }
        );
      }
      const ab = await f.arrayBuffer();
      const buf = Buffer.from(ab);
      totalBytes += buf.length;
      attachments.push({
        filename: f.name,
        content: buf,
        contentType: f.type || undefined,
      });
    }

    const totalMB = totalBytes / 1024 / 1024;
    if (totalMB > MAX_TOTAL_MB) {
      return NextResponse.json(
        {
          ok: false,
          error: `Attachments too large (${totalMB.toFixed(2)} MB). Max ${MAX_TOTAL_MB} MB.`,
        },
        { status: 400 }
      );
    }

    // ---- Email (nodemailer)
    const host = process.env.SMTP_HOST!;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;
    const secure = String(process.env.SMTP_SECURE ?? "false") === "true";
    const from =
      process.env.MAIL_FROM || `"Bayonetics RFQ" <no-reply@bayonetics.local>`;
    const to = process.env.MAIL_TO || "";

    if (!host || !user || !pass || !to) {
      return NextResponse.json(
        { ok: false, error: "Email transport not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const subject = `New RFQ – ${serviceTitle || serviceSlug} – ${name}`;
    const text = [
      `New RFQ submitted on ${new Date().toISOString()}`,
      "",
      `Name:    ${name}`,
      `Company: ${company || "-"}`,
      `Email:   ${email}`,
      `Phone:   ${phone || "-"}`,
      `Service: ${serviceTitle || serviceSlug}`,
      "",
      `Details:`,
      details || "(none)",
      "",
      `Source: ${process.env.NEXT_PUBLIC_SITE_URL || ""}`,
    ].join("\n");

    const html = `
      <h2>New RFQ</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
         <strong>Company:</strong> ${escapeHtml(company || "-")}<br/>
         <strong>Email:</strong> ${escapeHtml(email)}<br/>
         <strong>Phone:</strong> ${escapeHtml(phone || "-")}<br/>
         <strong>Service:</strong> ${escapeHtml(serviceTitle || serviceSlug)}</p>
      <p><strong>Details</strong><br/>${escapeHtml(details).replace(/\n/g, "<br/>") || "(none)"}</p>
      <p style="color:#666">Submitted: ${new Date().toISOString()}</p>
    `;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email,
      attachments,
      cc: sendCopy ? email : undefined, // email the customer a copy if checked
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
