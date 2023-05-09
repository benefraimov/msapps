const axios = require("axios");

const importImages = async (category) => {
    // we use try and catch to handle the errors, that way we keep the system alive
    try {
        // fetching items by category
        const { data } = await axios.get(
            `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
        );

        // mapping the needed data, using a high order function (map)
        const mappedData = data.hits.map((item) => {
            return {
                id: item.id,
                likes: item.likes,
                views: item.views,
                downloads: item.downloads,
                collections: item.collections,
                url: item.largeImageURL,
            };
        });

        // returning an object with success set to true 
        return {
            success: true,
            data: mappedData,
        };
    } catch (error) {
        return {
            success: false,
            message: error,
            data: "No Data",
        };
    }
};

module.exports = {
    importImages,
};
