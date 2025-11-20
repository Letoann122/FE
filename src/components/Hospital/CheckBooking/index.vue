<template>
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h5 class="mb-3 fw-bold text-danger">
              <i class="bi bi-search-heart me-2"></i> Tìm lịch hiến máu
            </h5>
            <div class="mb-3">
              <label class="form-label small">Mã lịch hiến máu</label>
              <input type="text" class="form-control" v-model="filters.appointment_code"
                placeholder="Nhập mã lịch hiến máu..." />
            </div>
            <div class="mb-3">
              <label class="form-label small">Ngày hiến máu</label>
              <input type="date" class="form-control" v-model="filters.date" />
            </div>
            <button class="btn btn-danger w-100" @click="applyFilter" :disabled="loadingList">
              <span v-if="loadingList" class="spinner-border spinner-border-sm me-1"></span>
              <i v-else class="bi bi-funnel me-1"></i>
              Lọc lịch hiến máu
            </button>
            <hr />
            <p class="small text-muted mb-1">
              Tổng số lịch hiến máu: <strong>{{ totalAppointments }}</strong>
            </p>
            <p class="small text-muted mb-0">
              Đang hiển thị: <strong>{{ appointments.length }}</strong> lịch
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-white border-0">
            <h5 class="mb-0 fw-bold text-danger">
              <i class="bi bi-droplet-half me-2"></i> Danh sách lịch hiến máu
            </h5>
          </div>
          <div class="card-body p-0">
            <div v-if="!loadingList && appointments.length === 0" class="p-4 text-center text-muted">
              <i class="bi bi-inbox me-1"></i> Không có lịch hiến máu nào phù
              hợp.
            </div>
            <div v-else-if="loadingList" class="p-4 text-center text-muted">
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
                    <th>SĐT</th>
                    <th>Trạng thái</th>
                    <th class="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in appointments" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.appointment_code }}</td>
                    <td>{{ item.donor_name }}</td>
                    <td>{{ item.donor_phone }}</td>
                    <td class="text-center">
                      <button class="btn btn-warning btn-sm w-100" v-if="item.status === 'REQUESTED'">
                        Chờ duyệt
                      </button>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                        :data-bs-target="'#modal-' + item.id">
                        <i class="bi bi-eye me-1"></i> Chi tiết
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
    <div v-for="item in appointments" :key="'modal-' + item.id">
      <div class="modal fade" :id="'modal-' + item.id" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold">
                <i class="bi bi-droplet-half text-danger me-2"></i>
                Chi tiết lịch hiến máu
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-lg-6">
                  <p class="mb-1">
                    <strong>Mã lịch:</strong> {{ item.appointment_code }}
                  </p>
                  <p class="mb-1">
                    <strong>Người hiến:</strong> {{ item.donor_name }}
                  </p>
                  <p class="mb-1">
                    <strong>SĐT:</strong> {{ item.donor_phone }}
                  </p>
                  <p class="mb-1">
                    <strong>Email:</strong> {{ item.donor_email }}
                  </p>
                  <p class="mb-1">
                    <strong>Nhóm máu:</strong> {{ item.blood_group }}
                  </p>
                </div>
                <div class="col-lg-6">
                  <p class="mb-1">
                    <strong>Ngày hiến:</strong> {{ item.scheduled_date }}
                  </p>
                  <p class="mb-1">
                    <strong>Khung giờ:</strong> {{ item.time_range }}
                  </p>
                  <p class="mb-1">
                    <strong>Địa điểm:</strong> {{ item.donation_site_name }}
                  </p>
                  <p class="mb-1">
                    <strong>Bệnh viện:</strong> {{ item.hospital_name }}
                  </p>
                  <p class="mb-1">
                    <strong>Lượng máu hiến dự kiến:</strong>
                    {{ item.preferred_volume_ml }} ml
                  </p>
                </div>
                <div class="col-12 mt-2">
                  <p class="mb-0">
                    <strong>Ghi chú:</strong> {{ item.notes || "Không có" }}
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button v-if="item.status === 'REQUESTED'" class="btn btn-success" @click="approve(item.id)">
                Duyệt
              </button>
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
            </div>
          </div>
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
      filters: {
        appointment_code: "",
        date: "",
      },
      appointments: [],
      loadingList: false,
      totalAppointments: 0,
    };
  },
  mounted() {
    this.loadAppointments();
  },
  methods: {
    loadAppointments(params = {}) {
      this.loadingList = true;
      baseRequestDoctor
        .get("doctor/donation-appointments", { params })
        .then((res) => {
          if (res.data?.status) {
            const list = res.data.data.filter((x) => x.status === "REQUESTED");
            this.appointments = list;
            this.totalAppointments = list.length;
          }
        })
        .finally(() => {
          this.loadingList = false;
        });
    },
    applyFilter() {
      const params = {};
      if (this.filters.appointment_code)
        params.appointment_code = this.filters.appointment_code;
      if (this.filters.date) params.date = this.filters.date;

      this.loadAppointments(params);
    },
    approve(id) {
      baseRequestDoctor
        .post("doctor/donation-appointments/approve", { id })
        .then((res) => {
          if (res.data?.status) {
            this.$toast.success("Duyệt thành công!");
            const modalElement = document.getElementById("modal-" + id);
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            this.loadAppointments();
          }
        });
    },
  },
};
</script>
<style scope>
.table-wrapper {
  max-height: 430px;
  overflow-y: auto;
}
</style>