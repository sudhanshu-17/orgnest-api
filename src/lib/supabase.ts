
import { createClient } from '@supabase/supabase-js';
import { Product, Manufacturer } from '@/types';

// Default values for development - replace these with your actual public keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth utilities
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Database utilities
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      manufacturer:manufacturers(
        id,
        name
      )
    `);
  if (error) throw error;
  return data;
};

export const getManufacturers = async () => {
  const { data, error } = await supabase
    .from('manufacturers')
    .select('*');
  if (error) throw error;
  return data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const createManufacturer = async (manufacturer: Omit<Manufacturer, 'id' | 'productsCount'>) => {
  const { data, error } = await supabase
    .from('manufacturers')
    .insert([manufacturer])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateManufacturer = async (id: string, updates: Partial<Manufacturer>) => {
  const { data, error } = await supabase
    .from('manufacturers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteManufacturer = async (id: string) => {
  const { error } = await supabase
    .from('manufacturers')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Storage utilities
export const uploadImage = async (file: File, bucket: 'products' | 'manufacturers') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${bucket}/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
};
