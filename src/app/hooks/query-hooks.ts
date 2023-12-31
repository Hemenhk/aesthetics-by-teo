"use client";

import {
  Product,
  addTreatment,
  deleteTreatment,
  fetchAllTreatments,
  fetchTreatmentById,
} from "@/axios-instances/axios-instances";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useAllTreatments = () => {
  return useQuery({
    queryKey: ["treatments"],
    queryFn: fetchAllTreatments,
  });
};

const useTreatmentById = (id: string) => {
  return useQuery({
    queryKey: ["treatments", id],
    queryFn: () => fetchTreatmentById(id),
  });
};

const useCreateTreatment = (data: Product) => {
  return useMutation({
    mutationFn: () => addTreatment(data),
  });
};

const useDeleteTreatment = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["treatments", id],
    mutationFn: () => deleteTreatment(id),
    onSuccess: queryClient.invalidateQueries,
  });
};

export {
  useAllTreatments,
  useTreatmentById,
  useCreateTreatment,
  useDeleteTreatment,
};
