const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Leer .env.local manualmente
const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncContact() {
  console.log('Sincronizando sección de contacto...');

  const contactFields = [
    { id: 'contact-eyebrow', category: 'contact', content: 'ESTAMOS EN CORIA' },
    { id: 'contact-title', category: 'contact', content: 'Visítenos' },
    { id: 'contact-phone', category: 'contact', content: '+34 691 419 369' },
    { id: 'contact-email', category: 'contact', content: 'info@laabaceriacoria.es' },
    { id: 'contact-address', category: 'contact', content: 'C. Cervantes, 75, 41100 Coria del Río, Sevilla' },
    { id: 'contact-hours', category: 'contact', content: 'Lun - Vie: 8:30 - 14:00 | 17:30 - 21:00\nSábado: 8:30 - 14:00' },
  ];

  for (const field of contactFields) {
    const { data, error } = await supabase
      .from('site_content')
      .upsert(field, { onConflict: 'id' });
    
    if (error) {
      console.error(`Error al insertar ${field.id}:`, error.message);
    } else {
      console.log(`Campo ${field.id} sincronizado.`);
    }
  }

  // Eliminar llaves basura que confunden al usuario
  const garbageKeys = ['CONTACT_ADDRESS', 'CONTACT_PHONE', 'DIRECCIÓN', 'EMAIL'];
  console.log('\nLimpiando llaves antiguas...');
  
  const { error: deleteError } = await supabase
    .from('site_content')
    .delete()
    .in('id', garbageKeys);

  if (deleteError) {
    console.error('Error al borrar llaves antiguas:', deleteError.message);
  } else {
    console.log('Llaves antiguas eliminadas correctamente.');
  }

  console.log('\nSincronización completada.');
}

syncContact();
