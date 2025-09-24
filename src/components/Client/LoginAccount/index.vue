<template>
  <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
    <div class="row align-items-center shadow rounded overflow-hidden bg-white">
      <!-- Giới thiệu bên trái -->
      <div class="col-md-6  d-flex flex-column align-items-center justify-content-center text-center p-5" style="background-color: #fdf2f2;">
        <img src="../../../assets/img/traitim.png" 
             alt="Blood Donation" class="img-fluid mb-4" style="max-width: 500px;" />
        <h3 class="fw-bold text-danger">Smart Blood Donation System</h3>
        <p class="text-muted">
          Kết nối những trái tim nhân ái, cứu sống những cuộc đời.
        </p>
      </div>
      <!-- Form đăng nhập -->
      <div class="col-md-6 bg-white p-5">
        <div class="text-center mb-4">
          <i class="bi bi-heart-fill text-danger fs-2"></i>
          <h4 class="fw-bold mt-2">Đăng nhập</h4>
          <p class="text-muted">Chào mừng bạn trở lại với SBDD</p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email hoặc số điện thoại</label>
            <input type="text" class="form-control"/>
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" />
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox"/>
              <label for="rememberMe" class="ms-1">Ghi nhớ đăng nhập</label>
            </div>
            <a href="#" class="text-danger small">Quên mật khẩu?</a>
          </div>

          <button type="submit" class="btn btn-danger w-100 mb-3">
            <i class="bi bi-box-arrow-in-right"></i> Đăng nhập
          </button>

          <div class="text-center text-muted mb-3">Hoặc đăng nhập với</div>

          <div class="d-flex justify-content-center gap-3">
            <button type="button" class="btn btn-outline-dark w-100">
              <i class="bi bi-google"></i> Google
            </button>
            <button type="button" class="btn btn-outline-primary w-100">
              <i class="bi bi-facebook"></i> Facebook
            </button>
          </div>
        </form>

        <div class="text-center mt-4">
          <p class="small">
            Chưa có tài khoản? 
            <a href="#" class="text-danger fw-bold">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseRequestClient from '../../../core/baseRequestClient';
export default {
    name : 'LoginClient',
    data() {
      return {
        user : {
          email     : '',
          password  : '',
        },
        showPassword: false,
      }
    },
    // mounted() {
      
    // },
    // methods: {
      
    // },
}
</script>
<style>
    
</style>