
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
    .select('*');
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

export const createManufacturer = async (manufacturer: Omit<Manufacturer, 'id'>) => {
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
