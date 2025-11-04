import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default function (to, from, next) {
  const token = localStorage.getItem("token_bac_si");

  if (!token) {
    toaster.error("Vui lòng đăng nhập tài khoản bác sĩ!");
    return next("/bac-si/login");
  }

  axios
    .get("http://127.0.0.1:8000/api/bac-si/check-token", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("ho_ten_bac_si", res.data.ho_ten);
        localStorage.setItem("email_bac_si", res.data.email);
        localStorage.setItem("tinh_trang_bac_si", res.data.tinh_trang);
        next();
      } else {
        toaster.error(res.data.message || "Phiên đăng nhập hết hạn!");
        next("/dang-nhap");
      }
    })
    .catch(() => {
      toaster.error("Không thể xác thực tài khoản bác sĩ!");
      next("/dang-nhap");
    });
}