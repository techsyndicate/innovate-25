export default interface MenuItem {
  _id?: string;
  name: string;
  price: number;
  description?: string;
  veg: boolean;
  mealType: string;
  rating?: number;
  bestseller?: boolean;
  quantity: number;
}
