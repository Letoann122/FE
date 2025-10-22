<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-3 shadow-sm border">
        <div class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center"
          style="width: 200px; height: 30px; background-color: antiquewhite">
          <i class="bi bi-person-fill text-danger"></i>
          <p class="ms-2 d-inline text-danger">Hồ sơ cá nhân</p>
        </div>
        <div class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center" style="width: 200px; height: 30px">
          <i class="bi bi-arrow-counterclockwise"></i>
          <p class="ms-2 d-inline">Lịch sử hiến máu</p>
        </div>
        <div class="mt-3 m-3 shadow-sm d-flex align-items-center justify-content-center" style="width: 200px; height: 30px">
          <i class="bi bi-shield-shaded"></i>
          <p class="ms-2 d-inline">Bảo mật tài khoản</p>
        </div>
      </div>

      <div class="col-md-9 shadow-sm border">
        <div class="ms-4">
          <i class="bi bi-person-fill fs-3 fw-bold text-danger"></i>
          <h5 class="d-inline ms-3">Hồ sơ cá nhân</h5>
          <p>Cập nhật hồ sơ cá nhân của bạn</p>
        </div>

        <div class="row">
          <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
            <img class="rounded-circle mb-3" src="../../../assets/img/hienmau.png"
              alt="avata" style="height: 200px; width: 200px" />
          </div>
          <div class="col-md-8">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Họ và tên *</label>
                <input v-model="profile.full_name" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Ngày sinh *</label>
                <input v-model="profile.birthday" type="date" class="form-control" />
              </div>
              <div class="col-md-12">
                <label class="form-label">Địa chỉ</label>
                <input v-model="profile.address" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Nhóm máu *</label>
                <select v-model="profile.blood_group" class="form-select">
                  <option value="">Chọn nhóm máu</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Số điện thoại *</label>
                <input v-model="profile.phone" type="text" class="form-control" />
              </div>
              <div class="col-md-12">
                <label class="form-label">Tiền sử y tế</label>
                <textarea v-model="profile.medical_history" rows="4" class="form-control"></textarea>
              </div>

              <div class="col-md-12">
                <button @click="updateProfile" class="btn btn-danger me-2">
                  <i class="bi bi-save-fill"></i> Lưu thay đổi
                </button>
                <button @click="loadProfile" class="btn btn-secondary">
                  <i class="bi bi-tools"></i> Hủy
                </button>
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


