const eventConsumer = require('./eventConsumer');

function handleSampleEvent(event) {
  console.log('[EventHandler] Received event:', event);
}

eventConsumer.subscribe('PricingCreated', handleSampleEvent);

module.exports = { handleSampleEvent };
