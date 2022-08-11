
let checkClick = 1;
console.log('ok');
$(".category-icon").click((e) => {
  console.log(e.target);
  if (checkClick == 1) {
    console.log(1);
    $(".category-prd").setAttribute(
      "style",
      "display: block !important; z-index: 1;"
    );
    checkClick = 0;
  } else {
    $(".category-prd").setAttribute("style", "display: none !important;");
    checkClick = 1;
  }
});
