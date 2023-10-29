import axios from "axios";

export interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  ratingsQuantity?: number;
  imageCover?: string;
  images?: string[];
}

export interface AllTreatmentsProps {
  product: Product[];
}

export interface SingleTreatmentProps {
  product: Product;
}

// GET REQUESTS

export const fetchAllTreatments = async () => {
  try {
    const response = await axios.get<AllTreatmentsProps>("/api/treatments/");
    return response.data.product;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTreatmentById = async (id: string) => {
  try {
    const response = await axios.get<SingleTreatmentProps>(
      `/api/treatments/${id}`
    );
    return response.data.product;
  } catch (error) {
    console.log(error);
  }
};

// POST REQUESTS

export const addTreatment = async (treatmentData: Product) => {
  try {
    const response = await axios.post("/api/treatments/", treatmentData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// PATCH REQUESTS

export const updateTreatment = async (id: string, treatmentData: Product) => {
  try {
    return await axios.patch(`/api/treatments/${id}`, treatmentData);
  } catch (error) {
    console.log(error);
  }
};

// DELETE REQUESTS

export const deleteTreatment = async (id: string) => {
  try {
    const response = await axios.delete(`/api/treatments/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
