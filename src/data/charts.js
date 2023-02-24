
const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

const filterDate = [
    {
        label: "Today",
        value: "today",
    },
    {
        label: "Week",
        value: "week",
    },
    {
        label: "Month",
        value: "month",
    },
    {
        label: "Custom Date",
        value: "custom",
    }
];

const typeFilter = {
    today: "today",
    week: "week",
    month: "month",
    custom: "custom"
}

export {
    filterDate,
    totalOrders,
    typeFilter
};

