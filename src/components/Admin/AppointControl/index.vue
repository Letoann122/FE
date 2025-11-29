<template>
  <div class="container-fluid py-4">
    <!-- HEADER -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <div>
        <h3 class="fw-bold mb-1">
          <i class="bi bi-diagram-3 me-2 text-danger"></i>Appointment Control Center
        </h3>
        <div class="text-muted">Điều phối lịch hẹn toàn hệ thống </div>
      </div>


    </div>

    <!-- FILTERS -->
    <div class="card border-0 shadow-sm rounded-4 mb-3">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-md-4">
            <label class="form-label small">Keyword (tên / SĐT / mã)</label>
            <input type="text" class="form-control" v-model="filters.keyword"
              placeholder="VD: AP-10001, 0912..., Nguyễn..." @keyup.enter="applyFilters" />
          </div>

          <div class="col-md-2">
            <label class="form-label small">Trạng thái</label>
            <select class="form-select" v-model="filters.status">
              <option value="">Tất cả</option>
              <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <div class="col-md-2">
            <label class="form-label small">Site</label>
            <select class="form-select" v-model.number="filters.siteId">
              <option :value="0">Tất cả</option>
              <option v-for="s in sites" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>

          <div class="col-md-2">
            <label class="form-label small">Khung giờ</label>
            <select class="form-select" v-model="filters.slot">
              <option value="">Tất cả</option>
              <option v-for="sl in slotOptions" :key="sl" :value="sl">{{ sl }}</option>
            </select>
          </div>

         
          <div class="col-md-2">
            <label class="form-label small">Ngày hẹn</label>
            <input type="date" class="form-control" v-model="filters.date" />
          </div>

         

        
        </div>

        <hr class="my-4" />

        <!-- BULK ACTION BAR -->
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div class="d-flex flex-wrap align-items-center gap-2">
            <span class="badge text-bg-light">
              Tổng: <b>{{ filtered.length }}</b> lịch
            </span>
            

            <button class="btn btn-outline-secondary btn-sm" @click="clearSelection" :disabled="!selectedIds.length">
              Bỏ chọn
            </button>
          </div>

          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-outline-primary" :disabled="!selectedIds.length" @click="openBulkApprove">
              <i class="bi bi-check2-circle me-2"></i>Duyệt hàng loạt
            </button>



            <button class="btn btn-outline-danger" :disabled="!selectedIds.length" @click="openBulkCancel">
              <i class="bi bi-x-circle me-2"></i>Huỷ hàng loạt
            </button>

            <button class="btn btn-outline-secondary" :disabled="!selectedIds.length" @click="openBulkNotify">
              <i class="bi bi-bell me-2"></i>Gửi thông báo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- TABLE -->
    <div class="card border-0 shadow-sm rounded-4">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th style="width: 44px;">
                  <input type="checkbox" class="form-check-input" :checked="allChecked" @change="toggleAll($event)" />
                </th>
                <th>Mã lịch</th>
                <th>Donor</th>
                <th>SĐT</th>
                <th>Nhóm máu</th>
                <th>Site</th>
                <th>Slot</th>
                <th>Ngày hẹn</th>
                <th>Trạng thái</th>
                <th>Người duyệt (BS)</th>
                <th>created_at</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="a in paged" :key="a.id">
                <td>
                  <input type="checkbox" class="form-check-input" :checked="selectedMap[a.id] === true"
                    @change="toggleOne(a.id, $event)" />
                </td>

                <td class="fw-semibold">{{ a.code }}</td>

                <td>
                  <div class="fw-semibold">{{ a.donor }}</div>
                  <div class="small text-muted">{{ a.email }}</div>
                </td>

                <td>{{ a.phone }}</td>

                <td>
                  <span class="badge text-bg-danger rounded-pill">{{ a.blood }}</span>
                </td>

                <td>{{ siteName(a.siteId) }}</td>
                <td>{{ a.slot }}</td>
                <td>{{ a.date }}</td>

                <td>
                  <span class="badge rounded-pill" :class="statusBadge(a.status)">
                    {{ a.status }}
                  </span>
                </td>

                <td>
                  <span v-if="a.doctorId" class="badge text-bg-light">{{ doctorName(a.doctorId) }}</span>
                  <span v-else class="text-muted small fst-italic">—</span>
                </td>

                <td class="text-muted small">{{ a.createdAt }}</td>

              
              </tr>

              <tr v-if="!filtered.length">
                <td colspan="12" class="text-center text-muted py-3">Không có dữ liệu</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2">
          <div class="text-muted small">
            Trang {{ page }} / {{ totalPages }} • {{ perPage }} dòng/trang
          </div>

          <div class="btn-group">
            <button class="btn btn-outline-secondary" :disabled="page <= 1" @click="page--">Trước</button>
            <button class="btn btn-outline-secondary" :disabled="page >= totalPages" @click="page++">Sau</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========= MODALS ========= -->

    <!-- Override modal -->
    <div class="modal fade" id="overrideModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-shield-lock me-2 text-danger"></i>Override trạng thái (bắt buộc reason)
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-warning mb-3">
              Admin override sẽ được log + bắt buộc lý do (fake).
            </div>

            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label fw-bold">Mã lịch</label>
                <input class="form-control" :value="current?.code || ''" disabled />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Trạng thái mới</label>
                <select class="form-select" v-model="overrideForm.status">
                  <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Doctor (nếu cần)</label>
                <select class="form-select" v-model.number="overrideForm.doctorId">
                  <option :value="0">—</option>
                  <option v-for="d in doctors" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label fw-bold">Reason *</label>
                <textarea class="form-control" rows="3" v-model="overrideForm.reason"
                  placeholder="Nhập lý do override..."></textarea>
              </div>

              <div class="col-12">
                <div class="small text-muted">
                  Gợi ý: “Duyệt khẩn cấp”, “Fix sai slot”, “Theo yêu cầu trưởng khoa”...
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger fw-bold" @click="submitOverride">
              <i class="bi bi-check2-circle me-2"></i>Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reassign modal -->
    <div class="modal fade" id="reassignModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-arrow-left-right me-2 text-danger"></i>Re-assign (site/slot/doctor) + check capacity
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-info mb-3">
              Demo check capacity: nếu vượt capacity sẽ không cho apply.
            </div>

            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label fw-bold">Áp dụng cho</label>
                <input class="form-control" :value="reassignModeLabel" disabled />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Site mới</label>
                <select class="form-select" v-model.number="reassignForm.siteId">
                  <option v-for="s in sites" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Slot mới</label>
                <select class="form-select" v-model="reassignForm.slot">
                  <option v-for="sl in slotOptions" :key="sl" :value="sl">{{ sl }}</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Ngày hẹn mới</label>
                <input type="date" class="form-control" v-model="reassignForm.date" />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Doctor mới</label>
                <select class="form-select" v-model.number="reassignForm.doctorId">
                  <option :value="0">—</option>
                  <option v-for="d in doctors" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Capacity check</label>
                <div class="p-3 bg-body-tertiary rounded-4">
                  <div class="d-flex justify-content-between">
                    <span class="text-muted">Booked</span>
                    <span class="fw-semibold">{{ previewBooked }}</span>
                  </div>
                  <div class="d-flex justify-content-between mt-1">
                    <span class="text-muted">Capacity</span>
                    <span class="fw-semibold">{{ previewCapacity }}</span>
                  </div>
                  <div class="progress mt-2" style="height: 10px;">
                    <div class="progress-bar"
                      :class="previewPercent >= 100 ? 'bg-danger' : previewPercent >= 85 ? 'bg-warning' : 'bg-success'"
                      :style="{ width: Math.min(previewPercent, 100) + '%' }"></div>
                  </div>
                  <div class="small text-muted mt-1">{{ previewPercent.toFixed(0) }}%</div>
                </div>
              </div>

              <div class="col-12">
                <label class="form-label fw-bold">Reason (khuyến nghị)</label>
                <input class="form-control" v-model="reassignForm.reason"
                  placeholder="VD: site nghỉ, donor đổi giờ..." />
              </div>

              <div class="col-12" v-if="reassignError">
                <div class="alert alert-danger mb-0">
                  {{ reassignError }}
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger fw-bold" @click="submitReassign">
              <i class="bi bi-check2-circle me-2"></i>Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reschedule modal -->
    <div class="modal fade" id="rescheduleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-clock-history me-2 text-danger"></i>Reschedule flow (đề xuất 2–3 slot)
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label fw-bold">Mã lịch</label>
                <input class="form-control" :value="current?.code || ''" disabled />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Site</label>
                <input class="form-control" :value="current ? siteName(current.siteId) : ''" disabled />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Slot hiện tại</label>
                <input class="form-control" :value="current?.slot || ''" disabled />
              </div>

              <div class="col-12">
                <div class="alert alert-info mb-0">
                  Chọn 1 slot đề xuất rồi bấm “Gửi donor xác nhận” (fake: đổi trạng thái thành
                  <b>RESCHEDULE_PENDING</b>).
                </div>
              </div>

              <div class="col-12">
                <label class="form-label fw-bold">Danh sách đề xuất</label>

                <div v-if="rescheduleSuggestions.length" class="list-group">
                  <label class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="s in rescheduleSuggestions" :key="s.key">
                    <div class="d-flex align-items-center gap-2">
                      <input class="form-check-input mt-0" type="radio" name="resSuggestion" :value="s.key"
                        v-model="rescheduleForm.selectedKey" />
                      <div>
                        <div class="fw-semibold">{{ s.date }} • {{ s.slot }}</div>
                        <div class="small text-muted">
                          {{ siteName(s.siteId) }} • còn trống: {{ s.capacity - s.booked }}
                        </div>
                      </div>
                    </div>

                    <span class="badge rounded-pill"
                      :class="s.booked >= s.capacity ? 'text-bg-danger' : 'text-bg-success'">
                      {{ s.booked }}/{{ s.capacity }}
                    </span>
                  </label>
                </div>

                <div v-else class="text-muted">
                  Không tìm được slot phù hợp (fake).
                </div>
              </div>

              <div class="col-12">
                <label class="form-label fw-bold">Nội dung gửi donor</label>
                <textarea class="form-control" rows="3" v-model="rescheduleForm.message"
                  placeholder="VD: Site bận, vui lòng chọn 1 slot trong các đề xuất..."></textarea>
              </div>

              <div class="col-12" v-if="rescheduleError">
                <div class="alert alert-danger mb-0">{{ rescheduleError }}</div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger fw-bold" @click="submitReschedule">
              <i class="bi bi-send me-2"></i>Gửi donor xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Approve modal -->
    <div class="modal fade" id="bulkApproveModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-check2-circle me-2 text-danger"></i>Duyệt hàng loạt
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="mb-2">
              Số lịch sẽ duyệt: <b>{{ selectedIds.length }}</b>
            </div>

            <label class="form-label fw-bold">Chọn bác sĩ duyệt</label>
            <select class="form-select" v-model.number="bulkApproveForm.doctorId">
              <option v-for="d in doctors" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>

            <label class="form-label fw-bold mt-3">Ghi chú</label>
            <textarea class="form-control" rows="3" v-model="bulkApproveForm.note"
              placeholder="Ghi chú (tuỳ chọn)"></textarea>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger fw-bold" @click="submitBulkApprove">
              Duyệt
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Cancel modal -->
    <div class="modal fade" id="bulkCancelModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-x-circle me-2 text-danger"></i>Huỷ hàng loạt (site đóng)
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-warning">
              Những lịch này sẽ chuyển trạng thái <b>CANCELLED</b>.
            </div>

            <div class="mb-2">
              Số lịch bị huỷ: <b>{{ selectedIds.length }}</b>
            </div>

            <label class="form-label fw-bold">Lý do *</label>
            <textarea class="form-control" rows="3" v-model="bulkCancelForm.reason"
              placeholder="VD: Site đóng đột xuất..."></textarea>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger fw-bold" @click="submitBulkCancel">
              Huỷ lịch
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Notify modal -->
    <div class="modal fade" id="bulkNotifyModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-bell me-2 text-danger"></i>Gửi thông báo hàng loạt
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="mb-2">
              Số lịch nhận thông báo: <b>{{ selectedIds.length }}</b>
            </div>

            <label class="form-label fw-bold">Kênh</label>
            <select class="form-select" v-model="bulkNotifyForm.channel">
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="both">Email + SMS</option>
            </select>

            <label class="form-label fw-bold mt-3">Nội dung</label>
            <textarea class="form-control" rows="4" v-model="bulkNotifyForm.message"
              placeholder="Nhập nội dung thông báo..."></textarea>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger fw-bold" @click="submitBulkNotify">
              <i class="bi bi-send me-2"></i>Gửi
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Reassign modal re-use Reassign modal (mở riêng nút) -->
    <div class="modal fade" id="bulkReassignModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-arrow-left-right me-2 text-danger"></i>Re-assign hàng loạt (mở modal lớn)
            </h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-info">
              Bấm “Mở màn hình re-assign” để cấu hình site/slot/doctor + capacity check.
            </div>
            <div>
              Số lịch sẽ re-assign: <b>{{ selectedIds.length }}</b>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button class="btn btn-danger fw-bold" @click="jumpToReassignFromBulk">
              Mở màn hình re-assign
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* Prototype: fake data, no API */
export default {
  name: "AdminAppointmentControlCenter",

  data() {
    return {
      sites: [
        { id: 1, name: "BV Chợ Rẫy - Điểm A" },
        { id: 2, name: "BV 115 - Điểm B" },
        { id: 3, name: "TT Hiến Máu - Điểm C" },
      ],
      doctors: [
        { id: 11, name: "BS. Nguyễn Minh" },
        { id: 12, name: "BS. Trần Huy" },
        { id: 13, name: "BS. Lê Khang" },
      ],
      slotOptions: ["07:00-08:00", "08:00-09:00", "09:00-10:00", "13:00-14:00", "14:00-15:00"],
      statuses: ["PENDING", "APPROVED", "REJECTED", "NO_SHOW", "COMPLETED", "CANCELLED", "RESCHEDULE_PENDING"],

      appointments: [],
      capacityMap: {}, // key: `${siteId}|${date}|${slot}` -> capacity

      filters: {
        keyword: "",
        status: "",
        siteId: 0,
        slot: "",
        doctorId: 0,
        date: "",
      },

      selectedMap: {},
      page: 1,
      perPage: 10,

      current: null,

      // Override
      overrideForm: {
        status: "PENDING",
        doctorId: 0,
        reason: "",
      },

      // Reassign
      reassignTargets: [], // list of ids
      reassignMode: "single", // 'single' | 'bulk'
      reassignForm: {
        siteId: 1,
        slot: "07:00-08:00",
        date: "",
        doctorId: 0,
        reason: "",
      },
      reassignError: "",

      // Reschedule
      rescheduleSuggestions: [],
      rescheduleForm: {
        selectedKey: "",
        message: "",
      },
      rescheduleError: "",

      // Bulk
      bulkApproveForm: { doctorId: 11, note: "" },
      bulkCancelForm: { reason: "" },
      bulkNotifyForm: { channel: "email", message: "" },
    };
  },

  mounted() {
    this.seedData();
  },

  computed: {
    selectedIds() {
      return Object.keys(this.selectedMap)
        .filter((k) => this.selectedMap[k])
        .map((k) => Number(k));
    },

    filtered() {
      let arr = [...this.appointments];

      const kw = (this.filters.keyword || "").trim().toLowerCase();
      if (kw) {
        arr = arr.filter((a) => {
          return (
            String(a.code).toLowerCase().includes(kw) ||
            String(a.donor).toLowerCase().includes(kw) ||
            String(a.phone).includes(this.filters.keyword.trim())
          );
        });
      }

      if (this.filters.status) {
        arr = arr.filter((a) => a.status === this.filters.status);
      }

      if (this.filters.siteId) {
        arr = arr.filter((a) => a.siteId === this.filters.siteId);
      }

      if (this.filters.slot) {
        arr = arr.filter((a) => a.slot === this.filters.slot);
      }

      if (this.filters.doctorId) {
        arr = arr.filter((a) => a.doctorId === this.filters.doctorId);
      }

      if (this.filters.date) {
        arr = arr.filter((a) => a.date === this.filters.date);
      }

      // sort newest created_at
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return arr;
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.filtered.length / this.perPage));
    },

    paged() {
      const start = (this.page - 1) * this.perPage;
      return this.filtered.slice(start, start + this.perPage);
    },

    allChecked() {
      if (!this.paged.length) return false;
      return this.paged.every((a) => this.selectedMap[a.id] === true);
    },

    reassignModeLabel() {
      return this.reassignMode === "bulk" ? `Bulk (${this.reassignTargets.length} lịch)` : (this.current?.code || "—");
    },

    previewCapacity() {
      return this.getCapacity(this.reassignForm.siteId, this.reassignForm.date, this.reassignForm.slot);
    },

    previewBooked() {
      // booked hiện tại + số lịch sẽ move vào (trừ những lịch đang ở đúng slot đó)
      const baseBooked = this.getBooked(this.reassignForm.siteId, this.reassignForm.date, this.reassignForm.slot);

      const moveIn = this.reassignTargets.length;
      let alreadyThere = 0;

      for (const id of this.reassignTargets) {
        const a = this.appointments.find((x) => x.id === id);
        if (!a) continue;
        if (a.siteId === this.reassignForm.siteId && a.date === this.reassignForm.date && a.slot === this.reassignForm.slot) {
          alreadyThere++;
        }
      }

      return baseBooked + (moveIn - alreadyThere);
    },

    previewPercent() {
      const cap = this.previewCapacity || 1;
      return (this.previewBooked / cap) * 100;
    },
  },

  watch: {
    filtered() {
      // reset page nếu lọc làm page vượt
      if (this.page > this.totalPages) this.page = 1;
    },
  },

  methods: {
    applyFilters() {
      this.page = 1;
    },

    toggleOne(id, e) {
      this.selectedMap[id] = e.target.checked;
    },

    toggleAll(e) {
      const checked = e.target.checked;
      for (const a of this.paged) {
        this.selectedMap[a.id] = checked;
      }
    },

    clearSelection() {
      this.selectedMap = {};
    },

    // === UI helpers
    siteName(id) {
      return this.sites.find((x) => x.id === id)?.name || "N/A";
    },
    doctorName(id) {
      return this.doctors.find((x) => x.id === id)?.name || "—";
    },
    statusBadge(status) {
      if (status === "PENDING") return "text-bg-warning";
      if (status === "APPROVED") return "text-bg-success";
      if (status === "REJECTED") return "text-bg-secondary";
      if (status === "NO_SHOW") return "text-bg-danger";
      if (status === "COMPLETED") return "text-bg-success";
      if (status === "CANCELLED") return "text-bg-danger";
      if (status === "RESCHEDULE_PENDING") return "text-bg-primary";
      return "text-bg-light";
    },

    // === Fake data
    todayStr() {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },
    addDays(dateStr, n) {
      const d = new Date(dateStr);
      d.setDate(d.getDate() + n);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },
    rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    pick(arr) {
      return arr[this.rand(0, arr.length - 1)];
    },
    fakeName() {
      const a = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Võ", "Đặng"];
      const b = ["Văn", "Thị", "Minh", "Hữu", "Gia", "Thanh", "Quang", "Ngọc"];
      const c = ["An", "Bình", "Châu", "Duy", "Hà", "Huy", "Khang", "Linh", "Mai", "Nam", "Phúc", "Tú"];
      return `${this.pick(a)} ${this.pick(b)} ${this.pick(c)}`;
    },

    seedData() {
      this.clearSelection();
      this.page = 1;

      // capacityMap cho 10 ngày
      const base = this.todayStr();
      const cap = {};
      for (let i = 0; i < 10; i++) {
        const date = this.addDays(base, i);
        for (const s of this.sites) {
          for (const slot of this.slotOptions) {
            cap[`${s.id}|${date}|${slot}`] = this.rand(8, 14);
          }
        }
      }
      this.capacityMap = cap;

      const statuses = ["PENDING", "APPROVED", "REJECTED", "NO_SHOW", "COMPLETED"];
      const list = [];

      for (let i = 1; i <= 45; i++) {
        const siteId = this.pick(this.sites).id;
        const slot = this.pick(this.slotOptions);
        const date = this.addDays(base, this.rand(0, 6));
        const bloods = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
        let status = this.pick(statuses);

        const r = Math.random();
        if (r < 0.30) status = "PENDING";
        else if (r < 0.55) status = "APPROVED";
        else if (r < 0.70) status = "COMPLETED";
        else if (r < 0.85) status = "REJECTED";
        else status = "NO_SHOW";

        const doctorId = status === "APPROVED" || status === "COMPLETED" ? this.pick(this.doctors).id : 0;

        const created = new Date(date);
        created.setDate(created.getDate() - this.rand(0, 3));
        created.setHours(this.rand(0, 23), this.rand(0, 59), 0, 0);

        list.push({
          id: i,
          code: `AP-${10000 + i}`,
          donor: this.fakeName(),
          email: `donor${10000 + i}@mail.com`,
          phone: `0${this.rand(90, 99)}${this.rand(1000000, 9999999)}`,
          blood: this.pick(bloods),
          siteId,
          slot,
          date,
          status,
          doctorId,
          createdAt: created.toISOString().slice(0, 19).replace("T", " "),
          adminNote: "",
        });
      }

      // set filter date default
      this.filters.date = "";
      this.appointments = list;

    },

    // === Capacity helpers
    getCapacity(siteId, date, slot) {
      if (!siteId || !date || !slot) return 0;
      return this.capacityMap[`${siteId}|${date}|${slot}`] || 0;
    },

    getBooked(siteId, date, slot) {
      return this.appointments.filter((a) => a.siteId === siteId && a.date === date && a.slot === slot && a.status !== "CANCELLED").length;
    },

    // ===== single actions
    openOverride(a) {
      this.current = a;
      this.overrideForm = {
        status: a.status,
        doctorId: a.doctorId || 0,
        reason: "",
      };
      this.showModal("overrideModal");
    },

    submitOverride() {
      if (!this.current) return;
      const reason = (this.overrideForm.reason || "").trim();
      if (!reason) {
        this.$toast?.error?.("Override bắt buộc nhập reason!");
        return;
      }

      const idx = this.appointments.findIndex((x) => x.id === this.current.id);
      if (idx === -1) return;

      this.appointments[idx].status = this.overrideForm.status;
      this.appointments[idx].doctorId = this.overrideForm.doctorId || 0;
      this.appointments[idx].adminNote = `OVERRIDE: ${reason}`;

      this.hideModal("overrideModal");
      this.$toast?.success?.(`Đã override ${this.current.code}`);
    },

    openReassign(a) {
      this.current = a;
      this.reassignMode = "single";
      this.reassignTargets = [a.id];
      this.reassignError = "";

      this.reassignForm = {
        siteId: a.siteId,
        slot: a.slot,
        date: a.date,
        doctorId: a.doctorId || 0,
        reason: "",
      };

      this.showModal("reassignModal");
    },

    openReschedule(a) {
      this.current = a;
      this.rescheduleError = "";
      this.rescheduleForm = {
        selectedKey: "",
        message: `Chào bạn, do lịch tại site đang bận, vui lòng chọn 1 khung giờ đề xuất để xác nhận lịch hiến máu. Xin cảm ơn!`,
      };

      this.rescheduleSuggestions = this.buildSuggestions(a, 3);
      if (this.rescheduleSuggestions.length) this.rescheduleForm.selectedKey = this.rescheduleSuggestions[0].key;

      this.showModal("rescheduleModal");
    },

    submitReschedule() {
      if (!this.current) return;

      const key = this.rescheduleForm.selectedKey;
      if (!key) {
        this.rescheduleError = "Vui lòng chọn 1 slot đề xuất.";
        return;
      }

      const picked = this.rescheduleSuggestions.find((x) => x.key === key);
      if (!picked) return;

      // Fake: set status + attach note
      const idx = this.appointments.findIndex((x) => x.id === this.current.id);
      if (idx === -1) return;

      this.appointments[idx].status = "RESCHEDULE_PENDING";
      this.appointments[idx].adminNote = `RESCHEDULE proposals sent. Picked: ${picked.date} ${picked.slot}`;
      // không đổi lịch ngay, chờ donor confirm (đúng tinh thần flow)

      this.hideModal("rescheduleModal");
      this.$toast?.success?.(`Đã gửi đề xuất reschedule cho ${this.current.code}`);
    },

    // ===== bulk actions
    openBulkApprove() {
      if (!this.selectedIds.length) return;
      this.bulkApproveForm = { doctorId: this.doctors[0]?.id || 0, note: "" };
      this.showModal("bulkApproveModal");
    },

    submitBulkApprove() {
      const doctorId = this.bulkApproveForm.doctorId || 0;
      for (const id of this.selectedIds) {
        const a = this.appointments.find((x) => x.id === id);
        if (!a) continue;
        a.status = "APPROVED";
        a.doctorId = doctorId;
        if (this.bulkApproveForm.note.trim()) a.adminNote = `BULK APPROVE: ${this.bulkApproveForm.note.trim()}`;
      }
      this.hideModal("bulkApproveModal");
      this.$toast?.success?.("Đã duyệt hàng loạt!");
      this.clearSelection();
    },

    openBulkCancel() {
      if (!this.selectedIds.length) return;
      this.bulkCancelForm = { reason: "" };
      this.showModal("bulkCancelModal");
    },

    submitBulkCancel() {
      const reason = (this.bulkCancelForm.reason || "").trim();
      if (!reason) {
        this.$toast?.error?.("Huỷ hàng loạt bắt buộc nhập lý do!");
        return;
      }
      for (const id of this.selectedIds) {
        const a = this.appointments.find((x) => x.id === id);
        if (!a) continue;
        a.status = "CANCELLED";
        a.adminNote = `BULK CANCEL: ${reason}`;
      }
      this.hideModal("bulkCancelModal");
      this.$toast?.success?.("Đã huỷ hàng loạt!");
      this.clearSelection();
    },

    openBulkNotify() {
      if (!this.selectedIds.length) return;
      this.bulkNotifyForm = { channel: "email", message: "" };
      this.showModal("bulkNotifyModal");
    },

    submitBulkNotify() {
      const msg = (this.bulkNotifyForm.message || "").trim();
      if (!msg) {
        this.$toast?.error?.("Vui lòng nhập nội dung thông báo!");
        return;
      }
      // Fake send
      this.hideModal("bulkNotifyModal");
      this.$toast?.success?.(`Đã gửi thông báo (${this.bulkNotifyForm.channel}) cho ${this.selectedIds.length} lịch!`);
      this.clearSelection();
    },

    openBulkReassign() {
      if (!this.selectedIds.length) return;
      this.showModal("bulkReassignModal");
    },

    jumpToReassignFromBulk() {
      this.hideModal("bulkReassignModal");

      this.current = null;
      this.reassignMode = "bulk";
      this.reassignTargets = [...this.selectedIds];
      this.reassignError = "";

      // default: lấy theo lịch đầu tiên cho tiện
      const first = this.appointments.find((x) => x.id === this.reassignTargets[0]);
      const baseDate = first?.date || this.todayStr();

      this.reassignForm = {
        siteId: first?.siteId || this.sites[0].id,
        slot: first?.slot || this.slotOptions[0],
        date: baseDate,
        doctorId: first?.doctorId || 0,
        reason: "",
      };

      this.showModal("reassignModal");
    },

    submitReassign() {
      this.reassignError = "";

      if (!this.reassignForm.siteId || !this.reassignForm.date || !this.reassignForm.slot) {
        this.reassignError = "Vui lòng chọn đủ site / date / slot.";
        return;
      }

      const cap = this.getCapacity(this.reassignForm.siteId, this.reassignForm.date, this.reassignForm.slot);
      if (!cap) {
        this.reassignError = "Không có capacity cho slot này (fake).";
        return;
      }

      const bookedAfter = this.previewBooked;
      if (bookedAfter > cap) {
        this.reassignError = `Vượt capacity: booked_after=${bookedAfter} > capacity=${cap}.`;
        return;
      }

      const note = (this.reassignForm.reason || "").trim();
      for (const id of this.reassignTargets) {
        const a = this.appointments.find((x) => x.id === id);
        if (!a) continue;
        a.siteId = this.reassignForm.siteId;
        a.slot = this.reassignForm.slot;
        a.date = this.reassignForm.date;
        a.doctorId = this.reassignForm.doctorId || 0;
        if (note) a.adminNote = `REASSIGN: ${note}`;
      }

      this.hideModal("reassignModal");
      this.$toast?.success?.(`Đã re-assign ${this.reassignTargets.length} lịch!`);
      this.clearSelection();
    },

    // suggestions: tìm slot/date còn trống
    buildSuggestions(a, n) {
      const out = [];
      const baseDate = a.date;
      const candidatesDates = [baseDate, this.addDays(baseDate, 1), this.addDays(baseDate, 2)];
      const candidatesSlots = this.slotOptions;

      for (const d of candidatesDates) {
        for (const sl of candidatesSlots) {
          const cap = this.getCapacity(a.siteId, d, sl);
          if (!cap) continue;
          const booked = this.getBooked(a.siteId, d, sl);
          if (booked < cap) {
            const key = `${a.siteId}|${d}|${sl}`;
            out.push({ key, siteId: a.siteId, date: d, slot: sl, booked, capacity: cap });
          }
          if (out.length >= n) return out;
        }
      }
      return out;
    },

    // bootstrap modal helpers
    showModal(id) {
      const el = document.getElementById(id);
      if (!el || typeof bootstrap === "undefined") return;
      const inst = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
      inst.show();
    },
    hideModal(id) {
      const el = document.getElementById(id);
      if (!el || typeof bootstrap === "undefined") return;
      const inst = bootstrap.Modal.getInstance(el);
      inst?.hide?.();
    },
  },
};
</script>

<style scoped>
</style>
