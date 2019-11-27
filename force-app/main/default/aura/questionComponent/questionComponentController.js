({
	doInit : function(component, event, helper) {
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