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
 {title:{big:'<em>Chapter 3</em>Thingyan',small:'March to December 2019',rain:0,time:'11:20 PM'}},
 // C3.1 Exam nights
 {notify:{c:'may',text:"I can't do this",div:'Mar 2019',rows:[{c:'hnin',text:"I don't. I watch the tray",time:'Oct'},{c:'thura',text:"just don't forget us when you're famous 😅",time:'Aug'},{c:'mom',text:'Daw Aye Aye talks.',time:'Jul'}]}},
 {in:'my dad keeps saying "for the family" like I\'m a business plan'},
 {choice:{flag:'c3_exam',opts:[
   {label:"You'll pass.",send:"You'll pass.",then:[{in:"you don't know that"},{out:'I know you.'},{in:"…that's so annoying. ok 😁"},{in:'call me if you can\'t sleep'},{pause:900},{call:{c:'may',dir:'out',dur:'2:14:07',open:[{in:'you actually called'},{out:'You said to.'},{in:"ok. don't hang up. just read me something"},{out:'Question 1.'}],ff:['…question 12','no YOU read it','hahaha','wait, my mom is up','…question 31','the fan is so loud','say it again'],bye:[{nar:'Somewhere past two, her answers get slower.'},{in:'min'},{in:"I can't keep my eyes open"},{pick:{flag:'c3_call_bye',opts:[{label:'Go to sleep. You know this.',say:'Go to sleep. You know this.',then:[{in:'ok'},{in:'goodnight umbrella thief'}]},{label:'You hang up first.',say:'You hang up first.',then:[{in:'no you'},{out:'You.'},{in:'…together. one, two'}]},{label:'(Stay quiet and listen.)',then:[{nar:'Her breathing slows. The rain is the only other sound.'}]}]}}],by:'me'}}]},
   {label:"I'll bring tea to your gate.",send:"I'll bring tea to your gate.",then:[{typing:1400},{pause:1600},{inPhoto:'teaGate'},{in:"I'm going to cry and it's your fault 🥹"},{in:'call me. just stay on the line'},{pause:900},{call:{c:'may',dir:'out',dur:'2:14:07',open:[{in:"I'm drinking it. it's still warm"},{out:'Good.'},{in:"stay on the line. you don't have to talk"}],ff:['…question 12','no YOU read it','hahaha','wait, my mom is up','…question 31','the fan is so loud','say it again'],bye:[{nar:'Somewhere past two, her answers get slower.'},{in:'min'},{in:"I can't keep my eyes open"},{pick:{flag:'c3_call_bye',opts:[{label:'Go to sleep. You know this.',say:'Go to sleep. You know this.',then:[{in:'ok'},{in:'goodnight umbrella thief'}]},{label:'You hang up first.',say:'You hang up first.',then:[{in:'no you'},{out:'You.'},{in:'…together. one, two'}]},{label:'(Stay quiet and listen.)',then:[{nar:'Her breathing slows. The rain is the only other sound.'}]}]}}],by:'me'}}]},
   {label:'Call me. Read me the questions.',send:'Call me. Read me the questions.',then:[{call:{c:'may',dir:'in',flag:'c3_call',dur:'2:14:07',open:[{in:'ok. question 1'},{in:"don't laugh at my pronunciation"},{out:"I won't."},{in:"you're already laughing 😤"}],ff:['…question 12','no YOU read it','hahaha','wait, my mom is up','…question 31','the fan is so loud','say it again'],bye:[{in:'question 40…'},{in:'min?'},{nar:'No answer. Only slow breathing.'},{in:'…you fell asleep on me 😴'},{in:'goodnight'}],by:'them'}},{in:'you fell asleep on question 40'},{in:'I could hear you breathing. you sound like a fan 😂'}]}]}},
 {in:"if I pass I'm buying you a new umbrella ☂️"},
 {pause:900},
 // C3.1b Exam night
 {rain:0},{time:'1:36 AM'},
 {notify:{c:'may',text:'are you awake',div:'Next night',rows:[{c:'hnin',text:'',time:'Mar'},{c:'thura',text:'',time:'Mar'},{c:'mom',text:'',time:'Mar'}]}},
 {in:'my brain is full. there is no more room 😵'},
 {in:'tell me something boring so I can sleep'},
 {choice:{flag:'c3_boring',opts:[
   {label:'Mom put the spice shelf in alphabetical order. Again.',send:'Mom put the spice shelf in alphabetical order. Again.',then:[{in:'burmese or english'},{out:'Both. On different days.'},{in:"ok that's not boring that's insane 😂"},{in:'hahaha'}]},
   {label:'Saya ate a whole samosa today. Then he slept for four hours.',send:'Saya ate a whole samosa today. Then he slept for four hours.',then:[{in:'saya is living my dream 🐶'},{in:"I want to be a dog after exams"}]},
   {label:'The fan in class turns 40 times a minute on speed one. I counted.',send:'The fan in class turns 40 times a minute on speed one. I counted.',then:[{in:'min'},{in:'MIN'},{in:"ok that worked. I'm so bored I could die 😴"}]}]}},
 {in:'goodnight. thank you for being boring'},
 {inSticker:'sleepy'},
 {pause:900},
 // C3.2 Thingyan morning · padauk
 {rain:0},{time:'6:12 AM'},
 {notify:{c:'may',text:'MIN',div:'13 Apr 2019',rows:[{c:'thura',text:'truck. 2pm. bring nothing dry',time:'Fri'}]}},
 {in:'the padauk bloomed last night 🌼'},
 {in:'the big tree on your lane'},
 {in:'the aunties will have it stripped by 8'},
 {in:"I'm not asking. I'm just saying 😇"},
 {padauk:true},
 {time:'6:31 AM'},
 {open:{c:'may'}},
 {if:{test:f=>f.c3_padauk==='full',then:[{out:'Got the best one. Had to climb the wall'},{in:'MIN'},{in:'are you hurt 😱'},{out:"Daw Khin held the wall. She says you owe her a bowl of water"},{in:'deal'}]}},
 {if:{test:f=>f.c3_padauk==='buds',then:[{out:"Got one. It's not open yet"},{in:'oh'},{in:"so it'll still be open tonight"},{in:"that's actually smart. who are you 😳"}]}},
 {if:{test:f=>f.c3_padauk==='fallen',then:[{out:'The aunties got the tree. I found one on the wall'},{in:'off the WALL'},{in:"…it's still the best one. bring it 🌼"}]}},
 {pause:900},
 // C3.2 Thingyan
 {rain:0},{time:'2:40 PM'},
 {scene:{art:'wstreet',cap:'Thingyan · 13 April 2019',rain:0}},
 {narr:'The street is a river. Music from the pandal, hoses, buckets, everyone soaked. Thura is on a pick-up truck with a hose. Hnin is under the tea shop awning with a stack of dry towels.'},
 {narr:'May is waiting at the far end of the street.'},
 {waterstreet:true},
 {scene:{art:'mayEnd',cap:'',rain:0}},
 {if:{test:f=>f.c3_wet==='dry',then:[{say:['May',"How are you dry? That's illegal on Thingyan."]},{narr:'She fixes that with one bowl of water.'}],else:[{say:['May',"You're supposed to splash me, not get splashed!"]}]}},
 {narr:'The padauk is in her hair. Still there, somehow, after all that water.'},
 {if:{test:f=>f.c3_padauk==='full',then:[{say:['May',"You climbed a wall for this. It's staying in all day."]}]}},
 {if:{test:f=>f.c3_padauk==='buds',then:[{say:['May','Look. It opened.']}]}},
 {if:{test:f=>f.c3_padauk==='fallen',then:[{say:['May','Nobody needs to know it was on a wall.']}]}},
 {shot:'crowd'},
 {narr:'A crowd pushes past the pandal. May grabs Min\'s hand so she doesn\'t lose him.'},
 {if:{test:f=>f.c2_friends===true,then:[{narr:"She doesn't let go. Under the tea shop awning, Hnin sees, and goes back to folding towels."}],else:[{shot:'crowdHold'},{narr:'Someone from her street calls her name.'},{shot:'crowdLetGo'},{narr:'She lets go, quick, like it never happened.'}]}},
 {shot:'mango'},
 {narr:'Under the mango tree, Min sets his camera on the wall and starts the self-timer.'},
 {choice:{flag:'c3_photo',opts:[
   {label:'Count to three.',say:'Count to three.',then:[{narr:'She counts to two and throws a bowl of water in his face. The shutter clicks.'}]},
   {label:"Don't look at the camera.",say:"Don't look at the camera.",then:[{narr:'She looks at him instead, and then the silver bowl comes up. The shutter clicks mid-splash.'}]},
   {label:'Say "umbrella thief".',say:'Say "umbrella thief".',then:[{narr:'She laughs too hard to say it, so she splashes him instead. The shutter clicks.'}]}]}},
 {shot:'mangoPhoto'},
 {narr:'13 April 2019 · 3:26 PM. The photo that will still be on his phone two years later.'},
 {mem:'mango'},
 {shot:'towel'},
 {narr:'Hnin hands Min a towel, not May.'},
 {say:['Hnin',"You'll get sick."]},
 {narr:'Then, a beat later, she hands May one too.'},
 // C3.2a May posts the Thingyan photo
 {time:'8:47 PM'},
 {post:{c:'may',art:'thingyan',flag:'c3_post_like',tag:f=>f.c2_friends===true,place:'Thingyan',likes:'Thura, Hnin and 14 others',when:'13 April 2019',
   cap:f=>f.c2_friends===true?'my victim. he never stood a chance':'thingyan. nobody stayed dry',
   cmts:f=>[{n:'Thura',t:'I did that. the truck did that.'},{del:'Hnin'},...(f.c2_friends===true?[{n:'Mom',t:'Min, change your shirt. You will get sick.'}]:[])],cflag:'c3_post_cmt',
   cOpts:[{label:'Worth it.',reply:[['May Thiri','it was']]},{label:"Next year I'm driving the truck.",reply:[['Thura','over my dead body']]}],
   rows:[{c:'thura',text:'',time:'2:10 PM'},{c:'hnin',text:'',time:'Mar'},{c:'mom',text:'',time:'Mar'}]}},
 {pause:600},
 // C3.2b May, the towel
 {rain:0},{time:'10:48 PM'},
 {notify:{c:'may',text:'so. the towel',rows:[{c:'thura',text:'',time:'2:10 PM'},{c:'hnin',text:'',time:'Mar'},{c:'mom',text:'',time:'Mar'}]}},
 {in:'she gave YOU the towel first'},
 {in:'I was standing RIGHT there. dripping. like a fish 🐟'},
 {choice:{flag:'c3_towel',opts:[
   {label:"She's known me since we were five.",send:"She's known me since we were five.",then:[{in:"and I've known you since june"},{in:'so she gets a thirteen year head start on towels??'}]},
   {label:'She gave you one too.',send:'She gave you one too.',then:[{in:'SECOND. she gave me one second'},{in:'I counted'}]},
   {label:'Are you jealous?',send:'Are you jealous?',then:[{in:'no'},{in:"I'm OBSERVANT 😤"},{in:'there is a difference'}]}]}},
 {pause:1400},
 {if:{test:f=>f.c2_friends===true,then:[{in:'I like hnin. I just want to be first sometimes'}],else:[{in:"I know we're not… anything"},{in:'I just want to be first sometimes'}]}},
 {choice:{flag:'c3_first',opts:[
   {label:'You found me at the end of the street. You were first today.',send:'You found me at the end of the street. You were first today.',then:[{typing:1600},{in:'…ok that was good 🥹'},{in:"I'm keeping that one"}]},
   {label:"Next Thingyan, I'll bring the towel.",send:"Next Thingyan, I'll bring the towel.",then:[{in:'a whole towel. for me'},{in:'ok. deal. a pink one 💕'}]},
   {label:"Hnin gives everyone towels. You're the one who soaked me.",send:"Hnin gives everyone towels. You're the one who soaked me.",then:[{in:'hahaha'},{in:'true. you were MY victim 😆'}]}]}},
 {if:{test:f=>f.c3_post_like===true,then:[{in:'also. you liked the photo in like four seconds'},{in:"don't think I didn't see 👀"}]}},
 {if:{test:f=>f.c3_post_like==='c',then:[{in:'also. thura screenshotted your comment'},{in:'he sent it to me. twice 😂'}]}},
 {pause:900},
 // C3.2c Hnin, the same night
 {time:'11:20 PM'},
 {notify:{c:'hnin',text:'the towel was clean, by the way',rows:[{c:'may',text:'',time:'10:52 PM'},{c:'thura',text:'',time:'2:10 PM'},{c:'mom',text:'',time:'Mar'}]}},
 {if:{test:f=>f.c2_friends===true,then:[{in:'your girlfriend looked at me like I stole her bowl'}],else:[{in:'your… friend looked at me like I stole her bowl'}]}},
 {in:'it was a towel. not a ring'},
 {choice:{flag:'c3_hnin_towel',opts:[
   {label:'She was joking.',send:'She was joking.',then:[{in:'she was not joking'},{in:'I know that look. I sell tea to aunties'}]},
   {label:'Why did you give it to me first?',send:'Why did you give it to me first?',then:[{typing:2000},{pause:1600},{typing:1400},{in:'you were closer'},{pause:1400},{in:"don't overthink it, Min Htet"}]},
   {label:'Thank you for the towel.',send:'Thank you for the towel.',then:[{in:"you're welcome"},{in:'someone has to look after you. you never look after yourself'}]}]}},
 {pause:1400},
 {in:"don't worry. I know where I stand"},
 {in:'behind the counter. same as always'},
 {choice:{flag:'c3_hnin_counter',opts:[
   {label:"That's not true.",send:"That's not true.",then:[{in:"it is. and it's fine"},{in:'goodnight'}]},
   {label:"You're my oldest friend.",send:"You're my oldest friend.",then:[{typing:1500},{in:'yes'},{in:"I know. that's the problem"},{offline:'Offline'}]},
   {label:'(Leave it.)',then:[{pause:2200},{in:'goodnight, neighbour'}]}]}},
 {pause:1200},
 {time:'11:58 PM'},
 {glance:{c:'hnin',text:'towels lent today: 40. towels returned: 6.',likes:'Daw Aye Aye and 12 others',when:'13 April 2019',
   cmts:[{n:'Thura',t:"I have two. they're mine now"},{n:'Daw Aye Aye',t:'Hnin come downstairs and count again.'}],
   rows:[{c:'may',text:'',time:'10:52 PM'},{c:'thura',text:'',time:'2:10 PM'},{c:'mom',text:'',time:'Mar'}]}},
 // C3.3 Results
 {rain:0},{time:'9:05 AM'},
 {notify:{c:'may',text:'I PASSED',div:'Jun 2019',rows:[{c:'hnin',text:"I don't. I watch the tray",time:'Apr'},{c:'thura',text:'sent a photo',time:'Apr'},{c:'mom',text:'Daw Aye Aye talks.',time:'Mar'}]}},
 {in:'I passed I passed I passed 🎉🎉'},
 {inRe:["if I pass I'm buying you a new umbrella ☂️",'so. I owe you an umbrella 😌']},
 {in:'my parents are already talking about a college in the city'},
 {in:'a good one. far'},
 {choice:{flag:'c3_leave',opts:[
   {label:'You should go. One day.',send:'You should go. One day.',then:[{in:'one day'},{in:"you say it like it's a long time"}]},
   {label:'Stay.',send:'Stay.',then:[{in:'ha'},{typing:1500},{pause:1200},{in:'they said maybe next year anyway. the business needs me here first'}]},
   {label:'What do you want?',send:'What do you want?',then:[{in:'I always wanted to leave this town'},{in:'but I wanted to CHOOSE to. not be sent'},{in:'does that make sense'},{out:'It does.'}]}]}},
 {in:'local college this year. the city is "maybe next year"'},
 {if:{test:f=>f.c3_post_like===false,then:[{pause:1200},{in:'also you never liked my thingyan photo'},{in:"two months, min. I'm counting 😤"},
   {choice:{flag:'c3_post_late',opts:[
     {label:'Liking it now.',send:'Liking it now.',then:[{in:'too late'},{in:"that's a pity like. it doesn't count 🙄"}]},
     {label:'I looked at it a lot.',send:'I looked at it a lot.',then:[{typing:1400},{in:"…that's worse"},{in:'and also better 🥹'}]}]}}]}},
 {pause:900},
 // C3.4 Thura
 {time:'10:12 PM'},
 {notify:{c:'thura',text:'she talks about the city a lot huh',rows:[{c:'may',text:'local college this year. the city is "maybe next year"',time:'9:20 AM'},{c:'hnin',text:"I don't. I watch the tray",time:'Apr'},{c:'mom',text:'Daw Aye Aye talks.',time:'Mar'}]}},
 {choice:{flag:'c3_thura',opts:[
   {label:'She talks about everything a lot.',send:'She talks about everything a lot.',then:[{in:'ha. true'}]},
   {label:"It's just college.",send:"It's just college.",then:[{in:'sure'},{in:'just saying, people go to the city and the city keeps them'}]},
   {label:'Mind your own business.',send:'Mind your own business.',then:[{in:'ok ok'},{in:"sorry bro. I'm happy for you. really 🙏"}]}]}},
 {pause:900},
 // C3.4b Mom
 {rain:1},{time:'9:30 PM'},
 {notify:{c:'mom',text:"Daw Aye Aye says May's father went to the city three times this month.",div:'Aug 2019',rows:[{c:'thura',text:'',time:'Jul'},{c:'may',text:'',time:'Jul'},{c:'hnin',text:'',time:'Apr'}]}},
 {in:'Is everything okay with her family?'},
 {choice:{flag:'c3_mom_yangon',opts:[
   {label:"It's just business.",send:"It's just business.",then:[{in:'Business is never just business.'}]},
   {label:"I don't know.",send:"I don't know.",then:[{in:'Then ask her. Gently.'}]},
   {label:'Daw Aye Aye talks too much.',send:'Daw Aye Aye talks too much.',then:[{in:'Yes.'},{in:'She is also usually right.'}]}]}},
 {in:'Bring her for dinner. I have been asking for a year.'},
 {choice:{flag:'c3_mom_dinner',opts:[
   {label:'Next week.',send:'Next week.',then:[{in:'You said that in October.'},{in:'I wrote it on the calendar. It is still there.'}]},
   {label:"She's shy.",send:"She's shy.",then:[{in:'That girl walked past the shop four times in one day. She is not shy.'}]},
   {label:'(Send the cat sticker.)',sticker:'catUmb',then:[{in:'Hiding sticker.'},{in:'Next week. I am buying the chicken.'}]}]}},
 {pause:900},
 // C3.5 Thadingyut, one year on
 {time:'7:40 PM'},
 {scene:{art:'pagoda19',cap:'Thadingyut · October 2019',rain:0}},
 {narr:'The same pagoda wall. This time May brings the matches, and holds out the lamp before she lights it.'},
 {say:['May','From the start. You promised.']},
 {choice:{flag:'c3_lamp',opts:[
   {label:'(Light it together.)',act:1,then:[{narr:'It lights first try. Neither of them says anything about it.'}]},
   {label:'(Let her light it and shield the flame.)',act:1,then:[{narr:'It lights first try. Neither of them says anything about it.'}]},
   {label:'(Take a photo of her lighting it.)',act:1,then:[{say:['May',"You're supposed to be in the memory, not taking it."]},{narr:'She pulls him into the frame.'}]}]}},
 {shot:'lamp2'},
 {mem:'lamp2'},
 // C3.5b Thura, the motorbike
 {rain:0},{time:'4:12 PM'},
 {notify:{c:'thura',text:'bro',div:'Nov 2019',rows:[{c:'may',text:'',time:'Oct'},{c:'mom',text:'',time:'Aug'},{c:'hnin',text:'',time:'Apr'}]}},
 {in:'I fixed my first bike today. alone 🔧'},
 {in:'it works'},
 {in:'it works backwards 💀'},
 {choice:{flag:'c3_thura_bike',opts:[
   {label:'How does a bike go backwards?',send:'How does a bike go backwards?',then:[{in:"I don't know bro. I'm a genius 😎"}]},
   {label:'Did the customer notice?',send:'Did the customer notice?',then:[{in:'he noticed when he reversed into the tea shop'},{in:'hnin threw a stool at me. not at him. at ME 😭'}]},
   {label:"Bring it here. I'll take a photo.",send:"Bring it here. I'll take a photo.",then:[{in:'no. evidence is how they catch you'}]}]}},
 {in:'also. big match saturday. come watch at mine'},
 {in:"I don't have the channel anymore. I watch everything on this now"},
 {inLink:'sbtv'},
 {in:'every match. highlights the next morning if I fall asleep'},
 {in:"and I'm 9 for 9 on the predictions this month. free. the coins go to the lucky draw"},
 {choice:{flag:'c3_thura_match',opts:[
   {label:"I'll come. I'll bring tea.",send:"I'll come. I'll bring tea.",then:[{in:"from hnin's shop? she'll make me pay my tab first"}]},
   {label:'What do you win?',send:'What do you win?',then:[{in:"rewards bro. if it's a bike I'm getting one that goes forwards 😂"}]}]}},
 {in:"anyway. how's may. you two still disgusting?"},
 {if:{test:f=>f.c2_friends===true,then:[{in:'disgusting means happy. I checked 😏'}],else:[{in:'or still "just friends". bro.'}]}},
 {pause:900},
 // C3.6 The phone call
 {time:'10:03 PM'},
 {notify:{c:'may',text:'Voice message',div:'Dec 2019',m:{k:'voice',text:'0:09',tr:"(Her voice, low. A man's voice through a wall, then a door.)"},rows:[{c:'thura',text:"sorry bro. I'm happy for you. really 🙏",time:'Jul'},{c:'hnin',text:"I don't. I watch the tray",time:'Apr'},{c:'mom',text:'Daw Aye Aye talks.',time:'Mar'}]}},
 {in:"sorry. my dad's on the phone with my uncle in the city. two hours now"},
 {in:"orders are slow. he says it's nothing"},
 {choice:{flag:'c3_signs',opts:[
   {label:'Are you okay?',send:'Are you okay?',then:[{in:'yeah'},{pause:1400},{in:'I think so'}]},
   {label:'Do you want to walk?',send:'Do you want to walk?',then:[{in:"it's 10pm"},{typing:1200},{in:"…meet me at the corner. bring the umbrella, it's not even raining"}]},
   {label:"It's probably nothing.",send:"It's probably nothing.",then:[{in:'yeah'},{in:'he said that too'}]}]}},
 {pause:1200},
 // C3.7 Hnin, New Year's Eve
 {time:'11:58 PM'},
 {notify:{c:'hnin',text:'happy new year, neighbour',div:'31 Dec 2019',rows:[{c:'may',text:'…',time:'Dec'},{c:'thura',text:"sorry bro. I'm happy for you. really 🙏",time:'Jul'},{c:'mom',text:'Daw Aye Aye talks.',time:'Mar'}]}},
 {in:'tell May happy new year too'},
 {choice:{flag:'c3_hnin',opts:[
   {label:'Happy new year, Hnin.',send:'Happy new year, Hnin.',then:[{inSticker:'teaCup'}]},
   {label:'You can tell her yourself.',send:'You can tell her yourself.',then:[{in:"I'd rather you did"}]},
   {label:'Are you working tonight?',send:'Are you working tonight?',then:[{in:"someone has to. the shop doesn't close for fireworks"},{in:"come by tomorrow. I'll save you the first tea of the year"}]}]}},
 {pause:1400},
 {scene:{art:'lamp2',cap:'',rain:0}},
 {narr:"The camera's last photo of 2019: the two lamps, side by side."},
 {title:{big:'<em>End of Chapter 3</em>Thingyan',small:''}}
];
