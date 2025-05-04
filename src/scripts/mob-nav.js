function mobNav () {

    const hideMobNavBtn = document.querySelector('#mob-nav');
    const revealMobNav = document.querySelector('.mob-nav-bar');

    const checkStatus = hideMobNavBtn.classList.contains('hide-nav');

    //Close mobile navigation and return default (Browser navigation)
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

    //Open mobile navigation and remove default (Browser navigation)
    } else {
      revealMobNav.style.display = 'flex';
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
