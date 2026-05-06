import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Features from '@/components/Features';
import AboutSection from '@/components/AboutSection';
import FeaturedGallery from '@/components/FeaturedGallery';
import GourmetBaskets from '@/components/GourmetBaskets';
import Reviews from '@/components/Reviews';
import ContactSection from '@/components/ContactSection';
import FloatingCTA from '@/components/FloatingCTA';
import LocalSchema from '@/components/LocalSchema';
import Footer from '@/components/Footer';
import './Home.css';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <section className="middle-content">
        <AboutSection />
        <Features />
      </section>
      <GourmetBaskets />
      <FeaturedGallery />

      <Reviews />
      <ContactSection />
      <Footer />
      <FloatingCTA />
      <LocalSchema />
    </main>
  );
}
