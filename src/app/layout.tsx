import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import Header from "@/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ScrollToTop />
        <Header />
        <div className="mt-24 bg-gray-900">{children}</div>
      </body>
    </html>
  );
}
