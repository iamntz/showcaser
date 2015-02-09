
function setFrameSize( size ) {
  size = size || $(window).width();
  var iframe = $('.preview');

  if( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ){
    iframe.attr('scrolling', 'no');
  } else {
    $('body, html').css( 'overflow', 'hidden' );
  }

  iframe.width( size );
}

setFrameSize();

$('.toolbar__item').on('click', 'a[data-size]', function(){
  var size = $(this).data('size');
  if( size == 'full' ){
    setFrameSize( false );
  } else {
    var width = parseInt( size, 10 );
    setFrameSize( width );
  }
  return false;
});
