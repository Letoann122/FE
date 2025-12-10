<template>
    <div class="support-page-wrapper container-fluid py-4">
        <div class="mb-4">
            <h2 class="fw-bold">Tư vấn & Hỗ trợ</h2>
            <p class="text-muted">
                Gửi thông báo, hướng dẫn và cảnh báo sức khỏe đến donor.
            </p>
        </div>

        <div class="row g-4">
            <!-- LEFT -->
            <div class="col-lg-3">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body">
                        <h6 class="fw-bold mb-3">Kho hướng dẫn</h6>

                        <div class="guide-card p-3 mb-3 rounded">
                            <div class="d-flex">
                                <div class="fs-2 text-danger me-3">
                                    <i class="bi bi-journal-medical"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Chuẩn bị trước & sau hiến máu</h6>
                                    <p class="small text-muted">Hướng dẫn từ Viện Huyết học.</p>
                                    <a href="https://vienhuyethoc.vn/luu-y-truoc-va-sau-hien-mau/" target="_blank"
                                        class="text-danger fw-semibold small">
                                        Xem bài viết →
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="guide-card p-3 rounded">
                            <div class="d-flex">
                                <div class="fs-2 text-danger me-3">
                                    <i class="bi bi-heart-pulse"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold">Dinh dưỡng cho người hiến máu</h6>
                                    <p class="small text-muted">Chế độ ăn giúp phục hồi tốt nhất.</p>
                                    <a href="https://www.pharmacity.vn/che-do-an-uong-truoc-va-sau-khi-hien-mau-giup-hoi-phuc-suc-khoe-toi-uu.htm"
                                        target="_blank" class="text-danger fw-semibold small">
                                        Xem bài viết →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h6 class="fw-bold mb-2">Hỗ trợ trực tuyến</h6>
                        <p class="text-muted small mb-3">
                            Chat với hỗ trợ viên để được giải đáp nhanh.
                        </p>
                        <button class="btn btn-danger w-100" @click="openTawk">
                            <i class="bi bi-chat-dots me-2"></i>Chat ngay
                        </button>
                    </div>
                </div>
            </div>

            <!-- RIGHT -->
            <div class="col-lg-9">
                <!-- SEND FORM -->
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-4">
                        <h5 class="fw-bold mb-4">
                            <i class="bi bi-megaphone-fill text-danger me-2"></i>
                            Gửi thông báo mới
                        </h5>

                        <form @submit.prevent="submitConsultation">
                            <div class="mb-3">
                                <label class="form-label">Tiêu đề</label>
                                <input type="text" class="form-control" v-model="form.title"
                                    placeholder="Nhập tiêu đề thông báo" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Gửi đến nhóm máu</label>
                                <select class="form-select" v-model="form.recipient">
                                    <option value="all">Tất cả donor</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" v-model="form.emergency"
                                    id="emergencySwitch" />
                                <label class="form-check-label text-danger fw-bold" for="emergencySwitch">
                                    Gửi thông báo khẩn cấp (Emergency Alert)
                                </label>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Nội dung</label>
                                <textarea class="form-control" rows="5" v-model="form.content"
                                    placeholder="Nhập nội dung chi tiết..."></textarea>
                            </div>

                            <button class="btn btn-danger px-4" :disabled="sending">
                                <i class="bi bi-send-fill me-2"></i>
                                <span v-if="sending">Đang gửi...</span>
                                <span v-else>Gửi thông báo</span>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- LIST -->
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="fw-bold mb-0">
                            <i class="bi bi-mailbox2 me-2"></i>Danh sách đã gửi
                        </h5>
                    </div>

                    <div class="card-body">
                        <div v-if="!loaded" class="text-center py-4">
                            <div class="spinner-border text-danger"></div>
                        </div>

                        <div v-else class="table-responsive">
                            <table class="table align-middle table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Tiêu đề</th>
                                        <th>Loại</th>
                                        <th>Ngày gửi</th>
                                        <th>Người nhận</th>
                                        <th>Trạng thái</th>
                                        <th class="text-center">Xem</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="item in notifications" :key="item.id">
                                        <td class="fw-semibold">{{ item.title }}</td>
                                        <td>
                                            <span v-if="item.emergency" class="text-danger">Khẩn cấp</span>
                                            <span v-else>Thường</span>
                                        </td>
                                        <td>{{ formatDate(item.created_at) }}</td>
                                        <td>{{ item.sent_count }}</td>

                                        <td>
                                            <span class="badge" :class="getStatusClass(item.status)">
                                                {{ getStatusText(item.status) }}
                                            </span>
                                        </td>

                                        <td class="text-center">
                                            <button class="btn btn-sm btn-primary" data-bs-toggle="modal"
                                                data-bs-target="#notificationDetailModal" @click="openDetail(item)">
                                                Xem
                                            </button>
                                        </td>
                                    </tr>

                                    <tr v-if="notifications.length === 0">
                                        <td colspan="6" class="text-center text-muted py-3">
                                            Chưa có thông báo nào.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- DETAIL MODAL -->
                <div class="modal fade" id="notificationDetailModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i class="bi bi-mailbox2 text-danger me-2"></i>
                                    Chi tiết thông báo
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>

                            <div class="modal-body" v-if="selectedNotification">
                                <p class="mb-1">
                                    <strong>Tiêu đề:</strong> {{ selectedNotification.title }}
                                </p>
                                <p class="mb-1">
                                    <strong>Ngày gửi:</strong>
                                    {{ formatDate(selectedNotification.created_at) }}
                                </p>
                                <p class="mb-1">
                                    <strong>Người nhận:</strong>
                                    {{
                                        selectedNotification.recipient === "all"
                                            ? "Tất cả donor"
                                            : selectedNotification.recipient
                                    }}
                                </p>
                                <p class="mb-3">
                                    <strong>Loại:</strong>
                                    <span class="badge bg-danger ms-1" v-if="selectedNotification.emergency">
                                        Khẩn cấp
                                    </span>
                                    <span class="badge bg-secondary ms-1" v-else>
                                        Thông thường
                                    </span>
                                </p>

                                <p class="mb-1"><strong>Nội dung:</strong></p>
                                <div class="border rounded p-3 bg-light" style="white-space: pre-line;">
                                    {{ selectedNotification.content }}
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /DETAIL MODAL -->
            </div>
        </div>
    </div>
