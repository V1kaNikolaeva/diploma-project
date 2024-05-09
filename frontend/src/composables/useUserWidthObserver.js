import { ref } from "vue";


export function useUserWidthObserver() {
    const userWidth = ref()
    const observer = new ResizeObserver((e) => {
      userWidth.value = e[0].contentRect.width
    })
    observer.observe(document.querySelector('body'))

    return {
        userWidth
    }
}