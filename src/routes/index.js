import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import priceRouter from "./price";
import acreageRouter from "./acreage";
import provinceRouter from "./province";
import userRouter from "./user";
const initRoutes = (app) => {
  app.use("/auth", authRouter);
  app.use("/insert", insertRouter);
  app.use("/category", categoryRouter);
  app.use("/post", postRouter);
  app.use("/price", priceRouter);
  app.use("/acreage", acreageRouter);
  app.use("/province", provinceRouter);
  app.use("/user", userRouter);
  return app.use("/", (req, res) => {
    res.send("server on ...");
  });
};
export default initRoutes;
