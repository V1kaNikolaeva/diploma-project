/**
 * Авторизован ли текущий пользователь
 * @return {boolean}
 */
import { useUserStore } from "../src/stores/user";

export function isAuthenticated() {
    return useUserStore().getUserInfo().isAuthenticated
}