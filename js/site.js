/* The Ain Hub — shared site behavior */
(function(){
  var shot = location.hash.indexOf('shot')>-1 || location.search.indexOf('shot')>-1;
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));

  function countUp(el){
    var t=+el.getAttribute('data-count'),
        suf=el.getAttribute('data-suffix')||'',
        pre=el.getAttribute('data-prefix')||'',
        n=0,step=Math.max(1,Math.ceil(t/45));
    var id=setInterval(function(){n+=step;if(n>=t){n=t;clearInterval(id);}el.textContent=pre+n+suf;},22);
  }

  if(shot){
    document.documentElement.classList.add('shot');
    reveals.forEach(function(e){e.classList.add('in');});
    [].forEach.call(document.querySelectorAll('[data-count]'),function(e){
      e.textContent=(e.getAttribute('data-prefix')||'')+e.getAttribute('data-count')+(e.getAttribute('data-suffix')||'');
    });
  }else{
    var io=new IntersectionObserver(function(ents){
      ents.forEach(function(en){
        if(en.isIntersecting){
          en.target.classList.add('in');
          if(en.target.getAttribute('data-count'))countUp(en.target);
          io.unobserve(en.target);
        }
      });
    },{threshold:.18});
    reveals.forEach(function(e){io.observe(e);});
  }

  // ladder connector draws in when the steps come into view
  var steps=document.querySelector('.steps');
  if(steps){
    if(shot){steps.classList.add('drawn');}
    else{var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('drawn');sio.unobserve(e.target);}});},{threshold:.3});sio.observe(steps);}
  }

  // sticky nav shadow
  var nav=document.querySelector('nav');
  if(nav){addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>20);});}

  // logo marquee: fall back to a styled wordmark chip if an image is missing
  [].forEach.call(document.querySelectorAll('img.lg'),function(im){
    function fb(){var cell=im.closest&&im.closest('.lcell');if(cell){im.style.display='none';}else{var s=document.createElement('span');s.className='logo-chip';s.textContent=im.getAttribute('alt')||'';im.replaceWith(s);}}
    im.addEventListener('error',fb);
    if(im.complete && im.naturalWidth===0) fb();
  });

  // hero cursor parallax — subtle depth on the faceted motif + art
  var ph=document.querySelector('.page-hero');
  if(ph && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches){
    var motif=ph.querySelector('.ph-motif'), art=ph.querySelector('.ph-art'), raf=0, nx=0, ny=0;
    function applyPar(){raf=0;
      if(motif)motif.style.transform='translate('+(nx*22).toFixed(1)+'px,'+(ny*22).toFixed(1)+'px)';
      if(art)art.style.transform='translate('+(nx*-12).toFixed(1)+'px,'+(ny*-12).toFixed(1)+'px)';
    }
    ph.addEventListener('mousemove',function(e){
      var r=ph.getBoundingClientRect();
      nx=(e.clientX-r.left)/r.width-0.5; ny=(e.clientY-r.top)/r.height-0.5;
      if(!raf)raf=requestAnimationFrame(applyPar);
    });
    ph.addEventListener('mouseleave',function(){nx=0;ny=0;if(!raf)raf=requestAnimationFrame(applyPar);});
  }

  // mobile menu toggle
  var tog=document.querySelector('.nav-toggle'),
      links=document.querySelector('.nav-links');
  if(tog&&links){
    tog.addEventListener('click',function(){
      links.classList.toggle('open');
      tog.classList.toggle('x');
    });
    links.addEventListener('click',function(e){
      if(e.target.tagName==='A'){links.classList.remove('open');tog.classList.remove('x');}
    });
  }
})();
