import "./globals.css";

export const metadata = {
  title: "CleanDrive Admin",
  description: "Dark, purple-accent top navigation admin"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-grid [background-size:20px_20px]">
        {children}
      </body>
    </html>
  );
}
