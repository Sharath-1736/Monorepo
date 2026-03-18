let tracer = {
  startSpan() {
    return {
      end() {},
    };
  },
};

try {
  const { trace } = require('@opentelemetry/api');
  tracer = trace.getTracer('college-service');
} catch (error) {
  console.warn('[otel] OpenTelemetry disabled:', error.message);
}

module.exports = tracer;
