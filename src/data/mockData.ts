
import { Product, Manufacturer } from "@/types";

export const manufacturers: Manufacturer[] = [
  {
    id: "1",
    name: "TechCorp Industries",
    description: "Leading manufacturer of high-end electronics",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    productsCount: 45,
    country: "United States",
  },
  {
    id: "2",
    name: "EcoTech Solutions",
    description: "Sustainable technology products",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    productsCount: 32,
    country: "Germany",
  },
  {
    id: "3",
    name: "Digital Dynamics",
    description: "Innovative digital solutions",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    productsCount: 28,
    country: "Japan",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Pro Laptop X1",
    description: "High-performance laptop for professionals",
    price: 1299.99,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    manufacturerId: "1",
    createdAt: "2024-01-15",
    stock: 50,
  },
  {
    id: "2",
    name: "EcoPhone 12",
    description: "Eco-friendly smartphone with recycled materials",
    price: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    manufacturerId: "2",
    createdAt: "2024-02-01",
    stock: 75,
  },
  {
    id: "3",
    name: "SmartWatch Pro",
    description: "Advanced smartwatch with health tracking",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    manufacturerId: "3",
    createdAt: "2024-02-15",
    stock: 100,
  },
];
