import { getMongoDBDatabase, logger } from '../utils';

const log = logger('search-endpoint');

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
