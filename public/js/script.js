// Alternância automática dos textos de contato com fade
document.addEventListener('DOMContentLoaded', function() {
    const textos = Array.from(document.querySelectorAll('.text-contato1, .text-contato2, .text-contato3, .text-contato4'));
    let idx = 0;
    function showText(i) {
        textos.forEach((el, j) => {
            if (el) {
                if (j === i) {
                    el.classList.add('contato-visible');
                } else {
                    el.classList.remove('contato-visible');
                }
            }
        });
    }
    showText(idx);
    setInterval(() => {
        idx = (idx + 1) % textos.length;
        showText(idx);
    }, 5000);
});

// Abrir/fechar a janela de login ao clicar no botão
document.addEventListener('DOMContentLoaded', function() {
  const btnLogin = document.querySelector('.btn-login');
  const pageLogin = document.querySelector('.page-login');
  if (!btnLogin || !pageLogin) return;

  // garante estado inicial escondido (usa classes/aria; não trocar display direto)
  if (!pageLogin.classList.contains('open')) {
    pageLogin.setAttribute('aria-hidden', 'true');
  }

  function openPageLogin() {
    pageLogin.classList.add('open');
    pageLogin.setAttribute('aria-hidden', 'false');
    // foca primeiro elemento interativo dentro da página, se houver
    const foco = pageLogin.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])');
    if (foco) foco.focus();
  }

  function closePageLogin() {
    // remove a classe para iniciar a transição de saída
    pageLogin.classList.remove('open');
    pageLogin.setAttribute('aria-hidden', 'true');
    // devolve foco ao botão de abrir
    btnLogin.focus();
  }

  btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    if (pageLogin.classList.contains('open')) {
      closePageLogin();
    } else {
      openPageLogin();
    }
  });

  // Fecha com Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && pageLogin.classList.contains('open')) {
      closePageLogin();
    }
  });

  // Fecha ao clicar fora
  document.addEventListener('click', function(e) {
    if (!pageLogin.classList.contains('open')) return;
    if (e.target === btnLogin) return;
    if (!pageLogin.contains(e.target)) closePageLogin();
  });
  
  // opcional: ao terminar a transição de saída, garantir que aria-hidden esteja correto
  pageLogin.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'opacity' && !pageLogin.classList.contains('open')) {
      pageLogin.setAttribute('aria-hidden', 'true');
    }
  });
});
//Redicionamento da pagina inicio
document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('.access-options a');
	navLinks.forEach(link => {
		if (link.textContent.trim().toLowerCase() === 'inicio') {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				window.location.reload();
			});
		}
	});
});


// Alternância automática dos títulos na página de utilidade pública
document.addEventListener('DOMContentLoaded', function() {
  const titles = [
    document.querySelector('.title-up1'),
    document.querySelector('.title-up2'),
    document.querySelector('.title-up3'),
    document.querySelector('.title-up4')
    
  ];
  let current = 0;

  function showNextTitle() {
    titles.forEach((el, i) => {
      if (el) el.style.opacity = i === current ? '1' : '0';
    });
    current = (current + 1) % titles.length;
    setTimeout(showNextTitle, 6500);
  }

  showNextTitle();
});



// Script para reiniciar o vídeo do Relson 
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('img-relson');
  if (video) {
    function restartVideo() {
      video.currentTime = 0;
      video.play();
    }
    // Tenta iniciar o intervalo assim que possível
    if (video.readyState >= 2) {
      setInterval(restartVideo, 15000);
    } else {
      video.addEventListener('canplay', function() {
        setInterval(restartVideo, 15000);
      });
    }
  }
});

// Controla exibição de .popup-adm ao clicar em .acess-adm e fecha ao clicar fora
document.addEventListener('DOMContentLoaded', function() {
  const acessBtn = document.querySelector('.acess-adm');
  const popup = document.querySelector('.popup-adm');
  if (!acessBtn || !popup) return;

  // estado inicial
  popup.setAttribute('aria-hidden', 'true');

  function showPopup() {
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    // opcional: foco no primeiro elemento interativo
    const foco = popup.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])');
    if (foco) foco.focus();
  }

  function hidePopup() {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
    acessBtn.focus();
  }

  acessBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (popup.classList.contains('show')) hidePopup();
    else showPopup();
  });

  // evita fechar ao clicar dentro do popup
  popup.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // clicar em qualquer outro lugar fecha
  document.addEventListener('click', function(e) {
    if (!popup.classList.contains('show')) return;
    if (e.target === acessBtn) return;
    if (!popup.contains(e.target)) hidePopup();
  });

  // fecha com Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
      hidePopup();
    }
  });
});

  // Mostra o elemento .admin quando o login foi bem-sucedido
  document.addEventListener('DOMContentLoaded', function() {
    const adminEl = document.querySelector('.admin');
    if (!adminEl) return;

    function getCookie(name) {
      const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1') {
      // grava cookie para persistir a sessão no front-end e limpa querystring
      document.cookie = 'isAdmin=1;path=/;max-age=' + (60 * 60);
      document.body.classList.add('is-admin');
      const cleanUrl = window.location.pathname + window.location.hash;
      history.replaceState(null, '', cleanUrl);
      return;
    }

    if (getCookie('isAdmin') === '1') {
      document.body.classList.add('is-admin');
    }
    // se houver nome do admin em cookie, exibe dentro de .pop-usuario
    const adminName = getCookie('adminUser');
    if (adminName) {
      const popUsuario = document.querySelector('.pop-usuario');
      if (popUsuario) popUsuario.textContent = decodeURIComponent(adminName);
    }
  });

  // handler do botão Sair dentro do popup admin
  document.addEventListener('DOMContentLoaded', function() {
    const btnExit = document.querySelector('.btn-exit');
    const popup = document.querySelector('.popup-adm');
    if (!btnExit) return;

    btnExit.addEventListener('click', function(e) {
      e.preventDefault();
      // limpa estado front-end imediatamente
      document.cookie = 'isAdmin=;path=/;max-age=0';
      document.body.classList.remove('is-admin');
      if (popup) popup.classList.remove('show');
      // chama o script de logout no servidor que encerra a sessão e redireciona para o form de login
      window.location.href = 'pages/pag-log/logout.php';
    });
  });
