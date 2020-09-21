function XYR(){
    x = $('.x_in').val()
    y = $('.y_in').val()
    r = $('input[name=r]:checked').val()
}

function checkX(x, y, r) {
    if (!x) {
        return exception('<br>Вы не ввели X')
    } else if (isNaN(x)) {
        return exception('<br>X должен быть числом')
    } else if (x < -3 || x > 5) {
        return exception('<br>X не принадлежит [-3:5]')
    } else {
        $('.exception').html('')
        point(x, y, r)
        return true
    }
}

function exception(message) {
    $('.exception').html(message)
    point(0,0, 1)
    return false
}

$(function () {
    $('#send').on('click', function (event) {
        XYR()
        if(checkX(x, y, r)){
            $.ajax({
                type: "GET",
                url: "answer.php",
                data: {x: x, y: y, r: r},
                success: function (answer) {
                    $('.result').append(answer);
                }
            })
        }
        event.preventDefault()
    })
    $('#clear').on('click', function (event) {
        $.ajax({
            success: function () {
                $('.result_php').remove();
            }
        })
        event.preventDefault()
    })
    $('.x_in').on('input', function (){
        XYR()
        checkX(x, y, r)
    })
    $('.y_in').on('input', function (){
        XYR()
        point(x, y, r)
    })
    $('.r_in').on('input', function (){
        XYR()
        point(x, y, r)
    })
})

function point(x, y, r) {
    $('#point').attr("cx", (x * 120 / r + 200))
        .attr("cy", (y * -120 / r + 200));
}