import "./globals.css";

export const metadata = {
  title: "AI Tools Directory",
  description: "Online Directory of 400+ AI tools and resources on the internet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
