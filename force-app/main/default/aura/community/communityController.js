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
    
    setAttributes :function(component, event, helper) {
            var RadioMap = [];
                var q = component.get("v.question");
                if(q.Type__c != 'Descriptive'){
                    var ques =  q.Choices__c.split('\n');
        
                    for(var key in ques){
                        RadioMap.push({label: ques[key], value: ques[key]});
                    }
                     component.set("v.RadioMap", RadioMap);
                }
    },    
    clickCreate : function(component,event,helper){
        
        var validExpense = component.find('questionform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
      	var answers = component.get("v.answers");
        var recordId = component.get("v.surveyId");
        helper.submitSurvey(component,answers,recordId);
        }
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
		
    },
     radioClick : function(component, event, helper) {
        var radio = event.getSource().get("v.value");
        	var questionId = component.get("v.question.Id");
        var questionlistUpdated = component.getEvent("answerUpdateEvent");
        
        questionlistUpdated.setParams({ "questionId": questionId,"answer":radio });
        questionlistUpdated.fire();
        
    },
    
    CheckboxClick : function(component, event, helper) {
       var radio = event.getSource().get("v.value");
       radio =  radio.toString();
     
      var checkb = radio.split(',').join('\n');
       	var questionId = component.get("v.question.Id");
       var questionlistUpdated = component.getEvent("answerUpdateEvent");
        
        questionlistUpdated.setParams({ "questionId": questionId,"answer":checkb });
       questionlistUpdated.fire();
       
    },
    
    
    
})