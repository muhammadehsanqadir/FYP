class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage
  }

  
  handleZakat = () => {
    const messages = this.createChatBotMessage(
      "Zakat is a religious obligation, ordering all Muslims who meet the necessary criteria to donate a certain portion of wealth each year to charitable causes.",
      { widget: "zakatlinks",
       withAvatar: true 
      }
    );

    this.updateChatbotState(messages);
  };

  handleTZD = () => {
    const messages = this.createChatBotMessage(
      "TZD is a portal for muslims and the person who are eligible for zakat and want to donate from their home. For more you can visit our website.",
      { widget: "tzdlinks",
       withAvatar: true 
      }
    );

    this.updateChatbotState(messages);
  };

  handleHelp = () => {
    const messages = this.createChatBotMessage(
      "Reach out to us on priority helpline 03059114362 , or you can use the below option",
      { widget: "helplink",
       withAvatar: true 
      }
    );

    this.updateChatbotState(messages);
  };

  handleCalculate = () => {
    const messages = this.createChatBotMessage(
      "You can calculate your zakat according to nisab using the link belowe. For more you can visit our website.",
      { widget: "calculatelink",
       withAvatar: true 
      }
    );

    this.updateChatbotState(messages);
  };

  handleLocation = () => {
    const messages = this.createChatBotMessage(
      "You can visit our office for trust building. Attached is the location",
      { widget: "locationlink",
       withAvatar: true 
      }
    );

    this.updateChatbotState(messages);
  };

  zakaat() {
    const zakaat = this.createChatBotMessage("Zakat is a religious obligation, ordering all Muslims who meet the necessary criteria to donate a certain portion of wealth each year to charitable causes.")
    this.updateChatbotState(zakaat)
  }
  
  zakat() {
    const zakat = this.createChatBotMessage("Zakat is a religious obligation, ordering all Muslims who meet the necessary criteria to donate a certain portion of wealth each year to charitable causes.")
    this.updateChatbotState(zakat)
  }

  tzd() {
    const tzd = this.createChatBotMessage("TZD is a portal for muslims and the person who are eligible for zakat and want to donate from their home. For more you can visit our website.")
    this.updateChatbotState(tzd)
  }
  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.")
    this.updateChatbotState(greetingMessage)
  }
  
  updateChatbotState(message) {
 
// NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.
 
    
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider