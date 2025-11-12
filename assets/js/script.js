/* ============================================
   RPG HUB - JAVASCRIPT INTERATIVO
   Funcionalidades: Cards expansíveis, transições, 
   animações e interatividade geral
   ============================================ */

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', function() {
  initExpandableCards();
  initPageTransitions();
  initNavButtons();
  initSmoothScroll();
  addKeyboardNavigation();
});

// === CARDS EXPANSÍVEIS ===
/**
 * Inicializa os cards de regras expansíveis
 * Permite clicar para expandir/recolher conteúdo
 */
function initExpandableCards() {
  const ruleCards = document.querySelectorAll('.rule-card');
  
  ruleCards.forEach(card => {
    // Adiciona evento de clique
    card.addEventListener('click', function() {
      // Alterna a classe 'active' para expandir/recolher
      this.classList.toggle('active');
      
      // Adiciona uma pequena animação de pulso
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 100);
    });
    
    // Suporte para navegação por teclado (Enter e Space)
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
    
    // Torna o card focável para acessibilidade
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');
    
    // Atualiza aria-expanded quando o card muda de estado
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isActive = card.classList.contains('active');
          card.setAttribute('aria-expanded', isActive);
        }
      });
    });
    
    observer.observe(card, { attributes: true });
  });
  
  console.log(`${ruleCards.length} cards expansíveis inicializados`);
}

// === TRANSIÇÕES DE PÁGINA ===
/**
 * Adiciona efeitos de transição suave ao navegar entre páginas
 * Cria um fade-out com blur antes de carregar nova página
 */
function initPageTransitions() {
  // Seleciona todos os links que navegam para outras páginas
  const links = document.querySelectorAll('a:not([target="_blank"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Verifica se é um link interno (mesma página)
      const href = this.getAttribute('href');
      
      // Se for link com # (âncora), não aplica transição
      if (href && href.startsWith('#')) {
        return;
      }
      
      // Se for um link válido para outra página
      if (href && !href.startsWith('javascript:')) {
        e.preventDefault();
        
        // Aplica efeito de fade-out
        document.body.style.transition = 'opacity 0.4s ease, filter 0.4s ease';
        document.body.style.opacity = '0';
        document.body.style.filter = 'blur(5px)';
        
        // Aguarda a animação e então navega
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
  
  console.log('Transições de página inicializadas');
}

// === ANIMAÇÕES DOS BOTÕES DE NAVEGAÇÃO ===
/**
 * Adiciona efeitos especiais aos botões da navbar
 * Cria efeito de "acendimento de runas" no hover
 */
function initNavButtons() {
  const navButtons = document.querySelectorAll('.nav-button');
  
  navButtons.forEach(button => {
    // Efeito de hover com delay entre letras
    button.addEventListener('mouseenter', function() {
      animateRuneGlow(this);
    });
    
    // Efeito de clique (pulso)
    button.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-3px) scale(1)';
    });
  });
  
  console.log(`${navButtons.length} botões de navegação animados`);
}

/**
 * Anima o brilho de runas nos botões
 * @param {HTMLElement} button - Elemento do botão
 */
function animateRuneGlow(button) {
  const text = button.textContent;
  const letters = text.split('');
  
  // Cria um span para cada letra (apenas visualmente, sem modificar o DOM real)
  // Aplica um leve efeito de brilho pulsante
  button.style.textShadow = '0 0 10px rgba(196, 165, 110, 0.6)';
  
  setTimeout(() => {
    button.style.textShadow = '';
  }, 500);
}

// === SCROLL SUAVE ===
/**
 * Implementa scroll suave para âncoras na mesma página
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignora links vazios ou apenas '#'
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Calcula posição com offset para a navbar fixa
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  console.log('Scroll suave inicializado');
}

// === NAVEGAÇÃO POR TECLADO ===
/**
 * Adiciona suporte melhorado para navegação por teclado
 */
function addKeyboardNavigation() {
  // ESC para fechar todos os cards expandidos
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activeCards = document.querySelectorAll('.rule-card.active');
      activeCards.forEach(card => {
        card.classList.remove('active');
      });
      
      if (activeCards.length > 0) {
        console.log(`${activeCards.length} cards fechados com ESC`);
      }
    }
  });
  
  console.log('Navegação por teclado configurada');
}

// === EFEITOS ESPECIAIS PARA CARDS DO HUB ===
/**
 * Adiciona efeitos de partículas ou brilho nos cards principais
 * Ativado no hover dos cards de sistemas
 */
function initSystemCardEffects() {
  const systemCards = document.querySelectorAll('.system-card');
  
  systemCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      createSparkleEffect(this, e);
    });
  });
  
  console.log('Efeitos especiais dos cards de sistema inicializados');
}

/**
 * Cria um efeito de brilho sutil ao passar o mouse
 * @param {HTMLElement} element - Elemento alvo
 * @param {MouseEvent} e - Evento do mouse
 */
function createSparkleEffect(element, e) {
  // Efeito sutil já implementado via CSS ::after
  // Esta função pode ser expandida no futuro para efeitos mais complexos
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Posiciona o brilho onde o mouse entrou
  element.style.setProperty('--mouse-x', `${x}px`);
  element.style.setProperty('--mouse-y', `${y}px`);
}

// === UTILITÁRIOS ===

/**
 * Detecta se o usuário prefere movimento reduzido
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Adiciona uma classe temporária para animação
 * @param {HTMLElement} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @param {number} duration - Duração em ms
 */
function addTemporaryClass(element, className, duration = 1000) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}

/**
 * Expande todos os cards de uma vez (útil para impressão ou acessibilidade)
 */
function expandAllCards() {
  const cards = document.querySelectorAll('.rule-card');
  cards.forEach(card => {
    card.classList.add('active');
  });
  console.log('Todos os cards expandidos');
}

/**
 * Recolhe todos os cards
 */
function collapseAllCards() {
  const cards = document.querySelectorAll('.rule-card');
  cards.forEach(card => {
    card.classList.remove('active');
  });
  console.log('Todos os cards recolhidos');
}

// === FUNÇÕES EXPOSTAS GLOBALMENTE ===
// Permite que sejam chamadas via console para debug/testes
window.rpgHub = {
  expandAllCards,
  collapseAllCards,
  prefersReducedMotion
};

// === LOG DE INICIALIZAÇÃO ===
console.log('🎲 RPG Hub inicializado com sucesso!');
console.log('📜 Sistema: Vaesen');
console.log('✨ Todos os scripts carregados e prontos');
