import { createChatBotMessage } from 'react-chatbot-kit';
import Options from "../components/options";
import LinkList from "../components/LinkList"
const config = { 
  botName: "TZD Bot",
  initialMessages: [
    createChatBotMessage("Hi,I'm here to help. You can try one of these?", {widget: "options",}
  ),
],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#007bff",
    },
    chatButton: {
      backgroundColor: "#007bff",
    },
  },

  widgets: [
    {
      widgetName: "options",
     widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "zakatlinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "calculate zakat",
            url:
              "http://localhost:3000/zakat-calculator",
            id: 1,
          },
          {
            text: "want to know more",
            url:
              "http://zakat.herokuapp.com/",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },
    {
      widgetName: "tzdlinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Go to site",
            url:
              "http://zakat.herokuapp.com/",
            id: 1,
          },
          {
            text: "Contact Us",
            url:
              "http://localhost:3000/contact",
            id: 2,
          },
          {
            text: "Documentation",
            url: "http://zakat.herokuapp.com/",
            id: 3,
          },
        ],
      },
    },
    //start
    {
      widgetName: "calculatelink",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "calculator",
            url:
              "http://localhost:3000/zakat-calculator",
            id: 1,
          },
        ],
      },
    },
    //end
    {
      widgetName: "helplink",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "contact",
            url:
              "http://localhost:3000/contact",
            id: 1,
          },
        ],
      },
    },
    {
      widgetName: "locationlink",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "location",
            url:
              "https://goo.gl/maps/KjeCU8N4dgC8myXy8",
            id: 1,
          },
        ],
      },
    },
],
}

export default config