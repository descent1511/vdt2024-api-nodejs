import express from "express"
import userRoutes from "./userRoutes"
import authRoutes from "./authRoute"
const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/', authRoutes)
export default router