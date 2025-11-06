<template>
    <div class="campaign-management-page">
        <div class="row g-4">
            <div class="col-lg-3">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h6 class="card-title mb-3">
                            <i class="bi bi-funnel-fill me-2"></i>Bộ lọc
                        </h6>
                        <div class="mb-3">
                            <label for="campaignTypeFilter" class="form-label small">Loại chiến dịch</label>
                            <select id="campaignTypeFilter" class="form-select form-select-sm">
                                <option selected>Tất cả</option>
                                <option value="periodic">Định kỳ</option>
                                <option value="emergency">Khẩn cấp</option>
                            </select>
                        </div>
                        <div>
                            <label for="timeFilter" class="form-label small">Thời gian</label>
                            <select id="timeFilter" class="form-select form-select-sm">
                                <option selected>Tháng này</option>
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
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted">Tổng chiến dịch</span>
                            <span class="fw-bold fs-5">24</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted">Donor đăng ký</span>
                            <span class="fw-bold fs-5 text-danger">1,247</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-9">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title mb-4"><i class="bi bi-pencil-square me-2"></i>Tạo chiến dịch mới</h5>
                        <form class="row g-3">
                            <div class="col-md-6">
                                <label for="campaignName" class="form-label">Tên chiến dịch</label>
                                <input type="text" class="form-control" id="campaignName"
                                    placeholder="Nhập tên chiến dịch">
                            </div>
                            <div class="col-md-6">
                                <label for="campaignType" class="form-label">Loại chiến dịch</label>
                                <select id="campaignType" class="form-select">
                                    <option selected>Định kỳ</option>
                                    <option>Khẩn cấp</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="startDate" class="form-label">Ngày bắt đầu</label>
                                <input type="date" class="form-control" id="startDate">
                            </div>
                            <div class="col-md-6">
                                <label for="endDate" class="form-label">Ngày kết thúc</label>
                                <input type="date" class="form-control" id="endDate">
                            </div>
                            <div class="col-md-12">
                                <label for="location" class="form-label">Địa điểm tổ chức</label>
                                <input type="text" class="form-control" id="location" placeholder="Nhập địa điểm">
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Mô tả / Ghi chú</label>
                                <textarea class="form-control" id="description" rows="3"
                                    placeholder="Nhập mô tả chi tiết"></textarea>
                            </div>
                            <div class="col-12 text-end">
                                <button type="submit" class="btn btn-danger">Tạo chiến dịch mới</button>
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
                                        <th>Đăng ký</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="campaign in campaigns" :key="campaign.id">
                                        <td class="fw-bold">{{ campaign.name }}</td>
                                        <td><span :class="['badge', campaign.typeClass]">{{ campaign.type }}</span></td>
                                        <td>{{ campaign.time }}</td>
                                        <td>{{ campaign.location }}</td>
                                        <td>{{ campaign.registrations }} người</td>
                                        <td><span :class="['badge', campaign.statusClass]">{{ campaign.status }}</span>
                                        </td>
                                        <td>
                                            <router-link :to="`/hospital/campaigns/${campaign.id}`" class="btn btn-sm btn-outline-primary me-1">Chi tiết</router-link>
                                            <a href="#" class="btn btn-sm btn-outline-primary me-1">Sửa</a>
                                            <a href="#" class="btn btn-sm btn-outline-primary me-1">Đóng</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0"><i class="bi bi-calendar-check-fill me-2"></i>Danh sách lịch hẹn
                        </h5>
                        <button class="btn btn-success btn-sm">
                            <i class="bi bi-download me-2"></i>Xuất danh sách
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th>Tên Donor</th>
                                        <th>Nhóm máu</th>
                                        <th>Ngày/Giờ hẹn</th>
                                        <th>Chiến dịch</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="appt in appointments" :key="appt.id">
                                        <td class="fw-bold">{{ appt.donorName }}</td>
                                        <td><span class="badge bg-danger-light text-danger p-2">{{ appt.bloodType
                                                }}</span></td>
                                        <td>{{ appt.dateTime }}</td>
                                        <td>{{ appt.campaign }}</td>
                                        <td><span :class="['badge', appt.statusClass]">{{ appt.status }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="card shadow-sm mt-4" style="background-color: #fef2f2; border: 1px solid #fde2e2;">
            <div class="card-body text-center py-5">
                <h3 class="fw-bold">Tổ chức chiến dịch hiến máu – Kêu gọi cộng đồng cùng hành động</h3>
                <p class="lead text-muted my-3">Mỗi giọt máu là một sự sống. Hãy tạo chiến dịch hiến máu để kết nối
                    những trái tim nhân ái.</p>
                <button class="btn btn-danger btn-lg"><i class="bi bi-droplet-half me-2"></i>Tạo chiến dịch
                    ngay</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CampaignManagementView',
    data() {
        return {
            campaigns: [
                { id: 1, name: 'Hiến máu cứu người - Tháng 9', type: 'Định kỳ', typeClass: 'badge-blue', time: '15/09 - 20/09', location: 'Bệnh viện Chợ Rẫy', registrations: 156, status: 'Đang diễn ra', statusClass: 'badge-green' },
                { id: 2, name: 'Khẩn cấp - Tai nạn giao thông', type: 'Khẩn cấp', typeClass: 'badge-red', time: '10/09 - 12/09', location: 'Bệnh viện Đà Nẵng', registrations: 82, status: 'Đã kết thúc', statusClass: 'badge-gray' },
            ],
            appointments: [
                { id: 1, donorName: 'Nguyễn Văn An', bloodType: 'O+', dateTime: '15/09/2024 - 09:00', campaign: 'Hiến máu cứu người', status: 'Xác nhận', statusClass: 'badge-blue' },
                { id: 2, donorName: 'Trần Thị Bình', bloodType: 'A+', dateTime: '15/09/2024 - 10:30', campaign: 'Hiến máu cứu người', status: 'Đã tham gia', statusClass: 'badge-green' },
                { id: 3, donorName: 'Lê Văn Cường', bloodType: 'B+', dateTime: '16/09/2024 - 14:00', campaign: 'Hiến máu cứu người', status: 'Vắng mặt', statusClass: 'badge-yellow' },
            ]
        }
    }
}
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

.bg-danger-light {
    background-color: #fde2e2 !important;
}
</style>