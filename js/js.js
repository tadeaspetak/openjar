
$('.inventory li').swipe({
  //Generic swipe handler for all directions
  swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
    if(direction==='right')
      $(this).addClass("selected"); 
    else if(direction==='left' && $(this).hasClass('selected'))
      $(this).removeClass("selected"); 
    else if(direction==='left'&& !$(this).hasClass('selected'))
      $(this).remove();  
  },
  //Default is 75px, set to 0 for demo so any distance triggers swipe
   threshold:0
});

$('[data-action="addInventory"]').keydown(function(e){
  if(e.keyCode===13){
    
    var $new = $('<li>'+$(this).val()+'</li>').swipe({
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if(direction==='right')
          $(this).addClass("selected"); 
        else if(direction==='left' && $(this).hasClass('selected'))
          $(this).removeClass("selected"); 
        else if(direction==='left'&& !$(this).hasClass('selected'))
          $(this).remove();  
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:0
    });
    
    $('.inventory ul').append($new);
    $(this).val('');
  }
});

var showRecipe = function(){
  $('.recipe').slideDown();
  $('.frontPage').slideUp();
  $('.sidebar').addClass('showShoppingList');
}
var showFrontPage = function(){
  $('.recipe').slideUp();
  $('.frontPage').slideDown();
  $('.sidebar').removeClass('showShoppingList');
}

$('#sugestions li').on('click', showRecipe)
$('.back-btn').on('click',showFrontPage);