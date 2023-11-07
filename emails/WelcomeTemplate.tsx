import React, { CSSProperties } from 'react'
import {
  Html,
  Body,
  Preview,
  Text,
  Link,
  Container,
  Tailwind,
} from '@react-email/components'

// passing props object and destructuring it, with TS
const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Tailwind>
        {/* <Body style={body}> */}
        <Body className="bg-white">
          <Container>
            <Preview>Welcome Aboard!</Preview>
            {/* <Text style={heading}>Hello {name}</Text> */}
            <Text className="font-bold text-3xl">Hello {name}</Text>
            <Link href="https://www.google.com">Google.com</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

const body: CSSProperties = {
  background: '#ffa',
}

const heading: CSSProperties = {
  fontSize: '25px',
}

export default WelcomeTemplate
