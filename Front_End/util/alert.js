/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

function saveUpdateAlert(vale, value2) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: vale + ' has been ' + value2,
        showConfirmButton: false,
        timer: 2500
    });
}

function unSuccessUpdateAlert(vale,vale2) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: vale + " "+vale2,
        showConfirmButton: false,
        timer: 1500
    })
}

function emptyMassage(value) {
    let timerInterval
    Swal.fire({
        title:value +' Empty Result!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}