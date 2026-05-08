'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Package, LogOut, Plus, Settings, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      setUser(user);
      fetchProducts();
    };
    init();
  }, [router, supabase]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setLoading(false);
  };

  const seedDatabase = async () => {
    if (!confirm('¿Quieres cargar los productos iniciales en la base de datos?')) return;
    
    setLoading(true);
    const staticData = [
      { category: "Jamones", name: "Jamón de Bellota 100% Ibérico", price: "Consultar", description: "Piezas seleccionadas con más de 36 meses de curación.", image_url: "/images/Jamon_bellota.jpg" },
      { category: "Jamones", name: "Paleta de Cebo de Campo", price: "Consultar", description: "Sabor intenso y textura jugosa.", image_url: "/images/Jamon_bellota.jpg" },
      { category: "Jamones", name: "Jamón Reserva Oro", price: "Consultar", description: "Nuestra selección especial de la casa.", image_url: "/images/Jamon_oro.jpg" },
      { category: "Embutidos", name: "Caña de Lomo Ibérica", price: "Consultar", description: "Lomo de bellota curado en tripa natural.", image_url: "/images/caña_lomo_bellota.jpg" },
      { category: "Embutidos", name: "Chorizo de Bellota", price: "Consultar", description: "Aliño tradicional con pimentón de la Vera.", image_url: "/images/chorizo_bellota.jpg" },
      { category: "Embutidos", name: "Salchichón Artesano", price: "Consultar", description: "Pimienta negra en grano y magro de primera.", image_url: "/images/salchicho_bellota.jpg" },
      { category: "Quesos", name: "Queso Viejo de Oveja", price: "Consultar", description: "Leche cruda de oveja con 12 meses de maduración.", image_url: "/images/Queso_viejo_oveja.jpg" },
      { category: "Quesos", name: "Queso de Cabra al Pimentón", price: "Consultar", description: "Corteza untada en pimentón ahumado.", image_url: "/images/queso_pimenton.jpg" },
      { category: "Miel", name: "Miel de Tomillo", price: "Consultar", description: "Miel pura de la sierra, artesana.", image_url: "/images/miel_de_tomillo.jpg" },
      { category: "Miel", name: "Miel de Azahar", price: "Consultar", description: "Miel de flores de cítricos, aroma intenso.", image_url: "/images/miel_de_azahar.jpg" },
    ];

    const { error } = await supabase.from('products').insert(staticData);
    
    if (error) {
      alert('Error cargando datos: ' + error.message);
    } else {
      fetchProducts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  };

  const openModal = (product: any = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  if (loading && !products.length) return <div className="loading">Cargando...</div>;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ADMIN</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="/admin" className="active"><Package size={20} /> Catálogo</a>
          <a href="#"><MessageSquare size={20} /> Mensajes</a>
          <a href="#"><Settings size={20} /> Ajustes</a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Salir
        </button>
      </aside>

      <main className="admin-content">
        <header className="content-header">
          <h1>Gestión de Catálogo</h1>
          <button className="add-btn" onClick={() => openModal()}><Plus size={18} /> Nuevo Producto</button>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Productos</h3>
            <p>{products.length}</p>
          </div>
          <div className="stat-card">
            <h3>Categorías</h3>
            <p>{new Set(products.map(p => p.category)).size}</p>
          </div>
          <div className="stat-card">
            <h3>Activos</h3>
            <p>{products.length}</p>
          </div>
        </section>

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    <p style={{ marginBottom: '1rem' }}>No hay productos en el catálogo. ¡Añade el primero!</p>
                    <button onClick={seedDatabase} style={{ 
                      background: 'transparent', 
                      border: '1px solid #c5a059', 
                      color: '#c5a059',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer'
                    }}>
                      Cargar Catálogo Inicial
                    </button>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img 
                        src={product.image_url || '/images/placeholder.jpg'} 
                        alt={product.name} 
                        className="table-img"
                      />
                    </td>
                    <td><strong style={{ color: 'white' }}>{product.name}</strong></td>
                    <td><span className="badge">{product.category}</span></td>
                    <td>{product.price}</td>
                    <td>
                      <div className="actions">
                        <button onClick={() => openModal(product)}>Editar</button>
                        <button onClick={() => handleDelete(product.id)} className="delete">Borrar</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => setShowModal(false)} 
          onSave={() => {
            setShowModal(false);
            fetchProducts();
          }}
        />
      )}

      <style jsx>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #050505;
          color: white;
          font-family: var(--font-body);
        }

        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050505;
          color: #c5a059;
          font-family: var(--font-display);
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: #0a0a0a;
          border-right: 1px solid #c5a05922;
          display: flex;
          flex-direction: column;
          padding: 2rem;
        }

        .sidebar-header h2 {
          font-family: var(--font-display);
          color: #c5a059;
          letter-spacing: 4px;
          font-size: 1.2rem;
          margin-bottom: 3rem;
          text-align: center;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .sidebar-nav a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          color: #888;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.3s;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .sidebar-nav a.active, .sidebar-nav a:hover {
          background: #c5a05911;
          color: #c5a059;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          color: #ff4444;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: opacity 0.3s;
          margin-top: auto;
        }

        /* Main Content */
        .admin-content {
          flex: 1;
          padding: 3rem;
          overflow-y: auto;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .content-header h1 {
          font-family: var(--font-display);
          font-size: 2rem;
          color: white;
        }

        .add-btn {
          background: #c5a059;
          color: black;
          border: none;
          padding: 0.8rem 1.5rem;
          font-weight: 700;
          border-radius: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: #111;
          padding: 1.5rem;
          border: 1px solid #222;
          border-radius: 4px;
        }

        .stat-card h3 {
          color: #666;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .stat-card p {
          font-size: 2rem;
          font-family: var(--font-display);
          color: #c5a059;
        }

        .data-table {
          background: #111;
          border: 1px solid #222;
          border-radius: 4px;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 1.2rem;
          background: #1a1a1a;
          color: #c5a059;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid #222;
        }

        td {
          padding: 1.2rem;
          border-bottom: 1px solid #1a1a1a;
          color: #888;
        }

        .table-img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #333;
        }

        .badge {
          background: #c5a05922;
          color: #c5a059;
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .actions button {
          background: #222;
          border: none;
          color: #ccc;
          padding: 0.4rem 0.8rem;
          border-radius: 2px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s;
        }

        .actions button:hover {
          background: #333;
          color: white;
        }

        .actions button.delete:hover {
          background: #ff4444;
          color: white;
        }
      `}</style>
    </div>
  );
}

// Subcomponente Modal para crear/editar productos
function ProductModal({ product, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Jamones',
    price: product?.price || 'Consultar',
    description: product?.description || '',
    image_url: product?.image_url || ''
  });
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (product) {
      await supabase.from('products').update(formData).eq('id', product.id);
    } else {
      await supabase.from('products').insert([formData]);
    }
    
    onSave();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error subiendo imagen');
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    setFormData({ ...formData, image_url: publicUrl });
    setUploading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Jamones</option>
                <option>Embutidos</option>
                <option>Quesos</option>
                <option>Vinos</option>
                <option>Miel</option>
                <option>Conservas</option>
              </select>
            </div>
            <div className="form-group">
              <label>Precio</label>
              <input 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              rows={3}
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Imagen</label>
            <div className="upload-container">
              {formData.image_url && <img src={formData.image_url} alt="Preview" className="preview-img" />}
              <input type="file" onChange={handleImageUpload} disabled={uploading} />
              {uploading && <p>Subiendo...</p>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
            <button type="submit" className="save-btn">{product ? 'Guardar Cambios' : 'Crear Producto'}</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-card {
          background: #111;
          width: 100%;
          max-width: 500px;
          padding: 2.5rem;
          border: 1px solid #c5a05933;
          border-radius: 4px;
        }

        h2 {
          font-family: var(--font-display);
          color: #c5a059;
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #888;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        input, select, textarea {
          width: 100%;
          padding: 0.7rem;
          background: #1a1a1a;
          border: 1px solid #333;
          color: white;
          outline: none;
          border-radius: 2px;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #c5a059;
        }

        .upload-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .preview-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .cancel-btn {
          background: none;
          border: 1px solid #333;
          color: #888;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
        }

        .save-btn {
          background: #c5a059;
          color: black;
          border: none;
          padding: 0.8rem 1.5rem;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
