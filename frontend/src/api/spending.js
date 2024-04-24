import { useRoute } from 'vue-router';
import axios from 'axios';

export async function getSpending() {
  const route = useRoute();
  return await axios
    .get(`/api/spending/${route.params.id}`)
    .then((response) => {
      return Object.values(response.data).flat();
    })
    .catch((error) => {
      return console.log('error', error);
    });
}
