({
	  getAllQuestions : function(component,id) {
		        // Create the action
		        
        var action = component.get("c.getSurveyQuestions");
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
    
    submitSurvey : function(component,surveyMap,recordId) {
    	var action = component.get("c.submitSurvey");
     
        console.log(surveyMap);
        alert(recordId);
        action.setParams({
           
            'surveyMap': surveyMap,
             'recordId':recordId,
        });
          
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                alert("Success");
                console.log(response.getReturnValue());
          
            }else{
                console.log("Failed");
            }
        });
        $A.enqueueAction(action);
       
	}
    
})