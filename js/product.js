const query = document.querySelector.bind(document);
const querys = document.querySelectorAll.bind(document);

const http = new XMLHttpRequest();
const product = query(".product");
const productDetail = query(".productDetail");
const background = query(".background");
const options = querys(".sub-menu_item");
const options1 = querys(".type");
const input = query("input[name=query]");
const resultsBar = query(".results-bar");
const List = query(".listProductName h3 span");
const closeSearch = query(".closeSearch");
let check = false;
let dataN;
let productType = "shirt";
let number;

http.open("GET", "./data/data.json", true);
http.send();



http.onreadystatechange = function () {
  if (this.readyState == 4) {
    dataN = JSON.parse(this.responseText).product;
    handleData(JSON.parse(this.responseText).product);
  }
};
Array.from(options).map((elm, index) => {
  elm.onclick = (e) => {
    product.innerHTML = "";
    if (index == 0) {
      productType = "shirt";
      List.innerText = productType;

      List.innerText = productType;
      handleData(dataN);
    } else if (index == 1) {
      productType = "pant";
      List.innerText = productType;

      handleData(dataN);
    } else if (index == 2) {
      productType = "skirt";
      List.innerText = productType;

      handleData(dataN);
    } else if (index == 3) {
      productType = "shoes";
      List.innerText = productType;

      handleData(dataN);
    } else if (index == 4) {
      productType = "hat";
      List.innerText = productType;

      handleData(dataN);
    }
  };
});
Array.from(options1).map((elm, index) => {
  elm.onclick = (e) => {
    console.log("ok");
    product.innerHTML = "";
    if (index == 0) {
      productType = "shirt";
      List.innerText = productType;
      handleData(dataN);
    } else if (index == 1) {
      productType = "pant";
      List.innerText = productType;

      handleData(dataN);
    } else if (index == 2) {
      productType = "skirt";
      List.innerText = productType;

      handleData(dataN);
    } else if (index == 3) {
      productType = "shoes";
      List.innerText = productType;

      handleData(dataN);
    } else if (index == 4) {
      productType = "hat";
      List.innerText = productType;

      handleData(dataN);
    }
  };
});
function handleData(data) {
  data.map((valueProduct, index) => {
    console.log(productType);
    if (valueProduct.hasOwnProperty(productType)) {
      number = index;
      let div = `<div class="allResults">
                 
                    <div class='results' data-index='${ valueProduct.id }'>
                     <span class='hoverTitle'>${ valueProduct.name }</span>
                      <div class='productAvatar'>
                        <img data-index='${ valueProduct.id }' src='${ valueProduct.image }' alt='${ valueProduct.name }'/>
                         
                        </div>
                      <div class="productOverview">
                        <div class="information">
                          <div class='productName'>
                             ${ valueProduct.name }
                            
                          </div>
                          <div class="price">
                            <sup>$</sup>${ valueProduct.price }
                          </div>
                        </div>


                          <div class='submitProduct'>

                            <div class="status">
                              <div class="sold">sold:  <span>50</span></div>
                            </div>
                            <div class="statuss">
                              <div class="addCart">Add cart</div>
                              <div class="buyProduct">Buy</div>
                            </div>

                          </div>

                      </div>
                    </div></div>`;
      product.insertAdjacentHTML("beforeend", div);
    }
    // handleType(valueProduct);
  });
  const hoverAvatar = querys(".productAvatar");
  const hoverName = querys(".productName");

  const AllHover = Array.from(hoverAvatar).concat(Array.from(hoverName));
  console.log(AllHover);
  AllHover.map((elm) => {
    elm.onmouseover = (e) => {
      e.target
        .closest(".results")
        .querySelector(".hoverTitle")
        .classList.toggle("hoverShow");
    };
    elm.onmouseout = (e) => {
      e.target
        .closest(".results")
        .querySelector(".hoverTitle")
        .classList.remove("hoverShow");
    };
  });

  // function handleType(valueProduct) {

  // }
}
background.onclick = function () {
  background.classList.remove("show");
  productDetail.innerHTML = "";
  productDetail.classList.remove("showDetails");
};

