/* ============ ENDING · STILL WAITING ============ */
const ENDING=[
 {title:{big:'e.title.1',small:'e.title.2',rain:2,time:'6:12 PM'}},
 ()=>{S.flags.courage=courage(S.flags);S.flags.ending=endOf(S.flags);return []},
 // E.1 The photo (her phone surfaced the original she cropped for her 2020 profile photo; she posts it whole for the first time)
 {memshare:{c:'may',banner:'posted a photo',head:'Post',art:'uncropped',place:'The city',likes:'Htoo, Su Su and 40 others',when:'e.memshare.1',
   cap:'e.memshare.2',flag:'end_photo',zo:'44% 84%',
   opts:[{label:'e.memshare.3',fx:'zoom',notes:['e.memshare.4']},
     {label:'e.memshare.5',chat:'Active now',notes:['e.memshare.6']},
     {label:'e.memshare.7',fx:'dark',notes:['e.memshare.8']}],
   after:f=>['e.memshare.9',
     f.c5_truth?'e.memshare.10':'e.memshare.11']}},
 {scrollFirst:'Active now'},
 {narr:'e.memshare.12'},
 {mem:'uncropped'},
 // E.2 The last draft
 {scene:{art:'e2Door',cap:'',rain:2}},
 {narr:'e.e-2door.1'},
 byEnd({
   unsaid:[{narr:'e.e-2door.2'},{open:{c:'may',stat:'Active now'}},{pause:900},{draft:{text:'e.may.1',auto:true,when:'Jun 2023'}},{pause:900},{narr:'e.may.2'}],
   open:[{narr:'e.may.3'},{open:{c:'may',stat:'Active now'}},{pause:900},
     {draft:{text:'e.may.4',only:'send',flag:'end_sent',when:'Jun 2023',onSend:[{pause:2200},{typing:1800},{pause:2600}]}},
     {pause:1400},{narr:'e.may.5'},{mem:'seenJune'}],
   next:[{narr:'e.may.6'},{open:{c:'may',stat:'Active now'}},{pause:900},
     {draft:{text:'e.may.7',only:'send',flag:'end_sent',when:'Jun 2023',onSend:[{pause:2200},{typing:1800},{pause:1200},{in:'e.may.8'},{in:'e.may.9'},{inPhoto:'mayUmb'},{in:'e.may.10'}]}},
     {choice:{flag:'end_reply',opts:[
       {label:'e.may.11',send:'e.may.12',then:[{in:'e.may.13'},{in:'e.may.14'}]},
       {label:'e.may.15',send:'e.may.16',then:[{in:'e.may.17'},{in:'e.may.18'}]},
       {label:'e.may.19',send:'e.may.20',then:[{typing:1500},{pause:1300},{typing:1200},{in:'e.may.21'},{in:'e.may.22'}]}]}},
     {in:'e.may.23'},{in:'e.may.24'},{out:'e.may.25'},{mem:'herReply'}]}),
 // E.3 The tea shop
 {scene:{art:'e3Tea',cap:'The tea shop · June 2023',rain:2}},
 {narr:'e.e-3tea.1'},
 {narr:'e.e-3tea.2'},
 {say:['Hnin','e.e-3tea.3']},
 {choice:{flag:'end_answer',opts:[{label:'e.e-3tea.4'},{label:'e.e-3tea.5'},{label:'e.e-3tea.6',act:1}]}},
 ()=>{const a=S.flags.end_answer;return ({
   unsaid:{A:[{min:'e.e-3tea.7'}],B:[{narr:'e.e-3tea.8'},{min:'e.e-3tea.9'}],C:[{narr:'e.e-3tea.10'},{min:'e.e-3tea.11'}]},
   open:{A:[{min:'e.e-3tea.12'},{min:'e.e-3tea.13'}],B:[{min:'e.e-3tea.14'},{narr:'e.e-3tea.15'},{min:'e.e-3tea.16'}],C:[{narr:'e.e-3tea.17'},{min:'e.e-3tea.18'}]},
   next:{A:[{min:'e.e-3tea.19'},{min:'e.e-3tea.20'}],B:[{min:'e.e-3tea.21'},{min:'e.e-3tea.22'}],C:[{narr:'e.e-3tea.23'},{min:'e.e-3tea.24'}]}})[endOf(S.flags)][a]||[]},
 byEnd({
   unsaid:[{narr:'e.e-3tea.25'},{say:['Hnin','e.e-3tea.26']}],
   open:[{say:['Hnin','e.e-3tea.27']},{narr:'e.e-3tea.28'},{rain:2},{narr:'e.e-3tea.29'}],
   next:[{say:['Hnin','e.e-3tea.30']},{narr:'e.e-3tea.31'},{say:['Hnin','e.e-3tea.32']}]}),
 {title:{big:'e.title.3',small:'',rain:2}},
 {rain:0},
 /* ============ EPILOGUE · 2024 ============ */
 {title:{big:'e.title.4',small:'e.title.5',rain:0,time:'9:40 PM'}},
 {lockEp:{date:'Sat 13 Jul',time:'9:40',from:'e.lock.1',text:'e.lock.2'}},
 {notify:{c:'thura',text:'e.thura.1',stat:'Mae Sot',rows:R4({})}},
 {inLoc:{place:'e.thura.2',area:'e.thura.3'}},
 {choice:{flag:'ep_thura',opts:[
   {label:'e.thura.4',send:'e.thura.5',then:[{in:'e.thura.6'}]},
   {label:'e.thura.7',send:'e.thura.8',then:[{inPhoto:'thuraWall'},{in:'e.thura.9'}]},
   {label:'e.thura.10',send:'e.thura.11',then:[{typing:1600},{pause:1400},{in:'e.thura.12'}]}]}},
 {pause:1200},
 {rain:0},{time:'5:40 PM'},
 {scene:{art:'epTown',cap:'',rain:0}},
 {narr:'e.ep-town.1'},
 {narr:'e.ep-town.2'},
 {narr:'e.ep-town.3'},
 {narr:'e.ep-town.4'},
 byEnd({
   unsaid:[{scene:{art:'epLastUnsaid',cap:'',rain:0}},{narr:'e.ep-last-unsaid.1'},{rain:1},{narr:'e.ep-last-unsaid.2'},{narr:'e.ep-last-unsaid.3'}],
   open:[{scene:{art:'epLastOpen',cap:'',rain:0}},{narr:'e.ep-last-open.1'},{rain:1},{narr:'e.ep-last-open.2'},{shot:'epOpenWalk'},{narr:'e.ep-last-open.3'},{shot:'epOpenSee'},{narr:'e.ep-last-open.4'},{shot:'epOpenMeet'},{narr:'e.ep-last-open.5'},{narr:'e.ep-last-open.6'}],
   next:[{scene:{art:'epLastNext',cap:'',rain:0}},{narr:'e.ep-last-next.1'},{rain:1},{narr:'e.ep-last-next.2'},{narr:'e.ep-last-next.3'},
     {notify:{c:'may',text:'sent a photo',m:{k:'photo',art:'busTicket'},rows:R4({})}},{in:'e.may.26'},{pause:1600}]}),
 {title:{big:'e.title.6',small:'',rain:1}},
 {final:true}
];

