import { ServiceType, ServiceYear } from "./types";

export const DISCOUNTS: Record<ServiceYear, Partial<Record<ServiceType, Partial<Record<ServiceType, number>>>>> = {
  2020: {
      VideoRecording: {
          Photography: 1200,
      },
      WeddingSession: {
          Photography: 300,
          VideoRecording: 300,
      }
  },
  2021: {
      VideoRecording: {
          Photography: 1300,
      },
      WeddingSession: {
          Photography: 300,
          VideoRecording: 300,
      }
  },
  2022: {
      VideoRecording: {
          Photography: 1300,
      },
      WeddingSession: {
          Photography: 600,
          VideoRecording: 300,
      }
  },
};
