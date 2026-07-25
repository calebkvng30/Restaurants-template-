(function(){
  "use strict";
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Category tabs ----
  try{
    var tabs = document.querySelectorAll('.cat-tab');
    var cats = document.querySelectorAll('.menu-cat');
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        tabs.forEach(function(t){ t.classList.remove('active'); });
        cats.forEach(function(c){ c.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelector('.menu-cat[data-cat="'+tab.dataset.cat+'"]').classList.add('active');
      });
    });
  }catch(e){ console.error('Tab init failed', e); }

  // ---- Cart ----
  window.MelsCart = (function(){
    var items = {}; // key: name -> {name, price, qty}
    var WHATSAPP_NUMBER = '12705891499';

    var els = {};
    function cacheEls(){
      els.drawer = document.getElementById('drawer');
      els.overlay = document.getElementById('overlay');
      els.body = document.getElementById('drawerBody');
      els.total = document.getElementById('cartTotal');
      els.count = document.getElementById('cartCount');
      els.waBtn = document.getElementById('waCheckoutBtn');
      els.toast = document.getElementById('toast');
    }

    function money(n){ return '$' + n.toFixed(2); }

    function add(name, price){
      try{
        if(!items[name]){ items[name] = {name:name, price:price, qty:0}; }
        items[name].qty += 1;
        render();
        showToast(name + ' added');
      }catch(e){ console.error('Add failed', e); }
    }

    function changeQty(name, delta){
      try{
        if(!items[name]) return;
        items[name].qty += delta;
        if(items[name].qty <= 0){ delete items[name]; }
        render();
      }catch(e){ console.error('Qty change failed', e); }
    }

    function totalCount(){
      var c = 0;
      Object.keys(items).forEach(function(k){ c += items[k].qty; });
      return c;
    }

    function totalPrice(){
      var t = 0;
      Object.keys(items).forEach(function(k){ t += items[k].qty * items[k].price; });
      return t;
    }

    function render(){
      try{
        if(!els.body) return;
        var keys = Object.keys(items);
        if(keys.length === 0){
          els.body.innerHTML = '<div class="drawer-empty">Your cart is empty — tap any <strong>+</strong> on the menu to start an order.</div>';
        } else {
          els.body.innerHTML = keys.map(function(k){
            var it = items[k];
            return '<div class="cart-line">' +
              '<div><div class="name">'+ escapeHtml(it.name) +'</div>' +
              '<div class="meta">'+ money(it.price) +' each</div>' +
              '<div class="qty-ctrl">' +
                '<button data-action="dec" data-name="'+ encodeURIComponent(it.name) +'">−</button>' +
                '<span>'+ it.qty +'</span>' +
                '<button data-action="inc" data-name="'+ encodeURIComponent(it.name) +'">+</button>' +
              '</div></div>' +
              '<div class="line-price">'+ money(it.price*it.qty) +'</div>' +
            '</div>';
          }).join('');
        }
        els.total.textContent = money(totalPrice());
        els.count.textContent = totalCount();

        // wire up qty buttons
        els.body.querySelectorAll('[data-action]').forEach(function(btn){
          btn.addEventListener('click', function(){
            var name = decodeURIComponent(btn.dataset.name);
            var delta = btn.dataset.action === 'inc' ? 1 : -1;
            changeQty(name, delta);
          });
        });

        // wire up whatsapp link
        if(els.waBtn){ els.waBtn.href = buildWhatsAppLink(); }
      }catch(e){ console.error('Render failed', e); }
    }

    function escapeHtml(str){
      var d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }

    function buildWhatsAppLink(){
      var keys = Object.keys(items);
      var lines = ['Hi Mel\'s Cafe, I\'d like to order:'];
      keys.forEach(function(k){
        var it = items[k];
        lines.push('• ' + it.qty + ' x ' + it.name + ' (' + money(it.price*it.qty) + ')');
      });
      lines.push('Total: ' + money(totalPrice()));
      lines.push('Name: ');
      lines.push('Pickup time: ');
      var text = encodeURIComponent(lines.join('\n'));
      return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;
    }

    function showToast(msg){
      if(!els.toast) return;
      els.toast.textContent = msg;
      els.toast.classList.add('show');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(function(){ els.toast.classList.remove('show'); }, 1600);
    }

    function open(){
      els.drawer.classList.add('open');
      els.overlay.classList.add('open');
    }
    function close(){
      els.drawer.classList.remove('open');
      els.overlay.classList.remove('open');
    }

    function init(){
      cacheEls();
      document.getElementById('openCartBtn').addEventListener('click', open);
      document.getElementById('headerOrderBtn').addEventListener('click', function(e){
        // let default anchor scroll happen too
      });
      document.getElementById('closeCartBtn').addEventListener('click', close);
      els.overlay.addEventListener('click', close);

      document.querySelectorAll('.item .add-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
          var itemEl = btn.closest('.item');
          add(itemEl.dataset.name, parseFloat(itemEl.dataset.price));
        });
      });
      document.querySelectorAll('.jar-item .add-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
          add(btn.dataset.name, parseFloat(btn.dataset.price));
        });
      });

      render();
    }

    return { init: init, add: add, open: open, close: close };
  })();

  try{
    window.MelsCart.init();
  }catch(e){ console.error('Cart init failed', e); }

  // ---- Mobile nav (simple toggle to menu section) ----
  try{
    var burger = document.getElementById('burgerBtn');
    burger.addEventListener('click', function(){
      var nav = document.querySelector('nav.links');
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.position='absolute'; nav.style.top='64px'; nav.style.right='24px';
      nav.style.background='#211E1A'; nav.style.flexDirection='column'; nav.style.padding='16px 22px';
      nav.style.border='1px solid rgba(255,255,255,0.14)'; nav.style.borderRadius='6px'; nav.style.gap='14px';
    });
  }catch(e){ console.error('Burger init failed', e); }
})();
