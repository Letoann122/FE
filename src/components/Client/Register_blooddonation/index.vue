<template>
  <div class="container py-5">
    <!-- 🩸 Tiêu đề -->
    <div class="mb-4 border-bottom pb-3">
      <h3 class="fw-bold text-danger">
        <i class="bi bi-calendar2-heart me-2"></i> Đặt lịch hiến máu
      </h3>
      <p class="text-muted mb-0">
        Đăng ký lịch hẹn tại các điểm hiến máu gần bạn.
      </p>
    </div>

    <div class="row g-4">
      <!-- 📝 FORM ĐĂNG KÝ -->
      <div class="col-lg-6">
        <div class="card p-4 shadow-sm border-0 rounded-4">
          <h5 class="fw-bold mb-2">Thông tin đặt lịch</h5>
          <p class="text-muted">Vui lòng điền đầy đủ thông tin bên dưới</p>

          <form @submit.prevent="handleRegister">
            <div class="row g-3">
              <div class="col-lg-12">
                <label class="form-label">Họ và tên *</label>
                <input
                  type="text"
                  v-model="form.full_name"
                  class="form-control"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div class="col-lg-6">
                <label class="form-label">Nhóm máu *</label>
                <select class="form-select" v-model="form.blood_group" required>
                  <option value="">Chọn nhóm máu</option>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>O</option>
                </select>
              </div>

              <div class="col-lg-6">
                <label class="form-label">Địa điểm hiến máu *</label>
                <select
                  class="form-select"
                  v-model="form.donation_site_id"
                  required
                >
                  <option value="">Chọn địa điểm</option>
                  <option
                    v-for="site in donation_sites"
                    :key="site.id"
                    :value="site.id"
                  >
                    {{ site.name }} – {{ site.hospital_name }}
                  </option>
                </select>
              </div>

              <div class="col-lg-6">
                <label class="form-label">Ngày hiến *</label>
                <input
                  type="date"
                  v-model="form.date"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-lg-6">
                <label class="form-label">Khung giờ *</label>
                <select class="form-select" v-model="form.time_slot" required>
                  <option value="">Chọn khung giờ</option>
                  <option>7:00 - 11:00</option>
                  <option>13:00 - 17:00</option>
                </select>
              </div>

              <div class="col-lg-12">
                <label class="form-label d-block mb-2">Dung tích máu hiến *</label>
                <div class="d-flex gap-4 flex-wrap">
                  <div
                    v-for="vol in ['250ml', '350ml', '450ml']"
                    :key="vol"
                    class="form-check"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :id="vol"
                      :value="vol"
                      v-model="form.volume"
                    />
                    <label class="form-check-label" :for="vol">{{ vol }}</label>
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <label class="form-label">Ghi chú</label>
                <textarea
                  v-model="form.note"
                  class="form-control"
                  rows="3"
                  placeholder="Tình trạng sức khỏe, thuốc đang sử dụng..."
                ></textarea>
              </div>

              <div class="text-end mt-4">
                <button class="btn btn-danger me-2" type="submit">
                  <i class="bi bi-send-check me-1"></i> Đăng ký
                </button>
                <button class="btn btn-secondary" type="button" @click="resetForm">
                  <i class="bi bi-x-circle me-1"></i> Huỷ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- 🏥 DANH SÁCH ĐỊA ĐIỂM -->
      <div class="col-lg-6">
        <div class="card p-4 shadow-sm border-0 rounded-4">
          <h5 class="fw-bold mb-3">
            <i class="bi bi-geo-alt-fill text-danger me-2"></i>
            Địa điểm hiến máu gần bạn
          </h5>

          <div
            v-for="(site, index) in donation_sites"
            :key="index"
            class="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-2 bg-white"
          >
            <div class="d-flex align-items-center">
              <i class="bi bi-hospital fs-4 text-danger me-3"></i>
              <div>
                <p class="fw-semibold mb-1">{{ site.name }}</p>
                <small class="text-secondary">{{ site.address }}</small><br />
                <small class="text-muted">({{ site.hospital_name }})</small>
              </div>
            </div>
            <span
              class="badge rounded-pill px-3 py-2"
              :class="
                site.is_active
                  ? 'bg-success-subtle text-success'
                  : 'bg-secondary-subtle text-muted'
              "
            >
              {{ site.is_active ? "Đang hoạt động" : "Tạm ngưng" }}
            </span>
          </div>

          <div v-if="donation_sites.length === 0" class="text-center text-muted py-3">
            <i class="bi bi-exclamation-circle me-1"></i> Chưa có địa điểm hiến máu nào!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseRequestClient from "../../../core/baseRequestClient";

export default {
  name: "BookDonation",
  data() {
    return {
      form: {
        full_name: "",
        blood_group: "",
        donation_site_id: "",
        date: "",
        time_slot: "",
        volume: "",
        note: "",
      },
      donation_sites: [],
    };
  },
  mounted() {
    this.loadDonationSites();
  },
  methods: {
    // 🏥 Lấy danh sách điểm hiến máu
    loadDonationSites() {
      baseRequestClient
        .get("/donation-sites")
        .then((res) => {
          if (res.data.status) {
            this.donation_sites = res.data.data;
          }
        })
        .catch(() => {
          this.$toast.error("Không thể tải danh sách điểm hiến máu!");
        });
    },

    // 🩸 Đăng ký hiến máu
    handleRegister() {
      if (
        !this.form.full_name ||
        !this.form.blood_group ||
        !this.form.donation_site_id ||
        !this.form.date ||
        !this.form.time_slot ||
        !this.form.volume
      ) {
        this.$toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return;
      }

      baseRequestClient
        .post("/donation-appointments", this.form)
        .then((res) => {
          if (res.data.status) {
            this.$toast.success("Đăng ký hiến máu thành công!");
            this.resetForm();
          } else {
            this.$toast.error(res.data.message || "Không thể đăng ký hiến máu!");
          }
        })
        .catch(() => {
          this.$toast.error("Lỗi khi đăng ký hiến máu!");
        });
    },

    // 🔁 Reset form
    resetForm() {
      this.form = {
        full_name: "",
        blood_group: "",
        donation_site_id: "",
        date: "",
        time_slot: "",
        volume: "",
        note: "",
      };
    },
  },
};
</script>

<style scoped>
.table {
  font-size: 15px;
}
.form-check-input:checked {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
