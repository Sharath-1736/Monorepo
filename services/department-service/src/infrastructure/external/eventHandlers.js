const eventConsumer = require('./eventConsumer');

function handleSampleEvent(event) {
  console.log('[EventHandler] Received event:', event);
}

eventConsumer.subscribe('DepartmentCreated', handleSampleEvent);

module.exports = { handleSampleEvent };
