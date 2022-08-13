const query = document.querySelector.bind(document);
const querys = document.querySelectorAll.bind(document);

const http = new XMLHttpRequest();
const product = query(".product");
console.log(product);
const productDetail = query(".productDetail");
const background = query(".background");
const options = querys(".sub-menu_item");
const options1 = querys(".type");
const input = query("input[name=query]");
const resultsBar = query(".results-bar");
const List = query(".listProductName  span");
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
    if (index == 0) {
      productType = "shirt";
      handleData(dataN);
    } else if (index == 1) {
      productType = "pant";

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
      let div = `<div class="allResults">
                    <div class='results' data-index='${ valueProduct.id }'>
                    <span class="saleProductHome">${ valueProduct.sale }</span>
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
      if (product) {
        product.insertAdjacentHTML("beforeend", div);
      }
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
if (background) {
  background.onclick = function () {
    background.classList.remove("show");
    productDetail.innerHTML = "";
    productDetail.classList.remove("showDetails");
  };
}
console.log(product);

if (product) {
  product.onclick = function (e) {
    console.log(product);
    e.stopPropagation();
    console.log(e.target.dataset.index);
    if (e.target.dataset.index) {
      background.classList.toggle("show", !check);
      productDetail.classList.add("showDetails");

      dataN.map((prop) => {
        if (e.target.dataset.index == prop.id) {
          let star
          console.log(prop.quality);
          if (prop.quality == 1.0) {
            star = '<i class="fa-solid fa-star"></i>'
          } else if (prop.quality == 2.0) {
            star = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>'

          } else if (prop.quality == 3.0) {
            star = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>'

          } else if (prop.quality == 4.0) {
            star = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>'
          } else if (prop.quality == 5.0) {
            star = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>'

          }
          console.log(star);
          let div = `<div class='image'><img id="src"src=
                    ${ prop.image }
                    alt='${ prop.name }'
                    /></div>
                    <div class='order'>
                      <div class='star'>${ prop.quality }.0<span>${ star }</span></div>
                      <p class='productName' >
                        ${ prop.name }
                      </p>
                    <div class='price'><p>
                     <sup>$</sup>${ prop.price }</p>
                  </div> 
                  <div class='saleProduct'>${ prop.sale }</div>
                  <div class='sizeProduct'></div>
                  <div class="requierBuy">
                      <button>Buy</button>
                  </div>
                </div>
               <div class='allColor'> <div class='resultColor'></div></div>`;
          productDetail.insertAdjacentHTML("beforeend", div);
          const productColor = query(
            `div[class="resultColor"][data-index='${ prop.id }']`
          );
          if (prop.hasOwnProperty("shirt") && prop.id == prop.shirt.id) {
            const sizeProduct = query(".sizeProduct");
            console.log(sizeProduct);
            const color = query(".resultColor");
            prop.shirt.color.map((valueColor) => {
              const div3 = `<div class="colorProduct" data-index="${ valueColor.id }"><img src="${ valueColor.image }" alt="${ valueColor.color }"/></div>`;
              color.insertAdjacentHTML("beforeend", div3);
            });
            prop.shirt.size.map(valueSize => {
              const div4 = `<div class='sizePr'>${ valueSize.size }</div>`
              sizeProduct.insertAdjacentHTML("beforeend", div4);

            })

          } else if (prop.hasOwnProperty("pant") && prop.id == prop.pant.id) {
            const sizeProduct = query(".sizeProduct");
            const color = query(".resultColor");
            prop.pant.color.map((valueColor) => {
              const divColor = `<div class="colorProduct" data-index="${ valueColor.id }"><img src="${ valueColor.image }" alt="${ valueColor.color }"/></div>`;
              color.insertAdjacentHTML("beforeend", divColor);
            });
            prop.pant.size.map(valueSize => {
              const divSize = `<div class='sizePr'>${ valueSize.size }</div>`
              sizeProduct.insertAdjacentHTML("beforeend", divSize);

            })
          } else if (prop.hasOwnProperty("skirt") && prop.id == prop.skirt.id) {
            const sizeProduct = query(".sizeProduct");
            const color = query(".resultColor");
            prop.skirt.color.map((valueColor) => {
              const divColor = `<div class="colorProduct" data-index="${ valueColor.id }"><img src="${ valueColor.image }" alt="${ valueColor.color }"/></div>`;
              color.insertAdjacentHTML("beforeend", divColor);
            });
            prop.skirt.size.map(valueSize => {
              const divSize = `<div class='sizePr'>${ valueSize.size }</div>`
              console.log(divSize);
              sizeProduct.insertAdjacentHTML("beforeend", divSize);

            })
          } else if (prop.hasOwnProperty("shoes") && prop.id == prop.shoes.id) {
            const sizeProduct = query(".sizeProduct");
            const color = query(".resultColor");
            prop.shoes.color.map((valueColor) => {
              const divColor = `<div class="colorProduct" data-index="${ valueColor.id }"><img src="${ valueColor.image }" alt="${ valueColor.color }"/></div>`;
              color.insertAdjacentHTML("beforeend", divColor);
            });
            prop.shoes.size.map(valueSize => {
              const divSize = `<div class='sizePr'>${ valueSize.size }</div>`
              sizeProduct.insertAdjacentHTML("beforeend", divSize);

            })
          } else if (prop.hasOwnProperty("hat") && prop.id == prop.hat.id) {
            const sizeProduct = querys(".sizeProduct");
            const color = query(".resultColor");
            prop.hat.color.map((valueColor) => {
              const divColor = `<div class="colorProduct" data-index="${ valueColor.id }"><img src="${ valueColor.image }" alt="${ valueColor.color }"/></div>`;
              color.insertAdjacentHTML("beforeend", divColor);
            });
            prop.hat.size.map(valueSize => {
              const divSize = `<div class='sizePr'>${ valueSize.size }</div>`
              sizeProduct.insertAdjacentHTML("beforeend", divSize);

            })
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
}

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
