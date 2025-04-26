import "../app/globals.css";
import { ModalProvider } from "@/context/ModalContext";
import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ModalProvider>
          <ClientLayout>{children}</ClientLayout>
        </ModalProvider>
      </body>
    </html>
  );
}
