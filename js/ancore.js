let ancoreElements;

Init();

function Init()
{
    ancoreElements = document.querySelectorAll('[ancore]');

    for (elem of ancoreElements)
    {
        elem.addEventListener('click', function () {
            let ancoreSelector = this.getAttribute('ancore')
            console.log(ancoreSelector)
            let scrollTop = document.querySelector(ancoreSelector).offsetTop
            
            window.scrollTo({
                top: scrollTop,
                left: 0,
                behavior: 'smooth'
            })
        });
    }
}