import React from "react";

export function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span aria-hidden='true'>$&</span>");
}

export function createMarkup(text) {
  let title = '';

  if(Array.isArray(text)) {
    let title_array = [];
    for (let index = 0; index < text.length; index++) {
      const element = text[index];
      title_array.push(wrapWords(element));
    }
    title = title_array.join('<br / >');
  } else {
    title = wrapWords(text);
  }
  return {__html: title};
}

export function format_paras(text) {
  let newText = text.split ('\n').map ((item, i) => (item) ? <p key={i} dangerouslySetInnerHTML={{__html: item}} /> : '');
  return newText;
}

export function format_date(date) {
  var d = new Date(date);
  const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
  return d.getDate()+' '+monthNames[d.getMonth()]+' '+d.getFullYear();
}