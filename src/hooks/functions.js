export const toggleBasket = () => {
    const backdrop = document.querySelector('.backdrop');
    const modal = document.querySelector('.modal');
    backdrop.classList.toggle('backdrop_hidden');
    modal.classList.toggle('modal_hidden');
  };

  