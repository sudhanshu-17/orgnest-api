
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  manufacturerId: string;
  createdAt: string;
  stock: number;
}

export interface Manufacturer {
  id: string;
  name: string;
  description: string;
  logo: string;
  productsCount: number;
  country: string;
}
