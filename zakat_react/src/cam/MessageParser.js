
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowerCase = message.toLowerCase()
    
      if (
        lowerCase.includes("hello") ||
        lowerCase.includes("hi") ||
        lowerCase.includes("Greet") ||
        lowerCase.includes("bonjour")
      )
      {
        return this.actionProvider.greet();
      }

   else if 
   (lowerCase.includes("zakaat") ||
   lowerCase.includes("what is zakaat") ||
   lowerCase.includes("Am i eligible for zakaat") ||
   lowerCase.includes("info")) 
   {
      this.actionProvider.handleZakat();
   }

   else if 
   (lowerCase.includes("zakat") ||
   lowerCase.includes("what is zakat") ||
   lowerCase.includes("Am i eligible for zakat") ||
   lowerCase.includes("info")) 
   {
      this.actionProvider.handleZakat();
   }

   else if 
   (lowerCase.includes("tzd") ||
   lowerCase.includes("transparent zakat distribution") ||
   lowerCase.includes("what is this portal about ?") ||
   lowerCase.includes("who can use this?")) 
   {
      this.actionProvider.tzd();
   }

    }
  }
  
  export default MessageParser;