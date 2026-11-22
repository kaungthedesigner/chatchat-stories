const END_NAME={done:'The end'};
/* no endings to pick: the story marks itself played and goes back to the home page */
function finalCard(){markDone(0);const v=sv();v.ends=['done'];persist();toast('End of the test story');setTimeout(()=>$('#leaveGo').click(),1800)}
