import Header from './components/Header';
import Hero from './components/Hero';

export default function Home() {
  return (
    <main className="container flex flex-col gap-24 py-8 mobile:gap-40 tablet:py-40 w-full">
      <Header />
      <Hero />
    </main>
  );
}
