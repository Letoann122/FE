<template>
    <div class="container-fluid py-4 min-vh-100">
        <div class="row gx-4">
            <div class="col-xl-3 col-lg-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Bộ lọc</h5>
                        <h6 class="text-muted small fw-bold">Nhóm máu</h6>
                        <select v-model="selectedBloodType" class="form-select form-select-sm mb-3">
                            <option value="all">Tất cả</option>
                            <option v-for="type in bloodTypes" :key="type.id" :value="type.name">
                                {{ type.name }}
                            </option>
                        </select>
                        <h6 class="text-muted small fw-bold">Tình trạng</h6>
                        <select v-model="selectedStatus" class="form-select form-select-sm mb-3">
                            <option value="all">Tất cả</option>
                            <option value="inStock">Còn hạn</option>
                            <option value="expiring">Sắp hết hạn</option>
                            <option value="critical">Cần nhập</option>
                            <option value="full">Đầy đủ</option>
                        </select>
                        <div class="text-end">
                            <button class="btn btn-primary mt-2" @click="filter">Lọc</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-8">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Nhập lô máu mới</h5>
                        <form class="row g-3 align-items-end" @submit.prevent="createBloodBatch">
                            <div class="col-md-3">
                                <label class="form-label small">Nhóm máu</label>
                                <select v-model="form.blood_type_id" class="form-select">
                                    <option disabled value="">-- Chọn nhóm máu --</option>
                                    <option v-for="type in bloodTypes" :key="type.id" :value="type.id">
                                        {{ type.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label small">Ngày nhập</label>
                                <input v-model="form.donation_date" type="date" class="form-control" />
                            </div>
                            <div class="col-md-3">
                                <label class="form-label small">Hạn sử dụng</label>
                                <input v-model="form.expiry_date" type="date" class="form-control" />
                            </div>
                            <div class="col-md-3">
                                <label class="form-label small">Số lượng (túi)</label>
                                <input v-model="form.units" type="number" class="form-control" min="1" />
                            </div>
                            <div class="col-12 text-end">
                                <button type="submit" class="btn btn-primary mt-3">
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold">Tồn kho máu</h5>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th>ID Lô Máu</th>
                                        <th>Nhóm máu</th>
                                        <th>Số lượng</th>
                                        <th>Ngày nhập</th>
                                        <th>Hạn sử dụng</th>
                                        <th class="text-center">Tình trạng</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="blood in paginatedData" :key="blood.id">
                                        <td class="fw-bold">BL{{ blood.id.toString().padStart(6, '0') }}</td>
                                        <td class="fw-bold text-danger">{{ blood.blood_type?.abo }}{{
                                            blood.blood_type?.rh }}</td>
                                        <td>{{ blood.units }} túi</td>
                                        <td>{{ formatDate(blood.donation_date) }}</td>
                                        <td>{{ formatDate(blood.expiry_date) }}</td>
                                        <td class="text-center">
                                            <span class="badge rounded-pill" :class="{
                                                'bg-success': blood.status === 'full',
                                                'bg-warning text-dark': blood.status === 'expiring',
                                                'bg-danger': blood.status === 'critical',
                                                'bg-secondary': blood.status === 'low'
                                            }">
                                                {{ translateStatus(blood.status) }}
                                            </span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger"
                                                @click="openDeleteModal(blood)" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!list_blood.length">
                                        <td colspan="7" class="text-center py-3 text-muted">Không có dữ liệu</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-center py-3">
                            <nav>
                                <ul class="pagination mb-0">
                                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                        <button class="page-link" @click="changePage(currentPage - 1)">«</button>
                                    </li>
                                    <li v-for="page in totalPages" :key="page" class="page-item"
                                        :class="{ active: currentPage === page }">
                                        <button class="page-link" @click="changePage(page)">{{ page }}</button>
                                    </li>
                                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                        <button class="page-link" @click="changePage(currentPage + 1)">»</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-sm">
                    <div class="modal-header border-0 bg-danger bg-opacity-10">
                        <h5 class="modal-title fw-bold text-danger" id="deleteModalLabel">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i> Xóa lô máu
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc chắn muốn xóa
                        <span class="fw-bold text-danger">
                            BL{{ selectedBlood?.id?.toString().padStart(6, "0") }}
                        </span>
                        ({{ selectedBlood?.blood_type?.abo }}{{ selectedBlood?.blood_type?.rh }})?
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete" data-bs-dismiss="modal">
                            <i class="bi bi-trash3-fill me-1"></i> Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import baseRequestDoctor from "../../../core/baseRequestDoctor";

export default {
    name: "BloodInventoryView",
    data() {
        return {
            list_blood: [],
            selectedBlood: null,
            selectedBloodType: "all",
            selectedStatus: "all",
            currentPage: 1,
            perPage: 10,
            form: {
                blood_type_id: "",
                donation_date: "",
                expiry_date: "",
                units: "",
            },
            bloodTypes: [
                { id: 1, name: "A+" },
                { id: 2, name: "A-" },
                { id: 3, name: "B+" },
                { id: 4, name: "B-" },
                { id: 5, name: "AB+" },
                { id: 6, name: "AB-" },
                { id: 7, name: "O+" },
                { id: 8, name: "O-" },
            ],
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.list_blood.length / this.perPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.list_blood.slice(start, start + this.perPage);
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            baseRequestDoctor
                .get("/doctor/blood-inventory")
                .then((res) => {
                    if (res.data.status) {
                        this.list_blood = res.data.data;
                    } else {
                        this.$toast.error("Không thể tải danh sách kho máu!");
                    }
                })
                .catch(() => {
                    this.$toast.error("Lỗi khi tải danh sách kho máu!");
                });
        },
        createBloodBatch() {
            if (
                !this.form.blood_type_id ||
                !this.form.donation_date ||
                !this.form.expiry_date ||
                !this.form.units
            ) {
                this.$toast.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }
            baseRequestDoctor
                .post("/doctor/blood-inventory", this.form)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success("Thêm lô máu thành công!");
                        this.loadData();
                        this.form = {
                            blood_type_id: "",
                            donation_date: "",
                            expiry_date: "",
                            units: "",
                        };
                    } else {
                        this.$toast.error("Không thể thêm lô máu!");
                    }
                })
                .catch(() => {
                    this.$toast.error("Lỗi khi thêm lô máu!");
                });
        },
        filter() {
            baseRequestDoctor
                .post("/doctor/blood-inventory/filter", {
                    bloodType: this.selectedBloodType,
                    status: this.selectedStatus,
                })
                .then((res) => {
                    if (res.data.status) this.list_blood = res.data.data;
                    else {
                        this.list_blood = [];
                        this.$toast.info("Không tìm thấy dữ liệu!");
                    }
                })
                .catch(() => this.$toast.error("Lỗi khi lọc dữ liệu!"));
        },
        openDeleteModal(blood) {
            this.selectedBlood = blood;
        },
        confirmDelete() {
            if (!this.selectedBlood) return;
            const id = this.selectedBlood.id;
            baseRequestDoctor
                .delete(`/doctor/blood-inventory/${id}`)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success("Đã xóa lô máu!");
                        this.loadData();
                    } else {
                        this.$toast.error("Không thể xóa lô máu này!");
                    }
                })
                .catch(() => {
                    this.$toast.error("Lỗi khi xóa lô máu!");
                });
        },
        formatDate(date) {
            if (!date) return "-";
            return new Date(date).toLocaleDateString("vi-VN");
        },
        translateStatus(status) {
            switch (status) {
                case "full":
                    return "Đầy đủ";
                case "expiring":
                    return "Sắp hết hạn";
                case "critical":
                    return "Cần nhập";
                case "low":
                    return "Ít máu";
                default:
                    return "Không xác định";
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) this.currentPage = page;
        },
    },
};
</script>
