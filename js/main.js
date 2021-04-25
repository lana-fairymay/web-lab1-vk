VK.init({
  apiId: 7834522
});

VK.Auth.login(function (response) {
  if (response.session) {
    /* Пользователь успешно авторизовался */
    if (response.settings) {
      /* Выбранные настройки доступа пользователя, если они были запрошены */
    }
  } else {
    /* Пользователь нажал кнопку Отмена в окне авторизации */
  }
});

const loadPeople = (params) => {
  let name = document.getElementById("first-name").value;
  // console.log(city);
  // let status = document.querySelector('input[name="status"]:checked').value;
   let count = Number(document.getElementById("people-count-id").value);
   console.log(count);
   let birth_day = Number(document.getElementById("birth_day").value);
   console.log(birth_day);
   let birth_month = Number(document.getElementById("birth_month").value);
   console.log(birth_month);
   let know = document.querySelector('input[name="know"]:checked').value;
   console.log(know);
   if (know == 1) {
    console.log('1111');
    VK.Api.call('users.search', {
      // from_list: "friends",
      count: count,
      q: name,
      birth_day:birth_day,
      birth_month:birth_month,
      fields: "photo_100,bdate,online",
      // online: true,
      // sex: status,
      // hometown: city,
      v: "5.130"
    }, function (data) {
      if (data.response) {
        console.log(data);
        drawPeople(data.response, count);
      }
    });
   }
   else {
    console.log('22222');
  VK.Api.call('users.search', {
    // from_list: "friends",
    count: count,
    q: name,
    fields: "photo_100,bdate,online",
    //online: true,
    // sex: status,
    // hometown: city,
    v: "5.130"
  }, function (data) {
    if (data.response) {
      console.log(data);
      drawPeople(data.response, count);
    }
  });}
}

const btn = document.querySelector(".submit-btn");

btn.addEventListener("click", loadPeople)

const drawPeople = (people,count) => {           
  var html = '';
  var p = people; 
  if (p.items.length == 0)
  html += '<p>'+ 'По запросу не найдено ни одного человека.' +'</p>'
  else {
    if (p.items.length < count)
    html += '<p>'+ 'По запросу найдено ' + p.items.length +'</p>'
  for (var index = 0; index < (p.items.length); index++) {
      var online = p.items[index].online ? 'Online' : 'Offline'  
      if (p.items[index].bdate === undefined)
      var all_date='Дата рождения:' + ' скрыта'
      else
      var all_date='Дата рождения: ' + p.items[index].bdate
      html += 
          '<li>'+  
          '<a target="_blank" href="http://vk.com/id' + people.items[index].id + '">' 
         + '<img src="' + p.items[index].photo_100 +'"/>'
          + '<div>'
              +'<h4>'+ p.items[index].first_name + ' ' + p.items[index].last_name +'</h4>'
              +'<p>'+ online +'</p>'
              +'<p>'+ all_date +'</p>'
          +'</div>'
              '</a>'                   
          + '</li>';               
  }}
  $('ul').html(html);


}
