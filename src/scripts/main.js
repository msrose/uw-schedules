import $ from './jquery';
import fibonacci from './fibonacci';

let text = '';
for(let num of fibonacci()) {
  text += num;
  if(num > 1000) {
    break;
  }
  text += ', ';
}

$('#fibonacci').text(text);
