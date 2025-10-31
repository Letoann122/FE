<template>
  <div class="container-fluid bg-light py-4">
    <div class="row justify-content-center">
      <div class="col-md-3 col-lg-2">
        <div class="card border-0 shadow-sm" style="height: 560px">
          <div class="list-group list-group-flush">
            <router-link
              to="/profile"
              class="list-group-item list-group-item-action border-0"
              active-class="active text-danger fw-bold"
            >
              <i class="bi bi-person-fill me-2"></i> Hồ sơ cá nhân
            </router-link>

            <router-link
              to="/blood-donation-history"
              class="list-group-item list-group-item-action border-0"
              active-class="active text-danger fw-bold"
            >
              <i class="bi bi-arrow-counterclockwise me-2"></i> Lịch sử hiến máu
            </router-link>

            <router-link
              to="/account-security"
              class="list-group-item list-group-item-action border-0"
              active-class="active text-danger fw-bold"
            >
              <i class="bi bi-shield-shaded me-2"></i> Bảo mật tài khoản
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-md-9 col-lg-9">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <div class="mb-4">
              <i class="bi bi-person-fill fs-3 text-danger"></i>
              <span class="fs-5 fw-bold ms-2">Hồ sơ cá nhân</span>
              <p class="text-muted mb-0">Cập nhật thông tin cá nhân của bạn</p>
            </div>

            <div class="row align-items-center">
              <div class="col-md-4 text-center mb-3">
                <div class="position-relative d-inline-block">
                  <img
                    src="../../../assets/img/hienmau.png"
                    alt="avatar"
                    class="rounded-circle border"
                    style="width: 150px; height: 150px; object-fit: cover"
                  />
                  <button
                    class="btn btn-danger btn-sm rounded-circle position-absolute bottom-0 end-0"
                    style="transform: translate(25%, 25%)"
                  >
                    <i class="bi bi-camera-fill"></i>
                  </button>
                </div>
                <div>
                  <button
                    class="btn btn-outline-secondary bg-light mt-3"
                    @click="triggerFileUpload"
                  >
                    <i class="bi bi-upload me-0"></i> Đổi ảnh đại diện
                  </button>

                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileChange"
                    style="display: none"
                  />
                </div>
              </div>

              <!-- Form -->
              <div class="col-md-8">
                <form @submit.prevent="saveChanges">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Họ và tên *</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Ngày sinh *</label>
                      <input type="date" class="form-control" required />
                    </div>
                    <div class="col-md-12">
                      <label class="form-label">Địa chỉ</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="123 Đường ABC, Phường XYZ, Quận 1, TPHCM"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Nhóm máu *</label>
                      <select class="form-select" required>
                        <option value="">Chọn nhóm máu</option>
                        <option>A</option>
                        <option>B</option>
                        <option>AB</option>
                        <option>O</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Số điện thoại *</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="0912345678"
                        required
                      />
                    </div>
                    <div class="col-md-12">
                      <label class="form-label">Tiền sử y tế</label>
                      <textarea
                        class="form-control"
                        placeholder="Không có tiền sử bệnh lý đặc biệt"
                        rows="3"
                      ></textarea>
                    </div>

                    <div class="col-md-12 text-end mt-3">
                      <button class="btn btn-danger me-2">
                        <i class="bi bi-save-fill me-1"></i> Lưu thay đổi
                      </button>
                      <button class="btn btn-outline-secondary">
                        <i class="bi bi-x-circle me-1"></i> Hủy
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import baseRequestClient from "../../../core/baseRequestClient";

export default {
  name: "ProfileClient",
  data() {
    return {
      profile: {
        full_name: "",
        birthday: "",
        gender: "",
        phone: "",
        address: "",
        blood_group: "",
        medical_history: "",
      },
    };
  },
  mounted() {
    this.loadProfile();
  },
  methods: {
    // Lấy thông tin hồ sơ người dùng
    async loadProfile() {
      try {
        const res = await baseRequestClient.get("/profile");
        if (res.data.status) {
          this.profile = res.data.data;
        } else {
          this.$toast.error(res.data.message || "Không thể tải hồ sơ!");
        }
      } catch (err) {
        this.$toast.error("Không thể tải thông tin hồ sơ!");
      }
    },

    // Cập nhật hồ sơ người dùng
    async updateProfile() {
      try {
        if (!this.profile.full_name || !this.profile.birthday || !this.profile.phone) {
          this.$toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
          return;
        }

        // ✅ Đúng route BE
        const res = await baseRequestClient.put("/profile", this.profile);

        if (res.data.status) {
          this.$toast.success(res.data.message || "Cập nhật hồ sơ thành công!");
          this.loadProfile();
        } else {
          this.$toast.error(res.data.message || "Không thể cập nhật hồ sơ!");
        }
      } catch (err) {
        if (err.response?.data?.errors) {
          const errors = err.response.data.errors;
          Object.values(errors).forEach((msg) => this.$toast.error(msg));
        } else {
          this.$toast.error(err.response?.data?.message || "Lỗi khi cập nhật hồ sơ!");
        }
      }

    },
  },
};
</script>


<style scoped>
.list-group-item.active {
  background-color: #ffecec !important;
  color: #dc3545 !important;
}
.card {
  border-radius: 10px;
}
.btn {
  border-radius: 8px;
}
</style>


