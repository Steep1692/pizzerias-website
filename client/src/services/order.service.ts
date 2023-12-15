import {makeRequest} from "./api";

export const postOrderRequest = (total: number) => makeRequest('/order?total=' + total, {
  method: 'POST',
})
