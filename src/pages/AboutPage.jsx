import React from 'react'
import styled from 'styled-components'
import PageHero from '../Components/PageHero'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title = 'about'/>
      <Wrapper className = 'page section section-center'>
    <img src= {aboutImg} alt="" />
    <article>
      <div className = 'title'>
        <h2>our story</h2>
        <div className = 'underline'></div>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quisquam ea quam quae dolorum non accusantium architecto explicabo aperiam ratione, iste laudantium, est magnam optio cum magni debitis? Reprehenderit ipsa ea laudantium dicta numquam, fugit voluptatibus doloribus est rerum praesentium iure quae consequatur temporibus repellendus. Porro soluta nemo exercitationem quis?</p>
    </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
