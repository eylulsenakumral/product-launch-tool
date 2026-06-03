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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
