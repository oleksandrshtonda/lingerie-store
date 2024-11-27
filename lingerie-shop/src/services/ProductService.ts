import axiosInstance from '../utils/axiosInstance';


// Отримати продукт за ID
export const getProductById = async (id: number) => {
  return await axiosInstance.get(`/products/${id}`);
};

// Оновити продукт
export const updateProduct = async (id: number, productData: any) => {
  return await axiosInstance.put(`/products/${id}`, productData);
};

// Видалити продукт
export const deleteProduct = async (id: number) => {
  return await axiosInstance.delete(`/products/${id}`);
};

// Отримати всі продукти
export const getAllProducts = async () => {
  return await axiosInstance.get('/products');
};

// Створити продукт
export const createProduct = async (productData: any) => {
  return await axiosInstance.post('/products', productData);
};


// Отримати продукти за категорією
export const getProductsByCategoryId = async (categoryId: number) => {
  return await axiosInstance.get(`/products/getProductsByCategoryId/${categoryId}`);
};

// Шукати продукти
export const searchProducts = async (searchCriteria: any) => {
  return await axiosInstance.post('/products/search', searchCriteria);
};

// Типізація продукту
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

// Типізація відповіді API
interface ApiResponse<T> {
  data: T;
}

// Отримати нову колекцію
export const getNewCollection = async (): Promise<ApiResponse<Product[]>> => {
  try {
    return await axiosInstance.get('/products', {
      params: { filter: 'new-collection', start: 5, limit: 4 },
    });
  } catch (error) {
    console.error('Error fetching new collection:', error);
    throw error;
  }
};

// Отримати найпопулярніші продукти
export const getBestSellers = async (): Promise<ApiResponse<Product[]>> => {
  try {
    return await axiosInstance.get('/products', {
      params: { filter: 'best-sellers' },
    });
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    throw error;
  }
};

// Отримати продукти на розпродажу
export const getProductsOnSale = async (): Promise<ApiResponse<Product[]>> => {
  try {
    return await axiosInstance.get('/products/getProductsOnSale');
  } catch (error) {
    console.error('Error fetching products on sale:', error);
    throw error;
  }
};

// Отримати продукти для пошиття
export const getTailoringProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    return await axiosInstance.get('/products', {
      params: { filter: 'tailoring' },
    });
  } catch (error) {
    console.error('Error fetching tailoring products:', error);
    throw error;
  }
};
