export const metadata = {
  title: "Thank you | Bayonetics Engineering",
  description: "We’ve received your request. Our team will reply shortly.",
};

export default function ThankYouPage() {
  return (
    <div className="container section">
      <h1>Thank you</h1>
      <p>
        We’ve received your request and sent a copy to your email (if selected).
        Our team will get back to you shortly.
      </p>
      <p>
        <a href="/services">← Back to Services</a>
      </p>
    </div>
  );
}
