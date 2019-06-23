window.onload = function () {

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

      // фильтрация массива
      let personFilter = function (param, name) {
        return arr.filter(function (el) {
          return el[`gsx$${param}`]['$t'] == name;
        })
      }



      let nameAM = personFilter('исполнитель', 'Саша М.');
      let nameAS = personFilter('исполнитель', 'Саша Ш.');
      let nameMK = personFilter('исполнитель', 'Майк');
      let nameAK = personFilter('исполнитель', 'Леша');
      let nameRU = personFilter('исполнитель', 'Рустам');
      let nameNN = personFilter('исполнитель', 'Никита');

      let nameHelper = function (name) {
        return name[0]['gsx$исполнитель']['$t']
      };
      document.getElementById('nameAM').innerHTML = `<p>${nameHelper(nameAM)}: <span>${nameAM.length}</span></p> <p>${nameAM.length / arr.length * 100}</p>`;
      document.getElementById('nameAS').innerHTML = `<p>${nameHelper(nameAS)}: <span>${nameAS.length}</span></p> <p>${nameAS.length / arr.length * 100}</p>`;
      document.getElementById('nameMK').innerHTML = `<p>${nameHelper(nameMK)}: <span>${nameMK.length}</span></p> <p>${nameMK.length / arr.length * 100}</p>`;
      document.getElementById('nameAK').innerHTML = `<p>${nameHelper(nameAK)}: <span>${nameAK.length}</span></p> <p>${nameAK.length / arr.length * 100}</p>`;
      document.getElementById('nameNN').innerHTML = `<p>${nameHelper(nameNN)}: <span>${nameNN.length}</span></p> <p>${nameNN.length / arr.length * 100}</p>`;
      document.getElementById('nameRU').innerHTML = `<p>${nameHelper(nameRU)}: <span>${nameRU.length}</span></p> <p>${nameRU.length / arr.length * 100}</p>`;

      let ctx = document.getElementById('main_graph').getContext('2d');
      let chart_AM = document.getElementById('chart_AM').getContext('2d');
      let chart_AS = document.getElementById('chart_AS').getContext('2d');
      let chart_MK = document.getElementById('chart_MK').getContext('2d');
      let chart_AK = document.getElementById('chart_AK').getContext('2d');

      let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
          labels: [nameHelper(nameAM), nameHelper(nameAS), nameHelper(nameMK), nameHelper(nameAK), nameHelper(nameNN), nameHelper(nameRU)],
          datasets: [{
            label: 'Статистика количества выполненных задач',

            backgroundColor: ['orange', 'blue', 'red', 'green', 'yellow', 'pink'],
            // borderColor: 'rgb(255, 99, 132)',
            data: [nameAM.length, nameAS.length, nameMK.length, nameAK.length, nameNN.length, nameRU.length]
          }]
        },

        // Configuration options go here
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            },
            width: 400
          }
        }
      });

      let paintGraf = function (id, name) {
        return new Chart(id, {
          // The type of chart we want to create
          type: 'doughnut',

          // The data for our dataset
          data: {
            labels: [nameHelper(name), 'Все задачи'],
            datasets: [{
              backgroundColor: ['orange', 'blue'],
              data: [name.length, arr.length]
            }]
          },
          // Configuration options go here
          options: {}
        });
      }

      paintGraf(chart_AM, nameAM)
      paintGraf(chart_AS, nameAS)
      paintGraf(chart_MK, nameMK)
      paintGraf(chart_AK, nameAK)

    }

  });

}
