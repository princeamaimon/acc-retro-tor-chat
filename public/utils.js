function timestamp() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month <= 9 ? '0' + month : month);
    var day = date.getDate();
    day = (day <= 9 ? '0' + day : day);
    var hour = date.getHours();
    hour = (hour <= 9 ? '0' + hour : hour);
    var minute = date.getMinutes();
    minute = (minute <= 9 ? '0' + minute : minute);
    var second = date.getSeconds();
    second = (second <= 9 ? '0' + second : second);
    return month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;
}

function guid() {
    return s4()+s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) {
            vars[key] = value !== undefined ? value : '';
        }
    );
    if ( param ) {
return vars[param] ? vars[param] : null;
    }
    return vars;
}
