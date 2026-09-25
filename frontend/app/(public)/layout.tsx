import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/providers/motion-provider";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
