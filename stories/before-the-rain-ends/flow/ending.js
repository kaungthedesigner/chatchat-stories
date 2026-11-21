/* ============ ENDING · STILL WAITING ============ */
const ENDING=[
 {title:{big:'<em>Ending</em>Still waiting',small:'June 2023',rain:2,time:'6:12 PM'}},
 ()=>{S.flags.courage=courage(S.flags);S.flags.ending=endOf(S.flags);return []},
 // E.1 The photo (her phone surfaced the original she cropped for her 2020 profile photo; she posts it whole for the first time)
 {memshare:{c:'may',banner:'posted a photo',head:'Post',art:'uncropped',place:'The city',likes:'Htoo, Su Su and 40 others',when:'June 2023',
   cap:"found this from 3 years ago. first rain in the city. someone else's umbrella. I never used mine",flag:'end_photo',zo:'44% 84%',
   opts:[{label:'(Zoom in on the umbrella in her hand.)',fx:'zoom',notes:['White tape on the handle. MH, faded.']},
     {label:'(Open her chat.)',chat:'Active now',notes:['The chat opens on her last message from 2021. Min scrolls up, all the way, to the first one.']},
     {label:'(Put the phone face down.)',fx:'dark',notes:['The rain on the roof is loud enough to cover it.']}],
   after:f=>['Five classmates under two umbrellas. A boy holds one over May and two others. His black umbrella, the one with the tape, is in her hand, closed.',
     f.c5_truth?"He remembers the comment about five people under two umbrellas. He thought it meant she didn't need him any more. It meant she was keeping something.":'It is the first time Min has seen the whole photo. She was carrying his umbrella the whole time.']}},
 {scrollFirst:'Active now'},
 {narr:'He stepped back to give her room. She was holding on the whole time.'},
 {mem:'uncropped'},
 // E.2 The last draft
 {scene:{art:'e2Door',cap:'',rain:2}},
 {narr:'The pink umbrella leans by the door, where it has leaned for three years.'},
 byEnd({
   unsaid:[{narr:"Min's thumb is already in the message box."},{open:{c:'may',stat:'Active now'}},{pause:900},{draft:{text:'I still have your umbrella.',auto:true,when:'Jun 2023'}},{pause:900},{narr:'He never tells her. She never knows he saw.'}],
   open:[{narr:"Min's thumb is already in the message box."},{open:{c:'may',stat:'Active now'}},{pause:900},
     {draft:{text:'I still have your umbrella.',only:'send',flag:'end_sent',when:'Jun 2023',onSend:[{pause:2200},{typing:1800},{pause:2600}]}},
     {pause:1400},{narr:'Nothing comes. Not that night, not the next morning. The chat stays on Seen.'},{mem:'seenJune'}],
   next:[{narr:"Min's thumb is already in the message box."},{open:{c:'may',stat:'Active now'}},{pause:900},
     {draft:{text:'I still have your umbrella.',only:'send',flag:'end_sent',when:'Jun 2023',onSend:[{pause:2200},{typing:1800},{pause:1200},{in:'i know'},{in:'I still have yours. I never opened it. not once in three years'},{inPhoto:'mayUmb'},{in:"I'm sorry I got so far away"}]}},
     {choice:{flag:'end_reply',opts:[
       {label:"You didn't. I stopped writing.",send:"You didn't. I stopped writing.",then:[{in:'we both did'},{in:"let's not anymore"}]},
       {label:"I'm glad you were okay.",send:"I'm glad you were okay.",then:[{in:'I was. mostly'},{in:'I missed the tea. and the boy who never talks'}]},
       {label:'Come home for Thadingyut.',send:'Come home for Thadingyut.',then:[{typing:1500},{pause:1300},{typing:1200},{in:'I want to'},{in:"I'm saving for the bus"}]}]}},
     {in:'keep the pink one dry for me'},{in:"I'll trade you back. one day"},{out:'Deal.'},{mem:'herReply'}]}),
 // E.3 The tea shop
 {scene:{art:'e3Tea',cap:'The tea shop · June 2023',rain:2}},
 {narr:'Evening. Daw Aye Aye has retired; Hnin runs the shop now. The same corner table. Rain on the shutter.'},
 {narr:"Hnin sets down a glass of tea Min didn't order."},
 {say:['Hnin','Still waiting for someone?']},
 {choice:{flag:'end_answer',opts:[{label:'Maybe.'},{label:'No.'},{label:'(Say nothing.)',act:1}]}},
 ()=>{const a=S.flags.end_answer;return ({
   unsaid:{A:[{min:'Maybe.'}],B:[{narr:'He opens his mouth to say no.'},{min:'…Maybe.'}],C:[{narr:'The silence goes on until she starts to turn away.'},{min:'Maybe.'}]},
   open:{A:[{min:'Maybe.'},{min:"I don't know any more."}],B:[{min:'No.'},{narr:'He checks his phone anyway.'},{min:"I don't know any more."}],C:[{narr:'He turns the phone face down on the table.'},{min:"I don't know any more."}]},
   next:{A:[{min:'Not waiting.'},{min:"She's coming home. One day."}],B:[{min:'No.'},{min:"She's coming home. One day."}],C:[{narr:'He turns the phone over so Hnin can see the screen.'},{min:"She's coming home. One day."}]}})[endOf(S.flags)][a]||[]},
 byEnd({
   unsaid:[{narr:"She nods. She doesn't say she has been waiting too."},{say:['Hnin',"The tea's on me. It's raining."]}],
   open:[{say:['Hnin',"The tea's on me."]},{narr:'She goes back behind the counter.'},{rain:2},{narr:'The rain gets heavier.'}],
   next:[{say:['Hnin','Good.']},{narr:"She smiles and takes his glass to refill it. She doesn't say she has been waiting too."},{say:['Hnin','Tell her the corner table is still hers.']}]}),
 {title:{big:'<em>a story told in messages</em>Before the Rain Ends',small:'',rain:2}},
 {rain:0},
 /* ============ EPILOGUE · 2024 ============ */
 {title:{big:'<em>Epilogue</em>2024',small:'Rainy season, 2024',rain:0,time:'9:40 PM'}},
 {lockEp:{date:'Sat 13 Jul',time:'9:40',from:'Ward 4 electricity',text:'Tomorrow: power 6 PM – 10 PM.'}},
 {notify:{c:'thura',text:"bro I made it. call when your power's back",stat:'Mae Sot',rows:R4({})}},
 {inLoc:{place:'Mae Sot',area:'Tak, Thailand'},myTr:{'Mae Sot':'မဲဆောက်'}},
 {choice:{flag:'ep_thura',opts:[
   {label:"I'm glad you're safe.",send:"I'm glad you're safe.",then:[{in:'you too. stay safe there'}]},
   {label:'Send me a photo.',send:'Send me a photo.',then:[{inPhoto:'thuraWall'},{in:'inspiring right 🙃'}]},
   {label:'When are you coming back?',send:'When are you coming back?',then:[{typing:1600},{pause:1400},{in:'go to sleep min'}]}]}},
 {pause:1200},
 {rain:0},{time:'5:40 PM'},
 {scene:{art:'epTown',cap:'',rain:0}},
 {narr:'Late afternoon. A generator hums by the tea shop door.'},
 {narr:'Hnin stacks the new plastic chairs at six, before dark. The sign above the shop is new, and it has her name on it.'},
 {narr:"Teacher Daw Nu's building has a faded For Rent sign."},
 {narr:"At Mom's shop, a small hand-painted sign: Min Photo."},
 byEnd({
   unsaid:[{scene:{art:'epLastUnsaid',cap:'',rain:0}},{narr:"Min stands under the shop awning with his father's old camera and the pink umbrella. He photographs the street the way it really is."},{rain:1},{narr:'The rain starts.'},{narr:'The pink umbrella stays closed in his hand, the way May never opened his.'}],
   open:[{scene:{art:'epLastOpen',cap:'',rain:0}},{narr:"Min stands under the shop awning with his father's old camera and the pink umbrella. He photographs the street the way it really is."},{rain:1},{narr:'The rain starts.'},{shot:'epOpenWalk'},{narr:'He opens the pink umbrella and walks down the street.'},{shot:'epOpenSee'},{narr:'Then he stops.'},{shot:'epOpenMeet'},{narr:'Someone is standing in the rain, a few steps ahead of him.'},{narr:'A black umbrella. White tape on the handle.'}],
   next:[{scene:{art:'epLastNext',cap:'',rain:0}},{narr:"Min stands under the shop awning with his father's old camera and the pink umbrella. He photographs the street the way it really is."},{rain:1},{narr:'The rain starts.'},{narr:"He opens the pink umbrella and walks out under it. In the studio window behind him is May's photo of his umbrella on a city windowsill."},
     {notify:{c:'may',text:'sent a photo',m:{k:'photo',art:'busTicket'},rows:R4({})}},{in:"don't tell hnin. I want to see her face"},{pause:1600}]}),
 {title:{big:'<em>Before the Rain Ends</em>The end.',small:'',rain:1}},
 {final:true}
];

