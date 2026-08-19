import "./globals.css";

export const metadata = {
  title: "Faiz Generator",
  description: "Developer project generator"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}