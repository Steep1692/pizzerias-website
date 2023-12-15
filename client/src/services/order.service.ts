import {makeRequest} from "./api.service";

export const postOrderRequest = (total: number) => makeRequest('/order?total=' + total, {
  method: 'POST',
})
