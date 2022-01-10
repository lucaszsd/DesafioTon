export interface Breed {
  id: string;
  name: string;
  temperament: string;
  life_span: string;
  image: {
    url: string;
  };
}

export interface Product {
  id: string,
  quantity: Number,
  selected: Boolean,
}