'use strict';

const apiKey = 'Fwg6aDKuEc3obE8K4Qf6hHRfTFx436qSveLrLNjU';

function createURL(state, nums) {
  if (state === '') {
    state = 'xx';
    //if empty put a character code that doesnt work so we get the correct error message
  }
  let codes = state.split(',');
  let str = 'https://developer.nps.gov/api/v1/parks?stateCode=';
  for (let i = 0; i < codes.length; i++) {
    if (i == 0) {
      str += codes[i];
    } else {
      str += `%2C${codes[i]}`;
    }
  }
  str += `&limit=${nums-1}&api_key=${apiKey}`;
  getNationalParks(str);
}

function getNationalParks(str) {
  fetch(str)
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson));
}

function displayParks(responseJson) {
  console.log(responseJson);
  $('.parks').html('');
  if (responseJson.data.length === 0) {
    $('.parks').html(`<p>Please enter a comma delimited list of 2 character state codes`);
  } else {
    for (let i = 0; i < responseJson.data.length; i++) {
      $('.parks').append(`<ul>
                                <li>${i+1}. ${responseJson.data[i].fullName}</li>
                                <br>
                                <li>Description: ${responseJson.data[i].description}</li>
                                <br>
                                <li>Website: ${responseJson.data[i].url}</li>
                                <br>
                                <br>
                         <ul>`);
    }
  }

}

function watchForm() {
  $('form').submit(event => {
    let state = $('.js-states').val()
    let nums = parseInt($('.js-number-of-responses').val());
    if (isNaN(nums) || nums <= 0) {
      nums = 10;
      console.log('User input was incorrect so we defaulted to 10');
    }

    $('.js-states').val('')
    $('.js-number-of-responses').val('');
    event.preventDefault();
    createURL(state, nums);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});