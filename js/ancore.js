let ancoreElements;

Init();

function Init()
{
    ancoreElements = document.querySelectorAll('[ancore]');

    for (elem of ancoreElements)
    {
        elem.addEventListener('click', function () {
            let ancoreSelector = this.getAttribute('ancore')
            let scrollTop = document.querySelector(ancoreSelector).offsetTop
            if (document.querySelector('.navbar-menu').classList.contains('active'))
            {
                document.querySelector('.navbar-menu').classList.remove('active');
                document.querySelector('.show-menu').classList.remove('active');
                document.body.classList.remove('modal-open');
            }
            window.scrollTo({
                top: scrollTop,
                left: 0,
                behavior: 'smooth'
            })
        });
    }
}