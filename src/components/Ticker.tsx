import AdminEditable from './AdminEditable';

interface TickerProps {
  items?: string[];
}

const defaultItems = [
  'Jabugo', 'Guijuelo', 'Dehesa de Extremadura', 'Valle de los Pedroches',
  'Corte a cuchillo', 'Producto artesano', 'Edición limitada', 'Calidad suprema'
]

export default function Ticker({ items = defaultItems }: TickerProps) {
  // Double the array for seamless infinite scroll
  const doubledItems = [...items, ...items]

  return (
    <div className="w-full bg-bg-ticker border-y border-gold/10 overflow-hidden py-4">
      <AdminEditable id="ticker-items" content={items.join(', ')}>
        <div className="flex whitespace-nowrap animate-ticker">
          {doubledItems.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-[11px] uppercase tracking-ticker text-gold-muted px-8 font-medium">
                {item}
              </span>
              <span className="text-gold/20 font-bold">·</span>
            </div>
          ))}
        </div>
      </AdminEditable>
    </div>
  )
}
