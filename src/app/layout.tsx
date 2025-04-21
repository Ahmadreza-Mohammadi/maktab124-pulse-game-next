import Header from "@/components/header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        <div className="mt-64 bg-gray-900">{children}</div>
      </body>
    </html>
  );
}