product.onclick = function (e) {
  e.stopPropagation();
  if (e.target.dataset.index) {
    background.classList.toggle("show", !check);
    productDetail.classList.add("showDetails");

    dataN.map((prop) => {
      if (e.target.dataset.index == prop.id) {

        let div = `<div class='image'><img id="src"src=
                    ${ prop.image }
                    alt='${ prop.name }'
                    /></div>
                    <div class='order'>
                      <div class='star'>${ prop.quality }.0<span></span></div>
                      <p class='productName' >
                        ${ prop.name }
                      </p>
                    <div class='price'><p>
                     <sup>$</sup>${ prop.price }</p>
                  </div> 
                  <div class='saleProduct'>${ prop.sale }</div>
                </div>
                <div class='resultColor'></div>`;
        productDetail.insertAdjacentHTML("beforeend", div);
        const productColor = query(
          `div[class="resultColor"][data-index='${ prop.id }']`
        );
        if (prop.hasOwnProperty("shirt") && prop.id == prop.shirt.id) {
          const color = query(".resultColor");
          prop.shirt.color.map((valueColor) => {
            const div3 = `<div class="colorProduct" data-index="${ valueColor.id }"><img src="${ valueColor.image }" alt="${ valueColor.color }"/></div>`;
            color.insertAdjacentHTML("beforeend", div3);
          });
        }
      }
    });
    const colorProduct = querys(".colorProduct");
    const image = query("#src");
    console.log(colorProduct);
    Array.from(colorProduct).map((elm) => {
      elm.onmouseover = function (e) {
        if (e.target.hasAttribute("src")) {
          const src = e.target.getAttribute("src");
          image.setAttribute("src", src);
        }
      };
    });
  }
};

input.oninput = function (e) {
  dataN.map((elm) => {
    console.log(e.target.value, elm.name);

    if (e.target.value == elm.name) {
      t(elm);
      function t(valuejson) {
        const div = ` <div class="search-results" data-index=${ valuejson.id }>
                      <img data-index=${ valuejson.id } src="${ valuejson.image }" alt="${ valuejson.name }"/>
                      <div class="information-search" data-index=${ valuejson.id }>
                        <span class="product-Name" data-index=${ valuejson.id }>${ valuejson.name }</span>
                        <span class="product-price" data-index=${ valuejson.id }><sup>$</sup>${ valuejson.price }</span>
                      </div>
                      <span class="product-status" data-index=${ valuejson.id }>still</span>
                    </div>`;

        resultsBar.insertAdjacentHTML("beforeend", div);
      }
    }

    if (e.target.value === "") {
      resultsBar.innerHTML = "";
    }
  });

  const resultSearch = query(".search-results");
  console.log(resultSearch);
  if (resultSearch) {
    resultSearch.onclick = (e) => {
      dataN.map((value) => {
        if (value.id == e.target.dataset.index) {
          console.log(value);
          i(value);
        }
      });
    };
  }
};
function i(value) {
  let div5 = `<div class='image'><img src=
                    ${ value.image }
                    alt='${ value.name }'
                    /></div>
                    <div class='order'>
                      <div class='star'>${ value.quality }.0<span></span></div>
                      <p class='productName' >
                        ${ value.name }
                      </p>
                    <div class='price'><p>
                     <sup>$</sup>${ value.price }</p>
                  </div> 
                  <div class='saleProduct'>${ value.sale }</div>
                </div>
                <div class='resultColor'></div>`;
  productDetail.insertAdjacentHTML("beforeend", div5);
  background.classList.toggle("show", !check);
  productDetail.classList.add("showDetails");
  console.log(productDetail);
}
console.log(closeSearch);
closeSearch.onclick = function () {
  input.value = "";
  resultsBar.innerHTML = "";
};
