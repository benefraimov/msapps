const express = require("express");
const { importImages } = require("../BussinessLogic/ItemsBL");
const router = express.Router();

let currentPage = 1; // Set initial page to 1

// Endpoint to return array of pictures with pagination
router.get("/:category", async (req, res) => {
    try {
        // get the category parameter
        const category = req.params.category;
        // every time there is anew category selecting we reset the current page to the first one
        currentPage = 1;

        const response = await importImages(category);
        if (response.success) {
            const limit = 9; // Number of pictures per page
            const startIndex = (currentPage - 1) * limit;
            const endIndex = currentPage * limit;

            // Slice the pictures array based on the startIndex and endIndex
            const paginatedPictures = response.data.slice(startIndex, endIndex);

            res.send({
                success: true,
                data: paginatedPictures,
            });
        } else {
            throw new Error("Problem In Fetching Data");
        }
    } catch (error) {
        res.send({
            success: false,
            data: error,
        });
    }
});

// Endpoint to handle previous button click
router.get("/prev/:category", async (req, res) => {
    try {
        // get the category parameter
        const category = req.params.category;
        // save the response to check it
        const response = await importImages(category);

        // check whether the response is successfully
        if (response.success) {
            if (currentPage > 1) {
                currentPage -= 1;
            }

            const limit = 9; // Number of pictures per page
            const startIndex = (currentPage - 1) * limit;
            const endIndex = currentPage * limit;

            // Slice the pictures array based on the startIndex and endIndex
            const paginatedPictures = response.data.slice(startIndex, endIndex);

            res.send({
                success: true,
                data: paginatedPictures,
            });
        } else {
            throw new Error("Problem In Fetching Data");
        }
    } catch (error) {
        res.send({
            success: false,
            data: error,
        });
    }
});

// Endpoint to handle next button click
router.get("/next/:category", async (req, res) => {
    try {
        // get the category parameter
        const category = req.params.category;
        // save the response to check it
        const response = await importImages(category);

        // check whether the response is successfully
        if (response.success) {
            // use Math.ceil to round up the result to get the last page number and compare it to the current page
            // that way we would know if we can show more items
            const lastPage = Math.ceil(response.data.length / 9);
            // condition compare
            if (currentPage < lastPage) {
                currentPage += 1;
            }

            const limit = 9; // Number of pictures per page
            // setting the start and the end indexes
            const startIndex = (currentPage - 1) * limit;
            const endIndex = currentPage * limit;

            // Slice the pictures array based on the startIndex and endIndex
            const paginatedPictures = response.data.slice(startIndex, endIndex);

            // sending the final result with a success: true result
            res.send({
                success: true,
                data: paginatedPictures,
            });
        } else {
            // if there was a problem with we announcing on it
            throw new Error("Problem In Fetching Data");
        }
    } catch (error) {
        res.send({
            success: false,
            data: error,
        });
    }
});

module.exports = router;
