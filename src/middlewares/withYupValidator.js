const withYupValidator = (resourceSchema) => async (req, res, next) => {
    const resource = { ...req.body, ...req.params, ...req.query };
    try {
        // throws an error if not valid
        await resourceSchema.validate(resource);
        next();
    } catch (e) {
        res.status(400).json({ error: e.errors.join(', ') });
    }
};

export default withYupValidator;
