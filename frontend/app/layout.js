import "/styles/globals.css";

export const metadata = {
  title: "Faiz Generator",
  description:
    "Generate professional Node.js backend projects in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}