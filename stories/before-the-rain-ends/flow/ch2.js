/* ============ CHAPTER 2 · MONSOON SEASON ============ */
SCENE.walkShare='<img src="img/c2-walk-share.webp?v=2611161" alt="" draggable="false">';
SCENE.walkDrift='<img src="img/c2-walk-drift.webp?v=2611161" alt="" draggable="false">';
SCENE.walkGate='<img src="img/c2-walk-gate.webp?v=2611161" alt="" draggable="false">';
SCENE.pagoda='<img src="img/c2-pagoda.webp?v=2611161" alt="" draggable="false">';
SCENE.pagodaLamp='<img src="img/c2-pagoda-lamp.webp?v=2611161" alt="" draggable="false">';
SCENE.pagodaHands='<img src="img/c2-pagoda-hands.webp?v=2611161" alt="" draggable="false">';
SCENE.lampWall='<img src="img/c2-lamp-wall.webp?v=2611161" alt="" draggable="false">';
const CH2=[
 {title:{big:'c2.title.1',small:'c2.title.2',rain:2,time:'5:18 PM'}},
 // C2.1 May
 {notify:{c:'may',text:'Voice message',div:'Jul 2018',m:{k:'voice',text:'0:06',tr:'c2.may.1'},rows:[{c:'mom',text:'c2.may.2',time:'Jun'},{c:'hnin',text:'c2.may.3',time:'Jun'},{c:'thura',text:'c2.may.4',time:'Jun'}]}},
 {in:'c2.may.5'},
 {in:'c2.may.6'},
 {choice:{flag:'c2_walk',opts:[
   {label:'c2.may.7',send:'c2.may.8',then:[{in:'c2.may.9'},{out:'c2.may.10'},{in:'c2.may.11'},{in:'c2.may.12'},{out:'c2.may.13'}]},
   {label:'c2.may.14',send:'c2.may.15',then:[{typing:1600},{pause:900},{in:'c2.may.16'}]},
   {label:'c2.may.17',send:'c2.may.18',then:[{in:'c2.may.19'},{in:'c2.may.20'},{out:'c2.may.21'}]}]}},
 {pause:900},
 // C2.2 Walk home
 {scene:{art:'walkShare',cap:'After class · dusk',rain:1}},
 {narr:'c2.walk-share.1'},
 {shot:'walkDrift'},
 {narr:'c2.walk-share.2'},
 {choice:{flag:'c2_shoulder',opts:[
   {label:'c2.walk-share.3',act:1,then:[{narr:'c2.walk-share.4'},{say:['May','c2.walk-share.5']},{narr:'c2.walk-share.6'}]},
   {label:'c2.walk-share.7',act:1,then:[{shot:'walkGate'},{narr:'c2.walk-share.8'},{say:['May','c2.walk-share.9']},{min:'c2.walk-share.10'}]},
   {label:'c2.walk-share.11',say:'c2.walk-share.12',then:[{say:['May','c2.walk-share.13']},{narr:'c2.walk-share.14'}]}]}},
 {mem:'shoulder'},
 // Mom, that night
 {rain:1},{time:'9:12 PM'},
 {notify:{c:'mom',text:'c2.mom.1',rows:[{c:'may',text:'c2.mom.2',time:'4:02 PM'},{c:'hnin',text:'c2.mom.3',time:'Jun'},{c:'thura',text:'c2.mom.4',time:'Jun'}]}},
 {choice:{flag:'c2_mom',opts:[
   {label:'c2.mom.5',send:'c2.mom.6',then:[{in:'c2.mom.7'}]},
   {label:'c2.mom.8',send:'c2.mom.9',then:[{in:'c2.mom.10'},{in:'c2.mom.11'}]},
   {label:'c2.mom.12',sticker:'catUmb',then:[{in:'c2.mom.13'}]}]}},
 {pause:900},
 // C2.3 Thura
 {time:'10:40 PM'},
 {notify:{c:'thura',text:'c2.thura.1',rows:[{c:'mom',text:'c2.thura.2',time:'9:12 PM'},{c:'may',text:'c2.thura.3',time:'4:02 PM'},{c:'hnin',text:'c2.thura.4',time:'Jun'}]}},
 {choice:{flag:'c2_thura',opts:[
   {label:'c2.thura.5',send:'c2.thura.6',then:[{in:'c2.thura.7'},{in:'c2.thura.8'}]},
   {label:'c2.thura.9',send:'c2.thura.10',then:[{in:'c2.thura.11'},{in:'c2.thura.12'}]},
   {label:'c2.thura.13',send:'c2.thura.14',then:[{in:'c2.thura.15'},{in:'c2.thura.16'},{in:'c2.thura.17'}]}]}},
 {pause:900},
 // C2.4 Photo walk
 {time:'8:03 PM'},
 {notify:{c:'may',text:'c2.may.22',div:'Aug 2018',rows:[{c:'thura',text:'c2.may.23',time:'Sat'},{c:'mom',text:'c2.may.24',time:'Fri'},{c:'hnin',text:'c2.may.25',time:'Jun'}]}},
 {in:'c2.may.26'},
 {in:'c2.may.27'},
 {out:'c2.may.28'},
 {in:'c2.may.29'},
 {out:'c2.may.30'},
 {in:'c2.may.31'},
 {pause:700},
 {title:{big:'c2.title.3',small:'c2.title.4',rain:0}},
 {photowalk:true},
 {mem:'walk'},
 {rain:0},{time:'6:20 PM'},
 {open:{c:'may'}},
 ()=>(S.walk||[]).map(w=>{const sp=SPOTS.find(x=>x.id===w.id);ART['shot_'+w.id]=shotHTML(w);return {outPhoto:'shot_'+w.id}}),
 {typing:1800},
 {if:{test:f=>f.c2_walk_framed>=3,then:[{in:'c2.may.32'}],else:[{in:'c2.may.33'}]}},
 {in:'c2.may.34'},
 ()=>{const L={tea:['c2.may.35','c2.may.36'],monastery:['c2.may.37','c2.may.38'],river:['c2.may.39','c2.may.40'],market:['c2.may.41','c2.may.42'],shop:['c2.may.43','c2.may.44'],dog:["Saya.",'c2.may.45']};
   const opts=(S.walk||[]).map(w=>({label:L[w.id][0],send:L[w.id][0],v:w.id,ph:'shot_'+w.id,then:[{in:L[w.id][1]}]}));
   opts.push({label:'c2.may.46',v:'may',ph:'mayCandid',photo:'mayCandid',then:[{typing:1500},{pause:700},{typing:1300},{in:'c2.may.47'},{in:'c2.may.48'}]});
   return [{choice:{flag:'c2_fav_photo',hint:'Which one is his favourite?',opts}}]},
 {pause:900},
 // C2.5 Hnin
 {time:'6:41 PM'},
 {notify:{c:'hnin',text:'c2.hnin.1',rows:[{c:'may',text:'c2.hnin.2',time:'6:22 PM'},{c:'thura',text:'c2.hnin.3',time:'Sat'},{c:'mom',text:'c2.hnin.4',time:'Fri'}]}},
 {in:'c2.hnin.5'},
 {choice:{flag:'c2_hnin',opts:[
   {label:'c2.hnin.6',send:'c2.hnin.7',then:[{in:'c2.hnin.8'}]},
   {label:'c2.hnin.9',send:'c2.hnin.10',then:[{in:'c2.hnin.11'},{pause:1400},{in:'c2.hnin.12'}]},
   {label:'c2.hnin.13',send:'c2.hnin.14',then:[{in:'c2.hnin.15'}]}]}},
 {pause:900},
 // C2.5a May posts his photo
 {time:'9:12 PM'},
 {post:{c:'may',flag:'c2_post_like',tag:false,place:'Sunday, after the rain',likes:'Thura, Hnin and 9 others',when:'August 2018',
   art:f=>f.c2_fav_photo==='may'?'mayCandid':'shot_'+(f.c2_fav_photo||((S.walk||[])[0]||{}).id),
   cap:f=>f.c2_fav_photo==='may'?'c2.post.1':'c2.post.2',
   cmts:f=>[{n:'Thura',t:'c2.post.3'},{n:'Mom',t:f.c2_fav_photo==='may'?'c2.post.4':'c2.post.5'},{n:'May Thiri',t:f.c2_fav_photo==='may'?'c2.post.6':'c2.post.7'}],cflag:'c2_post_cmt',
   cOpts:f=>f.c2_fav_photo==='may'?[{label:'c2.post.8',reply:[['May Thiri','c2.post.9']]},{label:'c2.post.10',reply:[['May Thiri','c2.post.11']]}]
     :[{label:'c2.post.12',reply:[['May Thiri','c2.post.13']]},{label:'c2.post.14',reply:[['May Thiri','c2.post.15']]}],
   rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},
 {if:{test:f=>f.c2_post_like===true,
   then:[{notify:{c:'may',text:'c2.may.49',rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},{in:'c2.may.50'},
     {choice:{flag:'c2_post_reply',opts:[{label:'c2.may.51',send:'c2.may.52',then:[{in:'c2.may.53'}]},{label:'c2.may.54',send:'c2.may.55',then:[{in:'c2.may.56'}]}]}}],
   else:[]}},
 {if:{test:f=>f.c2_post_like==='c',then:[{notify:{c:'may',text:'c2.may.57',rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},{in:'c2.may.58'},
     {choice:{flag:'c2_post_reply',opts:[{label:'c2.may.59',send:'c2.may.60',then:[{in:'c2.may.61'}]},{label:'c2.may.62',send:'c2.may.63',then:[{in:'c2.may.64'}]}]}}]}},
 {if:{test:f=>f.c2_post_like===false,then:[{notify:{c:'may',text:'c2.may.65',rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},{in:'c2.may.66'},{in:'c2.may.67'},
     {choice:{flag:'c2_post_reply',opts:[{label:'c2.may.68',send:'c2.may.69',then:[{in:'c2.may.70'}]},{label:'c2.may.71',send:'c2.may.72',then:[{in:'c2.may.73'}]}]}}]}},
 {pause:900},
 // C2.5b Mom learns stickers
 {rain:1},{time:'8:15 PM'},
 {notify:{c:'mom',text:'c2.mom.14',div:'Sep 2018',rows:[{c:'hnin',text:'c2.mom.15',time:'Aug'},{c:'may',text:'c2.mom.16',time:'Aug'},{c:'thura',text:'c2.mom.17',time:'Aug'}]}},
 {in:'c2.mom.18'},
 {choice:{flag:'c2_mom_stk',opts:[
   {label:'c2.mom.19',send:'c2.mom.20',then:[{inSticker:'laugh'},{in:'c2.mom.21'},{in:'c2.mom.22'},{out:'c2.mom.23'},{in:'c2.mom.24'},{in:'c2.mom.25'}]},
   {label:'c2.mom.26',send:'c2.mom.27',then:[{in:'c2.mom.28'},{in:'c2.mom.29'}]},
   {label:'c2.mom.30',sticker:'catUmb',then:[{in:'c2.mom.31'},{in:'c2.mom.32'},{out:'c2.mom.33'},{in:'c2.mom.34'},{in:'c2.mom.35'}]}]}},
 {in:'c2.mom.36'},
 {in:'c2.mom.37'},
 {choice:{flag:'c2_mom_yellow',opts:[
   {label:'c2.mom.38',send:'c2.mom.39',then:[{in:'c2.mom.40'}]},
   {label:'c2.mom.41',send:'c2.mom.42',then:[{in:'c2.mom.43'}]},
   {label:'c2.mom.44',send:'c2.mom.45',then:[{typing:1400},{in:'c2.mom.46'},{in:'c2.mom.47'}]}]}},
 {in:'c2.mom.48'},
 {in:'c2.mom.49'},
 {pause:900},
 {time:'8:31 PM'},
 {glance:{c:'mom',text:'c2.glance.1',likes:'Daw Aye Aye and 7 others',when:'September 2018',
   cmts:[{n:'Daw Aye Aye',t:'c2.glance.2'},{n:'Mom',t:'c2.glance.3'},{n:'Thura',t:'c2.glance.4'},{n:'Mom',t:'c2.glance.5'}],
   rows:[{c:'hnin',text:'',time:'Aug'},{c:'may',text:'',time:'Aug'},{c:'thura',text:'',time:'Aug'}]}},
 // C2.5c May, the bangs
 {time:'9:47 PM'},
 {notify:{c:'may',text:'c2.may.74',rows:[{c:'mom',text:'',time:'8:22 PM'},{c:'hnin',text:'c2.may.75',time:'Aug'},{c:'thura',text:'c2.may.76',time:'Aug'}]}},
 {in:'c2.may.77'},
 {in:'c2.may.78'},
 {in:'c2.may.79'},
 {in:'c2.may.80'},
 {pause:1200},
 {choice:{flag:'c2_bangs',opts:[
   {label:'c2.may.81',send:'c2.may.82',then:[{typing:1400},{in:'c2.may.83'},{in:'c2.may.84'},{in:'c2.may.85'}]},
   {label:'c2.may.86',send:'c2.may.87',then:[{in:'c2.may.88'},{in:'c2.may.89'}]},
   {label:'c2.may.90',send:'c2.may.91',then:[{in:'c2.may.92'},{in:'c2.may.93'},{out:'c2.may.94'},{in:'c2.may.95'}]}]}},
 {pause:900},
 {in:'c2.may.96'},
 {offline:'Offline'},{sys:'May Thiri is offline'},
 {pause:1600},
 // C2.5d Hnin, advice
 {time:'10:06 PM'},
 {browse:{c:'hnin',stat:'Active now',rows:[{c:'may',text:'',time:'9:51 PM'},{c:'hnin',text:'',time:'Aug'},{c:'mom',text:'',time:'8:22 PM'},{c:'thura',text:'',time:'Aug'}]}},
 {out:'c2.hnin.16'},
 {typing:900},{in:'c2.hnin.17'},{pause:900},{in:'c2.hnin.18'},
 {choice:{flag:'c2_ask_hnin',opts:[
   {label:'c2.hnin.19',send:'c2.hnin.20',then:[{in:'c2.hnin.21'},{out:'c2.hnin.22'},{in:'c2.hnin.23'}]},
   {label:'c2.hnin.24',send:'c2.hnin.25',then:[{in:'c2.hnin.26'},{out:'c2.hnin.27'},{in:'c2.hnin.28'}]},
   {label:'c2.hnin.29',send:'c2.hnin.30',then:[{in:'c2.hnin.31'}]}]}},
 {in:'c2.hnin.32'},
 pick('c2_bangs',{
   A:[{out:'c2.hnin.33'},{in:'c2.hnin.34'},{in:'c2.hnin.35'}],
   B:[{out:'c2.hnin.36'},{in:'c2.hnin.37'},{in:'c2.hnin.38'}],
   C:[{out:'c2.hnin.39'},{in:'c2.hnin.40'}]}),
 {in:'c2.hnin.41'},
 {in:'c2.hnin.42'},
 {pause:1400},
 {in:'c2.hnin.43'},
 {pause:1800},
 {in:'c2.hnin.44'},
 {choice:{flag:'c2_hnin_thanks',opts:[
   {label:'c2.hnin.45',send:'c2.hnin.46',then:[{in:'c2.hnin.47'}]},
   {label:'c2.hnin.48',send:'c2.hnin.49',then:[{in:'c2.hnin.50'},{pause:1200},{in:'c2.hnin.51'}]},
   {label:'c2.hnin.52',send:'c2.hnin.53',then:[{typing:1600},{pause:1400},{in:'c2.hnin.54'},{in:'c2.hnin.55'}]}]}},
 {pause:1200},
 // C2.5e May, the fix
 {time:'7:02 AM'},
 {browse:{c:'may',stat:'Active 9h ago',rows:[{c:'may',text:'',time:'Yesterday'},{c:'hnin',text:'',time:'Yesterday'},{c:'mom',text:'',time:'Yesterday'},{c:'thura',text:'',time:'Aug'}]}},
 {div:'c2.may.97'},
 {choice:{flag:'c2_fix',hint:'Tell her one real thing',opts:[
   {label:'c2.may.98',send:'c2.may.99',then:[{typing:2200},{pause:1500},{in:'c2.may.100'},{in:'c2.may.101'},{out:'c2.may.102'},{in:'c2.may.103'}]},
   {label:'c2.may.104',send:'c2.may.105',re:'c2.may.106',then:[{typing:1800},{in:'c2.may.107'},{in:'c2.may.108'}]},
   {label:'c2.may.109',send:'c2.may.110',then:[{in:'c2.may.111'},{in:'c2.may.112'},{in:'c2.may.113'}]}]}},
 {in:'c2.may.114'},
 {out:'c2.may.115'},
 {pause:1200},
 {in:'c2.may.116'},
 pick('c2_bangs',{
   A:[{in:'c2.may.117'}],
   B:[{in:'c2.may.118'}],
   C:[{in:'c2.may.119'}]}),
 {pause:900},
 {inPhoto:'mayBangs'},
 {in:'c2.may.120'},
 {in:'c2.may.121'},
 {choice:{flag:'c2_bangs_photo',opts:[
   {label:'c2.may.122',send:'c2.may.123',then:[{typing:1400},{in:'c2.may.124'},{in:'c2.may.125'}]},
   {label:'c2.may.126',send:'c2.may.127',then:[{in:'c2.may.128'},{pause:1200},{in:'c2.may.129'}]},
   {label:'c2.may.130',send:'c2.may.131',then:[{in:'c2.may.132'},{in:'c2.may.133'}]}]}},
 {pause:900},
 {in:'c2.may.134'},
 {pause:900},
 // C2.5f Thura, 1 AM
 {rain:1},{time:'1:12 AM'},
 {notify:{c:'thura',text:'c2.thura.18',rows:[{c:'may',text:'',time:'Thu'},{c:'hnin',text:'',time:'Wed'},{c:'mom',text:'',time:'Wed'}]}},
 {in:'c2.thura.19'},
 {in:'c2.thura.20'},
 {in:'c2.thura.21'},
 {choice:{flag:'c2_thura_love',opts:[
   {label:'c2.thura.22',send:'c2.thura.23',then:[{in:'c2.thura.24'},{out:'c2.thura.25'}]},
   {label:'c2.thura.26',send:'c2.thura.27',then:[{in:'c2.thura.28'},{in:'c2.thura.29'},{in:'c2.thura.30'}]},
   {label:'c2.thura.31',send:'c2.thura.32',then:[{in:'c2.thura.33'},{in:'c2.thura.34'}]}]}},
 {pause:1200},
 {in:'c2.thura.35'},
 {in:'c2.thura.36'},
 {in:'c2.thura.37'},
 {choice:{flag:'c2_thura_stay',opts:[
   {label:'c2.thura.38',send:'c2.thura.39',then:[{in:'c2.thura.40'},{out:'c2.thura.41'},{in:'c2.thura.42'}]},
   {label:'c2.thura.43',send:'c2.thura.44',then:[{in:'c2.thura.45'},{in:'c2.thura.46'}]},
   {label:'c2.thura.47',sticker:'sleepy',then:[{in:'c2.thura.48'}]}]}},
 {pause:900},
 // C2.6 Thadingyut
 {rain:0},{time:'7:30 PM'},
 {notify:{c:'may',text:'Photo',div:'Oct 2018',m:{k:'photo',art:'candles'},rows:[{c:'hnin',text:'c2.may.135',time:'Aug'},{c:'thura',text:'c2.may.136',time:'Aug'},{c:'mom',text:'c2.may.137',time:'Aug'}]}},
 {in:'c2.may.138'},
 {out:'c2.may.139'},
 {scene:{art:'pagoda',cap:'Thadingyut · the festival of lights',rain:0}},
 {narr:'c2.pagoda.1'},
 {shot:'pagodaLamp'},
 {narr:'c2.pagoda.2'},
 {choice:{flag:'c2_lights',opts:[
   {label:'c2.pagoda.3',say:'c2.pagoda.4',then:[{narr:'c2.pagoda.5'},{say:['May','c2.pagoda.6']}]},
   {label:'c2.pagoda.7',act:1,then:[{shot:'pagodaHands'},{narr:'c2.pagoda.8'}]},
   {label:'c2.pagoda.9',say:'c2.pagoda.10',then:[{say:['May','c2.pagoda.11']},{narr:'c2.pagoda.12'}]}]}},
 {say:['May','c2.pagoda.13']},
 {min:'c2.pagoda.14'},
 {mem:'lamp'},
 // C2.7 Late
 {time:'11:48 PM'},
 {notify:{c:'may',text:'c2.may.140',rows:[{c:'hnin',text:'c2.may.141',time:'Aug'},{c:'thura',text:'c2.may.142',time:'Aug'},{c:'mom',text:'c2.may.143',time:'Aug'}]}},
 {in:'c2.may.144'},
 {pause:1200},
 {draft:{text:'c2.may.145',flag:'c2_friends',when:'Oct 2018',
   onSend:[{typing:2600},{pause:2200},{typing:3200},{pause:2600},{typing:2400},{in:'c2.may.146'},{in:'c2.may.147'},{in:'c2.may.148'}],
   onDelete:[{out:'c2.may.149'},{in:'c2.may.150'},{in:'c2.may.151'}]}},
 {pause:1500},
 {scene:{art:'lampWall',cap:'',rain:0}},
 {narr:'c2.lamp-wall.1'},
 {title:{big:'c2.title.5',small:''}}
];

