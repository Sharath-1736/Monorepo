const eventConsumer = require('./eventConsumer');

function handleSampleEvent(event) {
  console.log('[EventHandler] Received event:', event);
}

eventConsumer.subscribe('ProductCreated', handleSampleEvent);

module.exports = { handleSampleEvent };
