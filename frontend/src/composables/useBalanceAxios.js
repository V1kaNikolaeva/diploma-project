import { ref } from "vue";
import { getBalance } from '../api/balance'

export async function useBalanceAxios() {
    const balances = ref(null);

    balances.value = await getBalance();

    return {
        balances
    }
}