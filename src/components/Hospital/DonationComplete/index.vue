<template>
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h5 class="mb-3 fw-bold text-danger">
              <i class="bi bi-search-heart me-2"></i>
              Tìm lịch đã duyệt
            </h5>
            <div class="mb-3">
              <label class="form-label small">Mã lịch hiến máu</label>
              <input type="text" class="form-control" v-model="loc_lich.ma_lich" placeholder="Nhập mã lịch..." />
            </div>
            <div class="mb-3">
              <label class="form-label small">Ngày hiến máu</label>
              <input type="date" class="form-control" v-model="loc_lich.ngay_hien" />
            </div>
            <button class="btn btn-danger w-100" @click="locDanhSach" :disabled="dang_tai">
              <span v-if="dang_tai" class="spinner-border spinner-border-sm me-1"></span>
              <i v-else class="bi bi-funnel me-1"></i> Lọc lịch hiến máu
            </button>
            <hr />
            <p class="small text-muted mb-1">
              Tổng lịch (APPROVED): <strong>{{ tong_so_lich }}</strong>
            </p>
            <p class="small text-muted mb-0">
              Đang hiển thị: <strong>{{ danh_sach_lich.length }}</strong> lịch
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-0 fw-bold text-danger">
                <i class="bi bi-droplet-half me-2"></i> Ghi nhận hiến máu
              </h5>
              <small class="text-muted">Chỉ hiển thị lịch đã được bác sĩ duyệt</small>
            </div>
          </div>
          <div class="card-body p-0">
            <div v-if="!dang_tai && danh_sach_lich.length === 0" class="p-4 text-center text-muted">
              <i class="bi bi-inbox me-1"></i> Không có lịch hiến máu phù hợp.
            </div>
            <div v-else-if="dang_tai" class="p-4 text-center text-muted">
              <div class="spinner-border text-danger"></div>
              <div class="mt-2 small">Đang tải dữ liệu...</div>
            </div>
            <div v-else class="table-responsive table-wrapper">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width: 70px">STT</th>
                    <th>Mã lịch</th>
                    <th>Người hiến máu</th>
                    <th>Ngày / Giờ</th>
                    <th>Trạng thái</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, index) in danh_sach_lich" :key="value.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <span class="badge bg-light text-dark border">
                        {{ value.appointment_code }}
                      </span>
                    </td>
                    <td>
                      <div class="fw-semibold">{{ value.donor_name }}</div>
                      <div class="small text-muted">{{ value.donor_phone }}</div>
                    </td>
                    <td>
                      <div>{{ value.scheduled_date }}</div>
                      <div class="small text-muted">
                        <i class="bi bi-clock-history me-1"></i> {{ value.time_range }}
                      </div>
                    </td>
                    <td>
                      <span class="badge px-3" :class="mauTrangThai(value.status)">
                        {{ tenTrangThai(value.status) }}
                      </span>
                    </td>
                    <td class="text-end">
                      <button v-if="value.status === 'APPROVED'" class="btn btn-sm btn-outline-success"
                        @click="moModalGhiNhan(value)">
                        <i class="bi bi-check2-circle me-1"></i> Ghi nhận
                      </button>
                      <button v-else-if="value.status === 'COMPLETED'" class="btn btn-sm btn-outline-secondary"
                        disabled>
                        <i class="bi bi-check-all me-1"></i> Đã hiến máu
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="lich_dang_ghi_nhan" class="custom-modal-backdrop">
      <div class="custom-modal">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 class="fw-bold mb-1">
              <i class="bi bi-check2-circle text-success me-2"></i> Ghi nhận hiến máu
            </h5>
            <small class="text-muted">
              Mã lịch:
              <strong>{{ lich_dang_ghi_nhan.appointment_code }}</strong>
            </small>
          </div>

          <button class="btn btn-sm btn-outline-secondary" @click="dongModal" :disabled="dang_luu">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="mb-3">
          <small class="text-muted">Thông tin lịch</small>
          <div class="fw-semibold">
            {{ lich_dang_ghi_nhan.donor_name }} – {{ lich_dang_ghi_nhan.scheduled_date }}
            ({{ lich_dang_ghi_nhan.time_range }})
          </div>
          <div class="small text-muted">
            {{ lich_dang_ghi_nhan.donation_site_name }} – {{ lich_dang_ghi_nhan.hospital_name }}
          </div>
        </div>
        <hr />
        <div class="row g-3">
          <div class="col-md-6">
            <h6 class="fw-bold small text-muted">Thông tin đăng ký</h6>
            <div class="mb-2">
              <small class="text-muted">Nhóm máu khai báo</small>
              <div>{{ lich_dang_ghi_nhan.blood_group }}</div>
            </div>
            <div class="mb-2">
              <small class="text-muted">Số lượng đăng ký</small>
              <div>{{ lich_dang_ghi_nhan.preferred_volume_ml }} ml</div>
            </div>
          </div>
          <div class="col-md-6">
            <h6 class="fw-bold small text-muted">Thông tin thực tế</h6>
            <div class="mb-2">
              <label class="form-label small">Nhóm máu thực tế *</label>
              <select class="form-select" v-model="form_ghi_nhan.nhom_mau">
                <option disabled value="">Chọn nhóm máu</option>
                <option v-for="(mau, index) in nhom_mau_list" :key="index" :value="mau">
                  {{ mau }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <label class="form-label small">Số lượng thực tế (ml) *</label>
              <input type="number" class="form-control" v-model.number="form_ghi_nhan.so_ml" min="50" step="10" />
            </div>
            <div class="mb-2">
              <label class="form-label small">Thời điểm lấy máu *</label>
              <input type="datetime-local" class="form-control" v-model="form_ghi_nhan.thoi_diem_lay" />
            </div>
            <div class="form-check mt-2">
              <input class="form-check-input" type="checkbox" id="screened_ok" v-model="form_ghi_nhan.da_sang_loc" />
              <label class="form-check-label small" for="screened_ok">Đủ điều kiện sử dụng</label>
            </div>
          </div>
        </div>
        <hr />
        <label class="form-label small">Ghi chú thêm</label>
        <textarea class="form-control" rows="2" v-model="form_ghi_nhan.ghi_chu"
          placeholder="Ví dụ: Lấy được ít hơn..." />
        <div class="d-flex justify-content-end align-items-center mt-3 gap-2">
          <button class="btn btn-secondary" :disabled="dang_luu" @click="dongModal">Hủy</button>
          <button class="btn btn-success" :disabled="dang_luu" @click="luuKetQua">
            <span v-if="dang_luu" class="spinner-border spinner-border-sm me-1"></span>
            Xác nhận hiến máu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import baseRequestDoctor from "../../../core/baseRequestDoctor";

export default {
  data() {
    return {
      loc_lich: {
        ma_lich: "",
        ngay_hien: "",
      },
      danh_sach_lich: [],
      tong_so_lich: 0,
      dang_tai: false,
      lich_dang_ghi_nhan: null,
      dang_luu: false,
      form_ghi_nhan: {
        nhom_mau: "",
        so_ml: null,
        thoi_diem_lay: "",
        da_sang_loc: true,
        ghi_chu: "",
      },
      nhom_mau_list: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    };
  },

  mounted() {
    this.taiDanhSach();
  },

  methods: {
    taiDanhSach(params = {}) {
      this.dang_tai = true;
      baseRequestDoctor
        .get("doctor/donation-appointments", { params })
        .then((res) => {
          if (res.data?.status) {
            let rows = res.data.data || [];
            rows = rows.filter((v) => ["APPROVED", "COMPLETED"].includes(v.status));
            this.danh_sach_lich = rows;
            this.tong_so_lich = rows.length;
          } else {
            this.$toast.error(res.data.message);
          }
        })
        .catch((err) => {
          const errors = Object.values(err.response?.data?.errors || {});
          if (errors.length) {
            errors.forEach((e) => this.$toast.error(e[0]));
          } else {
            this.$toast.error("Không thể tải danh sách lịch hiến máu!");
          }
        })
        .finally(() => {
          this.dang_tai = false;
        });
    },
    locDanhSach() {
      const params = {};
      if (this.loc_lich.ma_lich) params.appointment_code = this.loc_lich.ma_lich;
      if (this.loc_lich.ngay_hien) params.date = this.loc_lich.ngay_hien;
      this.taiDanhSach(params);
    },
    tenTrangThai(status) {
      switch (status) {
        case "APPROVED": return "Đã duyệt";
        case "COMPLETED": return "Đã hiến máu";
        case "REJECTED": return "Đã từ chối";
        case "CANCELLED": return "Đã hủy";
        case "NO_SHOW": return "Không đến";
        default: return "Chờ duyệt";
      }
    },
    mauTrangThai(status) {
      switch (status) {
        case "APPROVED": return "bg-primary";
        case "COMPLETED": return "bg-success";
        case "REJECTED": return "bg-secondary";
        case "CANCELLED":
        case "NO_SHOW": return "bg-dark";
        default: return "bg-warning text-dark";
      }
    },
    moModalGhiNhan(value) {
      this.lich_dang_ghi_nhan = { ...value };

      this.form_ghi_nhan.nhom_mau = value.blood_group || "";
      this.form_ghi_nhan.so_ml = value.preferred_volume_ml || 350;
      this.form_ghi_nhan.thoi_diem_lay = this.macDinhThoiGian(value.scheduled_date);
      this.form_ghi_nhan.da_sang_loc = true;
      this.form_ghi_nhan.ghi_chu = "";
    },
    dongModal() {
      if (this.dang_luu) return;
      this.lich_dang_ghi_nhan = null;

      this.form_ghi_nhan = {
        nhom_mau: "",
        so_ml: null,
        thoi_diem_lay: "",
        da_sang_loc: true,
        ghi_chu: "",
      };
    },
    macDinhThoiGian(ngayStr) {
      const now = new Date();
      const [y, m, d] = ngayStr.split("-");
      const dt = new Date(Number(y), Number(m) - 1, Number(d), now.getHours(), now.getMinutes());
      const pad = (n) => (n < 10 ? "0" + n : n);
      return (
        dt.getFullYear() +
        "-" +
        pad(dt.getMonth() + 1) +
        "-" +
        pad(dt.getDate()) +
        "T" +
        pad(dt.getHours()) +
        ":" +
        pad(dt.getMinutes())
      );
    },
    luuKetQua() {
      if (!this.lich_dang_ghi_nhan) return;
      if (!this.form_ghi_nhan.nhom_mau)
        return this.$toast.error("Vui lòng chọn nhóm máu!");
      if (!this.form_ghi_nhan.so_ml || this.form_ghi_nhan.so_ml <= 0)
        return this.$toast.error("Vui lòng nhập số ml hợp lệ!");
      if (!this.form_ghi_nhan.thoi_diem_lay)
        return this.$toast.error("Vui lòng chọn thời điểm lấy máu!");
      this.dang_luu = true;
      const payload = {
        appointment_id: this.lich_dang_ghi_nhan.id,
        blood_group: this.form_ghi_nhan.nhom_mau,
        volume_ml: this.form_ghi_nhan.so_ml,
        collected_at: this.form_ghi_nhan.thoi_diem_lay,
        screened_ok: this.form_ghi_nhan.da_sang_loc,
        notes: this.form_ghi_nhan.ghi_chu || "",
      };
      baseRequestDoctor
        .post("doctor/donations/complete", payload)
        .then((res) => {
          if (res.data?.status) {
            this.$toast.success(res.data.message);
            this.locDanhSach();
            this.dongModal();
          } else {
            this.$toast.error(res.data.message);
          }
        })
        .catch((err) => {
          const errors = Object.values(err.response?.data?.errors || {});
          if (errors.length) {
            errors.forEach((e) => this.$toast.error(e[0]));
          } else {
            this.$toast.error("Lỗi khi ghi nhận hiến máu!");
          }
        })
        .finally(() => {
          this.dang_luu = false;
        });
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  max-height: 430px;
  overflow-y: auto;
}

.custom-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.custom-modal {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem 1.75rem;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
}
</style>