</template>

<script>
import baseRequestDoctor from "../../../core/baseRequestDoctor";

export default {
    data() {
        return {
            loaded: false,
            sending: false,
            form: {
                title: "",
                recipient: "all",
                emergency: false,
                content: "",
            },
            notifications: [],
            selectedNotification: null,
        };
    },

    mounted() {
        this.loadNotifications();
    },

    methods: {
        async loadNotifications() {
            this.loaded = false;
            try {
                const res = await baseRequestDoctor.get(
                    "/doctor/support/notifications"
                );
                if (res.data.status) {
                    this.notifications = res.data.data || [];
                }
            } catch (e) {
                this.$toast?.error("Không thể tải danh sách thông báo!");
            } finally {
                this.loaded = true;
            }
        },

        async submitConsultation() {
            if (!this.form.title || !this.form.content) {
                return this.$toast.error("Tiêu đề và nội dung không được để trống!");
            }

            this.sending = true;

            try {
                if (this.form.emergency) {
                    const res = await baseRequestDoctor.post("/doctor/emergency-alert", {
                        title: this.form.title,
                        content: this.form.content,
                    });

                    if (res.data.status) {
                        this.$toast.success("Đã tạo cảnh báo khẩn cấp!");
                    } else {
                        this.$toast.error(
                            res.data.message || "Không thể tạo cảnh báo khẩn cấp!"
                        );
                    }
                } else {
                    const res = await baseRequestDoctor.post(
                        "/doctor/support/notifications",
                        this.form
                    );

                    if (res.data.status) {
                        this.$toast.success(
                            res.data.message || "Gửi thông báo thành công!"
                        );
                    } else {
                        this.$toast.error(
                            res.data.message || "Gửi thông báo thất bại!"
                        );
                    }
                }

                await this.loadNotifications();

                this.form = {
                    title: "",
                    recipient: "all",
                    emergency: false,
                    content: "",
                };
            } catch (err) {
                this.$toast.error("Lỗi server!");
            } finally {
                this.sending = false;
            }
        },

        openTawk() {
            if (window.Tawk_API) window.Tawk_API.maximize();
            else this.$toast.error("Tawk.to chưa tải!");
        },

        formatDate(d) {
            if (!d) return "-";
            return new Date(d).toLocaleDateString("vi-VN");
        },

        getStatusClass(status) {
            switch (status) {
                case "sent":
                    return "badge-green";
                case "sending":
                    return "badge-yellow";
                default:
                    return "badge-yellow";
            }
        },

        getStatusText(status) {
            switch (status) {
                case "sent":
                    return "Đã gửi";
                case "sending":
                    return "Đang gửi";
                default:
                    return "Khác";
            }
        },

        openDetail(item) {
            this.selectedNotification = item;
        },
    },
};
</script>

<style scoped>
.badge {
    padding: 0.4em 0.7em;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
}

.badge-green {
    background: #d1e7dd;
    color: #198754;
}

.badge-yellow {
    background: #fff3cd;
    color: #664d03;
}

.guide-card:hover {
    background: #fff7f7;
}

.support-page-wrapper {
    min-height: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}
</style>
