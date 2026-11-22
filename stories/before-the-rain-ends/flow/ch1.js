const ch1Rows=()=>[{c:'thura',text:'c1.start.1',time:'Sun'},{c:'mom',text:'c1.start.2',time:'Sun'}];

const pick=(flag,map)=>()=>map[S.flags[flag]]||map.A||Object.values(map)[0]||[];

const CH1=[
{title:{big:'<em>Chapter 1</em>The First Rain',small:'Two and a half years earlier · June 2018',rain:0,time:'4:05 PM'}},
 {reset:()=>({may:[],mom:[{k:'div',text:'Sunday'},{k:'text',dir:'in',text:'c1.start.3'},{k:'text',dir:'out',text:'c1.start.4'}],thura:[{k:'div',text:'Sunday'},{k:'text',dir:'in',text:'c1.start.5'}],hnin:[]})},
 {rain:0},{time:'4:05 PM'},
 // C1.1 Mom
 {notify:{c:'mom',text:'c1.mom.1',rows:ch1Rows(),stat:'Active now'}},
 {in:'c1.mom.2'},
 {choice:{flag:'c1_mom',opts:[
   {label:'c1.mom.3',send:'c1.mom.4',then:[{in:'c1.mom.5'}]},
   {label:'c1.mom.6',send:'c1.mom.7',then:[{in:'c1.mom.8'},{in:'c1.mom.9'}]},
   {label:'c1.mom.10',send:'c1.mom.11',then:[{in:'c1.mom.12'},{in:'c1.mom.13'}]}]}},
 // C1.2 Tea shop
 {scene:{art:'teashop1',cap:'Shwe Pyi Tea Shop · June 2018',rain:3}},
 {narr:'c1.teashop-1.1'},
 {shot:'teashopWait'},
 {narr:'c1.teashop-1.2'},
 {shot:'teashop2'},
 {narr:'c1.teashop-1.3'},
 {shot:'teashopCounter'},
 {say:['Daw Aye Aye','c1.teashop-1.4']},
 {shot:'teashopHnin'},
 {narr:'c1.teashop-1.5'},
 {shot:'teashop3'},
 {narr:'c1.teashop-1.6'},
 {shot:'teashopWhat'},
 {say:['The girl','c1.teashop-1.7']},
 {choice:{flag:'c1_first_words',hint:'Say',opts:[
   {label:'c1.teashop-1.8',say:'c1.teashop-1.9',then:[{shot:'teashopLaugh'},{narr:'c1.teashop-1.10'},{say:['The girl','c1.teashop-1.11']}]},
   {label:'c1.teashop-1.12',say:'c1.teashop-1.13',then:[{shot:'teashopLaugh'},{narr:'c1.teashop-1.14'},{say:['The girl','c1.teashop-1.15']}]},
   {label:'c1.teashop-1.16',say:'c1.teashop-1.17',then:[{say:['The girl','c1.teashop-1.18']},{min:'c1.teashop-1.19'}]}]}},
 pick('c1_first_words',{
   A:[{narr:'c1.teashop-1.20'}],
   B:[{narr:'c1.teashop-1.21'}],
   C:[{narr:'c1.teashop-1.22'}]}),
 {narr:'c1.teashop-1.23'},
 {choice:{flag:'c1_kindness',hint:'Do',opts:[
   {label:'c1.teashop-1.24',act:1,v:'samosa',then:[{shot:'teashopSamosa'},{say:['The girl','c1.teashop-1.25']},{min:'c1.teashop-1.26'},{narr:'c1.teashop-1.27'},{say:['The girl','c1.teashop-1.28']}]},
   {label:'c1.teashop-1.29',act:1,v:'tea',then:[{shot:'teashopTea'},{min:'c1.teashop-1.30'},{say:['The girl','c1.teashop-1.31']},{min:'c1.teashop-1.32'},{say:['The girl','c1.teashop-1.33']},{min:'c1.teashop-1.34'}]},
   {label:'c1.teashop-1.35',act:1,v:'seeds',then:[{narr:'c1.teashop-1.36'},{shot:'teashopSeeds'},{narr:'c1.teashop-1.37'},{say:['The girl','c1.teashop-1.38']}]}]}},
 {shot:'teashopPhone'},
 {narr:'c1.teashop-1.39'},
 {shot:'teashopCall'},
 pick('c1_kindness',{
   samosa:[{say:['The girl','c1.teashop-1.40']}],
   tea:[{say:['The girl','c1.teashop-1.41']}],
   seeds:[{say:['The girl','c1.teashop-1.42']}]}),
 {rain:2},
 {shot:'teashop5'},
 {narr:'c1.teashop-1.43'},
 {narr:'c1.teashop-1.44'},
 {shot:'teashop1'},
 pick('c1_kindness',{
   samosa:[{say:['Daw Aye Aye','c1.teashop-1.45']}],
   tea:[{say:['Daw Aye Aye','c1.teashop-1.46']}],
   seeds:[{say:['Daw Aye Aye','c1.teashop-1.47']}]}),
 {choice:{flag:'c1_umbrella',hint:'Say',opts:[
   {label:'c1.teashop-1.48',say:'c1.teashop-1.49',then:[{say:['Daw Aye Aye','c1.teashop-1.50']},{narr:'c1.teashop-1.51'}]},
   {label:'c1.teashop-1.52',say:'c1.teashop-1.53',then:[{say:['Daw Aye Aye','c1.teashop-1.54']},{min:'c1.teashop-1.55'}]},
   {label:'c1.teashop-1.56',act:1,then:[{say:['Daw Aye Aye','c1.teashop-1.57']},{min:'c1.teashop-1.58'}]}]}},
 pick('c1_umbrella',{
   A:[{shot:'walkArm'},{narr:'c1.teashop-1.59'}],
   B:[{shot:'walkHome'},{narr:'c1.teashop-1.60'}],
   C:[{shot:'walkHome'},{narr:'c1.teashop-1.61'}]}),
 {mem:'broken'},{pause:1200},
 // C1.2b Hnin posts the table
 {rain:1},{time:'9:24 PM'},
 {post:{c:'hnin',art:'teaTable',flag:'c1_post_like',tag:false,place:'Shwe Pyi Tea Shop',likes:'Daw Aye Aye and 4 others',when:'June 2018',
   cap:'c1.post.1',
   cmts:[{n:'Daw Aye Aye',t:'c1.post.2'},{n:'Hnin',t:'c1.post.3'}],cflag:'c1_post_cmt',
   cOpts:[{label:'c1.post.4',reply:[['Hnin','c1.post.5']]},{label:'c1.post.6',reply:[['Hnin','c1.post.7']]}],
   rows:[{c:'mom',text:'c1.post.8',time:'9:10 PM'},...ch1Rows().slice(0,1)]}},
 {pause:600},
 // C1.3 First message
 {rain:1},{time:'10:31 PM'},
 {friend:{rows:[{c:'mom',text:'c1.may.1',time:'9:10 PM'},...ch1Rows().slice(0,1)]}},
 {falseStart:true},
 {in:'c1.may.2'},
 {in:'c1.may.3'},
 {choice:{flag:'c1_first_msg',opts:[
   {label:'c1.may.4',send:'c1.may.5',then:[{in:'c1.may.6'},{out:'c1.may.7'}]},
   {label:'c1.may.8',send:'c1.may.9',then:[{in:'c1.may.10'},{in:'c1.may.11'},{out:'c1.may.12'}]},
   {label:'c1.may.13',send:'c1.may.14',then:[{in:'c1.may.15'},{in:'c1.may.16'},{in:'c1.may.17'}]}]}},
 {inPhoto:'umbrellaBed'},
 pick('c1_first_msg',{
   A:[{in:'c1.may.18'},{in:'c1.may.19'}],
   B:[{in:'c1.may.20'},{in:'c1.may.21'}],
   C:[{in:'c1.may.22'}]}),
 {mem:'wrong'},
 pick('c1_first_msg',{A:[{in:'c1.may.23'}],B:[{in:'c1.may.24'}],C:[{in:'c1.may.25'},{in:'c1.may.26'}]}),
 {out:'c1.may.27'},
 pick('c1_first_msg',{
   A:[{in:'c1.may.28'},{in:'c1.may.29'}],
   B:[{in:'c1.may.30'},{in:'c1.may.31'}],
   C:[{in:'c1.may.32'},{in:'c1.may.33'}]}),
 {in:'c1.may.34'},
 {in:'c1.may.35'},
 {choice:{flag:'c1_class_q',opts:[
   {label:'c1.may.36',send:'c1.may.37',then:[{in:'c1.may.38'},{out:'c1.may.39'},{in:'c1.may.40'},{out:'c1.may.41'}]},
   {label:'c1.may.42',send:'c1.may.43',then:[{in:'c1.may.44'},{out:'c1.may.45'},{in:'c1.may.46'}]},
   {label:'c1.may.47',send:'c1.may.48',then:[{in:'c1.may.49'},{out:'c1.may.50'},{in:'c1.may.51'},{out:'c1.may.52'}]}]}},
 pick('c1_class_q',{
   A:[{in:'c1.may.53'},{in:'c1.may.54'}],
   B:[{in:'c1.may.55'},{in:'c1.may.56'}],
   C:[{in:'c1.may.57'},{in:'c1.may.58'}]}),
 {out:'c1.may.59'},
 pick('c1_class_q',{A:[{in:'c1.may.60'}],B:[{in:'c1.may.61'}],C:[{in:'c1.may.62'}]}),
 {pause:2400},
 {draft:{text:'c1.may.63',flag:'c1_told_kept',when:'Jun 2018',
   onSend:[{in:'c1.may.64'},{in:'c1.may.65'},{out:'c1.may.66'},{typing:1600},{pause:600},{in:'c1.may.67'}]}},
 pick('c1_told_kept',{
   true:[{in:'c1.may.68'}],
   false:[{pause:900},{in:'c1.may.69'},{in:'c1.may.70'}]}),
 {choice:{flag:'c1_goodnight',opts:[
   {label:'c1.may.71',send:'c1.may.72',then:[{in:'c1.may.73'},{offline:'Offline'},{sys:'May Thiri is offline'}]},
   {label:'c1.may.74',send:'c1.may.75',then:[{inSticker:'sleepy'}]},
   {label:'c1.may.76',sticker:'catUmb',act:1,then:[{in:'c1.may.77'},{in:'c1.may.78'},{out:'c1.may.79'},{in:'c1.may.80'}]}]}},
 {pause:1200},
 // C1.3b Hnin, next morning
 {rain:0},{time:'7:05 AM'},
 {notify:{c:'hnin',text:'c1.hnin.1',rows:[{c:'may',text:'c1.hnin.2',time:'12:58 AM'},{c:'mom',text:'c1.hnin.3',time:'Sun'},{c:'thura',text:'c1.hnin.4',time:'Sun'}]}},
 {in:'c1.hnin.5'},
 {in:'c1.hnin.6'},
 {choice:{flag:'c1_hnin_am',opts:[
   {label:'c1.hnin.7',send:'c1.hnin.8',then:[{in:'c1.hnin.9'},{out:'c1.hnin.10'},{in:'c1.hnin.11'},{out:'c1.hnin.12'},{in:'c1.hnin.13'}]},
   {label:'c1.hnin.14',send:'c1.hnin.15',then:[{in:'c1.hnin.16'},{in:'c1.hnin.17'}]},
   {label:'c1.hnin.18',send:'c1.hnin.19',then:[{in:'c1.hnin.20'},{in:'c1.hnin.21'}]}]}},
 {in:'c1.hnin.22'},
 {in:'c1.hnin.23'},
 {out:'c1.hnin.24'},
 {in:'c1.hnin.25'},
 {in:'c1.hnin.26'},
 {out:'c1.hnin.27'},
 {inRe:['c1.hnin.28','c1.hnin.29']},
 {inSticker:'teaCup'},
 {pause:900},
 {a2hs:1},
 // C1.4 Class
 {scene:{art:'classroom1',cap:"Teacher Daw Nu's English class · the next evening",rain:0}},
 {narr:'c1.classroom-1.1'},
 {shot:'classroom2'},
 {narr:'c1.classroom-1.2'},
 {shot:'classroom3'},
 {narr:'c1.classroom-1.3'},
 {shot:'classroomTeacher'},
 {say:['Teacher Daw Nu','c1.classroom-1.4']},
 {shot:'classroomMay'},
 pick('c1_goodnight',{
   A:[{say:['May','c1.classroom-1.5']}],
   B:[{say:['May','c1.classroom-1.6']}],
   C:[{say:['May','c1.classroom-1.7']},{narr:'c1.classroom-1.8'}]}),
 {choice:{flag:'c1_return',hint:'Say, quietly',opts:[
   {label:'c1.classroom-1.9',say:'c1.classroom-1.10',then:[{shot:'classroom4'},{narr:'c1.classroom-1.11'},{say:['May','c1.classroom-1.12']}]},
   {label:'c1.classroom-1.13',say:'c1.classroom-1.14',then:[{shot:'classroom5'},{say:['May','c1.classroom-1.15']}]},
   {label:'c1.classroom-1.16',act:1,then:[{shot:'classroom4'},{say:['May','c1.classroom-1.17']},{min:'c1.classroom-1.18'},{narr:'c1.classroom-1.19'},{say:['May','c1.classroom-1.20']},{narr:'c1.classroom-1.21'}]}]}},
 {mem:'note'},{pause:1000},
 // C1.5 Thura
 {rain:0},{time:'6:40 PM'},
 {glance:{c:'thura',mention:'minhtet',text:'c1.glance.1',likes:'Hnin and 3 others',when:'June 2018',
   cmts:[{n:'Hnin',t:'c1.glance.2'},{n:'Thura',t:'c1.glance.3'}],
   rows:[{c:'may',text:'c1.glance.4',time:'Mon'},{c:'mom',text:'c1.glance.5',time:'Mon'}]}},
 {time:'6:52 PM'},
 {notify:{c:'thura',text:'c1.thura.1',rows:[{c:'may',text:'c1.thura.2',time:'Mon'},{c:'mom',text:'c1.thura.3',time:'Mon'}]}},
 {in:'c1.thura.4'},
 pick('c1_return',{
   A:[{in:'c1.thura.5'}],
   B:[{in:'c1.thura.6'}],
   C:[{in:'c1.thura.7'}]}),
 {choice:{flag:'c1_thura',opts:[
   {label:'c1.thura.8',send:'c1.thura.9',then:[{in:'c1.thura.10'}]},
   {label:'c1.thura.11',send:'c1.thura.12',then:[{in:'c1.thura.13'},{out:'c1.thura.14'},{in:'c1.thura.15'}]},
   {label:'c1.thura.16',send:'c1.thura.17',then:[{in:'c1.thura.18'},{in:'c1.thura.19'}]}]}},
 pick('c1_thura',{
   A:[{in:'c1.thura.20'},{pause:1500},{in:'c1.thura.21'}],
   B:[{in:'c1.thura.22'},{pause:1500},{in:'c1.thura.23'}],
   C:[{in:'c1.thura.24'},{pause:1500},{in:'c1.thura.25'}]}),
 {pause:900},
 // C1.5b Hnin
 {time:'7:15 PM'},
 {notify:{c:'hnin',text:'c1.hnin.30',rows:[{c:'thura',text:'c1.hnin.31',time:'6:54 PM'},{c:'may',text:'c1.hnin.32',time:'Mon'},{c:'mom',text:'c1.hnin.33',time:'Mon'}],stat:'Active now'}},
 {in:'c1.hnin.34'},
 {in:'c1.hnin.35'},
 {choice:{flag:'c1_hnin',opts:[
   {label:'c1.hnin.36',send:'c1.hnin.37',then:[{in:'c1.hnin.38'}]},
   {label:'c1.hnin.39',send:'c1.hnin.40',then:[{in:'c1.hnin.41'},{pause:1400},{in:'c1.hnin.42'}]},
   {label:'c1.hnin.43',send:'c1.hnin.44',then:[{in:'c1.hnin.45'}]}]}},
 {if:{test:f=>f.c1_post_like===true,then:[{in:'c1.hnin.46'},{in:'c1.hnin.47'},{pause:1200},{in:'c1.hnin.48'}]}},
 {if:{test:f=>f.c1_post_like==='c',then:[{in:'c1.hnin.49'},{in:'c1.hnin.50'},{in:'c1.hnin.51'},{in:'c1.hnin.52'},{in:'c1.hnin.53'}]}},
 {if:{test:f=>f.c1_post_like===false,then:[{in:'c1.hnin.54'},{in:'c1.hnin.55'}]}},
 pick('c1_hnin',{
   A:[{in:'c1.hnin.56'},{in:'c1.hnin.57'}],
   B:[{pause:1200},{in:'c1.hnin.58'},{in:'c1.hnin.59'}],
   C:[{in:'c1.hnin.60'},{in:'c1.hnin.61'}]}),
 {pause:900},
 // C1.6 Mom
 {time:'8:40 PM'},
 ()=>{const k=S.flags.c1_kindness;const first=k==='samosa'?'c1.hnin.62':k==='tea'?'c1.hnin.63':'c1.hnin.64';
   return [{notify:{c:'mom',text:first,rows:[{c:'hnin',text:'c1.mom.14',time:'7:16 PM'},{c:'thura',text:'c1.mom.15',time:'6:54 PM'},{c:'may',text:'c1.mom.16',time:'Mon'}]}}]},
 {in:'c1.mom.17'},
 {choice:{flag:'c1_mom2',opts:[
   {label:'c1.mom.18',send:'c1.mom.19',then:[{in:'c1.mom.20'},{in:'c1.mom.21'}]},
   {label:'c1.mom.22',send:'c1.mom.23',then:[{in:'c1.mom.24'}]},
   {label:'c1.mom.25',send:'c1.mom.26',then:[{inSticker:'laugh'},{in:'c1.mom.27'}]}]}},
 {pause:900},
 // C1.7 May
 {scene:{art:'roomEmpty',cap:"Min's room · 11 PM",rain:1}},
 {narr:'c1.room-empty.1'},
 {rain:1},{time:'11:02 PM'},
 {notify:{c:'may',text:'c1.may.81',rows:[{c:'mom',text:'c1.may.82',time:'8:41 PM'},{c:'hnin',text:'c1.may.83',time:'7:16 PM'},{c:'thura',text:'c1.may.84',time:'6:54 PM'}]}},
 pick('c1_return',{
   A:[{in:'c1.may.85'},{in:'c1.may.86'}],
   B:[{in:'c1.may.87'},{in:'c1.may.88'}],
   C:[{in:'c1.may.89'},{in:'c1.may.90'}]}),
 {choice:{flag:'c1_photo_sent',hint:'Send a photo from your gallery',opts:[
   {label:'c1.may.91',ph:'teaTable',photo:'teaTable',v:'table',then:[{mem:'table'},{in:'c1.may.92'},{out:'c1.may.93'},{in:'c1.may.94'},{in:'c1.may.95'},{out:'c1.may.96'},{in:'c1.may.97'}]},
   {label:'c1.may.98',ph:'pinkUmbrella',photo:'pinkUmbrella',v:'umbrella',then:[{mem:'pink'},{in:'c1.may.99'},{if:{test:f=>f.c1_told_kept===false&&f.c1_return!=='C',then:[{in:'c1.may.100'}]}},{in:'c1.may.101'},{out:'c1.may.102'}]},
   {label:'c1.may.103',ph:'dog',photo:'dog',v:'dog',then:[{mem:'saya'},{in:'c1.may.104'},{out:'c1.may.105'},{in:'c1.may.106'},{out:'c1.may.107'}]}]}},
 pick('c1_photo_sent',{
   table:[{in:'c1.may.108'},{in:'c1.may.109'}],
   umbrella:[{in:'c1.may.110'},{in:'c1.may.111'},{in:'c1.may.112'}]  ,
   dog:[{in:'c1.may.113'},{in:'c1.may.114'}]}),
 {choice:{flag:'c1_why_photos',opts:[
   {label:'c1.may.115',send:'c1.may.116',then:[{in:'c1.may.117'},{pause:1200},{in:'c1.may.118'}]},
   {label:'c1.may.119',send:'c1.may.120',then:[{in:'c1.may.121'},{in:'c1.may.122'}]},
   {label:'c1.may.123',send:'c1.may.124',then:[{in:'c1.may.125'},{out:'c1.may.126'},{in:'c1.may.127'},{out:'c1.may.128'}]}]}},
 pick('c1_why_photos',{
   A:[{in:'c1.may.129'}],
   B:[{in:'c1.may.130'}],
   C:[{pause:1400},{in:'c1.may.131'},{in:'c1.may.132'}]}),
 {out:'c1.may.133'},
 pick('c1_why_photos',{A:[{in:'c1.may.134'}],B:[{in:'c1.may.135'}],C:[{in:'c1.may.136'}]}),
 {choice:{flag:'c1_tomorrow',opts:[
   {label:'c1.may.137',send:'c1.may.138',then:[{in:'c1.may.139'}]},
   {label:'c1.may.140',send:'c1.may.141',then:[{in:'c1.may.142'},{out:'c1.may.143'}]},
   {label:'c1.may.144',send:'c1.may.145',then:[{in:'c1.may.146'}]}]}},
 {inPhoto:'yellowUmbrella'},
 pick('c1_tomorrow',{
   A:[{in:'c1.may.147'}],
   B:[{in:'c1.may.148'}],
   C:[{in:'c1.may.149'}]}),
 {mem:'yellow'},
 {pause:2000},
 {draft:{text:'c1.may.150',flag:'c1_wouldnt_mind',when:'Jun 2018',
   onSend:[{typing:1500},{pause:1100},{typing:1700},{in:'c1.may.151'}],
   onDelete:[{out:'c1.may.152'},{in:'c1.may.153'}]}},
 {pause:1600},
 // close
 {scene:{art:'bedroom',cap:'',rain:1}},
 pick('c1_wouldnt_mind',{
   true:[{narr:'c1.bedroom.1'}],
   false:[{narr:'c1.bedroom.2'}]}),
 {shot:'roomUmbrellas'},
 {narr:'c1.bedroom.3'},
 {title:{big:'c1.title.1',small:''}}
];


