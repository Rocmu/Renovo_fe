function mobNav () {

    const hideMobNavBtn = document.querySelector('#mob-nav');
    const revealMobNav = document.querySelector('.mob-nav-bar');

    //const lines = document.querySelector('.line-1');

    const checkStatus = hideMobNavBtn.classList.contains('hide-nav');

    //Sulkee navigaation ja palauttaa navigaation defaultin
    if (checkStatus) {

      hideMobNavBtn.innerHTML = '';

      revealMobNav.style.display = 'none';
      hideMobNavBtn.classList.remove('hide-nav');

      const lineOne = document.createElement("div");
      const lineTwo = document.createElement("div");
      const lineThree = document.createElement("div");

      hideMobNavBtn.appendChild(lineOne);
      hideMobNavBtn.appendChild(lineTwo);
      hideMobNavBtn.appendChild(lineThree);

      //lineOne.style.backgroundColor = "white";

    //Avaa navigaation ja poistaa navigaation defaultin
    } else {
      revealMobNav.style.display = 'block';
      hideMobNavBtn.classList.add('hide-nav');
      hideMobNavBtn.classList.remove('line-1');
      hideMobNavBtn.classList.remove('line-2');
      hideMobNavBtn.classList.remove('line-3');
      hideMobNavBtn.innerHTML = '';

      const close = document.createElement("button");
      close.innerHTML = 'X';
      close.style.display = 'block';

      hideMobNavBtn.appendChild(close);
    }
}

export {mobNav}
