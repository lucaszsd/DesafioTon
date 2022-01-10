export interface Breed {
  id: string;
  name: string;
  temperament: string;
  life_span: string;
  image: {
    url: string;
  };
  origin: string;
  weight: {
    imperial: string;
    metric: string;
  },
  height: {
    imperial: string;
    metric: string;
  },
  breed_group: string;
}
 
export interface Product {
  id: string,
  quantity: Number,
  selected: Boolean,
}

export interface ShoppingCartReducerState {
  products: Breed[];
  shoppingCart: Product[];
}