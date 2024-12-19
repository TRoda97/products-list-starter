// If needed in the future
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// If needed in the future
interface Review {
  rating: number;
  comment: string;
  date: string; // ISO string para datas -> usaria o Moment(), não coloquei para não instalar coisas desnecessárias por agora
  reviewerName: string;
  reviewerEmail: string;
}

// If needed in the future
interface MetaData {
  createdAt: string; // ISO string para datas -> usaria o Moment(), não coloquei para não instalar coisas desnecessárias por agora
  updatedAt: string; // ISO string para datas -> usaria o Moment(), não coloquei para não instalar coisas desnecessárias por agora
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaData;
  images: string[];
  thumbnail: string;
  amount?: number;
}

export async function getProductsList(): Promise<Product[]> {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados");
    }
    const result = await response.json();
    return result.products;
  } catch {
    throw new Error("Erro ao obter os produtos.");
  }
}
