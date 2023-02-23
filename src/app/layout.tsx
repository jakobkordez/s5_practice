import Header from "@/components/header";
import "@/styles/globals.scss";

export const metadata = {
  title: {
    default: "Radioamaterski izpit",
    template: "%s | Radioamaterski izpit",
  },
  description: "Priprave na radioamaterski izpit",
  icons: {
    shortcut: "/logo/zrs_logo_white.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl">
      <head />
      <body>
        <Header />

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
