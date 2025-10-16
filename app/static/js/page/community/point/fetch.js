export const fetchAvailableAccumulatedQPoint = async () => {
    const response = await fetch(`/api/v1/users/me/point/available`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (data.result === "fail" && data.result_code === "D0000") {
        throw new Error("NOT FOUND");
    }
    return data;
};

export const fetchCommunityActivitiesQPoint = async () => {
    const response = await fetch(`/api/v1/point/communities/activities`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    if (data.result === "fail" && data.result_code === "D0000") {
        throw new Error("NOT FOUND");
    }
    return data;
};

export const fetchCommunityActivityPointSource = async (pointSourceId) => {
    const response = await fetch(
        `/api/v1/point/communities/activities/${pointSourceId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    if (data.result === "fail" && data.result_code === "D0000") {
        throw new Error("NOT FOUND");
    }
    return data;
};
