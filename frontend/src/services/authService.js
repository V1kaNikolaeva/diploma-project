/**
 * Авторизован ли текущий пользователь
 * @return {boolean}
 */
import { useUserStore } from "../stores/user";

export function isAuthenticated() {
    return useUserStore().getUserInfo().isAuthenticated
}