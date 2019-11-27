({
	doInit: function(component, event, helper) {
		var id = component.get("v.recordId");
     
		helper.getAllQuestions(component,id);
    },
 
    handleOpenModal: function(component, event, helper) {
        //For Display Modal, Set the "openModal" attribute to "true"
        component.set("v.openModal", true);
    },
     
    handleCloseModal: function(component, event, helper) {
        //For Close Modal, Set the "openModal" attribute to "fasle"  
        component.set("v.openModal", false);
        component.set("v.openEditModal", false);
        helper.setdefaults(component);
    },
    onChange: function(component, event, helper) {
         var type = component.find("selectType").get("v.value");
       
        if(type == "Descriptive"){
             component.set('v.hide' , true);

        }else{
             component.set('v.hide' , false);

        }
    },
     
    clickCreate: function(component, event, helper) {
     
        event.preventDefault();
         var validExpense = component.find('questionform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
       		var recordId = component.get("v.recordId");
            // Create the new question
            
            var newQuestion = component.get("v.newQuestion");
            console.log("Create question: " + JSON.stringify(newQuestion));
			var qtype = component.find("selectType").get("v.value");   	
            helper.createQuestion(component,newQuestion,recordId,qtype);
          	helper.setdefaults(component);
        }
        
    },
    clickUpdate: function(component, event, helper) {
     
        event.preventDefault();
         var validExpense = component.find('editform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
       		var recordId = component.get("v.recordId");
            // Create the new question
            
            var newQuestion = component.get("v.newQuestion");
       
            newQuestion.Required__c=component.find("questionRequired").get("v.value");
            newQuestion.Active__c=component.find("questionActive").get("v.value");
            console.log("Create question: " + JSON.stringify(newQuestion));
			   	
            //helper.updateQuestion(component,newQuestion,recordId);
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
       
            component.set("v.openEditModal", false);
            helper.setdefaults(component);
        }
        },
    
     updateEvent:function(component, event, helper) {
        
        var updateQuestion = event.getParam("questionId");
        var action = component.get("c.deleteQuestion");
      	var id = component.get("v.recordId");
        var toastEvent = $A.get("e.force:showToast");
        
         action.setParams({
            "recordId": updateQuestion
        });
        
         // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                toastEvent.setParams({
       				 "title": "Success!",
        			"message": "The record has been Deleted."
    			});
                toastEvent.fire();
        		helper.getAllQuestions(component,id);
            }
            else {
                 toastEvent.setParams({
       				 "title": "Failed",
        			"message": "Could not delete record."
    			});
                toastEvent.fire();
            	}
            });
        // Send action off to be executed
        $A.enqueueAction(action);
        

   },
    EditEvent:function(component, event, helper) {
        
        var updateQuestion = event.getParam("question");
        component.set("v.newQuestion",updateQuestion);
     
        
        
        component.set("v.openEditModal", true);
   },
    
    
})