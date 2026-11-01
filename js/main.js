const TYPES={standard:'Стандарт',vip:'VIP',bootcamp:'Bootcamp',stream:'Стримерская',console:'Консольная'};
const P=[
{id:1,name:'Standard 1',type:'standard',hall:'Arena',price:150,gpu:'RTX 4060',cpu:'Core i5-13400F',mon:'24" 165 Гц',tags:['Для новичков','Свободно сегодня'],e:'🖥️',d:'Удобное место для первой игры и для ежедневных сессий.'},
{id:2,name:'Standard Pro',type:'standard',hall:'Arena',price:200,gpu:'RTX 4070',cpu:'Ryzen 5 7600',mon:'27" 240 Гц',tags:['Популярный'],e:'🖥️',d:'Быстрый монитор для шутеров и соревновательных игр.'},
{id:3,name:'VIP-комната Royal',type:'vip',hall:'Lounge',price:450,gpu:'RTX 4080',cpu:'Core i7-14700K',mon:'32" 4K 144 Гц',tags:['VIP-зал','Популярный','Свободно сегодня'],e:'👑',d:'Закрытая комната с диваном и кондиционером. Подходит для компании.'},
{id:4,name:'VIP Duo',type:'vip',hall:'Lounge',price:380,gpu:'RTX 4070 Ti',cpu:'Ryzen 7 7700',mon:'27" 240 Гц',tags:['VIP-зал'],e:'👑',d:'Уютная комната на двоих с двумя ПК.'},
{id:5,name:'Bootcamp (5 мест)',type:'bootcamp',hall:'Pro',price:1200,gpu:'RTX 4070',cpu:'Core i5-14600K',mon:'27" 240 Гц',tags:['Популярный'],e:'🏆',d:'Комната для команды из пяти человек: маркерная доска и ТВ для разбора игр.'},
{id:6,name:'Стримерская',type:'stream',hall:'Pro',price:500,gpu:'RTX 4080 Super',cpu:'Ryzen 9 7900X',mon:'2×27" 165 Гц',tags:['Свободно сегодня'],e:'🎙️',d:'Звукоизоляция, свет и микрофон для стримов и записи.'},
{id:7,name:'PlayStation 5',type:'console',hall:'Lounge',price:250,gpu:'AMD RDNA 2',cpu:'Zen 2, 8 ядер',mon:'ТВ 55" 4K',tags:['Для новичков'],e:'🎮',d:'Диван, большой ТВ и два геймпада.'},
{id:8,name:'Xbox Series X',type:'console',hall:'Lounge',price:250,gpu:'AMD RDNA 2',cpu:'Zen 2, 8 ядер',mon:'ТВ 55" 4K',tags:['Свободно сегодня'],e:'🎮',d:'Game Pass и два геймпада в комплекте.'}];
const IMG={1:'standard-1.png',2:'standard-pro.jpeg',3:'VIP-Royal.jpg',4:'VIP-Duo.jpg',5:'Bootcamp.jpeg',6:'STREAM.jpg',7:'PlayStation5.jpg',8:'Xbox-SeriesX.jpg'};
P.forEach(p=>p.img='img/'+IMG[p.id]);
const $=(s,r=document)=>r.querySelector(s),page=document.body.dataset.page;
const cur=P.find(p=>p.id==new URLSearchParams(location.search).get('id'))||P[0];
const today=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
const rub=n=>n.toLocaleString('ru')+' ₽';

/* Единое меню, подвал, крошки, «Наверх», модальное окно */
const NAV=[['index.html','Главная','home'],['catalog.html','Каталог','catalog'],['contacts.html','Контакты','contacts']];
const CR={catalog:[['Главная','index.html'],['Каталог']],booking:[['Главная','index.html'],['Каталог','catalog.html'],[cur.name]],contacts:[['Главная','index.html'],['Контакты']]}[page];
document.body.insertAdjacentHTML('afterbegin',`<header class="header navbar navbar-expand-md sticky-top"><div class="container"><a class="header__logo navbar-brand" href="index.html">Game<span>Arena</span></a><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-label="Меню"><span class="navbar-toggler-icon"></span></button><nav class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto align-items-md-center gap-md-3">${NAV.map(n=>`<li><a class="header__link nav-link${n[2]==page||(page=='booking'&&n[2]=='catalog')?' header__link--active':''}" href="${n[0]}">${n[1]}</a></li>`).join('')}<li><a class="btn btn-primary btn-sm" href="catalog.html">Забронировать</a></li></ul></nav></div></header>`+(CR?`<nav class="crumbs container" aria-label="Хлебные крошки"><ol class="breadcrumb">${CR.map(c=>c[1]?`<li class="breadcrumb-item"><a href="${c[1]}">${c[0]}</a></li>`:`<li class="breadcrumb-item active">${c[0]}</li>`).join('')}</ol></nav>`:''));
document.body.insertAdjacentHTML('beforeend',`<footer class="footer"><div class="container row g-4 mx-auto"><div class="col-md-4"><b class="header__logo">GameArena</b><p>Киберспортивный клуб с онлайн-бронированием.</p></div><div class="col-md-4"><a href="catalog.html">Каталог мест</a><a href="contacts.html#faq">Вопросы и ответы</a><a href="contacts.html">Контакты</a></div><div class="col-md-4">Ул. Игровая, 15
+7 495 
00-00
Ежеднев
0:00


:00</div></div></footer><button class="to-top" id="top" aria-label="Наверх">↑</button>
<div class="modal fade" id="info" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h2 class="modal-title h5" id="m-title"></h2><button class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button></div><div class="modal-body" id="m-body"></div><div class="modal-footer" id="m-foot"></div></div></div></div>`);
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('scroll',()=>$('#top').classList.toggle('to-top--show',scrollY>400));

