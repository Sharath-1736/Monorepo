const eventConsumer = require('./eventConsumer');

function handleSampleEvent(event) {
  console.log('[EventHandler] Received event:', event);
}

eventConsumer.subscribe('CourseCreated', handleSampleEvent);

module.exports = { handleSampleEvent };
