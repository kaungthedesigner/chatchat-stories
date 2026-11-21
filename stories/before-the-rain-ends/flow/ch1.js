const ch1Rows=()=>[{c:'thura',text:'football sat?',time:'Sun'},{c:'mom',text:'Did you eat?',time:'Sun'}];

const pick=(flag,map)=>()=>map[S.flags[flag]]||map.A||Object.values(map)[0]||[];

const CH1=[
 {reset:()=>({may:[],mom:[{k:'div',text:'Sunday'},{k:'text',dir:'in',text:'Did you eat?'},{k:'text',dir:'out',text:'Yes, Mom.'}],thura:[{k:'div',text:'Sunday'},{k:'text',dir:'in',text:'football sat?'}],hnin:[]})},
 {rain:0},{time:'4:05 PM'},
 // C1.1 Mom
 {notify:{c:'mom',text:'Min, take the samosas to Daw Aye Aye at the tea shop. She ordered 30.',rows:ch1Rows(),stat:'Active now'}},
 {in:'Take the umbrella. The sky is dark.'},
 {choice:{flag:'c1_mom',opts:[
   {label:'Okay, Mom.',send:'Okay, Mom.',then:[{in:'Good boy. I put two extra in the bag for you.'}]},
   {label:'The sky is always dark in June.',send:'The sky is always dark in June.',then:[{in:'Then you should always take it.'},{in:'There are two extra samosas. Those are yours, not Daw Aye Aye\'s.'}]},
   {label:"I'm already going.",send:"I'm already going.",then:[{in:'You are not. Daw Aye Aye just called me.'},{in:'Go now. And eat the two extra ones I packed.'}]}]}},
 // C1.2 Tea shop
 {scene:{art:'teashop1',cap:'Shwe Pyi Tea Shop · June 2018',rain:3}},
 {narr:'Min drops off the samosas. Then the rain comes, all at once.'},
 {shot:'teashopWait'},
 {narr:'He sits at the corner table by the window. His black umbrella leans on the chair: white tape on the handle, MH in his father\'s handwriting.'},
 {shot:'teashop2'},
 {narr:'A girl runs in, soaked, holding a pink umbrella with bent spokes. Every table is full except his.'},
 {shot:'teashopCounter'},
 {say:['Daw Aye Aye','Sit, sit, girl. Share with Min. He doesn\'t bite. He doesn\'t even talk.']},
 {shot:'teashopHnin'},
 {narr:'Behind the counter, Hnin, Daw Aye Aye\'s niece and Min\'s neighbour since they were kids, stops wiping a glass.'},
 {shot:'teashop3'},
 {narr:'The girl sits on the edge of the other chair. She sees him looking at her umbrella, and frowns.'},
 {shot:'teashopWhat'},
 {say:['The girl','What? Never seen a broken umbrella before?']},
 {choice:{flag:'c1_first_words',hint:'Say',opts:[
   {label:"I've seen one. Just not one that looks worse than the rain.",say:"I've seen one. Just not one that looks worse than the rain.",then:[{shot:'teashopLaugh'},{narr:'She laughs, loud and surprised.'},{say:['The girl','Wow. Okay. Rude.']}]},
   {label:'…It fought well.',say:'…It fought well.',then:[{shot:'teashopLaugh'},{narr:'She stares at him. Then she laughs.'},{say:['The girl','It did. It died for me.']}]},
   {label:'Do you want some tea?',say:'Do you want some tea?',then:[{say:['The girl','Is that a real question or are you being polite?']},{min:'Both.'}]}]}},
 pick('c1_first_words',{
   A:[{narr:'She wrings out her sleeve, still smiling, as if deciding whether to forgive him. She\'s shivering.'}],
   B:[{narr:'She props the dead umbrella against his chair like it deserves a rest. She\'s shivering.'}],
   C:[{narr:'She pulls her wet bag onto her lap and looks out at the rain instead of at him. She\'s shivering.'}]}),
 {narr:'Min still has the paper bag with Mom\'s two extra samosas.'},
 {choice:{flag:'c1_kindness',hint:'Do',opts:[
   {label:'Push the samosas toward her.',act:1,v:'samosa',then:[{shot:'teashopSamosa'},{say:['The girl','Are these yours?']},{min:'My mother\'s. She makes them.'},{narr:'She is already eating one.'},{say:['The girl','Tell your mother she\'s my favourite person now.']}]},
   {label:'Order her a sweet tea.',act:1,v:'tea',then:[{shot:'teashopTea'},{min:'One more cho seint, please.'},{say:['The girl','I can pay.']},{min:'It\'s raining. Nobody pays when it\'s raining.'},{say:['The girl','That\'s not a rule.']},{min:'It is here.'}]},
   {label:'Say nothing. Watch the rain.',act:1,v:'seeds',then:[{narr:'Rain. A long quiet.'},{shot:'teashopSeeds'},{narr:'Then she slides a packet of sunflower seeds across the table.'},{say:['The girl','You looked lonely. Don\'t tell anyone I\'m nice.']}]}]}},
 {shot:'teashopPhone'},
 {narr:'Her phone buzzes. A crack runs across the screen.'},
 {shot:'teashopCall'},
 pick('c1_kindness',{
   samosa:[{say:['The girl','Coming, Ma! … Thank your mother for me. Really.']}],
   tea:[{say:['The girl','Coming, Ma! … Next tea is mine. That\'s a rule too.']}],
   seeds:[{say:['The girl','Coming, Ma! … Keep the seeds. You need them more.']}]}),
 {rain:2},
 {shot:'teashop5'},
 {narr:'The rain eases. She grabs the black umbrella by the door and runs out into the street.'},
 {narr:'Her broken pink one is still on Min\'s table.'},
 {shot:'teashop1'},
 pick('c1_kindness',{
   samosa:[{say:['Daw Aye Aye','She ate your samosas and took your umbrella. Good day for her.']}],
   tea:[{say:['Daw Aye Aye','You buy a girl tea, she takes your umbrella. That\'s how it goes.']}],
   seeds:[{say:['Daw Aye Aye','Seeds for an umbrella. Fair trade, Min?']}]}),
 {choice:{flag:'c1_umbrella',hint:'Say',opts:[
   {label:"It's fine. It's just an umbrella.",say:"It's fine. It's just an umbrella.",then:[{say:['Daw Aye Aye','Your father\'s handwriting is on that umbrella, and it\'s "just an umbrella"?']},{narr:'Min doesn\'t answer.'}]},
   {label:"She'll bring it back.",say:"She'll bring it back.",then:[{say:['Daw Aye Aye','You don\'t even know her name.']},{min:'Then she\'ll have to tell me.'}]},
   {label:'Pick up the pink umbrella.',act:1,then:[{say:['Daw Aye Aye','You want that? It\'s rubbish.']},{min:'It\'s still good for a photo.'}]}]}},
 pick('c1_umbrella',{
   A:[{shot:'walkArm'},{narr:'Min walks home in the rain with the pink umbrella under his arm, thinking about the tape on the other one.'}],
   B:[{shot:'walkHome'},{narr:'Min walks home in the rain holding the pink umbrella. It keeps none of the rain off. He doesn\'t mind.'}],
   C:[{shot:'walkHome'},{narr:'Min walks home holding the pink umbrella open over his head, out of stubbornness. It keeps none of the rain off.'}]}),
 {mem:'broken'},{pause:1200},
 // C1.2b Hnin posts the table
 {rain:1},{time:'9:24 PM'},
 {post:{c:'hnin',art:'teaTable',flag:'c1_post_like',tag:false,place:'Shwe Pyi Tea Shop',likes:'Daw Aye Aye and 4 others',when:'June 2018',
   cap:'rain all day. two customers. one table. three hours. two teas.',
   cmts:[{n:'Daw Aye Aye',t:'Hnin, wipe the table.'},{n:'Hnin',t:'I did.'}],cflag:'c1_post_cmt',
   cOpts:[{label:'The tea was good.',reply:[['Hnin',"it's the same tea as always"]]},{label:'One of them took the wrong umbrella.',reply:[['Hnin','I know. I was there']]}],
   rows:[{c:'mom',text:'Okay. Sleep early.',time:'9:10 PM'},...ch1Rows().slice(0,1)]}},
 {pause:600},
 // C1.3 First message
 {rain:1},{time:'10:31 PM'},
 {friend:{rows:[{c:'mom',text:'Okay. Sleep early.',time:'9:10 PM'},...ch1Rows().slice(0,1)]}},
 {falseStart:true},
 {in:'hey 👋'},
 {in:'I think you took my umbrella 👀'},
 {choice:{flag:'c1_first_msg',opts:[
   {label:"I'm pretty sure you have mine.",send:"I'm pretty sure you have mine.",then:[{in:'prove it 😤'},{out:'It has MH on the handle.'}]},
   {label:'You mean the umbrella that lost to the rain?',send:'You mean the umbrella that lost to the rain?',then:[{in:'excuse me it was a GOOD umbrella 😤'},{in:'it had a hard life 🥲'},{out:'You have mine.'}]},
   {label:'How did you find me?',send:'How did you find me?',then:[{in:'daw aye aye'},{in:'I went back for my umbrella and she told me your name, your mom\'s name, your mom\'s shop and that you have "a good heart but no mouth"'},{in:'so. hi 👋'}]}]}},
 {inPhoto:'umbrellaBed'},
 pick('c1_first_msg',{
   A:[{in:'…oh'},{in:'ok you win. it has a name tag like a schoolboy'}],
   B:[{in:'ok fine. it IS yours'},{in:'but mine was braver. yours has a name tag like a schoolboy'}],
   C:[{in:'anyway. I have this. and it has a name tag like a schoolboy'}]}),
 {mem:'wrong'},
 pick('c1_first_msg',{A:[{in:"so what's MH 🤔"}],B:[{in:"what's MH. mister helpful? 😏"}],C:[{in:"MH. let me guess"},{in:"no I can't guess 😅"}]}),
 {out:'Min Htet.'},
 pick('c1_first_msg',{
   A:[{in:'Min Htet. sounds very serious'},{in:"I'm May. May Thiri. not serious at all 😝"}],
   B:[{in:'Min Htet. ok that suits you'},{in:"I'm May Thiri. friends say May 😊"}],
   C:[{in:'Min Htet. I knew the first part already. daw aye aye'},{in:"I'm May, by the way. May Thiri ✌️"}]}),
 {in:'wait'},
 {in:"are you the boy in teacher daw nu's class who sits at the back by the fan?? 😮"},
 {choice:{flag:'c1_class_q',opts:[
   {label:'Yes.',send:'Yes.',then:[{in:'you never talk'},{out:'I talk.'},{in:"you're talking now 😆"},{out:'This is typing.'}]},
   {label:'The fan is the best seat.',send:'The fan is the best seat.',then:[{in:'hahaha it is. best place to sleep'},{out:"I don't sleep in class."},{in:'you slept on tuesday. I saw 😴'}]},
   {label:'You noticed?',send:'You noticed?',then:[{in:"everyone noticed. you're the only one who brings a camera to english class"},{out:"It's on the way."},{in:'on the way to what 🙄'},{out:'Everything.'}]}]}},
 pick('c1_class_q',{
   A:[{in:"ok quiet boy. I'll bring your umbrella tomorrow before class"},{in:"don't tell anyone I stole it. I have a reputation 😌"}],
   B:[{in:"anyway sleepy boy. umbrella tomorrow, before class"},{in:"and don't tell anyone I stole it. I have a reputation 😌"}],
   C:[{in:"…ok that was a good answer. I'll bring your umbrella tomorrow"},{in:"please don't tell anyone I stole it. I have a reputation 😌"}]}),
 {out:'What reputation?'},
 pick('c1_class_q',{A:[{in:"I don't know yet. I'm building one"}],B:[{in:"don't know yet. still building it"}],C:[{in:"working on it. it's going to be a good one ✨"}]}),
 {pause:2400},
 {draft:{text:"Your umbrella is still here. It's broken, but I kept it.",flag:'c1_told_kept',when:'Jun 2018',
   onSend:[{in:'wait you KEPT it?? 😳'},{in:'why'},{out:'It looked like it tried hard.'},{typing:1600},{pause:600},{in:"that's the weirdest nice thing anyone has said to me 🥹"}]}},
 pick('c1_told_kept',{
   true:[{in:'goodnight umbrella thief. and umbrella keeper 🌂'}],
   false:[{pause:900},{in:'ok I should sleep 😴'},{in:'goodnight umbrella thief'}]}),
 {choice:{flag:'c1_goodnight',opts:[
   {label:"You're the thief.",send:"You're the thief.",then:[{in:'details 😛'},{offline:'Offline'},{sys:'May Thiri is offline'}]},
   {label:'Goodnight, May. 🌙',send:'Goodnight, May. 🌙',then:[{inSticker:'sleepy'}]},
   {label:'Send a sticker',sticker:'catUmb',act:1,then:[{in:"STOP that's so cute 😭💕"},{in:'where did you get that'},{out:'It came free with the app. 🙂'},{in:'liar 😒'}]}]}},
 {pause:1200},
 // C1.3b Hnin, next morning
 {rain:0},{time:'7:05 AM'},
 {notify:{c:'hnin',text:'your light was on until 1am',rows:[{c:'may',text:'goodnight umbrella thief',time:'12:58 AM'},{c:'mom',text:'Okay. Sleep early.',time:'Sun'},{c:'thura',text:'football sat?',time:'Sun'}]}},
 {in:'I could see it from our kitchen'},
 {in:'were you studying? you never study'},
 {choice:{flag:'c1_hnin_am',opts:[
   {label:'I was reading.',send:'I was reading.',then:[{in:'reading what'},{out:'Messages.'},{in:'from who'},{out:'Nobody.'},{in:'nobody types for two hours, Min Htet'}]},
   {label:'Why are you awake at 7?',send:'Why are you awake at 7?',then:[{in:'the shop opens at 6'},{in:'some of us have jobs. you have a camera and a seat by the fan'}]},
   {label:'Were you watching my window?',send:'Were you watching my window?',then:[{in:'I was boiling water'},{in:'your window is in the way. move your house'}]}]}},
 {in:'anyway. your mom says the samosas were too salty yesterday'},
 {in:'she is blaming the new oil. it was not the oil'},
 {out:'What was it?'},
 {in:'she was on the phone with my aunt the whole time she was frying'},
 {in:"don't tell her I said that"},
 {out:"I'm telling her."},
 {inRe:['your light was on until 1am',"then I'm telling her about your light"]},
 {inSticker:'teaCup'},
 {pause:900},
 {a2hs:1},
 // C1.4 Class
 {scene:{art:'classroom1',cap:"Teacher Daw Nu's English class · the next evening",rain:0}},
 {narr:'A ceiling fan. Fifteen students. The lesson is the present perfect.'},
 {shot:'classroom2'},
 {narr:'May walks to the back of the room and puts the black umbrella on Min\'s desk. The whole class turns around.'},
 {shot:'classroom3'},
 {narr:'A strip of paper is taped to the handle, under MH: “Sorry. Thank you. Your umbrella is better than mine. — the thief”'},
 {shot:'classroomTeacher'},
 {say:['Teacher Daw Nu','Ma May Thiri, are you returning property or making a proposal?']},
 {shot:'classroomMay'},
 pick('c1_goodnight',{
   A:[{say:['May','Returning stolen property, Teacher! He says I\'m the thief.']}],
   B:[{say:['May','Returning property, Teacher!']}],
   C:[{say:['May','Returning property, Teacher. Nothing else.']},{narr:'She glances at Min and nearly laughs.'}]}),
 {choice:{flag:'c1_return',hint:'Say, quietly',opts:[
   {label:'…Thank you.',say:'…Thank you.',then:[{shot:'classroom4'},{narr:'She turns to him, grinning.'},{say:['May','You can talk!']}]},
   {label:'You can keep it.',say:'You can keep it.',then:[{shot:'classroom5'},{say:['May','No. Then I\'d have to remember you every time it rains.']}]},
   {label:'Give back her broken pink umbrella.',act:1,then:[{shot:'classroom4'},{say:['May','You brought it?? It\'s dead, Min.']},{min:'It should go home to its family.'},{narr:'She laughs so hard that Teacher Daw Nu tells her off.'},{say:['May','Keep it. It likes you more than me.']},{narr:'He takes it home again.'}]}]}},
 {mem:'note'},{pause:1000},
 // C1.5 Thura
 {rain:0},{time:'6:40 PM'},
 {glance:{c:'thura',mention:'minhtet',text:'football saturday. losers buy the tea.',likes:'Hnin and 3 others',when:'June 2018',
   cmts:[{n:'Hnin',t:'losers also wash the glasses'},{n:'Thura',t:'then I will win. obviously'}],
   rows:[{c:'may',text:'goodnight umbrella thief',time:'Mon'},{c:'mom',text:'Okay. Sleep early.',time:'Mon'}]}},
 {time:'6:52 PM'},
 {notify:{c:'thura',text:'bro',rows:[{c:'may',text:'goodnight umbrella thief',time:'Mon'},{c:'mom',text:'Okay. Sleep early.',time:'Mon'}]}},
 {in:'BRO'},
 pick('c1_return',{
   A:[{in:'who was that. the whole class is talking. daw nu said PROPOSAL 🤣'}],
   B:[{in:'who was that. daw nu said PROPOSAL and you said keep it?? 😂'}],
   C:[{in:'who was that. you gave her a DEAD umbrella. in front of daw nu 💀'}]}),
 {choice:{flag:'c1_thura',opts:[
   {label:'She took my umbrella by mistake.',send:'She took my umbrella by mistake.',then:[{in:'"by mistake" ok ok ok 😏'}]},
   {label:'Nobody.',send:'Nobody.',myTr:{'Nobody.':'ဘယ်သူမှ မဟုတ်ပါဘူးကွာ'},then:[{in:"nobody doesn't write you notes"},{out:'It says sorry.'},{in:"that's how it starts 😏"}]},
   {label:'Her name is May.',send:'Her name is May.',then:[{in:'you know her NAME'},{in:'who are you and what did you do with min 😳'}]}]}},
 pick('c1_thura',{
   A:[{in:"careful though. girls like that don't stay in this town"},{pause:1500},{in:'joking. go eat 😅'}],
   B:[{in:"just saying. girls like that don't stay in this town"},{pause:1500},{in:'joking. mostly. go eat 😅'}],
   C:[{in:"be careful bro. girls like that don't stay in this town"},{pause:1500},{in:'…joking. I\'m happy for you. go eat 😅'}]}),
 {pause:900},
 // C1.5b Hnin
 {time:'7:15 PM'},
 {notify:{c:'hnin',text:"your mom's tray is still at the shop from yesterday",rows:[{c:'thura',text:'joking. go eat 😅',time:'6:54 PM'},{c:'may',text:'goodnight umbrella thief',time:'Mon'},{c:'mom',text:'Okay. Sleep early.',time:'Mon'}],stat:'Active now'}},
 {in:"I'll bring it to your house tomorrow morning"},
 {in:'also. yesterday that girl took your umbrella and you just watched her go 😑'},
 {choice:{flag:'c1_hnin',opts:[
   {label:'It was a mistake.',send:'It was a mistake.',then:[{in:'hm. some mistakes are on purpose'}]},
   {label:'She brought it back today.',send:'She brought it back today.',then:[{in:"oh. that's good"},{pause:1400},{in:"she's pretty"}]},
   {label:'You saw that?',send:'You saw that?',then:[{in:"I see everything from behind the counter. that's my whole job"}]}]}},
 {if:{test:f=>f.c1_post_like===true,then:[{in:'also. you liked my post'},{in:"you've never liked one of my posts"},{pause:1200},{in:'so that table means something. noted'}]}},
 {if:{test:f=>f.c1_post_like==='c',then:[{in:'also. you commented on my post'},{in:'in public. where Daw Aye Aye can see'},{in:"she's already asking me questions"},{in:'"it\'s the same tea every day. what was different yesterday"'},{in:'"does his mother know"'}]}},
 {if:{test:f=>f.c1_post_like===false,then:[{in:'also. Daw Aye Aye liked my post before you did'},{in:"she doesn't know how her phone works"}]}},
 pick('c1_hnin',{
   A:[{in:'anyway. take your own umbrella next time'},{in:'not everyone has a spare to lend you'}],
   B:[{pause:1200},{in:'anyway'},{in:'next time it rains, not everyone will have a spare to lend you'}],
   C:[{in:'so take your own umbrella next time, Min Htet'},{in:"I can't lend you mine every time"}]}),
 {pause:900},
 // C1.6 Mom
 {time:'8:40 PM'},
 ()=>{const k=S.flags.c1_kindness;const first=k==='samosa'?'Daw Aye Aye says a girl ate my samosas yesterday.':k==='tea'?'Daw Aye Aye says you bought a girl tea yesterday.':'Daw Aye Aye says a girl gave you seeds yesterday and you gave her nothing.';
   return [{notify:{c:'mom',text:first,rows:[{c:'hnin',text:"I can't lend you mine every time",time:'7:16 PM'},{c:'thura',text:'joking. go eat 😅',time:'6:54 PM'},{c:'may',text:'goodnight umbrella thief',time:'Mon'}]}}]},
 {in:'Is she a nice girl?'},
 {choice:{flag:'c1_mom2',opts:[
   {label:"She's just a classmate.",send:"She's just a classmate.",then:[{in:'Okay.'},{in:'Take your own umbrella tomorrow.'}]},
   {label:'She laughs a lot.',send:'She laughs a lot.',then:[{in:'Good. This house is too quiet.'}]},
   {label:'Mom, please.',send:'Mom, please.',then:[{inSticker:'laugh'},{in:'I am only asking.'}]}]}},
 {pause:900},
 // C1.7 May
 {scene:{art:'roomEmpty',cap:"Min's room · 11 PM",rain:1}},
 {narr:'Home. The rain has started again. The pink umbrella has its own corner now.'},
 {rain:1},{time:'11:02 PM'},
 {notify:{c:'may',text:'ok I have a question',rows:[{c:'mom',text:'Is she a nice girl?',time:'8:41 PM'},{c:'hnin',text:"I can't lend you mine every time",time:'7:16 PM'},{c:'thura',text:'joking. go eat 😅',time:'6:54 PM'}]}},
 pick('c1_return',{
   A:[{in:'daw aye aye says you take photos of "strange things"'},{in:'show me one strange thing 📸'}],
   B:[{in:'since you wanted to give away your umbrella so easily'},{in:'daw aye aye says you take photos of "strange things". show me one 📸',myTr:{'daw aye aye says you take photos of "strange things". show me one 📸':'ဒေါ်အေးအေးကပြောတာ နင်က ထူးဆန်းတာတွေ လျှောက်ရိုက်တယ်တဲ့ တစ်ခုလောက်ပြပါဦး 📸'}}],
   C:[{in:'after you tried to return my dead umbrella today'},{in:'daw aye aye says you take photos of "strange things". show me one 📸'}]}),
 {choice:{flag:'c1_photo_sent',hint:'Send a photo from your gallery',opts:[
   {label:'The tea-shop table in the rain',ph:'teaTable',photo:'teaTable',v:'table',then:[{mem:'table'},{in:'whose cups'},{out:'Ours. From yesterday.'},{in:'you took a photo of my tea?? 😳'},{in:"that's either creepy or poetic"},{out:'Which one?'},{in:'still deciding 🤔'}]},
   {label:'Her pink umbrella against your wall',ph:'pinkUmbrella',photo:'pinkUmbrella',v:'umbrella',then:[{mem:'pink'},{in:'OH MY GOD 😱'},{if:{test:f=>f.c1_told_kept===false&&f.c1_return!=='C',then:[{in:"you didn't tell me you kept it!!"}]}},{in:'it looks so sad 🥺'},{out:'It looks like it did its best.'}]},
   {label:'A street dog asleep under a stall',ph:'dog',photo:'dog',v:'dog',then:[{mem:'saya'},{in:'who is he'},{out:'He lives near the market. I call him Saya.'},{in:'you NAMED him. saya means teacher 😂'},{out:"He knows how to stay dry. That's more than we know."}]}]}},
 pick('c1_photo_sent',{
   table:[{in:'ok. poetic. final answer ✅'},{in:"most people only take photos of beautiful things"}],
   umbrella:[{in:"you're officially strange"},{in:'I like it 😆'},{in:"who takes photos of broken things"}]  ,
   dog:[{in:"ok you're officially strange. and saya is perfect 🐶"},{in:"I've never seen anyone take photos of things that aren't beautiful"}]}),
 {choice:{flag:'c1_why_photos',opts:[
   {label:'Everything looks beautiful when it rains.',send:'Everything looks beautiful when it rains.',then:[{in:"that's such a lie"},{pause:1200},{in:"ok it's a little true 🙄"}]},
   {label:"Beautiful things don't need photos. Everyone already looks at them.",send:"Beautiful things don't need photos. Everyone already looks at them.",then:[{in:'wow'},{in:'min htet, back-of-the-class philosopher 🧐'}]},
   {label:'I take photos so I remember.',send:'I take photos so I remember.',then:[{in:'remember what'},{out:'How things were. Before they change.'},{in:"things don't change that fast here"},{out:'They do. Just quietly.'}]}]}},
 pick('c1_why_photos',{
   A:[{in:'ok rain expert. can you teach me? the camera 📷'}],
   B:[{in:'philosopher. teach me? the camera'}],
   C:[{pause:1400},{in:'then teach me'},{in:'I want to remember things too 🥹'}]}),
 {out:"It's an old camera."},
 pick('c1_why_photos',{A:[{in:'I learn fast. tomorrow after class?? 🙏'}],B:[{in:'old is fine. I learn fast. tomorrow after class?? 🙏'}],C:[{in:"old is good. it remembers more. tomorrow after class? 😊"}]}),
 {choice:{flag:'c1_tomorrow',opts:[
   {label:'Tomorrow.',send:'Tomorrow.',then:[{in:'deal'}]},
   {label:"If it doesn't rain.",send:"If it doesn't rain.",then:[{in:"it's june min. it will rain 🌧️"},{out:'Then yes.'}]},
   {label:'Bring your own umbrella.',send:'Bring your own umbrella.',then:[{in:'rude 😤'}]}]}},
 {inPhoto:'yellowUmbrella'},
 pick('c1_tomorrow',{
   A:[{in:'also. bought this today. yellow, so I can never take yours by accident again 💛'}],
   B:[{in:'see? ready for rain. bright yellow, so I never take yours by accident again 💛'}],
   C:[{in:'already done. yellow. impossible to mix up with a serious black umbrella 😎'}]}),
 {mem:'yellow'},
 {pause:2000},
 {draft:{text:"I wouldn't mind.",flag:'c1_wouldnt_mind',when:'Jun 2018',
   onSend:[{typing:1500},{pause:1100},{typing:1700},{in:'goodnight min'}],
   onDelete:[{out:'Goodnight.'},{in:'night! see you tomorrow, camera boy 👋'}]}},
 {pause:1600},
 // close
 {scene:{art:'bedroom',cap:'',rain:1}},
 pick('c1_wouldnt_mind',{
   true:[{narr:'Min\'s room, late. He reads "goodnight min" more times than he would admit.'}],
   false:[{narr:'Min\'s room, late. The draft he didn\'t send is still somewhere in his head.'}]}),
 {shot:'roomUmbrellas'},
 {narr:'The pink umbrella leans in the corner. The black one stands beside it, dry. On the roof, the rain is softer now.'},
 {title:{big:'<em>End of Chapter 1</em>The First Rain',small:''}}
];


