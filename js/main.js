const TOOLTIP_MIN_MARGIN = 10;

const TEXTS = {
  'scout.js': 'Scout JS applications are written in JavaScript and run in the browser.' +
    ' An application server is optional.',
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

function navigateToGetStarted() {
  let $panel = $('#getting-started-panel');
  if ($panel.length) {
    // Only exists on index page
    $('#getting-started-panel')[0].scrollIntoView({
      behavior: 'smooth'
    });
  } else {
    document.location = '/#getting-started-java';
  }
}

function onGetStartedLinkClick() {
  navigateToGetStarted();
  hideMobileNavigation($('#main-navigation'));
}

function onGetStartedButtonClick() {
  navigateToGetStarted();
}

/**
 * Create the additional tooltip DIV only once. The rest is done with CSS only.
 */
function onTooltipMouseover(event) {
  let $tooltip = $(event.currentTarget);
  let tooltipTextKey = $tooltip.data('tooltipText');
  let availWidth = $(document).width(); // must happen before tooltip is made visible

  let $tooltipText = $tooltip.find('.tooltip-text');
  if (!$tooltip.find('.tooltip-text').length) {
    let tooltipText = TEXTS[tooltipTextKey];
    if (!tooltipText) {
      tooltipText = 'Undefined textKey "' + tooltipTextKey + '"';
    }
    $tooltipText = $('<span>').addClass('tooltip-text').text(tooltipText);
    $tooltipText.appendTo($tooltip);
  }

  // adjust tooltip position
  $tooltipText.removeClass('adjust-left adjust-right');
  let position = $tooltipText.offset();
  let width = $tooltipText.outerWidth();
  let x = position.left;
  let diff;

  if (x < 0) {
    // left boundaries crossed?
    diff = Math.abs(x);
    let marginLeft = parseInt($tooltipText.css('margin-left'), 10);
    $tooltipText.css('margin-left', marginLeft + diff + TOOLTIP_MIN_MARGIN)
      .addClass('adjust-left');
  } else if ((x + width) > availWidth) {
    // right boundaries crossed?
    diff = (x + width) - availWidth;
    let marginLeft = parseInt($tooltipText.css('margin-left'), 10);
    $tooltipText.css('margin-left', marginLeft - diff - TOOLTIP_MIN_MARGIN)
      .addClass('adjust-right');
  }
}

function installHandlers() {
  $('#get-started-button').on('click', onGetStartedButtonClick);
  $('#mobile-navigation-button').on('click', onMobileNavigationButtonClick);
  $('.navigation-item.lv1 > .text').on('click', onNavigationItemLv1Click);
  $('.demo-app-button').on('click', onDemoAppButtonClick);
  $('.tooltip').one('mouseover', onTooltipMouseover);
}

function onNavigationItemLv1Click(event) {
  let $navItemText = $(event.currentTarget);
  let $navPanel = $navItemText.parent().find('.navigation-lv2-panel');

  if (isMobileMode()) {
    toggleMobileNavigationPanelLv2($navItemText, $navPanel);
  } else {
    toggleDesktopNavigationPanelLv2($navItemText, $navPanel);
  }
}

function toggleMobileNavigationPanelLv2($navItemText, $navPanel) {
  let open = $navItemText.hasClass('open');
  if (open) {
    $navPanel.addClass('hidden');
    $navItemText.removeClass('open');
  } else {
    $navPanel.removeClass('hidden');
    $navItemText.addClass('open');
  }
}

function toggleDesktopNavigationPanelLv2($navItemText, $navPanel) {
  if (!$navPanel.length) {
    hideAllDesktopNavigationPanelsLv2();
    return;
  }

  if (!$navPanel.hasClass('hidden')) {
    hideDesktopNavigationPanelLv2($navPanel);
    return;
  }

  $navItemText.addClass('open');
  let clickOutsideHandler = onDesktopNavigationPanelLv2ClickOutside.bind($navPanel);
  $navPanel.removeClass('hidden');
  $navPanel.data('clickOutsideHandler', clickOutsideHandler);
  setTimeout(() => {
    $(document).on('click', clickOutsideHandler);
  });
}

function onDesktopNavigationPanelLv2ClickOutside(event) {
  let $panel = this;
  if ($panel[0] !== event.target) {
    hideDesktopNavigationPanelLv2($panel);
  }
}

function onMobileNavigationButtonClick(event) {
  let $navButton = $(event.currentTarget);
  let $navigation = $('#main-navigation');
  let $body = $('body');
  let open = $navButton.hasClass('open');

  // Timeout is required for transition to work (cannot make a transition from display:none)
  // Transition listener is required for the same reason when hiding the panel
  if (open) {
    // Close navigation panel
    hideMobileNavigation($navigation);
  } else {
    // Open navigation panel
    let clickOutsideHandler = onMobileNavigationClickOutside.bind($navigation);
    $navigation.data('clickOutsideHandler', clickOutsideHandler);
    setTimeout(() => {
      $(document).on('click', clickOutsideHandler);
    });

    $body.addClass('fixed');
    $navButton.addClass('open');
    $navigation.addClass('open');
    setTimeout(() => {
      $navigation.addClass('navigation-slide-in');
    });
  }
}

function onMobileNavigationClickOutside(event) {
  let $navigation = this;
  let $header = $('header');
  if ($header.has(event.target).length === 0) {
    hideMobileNavigation($navigation);
  }
}

function hideMobileNavigation($navigation) {
  let transitionListener = () => {
    $navigation[0].removeEventListener('transitionend', transitionListener);
    $navigation.removeClass('open');
  };
  let $body = $('body');
  let $navButton = $('#mobile-navigation-button');
  $navigation[0].addEventListener('transitionend', transitionListener);
  $body.removeClass('fixed');
  $navButton.removeClass('open');
  $navigation.removeClass('navigation-slide-in');

  $(document).off('click', $navigation.data('clickOutsideHandler'));
  $navigation.removeData('clickOutsideHandler');
}

function hideDesktopNavigationPanelLv2($panel) {
  $panel.addClass('hidden');
  $(document).off('click', $panel.data('clickOutsideHandler'));
  $panel.removeData('clickOutsideHandler');
}

function hideAllDesktopNavigationPanelsLv2() {
  $('.navigation-lv2-panel:not(.hidden)').each((index, element) => {
    hideDesktopNavigationPanelLv2($(element));
  });
}

function isMobileMode() {
  // Read property 'content' from ::before element set by CSS
  // See: https://stackoverflow.com/questions/44342065/how-to-get-a-dom-elements-before-content-with-javascript
  let detectionDiv = document.querySelector('#device-detection');
  let content = getComputedStyle(detectionDiv, ':before').getPropertyValue('content');
  return content && content.indexOf('mobile') > -1;
}

$(document).ready(() => {
  $('<div>').attr('id', 'device-detection').appendTo($('body'));
  installHandlers();
  hideAllDesktopNavigationPanelsLv2();
});
