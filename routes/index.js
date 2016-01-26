import { Router } from "express";

const router = Router();

// 下级 API 优先路由。
const apis = [
    "/api/4",
];

apis.forEach((api) =>
{
    router.use(api, require("." + api));
});

// home page.
router.get("/", (req, res, next) =>
{
    res.render("index", { map: req.app.locals.map });
});

// api error handler.
router.use((err, req, res, next) =>
{
    res.status(404).send({
        status: 404,
        message: err.message
    });
});

export default router;
