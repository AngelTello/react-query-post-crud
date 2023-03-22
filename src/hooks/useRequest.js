// Source: https://stackoverflow.com/questions/74037760/react-query-custom-hook-how-to-use-usemutation-and-usequery-conditionaly

import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
const baseUrl = "http://localhost:3001/posts";

export const useRequest = ({
  path = "",
  params = {},
  body = {},
  key = "",
  options = {},
  method = "get",
  mutation = false,
}) => {
  // async function for get API:
  const callApi = async () => {
    const {
      data: { response },
    } = await axios[method](baseUrl._serviceUrl + path, {
      params,
      ...body,
    });

    return response;
  };

  const callMutationApi = async (data) => {
    const { params, body } = data;
    const {
      data: { response },
    } = await axios.post(baseUrl._serviceUrl + path, {
      params,
      ...body,
    });

    return response;
  };

  // Instead of returning here, just save the result in a variable
  const useMutationResult = useMutation(callMutationApi, options);

  const query = useQuery(key, callApi, {
    refetchOnWindowFocus: false,
    enabled: !mutation && options?.enabled,
    ...options,
  });

  // If mutation is defined, return that result
  if (mutation) {
    return useMutationResult;
  }

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== "idle",
  };
};
