// Example event handler registration (future: real event bus)
const eventConsumer = require('./eventConsumer');

// Example: handle UserCreated events from other services
function handleUserCreated(event) {
  console.log('[EventHandler] Received event:', event);
  // Add business logic here (e.g., send welcome email)
}

// Register handler (future: real event bus)
eventConsumer.subscribe('UserCreated', handleUserCreated);

module.exports = { handleUserCreated };
