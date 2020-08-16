export function logger(req, res, next) {
    const { method, path } = req;
    console.log(`${method} ${path} 访问时间：${new Date().toLocaleString()}`);
    next();
}