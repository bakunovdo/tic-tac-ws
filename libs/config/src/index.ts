export const __IS_PROD__ = process.env["NODE_ENV"] === "production";
export const __IS_DEV__ = !__IS_PROD__;
