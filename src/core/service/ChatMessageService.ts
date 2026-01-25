import { getPwGameClient } from '@/core/store/PwClientStore.ts'

export function sendPrivateChatMessage(message: string, playerId: number) {
  sendRawMessage(`/pm #${playerId} [BOT] ${message}`)
}

export function sendToastMessage(message: string, playerIds: number | number[]) {

  const ids = Array.isArray(playerIds) ? playerIds : [playerIds]
  if (ids.length === 0) return

  const selector = ids.map((id) => `[id=${id}]`).join('')
  
  sendRawMessage(`/toast @a${selector} "${message}" `)
}

export function sendGlobalChatMessage(message: string) {
  sendRawMessage(`[BOT] ${message}`)
}

export function sendRawMessage(message: string) {
  // TODO: Check how message length is calculated with UTF symbols now being allowed
  let finalMessage = message
  if (finalMessage.length > 150) {
    console.error(`ERROR! Trying to send message '${message}'. Message too long. Max message length is 150 characters`)
    finalMessage = 'ERROR! Message too long!'
  }
  getPwGameClient().send('playerChatPacket', {
    message: finalMessage,
  })
}
