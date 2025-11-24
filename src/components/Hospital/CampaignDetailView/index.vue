<template>
  <div class="container-fluid py-4" v-if="loaded">
    <!-- TITLE -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1 text-danger">
          <i class="bi bi-bullseye me-2"></i>Chi tiết chiến dịch
        </h3>
        <p class="text-muted mb-0">Thông tin chi tiết và danh sách donor tham gia.</p>
      </div>

      <div>
        <button class="btn btn-secondary me-2" @click="$router.go(-1)">
          <i class="bi bi-arrow-left me-1"></i>Quay lại
        </button>

        <!-- ❌ Disable khi đã ended -->
        <button
          class="btn btn-warning me-2"
          @click="openEditModal"
          :disabled="isClosed"
        >
          <i class="bi bi-pencil me-1"></i>Sửa
        </button>

        <button
          class="btn btn-danger"
          @click="openCloseModal"
          v-if="!isClosed"
        >
          <i class="bi bi-x-circle me-1"></i>Đóng chiến dịch
        </button>
      </div>
    </div>

    <div class="row g-4">
      <!-- LEFT -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="fw-bold text-danger">{{ campaign.title }}</h5>
            <p class="text-muted small mb-3">
              Tạo bởi: <strong>{{ campaign.creator?.full_name }}</strong>
            </p>

            <ul class="list-group list-group-flush small">

              <li class="list-group-item d-flex justify-content-between">
                <span>Loại chiến dịch</span>
                <button class="btn btn-sm"
                        :class="campaign.is_emergency ? 'btn-danger' : 'btn-info'">
                  {{ campaign.is_emergency ? 'Khẩn cấp' : 'Định kỳ' }}
                </button>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <span>Thời gian</span>
                <strong>{{ formatRange(campaign.start_date, campaign.end_date) }}</strong>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <span>Địa điểm</span>
                <strong>
                  <span v-if="campaign.locate_type === 'custom'">
                    {{ campaign.location }}
                  </span>
                  <span v-else>
                    {{ campaign.donation_site?.name }}
                  </span>
                </strong>
              </li>

              <!-- STATUS – dùng DB -->
              <li class="list-group-item d-flex justify-content-between bg-light">
                <span>Trạng thái</span>
                <button class="btn btn-sm"
                  :class="{
                    'btn-secondary': getCampaignStatus(campaign) === 'Đã kết thúc',
                    'btn-warning': getCampaignStatus(campaign) === 'Sắp diễn ra',
                    'btn-success': getCampaignStatus(campaign) === 'Đang diễn ra'
                  }"
                >
                  {{ getCampaignStatus(campaign) }}
                </button>
              </li>

            </ul>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="col-lg-8">

        <!-- DESCRIPTION -->
        <div class="card shadow-sm mb-4 border-0">
          <div class="card-header bg-white fw-bold">
            <i class="bi bi-card-text text-danger me-2"></i>Mô tả chiến dịch
          </div>
          <div class="card-body">
            <p class="text-muted">{{ campaign.content || "Không có mô tả" }}</p>
          </div>
        </div>

        <!-- LIST -->
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white fw-bold d-flex justify-content-between">
            <span>
              <i class="bi bi-people-fill text-danger me-2"></i>Danh sách lịch hẹn
            </span>

            <button class="btn btn-success btn-sm">
              <i class="bi bi-download me-2"></i>Xuất danh sách
            </button>
          </div>

          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Donor</th>
                  <th>Số điện thoại</th>
                  <th>Nhóm máu</th>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in appointments" :key="item.id">
                  <td>{{ item.donorName }}</td>
                  <td>{{ item.donorPhone }}</td>
                  <td>{{ item.bloodType }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.time }}</td>
                  <td>
                    <span class="badge" :class="item.statusClass">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>

                <tr v-if="appointments.length === 0">
                  <td colspan="6" class="text-center text-muted py-3">
                    Chưa có lịch hẹn nào
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

    <!-- CLOSE MODAL -->
    <div class="modal fade" id="closeCampaignModal">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title text-danger">Xác nhận đóng chiến dịch</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <p>Bạn có chắc chắn muốn đóng chiến dịch này?</p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger" @click="confirmClose">Xác nhận</button>
          </div>

        </div>
      </div>
    </div>

    <!-- EDIT MODAL -->
    <div class="modal fade" id="editCampaignModal">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title text-danger">Sửa chiến dịch</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">

            <div class="mb-3">
              <label class="form-label">Tiêu đề</label>
              <input type="text" class="form-control"
                     v-model="form.title" :disabled="!canEditFull" />
            </div>

            <div class="mb-3">
              <label class="form-label">Mô tả</label>
              <textarea class="form-control" rows="3"
                        v-model="form.content"></textarea>
            </div>

            <div class="row g-3">
              <div class="col-6">
                <label class="form-label">Ngày bắt đầu</label>
                <input type="date" class="form-control"
                       v-model="form.start_date" :disabled="!canEditFull" />
              </div>

              <div class="col-6">
                <label class="form-label">Ngày kết thúc</label>
                <input type="date" class="form-control"
                       v-model="form.end_date" :disabled="!canEditFull" />
              </div>
            </div>

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-warning" @click="confirmEdit">
              <i class="bi bi-save me-1"></i>Lưu
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-danger"></div>
  </div>
