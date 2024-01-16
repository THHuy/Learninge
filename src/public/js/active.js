// Lấy tất cả các mục tab
const tabItems = document.querySelectorAll(".tab-item");

// Lặp qua mỗi mục tab và thêm sự kiện click
tabItems.forEach((tabItem, index) => {
  tabItem.addEventListener("click", function () {
    // Xóa class active từ tất cả các mục tab
    tabItems.forEach((item) => item.classList.remove("active"));

    // Thêm class active cho mục tab được nhấn
    tabItem.classList.add("active");
    // Hiển thị nội dung tương ứng với mục tab được nhấn
    const tabContentItems = document.querySelectorAll(".tab-pane");
    tabContentItems.forEach((contentItem) =>
      contentItem.classList.remove("active")
    );
    tabContentItems[index].classList.add("active");
  });
});

function goBack() {
  // Sử dụng window.history để điều hướng trang về trang trước
  window.history.back();
}
