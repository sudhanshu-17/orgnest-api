
-- Create tables
CREATE TABLE manufacturers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    logo TEXT,
    country TEXT,
    products_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    manufacturer_id UUID REFERENCES manufacturers(id) ON DELETE CASCADE,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for manufacturers
CREATE POLICY "Allow public read access" ON manufacturers
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON manufacturers
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON manufacturers
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON manufacturers
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for products
CREATE POLICY "Allow public read access" ON products
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON products
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to update products count
CREATE OR REPLACE FUNCTION update_manufacturer_products_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE manufacturers 
    SET products_count = products_count + 1
    WHERE id = NEW.manufacturer_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE manufacturers 
    SET products_count = products_count - 1
    WHERE id = OLD.manufacturer_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for products count
CREATE TRIGGER update_manufacturer_products_count
AFTER INSERT OR DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION update_manufacturer_products_count();
