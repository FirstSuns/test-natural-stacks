jQuery(document).ready(function($) {
  console.log("ready");
  $(".fs-slider-sf-grid").slick({
    prevArrow: "<button type='button' class='slick-prev'><</button>",
    nextArrow: "<button type='button' class='slick-next'>></button>",
    draggable: true,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true
              }
          },
      ]
  });
  $(".fs-slider-sf-grid").css("opacity", 1);

  $('.menu__close').click(function(){
    $('.sf-menu-wrapper-mobile').addClass('hidden');
     $('.sf-menu__content').addClass('-translate-x-full');
  });

  $('.main-menu-new').click(function(){
    $(this).toggleClass('active');
  });
  $(document).on('click','.main-menu-new.active',function(){
     $(this).parent('li').find('.sf-sub-links .overscroll-contain button.back').trigger('click');

    
  });

  if($(".slick_slider").length > 0) {
    $(".slick_slider").slick({
      prevArrow: "<button type='button' class='slick-prev'><</button>",
      nextArrow: "<button type='button' class='slick-next'>></button>",
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000
    });
    $(".slick_slider").css("opacity", 1);
  }

  var url = window.location.href;
  $(".sf-customer__reset-password-btn").click(function(e) {
    if(!url.includes("#recover")) {
      window.history.pushState('', '', url + "#recover");
    }
  });

  $(".sf-customer__cancel-reset").click(function(e) {
    if(url.includes("#recover")) {
      window.history.pushState('', '', url.replace("#recover", ''));
    }
  });

  if(url.includes("#recover")) {
    $(".sf-customer__forms").addClass("show-recover-password-form");
  }
  else {
    $(".sf-customer__forms").removeClass("show-recover-password-form");
  }

  $(".sf-icon-box .btn-expand").click(function(e) {
    if($(this).hasClass("expanded")) {
      $(this).removeClass('expanded');
      $(this).parents(".sf-icon-box__inner").find(".benefit-description").slideUp(100);
    }
    else {
      $(this).addClass("expanded");
      $(this).parents(".sf-icon-box__inner").find(".benefit-description").slideDown(100);
    }
  });

  $(".ingredients1-wrapper .ingredient1-item").click(function(e) {
    var container = $(this).parents(".ingredients1");
    var ind = $(this).index();

    var ingredients_wrapper = container.find(".ingredients1-expand-wrapper");
    if(!ingredients_wrapper.hasClass("slick-initialized")) {
      ingredients_wrapper.slick({
        centerMode: true,
        centerPadding: '20vw',
        slidesToShow: 1,
        arrows: true,
        dots: true,
        infinite: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              centerPadding: '10vw'
            }
          }
        ]
      });
      
      var dots = ingredients_wrapper.find(".slick-dots li button");
      for(var i = 0; i < dots.length; i ++) {
        var dot = dots.eq(i);
        dot.text(dot.attr("aria-label"));
      }
    }

    ingredients_wrapper.slick('slickGoTo', ind);
    container.find(".ingredients1-expand-popup").removeClass("hide");
  });

  $(".ingredients1-expand-popup").click(function(e) {
    $(this).addClass("hide");
  });

  $(".ingredients1-expand-wrapper").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $(".ingredients1-expand-popup .ingredient1-item .btn-close").click(function(e) {
    $(this).parents(".ingredients1-expand-popup").addClass("hide");
  });

  $(".ingredients1 .link-expand").click(function(e) {
    var container = $(this).parents(".ingredients1");

    if($(this).hasClass("expanded")) {
      $(this).removeClass("expanded");
      container.find(".ingredient1-item.mobile_collapsed").removeClass("show");
    }
    else {
      $(this).addClass("expanded");
      container.find(".ingredient1-item.mobile_collapsed").addClass("show");
    }
  });

  $(".accordion-item-title").click(function(e) {
    e.preventDefault();
    var wrapper = $(this).parents(".accordion-item");
    wrapper.toggleClass('active');
    wrapper.find(".accordion-item-content").toggleClass("hidden");
  });

  $(".link-supplement_facts").click(function(e) {
    $(".supplement_facts-popup").removeClass("hide");
  });

  $(".supplement_facts-popup .supplement_facts-popup-wrapper").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $(".supplement_facts-popup").click(function(e) {
    $(this).addClass("hide");
  });

  $(document).on("click", ".variant_options_widget [data-smartrr-selling-plan-groups] .smartrr-selling-plan-group-label", function(e) {
    var wrapper = $(this).parents("[data-smartrr-selling-plan-groups]");
    var item = $(this).parents("[data-smartrr-selling-plan-group-id]");
    wrapper.find("[data-smartrr-selling-plan-group-id]").removeClass("active");
    item.addClass("active");
  });

  $(document).on("change", ".scd__cart .addon-item .item-variants", function(e) {
    var price = $(this).find("option:selected").attr("data-price");
    var id = $(this).val();
    var addon_item = $(this).parents(".addon-item");

    addon_item.find(".item-price").text(price);
    addon_item.find(".item-add").attr("data-id", id);
  });

  $(document).on("click", ".scd__cart .addon-item .item-row .item-add", function(e) {
    var addon_item = $(this).parents(".addon-item");
    let formData = {
     'items': [{
      'id': $(this).attr("data-id"),
      'quantity': 1
      }]
    };

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(function(cart) {
      addon_item.remove();
      Shopify.onCartUpdate(cart)
    });
  });

  $("[data-how-to-use]").click(function(e) {
    e.preventDefault();
    var scrollTo = $("#tab-how-to-use");
    if($(window).width() < 768) {
      scrollTo = $("#tab-how-to-use-mobile");
    }
    var position = scrollTo.offset().top;

    if(position > 0) {
      $('html,body').animate({
        scrollTop: position - 100
      });
    }
  });
  setInterval(() => {
    if($("[data-section-id]").hasClass("scroll-up"))
    {
      if(!$("#shopify-section-annoucement").hasClass("fs-scroll-up-section-announcement"))
      {
        $("#shopify-section-annoucement").addClass("fs-scroll-up-section-announcement");
      }
      if(!$("#fs-header__wrapper").hasClass("fs-scroll-up-header__wrapper"))
      {
        $("#fs-header__wrapper").addClass("fs-scroll-up-header__wrapper");
      }
    }
    else{
      if($("#shopify-section-annoucement").hasClass("fs-scroll-up-section-announcement"))
      {
        $("#shopify-section-annoucement").removeClass("fs-scroll-up-section-announcement");
      }
      if($("#fs-header__wrapper").hasClass("fs-scroll-up-header__wrapper"))
      {
        $("#fs-header__wrapper").removeClass("fs-scroll-up-header__wrapper");
      }
    }
  }, 100);
});

