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

export async function putBalance(id, amount) {
  return await axios
    .put(`/api/balance/update/${id}/`, { amount: amount })
    .then((response) => {
      //Почему тут именно response.data, а не как сверху, не знает никто
      return response.data;
    })
    .catch((error) => {
      return console.log('error', error);
    });
}
