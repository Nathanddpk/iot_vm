document.querySelector('.get-data').addEventListener('click', getdata);

function getdata(e) {
  const number = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.thingspeak.com/channels/854061/fields/${number}.json`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      //console.log(response);
      let output = '';

      //if(response.type === 'success') {
        response.feeds.forEach(function(data){
          
          var timestamp  = new Date(data.created_at);
          var iSTtimeStamp = new Date(timestamp.getTime() +(330 + timestamp.getTimezoneOffset())*60000);
          
          
          if(data.field1 == 0){
          output += `<li>Brake @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }else if(data.field1 == 1){
          output += `<li>Forward @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }else if(data.field1 == 2){
          output += `<li>Left @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }else if(data.field1 == 3){
          output += `<li>Right @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }else if(data.field1 == 4){
          output += `<li>Headlight ON @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }else if(data.field1 == 5){
          output += `<li>Headlight OFF @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }else if(data.field1 == 6){
          output += `<li>Reverse @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }else if(data.field1 == 9){
          output += `<li>Engine ON @ ${iSTtimeStamp.toString().substring(0,24)}</li>`;
          }
        });
      document.querySelector('.data').innerHTML = output;
    }
  }

  xhr.send();

  e.preventDefault();
}
