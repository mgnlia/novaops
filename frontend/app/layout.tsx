import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaOps — AI-Powered DevOps Command Center",
  description:
    "Intelligent multi-agent DevOps orchestration powered by Amazon Nova. Monitor services, manage incidents, and command your infrastructure with AI agents.",
  keywords: ["DevOps", "AI", "Amazon Nova", "monitoring", "incident management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
