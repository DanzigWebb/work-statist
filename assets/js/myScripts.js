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


      console.log(`для лидрока: ${personFilter('длякого', 'Leadrock').length} из: ${arr.length} (${personFilter('длякого', 'Leadrock').length / arr.length * 100}%)`);
      console.log(`для товарки: ${personFilter('длякого', 'Наша товарка').length} из: ${arr.length} (${personFilter('длякого', 'Наша товарка').length / arr.length * 100}%)`);
      console.log(`для NAT: ${personFilter('длякого', 'Native').length} из: ${arr.length} (${personFilter('длякого', 'Native').length / arr.length * 100}%)`);


      let nameHelper = function (name) {
        return name[0]['gsx$исполнитель']['$t']
      };
      document.getElementById('nameAM').innerHTML = `<p>${nameHelper(nameAM)}: <span>${nameAM.length}</span></p> <p>${nameAM.length/arr.length*100}</p>`;
      document.getElementById('nameAS').innerHTML = `<p>${nameHelper(nameAS)}: <span>${nameAS.length}</span></p> <p>${nameAS.length/arr.length*100}</p>`;
      document.getElementById('nameMK').innerHTML = `<p>${nameHelper(nameMK)}: <span>${nameMK.length}</span></p> <p>${nameMK.length/arr.length*100}</p>`;
      document.getElementById('nameAK').innerHTML = `<p>${nameHelper(nameAK)}: <span>${nameAK.length}</span></p> <p>${nameAK.length/arr.length*100}</p>`;
      document.getElementById('nameNN').innerHTML = `<p>${nameHelper(nameNN)}: <span>${nameNN.length}</span></p> <p>${nameNN.length/arr.length*100}</p>`;
      document.getElementById('nameRU').innerHTML = `<p>${nameHelper(nameRU)}: <span>${nameRU.length}</span></p> <p>${nameRU.length/arr.length*100}</p>`;


      console.log(nameHelper(nameAM) + ": " + nameAM.length);
      console.log(nameHelper(nameAS) + ": " + nameAS.length);
      console.log(nameHelper(nameMK) + ": " + nameMK.length);
      console.log(nameHelper(nameAK) + ": " + nameAK.length);
      console.log(nameHelper(nameNN) + ": " + nameNN.length);
      console.log(nameHelper(nameRU) + ": " + nameRU.length);
    }

  });

}
