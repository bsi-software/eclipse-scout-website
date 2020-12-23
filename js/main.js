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

  $('.navigation-item.lv1 > .text').on('click', onNavigationItemLv1Click);
}

function onNavigationItemLv1Click(event) {
  let $navItem = $(event.currentTarget);
  let $popup = $navItem.parent().find('.navigation-popup');

  if (!$popup.length) {
    hideAllNavigationPopups();
    return;
  }

  if (!$popup.hasClass('hidden')) {
    hideNavigationPopup($popup);
    return;
  }
  let clickHandler = onNavigationPopupClickOutside.bind($popup);
  $popup.removeClass('hidden');
  $popup.data('clickHandler', clickHandler);
  setTimeout(() => {
    $(document).on('click', clickHandler);
  });
}

function onNavigationPopupClickOutside(event) {
  let $popup = this;
  if ($popup[0] !== event.target) {
    hideNavigationPopup($popup);
  }
}

function hideNavigationPopup($popup) {
  $popup.addClass('hidden');
  $(document).off('click', $popup.data('clickHandler'));
  $popup.removeData('clickHandler');
}

function hideAllNavigationPopups() {
  $('.navigation-popup:not(.hidden)').each((index, element) => {
    hideNavigationPopup($(element));
  });
}

$(document).ready(() => {
  installHandlers();
  hideAllNavigationPopups();
});
