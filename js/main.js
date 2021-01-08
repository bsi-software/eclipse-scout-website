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

  $('#mobile-navigation-button').on('click', onMobileNavigationButtonClick);

  $('.navigation-item.lv1 > .text').on('click', onNavigationItemLv1Click);

  $('.demo-app-button').on('click', onDemoAppButtonClick);

  $('.tooltip').one('mouseover', onTooltipMouseover);
}

function onMobileNavigationButtonClick(event) {
  let $navButton = $(event.currentTarget);
  let open = $navButton.hasClass('open');
  let $navigation = $('#main-navigation');

  // Timeout is required for transition to work (cannot make a transition from display:none)
  // Transition listener is required for the same reason when hiding the panel
  if (open) {
    // Close navigation panel
    let transitionListener = () => {
      $navigation[0].removeEventListener('transitionend', transitionListener);
      $navigation.removeClass('open');
    };
    $navigation[0].addEventListener('transitionend', transitionListener);
    $navButton.removeClass('open');
    $navigation.removeClass('navigation-slide-in');
  } else {
    // Open navigation panel
    $navButton.addClass('open');
    $navigation.addClass('open');
    setTimeout(() => {
      $navigation.addClass('navigation-slide-in');
    });
  }
}

function onNavigationItemLv1Click(event) {
  let $navItemText = $(event.currentTarget);
  let $panel = $navItemText.parent().find('.navigation-lv2-panel');

  if (!$panel.length) {
    hideAllNavigationPanels();
    return;
  }

  if (!$panel.hasClass('hidden')) {
    hideNavigationPanel($panel);
    return;
  }

  $navItemText.addClass('open');
  let clickHandler = onNavigationPanelClickOutside.bind($panel);
  $panel.removeClass('hidden');
  $panel.data('clickHandler', clickHandler);
  setTimeout(() => {
    $(document).on('click', clickHandler);
  });
}

function onNavigationPanelClickOutside(event) {
  let $panel = this;
  if ($panel[0] !== event.target) {
    hideNavigationPanel($panel);
  }
}

function hideNavigationPanel($panel) {
  $panel.addClass('hidden');
  $panel.parent().find('.text').removeClass('open');
  $(document).off('click', $panel.data('clickHandler'));
  $panel.removeData('clickHandler');
}

function hideAllNavigationPanels() {
  $('.navigation-lv2-panel:not(.hidden)').each((index, element) => {
    hideNavigationPanel($(element));
  });
}

$(document).ready(() => {
  installHandlers();
  hideAllNavigationPanels();
});