document.querySelectorAll(".ingredients .navs .nav-item").forEach(function(obj) {
  obj.addEventListener("click", function(e) {
    if(obj.classList.contains("active")) {
      return;
    }
    document.querySelector(".ingredients .navs .nav-item.active").classList.remove("active");
    obj.classList.add("active");

    var hdl = obj.getAttribute("data-handle");

    document.querySelector(".ingredient-content.active").classList.remove("active");
    document.querySelector(".ingredient-content[data-handle='" + hdl + "']").classList.add("active");
  });
});

// RC code
document.querySelectorAll("[name='purchase_option']").forEach(function(obj) {
  console.log(obj);
  obj.addEventListener("change", function(e) {
    if(this.value == null || this.value == '') {
      document.querySelector(".product__variant-picker").classList.add("show");
    }
    else {
      document.querySelector(".product__variant-picker").classList.remove("show");
    }
  });
});

// Smartrr
document.querySelectorAll("[name='purchase_option']").forEach(function(obj) {
  obj.addEventListener("change", function(e) {
    if(obj.value == '') {
      console.log("one time");
      document.querySelectorAll(".variant_options_row .option-item .discount_badge").forEach(function(obj1) {
        obj1.classList.remove("hide");
      });
      purchase_option = 1;
      if(document.querySelector(".switch-subscribe")) {
        document.querySelector(".switch-subscribe").checked = true;
      }
    }
    else {
      console.log("subscription");
      document.querySelectorAll(".variant_options_row .option-item .discount_badge").forEach(function(obj1) {
        obj1.classList.add("hide");
      });
      purchase_option = 2;
      if(document.querySelector(".switch-subscribe")) {
        document.querySelector(".switch-subscribe").checked = false;
      }
    }

    updateSavingPrice();
  });
});

