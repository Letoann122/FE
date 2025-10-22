import axios from "axios";

const baseRequestClient = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 8000,
});

baseRequestClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

baseRequestClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/dang-nhap";
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau!");
      } else {
        toast.error(error.response.data.message || "Có lỗi xảy ra!");
      }
    } else {
      toast.error("Không thể kết nối đến máy chủ!");
    }
    return Promise.reject(error);
  }
);

export default baseRequestClient;
