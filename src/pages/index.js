import React from 'react';
import Layout from 'components/layout';
import Container from 'components/Container';
import { graphql, Link } from 'gatsby';
import Cover from 'components/Cover';
import ArticleCard from 'components/ArticleCard';
import CoverImage from 'images/cover.png';

const Index = ({ data }) => {
    const { edges: posts } = data.homeData;
    const { edges: coverPost } = data.coverData;

    return (
        <Layout section="home" classes="home">
            <Cover image={CoverImage} classes="home__cover">
                <div className="home__cover-stars" />
                <div className="home__cover-stars-2" />
                <div className="home__cover-stars-3" />

                {coverPost.map(({ node: post }) => (
                    <Container key={post.id} classes="home__cover-container">
                        <h2>{post.frontmatter.title}</h2>
                        <Link to={post.fields.slug}>Read More</Link>
                    </Container>
                ))}
            </Cover>

            <Container classes="home__container">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => (
                        <ArticleCard
                            title={post.frontmatter.title}
                            image={post.frontmatter.featuredImage}
                            slug={post.fields.slug}
                            key={post.id}
                            date={post.frontmatter.date}
                            readingTime={post.fields.readingTime.text}
                        />
                    ))}
            </Container>
        </Layout>
    );
};

export const HomeQuery = graphql`
    query HomeQuery {
        coverData: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        homeData: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            skip: 1
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        featuredImage
                        date(formatString: "MMMM DD, YYYY")
                    }
                    fields {
                        slug
                        readingTime {
                            text
                        }
                    }
                }
            }
        }
    }
`;

export default Index;
