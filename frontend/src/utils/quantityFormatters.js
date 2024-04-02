export function quantityFormatterRUB(quantity) {
    const RUBCurrency = new Intl.NumberFormat('ru-RU', {
        currency: 'RUB',
    });

    return RUBCurrency.format(quantity)
}