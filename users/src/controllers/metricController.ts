import { Request, Response } from 'express';
import { register, clsGauge, fidGauge, lcpGauge, fcpGauge, ttfbGauge } from '../metrics/front-end-metrics';

interface Metric {
  name: string;
  id: string;
  value: number;
  route: string;
  rating: string;
}

class MetricsController {
  public static pushFrontendMetric(req: Request, res: Response): void {
    const metric: Metric = req.body;
    MetricsController.saveMetric(metric);
    res.status(200).send('Metric received');
  }

  private static saveMetric(metric: Metric): void {
    const labels = {
      name: metric.name,
      id: metric.id,
      route: metric.route,
      rating: metric.rating
    };

    switch (metric.name) {
      case 'CLS':
        clsGauge.set(labels, metric.value);
        break;
      case 'FID':
        fidGauge.set(labels, metric.value);
        break;
      case 'LCP':
        lcpGauge.set(labels, metric.value);
        break;
      case 'FCP':
        fcpGauge.set(labels, metric.value);
        break;
      case 'TTFB':
        ttfbGauge.set(labels, metric.value);
        break;
      default:
        console.warn(`Unknown metric name: ${metric.name}`);
    }
  }

  public static async getMetrics(req: Request, res: Response): Promise<void> {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (ex) {
      res.status(500).end(ex);
    }
  }
}

export default MetricsController;
