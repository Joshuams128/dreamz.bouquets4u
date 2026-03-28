import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Swap this out when you have the real owner email ──
const OWNER_EMAIL = "OWNER_EMAIL_HERE";

interface OrderPayload {
  fullName: string;
  email: string;
  phone?: string;
  bouquetSize: string;
  colorPreference: string;
  addOns: string[];
  specialRequests?: string;
  requiredDate: string;
}

function buildOwnerEmail(data: OrderPayload): string {
  const addOnsList =
    data.addOns.length > 0 ? data.addOns.map((a) => `• ${a}`).join("\n") : "None";

  return `
New Order Enquiry — Dreamz Bouquets
=====================================

Customer Details
----------------
Name:   ${data.fullName}
Email:  ${data.email}
Phone:  ${data.phone || "Not provided"}

Order Details
-------------
Bouquet Size:     ${data.bouquetSize}
Colour Preference: ${data.colorPreference}
Required Date:    ${data.requiredDate}

Add-ons Selected:
${addOnsList}

Special Requests / Message:
${data.specialRequests || "None"}

=====================================
Reply directly to this email to contact the customer.
`.trim();
}

function buildCustomerEmail(data: OrderPayload): string {
  return `
Hi ${data.fullName},

Thank you for your order enquiry with Dreamz Bouquets!

We've received the following details:

  Bouquet:  ${data.bouquetSize}
  Colour:   ${data.colorPreference}
  Date:     ${data.requiredDate}
  Add-ons:  ${data.addOns.length > 0 ? data.addOns.join(", ") : "None"}

Keerthi & Shyla will review your order and get back to you within 24 hours to confirm everything.

In the meantime, follow us on Instagram for a peek at our latest creations:
  @dreamz.bouquets4 — https://www.instagram.com/dreamz.bouquets4

With love,
Keerthi & Shyla
Dreamz Bouquets
`.trim();
}

export async function POST(req: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Server configuration error. Please contact us on Instagram." },
      { status: 500 }
    );
  }

  let data: OrderPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Basic validation
  if (
    !data.fullName?.trim() ||
    !data.email?.trim() ||
    !data.bouquetSize?.trim() ||
    !data.colorPreference?.trim() ||
    !data.requiredDate?.trim()
  ) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 422 }
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    // Send notification to owner
    await resend.emails.send({
      from: "Dreamz Bouquets Orders <orders@resend.dev>",
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `New Order Enquiry from ${data.fullName} — ${data.bouquetSize}`,
      text: buildOwnerEmail(data),
    });

    // Send confirmation to customer
    await resend.emails.send({
      from: "Dreamz Bouquets <orders@resend.dev>",
      to: data.email,
      subject: "We received your order enquiry — Dreamz Bouquets",
      text: buildCustomerEmail(data),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us on Instagram." },
      { status: 500 }
    );
  }
}