document.querySelectorAll(".testimonials1 .swiper-container").forEach(function(swiper) {
  const wrapper = swiper.parentElement;
  var touchmove = false;
  var option = {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    lazyLoading: true,
    draggable: false,
    allowTouchMove: false,
    navigation: {
      prevEl: wrapper.querySelector(".sf-slider__controls-prev"),
      nextEl: wrapper.querySelector(".sf-slider__controls-next")
    }
  };
  if(window.innerWidth < 750) {
    option.allowTouchMove = true;
    option.width = window.innerWidth * 0.8;
    
  }
  new MinimogLibs.Swiper(swiper, option);
});

document.querySelectorAll(".sf-testimonials1 .buttons-wrapper .btn-next").forEach(function(obj) {
  obj.addEventListener("click", function(e) {
    var wrapper = obj.closest(".column-right");
  
    wrapper.querySelectorAll(".sf-slider__controls-next").forEach(function(obj1) {
      obj1.click();
    });

    var text_items = document.querySelectorAll(".sf-testimonials1 .column-text .item");

    for(i = 0; i < text_items.length; i ++) {
      var it = text_items[i];
      if(it.classList.contains("active")) {
        it.classList.remove("active");
        var j = (i + 1) % text_items.length;
        text_items[j].classList.add("active");
        break;
      }
    }
  });
});

document.querySelectorAll(".sf-testimonials1 .buttons-wrapper .btn-prev").forEach(function(obj) {
  obj.addEventListener("click", function(e) {
    var wrapper = obj.closest(".column-right");
  
    wrapper.querySelectorAll(".sf-slider__controls-prev").forEach(function(obj1) {
      obj1.click();
    });

    var text_items = document.querySelectorAll(".sf-testimonials1 .column-text .item");

    for(i = 0; i < text_items.length; i ++) {
      var it = text_items[i];
      if(it.classList.contains("active")) {
        it.classList.remove("active");
        var j = (i + text_items.length - 1) % text_items.length;
        text_items[j].classList.add("active");
        break;
      }
    }
  });
});

document.querySelectorAll(".horizontal_tabs .tabs_header .tab-selector").forEach(function(obj) {
  obj.addEventListener("click", function(e) {
    if(obj.classList.contains("active") || obj.classList.contains("hyperlink")) {
      return;
    }
    const tabs = obj.closest(".horizontal_tabs");
    tabs.querySelector(".tab-selector.active").classList.remove("active");
    tabs.querySelector(".tab_content.active").classList.remove("active");
    var id = obj.getAttribute("data-for");
    obj.classList.add("active");
    tabs.querySelector(".tab_content[data-id='" + id + "']").classList.add("active");
  });
});

