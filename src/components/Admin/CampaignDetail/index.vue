<template>
  <div class="container-fluid py-4" v-if="loaded">
    <h3 class="fw-bold text-danger mb-3">
      <i class="bi bi-bullseye me-2"></i>Chi tiết chiến dịch
    </h3>

    <div class="card shadow-sm border-0">
      <div class="card-body">
        <div class="fw-bold fs-5">{{ campaign.title }}</div>
        <div class="text-muted">Tạo bởi: {{ campaign.creator?.full_name || "-" }}</div>
        <div class="mt-2">
          <span class="badge me-2" :class="campaign.is_emergency ? 'bg-danger' : 'bg-primary'">
            {{ campaign.is_emergency ? "Khẩn cấp" : "Định kỳ" }}
          </span>
          <span class="badge bg-success" v-if="campaign.approval_status==='approved'">Đã duyệt</span>
          <span class="badge bg-warning text-dark" v-else-if="campaign.approval_status==='pending'">Chờ duyệt</span>
          <span class="badge bg-danger" v-else>Từ chối</span>
        </div>

        <div class="mt-3">
          <div><b>Thời gian:</b> {{ fmt(campaign.start_date) }} - {{ fmt(campaign.end_date) }}</div>
          <div><b>Địa điểm:</b>
            <span v-if="campaign.locate_type==='custom'">{{ campaign.location || "-" }}</span>
            <span v-else>{{ campaign.donation_site?.name || "-" }}</span>
          </div>
          <div class="mt-2"><b>Mô tả:</b> {{ campaign.content || "Không có" }}</div>
        </div>

        <div class="mt-3">
          <router-link to="/admin/create-campaign" class="btn btn-secondary btn-sm">
            Quay lại
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-danger"></div>
  </div>
</template>

<script>
import baseRequestAdmin from "../../../core/baseRequestAdmin";

export default {
  name: "AdminCampaignDetailView",
  data() {
    return { loaded: false, campaign: {} };
  },
  async mounted() {
    const id = this.$route.params.id;
    const res = await baseRequestAdmin.get(`/admin/campaigns/${id}`);
    if (res.data?.status) this.campaign = res.data.data;
    this.loaded = true;
  },
  methods: {
    fmt(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("vi-VN");
    },
  },
};
</script>
