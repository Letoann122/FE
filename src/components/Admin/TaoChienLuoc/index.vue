<template>
  <div class="container py-5">
    <!-- Tiêu đề -->
    <div class="mb-4 border-bottom pb-3">
      <h3 class="fw-bold text-danger">
        <i class="bi bi-megaphone-fill me-2"></i> Tạo Chiến Dịch Hiến Máu
      </h3>
      <p class="text-muted mb-0">
        Nhập thông tin chiến dịch và nhấn <strong>"Tạo mới"</strong> để đăng.
      </p>
    </div>

    <!-- Form tạo chiến dịch -->
    <form @submit.prevent="submitCampaign" class="bg-white p-4 rounded shadow-sm">
      <div class="mb-3">
        <label class="form-label fw-semibold">Tiêu đề chiến dịch</label>
        <input
          type="text"
          v-model="form.title"
          class="form-control"
          placeholder="VD: Chiến dịch hiến máu mùa xuân 2025"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label fw-semibold">Nội dung</label>
        <textarea
          v-model="form.content"
          rows="4"
          class="form-control"
          placeholder="Nhập mô tả chi tiết chiến dịch..."
          required
        ></textarea>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label fw-semibold">Ngày bắt đầu</label>
          <input type="date" v-model="form.start_date" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Ngày kết thúc</label>
          <input type="date" v-model="form.end_date" class="form-control" required />
        </div>
      </div>

      <div class="form-check mb-4">
        <input
          class="form-check-input"
          type="checkbox"
          id="is_emergency"
          v-model="form.is_emergency"
        />
        <label class="form-check-label" for="is_emergency">
          Đánh dấu chiến dịch <strong>khẩn cấp</strong>
        </label>
      </div>

      <div class="text-end">
        <button type="submit" class="btn btn-danger px-4">
          <i class="bi bi-plus-circle me-2"></i> Tạo Chiến Dịch
        </button>
      </div>
    </form>

    <!-- Danh sách chiến dịch -->
    <div class="mt-5">
      <h5 class="fw-bold mb-3">
        <i class="bi bi-list-ul me-2 text-danger"></i> Danh sách chiến dịch hiện có
      </h5>
      <div class="table-responsive bg-white rounded shadow-sm">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Tiêu đề</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Khẩn cấp</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, i) in campaigns" :key="i">
              <td class="fw-semibold">{{ c.title }}</td>
              <td>{{ formatDate(c.start_date) }}</td>
              <td>{{ formatDate(c.end_date) }}</td>
              <td>
                <span v-if="c.is_emergency" class="badge bg-danger">Có</span>
                <span v-else class="badge bg-secondary">Không</span>
              </td>
              <td>{{ formatDate(c.created_at) }}</td>
            </tr>

            <tr v-if="campaigns.length === 0">
              <td colspan="5" class="text-center text-muted py-4">
                Chưa có chiến dịch nào được tạo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CampaignCreate",

  data() {
    return {
      form: {
        title: "",
        content: "",
        start_date: "",
        end_date: "",
        is_emergency: false,
      },
      campaigns: [],
    };
  },

  mounted() {
    this.fetchCampaigns();
  },

  methods: {
    async fetchCampaigns() {
      try {
        const res = await axios.get("http://localhost:4000/api/campaigns");
        if (res.data.status) {
          this.campaigns = res.data.data;
        } else {
          this.$toast.error("Không thể tải danh sách chiến dịch!");
        }
      } catch (error) {
        console.error("❌ Lỗi khi tải chiến dịch:", error);
        this.$toast.error("Lỗi kết nối khi tải chiến dịch!");
      }
    },

    async submitCampaign() {
      try {
        const res = await axios.post("http://localhost:4000/api/admin/campaigns", this.form);

        if (res.data.status) {
          this.$toast.success("✅ Tạo chiến dịch thành công!");
          this.fetchCampaigns();
          this.form = {
            title: "",
            content: "",
            start_date: "",
            end_date: "",
            is_emergency: false,
          };
        } else {
          this.$toast.error(res.data.message || "⚠️ Không thể tạo chiến dịch!");
        }
      } catch (err) {
        console.error("❌ Lỗi khi tạo chiến dịch:", err);
        this.$toast.error("Lỗi kết nối đến server!");
      }
    },

    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("vi-VN");
    },
  },
};
</script>

<style scoped>
form {
  max-width: 700px;
  margin: 0 auto;
}
.table th {
  font-weight: 600;
}
</style>
