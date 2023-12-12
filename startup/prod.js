import helmet from "helmet";
import compression from "compression";

export const production = (app)=>
{
    app.use(helmet());
    app.use(compression());
}