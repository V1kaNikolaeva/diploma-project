<template>
  <div class="tips__wrapper">
    <div class="parag-contanier">
      <h2>Как тратить деньги с умом?</h2>
    </div>

    <div class="parag-contanier">
      <h3 class="tip-title">Совет 1 - Составьте бюджет</h3>
      <p class="tip-text">
        Начните с составления бюджета, чтобы понимать, сколько денег у вас есть и на что они уходят. Важно
        контролировать свои финансы.
      </p>
    </div>
    <div class="parag-contanier">
      <h3 class="tip-title">Совет 2 - Определите приоритеты</h3>
      <p class="tip-text">
        Разделите свои траты на обязательные (аренда, питание) и желательные (развлечения, путешествия) расходы. Это
        поможет понять, на что стоит больше сосредоточиться.
      </p>
    </div>
    <div class="parag-contanier">
      <h3 class="tip-title">Совет 3 - Экономьте на повседневных расходах</h3>
      <p class="tip-text">
        Подумайте, где можно сэкономить, например, планируйте покупки заранее, отказывайтесь от ненужных вещей.
      </p>
    </div>
    <div class="parag-contanier">
      <h3 class="tip-title">Совет 4 - Инвестируйте</h3>
      <p class="tip-text">
        Рассмотрите возможности инвестирования своих сбережений. Инвестиции могут помочь вам увеличить свой капитал в
        будущем.
      </p>
    </div>
    <div class="parag-contanier">
      <h3 class="tip-title">Совет 5 - Создайте фонд чрезвычайных ситуаций</h3>
      <p class="tip-text">Важно иметь запасы на случай неожиданных расходов или потери дохода.</p>
    </div>
    <div class="parag-contanier">
      <h3 class="tip-title">Совет 6 - Образование и развитие</h3>
      <p class="tip-text">
        Инвестируйте в свое образование и профессиональное развитие. Это может привести к увеличению доходов в будущем.
      </p>
    </div>
    <div class="parag-contanier">
      <h3 class="tip-title">Совет 7 - Сравнивайте цены</h3>
      <p class="tip-text">
        Перед покупкой сравнивайте цены на товары и услуги. Иногда небольшие усилия могут сэкономить вам деньги.
      </p>
    </div>
    <div class="parag-contanier">
      <h3 class="tip-title">Совет 8 - Здоровый образ жизни</h3>
      <p class="tip-text">
        Инвестируйте в здоровье, например, занимайтесь спортом, чтобы снизить расходы на лечение в будущем.
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.tips__wrapper {
  margin: 0 auto;
  max-width: 800px;
}
.parag-contanier {
  margin-top: 70px;
}
.tip-title {
    border-bottom: 1px solid var(--card-color);
  margin-bottom: 20px;
}
@media screen and (max-width: 768px) {
  .parag-contanier {
    margin: 50px;
  }
}
</style>
