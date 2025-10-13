<template>
  <div class="container py-5">
    <h4 class="fw-bold mb-2 ms-3">Đặt lịch hiến máu</h4>
    <p class="text-muted ms-3">
      Đăng ký lịch hẹn tại các điểm hiến máu gần bạn
    </p>
    <div class="row g-4">
      <!-- Form đăng ký -->
      <div class="col-lg-6">
        <div class="card bg-white shadow p-4 rounded-4">
          <h5 class="fw-bold">Thông tin đặt lịch</h5>
          <p class="text-muted">Vui lòng điền đầy đủ thông tin</p>

          <form @submit.prevent="handleRegister">
            <!-- Thông tin cá nhân -->
            <h6 class="fw-bold text-danger mt-4 mb-2">
              <i class="bi bi-person-fill"></i> Thông tin cá nhân
            </h6>
            <div class="row g-3">
              <label class="form-label mb-1">Họ và tên *</label>
              <input
                type="text"
                class="form-control mt-0 mb-3"
                placeholder="Nguyễn Văn A"
                v-model="form.fullName"
                required
              />
            </div>

            <div class="row g-3">
              <label class="form-label mb-1">Nhóm máu *</label>
              <select
                class="form-select mt-0"
                v-model="form.bloodGroup"
                required
              >
                <option value="">Chọn nhóm máu</option>
                <option>A</option>
                <option>B</option>
                <option>AB</option>
                <option>O</option>
              </select>
            </div>

            <div class="row g-3 mt-1">
              <label class="form-label">Địa điểm hiến máu *</label>
              <select
                class="form-select mt-0"
                v-model="form.bloodGroup"
                required
              >
                <option value="">Chọn địa điểm</option>
                <option>Bệnh viện Bạch Mai</option>
                <option>Bệnh viện Việt Đức</option>
                <option>Bệnh viện Hoàn mỹ</option>
              </select>
            </div>

            <div class="row g-3 mt-1">
              <div class="col-md-6">
                <label class="form-label">Ngày hiến *</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="form.dob"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Khung giờ *</label>
                <select class="form-select" v-model="form.bloodGroup" required>
                  <option value="">Chọn khung giờ</option>
                  <option>7:00 - 11:00</option>
                  <option>13:00 - 17:00</option>
                </select>
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label class="form-label">Ghi chú</label>
              <textarea
                class="form-control"
                rows="2"
                v-model="form.medicalHistory"
                placeholder="Tình trạng sức khỏe, thuốc đang sử dụng..."
              ></textarea>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-content-between mt-4">
              <button type="submit" class="btn btn-danger px-4">
                <i class="bi bi-check-lg"></i>
                Xác nhận đặt lịch
              </button>
              <button type="reset" class="btn btn-secondary px-4">Hủy</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Giới thiệu bên phải -->
      <div class="col-lg-6">
        <div class="bg-white shadow p-4 rounded-4">
          <h5 class="fw-bold">Địa điểm hiến máu gần bạn</h5>
          <p class="text-muted">Chọn địa điểm phù hợp</p>
          <img
            src="../../../assets/img/bando1.jpg"
            class="img-fluid mb-4"
            alt="Donate"
            style="max-width: 580px"
          />

          <h6 class="fw-bold mb-3">Danh sách điểm hiến máu</h6>

          <div
            v-for="(hospital, index) in hospitals"
            :key="index"
            class="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-2 bg-white"
          >
            <div class="d-flex align-items-center">
              <i class="bi bi-hospital fs-4 text-danger me-3"></i>
              <div>
                <p class="fw-semibold mb-1">{{ hospital.name }}</p>
                <small class="text-secondary">{{ hospital.distance }}</small>
              </div>
            </div>

            <span
              class="badge rounded-pill px-3 py-2"
              :class="
                hospital.status === 'Còn slot'
                  ? 'bg-success-subtle text-success'
                  : 'bg-warning-subtle text-warning'
              "
            >
              {{ hospital.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  fullName: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "",
  role: "Người hiến máu",
  medicalHistory: "",
  password: "",
  confirmPassword: "",
});

function handleRegister() {
  if (form.password !== form.confirmPassword) {
    alert("Mật khẩu không khớp!");
    return;
  }
  alert(`Chào mừng ${form.fullName}, bạn đã đăng ký thành công!`);
}

const hospitals = ref([
  {
    name: "Bệnh viện Bạch Mai",
    distance: "2.5km từ vị trí của bạn",
    status: "Còn slot",
  },
  {
    name: "Bệnh viện Việt Đức",
    distance: "3.1km từ vị trí của bạn",
    status: "Gần đầy",
  },
]);
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
