import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <header>
        <Navbar />
      </header>

      <main
        role="main"
        aria-label="Main content"
        className="flex-grow px-4 md:px-12 py-8 w-full max-w-7xl mx-auto container backdrop-blur-md bg-white/5 rounded-lg shadow-xl pt-16" // Add pt-16 to account for the fixed Navbar
      >
        {children}
      </main>

      <footer className="text-center py-4 text-sm text-gray-400">
        © 2025 True Feedback. Built with integrity.
      </footer>
    </div>
  );
}
