public with sharing class QuestionController {
 	@AuraEnabled
    public static Survey_Question__c saveQuestion(String qtype,String question,boolean active,boolean required,
                                                  String choices,Id recordId) {
        // Perform isUpdateable() checking first, then
        //Building__c mybuilding = [Select Id FROM Building__c where Id=: recid ];
       // Flat__c myflat = new Flat__c(Name='1',Floor__c='2',Building__c = 'a022v00001MS8LXAA1');
           
        
        Survey_Question__c qs = new Survey_Question__c(Type__c=qtype,Question__c=question,Active__c=active,
                                                       Required__c=required,Choices__c=choices,Survey__c=recordId);
        
       
        try
        {
          insert qs;  
        }
       catch(Exception ex)
       {
          System.debug('>>>>>>>>>>>>>'+ex.getMessage());
        }
       return qs;
        
    }
    
    @AuraEnabled
    public static Survey_Question__c updateQuestion(Id id,String qtype,String question,boolean active,boolean required,
                                                  String choices,Id recordId) {
        // Perform isUpdateable() checking first, then
        //Building__c mybuilding = [Select Id FROM Building__c where Id=: recid ];
       // Flat__c myflat = new Flat__c(Name='1',Floor__c='2',Building__c = 'a022v00001MS8LXAA1');
           
        
        Survey_Question__c qs = new Survey_Question__c(Id = id,Type__c=qtype,Question__c=question,Active__c=active,
                                                       Required__c=required,Choices__c=choices,Survey__c=recordId);
        
       
        try
        {
          update qs;  
        }
       catch(Exception ex)
       {
          System.debug('>>>>>>>>>>>>>'+ex.getMessage());
        }
       return qs;
        
    }
    
    @AuraEnabled
    public static List<Survey_Question__c> getQuestions(Id recordId){
        
        return [SELECT Id, Active__c,Choices__c,Required__c, Question__c,Type__c FROM Survey_Question__c WHERE Survey__r.Id = :recordId ORDER BY CreatedDate ASC];
    
    }
    
    @AuraEnabled
    public static List<Survey_Question__c> getSurveyQuestions(Id recordId){
        
        return [SELECT Id, Active__c,Choices__c,Required__c, Question__c,Type__c FROM Survey_Question__c
                WHERE (Survey__r.Id = :recordId AND Active__c=True)];
    
    }
    
    @AuraEnabled
    public static void deleteQuestion(Id recordId) {
        Survey_Question__c qs = [SELECT Id,Name FROM Survey_Question__c WHERE Id = :recordId];
        delete qs;
    }
    
    @AuraEnabled
    public static void submitSurvey(Map<String,String> surveyMap,Id recordId){
		System.debug(surveyMap);
      
        List<Survey_Question_Response__c> answerList = new List<Survey_Question_Response__c>();
        for(String id:surveyMap.keySet()){
            
             System.debug(surveyMap.get(id));
            
        	Survey_Question_Response__c ans = new Survey_Question_Response__c(Response__c=surveyMap.get(id),
                                                                              Survey_Question__c=id);
            answerList.add(ans);
        }
    
        System.debug(answerList);
        try{
            insert answerList;
        }catch(Exception ex){
          System.debug('>>>>>>>>>>>>>'+ex.getMessage());
        }
    }
    
    
    
}