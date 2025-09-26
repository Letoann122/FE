<template>
  <div class="d-flex flex-column align-items-center justify-content-center bg-light">
    
    <div class="mb-3">
      <i class="bi bi-key-fill text-danger" style="font-size: 3rem;"></i>
    </div>
 
    <h4 class="fw-bold">Quên mật khẩu?</h4>
    <p class="text-muted">Nhập email hoặc số điện thoại để khôi phục tài khoản</p>

    <div class="card shadow-sm p-4 rounded-4" style="width: 100%; max-width: 400px;">
      <form>
        <div class="mb-3">
          <label class="form-label">Email hoặc Số điện thoại *</label>
          <div class="input-group">
            <span class="input-group-text bg-white"><i class="bi bi-envelope"></i></span>
            <input 
              type="text" class="form-control"  placeholder="Nhập email hoặc số điện thoại" 
              required 
            />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Xác minh bảo mật</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control text-center fw-bold" v-model="captchaCode" readonly />
            <button type="button" class="btn btn-outline-secondary" @click="refreshCaptcha">
              <i class="bi bi-arrow-clockwise"></i>
            </button>
          </div>
          <input 
            type="text" class="form-control" v-model="form.captchaInput" placeholder="Nhập mã xác minh" 
            required 
          />
        </div>
        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-danger">
            <i class="bi bi-send-fill me-2"></i> Gửi yêu cầu đặt lại mật khẩu
          </button>
        </div>

        <div class="text-center">
          <a href="#" class="text-muted small" >
            ← Quay lại đăng nhập
          </a>
        </div>
      </form>
    </div>

    <div class="mt-1 p-3 bg-white rounded shadow-sm small text-center mb-3" style="max-width: 400px;">
      <i class="bi bi-shield-lock text-primary me-2 "></i>
      <strong>Bảo mật thông tin</strong>
      <p class="mb-0 text-muted">Thông tin của bạn được bảo vệ bằng mã hóa SSL 256-bit</p>
    </div>

  </div>
</template>
<script setup>
import { reactive, ref } from "vue"

const form = reactive({
  identifier: "",
  captchaInput: ""
})

const captchaCode = ref(generateCaptcha())

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

function refreshCaptcha() {
  captchaCode.value = generateCaptcha()
  form.captchaInput = ""
}

</script>