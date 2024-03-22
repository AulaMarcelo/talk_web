export interface IUserAuth{

        name?: string | null | undefined,
        email?:  string | null | undefined,
        image?:  string | null | undefined
   
}

export interface IUpdatePrompt{
        email:string,
        prompt:string
}