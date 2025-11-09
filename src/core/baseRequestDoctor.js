import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toast = createToaster();

const baseRequestHospital = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 8000,
});

// 🧩 Gắn token vào mọi request
baseRequestHospital.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_doctor");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚙️ Xử lý lỗi trả về từ BE
baseRequestHospital.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ DEV MODE: bỏ qua thông báo token lỗi
    if (import.meta.env.VITE_SKIP_TOKEN === "true") {
      console.log("⚙️ DEV MODE: Bỏ qua lỗi token (hospital)");
      return Promise.resolve({ data: { status: true, data: [] } });
    }

    if (error.response) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        toast.error("Phiên đăng nhập bệnh viện đã hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("token_doctor");
        localStorage.removeItem("user_doctor");

        setTimeout(() => {
          window.location.href = "/dang-nhap";
        }, 1500);
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau!");
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

export default baseRequestHospital;
