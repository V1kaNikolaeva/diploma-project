import { ref } from "vue";
import { getSpending } from "../api/spending";

export async function useSpendingAxios() {
    const spendings = ref(null);

    spendings.value = await getSpending();

    return {
        spendings
    }
}