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

export interface Announcement {
  announcementText: string;
  announcementColor: string;
}
export interface AnnouncementProps {
  announcementValue: Announcement[];
}

export interface Footer {
  footerBackgroundColor: string;
}

export interface FooterProps {
  footerValue: Footer[];
}

export interface HeroBanner {
  heroHeading: string;
  heroSubHeading: string;
  heroButtonText: string;
  heroButtonColor: string;
}

export interface HeroBannerProps {
  heroValues: HeroBanner[];
}

// TREATMENTS
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

// DESIGN REQUESTS

// ANNOUNCEMENT REQUESTS

export const fetchAnnouncement = async () => {
  try {
    const response = await axios.get<AnnouncementProps>(
      "/api/auth/admin-dashboard/announcement"
    );
    return response.data.announcementValue[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateAnnouncement = async (data: Announcement) => {
  try {
    return await axios.patch("/api/auth/admin-dashboard/announcement", data);
  } catch (error) {
    console.log(error);
  }
};

// FOOTER REQUESTS

export const fetchFooter = async () => {
  try {
    const response = await axios.get<FooterProps>(
      "/api/auth/admin-dashboard/footer"
    );
    return response.data.footerValue[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateFooter = async (data: Footer) => {
  try {
    return await axios.patch("/api/auth/admin-dashboard/footer", data);
  } catch (error) {
    console.log(error);
  }
};

// HERO VALUES

export const fetchHeroBanner = async () => {
  try {
    const response = await axios.get<HeroBannerProps>(
      "/api/auth/admin-dashboard/hero-banner"
    );
    return response.data.heroValues[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateHeroBanner = async (data: HeroBanner) => {
  try {
    return await axios.patch("/api/auth/admin-dashboard/hero-banner", data);
  } catch (error) {
    console.log(error);
  }
};
