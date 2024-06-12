import { Gauge, Registry, collectDefaultMetrics } from 'prom-client';

// Create a Registry which registers the metrics
const register = new Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'frontend-metrics-app',
});

// Enable the collection of default metrics
collectDefaultMetrics({ register });

// Create custom metrics for each web-vitals metric
const clsGauge = new Gauge({
  name: 'web_vitals_cls',
  help: 'Cumulative Layout Shift',
  labelNames: ['name','id', 'rating', 'route'],
});

const fidGauge = new Gauge({
  name: 'web_vitals_fid',
  help: 'First Input Delay',
  labelNames: ['name','id', 'rating', 'route'],
});

const lcpGauge = new Gauge({
  name: 'web_vitals_lcp',
  help: 'Largest Contentful Paint',
  labelNames: ['name','id', 'rating', 'route'],
});

const fcpGauge = new Gauge({
  name: 'web_vitals_fcp',
  help: 'First Contentful Paint',
  labelNames: ['name','id', 'rating', 'route'],
});

const ttfbGauge = new Gauge({
  name: 'web_vitals_ttfb',
  help: 'Time to First Byte',
  labelNames: ['name','id', 'rating', 'route'],
});

register.registerMetric(clsGauge);
register.registerMetric(fidGauge);
register.registerMetric(lcpGauge);
register.registerMetric(fcpGauge);
register.registerMetric(ttfbGauge);

export {
  register,
  clsGauge,
  fidGauge,
  lcpGauge,
  fcpGauge,
  ttfbGauge,
};
