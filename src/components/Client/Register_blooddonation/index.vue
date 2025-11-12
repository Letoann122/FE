<template>
  <div class="container py-5">
    <div class="mb-4 border-bottom pb-3">
      <h3 class="fw-bold text-danger">
        <i class="bi bi-calendar2-heart me-2"></i> Đặt lịch hiến máu
      </h3>
      <p class="text-muted mb-0">Đăng ký lịch hẹn tại các điểm hiến máu gần bạn.</p>
    </div>
    <div class="row g-4">
      <div class="col-lg-6">
        <div class="card p-4 shadow-sm border-0 rounded-4">
          <h5 class="fw-bold mb-2">Thông tin đặt lịch</h5>
          <p class="text-muted">Vui lòng điền đầy đủ thông tin bên dưới</p>
          <form @submit.prevent="handleRegister" novalidate>
            <div class="row g-3">
              <div class="col-lg-12">
                <label class="form-label">Họ và tên *</label>
                <input type="text" v-model.trim="form.full_name" class="form-control" placeholder="Nguyễn Văn A" />
              </div>
              <div class="col-lg-6">
                <label class="form-label">Nhóm máu *</label>
                <select class="form-select" v-model="form.blood_group">
                  <option value="" disabled>Chọn nhóm máu</option>
                  <option v-for="group in bloodGroups" :key="group" :value="group">{{ group }}</option>
                </select>
              </div>
              <div class="col-lg-6">
                <label class="form-label">Địa điểm hiến máu *</label>
                <select class="form-select" v-model="form.donation_site_id">
                  <option disabled value="">Chọn địa điểm</option>
                  <option v-for="site in donation_sites" :key="site.id" :value="String(site.id)">
                    {{ site.name }} – {{ site.hospital_name || 'Bệnh viện' }}
                  </option>
                </select>
              </div>
              <div class="col-lg-6">
                <label class="form-label">Ngày hiến *</label>
                <input type="date" v-model="form.date" class="form-control" :min="minDate" />
              </div>
              <div class="col-lg-6">
                <label class="form-label">Khung giờ *</label>
                <select class="form-select" v-model="form.time_slot">
                  <option disabled value="">Chọn khung giờ</option>
                  <option>7:00 - 11:00</option>
                  <option>13:00 - 17:00</option>
                </select>
              </div>
              <div class="col-lg-12">
                <label class="form-label d-block mb-2">Dung tích máu hiến *</label>
                <div class="d-flex gap-4 flex-wrap">
                  <div v-for="vol in ['250ml', '350ml', '450ml']" :key="vol" class="form-check">
                    <input class="form-check-input" type="radio" :id="vol" :value="vol" v-model="form.volume" />
                    <label class="form-check-label" :for="vol">{{ vol }}</label>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <label class="form-label">Ghi chú</label>
                <textarea v-model.trim="form.note" class="form-control" rows="3"
                  placeholder="Tình trạng sức khỏe, thuốc đang sử dụng..."></textarea>
              </div>
              <div class="text-end mt-4">
                <button class="btn btn-danger me-2" type="submit" :disabled="submitting">
                  {{ submitting ? 'Đang gửi...' : 'Đăng ký' }}
                </button>
                <button class="btn btn-secondary" type="button" @click="resetForm" :disabled="submitting">
                  Huỷ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-lg-6" v-if="selectedSite">
        <div class="card p-4 shadow-sm border-0 rounded-4">
          <h5 class="fw-bold mb-3">
            <i class="bi bi-geo-alt-fill text-danger me-2"></i>
            Địa điểm hiến máu đã chọn
          </h5>
          <div class="d-flex justify-content-between align-items-start border rounded-3 p-3 bg-white">
            <div class="me-3">
              <p class="fw-semibold mb-1">{{ selectedSite.name }}</p>
              <small class="text-secondary d-block mb-1">{{ selectedSite.address }}</small>
              <small class="text-muted">({{ selectedSite.hospital_name || 'Bệnh viện' }})</small>
            </div>
            <span class="badge rounded-pill px-3 py-2"
              :class="selectedSite.is_active ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-muted'">
              {{ selectedSite.is_active ? 'Đang hoạt động' : 'Tạm ngưng' }}
            </span>
          </div>
          <div class="mt-3 rounded overflow-hidden shadow-sm">
            <iframe :src="mapEmbedUrl(selectedSite)" width="100%" height="220" style="border:0" allowfullscreen
              loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-outline-danger btn-sm" @click="openInMaps(selectedSite)">
              <i class="bi bi-map me-1"></i> Mở Google Maps
            </button>
            <button class="btn btn-outline-secondary btn-sm" @click="clearSelectedSite">
              <i class="bi bi-x-circle me-1"></i> Chọn lại địa điểm
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-6" v-else>
        <div class="card p-4 shadow-sm border-0 rounded-4 text-center text-muted">
          <i class="bi bi-geo-alt fs-3 d-block mb-2"></i>
          Vui lòng chọn <b>Địa điểm hiến máu</b> ở bảng bên trái để xem thông tin chi tiết.
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
      submitting: false,
      form: {
        full_name: "",
        blood_group: "",
        donation_site_id: "",
        date: "",
        time_slot: "",
        volume: "",
        note: "",
      },
      bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      donation_sites: [],
      loadingProfile: false,
    };
  },
  computed: {
    selectedSite() {
      const id = this.form.donation_site_id;
      if (!id) return null;
      return this.donation_sites.find((s) => String(s.id) === String(id)) || null;
    },
    minDate() {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },
  },
  mounted() {
    this.loadDonationSites();
    this.prefillFromProfile();
  },
  methods: {
    mapEmbedUrl(site) {
      const q = encodeURIComponent(`${site.name} ${site.address}`);
      return `https://www.google.com/maps?q=${q}&output=embed`;
    },
    openInMaps(site) {
      const q = encodeURIComponent(`${site.name} ${site.address}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
    },
    clearSelectedSite() {
      this.form.donation_site_id = "";
    },
    prefillFromProfile() {
      this.loadingProfile = true;
      baseRequestClient
        .get("/donor/me")
        .then((res) => {
          const user = res?.data?.data;
          if (!user) return;
          if (!this.form.full_name && user.full_name) this.form.full_name = user.full_name;
          if (!this.form.blood_group && this.bloodGroups.includes(user.blood_group)) {
            this.form.blood_group = user.blood_group;
          }
        })
        .catch((err) => {
          const msg = err?.response?.data?.message;
          if (msg) this.$toast?.error(msg);
        })
        .finally(() => (this.loadingProfile = false));
    },
    loadDonationSites() {
      baseRequestClient
        .get("/donor/donation-sites")
        .then((res) => {
          if (res.data?.status) this.donation_sites = res.data.data || [];
          else this.$toast?.error(res.data?.message || "Không thể tải danh sách điểm hiến máu!");
        })
        .catch((err) => {
          const msg = err?.response?.data?.message || "Không tải được địa điểm";
          this.$toast?.error(msg);
        });
    },
    getStartTimeFromSlot(slot) {
      if (!slot) return "";
      const first = String(slot).split("-")[0].trim();
      const [h, m] = first.split(":");
      const hh = String(h).padStart(2, "0");
      const mm = String(m || "00").padStart(2, "0");
      return `${hh}:${mm}:00`;
    },
    buildScheduledAt(dateStr, slot) {
      const hhmmss = this.getStartTimeFromSlot(slot);
      if (!dateStr || !hhmmss) return "";
      return `${dateStr} ${hhmmss}`;
    },
    handleRegister() {
      if (!this.form.donation_site_id) {
        this.$toast?.error("Vui lòng chọn địa điểm hiến máu!");
        return;
      }
      if (!this.form.time_slot) {
        this.$toast?.error("Vui lòng chọn khung giờ hiến máu!");
        return;
      }
      if (!this.form.date) {
        this.$toast?.error("Vui lòng chọn ngày hiến máu!");
        return;
      }
      if (this.form.date < this.minDate) {
        this.$toast?.error("Ngày hiến không hợp lệ");
        return;
      }
      if (!this.form.volume) {
        this.$toast?.error("Vui lòng chọn dung tích máu hiến!");
        return;
      }
      const scheduled_at = this.buildScheduledAt(this.form.date, this.form.time_slot);
      if (!scheduled_at) {
        this.$toast?.error("Vui lòng chọn ngày & khung giờ hợp lệ!");
        return;
      }
      const payload = {
        donation_site_id: Number(this.form.donation_site_id),
        scheduled_at,
        time_slot: this.form.time_slot,
        volume: this.form.volume,
        notes: this.form.note || null,
      };

      this.submitting = true;
      baseRequestClient
        .post("/donor/donation-appointments", payload)
        .then((res) => {
          if (res.data?.status) {
            this.$toast?.success(res.data.message || "Đăng ký hiến máu thành công!");
            this.resetForm();
            this.prefillFromProfile();
          } else {
            this.$toast?.error(res.data?.message || "Không thể đăng ký hiến máu!");
          }
        })
        .catch((err) => {
          const msg = err?.response?.data?.message;
          if (msg) {
            this.$toast?.error(msg);
          } else {
            const errs = err?.response?.data?.errors;
            if (errs && typeof errs === "object") {
              Object.values(errs).forEach((arr) => {
                const m = Array.isArray(arr) ? arr[0] : String(arr);
                this.$toast?.error(m);
              });
            } else {
              this.$toast?.error("Có lỗi xảy ra!");
            }
          }
        })
        .finally(() => (this.submitting = false));
    },
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
