<template>
  <div class="container-fluid py-4">
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1 text-danger">
          <i class="bi bi-check2-circle me-2"></i>Quản lý & Xét duyệt chiến dịch
        </h3>
        <p class="text-muted mb-0">
          Admin xét duyệt chiến dịch do bệnh viện/bác sĩ tạo, và quản lý chiến dịch toàn hệ thống.
        </p>
      </div>
      <button class="btn btn-outline-secondary" @click="reloadAll">
        <i class="bi bi-arrow-clockwise me-1"></i>Làm mới
      </button>
    </div>

    <!-- ===================== APPROVAL SECTION ===================== -->
    <div class="card shadow-sm mb-4 border-0">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <div class="fw-bold">
          <i class="bi bi-shield-check text-danger me-2"></i>Xét duyệt chiến dịch (Pending)
        </div>

        <div class="d-flex gap-2">
          <input v-model="pendingFilters.q" type="text" class="form-control form-control-sm"
            placeholder="Tìm theo tiêu đề / địa điểm..." style="width: 260px" />
          <select v-model="pendingFilters.type" class="form-select form-select-sm" style="width: 150px">
            <option value="">Tất cả loại</option>
            <option value="0">Định kỳ</option>
            <option value="1">Khẩn cấp</option>
          </select>
          <button class="btn btn-sm btn-danger" @click="fetchPending">
            <i class="bi bi-search me-1"></i>Lọc
          </button>
        </div>
      </div>

      <div class="card-body">
        <div v-if="loadingPending" class="text-center py-4">
          <div class="spinner-border text-danger"></div>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th style="width: 55px">#</th>
                <th>Chiến dịch</th>
                <th>Loại</th>
                <th>Thời gian</th>
                <th>Địa điểm</th>
                <th>Người tạo</th>
                <th class="text-end" style="width: 170px">Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(c, idx) in pendingCampaigns" :key="c.id">
                <td>{{ idx + 1 }}</td>

                <td class="fw-semibold">
                  {{ c.title }}
                  <div class="text-muted small">
                    {{ truncate(c.content, 60) }}
                  </div>
                </td>

                <td>
                  <span :class="['badge', c.is_emergency ? 'bg-danger' : 'bg-primary']">
                    {{ c.is_emergency ? "Khẩn cấp" : "Định kỳ" }}
                  </span>
                </td>

                <td>{{ formatRange(c.start_date, c.end_date) }}</td>

                <td>
                  <span v-if="c.locate_type === 'custom'">{{ c.location || "-" }}</span>
                  <span v-else>{{ c.donation_site?.name || "-" }}</span>
                </td>

                <td>{{ c.creator?.full_name || "-" }}</td>

                <td class="text-end">
                  <button class="btn btn-sm btn-primary me-2" @click="openApproveModal(c)">
                    Duyệt
                  </button>
                  <button class="btn btn-sm btn-danger" @click="openRejectModal(c)">
                    Từ chối
                  </button>
                </td>
              </tr>

              <tr v-if="pendingCampaigns.length === 0">
                <td colspan="7" class="text-center text-muted py-4">
                  Không có chiến dịch nào đang chờ duyệt.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ===================== MANAGEMENT SECTION ===================== -->
    <div class="card shadow-sm border-0">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <div class="fw-bold">
          <i class="bi bi-table text-danger me-2"></i>Quản lý chiến dịch
        </div>

        <div class="d-flex gap-2">
          <input v-model="allFilters.q" type="text" class="form-control form-control-sm"
            placeholder="Tìm theo tiêu đề / địa điểm..." style="width: 260px" />
          <select v-model="allFilters.approval_status" class="form-select form-select-sm" style="width: 160px">
            <option value="">Duyệt: Tất cả</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>

          <select v-model="allFilters.status" class="form-select form-select-sm" style="width: 160px">
            <option value="">Trạng thái: Tất cả</option>
            <option value="upcoming">Sắp diễn ra</option>
            <option value="running">Đang diễn ra</option>
            <option value="ended">Đã kết thúc</option>
          </select>

          <button class="btn btn-sm btn-danger" @click="fetchAllCampaigns">
            <i class="bi bi-search me-1"></i>Lọc
          </button>
        </div>
      </div>

      <div class="card-body">
        <div v-if="loadingAll" class="text-center py-4">
          <div class="spinner-border text-danger"></div>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Chiến dịch</th>
                <th>Loại</th>
                <th>Thời gian</th>
                <th>Địa điểm</th>
                <th class="text-center">Đăng ký</th>
                <th class="text-center">Duyệt</th>
                <th class="text-center">Trạng thái</th>
                <th class="text-end" style="width: 230px">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="c in campaigns" :key="c.id">
                <td class="fw-semibold">
                  {{ c.title }}
                  <div class="text-muted small">Tạo bởi: {{ c.creator?.full_name || "-" }}</div>
                </td>

                <td>
                  <span :class="['badge', c.is_emergency ? 'bg-danger' : 'bg-primary']">
                    {{ c.is_emergency ? "Khẩn cấp" : "Định kỳ" }}
                  </span>
                </td>

                <td>{{ formatRange(c.start_date, c.end_date) }}</td>

                <td>
                  <span v-if="c.locate_type === 'custom'">{{ c.location || "-" }}</span>
                  <span v-else>{{ c.donation_site?.name || "-" }}</span>
                </td>

                <td class="text-center">{{ c.registration_count || 0 }}</td>

                <td class="text-center">
                  <span v-if="c.approval_status === 'approved'" class="badge bg-success">Đã duyệt</span>
                  <span v-else-if="c.approval_status === 'rejected'" class="badge bg-danger"
                    :title="c.rejected_reason ? `Lý do: ${c.rejected_reason}` : 'Đã bị từ chối'">
                    Từ chối
                  </span>
                  <span v-else class="badge bg-warning text-dark">Chờ duyệt</span>
                </td>

                <td class="text-center">
                  <span v-if="c.status === 'ended'" class="badge bg-secondary">Đã kết thúc</span>
                  <span v-else-if="c.status === 'running'" class="badge bg-success">Đang diễn ra</span>
                  <span v-else class="badge bg-warning text-dark">Sắp diễn ra</span>
                </td>

                <td class="text-end">
                  <!-- bạn đổi route theo hệ thống admin của bạn -->
                  <router-link :to="`/admin/campaigns/${c.id}`" class="btn btn-sm btn-outline-primary me-2">
                    Chi tiết
                  </router-link>

                  <button class="btn btn-sm btn-warning me-2" @click="openEditModal(c)"
                    :disabled="c.status === 'ended'">
                    Sửa
                  </button>

                  <button class="btn btn-sm btn-danger" @click="openCloseModal(c)" :disabled="c.status === 'ended'">
                    Đóng
                  </button>
                </td>
              </tr>

              <tr v-if="campaigns.length === 0">
                <td colspan="8" class="text-center text-muted py-4">
                  Không có chiến dịch nào.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ===================== APPROVE MODAL ===================== -->
    <div class="modal fade" id="approveCampaignModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary">
              Xác nhận duyệt chiến dịch
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <p class="mb-2">
              Bạn có chắc chắn muốn <strong>DUYỆT</strong> chiến dịch:
            </p>
            <div class="border rounded p-3 bg-light">
              <div class="fw-bold">{{ selected?.title }}</div>
              <div class="text-muted small">{{ formatRange(selected?.start_date, selected?.end_date) }}</div>
              <div class="text-muted small">
                Địa điểm:
                <span v-if="selected?.locate_type === 'custom'">{{ selected?.location || "-" }}</span>
                <span v-else>{{ selected?.donation_site?.name || "-" }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-primary" @click="confirmApprove" :disabled="submitting">
              <i class="bi bi-check2 me-1"></i>Xác nhận duyệt
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== REJECT MODAL ===================== -->
    <div class="modal fade" id="rejectCampaignModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger">
              Xác nhận từ chối chiến dịch
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <p class="mb-2">
              Bạn có chắc chắn muốn <strong>TỪ CHỐI</strong> chiến dịch:
            </p>

            <div class="border rounded p-3 bg-light mb-3">
              <div class="fw-bold">{{ selected?.title }}</div>
              <div class="text-muted small">{{ formatRange(selected?.start_date, selected?.end_date) }}</div>
            </div>

            <label class="form-label fw-semibold">Lý do từ chối</label>
            <textarea v-model="rejectReason" rows="3" class="form-control"
              placeholder="Nhập lý do (bắt buộc)..."></textarea>
            <div class="text-muted small mt-2">
              Lý do sẽ hiển thị cho phía bệnh viện/bác sĩ.
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger" @click="confirmReject" :disabled="submitting || !rejectReason.trim()">
              <i class="bi bi-x-lg me-1"></i>Xác nhận từ chối
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== EDIT MODAL ===================== -->
    <div class="modal fade" id="editCampaignModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-warning">
              Sửa chiến dịch
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Tiêu đề</label>
                <input v-model="editForm.title" type="text" class="form-control" />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Loại chiến dịch</label>
                <select v-model="editForm.is_emergency" class="form-select">
                  <option :value="0">Định kỳ</option>
                  <option :value="1">Khẩn cấp</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Ngày bắt đầu</label>
                <input v-model="editForm.start_date" type="date" class="form-control" />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Ngày kết thúc</label>
                <input v-model="editForm.end_date" type="date" class="form-control" />
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold">Mô tả</label>
                <textarea v-model="editForm.content" rows="3" class="form-control"></textarea>
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold">Địa điểm</label>

                <div class="form-check">
                  <input class="form-check-input" type="radio" value="custom" v-model="editForm.locate_type" />
                  <label class="form-check-label">Địa điểm tùy chỉnh</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="radio" value="donation_site" v-model="editForm.locate_type" />
                  <label class="form-check-label">Theo điểm hiến máu</label>
                </div>
              </div>

              <div class="col-12" v-if="editForm.locate_type === 'custom'">
                <input v-model="editForm.location" type="text" class="form-control" placeholder="Nhập địa điểm..." />
              </div>

              <div class="col-12" v-else>
                <select v-model="editForm.donation_site_id" class="form-select">
                  <option value="">-- Chọn điểm hiến máu --</option>
                  <option v-for="s in donationSites" :key="s.id" :value="s.id">
                    {{ s.name }} – {{ s.address }}
                  </option>
                </select>
              </div>

            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-warning" @click="confirmEdit" :disabled="submitting">
              <i class="bi bi-save me-1"></i>Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== CLOSE MODAL ===================== -->
    <div class="modal fade" id="closeCampaignModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger">Xác nhận đóng chiến dịch</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <p>
              Bạn có chắc chắn muốn <strong>ĐÓNG</strong> chiến dịch:
              <strong class="text-danger">{{ selected?.title }}</strong> ?
            </p>
            <div class="text-muted small">
              Sau khi đóng, trạng thái chiến dịch sẽ là <strong>ended</strong>.
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger" @click="confirmClose" :disabled="submitting">
              <i class="bi bi-x-circle me-1"></i>Xác nhận đóng
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import baseRequestAdmin from "../../../core/baseRequestAdmin";
import * as bootstrap from "bootstrap";

export default {
  name: "CampaignManagementAdmin",

  data() {
    return {
      // lists
      pendingCampaigns: [],
      campaigns: [],
      donationSites: [],

      // filters
      pendingFilters: { q: "", type: "" },
      allFilters: { q: "", approval_status: "", status: "" },

      // states
      loadingPending: false,
      loadingAll: false,
      submitting: false,

      // modals
      approveModal: null,
      rejectModal: null,
      editModal: null,
      closeModal: null,

      // selected
      selected: null,
      rejectReason: "",

      editForm: {
        id: null,
        title: "",
        content: "",
        start_date: "",
        end_date: "",
        is_emergency: 0,
        locate_type: "custom",
        location: "",
        donation_site_id: "",
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.approveModal = new bootstrap.Modal(document.getElementById("approveCampaignModal"));
      this.rejectModal = new bootstrap.Modal(document.getElementById("rejectCampaignModal"));
      this.editModal = new bootstrap.Modal(document.getElementById("editCampaignModal"));
      this.closeModal = new bootstrap.Modal(document.getElementById("closeCampaignModal"));
    });

    this.reloadAll();
    this.loadDonationSites();
  },

  methods: {
    async reloadAll() {
      await Promise.all([this.fetchPending(), this.fetchAllCampaigns()]);
    },

    // ===================== API: DONATION SITES (for edit) =====================
    async loadDonationSites() {
      try {
        const res = await baseRequestAdmin.get("/admin/donation-sites");
        if (res.data?.status) this.donationSites = res.data.data || [];
      } catch (_) { }
    },

    // ===================== API: PENDING =====================
    async fetchPending() {
      this.loadingPending = true;
      try {
        // ✅ bạn implement backend kiểu này là đẹp:
        // GET /admin/campaigns/pending?q=&type=
        const res = await baseRequestAdmin.get("/admin/campaigns/pending", {
          params: this.pendingFilters,
        });

        if (res.data.status) this.pendingCampaigns = res.data.data || [];
        else this.$toast.error(res.data.message || "Không thể tải danh sách pending!");
      } catch (e) {
        console.error(e);
        this.$toast.error("Lỗi tải danh sách pending!");
      } finally {
        this.loadingPending = false;
      }
    },

    openApproveModal(c) {
      this.selected = c;
      this.approveModal.show();
    },

    async confirmApprove() {
      if (!this.selected?.id) return;
      this.submitting = true;

      try {
        // PATCH /admin/campaigns/:id/approve
        const res = await baseRequestAdmin.patch(`/admin/campaigns/${this.selected.id}/approve`);

        if (res.data.status) {
          this.$toast.success(res.data.message || "Đã duyệt chiến dịch!");
          this.approveModal.hide();
          await this.reloadAll();
        } else {
          this.$toast.error(res.data.message || "Không thể duyệt chiến dịch!");
        }
      } catch (e) {
        console.error(e);
        this.$toast.error("Lỗi server!");
      } finally {
        this.submitting = false;
      }
    },

    openRejectModal(c) {
      this.selected = c;
      this.rejectReason = "";
      this.rejectModal.show();
    },

    async confirmReject() {
      if (!this.selected?.id) return;
      if (!this.rejectReason.trim()) {
        this.$toast.error("Vui lòng nhập lý do từ chối!");
        return;
      }

      this.submitting = true;

      try {
        // PATCH /admin/campaigns/:id/reject { reason }
        const res = await baseRequestAdmin.patch(
          `/admin/campaigns/${this.selected.id}/reject`,
          { reason: this.rejectReason.trim() }
        );

        if (res.data.status) {
          this.$toast.success(res.data.message || "Đã từ chối chiến dịch!");
          this.rejectModal.hide();
          await this.reloadAll();
        } else {
          this.$toast.error(res.data.message || "Không thể từ chối!");
        }
      } catch (e) {
        console.error(e);
        this.$toast.error("Lỗi server!");
      } finally {
        this.submitting = false;
      }
    },

    // ===================== API: ALL CAMPAIGNS =====================
    async fetchAllCampaigns() {
      this.loadingAll = true;

      try {
        // ✅ bạn implement backend kiểu này:
        // GET /admin/campaigns?q=&approval_status=&status=
        const res = await baseRequestAdmin.get("/admin/campaigns", {
          params: this.allFilters,
        });

        if (res.data.status) this.campaigns = res.data.data || [];
        else this.$toast.error(res.data.message || "Không thể tải danh sách campaigns!");
      } catch (e) {
        console.error(e);
        this.$toast.error("Lỗi tải danh sách campaigns!");
      } finally {
        this.loadingAll = false;
      }
    },

    // ===================== EDIT =====================
    openEditModal(c) {
      this.selected = c;
      this.editForm = {
        id: c.id,
        title: c.title || "",
        content: c.content || "",
        start_date: this.toDateInput(c.start_date),
        end_date: this.toDateInput(c.end_date),
        is_emergency: c.is_emergency ? 1 : 0,
        locate_type: c.locate_type || "custom",
        location: c.location || "",
        donation_site_id: c.donation_site_id || "",
      };
      this.editModal.show();
    },

    async confirmEdit() {
      if (!this.editForm.id) return;

      // validate cơ bản
      if (!this.editForm.title || !this.editForm.start_date || !this.editForm.end_date) {
        this.$toast.error("Thiếu tiêu đề hoặc ngày!");
        return;
      }
      if (this.editForm.locate_type === "custom" && !this.editForm.location) {
        this.$toast.error("Vui lòng nhập địa điểm!");
        return;
      }
      if (this.editForm.locate_type === "donation_site" && !this.editForm.donation_site_id) {
        this.$toast.error("Vui lòng chọn điểm hiến máu!");
        return;
      }

      this.submitting = true;

      try {
        // PUT /admin/campaigns/:id
        const payload = { ...this.editForm };
        const res = await baseRequestAdmin.put(`/admin/campaigns/${this.editForm.id}`, payload);

        if (res.data.status) {
          this.$toast.success(res.data.message || "Cập nhật chiến dịch thành công!");
          this.editModal.hide();
          await this.fetchAllCampaigns();
        } else {
          this.$toast.error(res.data.message || "Không thể cập nhật!");
        }
      } catch (e) {
        console.error(e);
        this.$toast.error("Lỗi server!");
      } finally {
        this.submitting = false;
      }
    },

    // ===================== CLOSE =====================
    openCloseModal(c) {
      this.selected = c;
      this.closeModal.show();
    },

    async confirmClose() {
      if (!this.selected?.id) return;
      this.submitting = true;

      try {
        // PATCH /admin/campaigns/:id/close
        const res = await baseRequestAdmin.patch(`/admin/campaigns/${this.selected.id}/close`);

        if (res.data.status) {
          this.$toast.success(res.data.message || "Đã đóng chiến dịch!");
          this.closeModal.hide();
          await this.fetchAllCampaigns();
        } else {
          this.$toast.error(res.data.message || "Không thể đóng chiến dịch!");
        }
      } catch (e) {
        console.error(e);
        this.$toast.error("Lỗi server!");
      } finally {
        this.submitting = false;
      }
    },

    // ===================== UTILS =====================
    truncate(s, n = 80) {
      if (!s) return "";
      return s.length > n ? s.slice(0, n) + "..." : s;
    },

    toDateInput(d) {
      if (!d) return "";
      const date = new Date(d);
      if (Number.isNaN(date.getTime())) return "";
      return date.toISOString().slice(0, 10);
    },

    formatRange(s, e) {
      if (!s || !e) return "-";
      return `${new Date(s).toLocaleDateString("vi-VN")} - ${new Date(e).toLocaleDateString("vi-VN")}`;
    },
  },
};
</script>

<style scoped>
.table th {
  font-weight: 600;
}
</style>
