<template>
  <div class="contact-page bg-light py-5">
    <div class="container">
      <!-- Tiêu đề -->
      <div class="text-center mb-5">
        <h2 class="fw-bold text-danger">Liên hệ ngay với chúng tôi</h2>
        <p class="text-muted">
          Hãy gửi tin nhắn nếu bạn muốn đăng ký hiến máu, trở thành tình nguyện viên, hoặc cần tư vấn thêm.
        </p>
      </div>

      <div class="row g-4">
        <!-- Form liên hệ -->
        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="fw-bold text-danger mb-3">Gửi tin nhắn cho chúng tôi</h5>
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label class="form-label fw-semibold">Họ và tên *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-semibold">Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-semibold">Nội dung *</label>
                  <textarea
                    v-model="form.message"
                    class="form-control"
                    rows="5"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-danger w-100 fw-bold rounded-pill">
                  <i class="bi bi-send-fill me-2"></i> Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Thông tin liên hệ + Bản đồ -->
        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="fw-bold text-danger mb-3">Thông tin liên hệ</h5>
              <ul class="list-unstyled mb-4">
                <li class="mb-2">
                  <i class="bi bi-geo-alt-fill text-danger me-2"></i>
                  254 Nguyễn Văn Linh, Quận Thanh Khê, Đà Nẵng
                </li>
                <li class="mb-2">
                  <i class="bi bi-telephone-fill text-danger me-2"></i>
                  <strong>Hotline:</strong> 0901 234 567
                </li>
                <li class="mb-2">
                  <i class="bi bi-envelope-fill text-danger me-2"></i>
                  <strong>Email:</strong> hienmau.vn@gmail.com
                </li>
                <li>
                  <i class="bi bi-clock-fill text-danger me-2"></i>
                  Thời gian làm việc: 8:00 - 17:00 (T2 - T7)
                </li>
              </ul>

              <div class="map-container rounded overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.043728724053!2d108.20646887504788!3d16.058020139576756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b06ad87f61%3A0x2d796ca4a97d7b6a!2zMjU0IE5ndXnhu4VuIFbEg24gTGluaCwgQW4gS2jDoW5nLCBUaOG6oW5oIFBo4bunLCDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1709799999999!5m2!1svi!2s"
                  width="100%"
                  height="250"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Nút nổi liên hệ nhanh -->
<div class="floating-buttons">
  <a
    href="https://m.me/yourpage"
    target="_blank"
    class="contact-btn messenger"
    title="Liên hệ qua Messenger"
  >
    <i class="bi bi-messenger"></i>
  </a>

  <a
    href="https://zalo.me/0901234567"
    target="_blank"
    class="contact-btn zalo"
    title="Liên hệ qua Zalo"
  >
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" />
  </a>
</div>

  </div>
</template>

<script>
export default {
  name: "LienHe",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Dữ liệu gửi đi:", this.form);
      alert("✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
      this.form = { name: "", email: "", message: "" };
    },
  },
};
</script>

<style scoped>
.contact-page {
  font-family: "Poppins", sans-serif;
}
.card {
  border-radius: 12px;
}
.btn-danger {
  background-color: #dc3545;
  border: none;
}
.btn-danger:hover {
  background-color: #b52b38;
}
.map-container iframe {
  border-radius: 10px;
}

/* ==== Nút nổi Messenger & Zalo ==== */
.floating-buttons {
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
}

.contact-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-btn i {
  font-size: 26px;
  color: #dc3545;
}

.contact-btn img {
  width: 28px;
  height: 28px;
}

.contact-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

/* Messenger màu đỏ nhẹ cho hợp chủ đề */
.contact-btn.messenger {
  border: 2px solid #dc3545;
}

.contact-btn.zalo {
  border: 2px solid #dc3545;
}

</style>
