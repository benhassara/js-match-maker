var students = [];
var mentors = [];


function createPerson(first, last, phone, city) {
  var person = {};

  person.first = first;
  person.last = last;
  person.full = first + " " + last;
  person.phone = phone;
  person.city = city;

  return person;
}

function grabValues() {
  //grab the form data
  var first = document.getElementById('firstName').value;
  var last = document.getElementById('lastName').value;
  var phone = document.getElementById('phone').value;
  var city = document.getElementById('city').value;

  return createPerson(first, last, phone, city);
}

function verifyPhone(phn) {
  if (phn.length !== 12)
    return false;
  else if (!(/\d{3}-\d{3}-\d{4}$/.test(phn)))
    return false;
  else {
    return true;
  }
}

function addAnother() {
  var arr = document.getElementById('arr').value;
  var person = grabValues();
  var test = verifyPhone(person.phone);
  var form = document.getElementsByTagName('form')[0];

  if (test) {
    if (arr === "Student") {
      students.push(person);
      form.reset();
      return true;
    }
    else {
      mentors.push(person);
      form.reset();
      return true;
    }
  }
  else {
    alert('Check that phone number.');
    return false;
  }
}

function subAll() {
  chooseCity();
  var citySelect = document.getElementsByTagName('select')[1];
  console.log(citySelect);
  citySelect.addEventListener('change', function(){showMentors();});
}

function chooseCity(e) {
  var cities = [];

  for (var i = 0; i < mentors.length; i++) {
    cities.push(mentors[i].city);
  }

  var newRow = document.createElement('div');
  var choose = document.createElement('div');
  var newBtn = document.createElement('button');

  newRow.className = 'row padded-top';
  choose.className = 'col-xs-12';
  newBtn.className = 'btn btn-primary';
  newBtn.innerHTML = 'Go';
  newBtn.id = 'go';

  choose.appendChild(addSelect(cities));
  choose.appendChild(newBtn);
  newRow.appendChild(choose);
  document.getElementsByClassName('container')[0].appendChild(newRow);
}

function getMentors(city) {
  //return array of mentors in city
  var mentorsInCity = [];
  for (var i = 0; i < mentors.length; i++) {
    if (mentors[i].city === city)
      mentorsInCity.push(mentors[i]);
  }
  return mentorsInCity;
}

function showMentors() {
  var mentRow = document.createElement('div');
  var container = document.getElementsByClassName('container')[0];
  var mentorsInCity = getMentors(document.getElementsByTagName('select')[1].value);

  mentRow.className = "row padded-top";

  for (var i = 0; i < mentorsInCity.length; i++) {
    console.log('formatOut: ', formatOutput(mentorsInCity[i]));
    mentRow.appendChild(formatOutput(mentorsInCity[i]));
  }

  container.appendChild(mentRow);
}

function formatOutput(mentor) {
  var newColumn = document.createElement('div');
  var newList = document.createElement('ul');
  newColumn.className = "col-xs-12 col-md-6";

  createAndAppend(newList, 'li', "Name: " + mentor.full);
  createAndAppend(newList, 'li', "Phone: " + mentor.phone);
  createAndAppend(newList, 'li', "City: " + mentor.city);

  newColumn.appendChild(newList);

  return newColumn;

}

function createAndAppend(parent, tag, text) {
  var newElem = document.createElement(tag);
  newElem.innerHTML = text;
  parent.appendChild(newElem);
}

function addSelect(optArray) {
  //adds selection box for cities in mentors array
  //optArray - the things to add to the dropdown
  var newSelect = document.createElement('select');
  var placeholder = document.createElement('option');
  var options = [];

  placeholder.innerHTML = 'Choose a city.';
  placeholder.setAttribute('selected', 'selected');
  placeholder.setAttribute('disabled', 'disabled');
  newSelect.appendChild(placeholder);

  newSelect.className = 'form-control';
  for (var i = 0; i < optArray.length; i++) {
    var newOpt = document.createElement('option');
    newOpt.innerHTML = optArray[i];
    newSelect.appendChild(newOpt);
  }

  return newSelect;
}
