export function spending(spending, reason, spendingType) {
  return {
    spending: spending || null,
    reason: reason || null,
    spendingType: spendingType || null,
  };
}
