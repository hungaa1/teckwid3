const query = document.querySelector.bind(document);
const querys = document.querySelectorAll.bind(document);
const body = $('.body');
const ListCart = query(".allCartList")

let check0 = ['0'];
let check1 = [];
let check2 = 0;
let check3 = 0; let pr = 0;
const eg = query('#pri')
console.log(eg);
function addCarts(data) {

    if (check2 != data.id) {
        // pr += data.price
        // eg.innerHTML = `${ getItem.length }: <sup>$</sup>${ pr }`
        d(data)
        check2 = data.id
        function d(data) {
            const div = `<div class="cart-content_lst">
                                                <div class="closeCart" data-index='${ data.id }'>
                                                    <i class="fa-solid fa-xmark" data-index='${ data.id }'></i>
                                                </div>
                                                <div class="listProductCart">
                                                <img
                                                    src="${ data.image }"
                                                    alt="${ data.name }"
                                                />
                                                <div class="informationCart">
                                                    <div class="nameProductCart">
                                                    ${ data.name }
                                                    </div>
                                                    <div class="priceProductCart"><sup>$</sup>${ data.price }</div>
                                                </div>
                                                </div>
                                            </div>`
            ListCart.insertAdjacentHTML("beforeend", div);
            return div;


        }
        const quantityP = query(".position-absolute.top-50.start-50.translate-middle.fw-semibold")
        const getdataCart = JSON.parse(localStorage.getItem("cart"))

        const closeCartd = querys(".closeCart")
        const arr = []
        const buy = query('#payment')
        const code = []
        buy.onclick = function () {
            alert('Ordered successfully')
            localStorage.clear();
            ListCart.innerHTML = ''
            quantityP.innerHTML = ''
        }

        Array.from(closeCartd).map((closeC) => {
            closeC.onclick = (e) => {
                const getdataCartCurrent = JSON.parse(localStorage.getItem("cart"))
                getdataCartCurrent.forEach((getdata, index, array) => {


                    console.log(e.target.dataset.index, array);
                    if (getdata.id == e.target.dataset.index) {
                        array.forEach((elmP, index, array1) => {
                            if (elmP.id == e.target.dataset.index) {
                                console.log(array1[index]);
                                array.splice(index, 1);
                                localStorage.setItem("cart", JSON.stringify(array))
                                ListCart.innerHTML = '';


                                array.map(el => {
                                    const div = `<div class="cart-content_lst">
                                                <div class="closeCart" data-index='${ el.id }'>
                                                    <i class="fa-solid fa-xmark" data-index='${ el.id }'></i>
                                                </div>
                                                <div class="listProductCart">
                                                <img
                                                    src="${ el.image }"
                                                    alt="${ el.name }"
                                                />
                                                <div class="informationCart">
                                                    <div class="nameProductCart">
                                                    ${ el.name }
                                                    </div>
                                                    <div class="priceProductCart"><sup>$</sup>${ el.price }</div>
                                                </div>
                                                </div>
                                            </div>`
                                    code.push(div)
                                })

                                ListCart.innerHTML = code.join('')

                            }

                        })


                    }

                })


            }
        })


        if (getdataCart.length > 0) {
            quantityP.innerText = getdataCart.length
        } else {
            quantityP.innerText = 0
        }
    }

}
$(document).ready(function () {
    home()
    function home() {

        $.ajax({
            url: './home.html',
            type: 'GET',
            dataType: 'html',
            success: function (data) {

                const d = $('.body')[0]
                d.insertAdjacentHTML("beforeend", data)



                const http = new XMLHttpRequest();
                const product = query(".product");
                console.log(product);
                const productDetail = query(".productDetail");
                const background = query(".background");
                const options = querys(".sub-menu_item");
                const options1 = querys(".type");
                const typeCategory = querys(".typeCategory")
                console.log(options1);
                const input = query("input[name=query]");
                const resultsBar = query(".results-bar");
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




                        console.log('ds');

                        const getItem = JSON.parse(localStorage.getItem('cart'))
                        if (getItem) {
                            getItem.map((data) => {
                                if (check1.includes(`${ data.id }`) && check3 != 0) {

                                    console.log('ds', check3);
                                    return

                                } else {
                                    console.log(check1, check3);
                                    console.log('ds');
                                    check3 = 1
                                    addCarts(data, getItem)


                                }


                            })
                        }


                    }
                };
                Array.from(options).map((elm, index) => {
                    console.log(index);
                    elm.onclick = (e) => {
                        console.log('ok123');
                        product.innerHTML = "";
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
                Array.from(options1).map((elm, index) => {
                    elm.onclick = (e) => {
                        console.log("ok");
                        product.innerHTML = "";
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
                Array.from(typeCategory).map((elm, index) => {

                    elm.onclick = (e) => {

                        product.innerHTML = "";
                        if (index == 0) {
                            console.log('dá');
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
                                  <div class="addCart" data-add=${ valueProduct.id }>Add cart</div>
                                  <div class="buyProduct">Buy</div>
                                </div>
    
                              </div>
    
                          </div>
                        </div></div>`;
                            if (product) {
                                product.insertAdjacentHTML("beforeend", div);
                            }
                        }
                    });
                    const hoverAvatar = querys(".productAvatar");
                    const hoverName = querys(".productName");

                    const AllHover = Array.from(hoverAvatar).concat(Array.from(hoverName));

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
                    const addCart = querys('.addCart');

                    const dataCart = []
                    Array.from(addCart).map((elmCart, index) => {
                        elmCart.onclick = (e) => {

                            dataN.map((elmP, index) => {
                                console.log(e.target.dataset.add == elmP.id);
                                if (e.target.dataset.add == elmP.id) {
                                    const cartItem = JSON.parse(localStorage.getItem("cart")) || []
                                    if (cartItem.length > 0) {

                                        let checkV = true
                                        cartItem.forEach((val, index, array) => {
                                            check1.push(`${ val.id }`)
                                            console.log(array[index]);
                                            if (val.id == elmP.id) {
                                                array[index].quantity++;
                                                localStorage.setItem('cart', JSON.stringify(array));
                                            } else {

                                                console.log(check0);
                                                if (check0.includes(`${ elmP.id }`)) {
                                                    return

                                                } else {

                                                    check0.push(`${ elmP.id }`)
                                                    array.push(elmP);
                                                    localStorage.setItem('cart', JSON.stringify(array));
                                                }



                                            }


                                        })



                                    } else {
                                        dataCart.push(elmP)
                                        localStorage.setItem('cart', cartItem.length > 0 ? JSON.stringify(cartItem) : JSON.stringify(dataCart));


                                    }

                                }
                            })

                            if (check1.length > 0) {
                                const getdataCart = JSON.parse(localStorage.getItem("cart")) || []
                                getdataCart.map((data) => {
                                    if (check1.includes(`${ data.id }`)) {

                                        return

                                    } else {
                                        addCarts(data)
                                        check1.push(`${ data.id }`)
                                        console.log(check1);

                                    }


                                })
                            }
                        }
                    })
                }
                if (background) {
                    background.onclick = function () {
                        background.classList.remove("show");
                        productDetail.innerHTML = "";
                        productDetail.classList.remove("showDetails");
                    };
                }

                if (product) {
                    product.onclick = function (e) {

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


            }

        })

    }
    $('#home').click((e) => {
        if (e.target.getAttribute('id') === 'home') {
            body.html('');
            home()
        }
    })
    $('#introduction').click((e) => {
        body.html('');
        if (e.target.getAttribute('id') === 'introduction') {
            $.ajax({
                url: './html/introduce.html',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    body.html(data);
                }
            })
        }
    })
    $('#Rehome').click((e) => {
        console.log('re');
        if (e.target.getAttribute('id') === 'Rehome') {
            home()
        }
    })
    $('#contact').click((e) => {
        body.html('')
        if (e.target.getAttribute('id') === 'contact') {
            $.ajax({
                url: './html/contact.html',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    body.html(data);
                }
            })
        }
    })
    $('#register').click((e) => {


        if (e.target.getAttribute('id') === 'register') {
            body.html('');
            console.log(e.target.getAttribute('id'));
            $.ajax({
                url: './html/register.html',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    body.html(data);
                }
            })

        }
    })

    $('#login').click((e) => {
        console.log(e.target);
        if (e.target.getAttribute('id') === 'login') {
            body.html('');
            $.ajax({
                url: './html/login.html',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    console.log(data);
                    body.html(data);
                }
            })
        }

    })

    // $('.btn-home').click(() => {
    //     $.ajax({
    //         url: '../home.html',
    //         type: 'GET',
    //         dataType: 'html',
    //         success: function (data) {
    //             $('.body').html(data);
    //         }
    //     })
    // })

    // $('.btn-intro').click(() => {
    //     $.ajax({
    //         url: '../introduce.html',
    //         type: 'GET',
    //         dataType: 'html',
    //         success: function (data) {
    //             $('.body').html(data);
    //         }
    //     })
    // })
})
