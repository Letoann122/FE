<template>

    <div class="blood-batch-detail-wrapper">

        <nav aria-label="breadcrumb" class="mb-4">

            <ol class="breadcrumb">

                <li class="breadcrumb-item"><router-link to="/Hospital/blood-inventory">Quản lí kho máu </router-link>
                </li>

                <li class="breadcrumb-item active" aria-current="page">Chi tiết lô máu #{{ batch.id }}</li>

            </ol>

        </nav>



        <div class="d-flex justify-content-between align-items-center mb-4">

            <div>

                <h2 class="fw-bold mb-1">Chi tiết Lô máu #{{ batch.id }}</h2>

                <p class="text-muted">Thông tin chi tiết và lộ trình của lô máu trong kho.</p>

            </div>

            <div>

                <button class="btn btn-outline-secondary me-2"><i class="bi bi-printer-fill me-2"></i>In phiếu</button>

                <button class="btn btn-danger"><i class="bi bi-pencil-fill me-2"></i>Chỉnh sửa</button>

            </div>

        </div>



        <div class="row g-4">

            <div class="col-12">

                <div class="row g-3 mb-4">

                    <div class="col-md-3" v-for="info in batch.infoCards" :key="info.label">

                        <div class="card info-card h-100 shadow-sm border-0">

                            <div class="card-body d-flex align-items-center">

                                <div class="info-icon me-3" :class="info.colorClass">

                                    <i :class="info.icon"></i>

                                </div>

                                <div>

                                    <small class="text-muted">{{ info.label }}</small>

                                    <p class="fw-bold mb-0">{{ info.value }}</p>

                                    <small class="text-muted" v-if="info.subValue">{{ info.subValue }}</small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                <div class="card shadow-sm border-0 mb-4">

                    <div class="card-body">

                        <h5 class="fw-bold mb-3">Trạng thái hiện tại</h5>

                        <div class="d-flex align-items-center">

                            <span class="badge status-badge status-ok me-3"><i
                                    class="bi bi-check-circle-fill me-2"></i>Còn hạn sử dụng</span>

                            <span class="text-muted small">Tình trạng: Bảo quản tốt | Nhiệt độ: 2-6°C</span>

                        </div>

                    </div>

                </div>



                <div class="card shadow-sm border-0 mb-4">

                    <div class="card-body">

                        <h5 class="fw-bold mb-3">Ghi chú quản lý</h5>

                        <div class="alert alert-warning-light mb-0">

                            <i class="bi bi-info-circle-fill me-2"></i>

                            Lô máu được kiểm tra đầy đủ các chỉ số an toàn. Người hiến có tiền sử sức khỏe tốt.

                            <p class="text-muted small mb-0 mt-2">Ghi chú bởi: BS. Trần Thị B - 15/01/2024</p>

                        </div>

                    </div>

                </div>



                <div class="card shadow-sm border-0">

                    <div class="card-body">

                        <h5 class="fw-bold mb-4">Nhật ký lô máu</h5>

                        <div class="timeline">

                            <div v-for="(log, index) in batch.logs" :key="index" class="timeline-item">

                                <div class="timeline-icon">

                                    <i :class="log.icon"></i>

                                </div>

                                <div class="timeline-content">

                                    <p class="fw-bold mb-1">{{ log.title }}</p>

                                    <p class="text-muted small mb-1">{{ log.description }}</p>

                                    <p class="text-muted very-small mb-0">Thực hiện bởi: {{ log.actor }}</p>

                                </div>

                                <div class="timeline-time">

                                    {{ log.time }}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>



<script>

export default {

    name: 'BloodBatchDetailView',

    data() {

        return {

            batch: {

                id: 'BL2024001',

                infoCards: [

                    { label: 'Nhóm máu', value: 'A+', subValue: 'Loại A, Rh dương', icon: 'bi bi-droplet-half', colorClass: 'icon-danger' },

                    { label: 'Ngày hiến', value: '15/01/2024', subValue: 'Người hiến: Nguyễn Văn A', icon: 'bi bi-calendar-heart', colorClass: 'icon-primary' },

                    { label: 'Hạn sử dụng', value: '15/03/2024', subValue: 'Còn 28 ngày', icon: 'bi bi-hourglass-split', colorClass: 'icon-warning' },

                    { label: 'Số lượng', value: '450ml', subValue: 'Đơn vị tiêu chuẩn', icon: 'bi bi-beaker', colorClass: 'icon-success' },

                ],

                logs: [

                    {

                        icon: 'bi bi-box-arrow-in-down',

                        title: 'Nhập kho',

                        description: 'Lô máu được nhập vào kho sau khi hoàn thành các xét nghiệm.',

                        actor: 'Nguyễn Văn C',

                        time: '15/01/2024 - 09:30'

                    },

                    {

                        icon: 'bi bi-clipboard2-check',

                        title: 'Kiểm tra chất lượng',

                        description: 'Tiến hành kiểm tra định kỳ chất lượng máu và điều kiện bảo quản.',

                        actor: 'BS. Trần Thị B',

                        time: '20/01/2024 - 14:15'

                    },

                    {

                        icon: 'bi bi-pencil-square',

                        title: 'Cập nhật ghi chú',

                        description: 'Bổ sung thông tin về tình trạng sức khỏe người hiến.',

                        actor: 'BS. Trần Thị B',

                        time: '25/01/2024 - 11:45'

                    },

                ]

            }

        }

    }

}

</script>



<style scoped>
.breadcrumb a {

    text-decoration: none;

    color: #dc3545;

}

.breadcrumb a:hover {

    text-decoration: underline;

}



.info-card .info-icon {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 48px;

    height: 48px;

    border-radius: .5rem;

    font-size: 1.5rem;

}

.icon-danger {
    background-color: #fde2e2;
    color: #c81e1e;
}

.icon-primary {
    background-color: #cfe2ff;
    color: #0d6efd;
}

.icon-warning {
    background-color: #fff3cd;
    color: #664d03;
}

.icon-success {
    background-color: #d1e7dd;
    color: #198754;
}



.status-badge {

    padding: 0.5em 1em;

    font-weight: 600;

    border-radius: 20px;

}

.status-ok {

    background-color: #d1e7dd;

    color: #198754;

}



.alert-warning-light {

    background-color: #fff3cd;

    color: #664d03;

    border: none;

}



/* Timeline styles */

.timeline {

    position: relative;

}

.timeline-item {

    display: flex;

    align-items: flex-start;

    position: relative;

    padding-left: 50px;

    padding-bottom: 2.5rem;

}

.timeline-item:last-child {

    padding-bottom: 0;

}

.timeline-item::before {

    content: '';

    position: absolute;

    left: 19px;

    top: 0;

    width: 2px;

    height: 100%;

    background-color: #e9ecef;

}

.timeline-icon {

    position: absolute;

    left: 0;

    top: 0;

    width: 40px;

    height: 40px;

    border-radius: 50%;

    background-color: #f8f9fa;

    border: 2px solid #e9ecef;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 1.2rem;

    color: #6c757d;

}

.timeline-content {

    flex: 1;

}

.timeline-time {

    color: #6c757d;

    font-size: 0.85rem;

}

.very-small {

    font-size: 0.75rem;

}
</style>
