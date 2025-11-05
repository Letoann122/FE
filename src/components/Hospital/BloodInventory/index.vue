<template>
    <div class="container-fluid py-4 min-vh-100">
        <div class="row gx-4">
            <div class="col-xl-3 col-lg-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Bộ lọc</h5>
                        <h6 class="text-muted small fw-bold">Nhóm máu</h6>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            <button class="btn btn-danger btn-sm">Tất cả</button>
                            <button v-for="type in bloodTypes" :key="type.id" class="btn btn-outline-secondary btn-sm">
                                {{ type.name }}
                            </button>
                        </div>
                        <h6 class="text-muted small fw-bold">Trạng thái</h6>
                        <div class="form-check mb-1">
                            <input class="form-check-input" type="radio" name="statusFilter" id="statusAll" checked />
                            <label class="form-check-label" for="statusAll">Tất cả</label>
                        </div>
                        <div class="form-check mb-1">
                            <input class="form-check-input" type="radio" name="statusFilter" id="statusInStock" />
                            <label class="form-check-label" for="statusInStock">Còn hạn</label>
                        </div>
                        <div class="form-check mb-1">
                            <input class="form-check-input" type="radio" name="statusFilter" id="statusExpiring" />
                            <label class="form-check-label" for="statusExpiring">Sắp hết hạn</label>
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
                                <label class="form-label small">Ngày hiến máu</label>
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
                                <button type="submit" class="btn btn-primary">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold">Tồn kho máu</h5>
                        <div class="input-group" style="max-width: 350px;">
  <input
    v-model="tim_kiem.noi_dung_tim"
    @keyup.enter="timKiem"
    type="text"
    class="form-control"
    placeholder="Nhập tên nhóm máu hoặc tình trạng..."
  />
  <button class="btn btn-danger" @click="timKiem">
    <i class="bi bi-search"></i> Tìm kiếm
  </button>
</div>
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
                                        <th class="text-center">Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="blood in list_blood" :key="blood.id">
                                        <td class="fw-bold">
                                            BL{{ blood.id.toString().padStart(6, "0") }}
                                        </td>
                                        <td class="fw-bold text-danger">
                                            {{ blood.blood_type?.abo }}{{ blood.blood_type?.rh }}
                                        </td>
                                        <td>{{ blood.units }} túi</td>
                                        <td>{{ formatDate(blood.donation_date) }}</td>
                                        <td>{{ formatDate(blood.expiry_date) }}</td>
                                        <td class="text-center">
                                            <span class="badge rounded-pill" :class="{
                                                'bg-success': blood.status === 'full',
                                                'bg-warning text-dark': blood.status === 'expiring',
                                                'bg-danger': blood.status === 'critical',
                                                'bg-secondary': blood.status === 'low',
                                            }">
                                                {{ translateStatus(blood.status) }}
                                            </span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger"
                                                @click="deleteBlood(blood.id)">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!list_blood.length">
                                        <td colspan="7" class="text-center py-3 text-muted">
                                            Không có dữ liệu
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
    name: "BloodInventoryView",
    data() {
        return {
            list_blood: [],
            tim_kiem: { noi_dung_tim: "" },
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
                this.$toast.info("Vui lòng nhập đầy đủ thông tin!");
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
        timKiem() {
            if (!this.tim_kiem.noi_dung_tim.trim()) {
                this.$toast.info("Nhập từ khóa cần tìm!");
                return;
            }
            baseRequestDoctor
                .post("/doctor/blood-inventory/search", this.tim_kiem)
                .then((res) => {
                    if (res.data.status) {
                        this.list_blood = res.data.data;
                    } else {
                        this.list_blood = [];
                        this.$toast.info("Không tìm thấy kết quả!");
                    }
                })
                .catch(() => {
                    this.$toast.error("Lỗi khi tìm kiếm!");
                });
        },
        deleteBlood(id) {
            if (!confirm("Bạn có chắc muốn xóa lô máu này không?")) return;
            baseRequestDoctor
                .delete(`/doctor/blood-inventory/${id}`)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success("Đã xóa lô máu!");
                        this.loadData();
                    } else {
                        this.$toast.error("Không thể xóa!");
                    }
                })
                .catch(() => {
                    this.$toast.error("Lỗi khi xóa!");
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
                    return "Nguy cấp";
                case "low":
                    return "Ít máu";
                default:
                    return "Không xác định";
            }
        },
    },
};
</script>
