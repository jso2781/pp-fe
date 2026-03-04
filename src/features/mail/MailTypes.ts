/**
 * 메일 발송 파라미터
 */
export interface MailSendPVO {
  /** 메일 제목 */
  emlTtl?: string

  /** 메일 내용 */
  emlCn?: string

  /** 메일 발송계정(고정) */
  sndptyFlnm?: 'mail.drugsafe.or.kr'

  /** 발신자 메일주소 */
  sndptyEmlAddr?: string

  /** 수신자명 */
  rcvrFlnm?: string

  /** 수신자 메일주소 */
  rcvrEmlAddr?: string
}
