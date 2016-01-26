import { Router } from "express";

const router = Router();
const apis = [
    "/news",
    "/imgs",
];

apis.forEach((api) =>
{
    router.use(api, require("." + api));
});

export default router;
