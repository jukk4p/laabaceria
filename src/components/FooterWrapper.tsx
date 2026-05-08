import Footer from "./Footer";
import { createClient } from "@/lib/supabase/server";

export default async function FooterWrapper() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  // Helper to get content by ID with fallback
  const getC = (id: string, fallback: string) => 
    siteContent?.find(c => c.id === id)?.content || fallback;

  const footerData = {
    tagline: getC('general-footer-tagline', 'Calidad, Tradición y Sabor en cada bocado.'),
    address: getC('contact-address', 'C. San Sebastián, 5, 41510 Mairena del Alcor, Sevilla'),
    hours: getC('contact-hours', 'Lunes a Viernes: 09:00 - 14:00 | 17:00 - 20:30\nSábados: 09:30 - 14:30'),
    instagram: getC('social-instagram', 'https://instagram.com/laabaceria'),
    facebook: getC('social-facebook', 'https://facebook.com/laabaceria'),
    copy: getC('general-footer-copy', '© 2024 La Abacería. Todos los derechos reservados.')
  };

  return <Footer data={footerData} />;
}
