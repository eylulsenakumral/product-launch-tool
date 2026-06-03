import type { Metadata } from "next";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

export const metadata: Metadata = {
  title: "Product Hunt Launch Draft Tool",
  description: "Draft and preview your Product Hunt launch in real-time",
  openGraph: {
    title: "Product Hunt Launch Draft Tool",
    description: "Draft and preview your Product Hunt launch in real-time. Save your progress, export to markdown, and launch with confidence.",
    type: "website",
    url: "https://eylulsenakumral.github.io/product-launch-tool/",
    siteName: "Product Hunt Launch Tool",
    images: [
      {
        url: "https://eylulsenakumral.github.io/product-launch-tool/og-image.png",
        width: 1200,
        height: 630,
        alt: "Product Hunt Launch Draft Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Hunt Launch Draft Tool",
    description: "Draft and preview your Product Hunt launch in real-time. Save your progress, export to markdown, and launch with confidence.",
    site: "@producthunt",
    creator: "@tolgabrk",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Built by <a href="https://github.com/eylulsenakumral" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">@eylulsenakumral</a>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="/faq" className="text-zinc-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400">FAQ</a>
                <a href="https://github.com/eylulsenakumral/product-launch-tool" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