document.querySelectorAll("#cart-drawer-container").forEach(function(obj) {
  obj.addEventListener("click", function(e) {
    var upgrade_btn = null;
    if(e.target.classList.contains("upgrade-to-subscription")) {
      upgrade_btn = e.target;
    }
    else if(e.target.closest(".upgrade-to-subscription")) {
      upgrade_btn = e.target.closest(".upgrade-to-subscription");
    }

    if(upgrade_btn != null) {
      var variantId = upgrade_btn.getAttribute("data-variantid");
      var sellingplanId = upgrade_btn.getAttribute("data-sellingplan");
      var qty = upgrade_btn.getAttribute("data-qty");

      let formData1 = {
        'line': upgrade_btn.getAttribute("data-index"),
        'quantity': 0
      };
      fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData1)
      })
      .then(response => {
        console.log("remove success", response.json());
        let formData = {
         'items': [{
          'id': variantId,
          'quantity': qty,
           'selling_plan': sellingplanId
          }]
        };
  
        fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(function(cart) {
          Shopify.onCartUpdate(cart)
        });
      });
    }
  });
});

var purchase_option = 2;

function updateSavingPrice() {
  console.log("updateSavingPrice");
  var selected_quantity = document.querySelector("input.select_quantity:checked");
  var saving_price = 0;
  var pricer = document.querySelector(".main-product .prod__price");
  if(!pricer) {
    return;
  }

  if(!document.querySelector(".smartrr-purchase-options")) {
    purchase_option = 1;
  }
  
  if(purchase_option == 1) {
    saving_price = selected_quantity.getAttribute("data-saving_price");
    document.querySelector(".total_price").textContent = " - " + selected_quantity.getAttribute("data-total_price");
    document.querySelector(".old_price").textContent = selected_quantity.getAttribute("data-reg_price");
    document.querySelector(".product-prices").classList.remove("subscription");

    if(pricer) {
      pricer.textContent = selected_quantity.getAttribute("data-total_price");
    }

    document.querySelectorAll(".variant_options_row .option-item .each_price").forEach(function(obj) {
      obj.querySelector(".one_time").classList.remove("hide");
      obj.querySelector(".sub").classList.add("hide");
    });
  }
  else {
    saving_price = selected_quantity.getAttribute("data-saving_price_sub");
    document.querySelector(".total_price").textContent = " - " + selected_quantity.getAttribute("data-total_price_sub") + " per month";
    document.querySelector(".old_price").textContent = selected_quantity.getAttribute("data-reg_price");
    document.querySelector(".product-prices").classList.add("subscription");

    if(pricer) {
      pricer.textContent = selected_quantity.getAttribute("data-total_price_sub");
    }

    document.querySelectorAll(".variant_options_row .option-item .each_price").forEach(function(obj) {
      obj.querySelector(".one_time").classList.add("hide");
      obj.querySelector(".sub").classList.remove("hide");
    });
  }

  document.querySelector(".total_saving_price").textContent = saving_price;
  if(saving_price == 0 || saving_price == '0') {
    document.querySelector(".product-form__actions .saving_price").classList.add("hide");
    document.querySelector(".old_price").classList.add("hide");
  }
  else {
    document.querySelector(".product-form__actions .saving_price").classList.remove("hide");
    document.querySelector(".old_price").classList.remove("hide");
  }
}

updateSavingPrice();

document.querySelectorAll(".select_quantity").forEach(function(obj) {
  obj.addEventListener("change", function(e) {
    updateSavingPrice();
  });
});

/*------------- Custom rc script ----------------*/
// document.querySelectorAll(".rc-content-wrapper select.rc-subscription_frequency").forEach(function(obj) {
//   obj.addEventListener("change", function(e) {
//     document.querySelector("input[name='selling_plan']").value = obj.value;

//     var evt = document.createEvent("HTMLEvents");
//     evt.initEvent("change", false, true);
//     document.querySelector("input[name='selling_plan']").dispatchEvent(evt);
//   });
// });

