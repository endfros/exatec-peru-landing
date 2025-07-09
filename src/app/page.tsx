import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UpcomingEvents from '@/components/UpcomingEvents';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <UpcomingEvents />
      {/* <Testimonials /> */}
      <CallToAction />
    </>
  );
}
