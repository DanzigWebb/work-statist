window.onload = function () {
  let cart = {};
  let nameAM = {};
  let info = document.getElementById('hello');
  // загрузка из корзины
  function loadCartFromStorage() {
    // проверка существует ли массив при загрузке страницы
    if (localStorage.getItem('cart') !== null) {
      cart = JSON.parse(localStorage.getItem('cart'));
    } else {
    }
  }

  loadCartFromStorage();

  // посылаем запрос к таблице
  let getJson = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      let status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response)
      }
      else {
        callback(status, xhr.response)
      }
    };
    xhr.send();
  }
  getJson('https://spreadsheets.google.com/feeds/list/1_T66EFR_LwybMqhQ1_-FcScj-XMK6wxkNE6LL0bgjB0/od6/public/values?alt=json', function (err, data) {
    if (err !== null) {
    }
    else {
      data = data['feed']['entry'];
      sortArr = arrowHelper(data);
    }

    function arrowHelper(arr) {

      let arrNames = {
        am: 'Саша М.'
      }

      // фильтрация массива
      let personFilter = function (param, name) {
        return arr.filter(function (el) {
          return el[`gsx$${param}`]['$t'] == name;
        })
      }
  


      let nameAM = personFilter ('исполнитель', 'Саша М.');
      let nameAS = personFilter ('исполнитель', 'Саша Ш.');
      let nameMK = personFilter ('исполнитель', 'Майк');
      let nameAK = personFilter ('исполнитель', 'Леша');
      let nameRU = personFilter ('исполнитель', 'Рустам');
      let nameNN = personFilter ('исполнитель', 'Никита');


      console.log(`для лидрока: ${personFilter('длякого', 'Leadrock').length} из: ${arr.length} (${personFilter('длякого', 'Leadrock').length / arr.length * 100}%)`)


      console.log(arr)
      document.getElementById('nameAM').innerHTML = `<p>${nameAM[0]['gsx$исполнитель']['$t']}: <span>${nameAM.length}</span></p>`;
      document.getElementById('nameAS').innerHTML = `<p>${nameAS[0]['gsx$исполнитель']['$t']}: <span>${nameAS.length}</span></p>`;
      document.getElementById('nameMK').innerHTML = `<p>${nameMK[0]['gsx$исполнитель']['$t']}: <span>${nameMK.length}</span></p>`;
      document.getElementById('nameAK').innerHTML = `<p>${nameAK[0]['gsx$исполнитель']['$t']}: <span>${nameAK.length}</span></p>`;
      document.getElementById('nameNN').innerHTML = `<p>${nameNN[0]['gsx$исполнитель']['$t']}: <span>${nameNN.length}</span></p>`;
      document.getElementById('nameRU').innerHTML = `<p>${nameRU[0]['gsx$исполнитель']['$t']}: <span>${nameRU.length}</span></p>`;


      console.log(nameAM[0]['gsx$исполнитель']['$t'] + ": " + nameAM.length);
      console.log(nameAS[0]['gsx$исполнитель']['$t'] + ": " + nameAS.length);
      console.log(nameMK[0]['gsx$исполнитель']['$t'] + ": " + nameMK.length);
      console.log(nameAK[0]['gsx$исполнитель']['$t'] + ": " + nameAK.length);
      console.log(nameNN[0]['gsx$исполнитель']['$t'] + ": " + nameNN.length);
      console.log(nameRU[0]['gsx$исполнитель']['$t'] + ": " + nameRU.length);
    }

  });

}
