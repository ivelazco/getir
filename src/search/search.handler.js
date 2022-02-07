import { getMongoDBDatabase, logger } from '../utils';

const log = logger('search-endpoint');

/**
 * getFilteredRecords function
 * Get from the collection `records` the values that accomplish the match setted.
 * Getting the records that have the ` createdAt` field between the given `startDate and `endDate` and also
 * with a `totalCount` between the given `minCount` and `maxCount`.
 * @date 2022-02-07
 * @param {string} startDate The minimum `createdAt` date to search.
 * @param {string} endDate The maximum `createdAt` date to search.
 * @param {number} minCount The minimum `totalCount` (the sum of counts array) number to search.
 * @param {number} maxCount The maximum `totalCount` (the sum of counts array) number to search.
 * @returns {Array<{key: string, createdAt: string, totalCount: number}>} the results that match with the filters.
 */
async function getFilteredRecords({ startDate, endDate, minCount, maxCount }) {
    const db = await getMongoDBDatabase();
    return db
        .collection('records')
        .aggregate([
            {
                $project: {
                    _id: 0,
                    key: 1,
                    createdAt: 1,
                    totalCount: { $sum: '$counts' },
                },
            },
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                    totalCount: {
                        $gte: minCount,
                        $lte: maxCount,
                    },
                },
            },
        ])
        .toArray();
}

/**
 * searchHandler function
 * Handle the search endpoint, formatting the different responses that the endpoint could have
 * @date 2022-02-07
 * @param {any} {body} Express Request Object
 * @param {any} res Express Response Object
 * @returns {any}
 */
async function searchHandler({ body }, res) {
    // eslint-disable-next-line no-console
    log(`Request params received:`, body);
    try {
        const records = await getFilteredRecords(body);
        const response = { code: 0, msg: 'Success', records };
        log(`Responded with:`, response);
        res.json(response);
    } catch (e) {
        const response = { code: 2, msg: 'Fail', records: [] };
        log(`Failed with:`, e);
        res.json(response);
    }
}

export default searchHandler;
