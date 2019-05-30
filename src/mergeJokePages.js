const getJoke = require('./getJoke');

const mergeJokePages = (searchQuery, data = []) => getJoke(searchQuery)
    .then(({ current_page: currentPage, total_pages: totalPages, results }) => {
        const mergedData = [...data, ...results];

        if (currentPage >= totalPages) {
            if (mergedData.length === 0) {
                throw new Error('No jokes were found for that search term.');
            }

            return mergedData;
        }

        return mergeJokePages({
            ...searchQuery,
            page: currentPage + 1
        }, mergedData);
    });

module.exports = mergeJokePages;
