import { ServiceType } from "./types";

const isBlurayPackageApplicable = (services: ServiceType[]): boolean => services.includes("VideoRecording");

const isTwoDayApplicable = (services: ServiceType[]): boolean => services.some(service => ["Photography", "VideoRecording"].includes(service));

export const isServiceApplicable = (service: ServiceType, services: ServiceType[]): boolean => {
    return (
        (service !== "BlurayPackage" || isBlurayPackageApplicable(services)) &&
        (service !== "TwoDayEvent" || isTwoDayApplicable(services))
    );
}

export const pick = (obj: Object, props: string[]): Object => obj && props.reduce((prev, cur) =>
    obj[cur] === undefined ? prev : {...prev, [cur]: obj[cur]}, {}
);
