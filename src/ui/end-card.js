function icon(n){return `<i class="ic i-${n}"></i>`}
function endCard(n){const e=$('#end');const D=n===4?{k:'Chapter 4 complete',h:'The Station',l:'A bus before dawn, an umbrella given away, and a road that closes.',nx:'Chapter 5 · Seen',nd:'October 2020 onwards.'}:n===3?{k:'Chapter 3 complete',h:'Thingyan',l:'Their best year: exams, a water festival, a second lamp, and a phone call in the next room.',nx:'Chapter 4 · The Station',nd:'2020.'}:n===2?{k:'Chapter 2 complete',h:'Monsoon Season',l:'One umbrella, two people, and a promise made over a lamp.',nx:'Chapter 3 · Thingyan',nd:'November 2018 to December 2019.'}:{k:'Chapter 1 complete',h:'The First Rain',l:'Two strangers, one wrong umbrella, and a joke that was only the beginning.',nx:'Chapter 2 · Monsoon Season',nd:'July to October 2018.'};
  e.innerHTML=`<div class="k">${D.k}</div><h2>${D.h}</h2><p class="lead">${D.l}</p>
  <h3 class="mh">Kept <span>${S.memories.length}</span></h3><div class="mgrid">${memCards(true,'kept')||'<p class="e">None this time.</p>'}</div>
  ${memCards(true,'other')?`<h3 class="mh">Other paths <span>${Object.keys(MEM_INFO).length-S.memories.length}</span></h3><p class="mhs">Moments from paths you didn't take. Each time you play, Min keeps something different.</p><div class="mgrid">${memCards(true,'other')}</div>`:''}${unsentHTML()}
  <div class="next"><small>Coming next</small><b>${D.nx}</b>${D.nd}</div>
  <div class="btns"><button class="b1" id="again">Play again</button></div>`;
  e.classList.add('on');$('#again').onclick=()=>location.reload();}

