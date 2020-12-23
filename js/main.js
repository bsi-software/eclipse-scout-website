const hideAnimationListener = event => {
  $(event.target)
    .removeClass('animate-hide')
    .addClass('hidden')[0]
    .removeEventListener('animationend', hideAnimationListener);
};

const showAnimationListener = event => {
  $(event.target)
    .removeClass('animate-show')[0]
    .removeEventListener('animationend', showAnimationListener);
};

function onDemoAppButtonClick() {
  let $activeButton = $('.demo-app-button.active');
  $activeButton.removeClass('active');

  let $button = $(this);
  $button.addClass('active');

  let showContainerId = $button.data('showContainer');
  let $divToHide = $('.demo-app-container:not(.hidden)');
  let $divToShow = $('#' + showContainerId);

  $divToHide
    .addClass('animate-hide')[0]
    .addEventListener('animationend', hideAnimationListener);

  $divToShow
    .removeClass('hidden')
    .addClass('animate-show')[0]
    .addEventListener('animationend', showAnimationListener);
}

function onGetStartedButtonClick() {
  $('#getting-started-panel')[0].scrollIntoView({
    behavior: 'smooth'
  });
}

function installHandlers() {
  $('#get-started-button').on('click', onGetStartedButtonClick);

  $('.demo-app-button').on('click', onDemoAppButtonClick);
}

$(document).ready(() => {
  installHandlers();
});
