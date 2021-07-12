module.exports = {
    serverError(res, error) {
        console.log(error);
        res.status(500).json({
            massage: 'server error is occured'
        });
    },
    resourceError(res, massage) {
        res.status(400).json({
            massage
        });
    }
};