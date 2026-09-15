import Banner from '@/components/home/Banner';
import ChooseUs from '@/components/home/ChooseUs';
import About from '@/components/home/About';
import Discount from '@/components/home/Discount';
import ServiceShowcase from '@/components/home/ServiceShowcase';
import GetStarted from '@/components/home/GetStarted';
import Testimonials from '@/components/home/Testimonials';
import TopCategories from '@/components/home/TopCategories';
import BlogSection from '@/components/home/BlogSection';
import Cta from '@/components/home/Cta';
import CtaContact from '@/components/home/CtaContact';
import BrandSlider from '@/components/home/BrandSlider';

export default function HomePage() {
  return (
    <>
      <Banner />
      <ChooseUs />
      <About />
      <Discount />
      <ServiceShowcase />
      <GetStarted />
      <Testimonials />
      <TopCategories />
      <BlogSection />
      <Cta />
      <CtaContact />
      <BrandSlider />
    </>
  );
}
