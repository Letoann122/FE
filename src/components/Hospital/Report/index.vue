<template>
    <div class="report-page-wrapper">
        <div class="mb-4">
            <h2 class="fw-bold">Báo cáo & Thống kê</h2>
            <p class="text-muted">Theo dõi chi tiết tình hình kho máu, hoạt động donor và hiệu quả chiến dịch.</p>
        </div>

        <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 class="card-title fw-bold mb-0"><i class="bi bi-graph-up me-2"></i>Biểu đồ nhập - xuất máu</h5>
                <div>
                    <button class="btn btn-sm btn-danger">7 ngày</button>
                    <button class="btn btn-sm btn-outline-secondary ms-1">30 ngày</button>
                    <button class="btn btn-sm btn-outline-secondary ms-1">3 tháng</button>
                </div>
            </div>
            <div class="card-body p-4">
                <p class="text-muted small">Biểu đồ thể hiện số lượng đơn vị máu nhập vào và xuất ra trong 7 ngày qua.</p>
                <div class="chart-placeholder text-center py-5 bg-light rounded">
                                        <p class="text-muted">Biểu Đồ Đường (Line Chart) </p>
                </div>
            </div>
        </div>

        <div class="row g-4 mb-4">
            <div class="col-lg-5">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white py-3">
                        <h5 class="card-title fw-bold mb-0"><i class="bi bi-pie-chart-fill me-2"></i>Thống kê Donor</h5>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-around">
                        <div class="chart-placeholder text-center py-4 bg-light rounded mb-3">
                                                         <p class="text-muted">Biểu Đồ Tròn (Pie Chart)</p>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="p-3 bg-light rounded text-center">
                                    <h4 class="fw-bold mb-1">1,247</h4>
                                    <small class="text-muted">Donor tích cực</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="p-3 bg-light rounded text-center">
                                    <h4 class="fw-bold mb-1">89%</h4>
                                    <small class="text-muted">Tỷ lệ tham gia</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-7">
                <div class="card shadow-sm border-0 h-100">
                     <div class="card-header bg-white py-3">
                        <h5 class="card-title fw-bold mb-0"><i class="bi bi-clipboard-data-fill me-2"></i>Hiệu quả Chiến dịch</h5>
                    </div>
                    <div class="card-body">
                        <div v-for="campaign in campaigns" :key="campaign.name" class="mb-3">
                            <div class="d-flex justify-content-between">
                                <span class="fw-bold">{{ campaign.name }}</span>
                                <span class="fw-bold" :class="campaign.value > 90 ? 'text-success' : 'text-warning'">{{ campaign.value }}%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar" :class="campaign.value > 90 ? 'bg-success' : 'bg-warning'" role="progressbar" :style="{ width: campaign.value + '%' }"></div>
                            </div>
                            <small class="text-muted">{{ campaign.dates }}</small>
                        </div>
                         <div class="chart-placeholder text-center py-4 bg-light rounded mt-4">
                                                         <p class="text-muted">Biểu Đồ Cột (Bar Chart)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-white py-3">
                <h5 class="card-title fw-bold mb-0"><i class="bi bi-exclamation-triangle-fill me-2 text-danger"></i>Báo cáo Cảnh báo</h5>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <div v-for="warning in warnings" :key="warning.group" class="col-md-3">
                        <div class="alert-box" :class="warning.class">
                            <div class="d-flex justify-content-between">
                                <span class="fw-bold">{{ warning.group }}</span>
                                <span class="text-muted">{{ warning.quantity }}</span>
                            </div>
                            <p class="small mb-1">{{ warning.status }}</p>
                            <div class="progress" style="height: 5px;">
                                <div class="progress-bar" :style="{ width: warning.level + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body d-flex justify-content-between align-items-center">
                <h5 class="fw-bold mb-0"><i class="bi bi-download me-2"></i>Xuất dữ liệu</h5>
                <div class="d-flex align-items-center gap-2">
                    <select class="form-select" style="width: auto;">
                        <option selected>Khoảng thời gian: 7 ngày qua</option>
                        <option>30 ngày qua</option>
                        <option>Tháng này</option>
                    </select>
                    <button class="btn btn-success"><i class="bi bi-file-earmark-excel-fill me-2"></i>Xuất Excel</button>
                    <button class="btn btn-danger"><i class="bi bi-file-earmark-pdf-fill me-2"></i>Xuất PDF</button>
                </div>
            </div>
        </div>
        
        </div>
</template>

<script>
export default {
    name: 'ReportView',
    data() {
        return {
            campaigns: [
                { name: 'Chiến dịch Xuân 2024', value: 92, dates: '15/01 - 18/01' },
                { name: 'Hiến máu Tình nguyện', value: 78, dates: '01/02 - 10/02' },
            ],
            warnings: [
                { group: 'Nhóm O-', quantity: '12 túi (Thiếu)', status: 'Cần bổ sung cho các ca mổ', level: 20, class: 'alert-box-critical' },
                { group: 'Nhóm AB+', quantity: '28 túi (Cận thiếu)', status: 'Thấp hơn mức an toàn', level: 40, class: 'alert-box-warning' },
                { group: 'Nhóm A+', quantity: '154 túi (Đủ)', status: 'Tồn kho ổn định', level: 80, class: 'alert-box-ok' },
                { group: 'Nhóm O+', quantity: '203 túi (Đủ)', status: 'Tồn kho tốt', level: 95, class: 'alert-box-good' },
            ]
        }
    }
}
</script>

<style scoped>
.alert-box {
    padding: 1rem;
    border-radius: .5rem;
    border-left: 5px solid;
}
.alert-box-critical {
    background-color: #ffebee;
    border-color: #d32f2f;
}
.alert-box-warning {
    background-color: #fff8e1;
    border-color: #f57c00;
}
.alert-box-ok {
    background-color: #e8f5e9;
    border-color: #2e7d32;
}
.alert-box-good {
    background-color: #e3f2fd;
    border-color: #1565c0;
}
.alert-box .progress-bar {
    background-color: currentColor;
}
</style>