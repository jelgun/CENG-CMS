var prev = -1;
var f = 0;
$(function(){
    $('.item').draggable({
      revert:true,
      proxy:'clone'
    });
    $('.right td.drop').droppable({
      onDragEnter:function(){
        $(this).addClass('over');
        if (!f) {
          prev = this.id;
          f = 1;
        }
      },
      onDragLeave:function(){
        
        $(this).removeClass('over');
      },
      onDrop:function(e,source){
        f = 0;
        $(this).removeClass('over');
        if ($(source).hasClass('assigned')){
          $(this).append(source);
        } else {
          prev = -1;
          var c = $(source).clone().addClass('assigned');
          $(this).append(c);
          c.draggable({
            revert:true
          });
        }
        console.log('current: ' + this.id);
        console.log('prev: ' + prev);
      }
    });
    $('.trsh').droppable({
      accept:'.assigned',
      onDragEnter:function(e,source){
        $(source).addClass('trash');
      },
      onDragLeave:function(e,source){
        $(source).removeClass('trash');
      },
      onDrop:function(e,source){
        $(source).remove();
      }
    });
  });