<template>
  <div class="toasts">
    <div 
      v-for="toast in toasts" 
      :key="toast" 
      class="toast" 
      :class="{ 'toast_success' : toast.type === 'success', 'toast_error' : toast.type === 'error' }"
    >
      <UIIcon 
        :icon="toast.type === 'success' ? 'check' : 
        toast.type === 'error' ? 'error' : null" 
        class="toast__icon">
      </UIIcon>
      <UiToast :toast="toast"/>
    </div>
  </div>
</template>

<script>
import UiToast from './UiToast.vue'
import UIIcon from './UIIcon.vue';


export default {
  name: 'TheToaster',

  components: { UiToast, UIIcon },

  data() {
    return {
      toasts: [],
    }
  },

  methods: {
    error(message) {
      this.toasts.push({ message, type: 'error' });
      this.clearToast()
    },

    success(message) {
      this.toasts.push({ message, type: 'success' });
      this.clearToast();
    },

    clearToast() {
      setTimeout(() => {
        this.toasts.shift();
      }, 5000)
    },

  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: var(--card-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green-check);
}

.toast.toast_error {
  color: var(--red-error);
}
</style>./UiIcon.vue