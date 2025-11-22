<template>
    <div class="campaign-management-page container-fluid py-4">
        <div class="row g-4">
            <div class="col-lg-3">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h6 class="card-title mb-3">
                            <i class="bi bi-funnel-fill me-2"></i>Bộ lọc
                        </h6>
                        <div class="mb-3">
                            <label class="form-label small">Loại chiến dịch</label>
                            <select v-model="filters.type" class="form-select form-select-sm" @change="loadCampaigns">
                                <option value="">Tất cả</option>
                                <option value="0">Định kỳ</option>
                                <option value="1">Khẩn cấp</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label small">Thời gian</label>
                            <select v-model="filters.time" class="form-select form-select-sm" @change="loadCampaigns">
                                <option value="this_month">Tháng này</option>
                                <option value="last_month">Tháng trước</option>
                                <option value="this_year">Năm nay</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h6 class="card-title mb-3">
                            <i class="bi bi-graph-up me-2"></i>Thống kê nhanh
                        </h6>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Tổng chiến dịch</span>
                            <span class="fw-bold fs-5">{{ stats.totalCampaigns }}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-muted">Donor đăng ký</span>
                            <span class="fw-bold fs-5 text-danger">
                                {{ stats.totalRegistrations }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title mb-4">
                            <i class="bi bi-pencil-square me-2"></i>Tạo chiến dịch mới
                        </h5>
                        <form class="row g-3" @submit.prevent="createCampaign">
                            <div class="col-md-6">
                                <label class="form-label">Tên chiến dịch</label>
                                <input v-model="form.title" type="text" class="form-control"
                                    placeholder="Nhập tên chiến dịch" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Loại chiến dịch</label>
                                <select v-model="form.is_emergency" class="form-select">
                                    <option value="0">Định kỳ</option>
                                    <option value="1">Khẩn cấp</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Ngày bắt đầu</label>
                                <input v-model="form.start_date" type="date" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Ngày kết thúc</label>
                                <input v-model="form.end_date" type="date" class="form-control" />
                            </div>
                            <div class="col-md-12">
                                <label class="form-label">Loại địa điểm</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="custom"
                                        v-model="form.locate_type">
                                    <label class="form-check-label">Địa điểm tuỳ chỉnh</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="donation_site"
                                        v-model="form.locate_type">
                                    <label class="form-check-label">Chọn từ điểm hiến máu</label>
                                </div>
                            </div>
                            <div v-if="form.locate_type === 'custom'" class="col-md-12">
                                <label class="form-label">Địa điểm tổ chức</label>
                                <input v-model="form.location" type="text" class="form-control"
                                    placeholder="Nhập địa điểm" />
                            </div>
                            <div v-if="form.locate_type === 'donation_site'" class="col-md-12">
                                <label class="form-label">Điểm hiến máu</label>
                                <select v-model="form.donation_site_id" class="form-select">
                                    <option value="">-- Chọn điểm hiến máu --</option>
                                    <option v-for="site in donationSites" :key="site.id" :value="site.id">
                                        {{ site.name }} – {{ site.address }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label">Mô tả</label>
                                <textarea v-model="form.content" rows="3" class="form-control"
                                    placeholder="Nhập mô tả chi tiết"></textarea>
                            </div>
                            <div class="col-12 text-end">
                                <button type="submit" class="btn btn-danger">
                                    Tạo chiến dịch mới
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title mb-3"><i class="bi bi-table me-2"></i>Danh sách chiến dịch</h5>
                        <div class="table-responsive">
                            <table class="table table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th>Tên chiến dịch</th>
                                        <th>Loại</th>
                                        <th>Thời gian</th>
                                        <th>Địa điểm</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in campaigns" :key="item.id">
                                        <td class="fw-bold">{{ item.title }}</td>
                                        <td>
                                            <span :class="['badge', item.is_emergency ? 'badge-red' : 'badge-blue']">
                                                {{ item.is_emergency ? "Khẩn cấp" : "Định kỳ" }}
                                            </span>
                                        </td>
                                        <td>{{ formatRange(item.start_date, item.end_date) }}</td>
                                        <td>
                                            <span v-if="item.locate_type === 'custom'">
                                                {{ item.location }}
                                            </span>
                                            <span v-else>
                                                {{ item.donation_site?.name }}
                                            </span>
                                        </td>
                                        <td>
                                            <span :class="['badge', getStatusClass(item)]">
                                                {{ getCampaignStatus(item) }}
                                            </span>
                                        </td>
                                        <td>
                                            <router-link :to="`/doctor/campaigns/${item.id}`"
                                                class="btn btn-sm btn-outline-primary me-1">
                                                Chi tiết
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
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
    name: "CampaignManagementView",

    data() {
        return {
            campaigns: [],
            donationSites: [],

            stats: {
                totalCampaigns: 0,
                totalRegistrations: 0,
            },

            filters: {
                type: "",
                time: "this_month",
            },

            form: {
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
        this.loadCampaigns();
        this.loadDonationSites();
    },

    methods: {
        loadDonationSites() {
            baseRequestDoctor.get("/doctor/donation-sites").then((res) => {
                if (res.data.status) {
                    this.donationSites = res.data.data;
                }
            });
        },

        loadCampaigns() {
            baseRequestDoctor
                .get("/doctor/campaigns", { params: this.filters })
                .then((res) => {
                    if (res.data.status) {
                        this.campaigns = res.data.data;
                        this.stats.totalCampaigns = res.data.data.length;
                    }
                });
        },

        createCampaign() {
            if (!this.form.title || !this.form.start_date || !this.form.end_date) {
                this.$toast.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (this.form.locate_type === "custom" && !this.form.location) {
                this.$toast.error("Vui lòng nhập địa điểm!");
                return;
            }

            if (this.form.locate_type === "donation_site" && !this.form.donation_site_id) {
                this.$toast.error("Vui lòng chọn điểm hiến máu!");
                return;
            }

            baseRequestDoctor.post("/doctor/campaigns", this.form).then((res) => {
                if (res.data.status) {
                    this.$toast.success("Tạo chiến dịch thành công!");
                    this.loadCampaigns();

                    this.form = {
                        title: "",
                        content: "",
                        start_date: "",
                        end_date: "",
                        is_emergency: 0,
                        locate_type: "custom",
                        location: "",
                        donation_site_id: "",
                    };
                }
            });
        },

        formatRange(s, e) {
            if (!s || !e) return "-";
            const start = new Date(s).toLocaleDateString("vi-VN");
            const end = new Date(e).toLocaleDateString("vi-VN");
            return `${start} - ${end}`;
        },

        getCampaignStatus(item) {
            const today = new Date();
            if (new Date(item.end_date) < today) return "Đã kết thúc";
            if (new Date(item.start_date) > today) return "Sắp diễn ra";
            return "Đang diễn ra";
        },

        getStatusClass(item) {
            const s = this.getCampaignStatus(item);
            if (s === "Đã kết thúc") return "badge-gray";
            if (s === "Sắp diễn ra") return "badge-yellow";
            return "badge-green";
        },
    },
};
</script>

<style scoped>
.form-label {
    font-weight: 500;
}

.badge {
    padding: 0.5em 0.75em;
    font-size: 0.75rem;
    font-weight: 600;
}

.badge-blue {
    color: #0d6efd;
    background-color: #cfe2ff;
}

.badge-red {
    color: #dc3545;
    background-color: #f8d7da;
}

.badge-green {
    color: #198754;
    background-color: #d1e7dd;
}

.badge-gray {
    color: #6c757d;
    background-color: #e2e3e5;
}

.badge-yellow {
    color: #664d03;
    background-color: #fff3cd;
}
</style>
