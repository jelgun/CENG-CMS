var prev = 0;
var f = 0;
$(function(){
    $('.item').draggable({
      revert:true,
      proxy:'clone'
    });
    $('.right td.drop').droppable({
      onDragEnter:function(){
        $(this).addClass('over');
      },
      onDragLeave:function(){
        if (!f) {
            prev = this.id;
            f = 1;
        }
        $(this).removeClass('over');
      },
      onDrop:function(e,source){
        console.log(this.id);
        console.log('prev: ' + prev);
        f = 0;
        $(this).removeClass('over');
        if ($(source).hasClass('assigned')){
          $(this).append(source);
        } else {
          var c = $(source).clone().addClass('assigned');
          $(this).empty().append(c);
          c.draggable({
            revert:true
          });
        }
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