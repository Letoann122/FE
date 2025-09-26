<template>
  <section
    class="position-relative align-items-center justify-content-center text-center d-flex"
  >
    <img
      src="../../../assets/img/banner2.jpg"
      alt="hình ảnh hiến máu"
      style="height: 500px; width: 100vw; opacity: 0.5"
    />
    <div class="position-absolute">
      <div class="position-relative z-1">
        <h2 style="font: 4em sans-serif">Tin tức & Chiến dịch Hiến Máu</h2>
        <p>
          Cập nhật nhanh các hoạt động hiến máu, sự kiện và thông báo quan trọng
        </p>
      </div>
    </div>
  </section>

  <div>
    <div class="row p-4 g-4">
      <div
        class="col-md-3 bg-light p-3"
        style="width: 300px; height: 230px; border-radius: 10px"
      >
        <div class="row">
          <div class="col-12 mb-3 p-3 bg-white rounded shadow-sm">
            <h6>Bộ lọc</h6>
            <label class="mb-2">Loại nội dung</label>
            <select class="form-select mb-2">
              <option>Tất cả</option>
              <option>Bài viết</option>
              <option>Video</option>
            </select>
            <label class="m-2">Thời gian</label>
            <select class="form-select">
              <option>Hôm nay</option>
              <option>Tuần này</option>
              <option>Tất cả</option>
            </select>
          </div>

          <div class="col-12 p-3 bg-white rounded shadow-sm">
            <h6>Sự kiện nổi bật</h6>
            <div>
              <i class="bi bi-building-check text-danger m-2"></i>
              <label style="font-weight: bold; font-size: 15px"
                >Ngày hiến máu thế giới</label
              >
              <label class="mb-2">14/06/2025 </label>
            </div>
            <div>
              <i class="bi bi-heart-fill text-danger m-2"></i>
              <label class="" style="font-weight: bold; font-size: 15px"
                >Ngày hiến máu thế giới</label
              >
              <label>14/06/2025 </label>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-9 bg-light">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="d-flex align-items-center">
              <i class="bi bi-newspaper text-danger fs-4"></i>
              <h3 class="m-2">Tin tức mới nhất</h3>
            </div>
            <div class="row g-4">
              <div class="col-md-4" v-for="(news, index) in Data" :key="index">
                <div
                  class="card h-90 border-0 shadow-sm rounded-3 overflow-hidden"
                >
                  <div class="p-3">
                    <div class="news-image mb-3">
                      <img
                        :src="news.image"
                        alt="news image"
                        class="img-fluid rounded"
                      />
                    </div>

                    <div class="news-content">
                      <h6 class="fw-bold">{{ news.title }}</h6>
                      <p class="text-muted small mb-1">{{ news.date }}</p>
                      <p class="text-secondary small">{{ news.desc }}</p>
                      <p>
                        <a href="#" class="text-danger fw-bold small"
                          >Xem chi tiết</a
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mb-4" style="background-color: white">
          <div class="d-flex align-items-center">
            <i class="bi bi-newspaper text-danger fs-4 ms-3"></i>
            <h3 class="m-2">Chiến dịch hiển máu</h3>
          </div>

          <div class="row align-items-center justify-content-center p-3 d-flex">
            <div>
              <h6 class="ms-2" style="font-weight: bold">
                Chiến dịch hiến máu mùa thu 2025
              </h6>
              <div class="text-end">
                <a class="regis" href="#">Đăng ký tham gia</a>
              </div>
            </div>

            <div class="col-12">
              <div>
                <i class="bi bi-geo-alt-fill"></i>
                <label class="ms-2">BV Đa Khoa Đà Nẵng</label>
              </div>
              <div>
                <i class="bi bi-clock-fill"></i>
                <label class="ms-2">20/09/2025- 8:00-17:00</label>
              </div>
              <p class="status-active">Đang diễn ra</p>
            </div>
          </div>

          <div class="row align-items-center justify-content-center p-3 d-flex">
            <div>
              <h6 class="ms-2" style="font-weight: bold">
                Chiến dịch hiến máu cứu người -Mùa hè 2025
              </h6>
              <div class="text-end">
                <a class="regis" href="#">Đăng ký tham gia</a>
              </div>
            </div>

            <div class="col-12">
              <div>
                <i class="bi bi-geo-alt-fill"></i>
                <label class="ms-2">BV Chợ Rẫy - TPHCM</label>
              </div>
              <div>
                <i class="bi bi-clock-fill"></i>
                <label class="ms-2">20/09/2025- 8:00-17:00</label>
              </div>
              <p class="status-active">Đang diễn ra</p>
            </div>
          </div>

          <div class="row align-items-center justify-content-center p-3 d-flex">
            <div>
              <h6 class="ms-2" style="font-weight: bold">
                Ngày hiến Máu Tình Nguyện toàn quốc
              </h6>
            </div>

            <div class="col-12">
              <div>
                <i class="bi bi-geo-alt-fill"></i>
                <label class="ms-2">Trung tâm Huyết học - TPHCM</label>
              </div>
              <div>
                <i class="bi bi-clock-fill"></i>
                <label class="ms-2">20/09/2025- 8:00-17:00</label>
              </div>
              <p class="status-active">Đã kết thúc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cta-section text-center p-5 rounded shadow-sm bg-light">
    <h4 class="fw-bold mb-3">Hãy cùng chúng tôi chung tay vì sự sống</h4>
    <p class="text-muted mb-4">
      Mỗi giọt máu hiến tặng là một cơ hội cứu sống. Hãy tham gia cộng đồng hiến
      máu ngay hôm nay!
    </p>
    <button class="btn btn-danger btn-lg rounded-pill">
      ❤️ Đăng ký hiến máu ngay
    </button>
  </div>
</template>
<script setup>
const Data = [
  {
    title: "Lợi ích sức khỏe khi hiến máu định kỳ",
    date: "12/09/2025",
    desc: "Giúp cải thiện tuần hoàn máu, giảm nguy cơ bệnh tim và nhiều lợi ích khác...",
    image: new URL("../../../assets/img/hienmau.jpg", import.meta.url).href,
  },
  {
    title: "Quy trình xét nghiệm máu hiện đại",
    date: "10/09/2025",
    desc: "Tìm hiểu về công nghệ mới trong xét nghiệm và bảo quản máu hiến...",
    image: new URL("../../../assets/img/hienmau.jpg", import.meta.url).href,
  },
  {
    title: "Những câu chuyện cảm động từ người hiến máu",
    date: "08/09/2025",
    desc: "Chia sẻ từ những người hiến máu tình nguyện và tác động tích cực...",
    image: new URL("../../../assets/img/hienmau.jpg", import.meta.url).href,
  },
];
</script>
<style scoped>
.status-active {
  color: red;
  margin-top: 10px;
  border: 1px solid red;
  border-radius: 10px;
  background-color: aquamarine;
  width: fit-content;
  padding: 4px 12px;
  font-weight: bold;
}
.regis {
  background-color: red;
  color: white;
  border: 1px solid red;
  border-radius: 10px;
  padding: 6px 10px;
  margin-bottom: 20px;
}
</style>
