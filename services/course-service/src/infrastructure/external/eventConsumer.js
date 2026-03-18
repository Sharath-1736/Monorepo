class EventConsumer {
  async subscribe(eventType, handler) {
    console.log('[EventConsumer] Subscribed to event:', eventType);
    setTimeout(() => handler({ eventType, payload: { sample: true } }), 1000);
  }
}

module.exports = new EventConsumer();
