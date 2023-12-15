import { CartPizzaType, TaxRateMapType } from '@/types';

export const calculateSubtotal = (cart: CartPizzaType[]) => {
  return cart.reduce((subtotal, item) => {
    return subtotal + item.price * item.quantity;
  }, 0);
};

// Function to calculate tax for the entire cart
export const calculateTax = (
  cart: CartPizzaType[],
  pizzeriaIdToCountryMap: Map<string, string>,
  taxRateMap: TaxRateMapType,
) => {
  return cart.reduce((tax, item) => {
    if (item.isTaxed) {
      let out = tax + item.price * item.quantity;

      const taxRate = taxRateMap[pizzeriaIdToCountryMap[item.pizzeriaId]];
      if (taxRate !== undefined) {
        out = out * (taxRate / 100);
      }

      return out;
    }

    return tax;
  }, 0);
};

// Function to calculate total for the entire cart
export const calculateTotal = (
  cart: CartPizzaType[],
  pizzeriaIdToCountryMap: Map<string, string>,
  taxRateMap: TaxRateMapType,
) => {
  const subtotal = calculateSubtotal(cart);
  const tax = calculateTax(cart, pizzeriaIdToCountryMap, taxRateMap);
  return parseFloat((subtotal + tax).toFixed(2));
};
