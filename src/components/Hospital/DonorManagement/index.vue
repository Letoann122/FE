<template>
  <div class="container-fluid my-4 px-4">

    <div class="row g-4">

      <!-- ===== FILTER ===== -->
      <div class="col-lg-3">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">

            <h5 class="fw-bold text-danger mb-3">
              <i class="bi bi-funnel-fill me-2"></i>
              Bộ lọc donor
            </h5>

            <label class="form-label small">Tìm theo tên hoặc số điện thoại</label>
            <input type="text" class="form-control mb-3" v-model="filters.keyword" />

            <label class="form-label small">Nhóm máu</label>
            <select class="form-select mb-3" v-model="filters.bloodType">
              <option value="">Tất cả</option>
              <option v-for="group in bloodGroups" :key="group" :value="group">
                {{ group }}
              </option>
            </select>

            <label class="form-label small">Ngày hiến từ</label>
            <input type="date" class="form-control mb-3" v-model="filters.fromDate" />

            <label class="form-label small">Ngày hiến đến</label>
            <input type="date" class="form-control mb-4" v-model="filters.toDate" />

            <button class="btn btn-danger w-100 fw-bold" @click="applyFilter">
              <i class="bi bi-search me-2"></i> Lọc dữ liệu
            </button>

          </div>
        </div>
      </div>

      <!-- ===== TABLE ===== -->
      <div class="col-lg-9">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">

            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="fw-bold mb-0">
                <i class="bi bi-people me-2"></i>Danh sách Donor
              </h5>

              <!-- BTN OPEN MODAL -->
              <button
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#createDonorModal"
              >
                <i class="bi bi-plus-lg me-2"></i>Thêm donor mới
              </button>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>STT</th>
                    <th>Tên Donor</th>
                    <th>Nhóm máu</th>
                    <th>Địa chỉ</th>
                    <th>Liên hệ</th>
                    <th>Lần cuối</th>
                    <th>Số lần</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(value, index) in filteredDonors" :key="value.id">

                    <td>{{ index + 1 }}</td>

                    <td class="fw-bold">{{ value.name }}</td>

                    <td>
                      <span class="badge bg-danger-light text-danger p-2">
                        {{ value.bloodType }}
                      </span>
                    </td>

                    <td>{{ value.address }}</td>

                    <td>
                      <div>{{ value.phone }}</div>
                      <small class="text-muted">{{ value.email }}</small>
                    </td>

                    <td>
                      <span v-if="value.lastDonation !== 'Chưa hiến'">
                        {{ value.lastDonation }}
                      </span>
                      <span v-else class="text-muted small fst-italic">Chưa hiến</span>
                    </td>

                    <td>{{ value.totalDonation }}</td>

                    <td>
                      <span
                        :class="[
                          'badge rounded-pill px-3',
                          value.status === 'Hoạt động'
                            ? 'bg-success-light text-success'
                            : 'bg-warning-light text-warning'
                        ]"
                      >
                        {{ value.status }}
                      </span>
                    </td>

                    <td>
                      <RouterLink
                        :to="`/Hospital/donor-management/${value.id}`"
                        class="btn btn-sm btn-outline-danger"
                      >
                        Xem chi tiết
                      </RouterLink>
                    </td>

                  </tr>

                  <tr v-if="filteredDonors.length === 0">
                    <td colspan="9" class="text-center text-muted py-3">
                      Không tìm thấy donor nào
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- ========================================= -->
    <!--                  MODAL                   -->
    <!-- ========================================= -->
    <div
      class="modal fade"
      id="createDonorModal"
      tabindex="-1"
      aria-labelledby="createDonorModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="createDonorModalLabel">
              <i class="bi bi-person-plus-fill text-danger me-2"></i> Tạo donor mới
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">

            <div class="row g-3">

              <div class="col-md-6">
                <label class="form-label fw-bold">Họ tên *</label>
                <input type="text" class="form-control" v-model="newDonor.full_name" />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-bold">Email *</label>
                <input type="email" class="form-control" v-model="newDonor.email" />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-bold">Số điện thoại *</label>
                <input type="text" class="form-control" v-model="newDonor.phone" />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-bold">Ngày sinh *</label>
                <input type="date" class="form-control" v-model="newDonor.birthday" />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-bold">Giới tính *</label>
                <select class="form-select" v-model="newDonor.gender">
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-bold">Nhóm máu *</label>
                <select class="form-select" v-model="newDonor.blood_type_id">
                  <option disabled value="">Chọn nhóm máu</option>
                  <option v-for="bt in bloodTypeList" :key="bt.id" :value="bt.id">
                    {{ bt.display }}
                  </option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label fw-bold">Địa chỉ *</label>
                <input type="text" class="form-control" v-model="newDonor.address" />
              </div>

            </div>

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
            <button class="btn btn-danger fw-bold" @click="createNewDonor">
              <i class="bi bi-check2-circle me-1"></i> Tạo donor
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import baseRequestDoctor from "../../../core/baseRequestDoctor";

export default {
  name: "QuanLyDonor",

  data() {
    return {
      donors: [],
      filteredDonors: [],

      bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],

      bloodTypeList: [
        { id: 1, display: "A+" },
        { id: 2, display: "A-" },
        { id: 3, display: "B+" },
        { id: 4, display: "B-" },
        { id: 5, display: "AB+" },
        { id: 6, display: "AB-" },
        { id: 7, display: "O+" },
        { id: 8, display: "O-" },
      ],

      newDonor: {
        full_name: "",
        email: "",
        phone: "",
        birthday: "",
        gender: "Nam",
        address: "",
        blood_type_id: "",
      },

      filters: {
        keyword: "",
        bloodType: "",
        fromDate: "",
        toDate: "",
      },
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      baseRequestDoctor.get("doctor/donors").then((res) => {
        if (res.data?.status) {
          this.donors = res.data.data;
          this.filteredDonors = this.donors;
        }
      });
    },

    applyFilter() {
      let result = [...this.donors];

      if (this.filters.keyword.trim()) {
        const key = this.filters.keyword.toLowerCase();
        result = result.filter(
          (d) =>
            d.name.toLowerCase().includes(key) ||
            d.phone.includes(this.filters.keyword)
        );
      }

      if (this.filters.bloodType) {
        result = result.filter((d) => d.bloodType === this.filters.bloodType);
      }

      if (this.filters.fromDate) {
        result = result.filter(
          (d) => d.lastDonation !== "Chưa hiến" && d.lastDonation >= this.filters.fromDate
        );
      }

      if (this.filters.toDate) {
        result = result.filter(
          (d) => d.lastDonation !== "Chưa hiến" && d.lastDonation <= this.filters.toDate
        );
      }

      this.filteredDonors = result;
    },

    createNewDonor() {
      baseRequestDoctor
        .post("doctor/donors/create", this.newDonor)
        .then((res) => {
          if (res.data.status) {
            alert("Tạo donor thành công!");

            this.loadData();

            const modal = bootstrap.Modal.getInstance(
              document.getElementById("createDonorModal")
            );
            modal.hide();
          }
        })
        .catch(() => {
          alert("Lỗi tạo donor!");
        });
    },
  },
};
</script>

<style scoped>
.badge.bg-danger-light {
  background-color: #fde2e2 !important;
  color: #c81e1e !important;
}

.badge.bg-success-light {
  background-color: #def7ec !important;
  color: #03543f !important;
}

.badge.bg-warning-light {
  background-color: #fdf3e2 !important;
  color: #723b13 !important;
}
</style>
