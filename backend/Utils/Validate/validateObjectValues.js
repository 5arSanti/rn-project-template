const validateObjectValues = (values, message = "No pueden haber campos vacios", allowedNullFields = [],) => {
    try {
        const arrayValues = Object.entries(values);
        const filterConditions = arrayValues.some(([key, value]) => {
            return (value === null || value === "") && !allowedNullFields.includes(key);
        });

        if (filterConditions) {
            throw new Error(message);
        }
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { validateObjectValues };