<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
    <div class="text-center mb-3">
      <i class="fa-solid fa-key fa-2xl mb-3" style="color: #ff0000;"></i>
      <h4 class="fw-bold">Quên mật khẩu?</h4>
      <p class="text-muted">Nhập email để khôi phục tài khoản</p>
    </div>
    <div class="card shadow-sm p-4 rounded-4 w-100" style="max-width: 400px;">
      <form>
        <div class="mb-3">
          <label for="email" class="form-label">Gmail *</label>
          <input v-model="benh_nhan.email" id="email" type="email" class="form-control" placeholder="Nhập email"
            required />
        </div>
        <div class="d-grid mb-3">
          <button type="button" class="btn btn-danger" @click="GuiMatKhau()">
            <i class="bi bi-send-fill me-2"></i> Gửi yêu cầu đặt lại mật khẩu
          </button>
        </div>
        <div class="text-center">
          <router-link to="/login" class="text-muted small">
            <i class="bx bx-arrow-back me-1"></i> Quay lại đăng nhập
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      benh_nhan: {
        email: "",
      },
    };
  },
  methods: {
    async GuiMatKhau() {
      try {
        const res = await axios.post("http://localhost:4000/forgot-password", {
          email: this.benh_nhan.email,
        });

        if (res.data.status) {
          this.$toast.success(res.data.message || "Vui lòng kiểm tra email!");
        } else {
          this.$toast.error(res.data.message || "Có lỗi xảy ra!");
        }
      } catch (err) {
        this.$toast.error(err.response?.data?.message || "Server error!");
      }
    },
  },
};
</script>

