<template>
  <div class="container py-4">
   
    <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
      <h4 class="fw-bold mb-0">
        <i class="bi bi-bell-fill text-danger me-2"></i> Trung tâm thông báo
      </h4>
      <div>
        <button
          v-for="(filter, index) in filters"
          :key="index"
          class="btn btn-sm me-2"
          :class="filter.value === currentFilter ? 'btn-danger text-white' : 'btn-outline-secondary'"
          @click="currentFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    
    <form>
      <div
        v-for="(item, index) in filteredNotifications"
        :key="index"
        class="card mb-3 border-0 shadow-sm rounded-3"
      >
        <div class="card-body d-flex justify-content-between align-items-start">
          
          <div class="me-3">
            <i :class="item.icon + ' fs-4 text-danger'"></i>
          </div>

         
          <div class="flex-grow-1">
            <h6 class="fw-bold mb-1">{{ item.title }}</h6>
            <small class="text-muted">{{ item.time }}</small>
            <p class="mb-0 mt-1 text-secondary">{{ item.message }}</p>
          </div>

          
          <div>
            <span v-if="!item.read" class="badge bg-danger rounded-circle p-2">&nbsp;</span>
          </div>
        </div>
      </div>
    </form>

    
    <div class="d-flex justify-content-end mt-3 gap-3">
      <button class="btn btn-outline-secondary" @click="clearAll">
        <i class="bi bi-trash me-2"></i> Xóa tất cả
      </button>
      <button class="btn btn-dark" @click="markAllAsRead">
        <i class="bi bi-check2-circle me-2"></i> Đánh dấu đã đọc tất cả
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationCenter",
  data() {
    return {
      currentFilter: "all",
      filters: [
        { label: "Tất cả", value: "all" },
        { label: "Chưa đọc", value: "unread" },
        { label: "Đã đọc", value: "read" },
      ],
      notifications: [
        {
          title: "Nhắc nhở lịch hiến máu",
          message: "Bạn có lịch hiến máu vào ngày mai tại Bệnh viện Bạch Mai. Vui lòng chuẩn bị sức khỏe tốt nhất.",
          time: "2 giờ trước",
          icon: "bi bi-calendar-event-fill",
          read: false,
        },
        {
          title: "Chiến dịch hiến máu mới",
          message: "Chiến dịch 'Giọt máu yêu thương' sẽ diễn ra tại ĐH Hà Nội từ 15-20/01/2025.",
          time: "5 giờ trước",
          icon: "bi bi-megaphone-fill",
          read: false,
        },
        {
          title: "Thông báo khẩn cấp",
          message: "Thiếu hụt máu nhóm O- tại các bệnh viện. Kêu gọi người hiến máu tình nguyện đăng ký ngay.",
          time: "1 ngày trước",
          icon: "bi bi-exclamation-triangle-fill",
          read: true,
        },
        {
          title: "Xác nhận lịch hiến máu",
          message: "Cảm ơn bạn đã đăng ký hiến máu. Lịch của bạn đã được xác nhận cho ngày 15/01/2025.",
          time: "2 ngày trước",
          icon: "bi bi-check-circle-fill",
          read: true,
        },
        {
          title: "Hoàn thành hiến máu",
          message: "Cảm ơn bạn đã hoàn thành đợt hiến máu ngày 08/01/2025. Hãy nghỉ ngơi và bổ sung dinh dưỡng.",
          time: "1 tuần trước",
          icon: "bi bi-heart-fill",
          read: true,
        },
      ],
    };
  },
  computed: {
    filteredNotifications() {
      if (this.currentFilter === "unread") {
        return this.notifications.filter((n) => !n.read);
      } else if (this.currentFilter === "read") {
        return this.notifications.filter((n) => n.read);
      }
      return this.notifications;
    },
  },
  methods: {
    clearAll() {
      if (confirm("Bạn có chắc muốn xóa tất cả thông báo?")) {
        this.notifications = [];
      }
    },
    markAllAsRead() {
      this.notifications.forEach((n) => (n.read = true));
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-3px);
}
.badge {
  width: 10px;
  height: 10px;
}
</style>
