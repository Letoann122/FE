<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div style="width: 90%; margin: auto;">
          <div class="card mt-4 h-100">
            <div style="width: 90%; margin: auto;">
              <h4 class="fw-bold mt-4">Đăng ký tài khoản</h4>
              <p>Tham gia cộng đồng hiến máu cứu người</p>
              <div class="row">
                <div class="col-lg-6">
                  <label>Họ và tên <span class="text-danger">*</span></label>
                  <input v-model="form.full_name" type="text" class="form-control mt-2" placeholder="Nhập họ và tên" />
                </div>
                <div class="col-lg-6">
                  <label>Ngày sinh <span class="text-danger">*</span></label>
                  <input v-model="form.birthday" type="date" class="form-control mt-2" />
                </div>
                <div class="col-lg-6">
                  <label class="mt-3">Giới tính <span class="text-danger">*</span></label>
                  <select v-model="form.gender" class="form-select mt-2">
                    <option disabled selected>Chọn giới tính</option>
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div class="col-lg-6">
                  <label class="mt-3">Số điện thoại <span class="text-danger">*</span></label>
                  <input v-model="form.phone" type="text" class="form-control mt-2" placeholder="0123456789" />
                </div>
                <div class="col-lg-12">
                  <label class="mt-3">Email <span class="text-danger">*</span></label>
                  <input v-model="form.email" type="email" class="form-control mt-2" placeholder="example@gmail.com" />
                </div>
                <div class="col-lg-12">
                  <label class="mt-3">Địa chỉ <span class="text-danger">*</span></label>
                  <input v-model="form.address" type="text" class="form-control mt-2"
                    placeholder="Nhập địa chỉ của bạn" />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-lg-6">
                  <label>Nhóm máu <span class="text-danger">*</span></label>
                  <select v-model="form.blood_group" class="form-select mt-2">
                    <option disabled value="">Chọn nhóm máu</option>
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
                <div class="col-lg-6">
                  <label>Vai trò <span class="text-danger">*</span></label>
                  <select v-model="form.role" class="form-select mt-2">
                    <option value="donor">Người hiến máu</option>
                  </select>
                </div>
                <div class="col-lg-12">
                  <label class="mt-3">Tiền sử bệnh lý</label>
                  <input v-model="form.medical_history" type="text" class="form-control mt-2"
                    placeholder="Nhập tiền sử bệnh lý (nếu có)" />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-lg-6">
                  <label>Mật khẩu <span class="text-danger">*</span></label>
                  <input v-model="form.password" type="password" class="form-control mt-2"
                    placeholder="Tối thiểu 6 ký tự" />
                </div>
                <div class="col-lg-6">
                  <label>Xác nhận mật khẩu <span class="text-danger">*</span></label>
                  <input v-model="form.password_confirmation" type="password" class="form-control mt-2"
                    placeholder="Nhập lại mật khẩu" />
                </div>
              </div>
              <div class="text-end mt-4 mb-3">
                <button class="btn btn-danger" @click="submitForm">Đăng ký</button>
                <button class="btn btn-secondary ms-2">Huỷ</button>
              </div>
              <p class="text-center mt-2 mb-4">
                Đã có tài khoản?
                <a href="/login" class="text-danger fw-bold">Đăng nhập ngay</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card h-100 mt-4" style="background-color: #fdecec;">
          <h5 class="fw-bold text-center mt-3">Cùng nhau cứu sống</h5>
          <p class="text-center text-secondary">
            Mỗi giọt máu bạn hiến có thể cứu sống 3 người
          </p>
          <img class="img-fluid w-75 mx-auto mb-4"
            src="https://static.vecteezy.com/system/resources/previews/008/190/897/non_2x/human-blood-donate-on-white-background-free-vector.jpg"
            alt="Hiến máu" />
          <div class="d-flex align-items-center mb-2">
            <i class="ms-3 mt-1 fa-solid fa-heart" style="color: #ff0000;"></i>
            <p class="ms-2 mb-0">Quy trình hiến máu an toàn</p>
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="ms-3 mt-1 fa-solid fa-people-group" style="color: #ff0000;"></i>
            <p class="ms-2 mb-0">Cộng đồng hiến máu tích cực</p>
          </div>
          <div class="d-flex align-items-center">
            <i class="ms-3 mt-1 fa-solid fa-hospital" style="color: #ff0000;"></i>
            <p class="ms-2 mb-0">Kết nối với bệnh viện</p>
          </div>
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
          this.$toast.error(err.response?.data?.message || "Có lỗi xảy ra!");
        }
      }
    }
  }
};


</script>
