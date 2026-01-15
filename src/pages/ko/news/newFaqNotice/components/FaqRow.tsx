import type { FaqItem } from '@/features/faq/FaqTypes';

export default function FaqRow (props: FaqItem) {
  return (
    <>
      { props.title }
      <br/>
      { props.content }
      <br/>
      <br/>
    </>
  )
}
