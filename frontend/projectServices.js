export function createCard() {
    return {
      id: lastCreateMeetupId--,
      type: '',
      currency: '',
      quantity: '',
      reason: '',
      date: new Date().setUTCHours(0, 0, 0, 0),
    };
}