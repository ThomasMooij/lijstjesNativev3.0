interface NewUserResponse {
    id: string;
    name: string;
    email: string;
  }
  
  export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    LostPassword: undefined;
    Verification: {userInfo: NewUserResponse};
  };

  export type StackParamList = {
    Lists: undefined, 
    Recipes: undefined, 
    Feed: undefined, 
    CreateRecipe: undefined, 
    CreateList: undefined, 

  }
  
  export type TabStackParamList ={
    
  }