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
    
     clickDelete : function(component, event, helper) {
       	var question = component.get("v.question.Id");
        var questionlistUpdated = component.getEvent("questionListUpdatedEvent");
        questionlistUpdated.setParams({ "questionId": question });
        questionlistUpdated.fire();
    },
    handleEdit : function(component, event, helper) {
        
       	var question = component.get("v.question");
        var questionlistUpdated = component.getEvent("questionEditEvent");
        questionlistUpdated.setParams({ "question": question });
        questionlistUpdated.fire();
    },
})