function calculate() {
    let cost = document.getElementById("cost");
    let amount = document.getElementById("amount");
    let answer = document.getElementById("answer");
    let re = new RegExp('^[0-9]*[.,]?[0-9]+$');
    RegExp('^[0-9]*[.,]?[0-9]+$');
    let re_int = /\D/;
    let test_cost = cost.value.match(re);
    let test_amount = amount.value.match(re);
    if (cost.value === "" || amount.value === "") {
        answer.innerHTML = "Введите данные!";
    } else if (test_cost && test_amount)
        answer.innerHTML = ("Стоимость вашего заказа: " + parseFloat(cost.value) * parseInt(amount.value));
    else answer.innerHTML = "Неверный формат записи чисел!";
    return false;
}


function updatePrice() {
    let s = document.getElementsByName("type");
    let select = s[0];
    let price = 0;
    let prices = getPrices();
    let priceIndex = parseInt(select.value) - 1;
    if (priceIndex >= 0) {
        price = prices.cost_types[priceIndex];
    }

    let radioDiv = document.getElementById("res");
    radioDiv.style.display = (
        select.value === "2"
            ? "block"
            : "none"
    );
    let checkDiv = document.getElementById("flag");
    checkDiv.style.display = (
        select.value === "3"
            ? "block"
            : "none"
    );

    if (select.value === "2") {
        let radios = document.getElementsByName("type_clothes");
        radios.forEach(function (radio) {
            if (radio.checked) {
                let optionPrice = prices.prodOptions[radio.value];
                if (optionPrice !== undefined) {
                    price += optionPrice;
                }
            }
        });
    } else if (select.value === "3") {
        let checkboxes = document.querySelectorAll("#flag input");
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                let propPrice = prices.prodProperty[checkbox.name];
                if (propPrice !== undefined) {
                    price += propPrice;
                }
            }
        });
    }

    let amount = document.getElementById("amount2");

    let f = parseInt(amount.value);
    let ans = ("Стоимость: " + f * price);

    let Total = document.getElementById("total");
    Total.innerHTML = ans;
}

function getPrices() {
    return {
        prodOptions: {
            Man: 300
        },
        prodProperty: {
            wireless: 500
        },
        cost_types: [200, 400, 1000]
    };
}

window.addEventListener("DOMContentLoaded", function () {
    let b = document.getElementById("amount");
    b.addEventListener("click", calculate);

    let inp = document.getElementById("amount2");
    inp.addEventListener("input", updatePrice);

    let s = document.getElementsByName("type");
    s[0].addEventListener("change", updatePrice);

    let radios = document.getElementsByName("type_clothes");
    radios.forEach(function (radio) {
        radio.addEventListener("change", updatePrice);
    });

    let checkboxes = document.querySelectorAll("#flag input");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updatePrice);
    });

    updatePrice();
});

$(document).ready(function () {
    $(".multiple-items").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
});

