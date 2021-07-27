//Слайдер для размещени в блоке product-desc, позволяет менять
//изображения продукта
let swiper = new Swiper(".product-slider", {
  spaceBetween: 0,
  effect: "fade",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,        
  },
  centeredSlides: true,
});

addActionsForm();
validation();


//функция которая содержит форму, по которой будут совершаться
//события открытия и закрыти
function addActionsForm() {
  const form = document.querySelector('.form');

  openForm(form);
  closeForm(form);
}

//функция открытия формы
function openForm(form){
  const btnBlock = document.querySelector('.btn-block');
  
  btnBlock.addEventListener('click', (e) => {
    e.preventDefault();

    //если при нажатии на одну из кнопок: Маски или антисептики, 
    //то появляется форма
    if(e.target.dataset.mask || e.target.dataset.antiseptic) {
      form.classList.add('active');
    }   
  });
}

//функция закрытия формы
function closeForm(form) {
  const closeBtn = document.querySelector('.form__close');
  const formContainer = document.querySelector('.form__container');

  //при нажатии на темный фон за пределами формы или крестик, 
  //то форма закрывается
  form.addEventListener('click', (e) => {
    if(e.target === formContainer || e.target === closeBtn) {
      form.classList.remove('active');
    }
  });
}

//функция валидации полей формы
function validation(){
  const formBtn = document.querySelector('.form__btn');
  const form = document.querySelector('.form');
  const inputTel = document.querySelector('input[type="tel"]');
  const inputText = document.querySelector('input[type="text"]');

  formBtn.addEventListener('click', (e) => {
    //убираем стандартное поведение submit
    e.preventDefault();

    //делаем проверку на пустые поля формы (выбраны как обязательные Имя и Телефон)
    //Если значение полей не пустые, то выходит сообщение Заявка принята и форма закрывается
    if(validationField(inputTel) && validationField(inputText)) {
      form.classList.remove('active');
      alert('Заявка принята');
      return;
    }

    alert('Введите корректные значения');
  });
}

//функция для проверки пустового значения в поле
function validationField(field) {
  if(field.value.trim() === "") {
    field.style.borderBottom = '1px solid red';

    return false;
  }

  field.style.borderBottom = '1px solid green';

  return true;
}
