import "../globals.css";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ScrollToTop />
        <div className="bg-gray-900">{children}</div>
      </body>
    </html>
  );
} 