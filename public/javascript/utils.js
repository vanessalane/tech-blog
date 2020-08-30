$(document).ready(function(){
    // for the collapsible menu on mobile
    $('.sidenav').sidenav();

    // for the settings button
    const elems = $('.fixed-action-btn').floatingActionButton();
    let hoverEnabled = true;
    if ( $(window).width() < 769) {
        hoverEnabled = false;
    }
    M.FloatingActionButton.init(elems, {hoverEnabled});

    // only show the save button if you're editing
    $('.btn-save').hide();
});
