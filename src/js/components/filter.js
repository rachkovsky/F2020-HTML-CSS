import { store } from './store';

document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelector('.btn-group');
    const products = document.querySelectorAll('.product');

    buttons.addEventListener('click', (e) => {
        if (e.target.nodeName = 'BUTTON' && e.target.dataset && e.target.dataset.size) {
            let filterParam = e.target.dataset.size;
            filterList(filterParam);
        }
    })

    function filterList(param) {
        
        for (product of products) {
            if (product.dataset.size !== param) {
                product.classList.add('hide');
            } else {
                product.classList.remove('hide');
            }
        }
    }


});