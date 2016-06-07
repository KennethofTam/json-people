var people = [];
var mutants = [];
$('#menuToggle').on('click', function() {
  $('nav ul').toggle(400);
});

$('a[data-remote="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href') + '?callback=loadResults',
    method: 'get',
    dataType: 'jsonp'
  });
});

$('a[href="https://mutant-school.herokuapp.com/api/v1/mutants"]').on('click', function(e){
  e.preventDefault();
  $.ajax ({
    url: $(this).attr('href'), // + '?callback=listMutants',
    type:"GET",
  })
  .done (function(data, textStatus, jqXHR) {
      console.log("Request successful: " + jqXHR.status);
      mutants.push(data);
      listMutants();
    });
});


function loadResults(data) {
  if (data.firstName) {
    people.push(data);
  }
  else if (data.people) {
    people = people.concat(data.people);
  }
  listPeople();
}

function listMutants() {
  $('#people').slideUp();
  $('#people').empty();
  $.each(mutants, function(index, mutant) {
    var item = $('#mutantTemplate').clone().attr('id', '');
    debugger;
    item.html(item.html().replace('{{ mutant.mutant_name }}', mutant.mutant_name));
    item.removeClass('hide');
    $('#people').append(item);
    $('#people').slideDown();
  });
}

function listPeople() {
  $('#people').slideUp();
  $('#people').empty();
  $.each(people, function(index, person) {
    var item = $('#template').clone().attr('id', '');
    item.html(item.html().replace('{{ person.firstName }}', person.firstName)
      .replace('{{ person.lastName }}', person.lastName)
      .replace('{{ person.secret }}', person.secret));
    item.removeClass('hide');
    $('#people').append(item);
    $('#people').slideDown();
  });
}

listMutants();
listPeople();
