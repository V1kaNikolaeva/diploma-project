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

export async function postSpending(spending) {
  return await axios
    .post('/api/spending/create/', spending)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('error', error);
    });
}

export async function putSpending(id, spending) {
  return await axios
    .put(`/api/spending/update/${id}/`, spending)
    .then((response) => {
      //Почему тут именно response.data, а не как сверху, не знает никто
      return response.data;
    })
    .catch((error) => {
      return console.log('error', error);
    });
}

export async function deleteSpending(id) {
  return await axios
    .delete(`/api/spending/delete/${id}/`)
    .then((response) => {
      //Почему тут именно response.data, а не как сверху, не знает никто
      return response.data;
    })
    .catch((error) => {
      return console.log('error', error);
    });
}
