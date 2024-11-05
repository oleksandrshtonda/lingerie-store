// Оголошення типу для категорій
export interface Category {
    id: number;
    name: string;
}

export const initialCategories: Category[] = [
    { id: 1, name: 'New' },
    { id: 2, name: 'Sale' },
    { id: 3, name: 'Bras' },
    { id: 4, name: 'Panties' },
    { id: 5, name: 'Lingerie' },
    { id: 6, name: 'Sets' },
    { id: 7, name: 'Swimwear' },
    { id: 8, name: 'Sleepwear' },
    { id: 9, name: 'Home Linen' },
    { id: 10, name: 'Individual Tailoring' }
  ];