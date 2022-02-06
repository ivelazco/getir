import { date, number, object } from 'yup';

// Schema validator for the search endpoint
export const searchSchema = object({
    startDate: date().required(),
    endDate: date().required(),
    minCount: number().min(0).required(),
    maxCount: number().min(0).required(),
});

export default searchSchema;
