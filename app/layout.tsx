import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";

const pixelifysans = Pixelify_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokérest",
  description: "Created by Rylan Graham",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pixelifysans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="flex min-h-screen flex-col items-start p-24">
            <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
              <Link className="w-full"href="/">
                <div className="bg-red-500 p-4 w-full justify-between font-semibold z-10 transition-colors hover:bg-red-600 flex rounded-full">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                    alt="Pokéball"
                    width={60}
                    height={60}
                  />
                  <h2 className="text-4xl text-bold py-2">Pokérest</h2>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                    alt="Pokéball"
                    width={60}
                    height={60}
                  />
                </div>
              </Link>
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
