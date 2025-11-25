<template>
  <div class="container-fluid py-4 min-vh-100">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/Hospital/blood-inventory">Quản lý kho máu</router-link>
        </li>
        <li class="breadcrumb-item active">
          Danh sách lô — {{ typeLabel }}
        </li>
      </ol>
    </nav>

    <div class="card shadow-sm border-0 mb-4">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <div>
          <h4 class="fw-bold mb-1">Nhóm máu: {{ typeLabel }}</h4>
          <p class="text-muted mb-0">Danh sách các lô máu thuộc nhóm {{ typeLabel }}</p>
        </div>

        <div class="d-flex align-items-center">
          <select v-model="selectedStatus" class="form-select form-select-sm me-3" style="width: 170px">
            <option value="all">Tất cả</option>
            <option value="available">Còn túi</option>
            <option value="empty">Đã xuất hết</option>
            <option value="full">Đầy đủ</option>
            <option value="low">Ít máu</option>
            <option value="expiring">Sắp hết hạn</option>
            <option value="expired">Hết hạn</option>
          </select>

          <router-link class="btn btn-secondary btn-sm" to="/Hospital/blood-inventory">
            <i class="bi bi-arrow-left me-1"></i>Quay lại
          </router-link>
        </div>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>ID Lô máu</th>
                <th>Số lượng</th>
                <th>Ngày nhập</th>
                <th>Hạn sử dụng</th>
                <th class="text-center">Tình trạng</th>
                <th>Chi tiết</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="batch in filteredList" :key="batch.id">
                <td class="fw-bold">BL{{ batch.id.toString().padStart(6, "0") }}</td>

                <td>
                  {{ batch.units }} túi
                  <span v-if="Number(batch.units || 0) <= 0" class="text-muted small"> (0)</span>
                </td>

                <td>{{ formatDate(batch.donation_date) }}</td>
                <td>{{ formatDate(batch.expiry_date) }}</td>

                <td class="text-center">
                  <span class="badge rounded-pill" :class="statusBadgeClass(batch.ui_status)">
                    {{ translateStatus(batch.ui_status) }}
                  </span>
                </td>

                <td>
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="$router.push({ name: 'BloodBatchDetail', params: { id: batch.id } })"
                  >
                    Xem
                  </button>
                </td>
              </tr>

              <tr v-if="filteredList.length === 0">
                <td colspan="6" class="text-center py-3 text-muted">Không có dữ liệu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseRequestDoctor from "../../../core/baseRequestDoctor";

export default {
  name: "BloodInventoryByTypeView",

  data() {
    return {
      bloodType: "",
      selectedStatus: "all",
      rawList: [],
      loading: false,
    };
  },

  computed: {
    typeLabel() {
      return this.normalizeType(this.bloodType);
    },

    mappedList() {
      return (this.rawList || []).map((b) => ({
        ...b,
        ui_status: this.computeUiStatus(b),
      }));
    },

    filteredList() {
      const list = this.mappedList;

      if (this.selectedStatus === "all") return list;

      if (this.selectedStatus === "available") {
        return list.filter((b) => Number(b.units || 0) > 0);
      }

      if (this.selectedStatus === "empty") {
        return list.filter((b) => Number(b.units || 0) <= 0);
      }

      return list.filter((b) => b.ui_status === this.selectedStatus);
    },
  },

  mounted() {
    this.bloodType = this.$route.query.type || "";
    this.loadData();
  },

  watch: {
    "$route.query.type"(val) {
      this.bloodType = val || "";
      this.loadData();
    },
  },

  methods: {
    normalizeType(x) {
      // ✅ fix AB+ bị thành "AB " khi đọc query
      return (x || "").trim().replace(/\s+/g, "+");
    },

    async loadData() {
      const type = this.normalizeType(this.bloodType);
      if (!type) {
        this.rawList = [];
        return;
      }

      this.loading = true;
      try {
        const res = await baseRequestDoctor.post("/doctor/blood-inventory/filter", {
          bloodType: type,
          status: "all",
        });

        if (res.data.status) {
          this.rawList = res.data.data || [];
        } else {
          this.rawList = [];
          this.$toast?.info("Không tìm thấy lô máu!");
        }
      } catch (e) {
        this.$toast?.error("Lỗi tải dữ liệu!");
        this.rawList = [];
      } finally {
        this.loading = false;
      }
    },

    computeUiStatus(batch) {
      const units = Number(batch?.units || 0);
      if (units <= 0) return "empty";

      const today = this.toDate0(new Date());
      const exp = this.toDate0(batch?.expiry_date);

      if (exp && exp < today) return "expired";

      if (exp) {
        const days = (exp - today) / (1000 * 3600 * 24);
        if (days <= 3) return "expiring";
      }

      if (units < 5) return "low";
      return "full";
    },

    statusBadgeClass(ui) {
      return {
        full: "bg-success",
        low: "bg-secondary",
        expiring: "bg-warning text-dark",
        expired: "bg-danger",
        empty: "bg-secondary",
      }[ui] || "bg-secondary";
    },

    translateStatus(ui) {
      return {
        full: "Đầy đủ",
        low: "Ít máu",
        expiring: "Sắp hết hạn",
        expired: "Hết hạn",
        empty: "Đã xuất hết",
      }[ui] || "Không rõ";
    },

    toDate0(input) {
      if (!input) return null;

      const s = typeof input === "string" ? input : null;
      if (s && /^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [y, m, d] = s.split("-").map(Number);
        const dt = new Date(y, m - 1, d);
        dt.setHours(0, 0, 0, 0);
        return dt;
      }

      const dt = new Date(input);
      if (Number.isNaN(dt.getTime())) return null;
      dt.setHours(0, 0, 0, 0);
      return dt;
    },

    formatDate(date) {
      const dt = this.toDate0(date);
      return dt ? dt.toLocaleDateString("vi-VN") : "-";
    },
  },
};
</script>

<style scoped>
.breadcrumb a {
  color: #dc3545;
  text-decoration: none;
}
.breadcrumb a:hover {
  text-decoration: underline;
}
</style>
