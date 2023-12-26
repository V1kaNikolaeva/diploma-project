<template>
  <div class="card__wrapper">
    <div class="card">
      <p>{{ card.quantity }}{{ card.currency }}</p>
      <p>{{ card.reason }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UICard",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card__wrapper {
  min-width: 200px;
  margin: 10px;
}
.card {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  background-image: url(../assets/images/bg-dots.jpg);
}

p:first-child {
  text-align: end;
  width: 30%;
  font-weight: bold;
}

p:nth-child(2) {
  text-align: start;
  width: 70%;
}
</style>
