<template>
    <section
    class="position-relative d-flex align-items-center justify-content-center text-center"
    style="background: url('https://img.freepik.com/free-photo/medical-workers-donating-blood_23-2149362132.jpg') center/cover no-repeat; height: 500px;"
  >
    <!-- Overlay -->
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-white" style="opacity: 0.7;"></div>

    <!-- Content -->
    <div class="position-relative z-1 container">
      <h1 class="fw-bold display-5">
        Về Hệ Thống
        <span class="text-danger">Hiến Máu</span>
        <span class="text-dark"> Thông Minh</span>
      </h1>
      <p class="mt-3 fs-5 text-secondary" style="color: FEF2F2;">
        Kết nối người hiến máu, bệnh viện và ngân hàng máu trên nền tảng trực tuyến hiện đại,
        an toàn và minh bạch.
      </p>
    </div>
  </section>
  <div class="container my-5">

    <!-- Dự Án -->
    <div class="text-center mb-5">
      <h2 class="fw-bold">Dự Án</h2>
      <p class="text-muted">
        Chúng tôi hướng đến việc xây dựng một hệ thống hiến máu hiện đại, kết nối và hỗ trợ cộng đồng
      </p>
    </div>

    <!-- Các mục dự án -->
    <div class="row g-4 mb-5 text-center">
      <div class="col-md-3" v-for="(item, index) in projectItems" :key="index">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body">
            <div class="mb-3">
              <i :class="item.icon" class="fs-1 text-danger"></i>
            </div>
            <h5 class="fw-bold">{{ item.title }}</h5>
            <p class="text-muted small">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Đối Tượng & Lợi Ích -->
    <div class="text-center mb-5">
      <h2 class="fw-bold">Đối Tượng & Lợi Ích</h2>
      <p class="text-muted">
        Hệ thống được thiết kế để phục vụ tất cả đối tượng trong hệ sinh thái hiến máu
      </p>
    </div>

    <!-- Các đối tượng -->
    <div class="row g-4 text-center">
      <div class="col-md-4" v-for="(item, index) in benefitItems" :key="index">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body">
            <div class="mb-3">
              <i :class="item.icon" class="fs-1 text-primary"></i>
            </div>
            <h5 class="fw-bold">{{ item.title }}</h5>
            <ul class="list-unstyled text-start ms-5 ">
              <li v-for="(point, idx) in item.points" :key="idx">
                ✅ {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

   <div class="container my-5">

    <!-- Đội ngũ phát triển -->
    <div class="text-center mb">
      <h2 class="fw-bold">Đội Ngũ Phát Triển</h2>
      <p class="text-muted">
        Những con người tận tâm đứng sau dự án Smart Blood Donation
      </p>
    </div>

    <div class="row justify-content-center g-4 mb-5 text-center">
      <div class="col-6 col-md-2" v-for="(member, index) in team" :key="index">
        <div class="team-member">
          <img :src="member.image" class="rounded-circle mb-3 img-fluid shadow" alt="avatar" />
          <h6 class="fw-bold">{{ member.name }}</h6>
          <p class="text-muted small mb-1">{{ member.role }}</p>
          <p class="small text-primary">{{ member.email }}</p>
        </div>
      </div>
    </div>

    <!-- Call To Action -->
    <div class="cta-section text-center p-5 rounded shadow-sm">
      <h4 class="fw-bold mb-3">Hãy cùng chúng tôi chung tay vì sự sống</h4>
      <p class="text-muted mb-4">
        Mỗi giọt máu hiến tặng là một cơ hội cứu sống. Hãy tham gia cộng đồng hiến máu ngay hôm nay!
      </p>
      <button class="btn btn-danger btn-lg rounded-pill">
        ❤️ Đăng ký hiến máu ngay
      </button>
    </div>

  </div>
</template>
<script setup>
import leaderImg from '../../../assets/img/avatar.jpg'

const projectItems = [
  { icon: "bi bi-people-fill", title: "Kết nối cộng đồng hiến máu", desc: "Tạo cầu nối giữa hiến máu tình nguyện/tiếp nhận máu" },
  { icon: "bi bi-clipboard2-data-fill", title: "Quản lý kho máu minh bạch", desc: "Theo dõi, quản lý dữ liệu kho máu rõ ràng" },
  { icon: "bi bi-bell-fill", title: "Cảnh báo và hỗ trợ kịp thời", desc: "Đảm bảo máu sẵn sàng cho các tình huống khẩn cấp" },
  { icon: "bi bi-heart-pulse-fill", title: "Đóng góp cho sức khỏe cộng đồng", desc: "Những giọt máu hiến tặng giúp cứu sống nhiều người" },
]

const benefitItems = [
  { 
    icon: "bi bi-heart-fill", 
    title: "Người hiến máu", 
    points: ["Dễ dàng đăng ký hiến máu","Theo dõi lịch sử hiến máu", "Nhận thông báo nhắc lịch", "Quản lý thông tin cá nhân"] 
  },
  { 
    icon: "bi bi-hospital-fill", 
    title: "Bệnh viện / Ngân hàng máu", 
    points: ["Quản lý kho máu hiệu quả","Tự động quản lý kho máu", "Tìm người hiến phù hợp", "Báo cáo và thống kê"] 
  },
  { 
    icon: "bi bi-person-badge-fill", 
    title: "Quản trị viên", 
    points: ["Quản lý toàn hệ thống","Theo dõi công việc", "Quản lý thông tin", "Kiểm duyệt & xét duyệt"] 
  },
]

const team = [
  { name: "Tài Phạm", role: "Project Leader", email: "leader@smartblood.com", image: leaderImg},
  { name: "Lê Toàn", role: "Full-stack Developer", email: "dev@smartblood.com", image: leaderImg },
  { name: "Dương Lượng", role: "Frontend Developer", email: "luong@smartblood.com", image: leaderImg },
  { name: "Quỳnh Chi", role: "Frontend Developer", email: "design@smartblood.com", image: leaderImg },
  { name: "Minh Thành", role: "Frontend Developer", email: "qa@smartblood.com", image: leaderImg },
]
</script>

<style scoped>
  .card {
  border-radius: 1rem;
}

.team-member img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}
.cta-section {
  background: #fff5f5;
}
</style>