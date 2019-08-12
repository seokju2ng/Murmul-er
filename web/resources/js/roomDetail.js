$(document).ready(function () {
    $.footerControl();
    $("#map").css('width', '100%');
    $('#area').text(area + pyeong);
    $.inputDetailInfo();
    $.inputOption();
    checkLike();
    $('#btnTalk').click(function () {
        if (islogin) {
			$.showTalk();
        } else {
            Swal.fire('', '로그인해야 이용가능한 서비스입니다.', 'warning')
                .then(function () {
                    $.showLoginPopup('talk');
                })
        }
    })
})

var likeFlag = false;

function clickLike() {
    if (document.getElementById('heartImg').getAttribute("src") === "/resources/img/etc/heartClick.png") {
        likeFlag = true;
    }
    $.ajax(roomId, {
        type: 'POST',
        data: {roomId: roomId, flag: likeFlag}
    }).then(function (data, status) {
        var obj = JSON.parse(data);
        switch (obj.res) {
            case 'ADD':
                document.getElementById('heartImg').src = '/resources/img/etc/heartClick.png';
                break;
            case 'REMOVE':
                document.getElementById('heartImg').src = '/resources/img/etc/heart.png';
                break;
            default:
                break;
        }
        likeFlag = false;
    })
}

function checkLike() {
    for (let i = 0; i < likeList.length; i++) {
        if (roomId == likeList[i]) {
            document.getElementById('heartImg').setAttribute("src", "/resources/img/etc/heartClick.png");
        }
    }
}

$.showTalk = function() {
	var popupX = (window.screen.width / 2) - (500 / 2);
	var popupY = (window.screen.height / 2) - (900 / 2);
	console.log(popupX);
	console.log(popupY);

	window.open("/talk", "", "status=no, width=500, height=758, left=" + popupX + ", top=" + popupY);
}

$.inputOption = function () {
    let tr;
    for (let i = 0; i < option.length; i++) {
        if (i % 5 === 0) {
            tr = $('<tr />').appendTo($('#optionTb'));
        }
        switch (option[i]) {
            case "냉장고":
                op_name = "refrigerator.svg";
                break;
            case "에어컨":
                op_name = "aircondition.svg";
                break;
            case "가스레인지":
                op_name = "gas.svg";
                break;
            case "옷장":
                op_name = "closet.svg";
                break;
            case "전자레인지":
                op_name = "microoven.svg";
                break;
            case "TV":
                op_name = "tv.svg";
                break;
            case "신발장":
                op_name = "shoes.svg";
                break;
            case "비데":
                op_name = "bidet.svg";
                break;
            case "인덕션":
                op_name = "induction.svg";
                break;
            case "전자도어락":
                op_name = "doorlock.svg";
                break;
            case "책상":
                op_name = "desk.svg";
                break;
            case "현관문 안전장치":
                op_name = "noimg.png";
                break;
            case "세탁기":
                op_name = "laundry.svg";
                break;
            case "침대":
                op_name = "bed.svg";
                break;
            default:
                op_name = "noimg.png";
                break;
        }
        let td = $(
            '<td><img src="/resources/img/option/' + op_name + '"><div>' + option[i]
            + '</div></td>').appendTo(tr);
    }
}

$.inputDetailInfo = function () {
    let idx = option.indexOf("주차 가능");
    if (idx > 0) {
        $('#parking').text("가능");
        option.splice(idx, 1)
    } else {
        $('#parking').text("불가능");
    }
    idx = option.indexOf("엘리베이터 가능");
    if (idx > 0) {
        $('#elevator').text("있음");
        option.splice(idx, 1)
    } else {
        $('#elevator').text("없음");
    }
    idx = option.indexOf("반려동물 가능");
    if (idx > 0) {
        $('#pet').text("가능");
        option.splice(idx, 1)
    } else {
        $('#pet').text("불가능");
    }
}

$(window).resize(function () {
    $.footerControl();
});

$.footerControl = function () {
    if ($(window).width() > 1070) {
        let width = $(window).width();
        let ph = 1070;
        let left = (width - ph) / 2;
        $('.footer').css('left', left);
    }
}