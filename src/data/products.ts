export interface Product {
  id: string;
  name: string;
  category: 'jamon' | 'embutido' | 'queso' | 'conserva' | 'cesta';
  badge?: string;
  price: string;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'j1',
    name: 'Jamón de Bellota 100% Ibérico',
    description: 'Selección exclusiva de cerdos ibéricos alimentados con bellota. Curación mínima de 36 meses.',
    price: '549.00€/pieza',
    category: 'jamon',
    badge: 'D.O.P. Jabugo',
    image: '/images/Jamon_bellota.jpg'
  },
  {
    id: 'j2',
    name: 'Jamón Ibérico Selección Oro',
    description: 'Nuestra pieza más equilibrada, con un sabor intenso y veteado perfecto.',
    price: '425.00€/pieza',
    category: 'jamon',
    badge: 'Selección Oro',
    image: '/images/Jamon_oro.jpg'
  },
  {
    id: 'p1',
    name: 'Paleta Ibérica Bellota 100%',
    description: 'Pieza delantera de máxima calidad, 100% raza ibérica, alimentada exclusivamente con bellota.',
    price: '195.00€/pieza',
    category: 'jamon',
    badge: '100% Ibérica',
    image: '/images/paleta_premium.png'
  },
  {
    id: 'p2',
    name: 'Paleta Cebo Campo',
    description: 'Paleta de cerdos criados en libertad en la dehesa, alimentados con pastos naturales y piensos de calidad.',
    price: '135.00€/pieza',
    category: 'jamon',
    badge: 'Cebo Campo',
    image: '/images/paleta_premium.png'
  },
  {
    id: 'p3',
    name: 'Paleta Ibérica',
    description: 'Pieza delantera de gran sabor e infiltración, seleccionada por nuestros maestros artesanos.',
    price: '155.00€/pieza',
    category: 'jamon',
    badge: 'Artesano',
    image: '/images/paleta_premium.png'
  },
  {
    id: 'e1',
    name: 'Caña de Lomo de Bellota',
    description: 'Lomo ibérico de bellota curado en tripa natural con leña de encina.',
    price: '68.00€/kg',
    category: 'embutido',
    badge: 'Calidad Extra',
    image: '/images/caña_lomo_bellota.jpg'
  },
  {
    id: 'e2',
    name: 'Chorizo Ibérico de Bellota',
    description: 'Elaborado con magro de bellota y pimentón de la Vera. Receta tradicional.',
    price: '24.50€/kg',
    category: 'embutido',
    image: '/images/chorizo_bellota.jpg'
  },
  {
    id: 'e3',
    name: 'Salchichón de Bellota Extra',
    description: 'Salchichón ibérico con un toque sutil de pimienta negra seleccionada.',
    price: '24.50€/kg',
    category: 'embutido',
    image: '/images/salchicho_bellota.jpg'
  },
  {
    id: 'q1',
    name: 'Queso Viejo de Oveja',
    description: 'Queso de oveja con 12 meses de curación, sabor potente y persistente.',
    price: '24.90€/kg',
    category: 'queso',
    badge: 'Curado 12m',
    image: '/images/Queso_viejo_oveja.jpg'
  },
  {
    id: 'q2',
    name: 'Queso de Cabra Curado',
    description: 'Queso artesano de la sierra, elaborado con leche cruda de cabra.',
    price: '19.80€/kg',
    category: 'queso',
    image: '/images/queso_cabra.jpg'
  },
  {
    id: 'q3',
    name: 'Queso al Pimentón de la Vera',
    description: 'Queso curado recubierto con el mejor pimentón de la Vera.',
    price: '22.50€/kg',
    category: 'queso',
    image: '/images/queso_pimenton.jpg'
  },
  {
    id: 'c1',
    name: 'Anchoas del Cantábrico Serie Oro',
    description: 'Filetes seleccionados a mano, limpios y conservados en aceite de oliva.',
    price: '14.50€',
    category: 'conserva',
    badge: 'Santoña',
    image: '/images/anchoas_cantabrico.jpg'
  },
  {
    id: 'c2',
    name: 'Ventresca de Atún Rojo',
    description: 'La parte más jugosa y preciada del atún rojo en conserva artesanal.',
    price: '12.90€',
    category: 'conserva',
    image: '/images/ventresca.jpg'
  },
  {
    id: 'm1',
    name: 'Miel de Azahar Artesana',
    description: 'Miel pura recolectada de forma tradicional de campos de naranjos.',
    price: '8.50€',
    category: 'conserva',
    image: '/images/miel_de_azahar.jpg'
  },
  {
    id: 'g1',
    name: 'Lote Degustación Tradicional',
    description: 'Selección equilibrada de embutidos, regañás artesanales y aceite de oliva virgen extra.',
    price: '35.00€/pieza',
    category: 'cesta',
    badge: 'POPULAR',
    image: '/images/cesta_pequeña.jpg'
  },
  {
    id: 'g2',
    name: 'Cesta Regalo Gourmet',
    description: 'La experiencia completa: quesos premiados, embutidos ibéricos y vinos de selección.',
    price: '65.00€/pieza',
    category: 'cesta',
    badge: 'PREMIUM',
    image: '/images/cesta_pequeña_variada.jpg'
  },
  {
    id: 'g3',
    name: 'Pack Selección Abacería',
    description: 'Elige tú los productos. Personaliza tu pack con lo que más te guste de nuestra vitrina.',
    price: 'Consultar',
    category: 'cesta',
    badge: 'A MEDIDA',
    image: '/images/mas_productos.jpg'
  }
]
