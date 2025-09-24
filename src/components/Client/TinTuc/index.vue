<template>
    <section class="position-relative align-items-center justify-content-center text-center d-flex">
        <img src="../../../assets/img/banner2.jpg" alt="hình ảnh hiến máu" style="height: 500px;width: 100vw; opacity: 0.5;">
        <div class="position-absolute">
             <div class="position-relative z-1 ">
                <h2 style="font: 4em sans-serif;">Tin tức & Chiến dịch Hiến Máu</h2>
                <p>Cập nhật nhanh các hoạt động hiến máu, sự kiện và thông báo quan trọng</p>
            </div>
        </div>
    </section>

    <div class="container"> 
        <div class="row p-4 g-4">
            <div class="col-md-3 bg-light p-3" style="width: 300px;">
                <h6>Bộ lọc</h6>
                <div>
                    <label >Loại nội dung</label>
                    <select class="form-select">
                        <option>Tất cả</option>
                        <option>Bài viết</option>
                        <option>Video</option>
                    </select>
                </div>

                <div>
                    <label> Thời gian</label>
                    <select class="form-select">
                        <option>Hôm nay</option>
                        <option>Tuần này</option>
                        <option>Tất cả</option>
                    </select>
                        
                </div>

            </div>

            <div class="col-md-9 bg-light " >
                <h3>Tin tức mới nhất</h3>
            </div>
        </div>
    </div>
</template>