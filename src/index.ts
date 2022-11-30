import { DISCOUNTS } from "./discounts";
import { PRICES } from "./prices";
import { ServiceType, ServiceYear } from "./types";
import { isServiceApplicable, pick } from "./utils";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
    switch (action.type) {
        case "Select":
            if (previouslySelectedServices.includes(action.service) || !isServiceApplicable(action.service, previouslySelectedServices)) {
                return previouslySelectedServices;
            }
            return [...previouslySelectedServices, action.service];
        case "Deselect":
            const newServices = previouslySelectedServices.filter(service => service !== action.service);
            return newServices.filter(service => isServiceApplicable(service, newServices));
        default:
            return previouslySelectedServices;
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    if (!selectedServices?.length ) {
        return { basePrice: 0, finalPrice: 0 };
    }
    const currentPrices = selectedYear && PRICES[selectedYear];
    if (!currentPrices) {
        return { basePrice: 0, finalPrice: 0 };
    }
    const basePrice = selectedServices.map(service => currentPrices[service]).reduce((prev, cur) => prev + cur, 0);
    const currentDiscounts = DISCOUNTS[selectedYear];
    const discount = currentDiscounts && selectedServices
        .map(service => {
            const applicableDiscounts = pick(currentDiscounts[service], selectedServices);
            return applicableDiscounts ? Math.max(0, ...Object.values(applicableDiscounts)) : 0;
        })
        .reduce((prev, cur) => prev + cur, 0);
    return { basePrice, finalPrice: basePrice - discount };
};