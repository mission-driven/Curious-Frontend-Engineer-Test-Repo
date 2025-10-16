import {
    fetchAvailableAccumulatedQPoint,
    fetchCommunityActivitiesQPoint,
    fetchCommunityActivityPointSource,
} from "./fetch.js";

export const getAvailableAccumulatedQPoint = async () => {
    try {
        const response = await fetchAvailableAccumulatedQPoint();
        if (!response || response.result === "fail") {
            throw new Error("Failed to fetch banner list");
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching element by ID:", error);
        throw error;
    }
};

export const getCommunityActivitiesQPoint = async () => {
    try {
        const response = await fetchCommunityActivitiesQPoint();
        if (!response || response.result === "fail") {
            throw new Error("Failed to fetch banner list");
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching element by ID:", error);
        throw error;
    }
};

export const postCommunityActivityPointSource = async (pointSourceId) => {
    try {
        const response = await fetchCommunityActivityPointSource(pointSourceId);
        if (!response || response.result === "fail") {
            throw new Error("Failed to fetch poinst source for community");
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching element by ID:", error);
        throw error;
    }
};