// document.querySelectorAll(".subscription-wrapper .rc-tab input[type=radio]").forEach(function(obj) {
//   obj.addEventListener("change", function(e) {
//     document.querySelectorAll("label.rc-radio").forEach(function(obj1) {
//       obj1.classList.remove("rc-radio--active");
//     });
//     obj.closest("label.rc-radio").classList.add("rc-radio--active");
//     var id = obj.getAttribute("id");
//     document.querySelectorAll(".rc-content-wrapper .rc-content").forEach(function(obj1) {
//       obj1.classList.remove("rc-content--active");
//     });
//     var content = document.querySelector(".rc-content-wrapper .rc-content[data-for='" + id + "']");
//     content.classList.add("rc-content--active");

//     var evt = document.createEvent("HTMLEvents");
//     evt.initEvent("change", false, true);
//     var sel = content.querySelector(".rc-subscription_frequency");
//     if(sel) {
//       content.querySelector(".rc-subscription_frequency").dispatchEvent(evt);
//     }
//     else {
//       document.querySelector("input[name='selling_plan']").value = '';
//       document.querySelector("input[name='selling_plan']").dispatchEvent(evt);
//     }
//   });
// });
// document.querySelectorAll(".subscription-wrapper .rc-tab input[type=radio]")[0].click();

document.querySelectorAll("[name='selling_plan']").forEach(function(obj) {
  obj.addEventListener("change", function(e) {
    if(obj.value == '') {
      console.log("one time");
      document.querySelectorAll(".variant_options_row .option-item .discount_badge").forEach(function(obj1) {
        obj1.classList.remove("hide");
      });
      purchase_option = 1;
      if(document.querySelector(".switch-subscribe") && document.querySelector(".switch-subscribe").checked == false) {
        document.querySelector(".switch-subscribe").checked = true;
      }
    }
    else {
      console.log("subscription");
      document.querySelectorAll(".variant_options_row .option-item .discount_badge").forEach(function(obj1) {
        obj1.classList.add("hide");
      });
      purchase_option = 2;
      if(document.querySelector(".switch-subscribe") && document.querySelector(".switch-subscribe").checked == true) {
        document.querySelector(".switch-subscribe").checked = false;
      }
    }

    updateSavingPrice();
  });
});

document.querySelectorAll(".switch-subscribe").forEach(function(obj) {
  obj.addEventListener("change", function(e) {
    if(obj.checked) {
      console.log("one time", document.querySelector(".variant_options_widget .onetime-radio"));
      document.querySelector(".variant_options_widget .onetime-radio").click();
    }
    else {
      console.log("subscribe", document.querySelector(".variant_options_widget .onetime-radio"));
      document.querySelector(".variant_options_widget .subscription-radio").click();
    }
  });
});
/*-----------------------------------------------*/

document.querySelectorAll(".sticky-bottom-atc .add-to-cart").forEach(function(obj) {
  obj.addEventListener("click", function(e) {
    e.preventDefault();
    if ($(window).width() > 766 ) {
    document.querySelector(".product-template .add-to-cart").click();
    }
    else{
     $('html, body').animate({
        scrollTop: $(".variant_options_widget").offset().top - 50
    }, 2000); 
    }
  });
});


document.addEventListener('octane.quiz.completed', function (e) {
  // your code for building and handling the results page
  console.log("test----", e.detail.answers);
  for ( key in e.detail.answers) {
    if(key == "Octane: What is your main goal? ")
    {
      if(e.detail.answers[key] == "Improve focus" || e.detail.answers[key] == "Boost Memory ")
        location.href = 'https://www.naturalstacks.com/pages/brain-quiz-focus';
      else if(e.detail.answers[key] == "Feel Happier" || e.detail.answers[key] == "Stress Relief")
        location.href = 'https://www.naturalstacks.com/pages/brain-quiz-mood';
      else if(e.detail.answers[key] == "Sleep better")
        location.href = 'https://www.naturalstacks.com/pages/brain-quiz-sleep';
      else if(e.detail.answers[key] == "Boost of energy")
        location.href = 'https://www.naturalstacks.com/pages/brain-quiz-energy ';
    } 
  }
}, false);