/* Карточки мест и модальное окно */
const card=p=>`<div class="col-sm-6 col-xl-4"><article class="place-card"><div class="place-card__img"><img class="place-card__photo" src="${p.img}" alt="${p.name}"><div class="place-card__tags">${p.tags.map(t=>`<span class="tag${t.startsWith('Свободно')?' tag--free':''}">${t}</span>`).join('')}</div></div><div class="place-card__body"><span class="place-card__type">${TYPES[p.type]} · зал ${p.hall}</span><h3 class="place-card__title">${p.name}</h3><ul class="place-card__specs"><li>Видеокарта: ${p.gpu}</li><li>Процессор: ${p.cpu}</li><li>Монитор: ${p.mon}</li></ul><div class="place-card__foot"><b class="place-card__price">${p.price} ₽/ч</b><button class="btn btn-outline-info btn-sm" data-info="${p.id}">Кратко</button><a class="btn btn-primary btn-sm" href="booking.html?id=${p.id}">Забронировать</a></div></div></article></div>`;
document.addEventListener('click',e=>{const b=e.target.closest('[data-info]');if(!b)return;const p=P.find(x=>x.id==b.dataset.info);
$('#m-title').textContent=p.name;$('#m-body').innerHTML=`<p class="text-secondary">${TYPES[p.type]}, зал ${p.hall}</p><p>${p.d}</p><p class="mb-0">${p.gpu} · ${p.cpu} · ${p.mon}
<b>${p.
e} ₽ в час</b></p>`;
$('#m-foot').innerHTML=`<a class="btn btn-primary" href="booking.html?id=${p.id}">Перейти к бронированию</a>`;new bootstrap.Modal('#info').show()});

/* Главная */
if(page=='home'){$('#list').innerHTML=P.filter(p=>p.tags.includes('Популярный')).map(card).join('');
$('#seatmap').innerHTML=Array.from({length:24},(_,i)=>`<i class="seatmap__seat${[2,5,9,10,14,19,21].includes(i)?' seatmap__seat--free':''}"></i>`).join('')}

/* Каталог: фильтры и сортировка */
if(page=='catalog'){const fm=$('#filters'),run=()=>{const f=Object.fromEntries(new FormData(fm));$('#pv').textContent=f.price;
const r=P.filter(p=>(!f.type||p.type==f.type)&&(!f.hall||p.hall==f.hall)&&p.price<=+f.price);if(f.sort)r.sort((a,b)=>f.sort=='asc'?a.price-b.price:b.price-a.price);
$('#list').innerHTML=r.map(card).join('')||'<p class="text-secondary">Ничего не найдено. Измените фильтры.</p>';$('#count').textContent=r.length};
fm.addEventListener('input',run);fm.addEventListener('reset',()=>setTimeout(run));run()}

/* Страница места: данные и расчёт стоимости */
if(page=='booking'){document.title=cur.name+' — бронирование';$('#p-img').innerHTML=`<img class="place-card__photo" src="${cur.img}" alt="${cur.name}">`;$('#p-name').textContent=cur.name;
$('#p-meta').textContent=`${TYPES[cur.type]} · зал ${cur.hall} · ${cur.price} ₽/ч`;$('#p-desc').textContent=cur.d;
$('#p-specs').innerHTML=[['Видеокарта',cur.gpu],['Процессор',cur.cpu],['Монитор',cur.mon]].map(s=>`<li><b>${s[0]}:</b> ${s[1]}</li>`).join('');
$('#b-pl').innerHTML=[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('');$('#b-h').innerHTML=Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1} ч</option>`).join('');
const calc=()=>$('#total').textContent=rub(cur.price*$('#b-h').value);$('#b-h').onchange=calc;calc()}

/* Проверка форм */
document.querySelectorAll('input[type=date]').forEach(i=>i.min=today());
const MSG={tel:'Формат: +7 900 123-45-67',email:'Введите корректный e-mail',date:'Дата не раньше сегодняшней'};
function validate(f){let ok=true;f.querySelectorAll('[required]').forEach(i=>{const v=i.value.trim(),d=v.replace(/\D/g,'').length;let m=!v?'Заполните поле':'';
if(!m&&i.type=='tel'&&!(/^\+?[\d\s()-]+$/.test(v)&&d>=10&&d<=12))m=MSG.tel;
if(!m&&i.type=='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+


$/.test(v))m=MSG.email;
if(!m&&i.type=='date'&&v<today())m=MSG.date;
let fb=i.parentElement.querySelector('.invalid-feedback');if(!fb){fb=document.createElement('div');fb.className='invalid-feedback';i.after(fb)}
fb.textContent=m;i.classList.toggle('is-invalid',!!m);if(m)ok=false});return ok}
document.querySelectorAll('form[data-validate]').forEach(f=>{const box=document.createElement('div');box.className='form-msg';f.append(box);
f.addEventListener('submit',e=>{e.preventDefault();const ok=validate(f);
box.innerHTML=ok?`<div class="alert alert-success mb-0">${page=='booking'?`Бронь принята: ${cur.name}, ${$('#b-date').value} в ${$('#b-time').value}, ${$('#total').textContent}. Подтверждение придёт на почту.`:'Сообщение отправлено. Мы ответим в течение дня.'}</div>`:'<div class="alert alert-danger mb-0">Проверьте поля, отмеченные красным.</div>';
if(ok){f.reset();f.querySelectorAll('.is-invalid').forEach(i=>i.classList.remove('is-invalid'));if(page=='booking')$('#total').textContent=rub(cur.price)}})});–02