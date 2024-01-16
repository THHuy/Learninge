// Submit & Restart

function submit_exersice(p) {
  var exercises = document.getElementById("exercises-" + p);
  const answerElements = exercises.querySelectorAll(".answer");
  const dataSuccessArray = Array.from(answerElements).map((answerElement) =>
    answerElement.getAttribute("data-success")
  );
  var sum = answerElements.length;
  var correct = 0;
  for (var i = 0; i < answerElements.length; i++) {
    var radio = document.getElementsByName("answer" + i);
    for (var j = 0; j < radio.length; j++) {
      if (radio[j].checked) {
        if (radio[j].value === dataSuccessArray[i]) {
          answerElements[i].classList.add("ans-right");
          answerElements[i].classList.remove("ans-wrong");
          correct += 1;
        } else {
          answerElements[i].classList.remove("ans-right");
          answerElements[i].classList.add("ans-wrong");
        }
      } else {
        answerElements[i].classList.add("ans-wrong");
      }
    }
  }
  var score = (correct / sum) * 10;
  // Đặt giá trị score vào window.location.search
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.set("point", score.toFixed(2));
  searchParams.set("ex", p)
  // Cập nhật URL với giá trị mới của point
  var newUrl = window.location.pathname + "?" + searchParams.toString();
  window.history.replaceState({}, document.title, newUrl);
  // var point = exercises.querySelector(".point-show");
  var point = document.querySelector(".modal-header");
  point.innerHTML = `<h5 class="modal-title" data-point="${score.toFixed(2)}">
  Chúc mừng bạn được: ${score.toFixed(2)} điểm
  </h5>
  `;
  // alert("Chúc mừng bạn được: " + score.toFixed(2) + " điểm");
}
function reset_exersice() {
  var result = confirm("Are you sure you want to reset?");
  if (result) {
    location.reload();
  } else {
    return;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var pointForm = document.forms["point-form"];
  var btnSuccess = document.getElementById("btn-point");
  btnSuccess.onclick = () => {
    pointForm.action = `/exercises/point/${window.location.search}`;
    pointForm.submit();
  };
});
