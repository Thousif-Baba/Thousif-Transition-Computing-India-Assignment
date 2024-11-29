const checklistRules = [
    {
        id: 1,
        name: "Valuation Fee Paid",
        condition: (data) => data.isValuationFeePaid === true,
    },
    {
        id: 2,
        name: "UK Resident",
        condition: (data) => data.isUkResident === true,
    },
    {
        id: 3,
        name: "Risk Rating Medium",
        condition: (data) => data.riskRating === "Medium",
    },
    {
        id: 4,
        name: "LTV Below 60%",
        condition: (data) => {
            const loan = parseFloat(data.mortgage.loanRequired.replace(/[^0-9.-]+/g, ""));
            const purchasePrice = parseFloat(data.mortgage.purchasePrice.replace(/[^0-9.-]+/g, ""));
            return (loan / purchasePrice) * 100 < 60;
        },
    },
];

module.exports = checklistRules;
