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

export async function updateBalance() {
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
