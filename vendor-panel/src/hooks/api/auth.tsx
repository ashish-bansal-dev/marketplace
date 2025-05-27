import { FetchError } from "@medusajs/js-sdk";
import { HttpTypes } from "@medusajs/types";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { sdk } from "../../lib/client";

export const useSignInWithEmailPass = (
  options?: UseMutationOptions<
    | string
    | {
        location: string;
      },
    FetchError,
    HttpTypes.AdminSignUpWithEmailPassword
  >
) => {
  return useMutation({
    mutationFn: (payload) => sdk.auth.login("seller", "emailpass", payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useSignUpWithEmailPass = (
  options?: UseMutationOptions<
    string,
    FetchError,
    HttpTypes.AdminSignInWithEmailPassword & {
      confirmPassword: string;
      name: string;
      phone: string;
      type: "manufacturer" | "reseller";
    }
  >
) => {
  return useMutation({
    mutationFn: (payload) => sdk.auth.register("seller", "emailpass", payload),
    onSuccess: async (_, variables) => {
      const sellerPayload = {
        name: variables.name,
        phone: variables.phone,
        type: variables.type,
        email: variables.email,
        member: {
          name: variables.name,
          email: variables.email,
        },
      };
      await sdk.client.fetch("/vendor/sellers", {
        method: "POST",
        body: sellerPayload,
      });
    },
    ...options,
  });
};

export const useResetPasswordForEmailPass = (
  options?: UseMutationOptions<void, FetchError, { email: string }>
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.auth.resetPassword("user", "emailpass", {
        identifier: payload.email,
      }),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, FetchError>) => {
  return useMutation({
    mutationFn: () => sdk.auth.logout(),
    ...options,
  });
};

export const useUpdateProviderForEmailPass = (
  token: string,
  options?: UseMutationOptions<void, FetchError, HttpTypes.AdminUpdateProvider>
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.auth.updateProvider("user", "emailpass", payload, token),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
