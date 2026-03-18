class EventPublisher {
  async publish(eventType, payload, options = {}) {
    console.log('[EventPublisher] Publishing event:', { eventType, payload, options });
  }
}

module.exports = new EventPublisher();
