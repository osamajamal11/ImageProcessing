const validateImageQuery = (req, res, next) => {
    const { filename, width, height } = req.query;
    if (!filename) {
        res.status(400).send('Missing required query parameter: filename');
        return;
    }
    if (width && (isNaN(Number(width)) || Number(width) <= 0)) {
        res.status(400).send('Width must be a positive number');
        return;
    }
    if (height && (isNaN(Number(height)) || Number(height) <= 0)) {
        res.status(400).send('Height must be a positive number');
        return;
    }
    next();
};
export default validateImageQuery;
