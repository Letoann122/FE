<template>
  <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="row shadow rounded overflow-hidden bg-white" style="max-width: 1100px; width: 100%;">
      <div class="col-md-6 p-5 d-flex flex-column justify-content-center">
        <h4 class="fw-bold text-center mb-3">Đăng ký hiến máu</h4>
        <p class="text-center text-muted mb-4">Tham gia cộng đồng hiến máu cứu người</p>
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-lg-6">
              <label>Họ và tên <span class="text-danger">*</span></label>
              <input v-model="form.full_name" type="text" class="form-control" placeholder="Nhập họ và tên" />
            </div>
            <div class="col-lg-6">
              <label>Ngày sinh <span class="text-danger">*</span></label>
              <input v-model="form.birthday" type="date" class="form-control" />
            </div>
            <div class="col-lg-6">
              <label>Giới tính <span class="text-danger">*</span></label>
              <select v-model="form.gender" class="form-select">
                <option disabled selected>Chọn giới tính</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
            </div>
            <div class="col-lg-6">
              <label>Số điện thoại <span class="text-danger">*</span></label>
              <input v-model="form.phone" type="text" class="form-control" placeholder="0123456789" />
            </div>
            <div class="col-12">
              <label>Email <span class="text-danger">*</span></label>
              <input v-model="form.email" type="email" class="form-control" placeholder="example@gmail.com" />
            </div>
            <div class="col-12">
              <label>Địa chỉ <span class="text-danger">*</span></label>
              <input v-model="form.address" type="text" class="form-control" placeholder="Nhập địa chỉ của bạn" />
            </div>
            <div class="col-lg-6">
              <label>Nhóm máu <span class="text-danger">*</span></label>
              <select v-model="form.blood_group" class="form-select">
                <option disabled value="">Chọn nhóm máu</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
            </div>
            <div class="col-lg-6">
              <label>Tiền sử bệnh lý</label>
              <input v-model="form.medical_history" type="text" class="form-control" placeholder="Nếu có" />
            </div>
            <div class="col-lg-6">
              <label>Mật khẩu <span class="text-danger">*</span></label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Tối thiểu 6 ký tự" />
            </div>
            <div class="col-lg-6">
              <label>Xác nhận mật khẩu <span class="text-danger">*</span></label>
              <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Nhập lại mật khẩu" />
            </div>
          </div>

          <div class="text-end mt-4">
            <button type="submit" class="btn btn-danger">Đăng ký</button>
            <button type="button" class="btn btn-secondary ms-2">Huỷ</button>
          </div>
        </form>

        <p class="text-center mt-3">
          Đã có tài khoản?
          <router-link to="/dang-nhap" class="text-danger fw-bold">Đăng nhập ngay</router-link>
        </p>
      </div>

      <div class="col-md-6 d-flex flex-column align-items-center justify-content-center text-center p-5 bg-danger bg-opacity-10">
        <h5 class="fw-bold mb-2">Cùng nhau cứu sống</h5>
        <p class="text-muted mb-4">Mỗi giọt máu bạn hiến có thể cứu sống 3 người</p>
        <img 
          src="https://static.vecteezy.com/system/resources/previews/008/190/897/non_2x/human-blood-donate-on-white-background-free-vector.jpg"
          class="img-fluid mb-4 rounded" style="max-width: 350px;" 
        />
        <div class="text-start">
          <p><i class="fa-solid fa-heart text-danger me-2"></i> Quy trình hiến máu an toàn</p>
          <p><i class="fa-solid fa-people-group text-danger me-2"></i> Cộng đồng hiến máu tích cực</p>
          <p><i class="fa-solid fa-hospital text-danger me-2"></i> Kết nối với bệnh viện</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      form: {
        full_name: "",
        birthday: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        blood_group: "",
        role: "donor",
        medical_history: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const res = await axios.post("http://localhost:4000/register", this.form);

        if (res.data.status) {
          this.$toast.success(res.data.message || "Đăng ký thành công!");
          this.form = {};
        } else {
          if (Array.isArray(res.data.errors)) {
            res.data.errors.forEach(msg => this.$toast.error(msg));
          } else {
            this.$toast.error(res.data.message || "Đăng ký thất bại!");
          }
        }
      } catch (err) {
        if (Array.isArray(err.response?.data?.errors)) {
          err.response.data.errors.forEach(msg => this.$toast.error(msg));
        } else {
          this.$toast.error(err.response.data.message || "Có lỗi xảy ra!");
        }
      }
    }
  }
};
</script>
