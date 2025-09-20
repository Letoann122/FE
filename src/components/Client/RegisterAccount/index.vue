<template>
  <div class="container py-5">
    <div class="row g-4">
      
      <!-- Form đăng ký -->
      <div class="col-lg-6">
        <div class="card bg-white shadow p-4 rounded-4">
          <h4 class="fw-bold mb-2">Đăng ký tài khoản</h4>
          <p class="text-muted">Tham gia cộng đồng hiến máu cứu người</p>

          <form @submit.prevent="handleRegister">
            
            <!-- Thông tin cá nhân -->
            <h6 class="fw-bold text-danger mt-4 mb-2">
              <i class="bi bi-person-fill"></i> Thông tin cá nhân
            </h6>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Họ và tên *</label>
                <input type="text" class="form-control" placeholder="Nhập họ và tên" v-model="form.fullName" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Ngày sinh *</label>
                <input type="date" class="form-control" v-model="form.dob" required />
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label class="form-label">Giới tính *</label><br />
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" value="Nam" v-model="form.gender" />
                <label class="form-check-label">Nam</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" value="Nữ" v-model="form.gender" />
                <label class="form-check-label">Nữ</label>
              </div>
            </div>

            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Số điện thoại *</label>
                <input type="text" class="form-control" placeholder="0123456789" v-model="form.phone" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Email *</label>
                <input type="email" class="form-control" placeholder="abc@gmail.com" v-model="form.email" required />
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control" placeholder="Nhập địa chỉ của bạn" v-model="form.address" />
            </div>

            <!-- Thông tin y tế -->
            <h6 class="fw-bold text-danger mt-4 mb-2">
              <i class="bi bi-heart-fill"></i> Thông tin y tế
            </h6>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Nhóm máu *</label>
                <select class="form-select" v-model="form.bloodGroup" required>
                  <option value="">Chọn nhóm máu</option>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>O</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Vai trò *</label>
                <select class="form-select" v-model="form.role" required>
                  <option value="Người hiến máu">Người hiến máu</option>
                  <option value="Tình nguyện viên">Tình nguyện viên</option>
                </select>
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label class="form-label">Tiền sử bệnh lý</label>
              <textarea class="form-control" rows="2" v-model="form.medicalHistory" placeholder="Mô tả tiền sử bệnh lý (nếu có)"></textarea>
            </div>

            <!-- Thông tin tài khoản -->
            <h6 class="fw-bold text-danger mt-4 mb-2">
              <i class="bi bi-lock-fill"></i> Thông tin tài khoản
            </h6>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Mật khẩu *</label>
                <input type="password" class="form-control" v-model="form.password" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Xác nhận mật khẩu *</label>
                <input type="password" class="form-control" v-model="form.confirmPassword" required />
              </div>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-content-between mt-4">
              <button type="submit" class="btn btn-danger px-4">Đăng ký</button>
              <button type="reset" class="btn btn-secondary px-4">Hủy</button>
            </div>
          </form>

          <div class="text-center mt-3">
            <p class="small">Đã có tài khoản? <a href="#" class="text-danger">Đăng nhập ngay</a></p>
          </div>
        </div>
      </div>

      <!-- Giới thiệu bên phải -->
      <div class="col-lg-6">
        <div class="h-100 bg-danger bg-opacity-10 p-4 rounded-4 d-flex flex-column justify-content-center">
          <h4 class="fw-bold mb-3 text-center">Cùng nhau cứu sống</h4>
          <p class="text-muted text-center">Mỗi giọt máu bạn hiến có thể cứu sống 3 người</p>
          <img src="../../../assets/img/hienmau.png" 
               class="img-fluid mx-auto mb-4" alt="Donate" style="max-width: 400px;" />
          <ul class="list-unstyled " style="margin-left: 90px;">
            <li class="mb-2">❤️ Quy trình hiến máu an toàn</li>
            <li class="mb-2">➕ Cộng đồng hiến máu tích cực</li>
            <li class="mb-2">🏥 Kết nối với bệnh viện</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"

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
  confirmPassword: ""
})

function handleRegister() {
  if (form.password !== form.confirmPassword) {
    alert("Mật khẩu không khớp!")
    return
  }
  alert(`Chào mừng ${form.fullName}, bạn đã đăng ký thành công!`)
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
