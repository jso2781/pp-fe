import type { FaqRVO } from '@/features/faq/FaqTypes';

export default function FaqRow (props: FaqRVO) {
  return (
    <>
      { props.faqTtl }
      <br/>
      { props.faqAns }
      <br/>
      <br/>
    </>
  )
}
