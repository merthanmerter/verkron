import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[calc(100vh-4rem-24rem)] max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
