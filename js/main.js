"use strict"

class ProductList {
  constructor(container = ".products") {
    this.container = document.querySelector(container);
    this.goods = [];
    this.products = []

    this.fetchGoods();
    this.render();
  }

  fetchGoods() {
    this.goods = [
      {
        id: 1,
        title: 'Альфредо',
        img: 'img/альфредо.jpg',
        price: 420
      },
      {
        id: 2,
        title: 'Гавайская',
        img: 'img/Гавайская.jpg',
        price: 470
      },
      {
        id: 3,
        title: 'Греческая',
        img: 'img/греческая.jpg',
        price: 510
      },
      {
        id: 4,
        title: 'Карбонара',
        img: 'img/карбонара.jpg',
        price: 450
      }
    ]
  }

  render() {
    for (let product of this.goods) {
      let prod = new Item(product);
      this.products.push(prod);
      this.container.insertAdjacentHTML("beforeend", prod.getMarkup());
    }
  }
}

class Item {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.img = product.img;
    this.price = product.price;
  }

  getMarkup() {
    return `
    <div class="product__item">
      <div class="product__img">
          <img src="${this.img}" alt="product photo" width="200">
      </div>
      <div class="product__desc">
        <h4>${this.title}</h4>
        <div class="product__desc-bot">
          <p>${this.price}p</p>
          <button data-id="${this.id}" class="btnOpen-form">Выбрать</button>
        </div>
      </div>
    </div>
    `
  }
}

let list = new ProductList();

let formEl = document.querySelector(".form");
let modal = document.querySelector(".modal__form");
let allBtns = document.querySelectorAll(".btnOpen-form");
let titleProduct = document.querySelector("#formProduct");
let inputEls = document.querySelectorAll(".input__req");
let modalSend = document.querySelector(".send");
let nameSend = document.querySelector(".modal__mail-name");
let phoneSend = document.querySelector(".modal__mail-phone");
let titleSend = document.querySelector(".modal__mail-title");

allBtns.forEach(btn => {
  btn.addEventListener("click", event => {
    let btnId = event.target.dataset.id;
    let find = list.products.find(el => el.id === +(btnId));
    modal.classList.add("show");
    titleProduct.value = find.title;
    inputEls.forEach(el => {
      formRemoveError(el);
    })

    document.querySelector(".modal__form p").classList.add("error__text");
  });
});

document.querySelector("#close").addEventListener("click", (event) => {
  event.preventDefault();
  modal.classList.remove("show");
});

modal.addEventListener("click", event => {
  if (event.target.classList.contains("modal__form")) {
    modal.classList.remove("show");
  }
})

modalSend.addEventListener("click", event => {
  if (!event.target.classList.contains("send__box")) {
    modalSend.classList.remove("show");
  }
});

formEl.addEventListener("submit", formSend);

function formSend(event) {
  event.preventDefault();

  let err = formValidate(formEl);
  if (err > 0) {
    document.querySelector(".modal__form p").classList.remove("error__text");
  } else {
    document.querySelector(".modal__form p").classList.add("error__text");
    modal.classList.remove("show");
    modalSend.classList.add("show");
    nameSend.textContent = inputEls[0].value;
    phoneSend.textContent = inputEls[1].value;
    titleSend.textContent = inputEls[2].value;
  }
}

function formValidate(form) {
  let error = 0;

  for (let i = 0; i < inputEls.length; i++) {
    let input = inputEls[i];
    formRemoveError(input);
    
    if (input.classList.contains("phone")) {
      if (phoneTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains("name")) {
      if (input.value === '' || nameTest(input)) {
        formAddError(input);
        error++;
      }
    }

    input.addEventListener("focus", () => {
      formRemoveError(input);
    })
  }
  return error;
}

function formAddError(input) {
  input.classList.add("error");
}

function formRemoveError(input) {
  input.classList.remove("error");
}

function phoneTest(input) {
  return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
}

function nameTest(input) {
  return !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(input.value);
}
