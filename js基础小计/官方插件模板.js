(function ($) {
    $.fn.extend({
        // - paddingList
        paddingList: function (options) {ֵ
            var defaults = {
                animatePadding: 10,
                hoverColor: "Black"
            };
            var options = $.extend(defaults, options);
            return this.each(function () {
                var o = options;
                var obj = $(this);
                var items = $("li a", obj);
                items.hover(function () {
                    $(this).css("color", o.hoverColor);
                    $(this).animate({ paddingLeft: o.animatePadding }, { queue: false, duration: 300 });
                }, function () {
                    $(this).css("color", "");
                    $(this).animate({ paddingLeft: "0" }, { queue: true, duration: 300 });
                });
            });
        }
    });
})(jQuery);
$(document).ready(function() {
    $("#catagory").paddingList({ animatePadding: 30, hoverColor: "Red" });
});