import Gpt4vision from "../../botInstance/gpt4v.js";

let chatGPT = {}

export function reset(adminId) {
  if(!chatGPT[adminId]) return
  chatGPT[adminId].reset();
  chatGPT[adminId] = null;
}

export function resetAll() {
  Object.keys(chatGPT).forEach(key => {
    if(chatGPT[key]) {
      chatGPT[key].reset()
    }
  })
  chatGPT = {}
}
export async function getGPT4VReply(content, uid, adminId, config = { token: "", debug: false, proxyPass: "", proxyUrl: "", showQuestion: false, timeoutMs: 80, model: "", systemMessage: "", keywordSystemMessages: [] }, isFastGPT) {
    if (!config.token) {
      console.log('请到智能微秘书平台配置Openai apikey参数方可使用，请确保你的key有GPT4V权限')
      return [{ type: 1, content: '请到平台配置Openai apikey参数方可使用' }]
    }

    if(!chatGPT[adminId]) {
      chatGPT[adminId] = new Gpt4vision(config)
    }

    return await chatGPT[adminId].getReply(content, uid, adminId, '', isFastGPT)
}
