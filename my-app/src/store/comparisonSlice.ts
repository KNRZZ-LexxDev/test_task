import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockProducts } from '../consts/products';

export interface Product {
  id: number;
  name: string;
  image: string;
  features: Record<string, any>;
}

interface ComparisonState {
  allProducts: Product[]; // все доступные товары
  selectedProducts: Product[]; // выбранные для сравнения
  displayCount: number; // сколько показывать (от 2 до 6)
  showDifferencesOnly: boolean;
  searchQuery: string; // для поиска в всплывающем окне
}

const initialState: ComparisonState = {
  allProducts: mockProducts, // Изначально заполняйте фиктивными данными
  selectedProducts:  mockProducts,
  displayCount: 3,
  showDifferencesOnly: false,
  searchQuery: '',
};

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    setAllProducts(state, action: PayloadAction<Product[]>) {
      state.allProducts = action.payload;
      // Изначально выберите первые 3
      state.selectedProducts = action.payload.slice(0, state.displayCount);
    },
    setSelectedProducts(state, action: PayloadAction<Product[]>) {
      state.selectedProducts = action.payload;
    },
    setDisplayCount(state, action: PayloadAction<number>) {
      state.displayCount = Math.max(2, Math.min(6, action.payload));
    },
    setShowDifferencesOnly(state, action: PayloadAction<boolean>) {
      state.showDifferencesOnly = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    replaceProduct(state, action: PayloadAction<{ index: number; newProduct: Product }>) {
      const { index, newProduct } = action.payload;
      if (index >= 0 && index < state.selectedProducts.length) {
        state.selectedProducts[index] = newProduct;
      }
    }
  },
});

export const {
  setAllProducts,
  setSelectedProducts,
  setDisplayCount,
  setShowDifferencesOnly,
  setSearchQuery,
  replaceProduct
} = comparisonSlice.actions;

export default comparisonSlice.reducer;