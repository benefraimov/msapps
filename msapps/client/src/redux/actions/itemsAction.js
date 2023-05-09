import { IMPORT_ITEMS, IMPORT_ITEMS_FAIL } from "../constants/ItemsConstants";
import axios from "axios";

export const importItems = (category) => async (dispacth) => {
    try {
        // fetching the first items with the category set from the state
        const { data } = await axios.get(
            `http://localhost:4000/api/pictures/${category}`
        );
        // check whether the action is success or not
        if (data.success) {
            // If success is true dispacth the items to the store
            dispacth({
                type: IMPORT_ITEMS,
                payload: data.data,
            });
        } else {
            // If success is false dispacth the error to the store
            dispacth({
                type: IMPORT_ITEMS_FAIL,
                payload: data.message,
            });
        }
    } catch (error) {
        dispacth({
            type: IMPORT_ITEMS_FAIL,
            payload: "Problem with fetching data",
        });
    }
};

export const importNextItems = (category) => async (dispacth) => {
    try {
        // fetching next items
        const { data } = await axios.get(
            `http://localhost:4000/api/pictures/next/${category}`
        );
        // check whether the action is success or not
        if (data.success) {
            // If success is true dispacth the items to the store
            dispacth({
                type: IMPORT_ITEMS,
                payload: data.data,
            });
        } else {
            // If success is false dispacth the error to the store
            dispacth({
                type: IMPORT_ITEMS_FAIL,
                payload: data.message,
            });
        }
    } catch (error) {
        dispacth({
            type: IMPORT_ITEMS_FAIL,
            payload: "Problem with fetching data",
        });
    }
};

export const importPrevItems = (category) => async (dispacth) => {
    try {
        // fetching next items
        const { data } = await axios.get(
            `http://localhost:4000/api/pictures/prev/${category}`
        );
        // check whether the action is success or not
        if (data.success) {
            // If success is true dispacth the items to the store
            dispacth({
                type: IMPORT_ITEMS,
                payload: data.data,
            });
        } else {
            // If success is false dispacth the error to the store
            dispacth({
                type: IMPORT_ITEMS_FAIL,
                payload: data.message,
            });
        }
    } catch (error) {
        dispacth({
            type: IMPORT_ITEMS_FAIL,
            payload: "Problem with fetching data",
        });
    }
};
