<template>
  <div class="container py-5">
    <div class="row align-items-center">
      
      <!-- Form đăng ký -->
      <div class="col-md-6">
        <div class="card shadow p-4">
          <h4 class="text-center mb-4">
            <i class="bi bi-heart-fill text-danger"></i> Đăng ký hiến máu
          </h4>
          <h6 class="text-center mt-1">Tạo tài khoản để tham gia hiến máu cứu người</h6>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control" v-model="form.fullName" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Ngày sinh</label>
              <input type="date" class="form-control" v-model="form.dob" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Giới tính</label>
              <select class="form-select" v-model="form.gender" required>
                <option value="">-- Chọn giới tính --</option>
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="text" class="form-control" v-model="form.phone" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="form.email" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control" v-model="form.address" />
            </div>

            <div class="mb-3">
              <label class="form-label">Nhóm máu</label>
              <select class="form-select" v-model="form.bloodGroup" required>
                <option value="">-- Chọn nhóm máu --</option>
                <option>A</option>
                <option>B</option>
                <option>AB</option>
                <option>O</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Tiền sử bệnh lý</label>
              <textarea class="form-control" rows="2" v-model="form.medicalHistory"></textarea>
            </div>

            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-danger">Đăng ký</button>
              <button type="reset" class="btn btn-secondary">Hủy</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Hình ảnh + giới thiệu -->
      <div class="col-md-6 text-center">
        <img src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-8119.jpg" 
             alt="Donate Blood" 
             class="img-fluid mb-3" />
        <h5 class="fw-bold">Hiến máu cứu người</h5>
        <p class="text-muted">
          Mỗi đơn hiến máu của bạn có thể cứu được 3 sinh mạng. 
          Hãy tham gia cùng chúng tôi để lan tỏa những điều kỳ diệu.
        </p>
        <div class="d-flex justify-content-around fw-bold">
          <div><span class="text-danger">1000+</span><br>Người hiến</div>
          <div><span class="text-danger">3000+</span><br>Đơn vị máu</div>
          <div><span class="text-danger">24/7</span><br>Hỗ trợ</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  fullName: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "",
  medicalHistory: ""
});

function handleSubmit() {
  alert(`Cảm ơn ${form.fullName}, bạn đã đăng ký hiến máu thành công!`);
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
