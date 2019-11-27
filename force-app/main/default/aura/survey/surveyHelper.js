({
    
    setdefaults: function(component){
        component.set("v.newQuestion",{
           				Id:'',
                  		Type__c:'Radio',
                         Required__c: '',
                       	 Question__c: '',
                  		 Choices__c :'',
                  		Active__c:''
        });
        component.set('v.hide' , false);
    },
    getAllQuestions : function(component,id) {
		        // Create the action
		        
        var action = component.get("c.getQuestions");
        action.setParams({
            "recordId": id
        });
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            
                component.set("v.questions", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
	},
    
	 createQuestion: function(component,newQuestion,recordId,qtype) {
          
          console.log("Create expense: " + JSON.stringify(newQuestion));
          
          
                  
          console.log(recordId);
      		var action = component.get("c.saveQuestion");
     
        
        action.setParams({
            'qtype':qtype,
            'question':newQuestion.Question__c,
            'active':newQuestion.Active__c,
            'required':newQuestion.Required__c,
            'choices':newQuestion.Choices__c,
            'recordId':recordId
        });
          
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var questions = component.get("v.questions");
                questions.push(response.getReturnValue());
                component.set("v.questions", questions);
               component.set("v.openModal", false);
          
            }else{
                console.log("fdsfdsf");
            }
        });
        $A.enqueueAction(action);
       
    },
    updateQuestion: function(component,newQuestion,recordId) {
          
          console.log("Create expense: " + JSON.stringify(newQuestion));
          
          
         var ss = JSON.stringify(newQuestion);
          console.log( );
          
          console.log(recordId);
      		var action = component.get("c.updateQuestion");
     
        
        action.setParams({
            'id':newQuestion.Id,
            'qtype':newQuestion.Type__c,
            'question':newQuestion.Question__c,
            'active':newQuestion.Active__c,
            'required':newQuestion.Required__c,
            'choices':newQuestion.Choices__c,
            'recordId':recordId
        });
          
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                helper.getAllQuestions(component,recordId);
                component.set("v.openEditModal", false);
          
            }else{
                console.log("fdsfdsf");
            }
        });
        $A.enqueueAction(action);
       
    },
    
})