<template>
    <div class="blood-stock-log-wrapper">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/Hospital/blood-inventory">Quản lý kho máu</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Nhật ký kho máu</li>
            </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold mb-1">Nhật ký Thao tác Kho máu</h2>
                <p class="text-muted">Theo dõi lịch sử các thao tác trên hệ thống.</p>
            </div>
            <button class="btn btn-danger"><i class="bi bi-download me-2"></i>Xuất báo cáo</button>
        </div>

        <div class="card shadow-sm border-0 mb-4">
            <div class="card-body">
                <div class="row g-3 align-items-end">
                    <div class="col-md-3">
                        <label class="form-label">Loại thao tác</label>
                        <select class="form-select">
                            <option selected>Tất cả</option>
                            <option>Nhập kho</option>
                            <option>Xuất kho</option>
                            <option>Kiểm tra</option>
                            <option>Hủy</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Từ ngày</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Đến ngày</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Người thực hiện</label>
                        <input type="text" class="form-control" placeholder="Tìm tên...">
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold">Danh sách thao tác</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th>Hành động</th>
                                <th>Người thực hiện</th>
                                <th>Ngày giờ</th>
                                <th>Ghi chú</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in actionLogs" :key="log.id">
                                <td>
                                    <span class="badge" :class="log.actionClass">
                                        <i :class="['me-2', log.icon]"></i>{{ log.action }}
                                    </span>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img :src="log.actor.avatar" class="rounded-circle me-2" width="30" height="30">
                                        <div>
                                            <div class="fw-bold small">{{ log.actor.name }}</div>
                                            <div class="text-muted very-small">{{ log.actor.role }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ log.timestamp }}</td>
                                <td>{{ log.notes }}</td>
                                <td>
                                    <a href="#" class="btn btn-sm btn-outline-secondary" title="Xem chi tiết">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer bg-white d-flex justify-content-between align-items-center">
    <span class="text-muted small">Hiển thị 1-10 trong tổng số 247 kết quả</span>
    
    <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                    <i class="bi bi-chevron-left"></i>
                </a>
            </li>

            <li class="page-item active" aria-current="page"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            
            <li class="page-item disabled"><span class="page-link">...</span></li>

            <li class="page-item"><a class="page-link" href="#">25</a></li>
            
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <i class="bi bi-chevron-right"></i>
                </a>
            </li>
        </ul>
    </nav>
    </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BloodStockLogView',
    data() {
        return {
            actionLogs: [
                { id: 1, action: 'Nhập kho', icon: 'bi bi-arrow-down-circle', actionClass: 'badge-success', actor: { name: 'Nguyễn Văn An', role: 'Kỹ thuật viên', avatar: 'https://i.pravatar.cc/150?img=1' }, timestamp: '15/01/2024 14:30', notes: 'Nhập 3 đơn vị máu O+ từ bệnh viện Bạch Mai' },
                { id: 2, action: 'Chỉnh sửa', icon: 'bi bi-pencil', actionClass: 'badge-primary', actor: { name: 'Trần Thị Bình', role: 'Quản lý kho', avatar: 'https://i.pravatar.cc/150?img=2' }, timestamp: '15/01/2024 10:15', notes: 'Cập nhật ngày hết hạn cho lô máu #A02' },
                { id: 3, action: 'Hủy', icon: 'bi bi-x-circle', actionClass: 'badge-danger', actor: { name: 'Lê Minh Cường', role: 'Bác sĩ', avatar: 'https://i.pravatar.cc/150?img=3' }, timestamp: '15/01/2024 11:05', notes: 'Hủy lô máu A+ đã hết hạn' },
                { id: 4, action: 'Nhập kho', icon: 'bi bi-arrow-down-circle', actionClass: 'badge-success', actor: { name: 'Hoàng Thị Thanh Ân', role: 'Kỹ thuật viên', avatar: 'https://i.pravatar.cc/150?img=4' }, timestamp: '15/01/2024 09:28', notes: 'Nhập 5 đơn vị máu B+ từ hiến máu tình nguyện' },
                { id: 5, action: 'Chỉnh sửa', icon: 'bi bi-pencil', actionClass: 'badge-primary', actor: { name: 'Hoàng Công Ý', role: 'Quản lý kho', avatar: 'https://i.pravatar.cc/150?img=5' }, timestamp: '14/01/2024 16:18', notes: 'Điều chỉnh số lượng túi cho lô máu O-' },
            ]
        }
    }
}
</script>

<style scoped>
.breadcrumb a {
    text-decoration: none;
    color: #dc3545;
}

.badge {
    padding: 0.5em 0.8em;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 6px;
}

.badge-success {
    background-color: #d1e7dd;
    color: #198754;
}

.badge-primary {
    background-color: #cfe2ff;
    color: #0d6efd;
}

.badge-danger {
    background-color: #f8d7da;
    color: #dc3545;
}

.very-small {
    font-size: 0.75rem;
}
</style>