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
          if(data.field1 == 0){
          output += `<li>Brake @ ${data.created_at}</li>`;
          }else if(data.field1 == 1){
          output += `<li>Forward @ ${data.created_at}</li>`;
          }else if(data.field1 == 2){
          output += `<li>Left @ ${data.created_at}</li>`;
          }else if(data.field1 == 3){
          output += `<li>Right @ ${data.created_at}</li>`;
          }else if(data.field1 == 4){
          output += `<li>Headlight ON @ ${data.created_at}</li>`;
          }else if(data.field1 == 5){
          output += `<li>Headlight OFF @ ${data.created_at}</li>`;
          }
        });
      document.querySelector('.data').innerHTML = output;
    }
  }

  xhr.send();

  e.preventDefault();
}