export interface UserType {
  first_name: string;
  last_name: string;
  address: string;
  pincode: string;
  profile_pic: string;
  email: string;
  city: string;
}

export interface MenuItemType {
  id?: string;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string;
}

export interface CartItemType {
  id?: string;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string;
  quantity: number;
}

export interface CategoryType {
  id: string;
  category: string;
  createdAt: Date;
}
