const TEXTS = {
  'scout.js': 'Scout JS applications are written in JavaScript. The business logic runs in the browser. An application server' +
    ' is optional.',
  'scout.classic': 'Scout Classic applications are written in Java. They implement the client/server principle. The business logic' +
    ' runs on a Java application server.'
};

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
  let $button = $(this);
  if ($button.hasClass('active')) {
    return;
  }

  let $activeButton = $('.demo-app-button.active');
  $activeButton.removeClass('active');
  $button.addClass('active');

  let showContainerId = $button.data('showContainer');
  let $divToHide = $('.demo-app-container:not(.hidden)');
  let $divToShow = $('#' + showContainerId);

  // Animation already running --> skip
  if (!$divToHide.length) {
    return;
  }

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

/**
 * Create the additional tooltip DIV only once. The rest is done with CSS only.
 */
function onTooltipMouseover(event) {
  let $tooltip = $(event.currentTarget);
  let tooltipTextKey = $tooltip.data('tooltipText');

  if (!$tooltip.find('.tooltip-text').length) {
    let tooltipText = TEXTS[tooltipTextKey];
    if (!tooltipText) {
      tooltipText = 'Undefined textKey "' + tooltipTextKey + '"';
    }
    let $tooltipText = $('<span>').addClass('tooltip-text').text(tooltipText);
    $tooltipText.appendTo($tooltip);
  }
}

function installHandlers() {
  $('#get-started-button').on('click', onGetStartedButtonClick);

  $('.demo-app-button').on('click', onDemoAppButtonClick);

  $('.navigation-item.lv1 > .text').on('click', onNavigationItemLv1Click);

  $('.tooltip').one('mouseover', onTooltipMouseover);
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
