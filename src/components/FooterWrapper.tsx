import Footer from "./Footer";
import { createClient } from "@/lib/supabase/server";

export default async function FooterWrapper() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  // Helper to get content by ID with fallback
  const getC = (id: string, fallback: string) => 
    siteContent?.find((c: any) => c.id === id)?.content || fallback;

  const footerData = {
    tagline: getC('general-footer-tagline', 'Calidad, Tradición y Sabor en cada bocado.'),
    address: getC('contact-address', 'C. Cervantes, 75, 41100 Coria del Río, Sevilla'),
    hours: getC('contact-hours', 'Lun - Vie: 8:30 - 14:00 | 17:30 - 21:00\nSábado: 8:30 - 14:00'),
    instagram: getC('social-instagram', 'https://www.instagram.com/la_abaceria_/'),
    facebook: getC('social-facebook', 'https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/'),
    whatsapp: getC('social-whatsapp', '34691419369'),
    phone: getC('contact-phone', '691419369'),
    email: getC('contact-email', 'info@laabaceriacoria.es'),
    copy: getC('general-footer-copy', '© 2026 La Abacería. Todos los derechos reservados.'),
    hoursWeekdayLabel: getC('footer-hours-weekday-label', 'Lunes a Viernes:'),
    hoursWeekday: getC('footer-hours-weekday', '08:30 - 14:00, 17:30 - 21:00'),
    hoursSaturdayLabel: getC('footer-hours-saturday-label', 'Sábado:'),
    hoursSaturday: getC('footer-hours-saturday', '08:30 - 14:00'),
    hoursSundayLabel: getC('footer-hours-sunday-label', 'Domingo:'),
    hoursSunday: getC('footer-hours-sunday', 'Cerrado'),
  };

  return <Footer data={footerData} />;
}
