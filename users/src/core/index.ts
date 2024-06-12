import express from "express"
import { createServer, Server } from "http"
import bodyParser from "body-parser"
import cors from "cors";
import sequelize from "../providers/db"
import { Sequelize } from "sequelize-typescript";
import MetricsController from '../controllers/metricController';
import routes from "../routes/v1/userRoutes"
import { register } from '../metrics';
import { metricsMiddleware } from '../middlewares/metricsMiddleware';
import morgan from 'morgan';
require('dotenv').config()

export default class App {
    public port: number
    public host: string
    private app: express.Application
    private server: Server
    private sequelize: Sequelize
    

    constructor(port = 8000, host = "localhost") {
        this.port = Number(process.env.PORT) || port
        this.host = process.env.HOST || host
        this.app = this.createApp()
        this.sequelize = sequelize  
        this.server = this.createServer()
    }
    private createApp(): express.Application {
        const app = express()
        app.use(cors());
        app.use(bodyParser.json())
        app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
        app.use(metricsMiddleware)
        app.post('/push-frontend-metric', MetricsController.pushFrontendMetric);
        app.get('/metrics/frontend', MetricsController.getMetrics);
        app.get('/metrics', async (req, res) => {
            res.set('Content-Type', register.contentType);
            res.end(await register.metrics());
        });
        
        app.use('/v1', routes)
        return app
      }
    private createServer(): Server {
        const server = createServer(this.app)
        
        return server
    }
    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}
