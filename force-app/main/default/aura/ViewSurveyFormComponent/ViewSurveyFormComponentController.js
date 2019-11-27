({
    doInit : function(component, event, helper) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)); //You get the whole decoded URL of the page.
        var sURLVariables = sPageURL.split('&'); //Split by & so that you get the key value pairs separately in a list
        var sParameterName;
        var i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('='); //to split the key from the value.

            if (sParameterName[0] === 'surveyId') { //lets say you are looking for param name - firstName
                sParameterName[1] === undefined ? 'Not found' : sParameterName[1];
            }
        }
        component.set("v.surveyId",sParameterName[1]);
        console.log('Param name'+sParameterName[0]);
        console.log('Param value'+sParameterName[1]);
        
        var id = sParameterName[1];
       
        
        helper.getAllQuestions(component,id);
        
        
    },
    
    clickCreate : function(component,event,helper){
        
        
      	var answers = component.get("v.answers");
        var recordId = component.get("v.surveyId");
        helper.submitSurvey(component,answers,recordId);
    
    },
    
    answerUpdate :  function(component,event,helper){
        var qid = event.getParam("questionId");
        var response = event.getParam("answer");
        var ans = component.get("v.answers");
       
      	ans[qid] = response;
        
        
      component.set("v.answers",ans);
        for(var key in ans){
            console.log(ans[key]);
        }
		
    }
    
    
    
})