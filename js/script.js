var me = "https://i.imgur.com/PDVUnQM.jpg";
var meAtMcgill = "https://upload.wikimedia.org/wikipedia/commons/d/da/Burnside_Hall_02.jpg";
var kiwi = "https://i.imgur.com/PCQktZP.jpg";

var selected = '#me';

function imageButton(id, source) {
    $(id).click(function() {
        $('.pct').attr('src', source);
        $(selected).removeClass("photo-selected");
        $(id).addClass("photo-selected");
        selected = id;  
    });
}

$(document).ready(function() {
    imageButton('#me', me)
    imageButton('#meMcgill', meAtMcgill)
    imageButton('#kiwi', kiwi)

    $('.concerts').click(function() {
        $('.concert-block').toggle()
    });
});