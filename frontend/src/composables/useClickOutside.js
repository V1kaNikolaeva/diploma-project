import { onBeforeUnmount, onMounted } from 'vue';

export function useClickOutside(el, func) {
  let listener = (event) => {
    if (event.composedPath().includes(el)) {
      return;
    } else {
      func();
    }
  };

  onMounted(() => {
    window.addEventListener('click', listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', listener);
  });
  return listener()

}
