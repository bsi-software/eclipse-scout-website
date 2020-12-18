function onDemoAppButtonClick() {
  let $activeButton = $('.demo-app-button.active');
  $activeButton.removeClass('active');

  let $button = $(this);
  $button.addClass('active');

  let $visibleContainer = $('.demo-app-container:not(.hidden)');
  $visibleContainer.addClass('hidden');

  let showContainerId = $button.data('showContainer');
  $('#' + showContainerId).removeClass('hidden');
}

function installHandlers() {
  $('.demo-app-button').on('click', onDemoAppButtonClick);
}

$(document).ready(() => {
  installHandlers();
});
