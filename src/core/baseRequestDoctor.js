import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toast = createToaster();

const baseRequestDoctor = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 8000,
});

// ==================== TOKEN CHUẨN CHO DOCTOR ====================
baseRequestDoctor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_doctor");   // 👈 đúng
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== HANDLE ERROR ====================
baseRequestDoctor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.VITE_SKIP_TOKEN === "true") {
      console.log("⚙ DEV MODE: Bỏ qua lỗi token (doctor)");
      return Promise.resolve({ data: { status: true, data: [] } });
    }

    if (error.response) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        toast.error("Phiên đăng nhập bác sĩ đã hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("token_doctor");
        localStorage.removeItem("user_doctor");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ, vui lòng thử lại!");
      } else if (error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Có lỗi xảy ra!");
      }
    } else {
      toast.error("Không thể kết nối đến máy chủ!");
    }

    return Promise.reject(error);
  }
);

export default baseRequestDoctor;
