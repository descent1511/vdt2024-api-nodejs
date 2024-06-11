import client, { Counter, Histogram, Registry } from 'prom-client';

const register = new Registry();

client.collectDefaultMetrics({ register });

function createCounter(name: string, help: string, labelNames: string[]): Counter {
  const counter = new client.Counter({ name, help, labelNames });
  register.registerMetric(counter);
  return counter;
}

function createHistogram(name: string, help: string, labelNames: string[], buckets: number[]): Histogram {
  const histogram = new client.Histogram({ name, help, labelNames, buckets });
  register.registerMetric(histogram);
  return histogram;
}

const httpRequestCounter = createCounter('http_request_total', 'Total number of HTTP requests', ['method', 'route', 'status_code']);
const httpRequestDuration = createHistogram('http_request_duration_seconds', 'Duration of HTTP requests in seconds', ['method', 'route', 'status_code'], [0.1, 0.5, 1, 2, 5]);

export {
  register,
  httpRequestCounter,
  httpRequestDuration,
};
