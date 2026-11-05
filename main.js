(function(){
  var WA_NUMBER = '5534984080127';
  var WA_DEFAULT = 'Olá! Vim pela página de Black Friday e quero agendar meu diagnóstico de energia.';
  window.dataLayer = window.dataLayer || [];
  function track(name, extra){ try{ window.dataLayer.push(Object.assign({event:name}, extra||{})); }catch(e){} }
  function waUrl(msg){ return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg); }

  // todos os botões de WhatsApp usam a mensagem pré-preenchida
  document.querySelectorAll('a[data-wa]').forEach(function(a){
    a.href = waUrl(WA_DEFAULT);
    a.target = '_blank'; a.rel = 'noopener';
  });
  document.addEventListener('click', function(e){
    var el = e.target.closest ? e.target.closest('[data-track]') : null;
    if(el && el.tagName !== 'BUTTON'){ track(el.getAttribute('data-track')); }
  });

  // máscara de telefone
  var whats = document.getElementById('whats');
  whats.addEventListener('input', function(){
    var d = whats.value.replace(/\D/g,'').slice(0,11), o = '';
    if(d.length > 0) o = '(' + d.slice(0,2);
    if(d.length >= 3) o += ') ' + d.slice(2, d.length > 10 ? 7 : 6);
    if(d.length > (d.length > 10 ? 7 : 6)) o += '-' + d.slice(d.length > 10 ? 7 : 6);
    whats.value = o;
  });

  // calendário: só segunda, quarta, sábado e domingo
  var WINDOWS = { 1:[17,22], 3:[17,22], 6:[8,13], 0:[8,13] };
  var DAYS = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  var data = document.getElementById('data'), hora = document.getElementById('hora'), hint = document.getElementById('hora-hint');
  function iso(d){ var m = d.getMonth()+1, day = d.getDate(); return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(day<10?'0':'')+day; }
  data.min = iso(new Date());
  function parse(v){ var p = v.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
  function resetHora(msg){ hora.innerHTML = '<option value="">'+msg+'</option>'; hora.disabled = true; }
  data.addEventListener('change', function(){
    data.setCustomValidity('');
    if(!data.value){ resetHora('Escolha a data primeiro'); hint.textContent = 'Dentro da janela do dia.'; return; }
    var wd = parse(data.value).getDay(), w = WINDOWS[wd];
    if(!w){
      data.setCustomValidity('Escolha uma segunda, quarta, sábado ou domingo.');
      resetHora('Escolha outra data');
      hint.textContent = 'Atendemos apenas segundas, quartas, sábados e domingos.';
      return;
    }
    var html = '<option value="">Selecione</option>';
    for(var h = w[0]; h < w[1]; h++){ html += '<option value="'+h+'h">'+h+'h</option>'; }
    hora.innerHTML = html; hora.disabled = false;
    hint.textContent = DAYS[wd].charAt(0).toUpperCase()+DAYS[wd].slice(1)+': '+w[0]+'h às '+w[1]+'h.';
  });

  // envio
  var form = document.getElementById('form-agenda'), err = document.getElementById('err'), done = document.getElementById('done'), doneWa = document.getElementById('done-wa');
  form.addEventListener('submit', function(e){
    e.preventDefault(); err.textContent = '';
    if(!form.checkValidity()){
      var bad = form.querySelector(':invalid');
      err.textContent = (bad && bad.validationMessage) || 'Preencha os campos obrigatórios.';
      if(bad) bad.focus();
      return;
    }
    var f = new FormData(form), dt = parse(f.get('data'));
    var dd = ('0'+dt.getDate()).slice(-2)+'/'+('0'+(dt.getMonth()+1)).slice(-2)+'/'+dt.getFullYear();
    var msg = WA_DEFAULT + '\n\n' +
      'Nome: ' + f.get('nome') + '\n' +
      'WhatsApp: ' + f.get('whats') + '\n' +
      'Bairro: ' + f.get('bairro') + '\n' +
      'Imóvel: ' + f.get('imovel') + '\n' +
      'Conta de luz: ' + f.get('conta') + '\n' +
      'Data: ' + dd + ' (' + DAYS[dt.getDay()] + ')\n' +
      'Horário: ' + f.get('hora') + '\n' +
      'Pagamento: ' + f.get('pgto');
    doneWa.href = waUrl(msg); doneWa.target = '_blank'; doneWa.rel = 'noopener';
    track('form_submit', {imovel:f.get('imovel'), faixa_conta:f.get('conta')});
    // TODO produção: enviar os dados do formulário para o CRM ou webhook antes de exibir a confirmação.
    done.hidden = false;
    done.scrollIntoView({block:'nearest', behavior:'smooth'});
  });
})();
