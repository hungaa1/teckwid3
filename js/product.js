const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const http = new XMLHttpRequest();
const product = $(".product");
const productDetail = $(".productDetail");
const background = $(".background");
const options = $$(".sub-menu_item");
const input = $("input[name=query]");
const resultsBar = $(".results-bar");
console.log(options);
let check = false;
let dataN;
let productType = "shirt";
let number;
http.open("GET", "../data/data.json", true);
http.send();
http.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (JSON.parse(this.responseText).product.hasOwnProperty(productType)) {
      console.log("ok");
    }
    dataN = JSON.parse(this.responseText).product;

    handleData(JSON.parse(this.responseText).product);
  }
};
Array.from(options).map((elm, index) => {
  elm.onclick = (e) => {
    product.innerHTML = "";
    if (index == 0) {
      productType = "pant";
      handleData(dataN);
    } else if (index == 1) {
      productType = "shirt";
      handleData(dataN);
    } else if (index == 2) {
      productType = "skirt";
      handleData(dataN);
    } else if (index == 3) {
      productType = "shoes";
      handleData(dataN);
    } else if (index == 4) {
      productType = "hat";

      handleData(dataN);
    }
  };
});

function handleData(data) {
  data.map((valueProduct, index) => {
    console.log(productType);
    if (valueProduct.hasOwnProperty(productType)) {
      number = index;
      let div = `<div class='results' data-index='${valueProduct.id}'>
                      <div class='productAvatar'>
                        <img data-index='${valueProduct.id}' src='${valueProduct.avatar}' alt='${valueProduct.name}'/>
                      </div>
                      <div class="productOverview">
                        <div class="information">
                          <div class='productName'>
                              <p data-index='${valueProduct.id}'>${valueProduct.name}</p>
                          </div>
                          <div class="price">
                            <sup>$</sup>${valueProduct.price}
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
                    </div>`;

      product.insertAdjacentHTML("beforeend", div);
    }
    // handleType(valueProduct);
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
    console.log(dataN);

    dataN.map((prop) => {
      if (e.target.dataset.index == prop.id) {
        let div = `<div class='image'><img src=
                  ${prop.avatar}
                   alt='${prop.name}'
                  /></div><div class='order'><p class='productName' >
                 ${prop.name}
                  </p><div class='price'><p>
                   ${prop.price}
                </p></div></div><div class='resultColor'></div>`;
        productDetail.insertAdjacentHTML("beforeend", div);

        const productColor = $(
          `div[class="resultColor"][data-index='${prop.id}']`
        );
        if (prop.hasOwnProperty("shirt") && prop.id == prop.shirt.id) {
          const color = $(".resultColor");
          prop.shirt.color.map((valueColor) => {
            const div3 = `<div class="colorProduct"><img src="${valueColor.image}" alt="${valueColor.color}"/></div>`;
            color.insertAdjacentHTML("beforeend", div3);
          });
        }
      }
    });
  }
};
input.oninput = function (e) {
  dataN.map((elm) => {
    if (elm.name == e.target.value) {
      const div = ` <div class="search-results">
                      <img src="${elm.avatar}" alt="${elm.name}"/>
                      <div class="information-search">
                        <span class="product-Name">${elm.name}</span>
                        <span class="product-price"><sup>$</sup>${elm.price}</span>
                      </div>
                      <span class="product-status">still</span>
                    </div>`;

      resultsBar.insertAdjacentHTML("beforeend", div);
    }

    if (e.target.value === "") {
      resultsBar.innerHTML = "";
    }
  });
};
