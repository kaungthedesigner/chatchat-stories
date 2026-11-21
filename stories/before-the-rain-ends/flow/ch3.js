/* ============ CHAPTER 3 · THINGYAN ============ */
SCENE.wstreet='<img src="img/c3-street.webp?v=2611161" alt="" draggable="false">';
SCENE.mayEnd='<img src="img/c3-may-end.webp?v=2611161" alt="" draggable="false">';
SCENE.crowd='<img src="img/c3-crowd.webp?v=2611161" alt="" draggable="false">';
SCENE.crowdHold='<img src="img/c3-hold.webp?v=2611161" alt="" draggable="false">';
SCENE.crowdLetGo='<img src="img/c3-letgo.webp?v=2611161" alt="" draggable="false">';
SCENE.mango='<img src="img/c3-mango.webp?v=2611161" alt="" draggable="false">';
SCENE.mangoPhoto='<div style="position:absolute;inset:0;background:#1a1f1e;display:flex;align-items:flex-start;justify-content:center;padding-top:22%"><div style="width:84%;background:#f6f1e7;padding:10px 10px 34px;border-radius:4px;box-shadow:0 10px 30px rgba(0,0,0,.4);transform:rotate(-2deg)"><img src="img/thingyan.webp?v=2611161" alt="" draggable="false" style="position:static;width:100%;height:auto;display:block;animation:none;transform:none"></div></div>';
SCENE.towel='<img src="img/c3-towel.webp?v=2611161" alt="" draggable="false">';
SCENE.pagoda19='<img src="img/c3-pagoda19.webp?v=2611161" alt="" draggable="false">';
SCENE.lamp2='<img src="img/c3-lamp2.webp?v=2611161" alt="" draggable="false">';
ART.teaGate='<img src="img/c3-tea-gate.webp?v=2611161" alt="" draggable="false">';
ART.mayBangs='<img class="tall" src="img/c2-may-bangs.webp?v=2611161" alt="May with her new bangs" draggable="false">';
ART.lamp2='<img src="img/c3-lamp2.webp?v=2611161" alt="" draggable="false" style="object-fit:cover;object-position:50% 52%">';
const CH3=[
 {title:{big:'c3.title.1',small:'c3.title.2',rain:0,time:'11:20 PM'}},
 // C3.1 Exam nights
 {notify:{c:'may',text:'c3.may.1',div:'Mar 2019',rows:[{c:'hnin',text:'c3.may.2',time:'Oct'},{c:'thura',text:'c3.may.3',time:'Aug'},{c:'mom',text:'c3.may.4',time:'Jul'}]}},
 {in:'c3.may.5'},
 {choice:{flag:'c3_exam',opts:[
   {label:'c3.may.6',send:'c3.may.7',then:[{in:'c3.may.8'},{out:'c3.may.9'},{in:'c3.may.10'},{in:'c3.may.11'},{pause:900},{call:{c:'may',dir:'out',dur:'2:14:07',open:[{in:'c3.call-may.1'},{out:'c3.call-may.2'},{in:'c3.call-may.3'},{out:'c3.call-may.4'}],ff:['c3.call-may.5','c3.call-may.6','hahaha','c3.call-may.7','c3.call-may.8','c3.call-may.9','c3.call-may.10'],bye:[{nar:'c3.call-may.11'},{in:'c3.call-may.12'},{in:'c3.call-may.13'},{pick:{flag:'c3_call_bye',opts:[{label:'c3.call-may.14',say:'c3.call-may.15',then:[{in:'ok'},{in:'c3.call-may.16'}]},{label:'c3.call-may.17',say:'c3.call-may.18',then:[{in:'c3.call-may.19'},{out:'c3.call-may.20'},{in:'c3.call-may.21'}]},{label:'c3.call-may.22',then:[{nar:'c3.call-may.23'}]}]}}],by:'me'}}]},
   {label:'c3.call-may.24',send:'c3.call-may.25',then:[{typing:1400},{pause:1600},{inPhoto:'teaGate'},{in:'c3.call-may.26'},{in:'c3.call-may.27'},{pause:900},{call:{c:'may',dir:'out',dur:'2:14:07',open:[{in:'c3.call-may.28'},{out:'c3.call-may.29'},{in:'c3.call-may.30'}],ff:['c3.call-may.31','c3.call-may.32','hahaha','c3.call-may.33','c3.call-may.34','c3.call-may.35','c3.call-may.36'],bye:[{nar:'c3.call-may.37'},{in:'c3.call-may.38'},{in:'c3.call-may.39'},{pick:{flag:'c3_call_bye',opts:[{label:'c3.call-may.40',say:'c3.call-may.41',then:[{in:'ok'},{in:'c3.call-may.42'}]},{label:'c3.call-may.43',say:'c3.call-may.44',then:[{in:'c3.call-may.45'},{out:'c3.call-may.46'},{in:'c3.call-may.47'}]},{label:'c3.call-may.48',then:[{nar:'c3.call-may.49'}]}]}}],by:'me'}}]},
   {label:'c3.call-may.50',send:'c3.call-may.51',then:[{call:{c:'may',dir:'in',flag:'c3_call',dur:'2:14:07',open:[{in:'c3.call-may.52'},{in:'c3.call-may.53'},{out:'c3.call-may.54'},{in:'c3.call-may.55'}],ff:['c3.call-may.56','c3.call-may.57','hahaha','c3.call-may.58','c3.call-may.59','c3.call-may.60','c3.call-may.61'],bye:[{in:'c3.call-may.62'},{in:'c3.call-may.63'},{nar:'c3.call-may.64'},{in:'c3.call-may.65'},{in:'goodnight'}],by:'them'}},{in:'c3.call-may.66'},{in:'c3.call-may.67'}]}]}},
 {in:'c3.call-may.68'},
 {pause:900},
 // C3.1b Exam night
 {rain:0},{time:'1:36 AM'},
 {notify:{c:'may',text:'c3.may.12',div:'c3.may.13',rows:[{c:'hnin',text:'',time:'Mar'},{c:'thura',text:'',time:'Mar'},{c:'mom',text:'',time:'Mar'}]}},
 {in:'c3.may.14'},
 {in:'c3.may.15'},
 {choice:{flag:'c3_boring',opts:[
   {label:'c3.may.16',send:'c3.may.17',then:[{in:'c3.may.18'},{out:'c3.may.19'},{in:'c3.may.20'},{in:'hahaha'}]},
   {label:'c3.may.21',send:'c3.may.22',then:[{in:'c3.may.23'},{in:'c3.may.24'}]},
   {label:'c3.may.25',send:'c3.may.26',then:[{in:'c3.may.27'},{in:'c3.may.28'},{in:'c3.may.29'}]}]}},
 {in:'c3.may.30'},
 {inSticker:'sleepy'},
 {pause:900},
 // C3.2 Thingyan morning · padauk
 {rain:0},{time:'6:12 AM'},
 {notify:{c:'may',text:'c3.may.31',div:'13 Apr 2019',rows:[{c:'thura',text:'c3.may.32',time:'Fri'}]}},
 {in:'c3.may.33'},
 {in:'c3.may.34'},
 {in:'c3.may.35'},
 {in:'c3.may.36'},
 {padauk:true},
 {time:'6:31 AM'},
 {open:{c:'may'}},
 {if:{test:f=>f.c3_padauk==='full',then:[{out:'c3.may.37'},{in:'c3.may.38'},{in:'c3.may.39'},{out:'c3.may.40'},{in:'c3.may.41'}]}},
 {if:{test:f=>f.c3_padauk==='buds',then:[{out:'c3.may.42'},{in:'c3.may.43'},{in:'c3.may.44'},{in:'c3.may.45'}]}},
 {if:{test:f=>f.c3_padauk==='fallen',then:[{out:'c3.may.46'},{in:'c3.may.47'},{in:'c3.may.48'}]}},
 {pause:900},
 // C3.2 Thingyan
 {rain:0},{time:'2:40 PM'},
 {scene:{art:'wstreet',cap:'Thingyan · 13 April 2019',rain:0}},
 {narr:'c3.wstreet.1'},
 {narr:'c3.wstreet.2'},
 {waterstreet:true},
 {scene:{art:'mayEnd',cap:'',rain:0}},
 {if:{test:f=>f.c3_wet==='dry',then:[{say:['May','c3.may-end.1']},{narr:'c3.may-end.2'}],else:[{say:['May','c3.may-end.3']}]}},
 {narr:'c3.may-end.4'},
 {if:{test:f=>f.c3_padauk==='full',then:[{say:['May','c3.may-end.5']}]}},
 {if:{test:f=>f.c3_padauk==='buds',then:[{say:['May','c3.may-end.6']}]}},
 {if:{test:f=>f.c3_padauk==='fallen',then:[{say:['May','c3.may-end.7']}]}},
 {shot:'crowd'},
 {narr:'c3.may-end.8'},
 {if:{test:f=>f.c2_friends===true,then:[{narr:'c3.may-end.9'}],else:[{shot:'crowdHold'},{narr:'c3.may-end.10'},{shot:'crowdLetGo'},{narr:'c3.may-end.11'}]}},
 {shot:'mango'},
 {narr:'c3.may-end.12'},
 {choice:{flag:'c3_photo',opts:[
   {label:'c3.may-end.13',say:'c3.may-end.14',then:[{narr:'c3.may-end.15'}]},
   {label:'c3.may-end.16',say:'c3.may-end.17',then:[{narr:'c3.may-end.18'}]},
   {label:'c3.may-end.19',say:'c3.may-end.20',then:[{narr:'c3.may-end.21'}]}]}},
 {shot:'mangoPhoto'},
 {narr:'c3.may-end.22'},
 {mem:'mango'},
 {shot:'towel'},
 {narr:'c3.may-end.23'},
 {say:['Hnin','c3.may-end.24']},
 {narr:'c3.may-end.25'},
 // C3.2a May posts the Thingyan photo
 {time:'8:47 PM'},
 {post:{c:'may',art:'thingyan',flag:'c3_post_like',tag:f=>f.c2_friends===true,place:'Thingyan',likes:'Thura, Hnin and 14 others',when:'13 April 2019',
   cap:f=>f.c2_friends===true?'c3.post.1':'c3.post.2',
   cmts:f=>[{n:'Thura',t:'c3.post.3'},{del:'Hnin'},...(f.c2_friends===true?[{n:'Mom',t:'c3.post.4'}]:[])],cflag:'c3_post_cmt',
   cOpts:[{label:'c3.post.5',reply:[['May Thiri','c3.post.6']]},{label:'c3.post.7',reply:[['Thura','c3.post.8']]}],
   rows:[{c:'thura',text:'',time:'2:10 PM'},{c:'hnin',text:'',time:'Mar'},{c:'mom',text:'',time:'Mar'}]}},
 {pause:600},
 // C3.2b May, the towel
 {rain:0},{time:'10:48 PM'},
 {notify:{c:'may',text:'c3.may.49',rows:[{c:'thura',text:'',time:'2:10 PM'},{c:'hnin',text:'',time:'Mar'},{c:'mom',text:'',time:'Mar'}]}},
 {in:'c3.may.50'},
 {in:'c3.may.51'},
 {choice:{flag:'c3_towel',opts:[
   {label:'c3.may.52',send:'c3.may.53',then:[{in:'c3.may.54'},{in:'c3.may.55'}]},
   {label:'c3.may.56',send:'c3.may.57',then:[{in:'c3.may.58'},{in:'c3.may.59'}]},
   {label:'c3.may.60',send:'c3.may.61',then:[{in:'c3.may.62'},{in:'c3.may.63'},{in:'c3.may.64'}]}]}},
 {pause:1400},
 {if:{test:f=>f.c2_friends===true,then:[{in:'c3.may.65'}],else:[{in:'c3.may.66'},{in:'c3.may.67'}]}},
 {choice:{flag:'c3_first',opts:[
   {label:'c3.may.68',send:'c3.may.69',then:[{typing:1600},{in:'c3.may.70'},{in:'c3.may.71'}]},
   {label:'c3.may.72',send:'c3.may.73',then:[{in:'c3.may.74'},{in:'c3.may.75'}]},
   {label:'c3.may.76',send:'c3.may.77',then:[{in:'hahaha'},{in:'c3.may.78'}]}]}},
 {if:{test:f=>f.c3_post_like===true,then:[{in:'c3.may.79'},{in:'c3.may.80'}]}},
 {if:{test:f=>f.c3_post_like==='c',then:[{in:'c3.may.81'},{in:'c3.may.82'}]}},
 {pause:900},
 // C3.2c Hnin, the same night
 {time:'11:20 PM'},
 {notify:{c:'hnin',text:'c3.hnin.1',rows:[{c:'may',text:'',time:'10:52 PM'},{c:'thura',text:'',time:'2:10 PM'},{c:'mom',text:'',time:'Mar'}]}},
 {if:{test:f=>f.c2_friends===true,then:[{in:'c3.hnin.2'}],else:[{in:'c3.hnin.3'}]}},
 {in:'c3.hnin.4'},
 {choice:{flag:'c3_hnin_towel',opts:[
   {label:'c3.hnin.5',send:'c3.hnin.6',then:[{in:'c3.hnin.7'},{in:'c3.hnin.8'}]},
   {label:'c3.hnin.9',send:'c3.hnin.10',then:[{typing:2000},{pause:1600},{typing:1400},{in:'c3.hnin.11'},{pause:1400},{in:'c3.hnin.12'}]},
   {label:'c3.hnin.13',send:'c3.hnin.14',then:[{in:'c3.hnin.15'},{in:'c3.hnin.16'}]}]}},
 {pause:1400},
 {in:'c3.hnin.17'},
 {in:'c3.hnin.18'},
 {choice:{flag:'c3_hnin_counter',opts:[
   {label:'c3.hnin.19',send:'c3.hnin.20',then:[{in:'c3.hnin.21'},{in:'goodnight'}]},
   {label:'c3.hnin.22',send:'c3.hnin.23',then:[{typing:1500},{in:'c3.hnin.24'},{in:'c3.hnin.25'},{offline:'Offline'}]},
   {label:'c3.hnin.26',then:[{pause:2200},{in:'c3.hnin.27'}]}]}},
 {pause:1200},
 {time:'11:58 PM'},
 {glance:{c:'hnin',text:'c3.glance.1',likes:'Daw Aye Aye and 12 others',when:'13 April 2019',
   cmts:[{n:'Thura',t:'c3.glance.2'},{n:'Daw Aye Aye',t:'c3.glance.3'}],
   rows:[{c:'may',text:'',time:'10:52 PM'},{c:'thura',text:'',time:'2:10 PM'},{c:'mom',text:'',time:'Mar'}]}},
 // C3.3 Results
 {rain:0},{time:'9:05 AM'},
 {notify:{c:'may',text:'c3.may.83',div:'Jun 2019',rows:[{c:'hnin',text:'c3.may.84',time:'Apr'},{c:'thura',text:'sent a photo',time:'Apr'},{c:'mom',text:'c3.may.85',time:'Mar'}]}},
 {in:'c3.may.86'},
 {inRe:['c3.may.87','c3.may.88']},
 {in:'c3.may.89'},
 {in:'c3.may.90'},
 {choice:{flag:'c3_leave',opts:[
   {label:'c3.may.91',send:'c3.may.92',then:[{in:'c3.may.93'},{in:'c3.may.94'}]},
   {label:'c3.may.95',send:'c3.may.96',then:[{in:'c3.may.97'},{typing:1500},{pause:1200},{in:'c3.may.98'}]},
   {label:'c3.may.99',send:'c3.may.100',then:[{in:'c3.may.101'},{in:'c3.may.102'},{in:'c3.may.103'},{out:'c3.may.104'}]}]}},
 {in:'c3.may.105'},
 {if:{test:f=>f.c3_post_like===false,then:[{pause:1200},{in:'c3.may.106'},{in:'c3.may.107'},
   {choice:{flag:'c3_post_late',opts:[
     {label:'c3.may.108',send:'c3.may.109',then:[{in:'c3.may.110'},{in:'c3.may.111'}]},
     {label:'c3.may.112',send:'c3.may.113',then:[{typing:1400},{in:'c3.may.114'},{in:'c3.may.115'}]}]}}]}},
 {pause:900},
 // C3.4 Thura
 {time:'10:12 PM'},
 {notify:{c:'thura',text:'c3.thura.1',rows:[{c:'may',text:'c3.thura.2',time:'9:20 AM'},{c:'hnin',text:'c3.thura.3',time:'Apr'},{c:'mom',text:'c3.thura.4',time:'Mar'}]}},
 {choice:{flag:'c3_thura',opts:[
   {label:'c3.thura.5',send:'c3.thura.6',then:[{in:'c3.thura.7'}]},
   {label:'c3.thura.8',send:'c3.thura.9',then:[{in:'c3.thura.10'},{in:'c3.thura.11'}]},
   {label:'c3.thura.12',send:'c3.thura.13',then:[{in:'c3.thura.14'},{in:'c3.thura.15'}]}]}},
 {pause:900},
 // C3.4b Mom
 {rain:1},{time:'9:30 PM'},
 {notify:{c:'mom',text:'c3.mom.1',div:'Aug 2019',rows:[{c:'thura',text:'',time:'Jul'},{c:'may',text:'',time:'Jul'},{c:'hnin',text:'',time:'Apr'}]}},
 {in:'c3.mom.2'},
 {choice:{flag:'c3_mom_yangon',opts:[
   {label:'c3.mom.3',send:'c3.mom.4',then:[{in:'c3.mom.5'}]},
   {label:'c3.mom.6',send:'c3.mom.7',then:[{in:'c3.mom.8'}]},
   {label:'c3.mom.9',send:'c3.mom.10',then:[{in:'c3.mom.11'},{in:'c3.mom.12'}]}]}},
 {in:'c3.mom.13'},
 {choice:{flag:'c3_mom_dinner',opts:[
   {label:'c3.mom.14',send:'c3.mom.15',then:[{in:'c3.mom.16'},{in:'c3.mom.17'}]},
   {label:'c3.mom.18',send:'c3.mom.19',then:[{in:'c3.mom.20'}]},
   {label:'c3.mom.21',sticker:'catUmb',then:[{in:'c3.mom.22'},{in:'c3.mom.23'}]}]}},
 {pause:900},
 // C3.5 Thadingyut, one year on
 {time:'7:40 PM'},
 {scene:{art:'pagoda19',cap:'Thadingyut · October 2019',rain:0}},
 {narr:'c3.pagoda-19.1'},
 {say:['May','c3.pagoda-19.2']},
 {choice:{flag:'c3_lamp',opts:[
   {label:'c3.pagoda-19.3',act:1,then:[{narr:'c3.pagoda-19.4'}]},
   {label:'c3.pagoda-19.5',act:1,then:[{narr:'c3.pagoda-19.6'}]},
   {label:'c3.pagoda-19.7',act:1,then:[{say:['May','c3.pagoda-19.8']},{narr:'c3.pagoda-19.9'}]}]}},
 {shot:'lamp2'},
 {mem:'lamp2'},
 // C3.5b Thura, the motorbike
 {rain:0},{time:'4:12 PM'},
 {notify:{c:'thura',text:'c3.thura.16',div:'Nov 2019',rows:[{c:'may',text:'',time:'Oct'},{c:'mom',text:'',time:'Aug'},{c:'hnin',text:'',time:'Apr'}]}},
 {in:'c3.thura.17'},
 {in:'c3.thura.18'},
 {in:'c3.thura.19'},
 {choice:{flag:'c3_thura_bike',opts:[
   {label:'c3.thura.20',send:'c3.thura.21',then:[{in:'c3.thura.22'}]},
   {label:'c3.thura.23',send:'c3.thura.24',then:[{in:'c3.thura.25'},{in:'c3.thura.26'}]},
   {label:'c3.thura.27',send:'c3.thura.28',then:[{in:'c3.thura.29'}]}]}},
 {in:'c3.thura.30'},
 {in:'c3.thura.31'},
 {inLink:'sbtv'},
 {in:'c3.thura.32'},
 {in:'c3.thura.33'},
 {choice:{flag:'c3_thura_match',opts:[
   {label:'c3.thura.34',send:'c3.thura.35',then:[{in:'c3.thura.36'}]},
   {label:'c3.thura.37',send:'c3.thura.38',then:[{in:'c3.thura.39'}]}]}},
 {in:'c3.thura.40'},
 {if:{test:f=>f.c2_friends===true,then:[{in:'c3.thura.41'}],else:[{in:'c3.thura.42'}]}},
 {pause:900},
 // C3.6 The phone call
 {time:'10:03 PM'},
 {notify:{c:'may',text:'Voice message',div:'Dec 2019',m:{k:'voice',text:'0:09',tr:'c3.may.116'},rows:[{c:'thura',text:'c3.may.117',time:'Jul'},{c:'hnin',text:'c3.may.118',time:'Apr'},{c:'mom',text:'c3.may.119',time:'Mar'}]}},
 {in:'c3.may.120'},
 {in:'c3.may.121'},
 {choice:{flag:'c3_signs',opts:[
   {label:'c3.may.122',send:'c3.may.123',then:[{in:'c3.may.124'},{pause:1400},{in:'c3.may.125'}]},
   {label:'c3.may.126',send:'c3.may.127',then:[{in:'c3.may.128'},{typing:1200},{in:'c3.may.129'}]},
   {label:'c3.may.130',send:'c3.may.131',then:[{in:'c3.may.132'},{in:'c3.may.133'}]}]}},
 {pause:1200},
 // C3.7 Hnin, New Year's Eve
 {time:'11:58 PM'},
 {notify:{c:'hnin',text:'c3.hnin.28',div:'31 Dec 2019',rows:[{c:'may',text:'c3.hnin.29',time:'Dec'},{c:'thura',text:'c3.hnin.30',time:'Jul'},{c:'mom',text:'c3.hnin.31',time:'Mar'}]}},
 {in:'c3.hnin.32'},
 {choice:{flag:'c3_hnin',opts:[
   {label:'c3.hnin.33',send:'c3.hnin.34',then:[{inSticker:'teaCup'}]},
   {label:'c3.hnin.35',send:'c3.hnin.36',then:[{in:'c3.hnin.37'}]},
   {label:'c3.hnin.38',send:'c3.hnin.39',then:[{in:'c3.hnin.40'},{in:'c3.hnin.41'}]}]}},
 {pause:1400},
 {scene:{art:'lamp2',cap:'',rain:0}},
 {narr:'c3.lamp-2.1'},
 {title:{big:'c3.title.3',small:''}}
];
