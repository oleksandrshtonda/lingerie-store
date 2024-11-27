import axiosInstance from '../utils/axiosInstance';

// Отримати категорію за ID
export const getCategoryById = async (id: number) => {
  return await axiosInstance.get(`/categories/${id}`);
};

// Оновити категорію
export const updateCategory = async (id: number, categoryData: any) => {
  return await axiosInstance.put(`/categories/${id}`, categoryData);
};

// Видалити категорію
export const deleteCategory = async (id: number) => {
  return await axiosInstance.delete(`/categories/${id}`);
};

// Отримати всі категорії
export const getAllCategories = async () => {
  return await axiosInstance.get('/categories');
};

// Створити категорію
export const createCategory = async (categoryData: any) => {
  return await axiosInstance.post('/categories', categoryData);
};
