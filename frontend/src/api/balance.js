import { useRoute } from 'vue-router';
import axios from 'axios';


export async function getBalance() {
const route = useRoute();
  return await axios
    .get(`/api/balance/${route.params.id}`)
    .then((response) => {
      return Object.values(response.data).flat();
    })
    .catch((error) => {
      return console.log('error', error);
    });
}

export async function postBalance(balance) {
  return await axios
    .post('/api/balance/create/', balance)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('error', error);
    });
}


export async function putBalance(id, amount) {
  return await axios
    .put(`/api/balance/update/${id}/`, { amount: amount })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.log('error', error);
    });
}

export async function deleteBalance(id) {
  return await axios
    .delete(`/api/balance/delete/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.log('error', error);
    });
}

