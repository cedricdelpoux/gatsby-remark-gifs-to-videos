import { Link, graphql } from "gatsby"
import React from "react"

const PageTemplate = ({
  data: {
    page: {
      frontmatter: { title },
      html,
    },
  },
}) => {
  return (
    <main>
      <Link to="/">
        <button>{"Home"}</button>
      </Link>
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ maxWidth: 680 }}
      />
    </main>
  )
}

export default PageTemplate
export const pageQuery = graphql`
  query Page($path: String!) {
    page: markdownRemark(fields: { slug: { eq: $path } }) {
      frontmatter {
        title
      }
      html
    }
  }
`
