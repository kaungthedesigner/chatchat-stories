/* ============ CHAPTER 2 · MONSOON SEASON ============ */
SCENE.walkShare='<img src="img/c2-walk-share.webp?v=2611161" alt="" draggable="false">';
SCENE.walkDrift='<img src="img/c2-walk-drift.webp?v=2611161" alt="" draggable="false">';
SCENE.walkGate='<img src="img/c2-walk-gate.webp?v=2611161" alt="" draggable="false">';
SCENE.pagoda='<img src="img/c2-pagoda.webp?v=2611161" alt="" draggable="false">';
SCENE.pagodaLamp='<img src="img/c2-pagoda-lamp.webp?v=2611161" alt="" draggable="false">';
SCENE.pagodaHands='<img src="img/c2-pagoda-hands.webp?v=2611161" alt="" draggable="false">';
SCENE.lampWall='<img src="img/c2-lamp-wall.webp?v=2611161" alt="" draggable="false">';
const CH2=[
 {title:{big:'<em>Chapter 2</em>Monsoon Season',small:'July to October 2018',rain:2,time:'5:18 PM'}},
 // C2.1 May
 {notify:{c:'may',text:'Voice message',div:'Jul 2018',m:{k:'voice',text:'0:06',tr:"it's doing it AGAIN"},rows:[{c:'mom',text:'Is she a nice girl?',time:'Jun'},{c:'hnin',text:"I can't lend you mine every time",time:'Jun'},{c:'thura',text:'joking. go eat 😅',time:'Jun'}]}},
 {in:'I have a problem'},
 {in:"my mom took my yellow one to the market and it's pouring 😭"},
 {choice:{flag:'c2_walk',opts:[
   {label:"I'll bring two umbrellas.",send:"I'll bring two umbrellas.",then:[{in:'two?? who carries two umbrellas 😂'},{out:'Someone who has met you.'},{in:'no. bring one'},{in:"I'll hold it. I'm very helpful 😇"},{out:'…One.'}]},
   {label:'We can share one.',send:'We can share one.',then:[{typing:1600},{pause:900},{in:"ok. after class. don't be late"}]},
   {label:'Buy a new one.',send:'Buy a new one.',then:[{in:'wow'},{in:"ok then I'll just walk in the rain and get sick and it'll be your fault 😤"},{out:"…After class. I'll bring mine."}]}]}},
 {pause:900},
 // C2.2 Walk home
 {scene:{art:'walkShare',cap:'After class · dusk',rain:1}},
 {narr:'One black umbrella with white tape on the handle. Two people under it.'},
 {shot:'walkDrift'},
 {narr:'May holds the handle "to help". The umbrella drifts toward her, a little more with every step. Min\'s left shoulder is soaked.'},
 {choice:{flag:'c2_shoulder',opts:[
   {label:'(Tilt the umbrella toward her anyway.)',act:1,then:[{narr:'She notices. She moves closer, so it covers both of them.'},{say:['May',"You're so stupid."]},{narr:'She says it softly.'}]},
   {label:'(Say nothing. Keep walking.)',act:1,then:[{shot:'walkGate'},{narr:'At her gate she sees his shirt.'},{say:['May','Min! Your whole arm.']},{min:"It's fine. It dries."}]},
   {label:"You're stealing it again.",say:"You're stealing it again.",then:[{say:['May',"I'm borrowing it. With you attached."]},{narr:"She laughs, and doesn't move it back."}]}]}},
 {mem:'shoulder'},
 // Mom, that night
 {rain:1},{time:'9:12 PM'},
 {notify:{c:'mom',text:'Why is only one side of your shirt wet?',rows:[{c:'may',text:"ok. after class. don't be late",time:'4:02 PM'},{c:'hnin',text:"I can't lend you mine every time",time:'Jun'},{c:'thura',text:'joking. go eat 😅',time:'Jun'}]}},
 {choice:{flag:'c2_mom',opts:[
   {label:'The umbrella is small.',send:'The umbrella is small.',then:[{in:'The umbrella is the same size as last year.'}]},
   {label:'I walked a friend home.',send:'I walked a friend home.',then:[{in:'The same friend who sent the umbrella back with a note?'},{in:'Daw Aye Aye talks.'}]},
   {label:'(Send a sticker.)',sticker:'catUmb',then:[{in:'I know that sticker. That is your hiding sticker.'}]}]}},
 {pause:900},
 // C2.3 Thura
 {time:'10:40 PM'},
 {notify:{c:'thura',text:"football saturday. you're coming. no excuses",rows:[{c:'mom',text:'Why is only one side of your shirt wet?',time:'9:12 PM'},{c:'may',text:"ok. after class. don't be late",time:'4:02 PM'},{c:'hnin',text:"I can't lend you mine every time",time:'Jun'}]}},
 {choice:{flag:'c2_thura',opts:[
   {label:"I'll come.",send:"I'll come.",then:[{in:'finally. a normal friend 🙌'},{in:"just don't forget us when you're famous 😅"}]},
   {label:'I have class.',send:'I have class.',then:[{in:'class is at 5. football is at 3. try again ⚽'},{in:"…just don't forget us when you're famous 😅"}]},
   {label:"I'm walking someone home.",send:"I'm walking someone home.",then:[{in:'"someone"'},{in:"bro it's been one month and you're already a different person 😂"},{in:"just don't forget us when you're famous 😅"}]}]}},
 {pause:900},
 // C2.4 Photo walk
 {time:'8:03 PM'},
 {notify:{c:'may',text:'you said you take photos of how things really are',div:'Aug 2018',rows:[{c:'thura',text:"just don't forget us when you're famous 😅",time:'Sat'},{c:'mom',text:'Daw Aye Aye talks.',time:'Fri'},{c:'hnin',text:"I can't lend you mine every time",time:'Jun'}]}},
 {in:'show me. sunday'},
 {in:'I want to see what you see 📸'},
 {out:"Sunday. I'll bring yours back."},
 {in:'my DEAD umbrella?? why 😂'},
 {out:'It should see the river once.'},
 {in:"ok that's actually sweet. don't tell anyone 🥹"},
 {pause:700},
 {title:{big:'<em>Sunday</em>',small:'The rain stops for an hour. Long enough.',rain:0}},
 {photowalk:true},
 {mem:'walk'},
 {rain:0},{time:'6:20 PM'},
 {open:{c:'may'}},
 ()=>(S.walk||[]).map(w=>{const sp=SPOTS.find(x=>x.id===w.id);ART['shot_'+w.id]=shotHTML(w);return {outPhoto:'shot_'+w.id}}),
 {typing:1800},
 {if:{test:f=>f.c2_walk_framed>=3,then:[{in:"ok these are actually good. I'm annoyed 😤"}],else:[{in:"some of these are crooked and I love them 😍"}]}},
 {in:'which one is your favourite'},
 ()=>{const L={tea:["The tea shop.","ha. our tea shop. you're sentimental"],monastery:["The monks.",'the little monks!! I want to adopt them'],river:["The river.","that's my favourite too. how did you know"],market:["The market.",'it looks like a painting'],shop:["Mom's shop.","your mom's shop is so cute. I'm visiting"],dog:["Saya.",'SAYA. he is famous now']};
   const opts=(S.walk||[]).map(w=>({label:L[w.id][0],send:L[w.id][0],v:w.id,ph:'shot_'+w.id,then:[{in:L[w.id][1]}]}));
   opts.push({label:"(Send the one he didn't show her.)",v:'may',ph:'mayCandid',photo:'mayCandid',then:[{typing:1500},{pause:700},{typing:1300},{in:"you're not allowed to do that 😳"},{in:'send me the original'}]});
   return [{choice:{flag:'c2_fav_photo',hint:'Which one is his favourite?',opts}}]},
 {pause:900},
 // C2.5 Hnin
 {time:'6:41 PM'},
 {notify:{c:'hnin',text:'you forgot the tray again',rows:[{c:'may',text:'ok I picked my favourite',time:'6:22 PM'},{c:'thura',text:"just don't forget us when you're famous 😅",time:'Sat'},{c:'mom',text:'Daw Aye Aye talks.',time:'Fri'}]}},
 {in:'you were at the river all morning. the whole street saw'},
 {choice:{flag:'c2_hnin',opts:[
   {label:"Sorry. I'll come now.",send:"Sorry. I'll come now.",then:[{in:"don't run. it's raining. I'll keep it inside"}]},
   {label:'We were taking photos.',send:'We were taking photos.',then:[{in:'"we"'},{pause:1400},{in:"ok. the tray's inside"}]},
   {label:'Since when do you watch the river?',send:'Since when do you watch the river?',then:[{in:"I don't. I watch the tray"}]}]}},
 {pause:900},
 // C2.5a May posts his photo
 {time:'9:12 PM'},
 {post:{c:'may',flag:'c2_post_like',tag:false,place:'Sunday, after the rain',likes:'Thura, Hnin and 9 others',when:'August 2018',
   art:f=>f.c2_fav_photo==='may'?'mayCandid':'shot_'+(f.c2_fav_photo||((S.walk||[])[0]||{}).id),
   cap:f=>f.c2_fav_photo==='may'?"someone took this without asking. it's my favourite now":'photo by the umbrella thief. I just stood next to him',
   cmts:f=>[{n:'Thura',t:'bro since when are you an artist'},{n:'Mom',t:f.c2_fav_photo==='may'?'Is this the nice girl? Very nice.':'Very nice photo. Who took it.'},{n:'May Thiri',t:f.c2_fav_photo==='may'?'hi auntie':'your son did auntie'}],cflag:'c2_post_cmt',
   cOpts:f=>f.c2_fav_photo==='may'?[{label:'You said not to post that one.',reply:[['May Thiri','I said send me the original. this is me being nice']]},{label:"It's my favourite too.",reply:[['May Thiri','…min everyone can see this']]}]
     :[{label:'The umbrella deserves credit too.',reply:[['May Thiri','the umbrella is retired. this was its last job']]},{label:"Next time you're in one.",reply:[['May Thiri','next time we BOTH are']]}],
   rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},
 {if:{test:f=>f.c2_post_like===true,
   then:[{notify:{c:'may',text:'you liked your own photo',rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},{in:"that's the most min htet thing you've ever done 😂"},
     {choice:{flag:'c2_post_reply',opts:[{label:"It's a good photo.",send:"It's a good photo.",then:[{in:'it IS. ok you can stay humble tomorrow 😌'}]},{label:'I liked the caption.',send:'I liked the caption.',then:[{in:'…ok that one got me 🥹'}]}]}}],
   else:[]}},
 {if:{test:f=>f.c2_post_like==='c',then:[{notify:{c:'may',text:'your MOM is in my comments',rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},{in:'she wants to know if I eat curry'},
     {choice:{flag:'c2_post_reply',opts:[{label:'She does that.',send:'She does that.',then:[{in:'I like her. tell her yes 😊'}]},{label:'Sorry.',send:'Sorry.',then:[{in:"don't be. she's funny. I'm keeping her"}]}]}}]}},
 {if:{test:f=>f.c2_post_like===false,then:[{notify:{c:'may',text:"it's YOUR photo",rows:[{c:'hnin',text:'',time:'6:41 PM'},{c:'thura',text:'',time:'Sat'},{c:'mom',text:'',time:'Fri'}]}},{in:"and you didn't even like it"},{in:'thura liked it. THURA 😤'},
     {choice:{flag:'c2_post_reply',opts:[{label:'I was looking at it.',send:'I was looking at it.',then:[{in:'look AND like. two steps. you can do it 🙄'}]},{label:'Liking it now.',send:'Liking it now.',then:[{in:'thank you. the photographer has been located 📸'}]}]}}]}},
 {pause:900},
 // C2.5b Mom learns stickers
 {rain:1},{time:'8:15 PM'},
 {notify:{c:'mom',text:'How do I send the moving cat.',div:'Sep 2018',rows:[{c:'hnin',text:"I don't. I watch the tray",time:'Aug'},{c:'may',text:'ok I picked my favourite',time:'Aug'},{c:'thura',text:"just don't forget us when you're famous 😅",time:'Aug'}]}},
 {in:'Daw Aye Aye sends me a moving cat every morning. I want to send one back.'},
 {choice:{flag:'c2_mom_stk',opts:[
   {label:'Tap the smiley face, then the cat.',send:'Tap the smiley face, then the cat.',then:[{inSticker:'laugh'},{in:'This is not a cat.'},{in:'Why is this man laughing.'},{out:'Press the one next to it.'},{in:'Too late. I sent the laughing man to the monastery donation group.'},{in:'Sayadaw replied.'}]},
   {label:"I'll do it for you tomorrow.",send:"I'll do it for you tomorrow.",then:[{in:'Tomorrow you will be out with your camera friend.'},{in:'I know how tomorrow works.'}]},
   {label:'(Send her the cat sticker.)',sticker:'catUmb',then:[{in:'Yes. This one.'},{in:'How do I keep it.'},{out:'Press and hold.'},{in:'I pressed. Now the cat is on my phone forever.'},{in:'Good.',myTr:{'Good.':'ဂွတ်'}}]}]}},
 {in:'Also. Daw Aye Aye says the girl with the yellow umbrella walked past the shop three times on Thursday.'},
 {in:'Three times.'},
 {choice:{flag:'c2_mom_yellow',opts:[
   {label:'Maybe she likes samosas.',send:'Maybe she likes samosas.',then:[{in:'Then she can come in and buy one like a normal person.'}]},
   {label:'Mom.',send:'Mom.',then:[{in:'I am only reporting.'}]},
   {label:'It was four times.',send:'It was four times.',then:[{typing:1400},{in:'Daw Aye Aye missed one?'},{in:'She will be very upset.'}]}]}},
 {in:'Bring her for dinner one day. Not now. One day.'},
 {in:'I will make the good curry, not the Tuesday curry.'},
 {pause:900},
 {time:'8:31 PM'},
 {glance:{c:'mom',text:'Testing. Is this posted.',likes:'Daw Aye Aye and 7 others',when:'September 2018',
   cmts:[{n:'Daw Aye Aye',t:'It is posted.'},{n:'Mom',t:'Thank you Daw Aye Aye.'},{n:'Thura',t:'welcome to the internet auntie'},{n:'Mom',t:'Thura go home.'}],
   rows:[{c:'hnin',text:'',time:'Aug'},{c:'may',text:'',time:'Aug'},{c:'thura',text:'',time:'Aug'}]}},
 // C2.5c May, the bangs
 {time:'9:47 PM'},
 {notify:{c:'may',text:'ok be honest',rows:[{c:'mom',text:'',time:'8:22 PM'},{c:'hnin',text:"I don't. I watch the tray",time:'Aug'},{c:'thura',text:"just don't forget us when you're famous 😅",time:'Aug'}]}},
 {in:'I cut my own bangs'},
 {in:'with the KITCHEN scissors ✂️'},
 {in:"my mom says I look like a mushroom. don't laugh 🍄"},
 {in:'you will see tomorrow. prepare yourself 😬'},
 {pause:1200},
 {choice:{flag:'c2_bangs',opts:[
   {label:'Okay.',send:'Okay.',then:[{typing:1400},{in:'okay?'},{in:'OKAY?? 😤'},{in:'I tell you I attacked my own face with kitchen scissors and you say okay like I told you the bus is late'}]},
   {label:"I'm sure it's fine.",send:"I'm sure it's fine.",then:[{in:'"fine"'},{in:"fine is what my dad says about soup he doesn't like"}]},
   {label:'Send a photo.',send:'Send a photo.',then:[{in:'NO'},{in:'you will see it tomorrow like everyone else and act normal'},{out:'I always act normal.'},{in:'yes. about EVERYTHING. that is the problem'}]}]}},
 {pause:900},
 {in:'goodnight 👍'},
 {offline:'Offline'},{sys:'May Thiri is offline'},
 {pause:1600},
 // C2.5d Hnin, advice
 {time:'10:06 PM'},
 {browse:{c:'hnin',stat:'Active now',rows:[{c:'may',text:'',time:'9:51 PM'},{c:'hnin',text:'',time:'Aug'},{c:'mom',text:'',time:'8:22 PM'},{c:'thura',text:'',time:'Aug'}]}},
 {out:'Hnin. Question.'},
 {typing:900},{in:'no'},{pause:900},{in:'…what'},
 {choice:{flag:'c2_ask_hnin',opts:[
   {label:'How do you know if a girl is angry?',send:'How do you know if a girl is angry?',then:[{in:'she starts sending a thumbs up'},{out:'She just said "goodnight" with a thumbs up.'},{in:'oh you are dead'}]},
   {label:'If a girl says goodnight, is it fine?',send:'If a girl says goodnight, is it fine?',then:[{in:'depends. was there a thumbs up'},{out:'Yes.'},{in:'then no. it is not fine'}]},
   {label:'What do girls want when they are angry?',send:'What do girls want when they are angry?',then:[{in:'to not be asked what girls want'}]}]}},
 {in:'what did you say to her'},
 pick('c2_bangs',{
   A:[{out:'She cut her bangs. I said okay.'},{in:'min htet.'},{in:'she told you something about her face and you said OKAY'}],
   B:[{out:"She cut her bangs. I said I'm sure it's fine."},{in:'"fine"'},{in:"you said fine. you're like a broken fan"}],
   C:[{out:'She cut her bangs. I asked for a photo.'},{in:'you asked for evidence. like a policeman'}]}),
 {in:"listen. don't say sorry first. she knows you're sorry. you're always sorry"},
 {in:'tell her one thing you actually noticed. not okay. not fine. one real thing'},
 {pause:1400},
 {in:"that's all anyone wants. to be noticed"},
 {pause:1800},
 {in:"that's what I read, anyway"},
 {choice:{flag:'c2_hnin_thanks',opts:[
   {label:'Thank you, Hnin.',send:'Thank you, Hnin.',then:[{in:"don't thank me. you'll forget the tray again tomorrow"}]},
   {label:'How do you know all this?',send:'How do you know all this?',then:[{in:'I work at a tea shop. everyone tells me everything'},{pause:1200},{in:'nobody asks what I think though'}]},
   {label:'You cut your hair too.',send:'You cut your hair too.',then:[{typing:1600},{pause:1400},{in:'two weeks ago'},{in:'go fix your thing, Min Htet'}]}]}},
 {pause:1200},
 // C2.5e May, the fix
 {time:'7:02 AM'},
 {browse:{c:'may',stat:'Active 9h ago',rows:[{c:'may',text:'',time:'Yesterday'},{c:'hnin',text:'',time:'Yesterday'},{c:'mom',text:'',time:'Yesterday'},{c:'thura',text:'',time:'Aug'}]}},
 {div:'Next morning'},
 {choice:{flag:'c2_fix',hint:'Tell her one real thing',opts:[
   {label:"You tuck your hair behind your left ear when you're thinking. Now you can't. That's all I'll notice.",send:"You tuck your hair behind your left ear when you're thinking. Now you can't. That's all I'll notice.",then:[{typing:2200},{pause:1500},{in:'…'},{in:'how do you know which ear'},{out:'I sit behind you.'},{in:"ok I'm still mad but less 😤"}]},
   {label:'You said "prepare yourself". You only say that when you\'re nervous. You don\'t need to be.',send:'You said "prepare yourself". You only say that when you\'re nervous. You don\'t need to be.',re:'you will see tomorrow. prepare yourself 😬',then:[{typing:1800},{in:'stop being nice at 7am'},{in:"it's illegal 🚨"}]},
   {label:"I'm sorry. I'm bad at talking about faces.",send:"I'm sorry. I'm bad at talking about faces.",then:[{in:'FACES??'},{in:'hahahahaha 😂'},{in:'ok that was so bad it fixed it'}]}]}},
 {in:'you owe me tea. two. and you hold the umbrella for a WEEK ☔'},
 {out:'Deal.'},
 {pause:1200},
 {in:'also my mom says it suits me. so'},
 pick('c2_bangs',{
   A:[{in:"ok. ONE photo. so tomorrow you don't just say okay 📸"}],
   B:[{in:"ok. ONE photo. so tomorrow you don't say fine 📸"}],
   C:[{in:'fine. ONE photo. evidence for the policeman 📸'}]}),
 {pause:900},
 {inPhoto:'mayBangs'},
 {in:"don't zoom 🙈"},
 {in:'the scissors are still there. they know what they did ✂️'},
 {choice:{flag:'c2_bangs_photo',opts:[
   {label:'It really does suit you.',send:'It really does suit you.',then:[{typing:1400},{in:"you're only saying that because you owe me tea"},{in:'…but ok 🥹'}]},
   {label:'A very cute mushroom.',send:'A very cute mushroom.',then:[{in:'MIN HTET'},{pause:1200},{in:'…the cute part can stay 🍄'}]},
   {label:'Keep the scissors away from me tomorrow.',send:'Keep the scissors away from me tomorrow.',then:[{in:'hahahaha'},{in:"no promises. you're next ✂️"}]}]}},
 {pause:900},
 {in:'see you in class 👋'},
 {pause:900},
 // C2.5f Thura, 1 AM
 {rain:1},{time:'1:12 AM'},
 {notify:{c:'thura',text:'bro are you awake',rows:[{c:'may',text:'',time:'Thu'},{c:'hnin',text:'',time:'Wed'},{c:'mom',text:'',time:'Wed'}]}},
 {in:"I think I'm in love 😍"},
 {in:'the girl at the phone shop gave me a free screen protector'},
 {in:'FREE bro 🔥'},
 {choice:{flag:'c2_thura_love',opts:[
   {label:'She gives everyone one.',send:'She gives everyone one.',then:[{in:'she gave it to me with her HANDS 😭'},{out:"That's how screen protectors work."}]},
   {label:'Did you talk to her?',send:'Did you talk to her?',then:[{in:'I said thank you'},{in:'and then I said thank you again. by accident'},{in:"I'm never going back. I'll buy a new phone in another town 💀"}]},
   {label:'Go to sleep, Thura.',send:'Go to sleep, Thura.',then:[{in:"says the man who's online at 1am"},{in:'who are YOU talking to 👀'}]}]}},
 {pause:1200},
 {in:"seriously though. everyone's leaving this town"},
 {in:'my cousin went to malaysia. ko zaw went to the city'},
 {in:"it's gonna be just you, me and the phone shop girl"},
 {choice:{flag:'c2_thura_stay',opts:[
   {label:"I'm not going anywhere.",send:"I'm not going anywhere.",then:[{in:'good. promise'},{out:'Go to sleep.'},{in:"that's not a promise but ok"}]},
   {label:'You could go too.',send:'You could go too.',then:[{in:'and leave my mom alone with the motorbike shop? nah'},{in:'someone has to stay and remember everyone'}]},
   {label:'(Send the sleepy sticker.)',sticker:'sleepy',then:[{in:"ok ok. goodnight. don't tell anyone I'm soft 😅"}]}]}},
 {pause:900},
 // C2.6 Thadingyut
 {rain:0},{time:'7:30 PM'},
 {notify:{c:'may',text:'Photo',div:'Oct 2018',m:{k:'photo',art:'candles'},rows:[{c:'hnin',text:"I don't. I watch the tray",time:'Aug'},{c:'thura',text:"just don't forget us when you're famous 😅",time:'Aug'},{c:'mom',text:'Daw Aye Aye talks.',time:'Aug'}]}},
 {in:'the pagoda is so pretty tonight. are you coming or are you going to send me a photo of a dog 🐶'},
 {out:'Coming.'},
 {scene:{art:'pagoda',cap:'Thadingyut · the festival of lights',rain:0}},
 {narr:'The pagoda platform at night, hundreds of small clay lamps. At the foot of the steps, Hnin is at her aunt\'s stall, selling tea to the crowd.'},
 {shot:'pagodaLamp'},
 {narr:'May is trying to light one in the wind. It keeps going out.'},
 {choice:{flag:'c2_lights',opts:[
   {label:'Let me.',say:'Let me.',then:[{narr:'He lights it first try.'},{say:['May','Show-off.']}]},
   {label:'(Shield the flame with your hands.)',act:1,then:[{shot:'pagodaHands'},{narr:'It takes. Neither of them moves their hands for a second too long.'}]},
   {label:"You're bad at fire.",say:"You're bad at fire.",then:[{say:['May',"I'm bad at wind."]},{narr:'It lights. She points at him like she won.'}]}]}},
 {say:['May',"Next year, let's light one together. From the start. Promise?"]},
 {min:'I promise.'},
 {mem:'lamp'},
 // C2.7 Late
 {time:'11:48 PM'},
 {notify:{c:'may',text:'min',rows:[{c:'hnin',text:"I don't. I watch the tray",time:'Aug'},{c:'thura',text:"just don't forget us when you're famous 😅",time:'Aug'},{c:'mom',text:'Daw Aye Aye talks.',time:'Aug'}]}},
 {in:'what are we'},
 {pause:1200},
 {draft:{text:"I don't want to be only friends.",flag:'c2_friends',when:'Oct 2018',
   onSend:[{typing:2600},{pause:2200},{typing:3200},{pause:2600},{typing:2400},{in:'ok good'},{in:'me neither'},{in:'goodnight before I die of embarrassment 🙈'}],
   onDelete:[{out:'Friends who share umbrellas.'},{in:"that's not a thing"},{in:"…ok it's a thing now ☂️"}]}},
 {pause:1500},
 {scene:{art:'lampWall',cap:'',rain:0}},
 {narr:'On the pagoda wall, long after everyone has gone home, one small lamp is still burning.'},
 {title:{big:'<em>End of Chapter 2</em>Monsoon Season',small:''}}
];

