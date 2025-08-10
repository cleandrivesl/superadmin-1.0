import "./globals.css";

export const metadata = {
  title: "CleanDrive Admin",
  description: "Futuristic dark admin for CleanDrive"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-grid [background-size:20px_20px] mesh">
        {children}
      </body>
    </html>
  );
}
