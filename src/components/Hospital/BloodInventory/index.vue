<template>
    <div class="blood-inventory-wrapper">
        <main class="inventory-content p-4">
            <div class="row g-4">
                <div class="col-lg-3">
                    <div class="card shadow-sm border-0 rounded-3 mb-4">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="bi bi-filter-circle-fill me-2"></i>Bộ lọc</h5>

                            <h6 class="text-muted small fw-bold">Nhóm máu</h6>
                            <div class="d-flex flex-wrap gap-2 mb-3">
                                <button v-for="group in bloodGroups" :key="group" class="btn btn-filter"
                                    :class="{ active: selectedGroup === group }" @click="selectedGroup = group">
                                    {{ group }}
                                </button>
                            </div>

                            <h6 class="text-muted small fw-bold">Trạng thái</h6>
                            <div v-for="status in statusFilters" :key="status.value" class="form-check">
                                <input class="form-check-input" type="radio" name="statusFilter" :id="status.id"
                                    :value="status.value" v-model="selectedStatus">
                                <label class="form-check-label" :for="status.id">{{ status.text }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-sm border-0 rounded-3">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="bi bi-card-text me-2"></i>Ghi chú quản lý</h5>
                            <div v-for="(note, index) in notes" :key="index" class="note-item border-bottom pb-2 mb-2">
                                <p class="mb-1 fw-bold small">{{ note.title }}</p>
                                <p class="text-muted small mb-0">{{ note.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9">
                    <div class="row g-3 mb-4">
                        <div v-for="(alert, index) in alerts" :key="index" class="col-md-6">
                            <div class="alert d-flex align-items-center rounded-3 shadow-sm mb-0" :class="alert.class">
                                <i :class="['me-3 fs-4', alert.icon]"></i>
                                <div>
                                    <h6 class="fw-bold mb-1">{{ alert.title }}</h6>
                                    <small>{{ alert.message }}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-sm border-0 rounded-3 mb-4">
                        <div class="card-body p-4">
                            <h5 class="fw-bold mb-3"><i class="bi bi-box-arrow-in-down me-2 text-danger"></i>Nhập lô máu
                                mới</h5>
                            <form @submit.prevent="addBloodBatch" class="row g-3 align-items-end">
                                <div class="col-md">
                                    <label for="bloodGroup" class="form-label small">Nhóm máu</label>
                                    <select id="bloodGroup" class="form-select" v-model="newBatch.group">
                                        <option v-for="group in bloodGroups.slice(1)" :key="group">{{ group }}</option>
                                    </select>
                                </div>
                                <div class="col-md">
                                    <label for="donationDate" class="form-label small">Ngày hiến máu</label>
                                    <input type="date" class="form-control" id="donationDate"
                                        v-model="newBatch.donationDate">
                                </div>
                                <div class="col-md">
                                    <label for="expiryDate" class="form-label small">Hạn sử dụng</label>
                                    <input type="date" class="form-control" id="expiryDate"
                                        v-model="newBatch.expiryDate">
                                </div>
                                <div class="col-md">
                                    <label for="quantity" class="form-label small">Số lượng (túi)</label>
                                    <input type="number" class="form-control" id="quantity" v-model="newBatch.quantity">
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-danger fw-bold"><i
                                            class="bi bi-plus-lg me-2"></i>Thêm lô máu</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="card shadow-sm border-0 rounded-3">
                        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 class="mb-0 fw-bold"><i class="bi bi-archive-fill me-2"></i>Tồn kho máu</h5>

                            <div class="d-flex align-items-center gap-2">
                                <router-link to="/hospital/blood-inventory/log"
                                    class="btn btn-outline-danger btn-sm d-flex align-items-center text-nowrap">
                                    <i class="bi bi-clock-history me-2"></i>
                                    <span>Nhật ký</span>
                                </router-link>
                                <div class="input-group" style="max-width: 250px;">
                                    <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
                                    <input type="text" class="form-control bg-light border-0" placeholder="Tìm kiếm...">
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover mb-0 inventory-table">
                                    <thead class="bg-light">
                                        <tr>
                                            <th>ID Lô Máu</th>
                                            <th>Nhóm máu</th>
                                            <th>Số lượng</th>
                                            <th>Ngày nhập</th>
                                            <th>Hạn sử dụng</th>
                                            <th class="text-center">Trạng thái</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in inventory" :key="item.id">
                                            <td class="fw-bold">{{ item.id }}</td>
                                            <td class="fw-bold fs-5 text-danger">{{ item.group }}</td>
                                            <td>{{ item.quantity }} túi</td>
                                            <td>{{ item.last_added }}</td>
                                            <td>{{ item.expiry }}</td>
                                            <td class="text-center">
                                                <span class="badge" :class="getStatusClass(item.status)">{{
                                                    item.status_text }}</span>
                                            </td>
                                            <td>
                                                <router-link :to="`/Hospital/blood-inventory/${item.id}`"
                                                    class="btn btn-sm btn-outline-primary">
                                                    Xem chi tiết
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
        </main>
    </div>
</template>

<script>
export default {
    name: 'BloodInventoryView',
    data() {
        return {
            bloodGroups: ['Tất cả', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            selectedGroup: 'Tất cả',
            statusFilters: [
                { id: 'statusAll', value: 'all', text: 'Tất cả' },
                { id: 'statusInStock', value: 'instock', text: 'Còn hạn' },
                { id: 'statusExpiring', value: 'expiring', text: 'Sắp hết hạn' },
            ],
            selectedStatus: 'all',
            notes: [
                { title: 'Nhập lô mới nhóm O+', time: 'Hôm nay, 14:30' },
                { title: 'Kiểm tra chất lượng định kỳ', time: 'Hôm qua, 09:15' },
                { title: 'Xuất 5 túi máu A+ khẩn cấp', time: 'Hôm qua, 16:45' },
            ],
            alerts: [
                { class: 'alert-danger', icon: 'bi bi-radioactive', title: 'Cảnh báo hết hạn', message: '3 lô máu sắp hết hạn trong 7 ngày' },
                { class: 'alert-warning', icon: 'bi bi-exclamation-diamond-fill', title: 'Tồn kho thấp', message: 'Nhóm máu AB+ dưới mức tối thiểu' },
            ],
            newBatch: {
                group: 'A+',
                donationDate: '',
                expiryDate: '',
                quantity: null,
            },
            inventory: [
                { id: 'BL2024001', group: 'A+', quantity: 120, last_added: '05/10/2025', expiry: '15/11/2025', status: 'ok', status_text: 'Đầy đủ' },
                { id: 'BL2024002', group: 'A-', quantity: 45, last_added: '02/10/2025', expiry: '12/11/2025', status: 'ok', status_text: 'Đầy đủ' },
                { id: 'BL2024003', group: 'B+', quantity: 88, last_added: '06/10/2025', expiry: '16/11/2025', status: 'ok', status_text: 'Đầy đủ' },
                { id: 'BL2024004', group: 'O+', quantity: 35, last_added: '28/09/2025', expiry: '10/10/2025', status: 'expiring', status_text: 'Sắp hết hạn' },
                { id: 'BL2024005', group: 'AB+', quantity: 15, last_added: '25/09/2025', expiry: '05/11/2025', status: 'low', status_text: 'Dưới mức' },
                { id: 'BL2024006', group: 'O-', quantity: 8, last_added: '20/09/2025', expiry: '01/11/2025', status: 'critical', status_text: 'Nguy cấp' },
            ]
        }
    },
    methods: {
        getStatusClass(status) {
            switch (status) {
                case 'ok': return 'status-ok';
                case 'expiring': return 'status-expiring';
                case 'low': return 'status-low';
                case 'critical': return 'status-critical';
                default: return 'bg-light text-dark';
            }
        },
        addBloodBatch() {
            alert('Thêm lô máu mới: ' + JSON.stringify(this.newBatch));
            this.newBatch = { group: 'A+', donationDate: '', expiryDate: '', quantity: null };
        }
    }
}
</script>

<style scoped>
/* Thêm scoped và xóa các style không cần thiết */
.btn-filter {
    background-color: #f1f3f5;
    border: 1px solid #dee2e6;
    color: #495057;
    font-size: 0.875rem;
}

.btn-filter.active {
    background-color: #d32f2f;
    color: white;
    border-color: #d32f2f;
}

.alert-warning {
    background-color: #fff8e1;
    color: #f57c00;
    border: none;
}

.alert-danger {
    background-color: #ffebee;
    color: #d32f2f;
    border: none;
}

.inventory-table th {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #6c757d;
}

.inventory-table td {
    vertical-align: middle;
}

.badge {
    padding: 0.5em 1em;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 20px;
}

.status-ok {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.status-expiring {
    background-color: #fff3e0;
    color: #ef6c00;
}

.status-low {
    background-color: #ffebee;
    color: #c62828;
}

.status-critical {
    background-color: #d32f2f;
    color: white;
}

.cta-section {
    background-color: #fdebee;
    border: 1px dashed #f4a5a5;
}
</style>