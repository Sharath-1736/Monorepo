let tracer = {
  startSpan() {
    return {
      end() {},
    };
  },
};

try {
  const { trace } = require('@opentelemetry/api');
  tracer = trace.getTracer('student-service');
} catch (error) {
  console.warn('[otel] OpenTelemetry disabled:', error.message);
}

module.exports = tracer;