</template>

<script>
import baseRequestDoctor from "../../../core/baseRequestDoctor";
import * as bootstrap from "bootstrap";

export default {
  data() {
    return {
      loaded: false,
      campaign: {},
      appointments: [],
      modalClose: null,
      modalEdit: null,
      form: {},
      canEditFull: true,
    };
  },

  mounted() {
    const id = this.$route.params.id;
    this.loadDetail(id);

    this.$nextTick(() => {
      this.modalClose = new bootstrap.Modal(
        document.getElementById("closeCampaignModal")
      );
      this.modalEdit = new bootstrap.Modal(
        document.getElementById("editCampaignModal")
      );
    });

    this.loaded = true;
  },

  computed: {
    isClosed() {
      return this.campaign.status === "ended";
    },
  },

  methods: {
    loadDetail(id) {
      baseRequestDoctor.get(`/doctor/campaigns/${id}`).then((res) => {
        if (res.data.status) this.campaign = res.data.data;
      });

      baseRequestDoctor
        .get(`/doctor/campaigns/${id}/appointments`)
        .then((res) => {
          if (res.data.status) this.appointments = res.data.data;
        });
    },

    openEditModal() {
      if (this.isClosed) {
        this.$toast.error("Chiến dịch đã đóng — không thể sửa!");
        return;
      }

      this.form = { ...this.campaign };

      const now = new Date();
      const start = new Date(this.campaign.start_date);
      this.canEditFull = start > now;

      this.modalEdit.show();
    },

    confirmEdit() {
      baseRequestDoctor
        .put(`/doctor/campaigns/${this.campaign.id}`, this.form)
        .then((res) => {
          if (res.data.status) {
            this.$toast.success("Cập nhật chiến dịch thành công!");
            this.modalEdit.hide();
            this.loadDetail(this.campaign.id);
          } else {
            this.$toast.error("Không thể cập nhật chiến dịch");
          }
        })
        .catch(() => this.$toast.error("Lỗi server!"));
    },

    openCloseModal() {
      this.modalClose.show();
    },

    confirmClose() {
      baseRequestDoctor
        .patch(`/doctor/campaigns/${this.campaign.id}/close`)
        .then((res) => {
          if (res.data.status) {
            this.$toast.success("Đã đóng chiến dịch!");
            this.modalClose.hide();
            this.loadDetail(this.campaign.id);
          } else {
            this.$toast.error(res.data.message || "Không thể đóng chiến dịch");
          }
        });
    },

    formatRange(s, e) {
      if (!s || !e) return "-";
      return (
        new Date(s).toLocaleDateString("vi-VN") +
        " - " +
        new Date(e).toLocaleDateString("vi-VN")
      );
    },

    getCampaignStatus(item) {
      if (!item || !item.status) return "";
      switch (item.status) {
        case "ended":
          return "Đã kết thúc";
        case "running":
          return "Đang diễn ra";
        case "upcoming":
        default:
          return "Sắp diễn ra";
      }
    },
  },
};
</script>
