import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default function (to, from, next) {
  const token = localStorage.getItem("token_admin");

  if (!token) {
    toaster.error("Vui lòng đăng nhập tài khoản quản trị!");
    return next("/dang-nhap");
  }

  axios
    .get("http://localhost:4000/api/admin/check-token", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("ho_ten_admin", res.data.ho_ten);
        next();
      } else {
        toaster.error(res.data.message || "Phiên đăng nhập hết hạn!");
        next("/dang-nhap");
      }
    })
    .catch(() => {
      toaster.error("Không thể xác thực Admin. Vui lòng đăng nhập lại!");
      next("/dang-nhap");
    });
}
